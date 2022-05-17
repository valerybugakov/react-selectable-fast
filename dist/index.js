!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports["React-Selectable-Fast"]=t(require("react")):e["React-Selectable-Fast"]=t(e.React)}(self,(e=>(()=>{"use strict";var t={787:t=>{t.exports=e}},o={};function r(e){var n=o[e];if(void 0!==n)return n.exports;var l=o[e]={exports:{}};return t[e](l,l.exports,r),l.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};return(()=>{r.r(n),r.d(n,{DeselectAll:()=>de,SelectAll:()=>oe,SelectableGroup:()=>A,TSelectableItemProps:()=>e.TSelectableItemProps,createSelectable:()=>H});var e={};r.r(e);var t=r(787),o=r.n(t),l=function(){};function c(){return{documentScrollTop:Math.max(window.pageYOffset,document.documentElement.scrollTop,document.body.scrollTop),documentScrollLeft:Math.max(window.pageXOffset,document.documentElement.scrollLeft,document.body.scrollLeft)}}function i(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{scrollTop:0,scrollLeft:0},o=t.scrollTop,r=t.scrollLeft;return Array.from(e.getClientRects()).map((function(t){return{top:t.top+o,left:t.left+r,offsetWidth:e.offsetWidth,offsetHeight:e.offsetHeight,width:t.width,height:t.height}}))}var s=["pageX","pageY","clientX","clientY"];function a(e,t){s.forEach((function(o){void 0===e[o]&&(e[o]=e[t][0][o])}))}function u(e){if(e.type.includes("mouse"))return e;try{"touchstart"===e.type?a(e,"targetTouches"):"touchmove"===e.type&&a(e,"changedTouches")}catch(e){console.error(e.message)}return e}function f(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return!(e.metaKey&&!o.allowMetaClick||e.ctrlKey&&!o.allowCtrlClick||e.altKey&&!o.allowAltClick||e.shiftKey&&!o.allowShiftClick)&&("buttons"in e?e.buttons===t:"which"in e?e.which===t:e.button===t-1)}function p(e,t){for(;e;){if(e===t)return!0;e=e.parentNode}return!1}var d=function(e,t,o){var r=o.tolerance,n=void 0===r?0:r,l=o.useOffsetSize,c=void 0!==l&&l,i=c?e.offsetHeight:e.height,s=c?t.offsetHeight:t.height,a=c?e.offsetWidth:e.width,u=c?t.offsetWidth:t.width;return!(e.top+i-n<t.top||e.top+n>t.top+s||e.left+a-n<t.left||e.left+n>t.left+u)};function h(e){return Array.isArray(e)?e:[e]}function y(e,t){for(var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,n=h(e),l=h(t),c=0;c<n.length;c++)for(var i=0;i<l.length;i++)return d(n[c],l[i],{tolerance:o,useOffsetSize:1===r})}var m=o().createContext({selectable:{register:function(e){},unregister:function(e){},selectAll:l,clearSelection:l,getScrolledContainer:function(){return null}}});function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,r=new Array(t);o<t;o++)r[o]=e[o];return r}var b={y:0,x:0,width:0,height:0};function S(e){var r,n,l=e.fixedPosition,c=e.getSetState,i=e.className,s=(r=(0,t.useState)(b),n=2,function(e){if(Array.isArray(e))return e}(r)||function(e,t){var o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var r,n,l=[],c=!0,i=!1;try{for(o=o.call(e);!(c=(r=o.next()).done)&&(l.push(r.value),!t||l.length!==t);c=!0);}catch(e){i=!0,n=e}finally{try{c||null==o.return||o.return()}finally{if(i)throw n}}return l}}(r,n)||function(e,t){if(e){if("string"==typeof e)return v(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(e):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?v(e,t):void 0}}(r,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=s[0],u=s[1];(0,t.useEffect)((function(){c(u)}),[]);var f={left:a.x,top:a.y,width:a.width,height:a.height,zIndex:9e3,position:l?"fixed":"absolute",cursor:"default",willChange:"transform",transform:"translateZ(0)"};return o().createElement("div",{className:i,style:f})}function g(e){return g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},g(e)}function w(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function O(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?w(Object(o),!0).forEach((function(t){M(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):w(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function C(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var r,n,l=[],c=!0,i=!1;try{for(o=o.call(e);!(c=(r=o.next()).done)&&(l.push(r.value),!t||l.length!==t);c=!0);}catch(e){i=!0,n=e}finally{try{c||null==o.return||o.return()}finally{if(i)throw n}}return l}}(e,t)||x(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(e){return function(e){if(Array.isArray(e))return I(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||x(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function k(e,t){var o="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!o){if(Array.isArray(e)||(o=x(e))||t&&e&&"number"==typeof e.length){o&&(e=o);var r=0,n=function(){};return{s:n,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var l,c=!0,i=!1;return{s:function(){o=o.call(e)},n:function(){var e=o.next();return c=e.done,e},e:function(e){i=!0,l=e},f:function(){try{c||null==o.return||o.return()}finally{if(i)throw l}}}}function x(e,t){if(e){if("string"==typeof e)return I(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(e):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?I(e,t):void 0}}function I(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,r=new Array(t);o<t;o++)r[o]=e[o];return r}function P(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function E(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function L(e,t){return L=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},L(e,t)}function T(e,t){if(t&&("object"===g(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return R(e)}function R(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function D(e){return D=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},D(e)}function M(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}S.defaultProps={className:"selectable-selectbox"};var A=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&L(e,t)}(a,e);var t,r,n,l,s=(n=a,l=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=D(n);if(l){var o=D(this).constructor;e=Reflect.construct(t,arguments,o)}else e=t.apply(this,arguments);return T(this,e)});function a(){var e;P(this,a);for(var t=arguments.length,o=new Array(t),r=0;r<t;r++)o[r]=arguments[r];return M(R(e=s.call.apply(s,[this].concat(o))),"state",{selectionMode:!1}),M(R(e),"mouseDownStarted",!1),M(R(e),"mouseMoveStarted",!1),M(R(e),"mouseMoved",!1),M(R(e),"mouseUpStarted",!1),M(R(e),"selectionStarted",!1),M(R(e),"deselectionStarted",!1),M(R(e),"clickedItem",void 0),M(R(e),"mouseDownData",{selectboxY:0,selectboxX:0,target:null}),M(R(e),"registry",new Set),M(R(e),"selectedItems",new Set),M(R(e),"selectingItems",new Set),M(R(e),"ignoreCheckCache",new Map),M(R(e),"ignoreList",e.props.ignoreList.concat([".selectable-select-all",".selectable-deselect-all"])),M(R(e),"ignoreListNodes",[]),M(R(e),"setSelectboxState",null),M(R(e),"selectableGroup",null),M(R(e),"scrollContainer",null),M(R(e),"maxScrollTop",0),M(R(e),"maxScrollLeft",0),M(R(e),"scrollBounds",null),M(R(e),"containerScroll",{scrollTop:0,scrollLeft:0}),M(R(e),"documentScroll",{scrollTop:0,scrollLeft:0}),M(R(e),"saveContainerScroll",(function(){var t=e.scrollContainer,o=t.scrollTop,r=t.scrollLeft;e.containerScroll={scrollTop:o,scrollLeft:r}})),M(R(e),"saveDocumentScroll",(function(){var t=c(),o=t.documentScrollLeft,r=t.documentScrollTop;e.documentScroll={scrollTop:r,scrollLeft:o}})),M(R(e),"updateRegistry",(function(){var t,o=k(e.registry.values());try{for(o.s();!(t=o.n()).done;)t.value.updateBounds(e.containerDocumentScroll)}catch(e){o.e(e)}finally{o.f()}})),M(R(e),"registerSelectable",(function(t){e.registry.add(t),t.state.isSelected&&e.selectedItems.add(t)})),M(R(e),"unregisterSelectable",(function(t){e.registry.delete(t);var o=e.selectedItems.has(t)||e.selectingItems.has(t);e.selectedItems.delete(t),e.selectingItems.delete(t),o&&e.props.onSelectedItemUnmount(t,j(e.selectedItems))})),M(R(e),"updateContainerScroll",(function(t){var o=e.containerScroll,r=o.scrollTop,n=o.scrollLeft;e.checkScrollTop(t.clientY,r),e.checkScrollBottom(t.clientY,r),e.checkScrollLeft(t.clientX,n),e.checkScrollRight(t.clientX,n)})),M(R(e),"getScrollStep",(function(t){var o=e.props,r=o.minimumSpeedFactor,n=o.scrollSpeed;return Math.max(t,r)*n})),M(R(e),"checkScrollTop",(function(t,o){var r=e.scrollBounds.top-t;(r>0||t<0)&&(e.scrollContainer.scrollTop=o-e.getScrollStep(r))})),M(R(e),"checkScrollBottom",(function(t,o){var r=t-e.scrollBounds.bottom;if(r>0||t>window.innerHeight){var n=o+e.getScrollStep(r);e.scrollContainer.scrollTop=Math.min(n,e.maxScrollTop)}})),M(R(e),"checkScrollLeft",(function(t,o){var r=e.scrollBounds.left-t;if(r>0||t<0){var n=o-e.getScrollStep(r);e.scrollContainer.scrollLeft=n}})),M(R(e),"checkScrollRight",(function(t,o){var r=t-e.scrollBounds.right;if(r>0||t>window.innerWidth){var n=o+e.getScrollStep(r);e.scrollContainer.scrollLeft=Math.min(n,e.maxScrollLeft)}})),M(R(e),"updateSelectBox",(function(t){var o=u(t);if(e.updateContainerScroll(o),!e.mouseMoveStarted){e.mouseMoveStarted=!0,e.mouseMoved=!0;var r=R(e).mouseDownData,n=o.clientX,l=o.clientY-e.scrollBounds.top+e.containerScroll.scrollTop,c=Math.min(l,r.selectboxY),i=n-e.scrollBounds.left+e.containerScroll.scrollLeft,s={x:Math.min(i,r.selectboxX),y:c,width:Math.abs(i-r.selectboxX),height:Math.abs(l-r.selectboxY)};e.setSelectboxState(s);var a={top:s.y+e.scrollBounds.top+e.documentScroll.scrollTop,left:s.x+e.scrollBounds.left+e.documentScroll.scrollLeft,width:s.width,height:s.height,offsetWidth:s.width||1,offsetHeight:s.height||1};e.selectItems(a),e.props.duringSelection(j(e.selectingItems)),e.mouseMoveStarted=!1}})),M(R(e),"selectItems",(function(t){var o,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.props,l=n.tolerance,c=n.enableDeselect,i=n.mixedDeselect,s=k(e.registry.values());try{for(s.s();!(o=s.n()).done;){var a=o.value;e.processItem({item:a,selectboxBounds:t,tolerance:l,mixedDeselect:i,enableDeselect:c,isFromClick:r&&r.isFromClick})}}catch(e){s.e(e)}finally{s.f()}})),M(R(e),"clearSelection",(function(){var t,o=k(e.selectedItems.values());try{for(o.s();!(t=o.n()).done;){var r=t.value;r.setState({isSelected:!1}),e.selectedItems.delete(r)}}catch(e){o.e(e)}finally{o.f()}e.setState({selectionMode:!1}),e.props.onSelectionFinish(j(e.selectedItems),e.selectableGroup),e.props.onSelectionClear()})),M(R(e),"selectAll",(function(){e.removeIgnoredItemsFromRegistry();var t,o=k(e.registry.values());try{for(o.s();!(t=o.n()).done;){var r=t.value;r.state.isSelected||(r.setState({isSelected:!0}),e.selectedItems.add(r))}}catch(e){o.e(e)}finally{o.f()}e.setState({selectionMode:!0}),e.props.onSelectionFinish(j(e.selectedItems),e.selectableGroup)})),M(R(e),"mouseDown",(function(t){var o=!t.type.includes("touch")&&!f(t,1,{allowAltClick:e.props.allowAltClick,allowCtrlClick:e.props.allowCtrlClick,allowMetaClick:e.props.allowMetaClick,allowShiftClick:e.props.allowShiftClick});if(!(e.mouseDownStarted||e.props.disabled||o))if(e.removeIgnoredItemsFromRegistry(),e.isInIgnoreList(t.target))e.mouseDownStarted=!1;else{e.props.resetOnStart&&e.clearSelection(),e.mouseDownStarted=!0,e.mouseUpStarted=!1;var r=u(t);if(!e.props.globalMouse&&!p(r.target,e.selectableGroup)){var n=C(i(e.selectableGroup,e.documentScroll),1)[0];if(!y({top:n.top,left:n.left,width:0,height:0,offsetHeight:n.offsetHeight,offsetWidth:n.offsetWidth},{top:r.pageY,left:r.pageX,width:0,height:0,offsetWidth:0,offsetHeight:0}))return}e.updateRootBounds(),e.updateRegistry(),e.mouseDownData={target:r.target,selectboxY:r.clientY-e.scrollBounds.top+e.containerScroll.scrollTop,selectboxX:r.clientX-e.scrollBounds.left+e.containerScroll.scrollLeft},e.props.selectingWithoutMouseMove&&e.updateSelectBox(r),r.preventDefault(),document.addEventListener("mousemove",e.updateSelectBox),document.addEventListener("mouseup",e.mouseUp),document.addEventListener("touchend",e.mouseUp)}})),M(R(e),"mouseUp",(function(t){if(!e.mouseUpStarted&&(e.mouseUpStarted=!0,e.mouseDownStarted=!1,e.removeTempEventListeners(),e.mouseDownData)){var o=u(t),r=o.pageX,n=o.pageY;if(!e.mouseMoved&&p(o.target,e.selectableGroup))e.handleClick(o,n,r);else{var l,c=k(e.selectingItems.values());try{for(c.s();!(l=c.n()).done;)l.value.setState({isSelected:!0,isSelecting:!1})}catch(e){c.e(e)}finally{c.f()}e.selectedItems=new Set([].concat(j(e.selectedItems),j(e.selectingItems))),e.selectingItems.clear(),1===o.which&&e.mouseDownData.target===o.target&&e.preventEvent(o.target,"click"),e.setSelectboxState({x:0,y:0,width:0,height:0}),e.props.onSelectionFinish(j(e.selectedItems),e.selectableGroup)}e.toggleSelectionMode(),e.cleanUp(),e.mouseMoved=!1}})),M(R(e),"keyListener",(function(t){27===t.keyCode&&e.clearSelection()})),M(R(e),"getGroupRef",(function(t){e.selectableGroup=t})),M(R(e),"getSelectboxSetState",(function(t){e.setSelectboxState=t})),M(R(e),"defaultContainerStyle",{position:"relative"}),M(R(e),"contextValue",{selectable:{register:e.registerSelectable,unregister:e.unregisterSelectable,selectAll:e.selectAll,clearSelection:e.clearSelection,getScrolledContainer:function(){return e.scrollContainer}}}),e}return t=a,(r=[{key:"componentDidMount",value:function(){this.props.scrollContainer?this.scrollContainer=document.querySelector(this.props.scrollContainer):this.scrollContainer=this.selectableGroup,this.scrollContainer.addEventListener("scroll",this.saveContainerScroll),document.addEventListener("scroll",this.saveDocumentScroll),this.selectableGroup.addEventListener("mousedown",this.mouseDown),this.selectableGroup.addEventListener("touchstart",this.mouseDown),this.props.deselectOnEsc&&(document.addEventListener("keydown",this.keyListener),document.addEventListener("keyup",this.keyListener)),this.removeIgnoredItemsFromRegistry()}},{key:"componentWillUnmount",value:function(){this.scrollContainer.removeEventListener("scroll",this.saveContainerScroll),document.removeEventListener("scroll",this.saveDocumentScroll),this.selectableGroup.removeEventListener("mousedown",this.mouseDown),this.selectableGroup.removeEventListener("touchstart",this.mouseDown),this.props.deselectOnEsc&&(document.removeEventListener("keydown",this.keyListener),document.removeEventListener("keyup",this.keyListener)),this.removeTempEventListeners(),this.selectedItems.clear(),this.selectingItems.clear()}},{key:"containerDocumentScroll",get:function(){return{scrollTop:this.containerScroll.scrollTop+this.documentScroll.scrollTop,scrollLeft:this.containerScroll.scrollLeft+this.documentScroll.scrollLeft}}},{key:"removeTempEventListeners",value:function(){document.removeEventListener("mousemove",this.updateSelectBox),document.removeEventListener("mouseup",this.mouseUp),document.removeEventListener("touchend",this.mouseUp)}},{key:"updateRootBounds",value:function(){this.scrollBounds=this.scrollContainer.getBoundingClientRect(),this.maxScrollTop=this.scrollContainer.scrollHeight-this.scrollContainer.clientHeight,this.maxScrollLeft=this.scrollContainer.scrollWidth-this.scrollContainer.clientWidth}},{key:"toggleSelectionMode",value:function(){var e=this.selectedItems,t=this.state.selectionMode;e.size&&!t&&this.setState({selectionMode:!0}),!e.size&&t&&this.setState({selectionMode:!1})}},{key:"processItem",value:function(e){var t=e.item,o=e.tolerance,r=e.selectboxBounds,n=e.enableDeselect,l=e.mixedDeselect,c=e.isFromClick,i=this.props.delta,s=y(r,t.bounds,o,i),a=t.state,u=a.isSelecting,f=a.isSelected;if(c&&s)return f?this.selectedItems.delete(t):this.selectedItems.add(t),t.setState({isSelected:!f}),this.clickedItem=t,t;if(!c&&s){if(f&&n&&(!this.selectionStarted||l))return t.setState({isSelected:!1}),t.deselected=!0,this.deselectionStarted=!0,this.selectedItems.delete(t);var p=l?!t.deselected:!this.deselectionStarted;if(!u&&!f&&p)return t.setState({isSelecting:!0}),this.selectionStarted=!0,this.selectingItems.add(t),{updateSelecting:!0}}return!c&&!s&&u&&this.selectingItems.has(t)?(t.setState({isSelecting:!1}),this.selectingItems.delete(t),{updateSelecting:!0}):null}},{key:"isInIgnoreList",value:function(e){if(e){if(void 0!==this.ignoreCheckCache.get(e))return this.ignoreCheckCache.get(e);var t=this.ignoreListNodes.some((function(t){return e===t||t.contains(e)}));return this.ignoreCheckCache.set(e,t),t}}},{key:"removeIgnoredItemsFromRegistry",value:function(){var e=this;this.ignoreListNodes=Array.from(document.querySelectorAll(this.ignoreList.join(", "))),this.registry=new Set(j(this.registry).filter((function(t){return!e.isInIgnoreList(t.node)}))),this.selectedItems=new Set(j(this.selectedItems).filter((function(t){return!e.isInIgnoreList(t.node)})))}},{key:"preventEvent",value:function(e,t){e.addEventListener(t,(function o(r){e.removeEventListener(t,o,!0),r.preventDefault(),r.stopPropagation()}),!0)}},{key:"cleanUp",value:function(){if(this.deselectionStarted=!1,this.selectionStarted=!1,this.props.mixedDeselect){var e,t=k(this.registry.values());try{for(t.s();!(e=t.n()).done;)e.value.deselected=!1}catch(e){t.e(e)}finally{t.f()}}}},{key:"handleClick",value:function(e,t,o){if(this.props.selectOnClick){var r=this.props,n=r.clickClassName,l=r.allowClickWithoutSelected,c=r.onSelectionFinish,i=e.target.classList||[],s=Array.from(i).includes(n);(l||this.selectedItems.size||s||e.ctrlKey)&&(this.selectItems({top:t,left:o,width:0,height:0,offsetWidth:0,offsetHeight:0},{isFromClick:!0}),c(j(this.selectedItems),this.selectableGroup,this.clickedItem),1===e.which&&this.preventEvent(e.target,"click"),2!==e.which&&3!==e.which||this.preventEvent(e.target,"contextmenu"))}}},{key:"render",value:function(){var e=this.state.selectionMode,t=this.props,r=t.component,n=void 0===r?"div":r,l=t.className,c=t.style,i=t.selectionModeClass,s=t.fixedPosition,a=t.selectboxClassName,u=t.children;return o().createElement(m.Provider,{value:this.contextValue},o().createElement(n,{ref:this.getGroupRef,style:O(O({},this.defaultContainerStyle),c),className:"".concat(l," ").concat(e?i:"")},u,o().createElement(S,{getSetState:this.getSelectboxSetState,className:a,fixedPosition:s})))}}])&&E(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),a}(t.Component);function _(e){return _="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_(e)}function B(){return B=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},B.apply(this,arguments)}function N(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function F(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function G(e,t){return G=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},G(e,t)}function U(e,t){if(t&&("object"===_(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return W(e)}function W(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function X(e){return X=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},X(e)}function Y(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}M(A,"defaultProps",{clickClassName:"",tolerance:0,globalMouse:!1,ignoreList:[],scrollSpeed:.25,minimumSpeedFactor:60,duringSelection:l,onSelectionFinish:l,onSelectionClear:l,onSelectedItemUnmount:l,allowClickWithoutSelected:!0,selectionModeClass:"in-selection-mode",resetOnStart:!1,disabled:!1,deselectOnEsc:!0,fixedPosition:!1,delta:1,allowAltClick:!1,allowCtrlClick:!1,allowMetaClick:!1,allowShiftClick:!1,selectOnClick:!0});var H=function(e){var r;return r=function(t){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&G(e,t)}(a,t);var r,n,l,c,s=(l=a,c=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=X(l);if(c){var o=X(this).constructor;e=Reflect.construct(t,arguments,o)}else e=t.apply(this,arguments);return U(this,e)});function a(){var e;N(this,a);for(var t=arguments.length,o=new Array(t),r=0;r<t;r++)o[r]=arguments[r];return Y(W(e=s.call.apply(s,[this].concat(o))),"state",{isSelected:e.props.isSelected,isSelecting:!1}),Y(W(e),"node",null),Y(W(e),"bounds",null),Y(W(e),"updateBounds",(function(t){e.bounds=i(e.node,t)})),Y(W(e),"getSelectableRef",(function(t){e.node=t})),e}return r=a,(n=[{key:"componentDidMount",value:function(){this.updateBounds(),this.context.selectable.register(this)}},{key:"componentWillUnmount",value:function(){this.context.selectable.unregister(this)}},{key:"render",value:function(){return o().createElement(e,B({},this.props,this.state,{selectableRef:this.getSelectableRef}))}}])&&F(r.prototype,n),Object.defineProperty(r,"prototype",{writable:!1}),a}(t.Component),Y(r,"contextType",m),Y(r,"defaultProps",{isSelected:!1}),r};function z(e){return z="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},z(e)}var K=["component","children","className"];function q(){return q=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},q.apply(this,arguments)}function V(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function $(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function Z(e,t){return Z=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},Z(e,t)}function J(e,t){if(t&&("object"===z(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return Q(e)}function Q(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function ee(e){return ee=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},ee(e)}function te(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}var oe=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&Z(e,t)}(i,e);var t,r,n,l,c=(n=i,l=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=ee(n);if(l){var o=ee(this).constructor;e=Reflect.construct(t,arguments,o)}else e=t.apply(this,arguments);return J(this,e)});function i(){var e;V(this,i);for(var t=arguments.length,o=new Array(t),r=0;r<t;r++)o[r]=arguments[r];return te(Q(e=c.call.apply(c,[this].concat(o))),"root",null),te(Q(e),"getRootRef",(function(t){e.root=t})),e}return t=i,(r=[{key:"componentDidMount",value:function(){this.root.addEventListener("mousedown",(function(e){return e.stopPropagation()}))}},{key:"render",value:function(){var e=this.props,t=e.component,r=void 0===t?"div":t,n=e.children,l=e.className,c=void 0===l?"":l,i=function(e,t){if(null==e)return{};var o,r,n=function(e,t){if(null==e)return{};var o,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)o=l[r],t.indexOf(o)>=0||(n[o]=e[o]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)o=l[r],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(n[o]=e[o])}return n}(e,K),s=r;return o().createElement(s,q({ref:this.getRootRef,className:"selectable-select-all ".concat(c),onClick:this.context.selectable.selectAll},i),n)}}])&&$(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),i}(t.Component);function re(e){return re="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},re(e)}te(oe,"contextType",m);var ne=["component","children","className"];function le(){return le=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},le.apply(this,arguments)}function ce(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function ie(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function se(e,t){return se=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},se(e,t)}function ae(e,t){if(t&&("object"===re(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return ue(e)}function ue(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function fe(e){return fe=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},fe(e)}function pe(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}var de=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&se(e,t)}(i,e);var t,r,n,l,c=(n=i,l=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=fe(n);if(l){var o=fe(this).constructor;e=Reflect.construct(t,arguments,o)}else e=t.apply(this,arguments);return ae(this,e)});function i(){var e;ce(this,i);for(var t=arguments.length,o=new Array(t),r=0;r<t;r++)o[r]=arguments[r];return pe(ue(e=c.call.apply(c,[this].concat(o))),"root",null),pe(ue(e),"getRootRef",(function(t){e.root=t})),e}return t=i,(r=[{key:"componentDidMount",value:function(){this.root.addEventListener("mousedown",(function(e){return e.stopPropagation()}))}},{key:"render",value:function(){var e=this.props,t=e.component,r=void 0===t?"div":t,n=e.children,l=e.className,c=function(e,t){if(null==e)return{};var o,r,n=function(e,t){if(null==e)return{};var o,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)o=l[r],t.indexOf(o)>=0||(n[o]=e[o]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)o=l[r],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(n[o]=e[o])}return n}(e,ne),i=r;return o().createElement(i,le({ref:this.getRootRef,className:"selectable-select-all ".concat(l),onClick:this.context.selectable.clearSelection},c),n)}}])&&ie(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),i}(t.Component);pe(de,"contextType",m)})(),n})()));
//# sourceMappingURL=index.js.map