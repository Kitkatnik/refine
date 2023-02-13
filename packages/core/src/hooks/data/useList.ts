import {
    QueryObserverResult,
    useQuery,
    UseQueryOptions,
} from "@tanstack/react-query";
import {
    GetListResponse,
    CrudFilters,
    Pagination,
    BaseRecord,
    HttpError,
    CrudSorting,
    MetaDataQuery,
    SuccessErrorNotification,
    LiveModeProps,
} from "../../interfaces";
import {
    useResource,
    useCheckError,
    useHandleNotification,
    useResourceSubscription,
    useTranslate,
    useDataProvider,
} from "@hooks";
import {
    queryKeys,
    pickDataProvider,
    pickNotDeprecated,
} from "@definitions/helpers";

export interface UseListConfig {
    pagination?: Pagination;
    hasPagination?: boolean;
    sort?: CrudSorting;
    filters?: CrudFilters;
}

export type UseListProps<TData, TError> = {
    /**
     * Resource name for API data interactions
     */
    resource: string;
    /**
     * Configuration for pagination, sorting and filtering
     * @type [`UseListConfig`](/docs/api-reference/core/hooks/data/useList/#config-parameters)
     * @deprecated `config` property is deprecated. Use `pagination`, `hasPagination`, `sorters` and `filters` instead.
     */
    config?: UseListConfig;
    /**
     * Pagination properties
     */
    pagination?: Pagination;
    /**
     * Whether to use server-side pagination or not
     * @deprecated `hasPagination` property is deprecated. Use `pagination.mode` instead.
     */
    hasPagination?: boolean;
    /**
     * Sorter parameters
     */
    sorters?: CrudSorting;
    /**
     * Filter parameters
     */
    filters?: CrudFilters;
    /**
     * Tanstack Query's [useQuery](https://tanstack.com/query/v4/docs/reference/useQuery) options
     */
    queryOptions?: UseQueryOptions<GetListResponse<TData>, TError>;
    /**
     *  Metadata query for `dataProvider`
     */
    metaData?: MetaDataQuery;
    /**
     * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use
     */
    dataProviderName?: string;
} & SuccessErrorNotification &
    LiveModeProps;

/**
 * `useList` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/guides/queries `useQuery`} used for retrieving items from a `resource` with pagination, sort, and filter configurations.
 *
 * It uses the `getList` method as the query function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/core/hooks/data/useList} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/core/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/core/interfaceReferences#httperror `HttpError`}
 *
 */
export const useList = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>({
    resource,
    config,
    filters,
    hasPagination,
    pagination,
    sorters,
    queryOptions,
    successNotification,
    errorNotification,
    metaData,
    liveMode,
    onLiveEvent,
    liveParams,
    dataProviderName,
}: UseListProps<TData, TError>): QueryObserverResult<
    GetListResponse<TData>,
    TError
> => {
    const { resources } = useResource();
    const dataProvider = useDataProvider();
    const queryKey = queryKeys(
        resource,
        pickDataProvider(resource, dataProviderName, resources),
        metaData,
    );
    const { getList } = dataProvider(
        pickDataProvider(resource, dataProviderName, resources),
    );

    const translate = useTranslate();
    const { mutate: checkError } = useCheckError();
    const handleNotification = useHandleNotification();

    const isEnabled =
        queryOptions?.enabled === undefined || queryOptions?.enabled === true;

    useResourceSubscription({
        resource,
        types: ["*"],
        params: {
            metaData,
            pagination: pickNotDeprecated(pagination, config?.pagination),
            hasPagination: pickNotDeprecated(
                hasPagination,
                config?.hasPagination,
            ),
            sort: pickNotDeprecated(sorters, config?.sort),
            sorters: pickNotDeprecated(sorters, config?.sort),
            filters: pickNotDeprecated(filters, config?.filters),
            subscriptionType: "useList",
            ...liveParams,
        },
        channel: `resources/${resource}`,
        enabled: isEnabled,
        liveMode,
        onLiveEvent,
    });

    const queryResponse = useQuery<GetListResponse<TData>, TError>(
        queryKey.list({
            filters: pickNotDeprecated(filters, config?.filters),
            hasPagination: pickNotDeprecated(
                hasPagination,
                config?.hasPagination,
            ),
            ...(pagination?.mode === "server" && {
                pagination: pickNotDeprecated(pagination, config?.pagination),
            }),
            ...(sorters && {
                sorters,
            }),
            ...(config?.sort && {
                sort: config?.sort,
            }),
        }),
        ({ queryKey, pageParam, signal }) => {
            return getList<TData>({
                resource,
                pagination: pickNotDeprecated(pagination, config?.pagination),
                hasPagination: pickNotDeprecated(
                    hasPagination,
                    config?.hasPagination,
                ),
                filters: pickNotDeprecated(filters, config?.filters),
                sort: pickNotDeprecated(sorters, config?.sort),
                sorters: pickNotDeprecated(sorters, config?.sort),
                metaData: {
                    ...metaData,
                    queryContext: {
                        queryKey,
                        pageParam,
                        signal,
                    },
                },
            });
        },
        {
            ...queryOptions,
            onSuccess: (data) => {
                queryOptions?.onSuccess?.(data);

                const notificationConfig =
                    typeof successNotification === "function"
                        ? successNotification(
                              data,
                              {
                                  metaData,
                                  filters: pickNotDeprecated(
                                      filters,
                                      config?.filters,
                                  ),
                                  hasPagination: pickNotDeprecated(
                                      hasPagination,
                                      config?.hasPagination,
                                  ),
                                  pagination: pickNotDeprecated(
                                      pagination,
                                      config?.pagination,
                                  ),
                                  sorters: pickNotDeprecated(
                                      sorters,
                                      config?.sort,
                                  ),
                                  config: {
                                      ...config,
                                      sort: pickNotDeprecated(
                                          sorters,
                                          config?.sort,
                                      ),
                                  },
                              },
                              resource,
                          )
                        : successNotification;

                handleNotification(notificationConfig);
            },
            onError: (err: TError) => {
                checkError(err);
                queryOptions?.onError?.(err);

                const notificationConfig =
                    typeof errorNotification === "function"
                        ? errorNotification(
                              err,
                              {
                                  metaData,
                                  filters: pickNotDeprecated(
                                      filters,
                                      config?.filters,
                                  ),
                                  hasPagination: pickNotDeprecated(
                                      hasPagination,
                                      config?.hasPagination,
                                  ),
                                  pagination: pickNotDeprecated(
                                      pagination,
                                      config?.pagination,
                                  ),
                                  sorters: pickNotDeprecated(
                                      sorters,
                                      config?.sort,
                                  ),
                                  config: {
                                      ...config,
                                      sort: pickNotDeprecated(
                                          sorters,
                                          config?.sort,
                                      ),
                                  },
                              },
                              resource,
                          )
                        : errorNotification;

                handleNotification(notificationConfig, {
                    key: `${resource}-useList-notification`,
                    message: translate(
                        "notifications.error",
                        { statusCode: err.statusCode },
                        `Error (status code: ${err.statusCode})`,
                    ),
                    description: err.message,
                    type: "error",
                });
            },
        },
    );

    return queryResponse;
};
