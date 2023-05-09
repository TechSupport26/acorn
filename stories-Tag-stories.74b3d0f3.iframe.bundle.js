/*! For license information please see stories-Tag-stories.74b3d0f3.iframe.bundle.js.LICENSE.txt */
(self.webpackChunkacorn_ui=self.webpackChunkacorn_ui||[]).push([[6637],{"./src/stories/Tag.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Tag:()=>Tag,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./src/variables.scss");var _components_Tag_Tag__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/Tag/Tag.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Tags/Tag",component:_components_Tag_Tag__WEBPACK_IMPORTED_MODULE_2__.Z},Template=args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_Tag_Tag__WEBPACK_IMPORTED_MODULE_2__.Z,{...args});Template.displayName="Template";const Tag=Template.bind({});Tag.storyName="Tag",Tag.args={text:"Tag Name",backgroundColor:"#00A094"},Tag.parameters={...Tag.parameters,docs:{...Tag.parameters?.docs,source:{originalSource:"args => {\n  return <TagComponent {...args} />;\n}",...Tag.parameters?.docs?.source}}};const __namedExportsOrder=["Tag"]},"./src/components/Tag/Tag.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./src/components/Tag/Tag.scss");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const Tag=({text,backgroundColor})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{className:"tag-wrapper",style:{backgroundColor},children:text});Tag.displayName="Tag";const __WEBPACK_DEFAULT_EXPORT__=Tag;try{Tag.displayName="Tag",Tag.__docgenInfo={description:"",displayName:"Tag",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}},backgroundColor:{defaultValue:null,description:"",name:"backgroundColor",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Tag/Tag.tsx#Tag"]={docgenInfo:Tag.__docgenInfo,name:"Tag",path:"src/components/Tag/Tag.tsx#Tag"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/Tag/Tag.scss":(module,exports,__webpack_require__)=>{(exports=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(!1)).push([module.id,".tag-wrapper{font:.75rem var(--font-family-primary-bold);line-height:1.65;color:var(--text-color-dark-bg);letter-spacing:.02rem;padding:.175rem .6875rem;border-radius:.5rem;width:fit-content}",""]),module.exports=exports},"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/variables.scss":(module,exports,__webpack_require__)=>{var ___CSS_LOADER_API_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_GET_URL_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/getUrl.js"),___CSS_LOADER_URL_IMPORT_0___=__webpack_require__("./src/fonts/plus-jakarta-sans/PlusJakartaSans-Regular.woff2"),___CSS_LOADER_URL_IMPORT_1___=__webpack_require__("./src/fonts/plus-jakarta-sans/PlusJakartaSans-Regular.woff"),___CSS_LOADER_URL_IMPORT_2___=__webpack_require__("./src/fonts/plus-jakarta-sans/PlusJakartaSans-Medium.woff2"),___CSS_LOADER_URL_IMPORT_3___=__webpack_require__("./src/fonts/plus-jakarta-sans/PlusJakartaSans-Medium.woff"),___CSS_LOADER_URL_IMPORT_4___=__webpack_require__("./src/fonts/plus-jakarta-sans/PlusJakartaSans-SemiBold.woff2"),___CSS_LOADER_URL_IMPORT_5___=__webpack_require__("./src/fonts/plus-jakarta-sans/PlusJakartaSans-SemiBold.woff"),___CSS_LOADER_URL_IMPORT_6___=__webpack_require__("./src/fonts/plus-jakarta-sans/PlusJakartaSans-Bold.woff2"),___CSS_LOADER_URL_IMPORT_7___=__webpack_require__("./src/fonts/plus-jakarta-sans/PlusJakartaSans-Bold.woff"),___CSS_LOADER_URL_IMPORT_8___=__webpack_require__("./src/fonts/plus-jakarta-sans/PlusJakartaSans-ExtraBold.woff2"),___CSS_LOADER_URL_IMPORT_9___=__webpack_require__("./src/fonts/plus-jakarta-sans/PlusJakartaSans-ExtraBold.woff"),___CSS_LOADER_URL_IMPORT_10___=__webpack_require__("./src/fonts/gilroy/gilroy-extrabold-webfont.woff2"),___CSS_LOADER_URL_IMPORT_11___=__webpack_require__("./src/fonts/gilroy/gilroy-extrabold-webfont.woff"),___CSS_LOADER_URL_IMPORT_12___=__webpack_require__("./src/fonts/gilroy/gilroy-light-webfont.woff2"),___CSS_LOADER_URL_IMPORT_13___=__webpack_require__("./src/fonts/gilroy/gilroy-light-webfont.woff");exports=___CSS_LOADER_API_IMPORT___(!1);var ___CSS_LOADER_URL_REPLACEMENT_0___=___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___),___CSS_LOADER_URL_REPLACEMENT_1___=___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_1___),___CSS_LOADER_URL_REPLACEMENT_2___=___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_2___),___CSS_LOADER_URL_REPLACEMENT_3___=___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_3___),___CSS_LOADER_URL_REPLACEMENT_4___=___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_4___),___CSS_LOADER_URL_REPLACEMENT_5___=___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_5___),___CSS_LOADER_URL_REPLACEMENT_6___=___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_6___),___CSS_LOADER_URL_REPLACEMENT_7___=___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_7___),___CSS_LOADER_URL_REPLACEMENT_8___=___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_8___),___CSS_LOADER_URL_REPLACEMENT_9___=___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_9___),___CSS_LOADER_URL_REPLACEMENT_10___=___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_10___),___CSS_LOADER_URL_REPLACEMENT_11___=___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_11___),___CSS_LOADER_URL_REPLACEMENT_12___=___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_12___),___CSS_LOADER_URL_REPLACEMENT_13___=___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_13___);exports.push([module.id,'@font-face{font-family:"PlusJakartaSans-regular";src:url('+___CSS_LOADER_URL_REPLACEMENT_0___+') format("woff2"),url('+___CSS_LOADER_URL_REPLACEMENT_1___+') format("woff");font-weight:normal;font-style:normal;word-spacing:.05em}@font-face{font-family:"PlusJakartaSans-medium";src:url('+___CSS_LOADER_URL_REPLACEMENT_2___+') format("woff2"),url('+___CSS_LOADER_URL_REPLACEMENT_3___+') format("woff");font-weight:normal;font-style:normal;word-spacing:.05em}@font-face{font-family:"PlusJakartaSans-semibold";src:url('+___CSS_LOADER_URL_REPLACEMENT_4___+') format("woff2"),url('+___CSS_LOADER_URL_REPLACEMENT_5___+') format("woff");font-weight:normal;font-style:normal;word-spacing:.05em}@font-face{font-family:"PlusJakartaSans-bold";src:url('+___CSS_LOADER_URL_REPLACEMENT_6___+') format("woff2"),url('+___CSS_LOADER_URL_REPLACEMENT_7___+') format("woff");font-weight:normal;font-style:normal;word-spacing:.05em}@font-face{font-family:"PlusJakartaSans-extrabold";src:url('+___CSS_LOADER_URL_REPLACEMENT_8___+') format("woff2"),url('+___CSS_LOADER_URL_REPLACEMENT_9___+') format("woff");font-weight:normal;font-style:normal;word-spacing:.05em}@font-face{font-family:"gilroyextrabold";src:url('+___CSS_LOADER_URL_REPLACEMENT_10___+') format("woff2"),url('+___CSS_LOADER_URL_REPLACEMENT_11___+') format("woff");font-weight:normal;font-style:normal}@font-face{font-family:"gilroylight";src:url('+___CSS_LOADER_URL_REPLACEMENT_12___+') format("woff2"),url('+___CSS_LOADER_URL_REPLACEMENT_13___+') format("woff");font-weight:normal;font-style:normal}:root{--color-virtually-transaprent: #ffffff00;--color-green-shadow: #4a604392;--shadow-brown-shadow: #8377699b;--color-silver: #bebebe;--color-green: #008414;--color-forest-green: #15841d;--color-bronze: #a89958;--color-pumpkin: #c46310;--color-topaz: #f7cf75;--color-ultramarine-blue: #344cff;--color-gray: #808080;--color-alto: #d0d0d0;--color-turquoise: #12d6c7;--color-persian-green: #00a599;--color-myrtle-green: #277670;--icon-color-light-grey: #d0d0d0;--bg-color-primary: #f7f5f3;--bg-color-secondary: #ffffff;--bg-color-secondary-read-only: #ffffff80;--bg-color-tertiary: #fbfbf9;--bg-color-hover: #f4f1ed;--bg-color-hover-semi-transparent: #f4f1eda1;--bg-color-canvas: #f4f2f0;--bg-color-popup: #ebeae7eb;--bg-color-achieved: #e9efe7;--bg-color-primary-dark: #555555;--bg-color-hover-dark: #c7beb430;--border-color-primary: #222222;--border-color-secondary: #4d4d4d;--border-color-timberwolf: #dbd7d0;--border-color-platinum: #ede7e7;--border-color-bright-gray: #efefef;--border-color-pale-silver: #c3bfba;--shadow-color: #c7beb472;--shadow-color-read-only: #c7beb437;--shadow-color-dark: #c7beb4bd;--shadow-color-hover: #c7beb4bd;--shadow-color-high-priority: #334cf8;--font-family-primary-extrabold: "PlusJakartaSans-extrabold", sans-serif;--font-family-primary-bold: "PlusJakartaSans-bold", sans-serif;--font-family-primary-semibold: "PlusJakartaSans-semibold", sans-serif;--font-family-primary-medium: "PlusJakartaSans-medium", sans-serif;--font-family-primary-regular: "PlusJakartaSans-regular", sans-serif;--font-family-secondary-extrabold: "gilroyextrabold", sans-serif;--text-color-primary: #222222;--text-color-secondary: #4d4d4d;--text-color-tertiary: #8d8c8c;--text-color-quaternary: #9d9d9d;--text-color-caption: #bcbcbc;--text-color-placeholder: #bdbdbd;--text-color-strikethrough: #aea49972;--text-color-invalid: #ff5d36;--text-color-link: #344cff;--text-color-dark-bg: #ffffff}',""]),module.exports=exports},"./node_modules/css-loader/dist/runtime/api.js":module=>{"use strict";module.exports=function(useSourceMap){var list=[];return list.toString=function toString(){return this.map((function(item){var content=function cssWithMappingToString(item,useSourceMap){var content=item[1]||"",cssMapping=item[3];if(!cssMapping)return content;if(useSourceMap&&"function"==typeof btoa){var sourceMapping=function toComment(sourceMap){var base64=btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))),data="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);return"/*# ".concat(data," */")}(cssMapping),sourceURLs=cssMapping.sources.map((function(source){return"/*# sourceURL=".concat(cssMapping.sourceRoot||"").concat(source," */")}));return[content].concat(sourceURLs).concat([sourceMapping]).join("\n")}return[content].join("\n")}(item,useSourceMap);return item[2]?"@media ".concat(item[2]," {").concat(content,"}"):content})).join("")},list.i=function(modules,mediaQuery,dedupe){"string"==typeof modules&&(modules=[[null,modules,""]]);var alreadyImportedModules={};if(dedupe)for(var i=0;i<this.length;i++){var id=this[i][0];null!=id&&(alreadyImportedModules[id]=!0)}for(var _i=0;_i<modules.length;_i++){var item=[].concat(modules[_i]);dedupe&&alreadyImportedModules[item[0]]||(mediaQuery&&(item[2]?item[2]="".concat(mediaQuery," and ").concat(item[2]):item[2]=mediaQuery),list.push(item))}},list}},"./node_modules/css-loader/dist/runtime/getUrl.js":module=>{"use strict";module.exports=function(url,options){return options||(options={}),"string"!=typeof(url=url&&url.__esModule?url.default:url)?url:(/^['"].*['"]$/.test(url)&&(url=url.slice(1,-1)),options.hash&&(url+=options.hash),/["'() \t\n]/.test(url)||options.needQuotes?'"'.concat(url.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):url)}},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";var f=__webpack_require__("./node_modules/react/index.js"),g=60103;if(exports.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var h=Symbol.for;g=h("react.element"),exports.Fragment=h("react.fragment")}var m=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,n=Object.prototype.hasOwnProperty,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,k){var b,d={},e=null,l=null;for(b in void 0!==k&&(e=""+k),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(l=a.ref),a)n.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:g,type:c,key:e,ref:l,props:d,_owner:m.current}}exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")},"./src/components/Tag/Tag.scss":(module,__unused_webpack_exports,__webpack_require__)=>{var api=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),content=__webpack_require__("./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/Tag/Tag.scss");"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.id,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},"./src/variables.scss":(module,__unused_webpack_exports,__webpack_require__)=>{var api=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),content=__webpack_require__("./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/variables.scss");"string"==typeof(content=content.__esModule?content.default:content)&&(content=[[module.id,content,""]]);var options={insert:"head",singleton:!1};api(content,options);module.exports=content.locals||{}},"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var isOldIE=function isOldIE(){var memo;return function memorize(){return void 0===memo&&(memo=Boolean(window&&document&&document.all&&!window.atob)),memo}}(),getTarget=function getTarget(){var memo={};return function memorize(target){if(void 0===memo[target]){var styleTarget=document.querySelector(target);if(window.HTMLIFrameElement&&styleTarget instanceof window.HTMLIFrameElement)try{styleTarget=styleTarget.contentDocument.head}catch(e){styleTarget=null}memo[target]=styleTarget}return memo[target]}}(),stylesInDom=[];function getIndexByIdentifier(identifier){for(var result=-1,i=0;i<stylesInDom.length;i++)if(stylesInDom[i].identifier===identifier){result=i;break}return result}function modulesToDom(list,options){for(var idCountMap={},identifiers=[],i=0;i<list.length;i++){var item=list[i],id=options.base?item[0]+options.base:item[0],count=idCountMap[id]||0,identifier="".concat(id," ").concat(count);idCountMap[id]=count+1;var index=getIndexByIdentifier(identifier),obj={css:item[1],media:item[2],sourceMap:item[3]};-1!==index?(stylesInDom[index].references++,stylesInDom[index].updater(obj)):stylesInDom.push({identifier,updater:addStyle(obj,options),references:1}),identifiers.push(identifier)}return identifiers}function insertStyleElement(options){var style=document.createElement("style"),attributes=options.attributes||{};if(void 0===attributes.nonce){var nonce=__webpack_require__.nc;nonce&&(attributes.nonce=nonce)}if(Object.keys(attributes).forEach((function(key){style.setAttribute(key,attributes[key])})),"function"==typeof options.insert)options.insert(style);else{var target=getTarget(options.insert||"head");if(!target)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");target.appendChild(style)}return style}var replaceText=function replaceText(){var textStore=[];return function replace(index,replacement){return textStore[index]=replacement,textStore.filter(Boolean).join("\n")}}();function applyToSingletonTag(style,index,remove,obj){var css=remove?"":obj.media?"@media ".concat(obj.media," {").concat(obj.css,"}"):obj.css;if(style.styleSheet)style.styleSheet.cssText=replaceText(index,css);else{var cssNode=document.createTextNode(css),childNodes=style.childNodes;childNodes[index]&&style.removeChild(childNodes[index]),childNodes.length?style.insertBefore(cssNode,childNodes[index]):style.appendChild(cssNode)}}function applyToTag(style,options,obj){var css=obj.css,media=obj.media,sourceMap=obj.sourceMap;if(media?style.setAttribute("media",media):style.removeAttribute("media"),sourceMap&&"undefined"!=typeof btoa&&(css+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))))," */")),style.styleSheet)style.styleSheet.cssText=css;else{for(;style.firstChild;)style.removeChild(style.firstChild);style.appendChild(document.createTextNode(css))}}var singleton=null,singletonCounter=0;function addStyle(obj,options){var style,update,remove;if(options.singleton){var styleIndex=singletonCounter++;style=singleton||(singleton=insertStyleElement(options)),update=applyToSingletonTag.bind(null,style,styleIndex,!1),remove=applyToSingletonTag.bind(null,style,styleIndex,!0)}else style=insertStyleElement(options),update=applyToTag.bind(null,style,options),remove=function remove(){!function removeStyleElement(style){if(null===style.parentNode)return!1;style.parentNode.removeChild(style)}(style)};return update(obj),function updateStyle(newObj){if(newObj){if(newObj.css===obj.css&&newObj.media===obj.media&&newObj.sourceMap===obj.sourceMap)return;update(obj=newObj)}else remove()}}module.exports=function(list,options){(options=options||{}).singleton||"boolean"==typeof options.singleton||(options.singleton=isOldIE());var lastIdentifiers=modulesToDom(list=list||[],options);return function update(newList){if(newList=newList||[],"[object Array]"===Object.prototype.toString.call(newList)){for(var i=0;i<lastIdentifiers.length;i++){var index=getIndexByIdentifier(lastIdentifiers[i]);stylesInDom[index].references--}for(var newLastIdentifiers=modulesToDom(newList,options),_i=0;_i<lastIdentifiers.length;_i++){var _index=getIndexByIdentifier(lastIdentifiers[_i]);0===stylesInDom[_index].references&&(stylesInDom[_index].updater(),stylesInDom.splice(_index,1))}lastIdentifiers=newLastIdentifiers}}}},"./src/fonts/gilroy/gilroy-extrabold-webfont.woff":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"static/media/gilroy-extrabold-webfont.9d536b59.woff"},"./src/fonts/gilroy/gilroy-extrabold-webfont.woff2":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"static/media/gilroy-extrabold-webfont.eba219e4.woff2"},"./src/fonts/gilroy/gilroy-light-webfont.woff":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"static/media/gilroy-light-webfont.ba334d23.woff"},"./src/fonts/gilroy/gilroy-light-webfont.woff2":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"static/media/gilroy-light-webfont.77d9316b.woff2"},"./src/fonts/plus-jakarta-sans/PlusJakartaSans-Bold.woff":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"static/media/PlusJakartaSans-Bold.3d6b4fa0.woff"},"./src/fonts/plus-jakarta-sans/PlusJakartaSans-Bold.woff2":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"static/media/PlusJakartaSans-Bold.50cf6471.woff2"},"./src/fonts/plus-jakarta-sans/PlusJakartaSans-ExtraBold.woff":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"static/media/PlusJakartaSans-ExtraBold.d59e544c.woff"},"./src/fonts/plus-jakarta-sans/PlusJakartaSans-ExtraBold.woff2":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"static/media/PlusJakartaSans-ExtraBold.259d19d6.woff2"},"./src/fonts/plus-jakarta-sans/PlusJakartaSans-Medium.woff":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"static/media/PlusJakartaSans-Medium.724099a1.woff"},"./src/fonts/plus-jakarta-sans/PlusJakartaSans-Medium.woff2":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"static/media/PlusJakartaSans-Medium.ff53fe0e.woff2"},"./src/fonts/plus-jakarta-sans/PlusJakartaSans-Regular.woff":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"static/media/PlusJakartaSans-Regular.f344d0fa.woff"},"./src/fonts/plus-jakarta-sans/PlusJakartaSans-Regular.woff2":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"static/media/PlusJakartaSans-Regular.c4e0d187.woff2"},"./src/fonts/plus-jakarta-sans/PlusJakartaSans-SemiBold.woff":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"static/media/PlusJakartaSans-SemiBold.0c667bc0.woff"},"./src/fonts/plus-jakarta-sans/PlusJakartaSans-SemiBold.woff2":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"static/media/PlusJakartaSans-SemiBold.dc64b89d.woff2"}}]);