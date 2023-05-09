(self.webpackChunkacorn_ui=self.webpackChunkacorn_ui||[]).push([[4237],{"./src/components/FilterButton/FilterButton.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./src/components/FilterButton/FilterButton.scss");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const FilterButton=({size="medium",isSelected,onChange,icon,text})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div",{className:`filter-button-wrapper ${isSelected?"selected":""} \n      ${"large"===size?"large":"small"===size?"small":""}`,onClick:()=>onChange(!isSelected),children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{className:"filter-button-icon",children:icon}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{className:"filter-button-text",children:text})]});FilterButton.displayName="FilterButton";const __WEBPACK_DEFAULT_EXPORT__=FilterButton;try{FilterButton.displayName="FilterButton",FilterButton.__docgenInfo={description:"",displayName:"FilterButton",props:{size:{defaultValue:{value:"medium"},description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"medium"'},{value:'"large"'}]}},isSelected:{defaultValue:null,description:"",name:"isSelected",required:!0,type:{name:"boolean"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"(newState: boolean) => void"}},icon:{defaultValue:null,description:"",name:"icon",required:!0,type:{name:"ReactElement<any, string | JSXElementConstructor<any>>"}},text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/FilterButton/FilterButton.tsx#FilterButton"]={docgenInfo:FilterButton.__docgenInfo,name:"FilterButton",path:"src/components/FilterButton/FilterButton.tsx#FilterButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/FilterDropdown/FilterDropdown.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_Checkbox_Checkbox__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/Checkbox/Checkbox.tsx"),_Icon_Icon__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/Icon/Icon.tsx"),_OnClickOutside_OnClickOutside__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/OnClickOutside/OnClickOutside.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=(__webpack_require__("./src/components/FilterDropdown/FilterDropdown.scss"),__webpack_require__("./node_modules/react/jsx-runtime.js"));const FilterDropdown=({size="medium",selectedOptions,onChange,icon,text,options})=>{const[isOpenDropdownMenu,setIsOpenDropdownMenu]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_OnClickOutside_OnClickOutside__WEBPACK_IMPORTED_MODULE_3__.Z,{onClickOutside:()=>setIsOpenDropdownMenu(!1),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"filter-dropdown-wrapper-with-dropdown",children:[selectedOptions.length>0&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"filter-selection-count",children:selectedOptions.length}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{onClick:()=>setIsOpenDropdownMenu(!isOpenDropdownMenu),className:`filter-dropdown-wrapper ${isOpenDropdownMenu||selectedOptions.length>0?"focused":""} \n      ${"large"===size?"large":"small"===size?"small":""}`,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"filter-dropdown-icon",children:icon}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"filter-dropdown-text",children:text}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"filter-dropdown-chevron",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Icon_Icon__WEBPACK_IMPORTED_MODULE_2__.Z,{name:isOpenDropdownMenu?"chevron-up.svg":"chevron-down.svg",size:"small",className:"light-grey not-hoverable"})})]}),isOpenDropdownMenu&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"filter-dropdown-menu",children:options.map((option=>{const isChecked=selectedOptions.includes(option.id);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"filter-dropdown-menu-option",onClick:()=>(isChecked=>{isChecked&&!selectedOptions.includes(option.id)?onChange([...selectedOptions,option.id]):!isChecked&&selectedOptions.includes(option.id)&&onChange(selectedOptions.filter((id=>id!==option.id)))})(!isChecked),children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_Checkbox_Checkbox__WEBPACK_IMPORTED_MODULE_1__.Z,{size:"small",isChecked}),option.innerListItem]})}))})]})})};FilterDropdown.displayName="FilterDropdown";const __WEBPACK_DEFAULT_EXPORT__=FilterDropdown;try{FilterDropdown.displayName="FilterDropdown",FilterDropdown.__docgenInfo={description:"",displayName:"FilterDropdown",props:{size:{defaultValue:{value:"medium"},description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"medium"'},{value:'"large"'}]}},options:{defaultValue:null,description:"",name:"options",required:!0,type:{name:"{ innerListItem: ReactElement<any, string | JSXElementConstructor<any>>; id: any; }[]"}},selectedOptions:{defaultValue:null,description:"",name:"selectedOptions",required:!0,type:{name:"any[]"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"(newSelectedOptions: any[]) => void"}},icon:{defaultValue:null,description:"",name:"icon",required:!0,type:{name:"ReactElement<any, string | JSXElementConstructor<any>>"}},text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/FilterDropdown/FilterDropdown.tsx#FilterDropdown"]={docgenInfo:FilterDropdown.__docgenInfo,name:"FilterDropdown",path:"src/components/FilterDropdown/FilterDropdown.tsx#FilterDropdown"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/FilterSearch/FilterSearch.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var _Icon_Icon__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/Icon/Icon.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=(__webpack_require__("./src/components/FilterSearch/FilterSearch.scss"),__webpack_require__("./node_modules/react/jsx-runtime.js"));const FilterSearch=({size="medium",filterText,setFilterText,placeholderText,autoFocus})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div",{className:"filter-search-wrapper "+("large"===size?"large":"small"===size?"small":""),children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_Icon_Icon__WEBPACK_IMPORTED_MODULE_1__.Z,{name:"search.svg",size:"small",className:"not-hoverable"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input",{type:"text",onChange:e=>setFilterText(e.target.value.toLowerCase()),value:filterText||"",placeholder:placeholderText,autoFocus}),filterText&&""!==filterText&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{onClick:()=>{setFilterText("")},className:"clear-button",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_Icon_Icon__WEBPACK_IMPORTED_MODULE_1__.Z,{name:"x.svg",size:"small",className:"light-grey not-hoverable",withTooltip:!0,tooltipText:"Clear"})})]});FilterSearch.displayName="FilterSearch";const __WEBPACK_DEFAULT_EXPORT__=FilterSearch;try{FilterSearch.displayName="FilterSearch",FilterSearch.__docgenInfo={description:"",displayName:"FilterSearch",props:{size:{defaultValue:{value:"medium"},description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"medium"'},{value:'"large"'}]}},placeholderText:{defaultValue:null,description:"",name:"placeholderText",required:!0,type:{name:"string"}},filterText:{defaultValue:null,description:"",name:"filterText",required:!0,type:{name:"string"}},setFilterText:{defaultValue:null,description:"",name:"setFilterText",required:!0,type:{name:"(text: string) => void"}},autoFocus:{defaultValue:null,description:"",name:"autoFocus",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/FilterSearch/FilterSearch.tsx#FilterSearch"]={docgenInfo:FilterSearch.__docgenInfo,name:"FilterSearch",path:"src/components/FilterSearch/FilterSearch.tsx#FilterSearch"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/OutcomeTableFilterSelector/OutcomeTableFilterSelector.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var _types__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/types/index.ts"),_Avatar_Avatar__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/Avatar/Avatar.tsx"),_FilterButton_FilterButton__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/components/FilterButton/FilterButton.tsx"),_FilterDropdown_FilterDropdown__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/FilterDropdown/FilterDropdown.tsx"),_FilterSearch_FilterSearch__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/components/FilterSearch/FilterSearch.tsx"),_Icon_Icon__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/components/Icon/Icon.tsx"),_ProgressIndicator_ProgressIndicator__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/components/ProgressIndicator/ProgressIndicator.tsx"),_Tag_Tag__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./src/components/Tag/Tag.tsx"),_Typography_Typography__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./src/components/Typography/Typography.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__=(__webpack_require__("./src/components/OutcomeTableFilterSelector/OutcomeTableFilterSelector.scss"),__webpack_require__("./node_modules/react/jsx-runtime.js"));const OutcomeTableFilterSelector=({whoAmI,onApplyOutcomeTableFilter,filter,projectMemberProfiles,projectTags})=>{const whoAmIFirstName=whoAmI?whoAmI.firstName:"J",whoAmILastName=whoAmI?whoAmI.lastName:"J",whoAmIAvatarUrl=whoAmI?whoAmI.avatarUrl:"",activeAgentPubKey=whoAmI?whoAmI.agentPubKey:"",achievementStatusOptions=[{innerListItem:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_ProgressIndicator_ProgressIndicator__WEBPACK_IMPORTED_MODULE_7__.Z,{progress:100})," Achieved"]}),id:_types__WEBPACK_IMPORTED_MODULE_1__.ComputedSimpleAchievementStatus.Achieved},{innerListItem:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_ProgressIndicator_ProgressIndicator__WEBPACK_IMPORTED_MODULE_7__.Z,{progress:0}),"Not Achieved"]}),id:_types__WEBPACK_IMPORTED_MODULE_1__.ComputedSimpleAchievementStatus.NotAchieved},{innerListItem:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_ProgressIndicator_ProgressIndicator__WEBPACK_IMPORTED_MODULE_7__.Z,{progress:33}),"Partially Achieved"]}),id:_types__WEBPACK_IMPORTED_MODULE_1__.ComputedSimpleAchievementStatus.PartiallyAchieved}],scopeOptions=[{innerListItem:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment,{children:"Small"}),id:_types__WEBPACK_IMPORTED_MODULE_1__.ComputedScope.Small},{innerListItem:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment,{children:"Uncertain"}),id:_types__WEBPACK_IMPORTED_MODULE_1__.ComputedScope.Uncertain},{innerListItem:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment,{children:"Other"}),id:_types__WEBPACK_IMPORTED_MODULE_1__.ComputedScope.Big}],assigneeOptions=projectMemberProfiles.map((profile=>function profileOption(profile){return{innerListItem:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div",{className:"filter-menu-assingees-list-item",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div",{className:"filter-menu-assingees-list-item-avatar",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_Avatar_Avatar__WEBPACK_IMPORTED_MODULE_2__.Z,{size:"small",firstName:profile.firstName,lastName:profile.lastName,avatarUrl:profile.avatarUrl,withWhiteBorder:!0})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div",{className:"filter-menu-assingees-list-item-name",children:[profile.firstName,"  ",profile.lastName]})]}),id:profile.agentPubKey}}(profile)));const tagOptions=projectTags.map((tag=>({innerListItem:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_Tag_Tag__WEBPACK_IMPORTED_MODULE_8__.Z,{text:tag.text,backgroundColor:tag.backgroundColor}),id:tag.actionHash})));function isOnlyMeAssigned(filter){return"assignees"in filter&&(1===filter.assignees.length&&filter.assignees[0]===activeAgentPubKey)}return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div",{className:"outcome-table-view-filters-wrapper",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div",{className:"table-view-filter-wrapper",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_FilterSearch_FilterSearch__WEBPACK_IMPORTED_MODULE_5__.Z,{size:"small",placeholderText:"Filter by keyword or ID number",filterText:filter.keywordOrId,setFilterText:value=>{let newFilter={...filter};0===value.length?delete newFilter.keywordOrId:newFilter.keywordOrId=value.toLowerCase(),onApplyOutcomeTableFilter(newFilter)}})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div",{className:"table-view-filter-wrapper",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_FilterButton_FilterButton__WEBPACK_IMPORTED_MODULE_3__.Z,{size:"medium",text:"Only my cards",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_Avatar_Avatar__WEBPACK_IMPORTED_MODULE_2__.Z,{size:"small",firstName:whoAmIFirstName,lastName:whoAmILastName,avatarUrl:whoAmIAvatarUrl,imported:!1}),isSelected:isOnlyMeAssigned(filter),onChange:()=>{let newFilter={...filter};isOnlyMeAssigned(filter)?delete newFilter.assignees:newFilter.assignees=[activeAgentPubKey],onApplyOutcomeTableFilter(newFilter)}})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div",{className:"table-view-filter-wrapper",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_FilterButton_FilterButton__WEBPACK_IMPORTED_MODULE_3__.Z,{size:"medium",text:"Only high priority",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_Icon_Icon__WEBPACK_IMPORTED_MODULE_6__.Z,{name:"sort-asc.svg"}),isSelected:filter.highPriority,onChange:()=>{let newFilter={...filter};filter.highPriority?delete newFilter.highPriority:newFilter.highPriority=!0,onApplyOutcomeTableFilter(newFilter)}})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div",{className:"table-view-filter-wrapper",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_FilterDropdown_FilterDropdown__WEBPACK_IMPORTED_MODULE_4__.Z,{selectedOptions:filter.achievementStatus?filter.achievementStatus:[],options:achievementStatusOptions,text:"Achievement Status",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_Icon_Icon__WEBPACK_IMPORTED_MODULE_6__.Z,{name:"circle-dashed.svg"}),size:"medium",onChange:newSelectionOptions=>{let newFilter={...filter};newSelectionOptions.length>0?newFilter.achievementStatus=newSelectionOptions:delete newFilter.achievementStatus,onApplyOutcomeTableFilter(newFilter)}})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div",{className:"table-view-filter-wrapper scope",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_FilterDropdown_FilterDropdown__WEBPACK_IMPORTED_MODULE_4__.Z,{selectedOptions:filter.scope?filter.scope:[],options:scopeOptions,text:"Scope",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_Icon_Icon__WEBPACK_IMPORTED_MODULE_6__.Z,{name:"leaf.svg"}),size:"medium",onChange:newSelectionOptions=>{let newFilter={...filter};newSelectionOptions.length>0?newFilter.scope=newSelectionOptions:delete newFilter.scope,onApplyOutcomeTableFilter(newFilter)}})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div",{className:"table-view-filter-wrapper assignees",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_FilterDropdown_FilterDropdown__WEBPACK_IMPORTED_MODULE_4__.Z,{selectedOptions:filter.assignees?filter.assignees:[],options:assigneeOptions,text:"Assignees",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_Icon_Icon__WEBPACK_IMPORTED_MODULE_6__.Z,{name:"assignees.svg"}),size:"medium",onChange:newSelectionOptions=>{let newFilter={...filter};newSelectionOptions.length>0?newFilter.assignees=newSelectionOptions:delete newFilter.assignees,onApplyOutcomeTableFilter(newFilter)}})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div",{className:"table-view-filter-wrapper tags",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_FilterDropdown_FilterDropdown__WEBPACK_IMPORTED_MODULE_4__.Z,{selectedOptions:filter.tags?filter.tags:[],options:tagOptions,text:"Tags",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_Icon_Icon__WEBPACK_IMPORTED_MODULE_6__.Z,{name:"tag.svg"}),size:"medium",onChange:newSelectionOptions=>{let newFilter={...filter};newSelectionOptions.length>0?newFilter.tags=newSelectionOptions:delete newFilter.tags,onApplyOutcomeTableFilter(newFilter)}})}),(filter.keywordOrId||filter.achievementStatus||filter.assignees||filter.scope||filter.tags)&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div",{className:"table-view-filter-wrapper-clear",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_Typography_Typography__WEBPACK_IMPORTED_MODULE_9__.Z,{style:"caption4",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div",{onClick:()=>onApplyOutcomeTableFilter({}),children:"Clear selection"})})})]})};OutcomeTableFilterSelector.displayName="OutcomeTableFilterSelector";const __WEBPACK_DEFAULT_EXPORT__=OutcomeTableFilterSelector;try{OutcomeTableFilterSelector.displayName="OutcomeTableFilterSelector",OutcomeTableFilterSelector.__docgenInfo={description:"",displayName:"OutcomeTableFilterSelector",props:{whoAmI:{defaultValue:null,description:"",name:"whoAmI",required:!0,type:{name:"Profile"}},onApplyOutcomeTableFilter:{defaultValue:null,description:"",name:"onApplyOutcomeTableFilter",required:!0,type:{name:"(filters: OutcomeTableFilter) => void"}},filter:{defaultValue:null,description:"",name:"filter",required:!0,type:{name:"OutcomeTableFilter"}},projectMemberProfiles:{defaultValue:null,description:"",name:"projectMemberProfiles",required:!0,type:{name:"Profile[]"}},projectTags:{defaultValue:null,description:"",name:"projectTags",required:!0,type:{name:"WithActionHash<Tag>[]"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/OutcomeTableFilterSelector/OutcomeTableFilterSelector.tsx#OutcomeTableFilterSelector"]={docgenInfo:OutcomeTableFilterSelector.__docgenInfo,name:"OutcomeTableFilterSelector",path:"src/components/OutcomeTableFilterSelector/OutcomeTableFilterSelector.tsx#OutcomeTableFilterSelector"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/FilterButton/FilterButton.scss":(module,exports,__webpack_require__)=>{(exports=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(!1)).push([module.id,".filter-button-wrapper{display:flex;flex-direction:row;align-items:center;font:.875rem var(--font-family-primary-medium);color:var(--text-color-secondary);background-color:var(--bg-color-secondary);box-shadow:0rem .125rem 1rem var(--shadow-color);padding:.75rem 1.25rem .75rem 1rem;border-radius:.5rem;width:fit-content;cursor:pointer;transition:.2s box-shadow ease;-webkit-font-smoothing:antialiased;letter-spacing:.012rem}.filter-button-wrapper.small{font:.8125rem var(--font-family-primary-medium)}.filter-button-wrapper.small .filter-button-icon .icon{height:.8125rem;width:.8125rem}.filter-button-wrapper.large{font:1rem var(--font-family-primary-medium)}.filter-button-wrapper.large .filter-button-icon .icon{height:1rem;width:1rem}.filter-button-wrapper:hover{box-shadow:0rem .125rem 1rem var(--shadow-color-hover)}.filter-button-wrapper.selected{letter-spacing:.002rem;border:.125rem solid var(--border-color-secondary);padding-top:.625rem;padding-bottom:.625rem;padding-right:1.125rem;padding-left:.875rem;font-family:var(--font-family-primary-bold)}.filter-button-wrapper .filter-button-icon{margin-right:.5rem}.filter-button-wrapper .filter-button-icon .icon{height:.875rem;width:.875rem;padding:0}.filter-button-wrapper .filter-button-icon .icon .inner-icon{background-color:var(--text-color-secondary)}.filter-button-wrapper .filter-button-text{user-select:none}",""]),module.exports=exports},"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/FilterDropdown/FilterDropdown.scss":(module,exports,__webpack_require__)=>{(exports=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(!1)).push([module.id,".filter-dropdown-wrapper-with-dropdown{width:fit-content;position:relative;-webkit-font-smoothing:antialiased}.filter-dropdown-wrapper{display:flex;flex-direction:row;align-items:center;font:.875rem var(--font-family-primary-medium);color:var(--text-color-secondary);background-color:var(--bg-color-secondary);box-shadow:0rem .125rem 1rem var(--shadow-color);padding:.75rem 1.125rem .75rem 1rem;border-radius:.5rem;width:fit-content;cursor:pointer;transition:.2s box-shadow ease;letter-spacing:.012rem}.filter-dropdown-wrapper.small{font:.8125rem var(--font-family-primary-medium)}.filter-dropdown-wrapper.small .filter-dropdown-icon .icon,.filter-dropdown-wrapper.small .filter-dropdown-chevron .icon{height:.8125rem;width:.8125rem}.filter-dropdown-wrapper.large{font:1rem var(--font-family-primary-medium)}.filter-dropdown-wrapper.large .filter-dropdown-icon .icon,.filter-dropdown-wrapper.large .filter-dropdown-chevron .icon{height:1rem;width:1rem}.filter-dropdown-wrapper:hover{box-shadow:0rem .125rem 1rem var(--shadow-color-hover)}.filter-dropdown-wrapper.focused{letter-spacing:.002rem;border:.125rem solid var(--border-color-secondary);padding-top:.625rem;padding-bottom:.625rem;padding-right:1rem;padding-left:.875rem;font-family:var(--font-family-primary-bold)}.filter-dropdown-wrapper .filter-dropdown-icon{margin-right:.5rem}.filter-dropdown-wrapper .filter-dropdown-icon .icon{height:.875rem;width:.875rem;padding:0}.filter-dropdown-wrapper .filter-dropdown-icon .icon .inner-icon{background-color:var(--text-color-secondary)}.filter-dropdown-wrapper .filter-dropdown-text{user-select:none}.filter-dropdown-wrapper .filter-dropdown-chevron{margin-left:.5rem}.filter-dropdown-wrapper .filter-dropdown-chevron .icon{height:.875rem;width:.875rem;padding:0}.filter-dropdown-menu{margin-top:.3rem;display:flex;flex-direction:column;font:.8125rem var(--font-family-primary-medium);color:var(--text-color-secondary);background-color:var(--bg-color-secondary);box-shadow:0rem .125rem 1rem var(--shadow-color-hover);border-radius:.5rem;width:100%;box-sizing:border-box;position:absolute;z-index:2;max-height:15rem;overflow-y:scroll}.filter-dropdown-menu .filter-dropdown-menu-option{display:flex;flex-direction:row;align-items:center;padding:.675rem 1rem;cursor:pointer;transition:.2s all ease;user-select:none}.filter-dropdown-menu .filter-dropdown-menu-option .progress-indicator-wrapper{margin-right:.375rem;display:flex;flex-direction:row;align-items:center;justify-content:center}.filter-dropdown-menu .filter-dropdown-menu-option .progress-indicator-wrapper .icon,.filter-dropdown-menu .filter-dropdown-menu-option .progress-indicator-wrapper .progress-ring{width:1rem;height:1rem;padding:0}.filter-dropdown-menu .filter-dropdown-menu-option:first-child{border-radius:.625rem .625rem 0 0;padding-top:1rem}.filter-dropdown-menu .filter-dropdown-menu-option:last-child{border-radius:0 0 .625rem .625rem;padding-bottom:1rem}.filter-dropdown-menu .filter-dropdown-menu-option:hover{background-color:var(--bg-color-hover)}.filter-dropdown-menu .filter-dropdown-menu-option .checkbox-wrapper{margin-right:.625rem}.filter-selection-count{width:1rem;height:1rem;padding:.125rem;border-radius:50%;font:.6875rem var(--font-family-primary-extrabold);color:var(--bg-color-primary);background-color:var(--text-color-secondary);position:absolute;left:-0.5rem;top:-0.5rem;display:flex;flex-direction:row;justify-content:center}",""]),module.exports=exports},"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/FilterSearch/FilterSearch.scss":(module,exports,__webpack_require__)=>{(exports=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(!1)).push([module.id,".filter-search-wrapper{display:flex;flex-direction:row;align-items:center;border:.15rem solid var(--border-color-timberwolf);padding:.375rem .5rem;border-radius:.5rem;width:100%;box-sizing:border-box;-webkit-font-smoothing:antialiased;background-color:var(--bg-color-secondary);position:relative}.filter-search-wrapper:focus-within{border:.15rem solid var(--border-color-secondary)}.filter-search-wrapper.small{padding:.25rem .5rem}.filter-search-wrapper.small input{font:.875rem var(--font-family-primary-medium)}.filter-search-wrapper.large{padding:.5rem .75rem}.filter-search-wrapper.large input{font:1.125rem var(--font-family-primary-medium)}.filter-search-wrapper input{font:1rem var(--font-family-primary-medium);color:var(--text-color-primary);margin-left:.625rem;border:0;outline:0;width:calc(100% - 3.5rem)}.filter-search-wrapper input::placeholder{color:var(--text-color-placeholder)}.filter-search-wrapper .clear-button{position:absolute;right:.5rem}.filter-search-wrapper .clear-button .icon .inner-icon{transition:.2s all ease}.filter-search-wrapper .clear-button:hover .icon .inner-icon{background-color:var(--text-color-secondary)}",""]),module.exports=exports},"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/OutcomeTableFilterSelector/OutcomeTableFilterSelector.scss":(module,exports,__webpack_require__)=>{(exports=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(!1)).push([module.id,".outcome-table-view-filters-wrapper{display:flex;flex-direction:row;align-items:center;flex-wrap:wrap;margin:0 .5rem}.outcome-table-view-filters-wrapper .table-view-filter-wrapper{margin-right:.5rem;margin-bottom:.25rem;margin-top:.575rem}.outcome-table-view-filters-wrapper .table-view-filter-wrapper:first-child{padding-right:.625rem;margin-right:.625rem;border-right:.125rem solid var(--border-color-platinum)}.outcome-table-view-filters-wrapper .table-view-filter-wrapper.scope .filter-dropdown-menu{width:9rem}.outcome-table-view-filters-wrapper .table-view-filter-wrapper.assignees .filter-dropdown-menu,.outcome-table-view-filters-wrapper .table-view-filter-wrapper.tags .filter-dropdown-menu{width:12rem}.outcome-table-view-filters-wrapper .table-view-filter-wrapper.assignees .filter-dropdown-menu .filter-dropdown-menu-option,.outcome-table-view-filters-wrapper .table-view-filter-wrapper.tags .filter-dropdown-menu .filter-dropdown-menu-option{padding:.5rem 1rem}.outcome-table-view-filters-wrapper .filter-search-wrapper{width:18rem;height:2.625rem;padding-right:1rem;box-sizing:border-box}.outcome-table-view-filters-wrapper .filter-button-wrapper .avatar-wrapper,.outcome-table-view-filters-wrapper .filter-button-wrapper .avatar{height:1.125rem;width:1.125rem}.outcome-table-view-filters-wrapper .filter-button-wrapper .initials-avatar{height:1.125rem;width:1.125rem;font-size:.625rem}.outcome-table-view-filters-wrapper .table-view-filter-wrapper-clear{cursor:pointer;padding:.25rem;margin-top:.25rem}.outcome-table-view-filters-wrapper .table-view-filter-wrapper-clear .typography{color:var(--text-color-tertiary)}.outcome-table-view-filters-wrapper .table-view-filter-wrapper-clear .typography:hover{color:var(--text-color-secondary)}.filter-menu-assingees-list-item{display:flex;flex-direction:row;align-items:center}.filter-menu-assingees-list-item .filter-menu-assingees-list-item-avatar{margin-right:.375rem}",""]),module.exports=exports},"./src/components/FilterButton/FilterButton.scss":(module,__unused_webpack_exports,__webpack_require__)=>{var api=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),content=__webpack_require__("./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/FilterButton/FilterButton.scss");"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.id,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},"./src/components/FilterDropdown/FilterDropdown.scss":(module,__unused_webpack_exports,__webpack_require__)=>{var api=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),content=__webpack_require__("./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/FilterDropdown/FilterDropdown.scss");"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.id,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},"./src/components/FilterSearch/FilterSearch.scss":(module,__unused_webpack_exports,__webpack_require__)=>{var api=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),content=__webpack_require__("./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/FilterSearch/FilterSearch.scss");"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.id,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},"./src/components/OutcomeTableFilterSelector/OutcomeTableFilterSelector.scss":(module,__unused_webpack_exports,__webpack_require__)=>{var api=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),content=__webpack_require__("./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/OutcomeTableFilterSelector/OutcomeTableFilterSelector.scss");"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.id,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}}}]);