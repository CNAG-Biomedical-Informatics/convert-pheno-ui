"use strict";(self.webpackChunkkeycloakify_starter=self.webpackChunkkeycloakify_starter||[]).push([[5738],{5738:function(e,r,s){s.r(r),s.d(r,{default:function(){return m}});var a=s(1413),n=s(885),t=s(2791),o=s(6055),i=s(969),l=s(7107),c=s(57),d=s(184),u=(0,c.retrieveQueryParamFromUrl)({url:window.location.href,name:"my_custom_param"});function m(e){var r=e.kcContext,s=e.i18n,c=e.doUseDefaultCss,u=e.Template,m=e.classes,p=(0,l.v)({doUseDefaultCss:c,classes:m}).getClassName,f=r.social,v=r.realm,h=r.url,x=r.usernameHidden,b=r.login,k=r.auth,j=r.registrationDisabled,y=s.msg,C=s.msgStr,w=(0,t.useState)(!1),g=(0,n.Z)(w,2),P=g[0],F=g[1],O=(0,i.O)((function(e){var r;e.preventDefault(),F(!0);var s=e.target;null===(r=s.querySelector("input[name='email']"))||void 0===r||r.setAttribute("name","username"),s.submit()}));return(0,d.jsx)(u,{kcContext:r,i18n:s,doUseDefaultCss:c,classes:m,displayInfo:f.displayInfo,displayWide:v.password&&void 0!==f.providers,headerNode:y("doLogIn"),infoNode:v.password&&v.registrationAllowed&&!j&&(0,d.jsx)("div",{id:"kc-registration",children:(0,d.jsxs)("span",{children:[y("noAccount"),(0,d.jsx)("a",{tabIndex:6,href:h.registrationUrl,children:y("doRegister")})]})}),children:(0,d.jsxs)("div",{id:"kc-form",className:(0,o.W)(v.password&&void 0!==f.providers&&p("kcContentWrapperClass")),children:[(0,d.jsx)("div",{id:"kc-form-wrapper",className:(0,o.W)(v.password&&f.providers&&[p("kcFormSocialAccountContentClass"),p("kcFormSocialAccountClass")]),children:v.password&&(0,d.jsxs)("form",{id:"kc-form-login",onSubmit:O,action:h.loginAction,method:"post",children:[(0,d.jsx)("div",{className:p("kcFormGroupClass"),children:!x&&function(){var e,r=v.loginWithEmailAllowed?v.registrationEmailAsUsername?"email":"usernameOrEmail":"username",s="usernameOrEmail"===r?"username":r;return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("label",{htmlFor:s,className:p("kcLabelClass"),children:y(r)}),(0,d.jsx)("input",{tabIndex:1,id:s,className:p("kcInputClass"),name:s,defaultValue:null!==(e=b.username)&&void 0!==e?e:"",type:"text",autoFocus:!0,autoComplete:"off"})]})}()}),(0,d.jsxs)("div",{className:p("kcFormGroupClass"),children:[(0,d.jsx)("label",{htmlFor:"password",className:p("kcLabelClass"),children:y("password")}),(0,d.jsx)("input",{tabIndex:2,id:"password",className:p("kcInputClass"),name:"password",type:"password",autoComplete:"off"})]}),(0,d.jsxs)("div",{className:(0,o.W)(p("kcFormGroupClass"),p("kcFormSettingClass")),children:[(0,d.jsx)("div",{id:"kc-form-options",children:v.rememberMe&&!x&&(0,d.jsx)("div",{className:"checkbox",children:(0,d.jsxs)("label",{children:[(0,d.jsx)("input",(0,a.Z)({tabIndex:3,id:"rememberMe",name:"rememberMe",type:"checkbox"},"on"===b.rememberMe?{checked:!0}:{})),y("rememberMe")]})})}),(0,d.jsx)("div",{className:p("kcFormOptionsWrapperClass"),children:v.resetPasswordAllowed&&(0,d.jsx)("span",{children:(0,d.jsx)("a",{tabIndex:5,href:h.loginResetCredentialsUrl,children:y("doForgotPassword")})})})]}),(0,d.jsxs)("div",{id:"kc-form-buttons",className:p("kcFormGroupClass"),children:[(0,d.jsx)("input",(0,a.Z)({type:"hidden",id:"id-hidden-input",name:"credentialId"},void 0!==(null===k||void 0===k?void 0:k.selectedCredential)?{value:k.selectedCredential}:{})),(0,d.jsx)("input",{tabIndex:4,className:(0,o.W)(p("kcButtonClass"),p("kcButtonPrimaryClass"),p("kcButtonBlockClass"),p("kcButtonLargeClass")),name:"login",id:"kc-login",type:"submit",value:C("doLogIn"),disabled:P})]})]})}),v.password&&void 0!==f.providers&&(0,d.jsx)("div",{id:"kc-social-providers",className:(0,o.W)(p("kcFormSocialAccountContentClass"),p("kcFormSocialAccountClass")),children:(0,d.jsx)("ul",{className:(0,o.W)(p("kcFormSocialAccountListClass"),f.providers.length>4&&p("kcFormSocialAccountDoubleListClass")),children:f.providers.map((function(e){return(0,d.jsx)("li",{className:p("kcFormSocialAccountListLinkClass"),children:(0,d.jsx)("a",{href:e.loginUrl,id:"zocial-".concat(e.alias),className:(0,o.W)("zocial",e.providerId),children:(0,d.jsx)("span",{children:e.displayName})})},e.providerId)}))})})]})})}u.wasPresent&&console.log("my_custom_param",u.value)},57:function(e,r){var s=this&&this.__read||function(e,r){var s="function"===typeof Symbol&&e[Symbol.iterator];if(!s)return e;var a,n,t=s.call(e),o=[];try{for(;(void 0===r||r-- >0)&&!(a=t.next()).done;)o.push(a.value)}catch(i){n={error:i}}finally{try{a&&!a.done&&(s=t.return)&&s.call(t)}finally{if(n)throw n.error}}return o};function a(e){var r=e.url,a=e.prefix,n=e.doLeavePrefixInResults,t=s(r.split("?"),2),o=t[0],i=t[1],l=void 0===i?"":i,c={},d=function(){var e=l.replace(/^\?/,"").split("&").map((function(e){return e.split("=")})).filter((function(e){var r=s(e,2),t=r[0],o=r[1];return!t.startsWith(a)||(c[n?t:t.substring(a.length)]=decodeURIComponent(o),!1)})).map((function(e){return e.join("=")})).join("&");return{newLocationSearch:e=""===e?"":"?".concat(e)}}().newLocationSearch;return{newUrl:"".concat(o).concat(d),values:c}}function n(e){var r=e.url,s=e.name,n=a({url:r,prefix:s,doLeavePrefixInResults:!0}),t=n.newUrl,o=n.values;return s in o?{wasPresent:!0,newUrl:t,value:o[s]}:{wasPresent:!1}}Object.defineProperty(r,"__esModule",{value:!0}),r.retrieveQueryParamFromUrl=r.retrieveAllQueryParamStartingWithPrefixFromUrl=r.addQueryParamToUrl=void 0,r.addQueryParamToUrl=function(e){var r=e.url,s=e.name,a=e.value,t=r,o=n({url:r,name:s});return o.wasPresent&&(t=o.newUrl),{newUrl:t+="".concat(t.includes("?")?"&":t.endsWith("?")?"":"?").concat(s,"=").concat(encodeURIComponent(a))}},r.retrieveAllQueryParamStartingWithPrefixFromUrl=a,r.retrieveQueryParamFromUrl=n},1413:function(e,r,s){s.d(r,{Z:function(){return t}});var a=s(2167);function n(e,r){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),s.push.apply(s,a)}return s}function t(e){for(var r=1;r<arguments.length;r++){var s=null!=arguments[r]?arguments[r]:{};r%2?n(Object(s),!0).forEach((function(r){(0,a.Z)(e,r,s[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):n(Object(s)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(s,r))}))}return e}}}]);
//# sourceMappingURL=5738.e7fbf7e1.chunk.js.map