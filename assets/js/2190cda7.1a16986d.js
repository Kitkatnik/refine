"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[75641],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>d});var n=r(67294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),u=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=u(e.components);return n.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),m=u(r),d=o,f=m["".concat(l,".").concat(d)]||m[d]||p[d]||a;return r?n.createElement(f,i(i({ref:t},s),{},{components:r})):n.createElement(f,i({ref:t},s))}));function d(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=m;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:o,i[1]=c;for(var u=2;u<a;u++)i[u]=r[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},90231:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>p,frontMatter:()=>a,metadata:()=>c,toc:()=>u});var n=r(87462),o=(r(67294),r(3905));const a={},i=void 0,c={unversionedId:"api-reference/mui/hooks/useAutocomplete/crud-live-preview",id:"api-reference/mui/hooks/useAutocomplete/crud-live-preview",title:"crud-live-preview",description:"",source:"@site/docs/api-reference/mui/hooks/useAutocomplete/crud-live-preview.md",sourceDirName:"api-reference/mui/hooks/useAutocomplete",slug:"/api-reference/mui/hooks/useAutocomplete/crud-live-preview",permalink:"/docs/api-reference/mui/hooks/useAutocomplete/crud-live-preview",draft:!1,editUrl:"https://github.com/refinedev/refine/tree/master/documentation/docs/api-reference/mui/hooks/useAutocomplete/crud-live-preview.md",tags:[],version:"current",lastUpdatedBy:"Y\u0131ld\u0131ray \xdcnl\xfc",lastUpdatedAt:1675370931,formattedLastUpdatedAt:"Feb 2, 2023",frontMatter:{}},l={},u=[],s={toc:u};function p(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx",metastring:"live url=http://localhost:3000 previewHeight=400px",live:!0,url:"http://localhost:3000",previewHeight:"400px"},'setInitialRoutes(["/posts/create"]);\n// visible-block-start\nimport {\n    Create,\n    Box,\n    Autocomplete,\n    useAutocomplete,\n    TextField,\n} from "@pankod/refine-mui";\nimport { useForm, Controller } from "@pankod/refine-react-hook-form";\n\ninterface ICategory {\n    id: number;\n    title: string;\n}\n\nconst PostCreate: React.FC = () => {\n    const {\n        saveButtonProps,\n        refineCore: { formLoading, queryResult },\n        register,\n        control,\n        formState: { errors },\n    } = useForm<IPost, HttpError, IPost & { category: ICategory }>();\n\n    const { autocompleteProps } = useAutocomplete<ICategory>({\n        resource: "categories",\n    });\n\n    return (\n        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>\n            <Box component="form">\n                <Controller\n                    control={control}\n                    name="category"\n                    rules={{ required: "This field is required" }}\n                    render={({ field }) => (\n                        <Autocomplete\n                            //highlight-next-line\n                            {...autocompleteProps}\n                            {...field}\n                            onChange={(_, value) => {\n                                field.onChange(value);\n                            }}\n                            getOptionLabel={({ title }) => title}\n                            isOptionEqualToValue={(option, value) =>\n                                value === undefined ||\n                                option.id.toString() === value.toString()\n                            }\n                            placeholder="Select a category"\n                            renderInput={(params) => (\n                                <TextField\n                                    {...params}\n                                    label="Category"\n                                    margin="normal"\n                                    variant="outlined"\n                                    error={!!errors.category}\n                                    helperText={errors.category?.message}\n                                    required\n                                />\n                            )}\n                        />\n                    )}\n                />\n            </Box>\n        </Create>\n    );\n};\n// visible-block-end\nsetRefineProps({\n    resources: [\n        {\n            name: "posts",\n            create: PostCreate,\n        },\n    ],\n});\nrender(<RefineMuiDemo />);\n')))}p.isMDXComponent=!0}}]);