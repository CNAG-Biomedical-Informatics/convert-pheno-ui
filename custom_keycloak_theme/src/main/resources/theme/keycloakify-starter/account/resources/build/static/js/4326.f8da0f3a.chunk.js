"use strict";(self.webpackChunkkeycloakify_starter=self.webpackChunkkeycloakify_starter||[]).push([[4326],{4326:function(e,s,a){a.r(s),a.d(s,{default:function(){return l}});var r=a(8258),n=a(6055),t=a(7747),c=a(7107),i=a(184);function l(e){var s=e.displayInfo,a=void 0!==s&&s,l=e.displayMessage,o=void 0===l||l,d=e.displayRequiredFields,p=void 0!==d&&d,u=e.displayWide,m=void 0!==u&&u,h=e.showAnotherWayIfPresent,f=void 0===h||h,k=e.headerNode,v=e.showUsernameNode,x=void 0===v?null:v,y=e.infoNode,j=void 0===y?null:y,N=e.kcContext,C=e.i18n,g=e.doUseDefaultCss,w=e.classes,b=e.children,F=(0,c.v)({doUseDefaultCss:g,classes:w}).getClassName,W=C.msg,L=C.changeLocale,T=C.labelBySupportedLanguageTag,E=C.currentLanguageTag,I=N.realm,A=N.locale,R=N.auth,H=N.url,U=N.message,Z=N.isAppInitiatedAction;return(0,t.M)({doFetchDefaultThemeResources:g,styles:["".concat(H.resourcesCommonPath,"/node_modules/patternfly/dist/css/patternfly.min.css"),"".concat(H.resourcesCommonPath,"/node_modules/patternfly/dist/css/patternfly-additions.min.css"),"".concat(H.resourcesCommonPath,"/lib/zocial/zocial.css"),"".concat(H.resourcesPath,"/css/login.css")],htmlClassName:F("kcHtmlClass"),bodyClassName:F("kcBodyClass")}).isReady?(0,i.jsxs)("div",{className:F("kcLoginClass"),children:[(0,i.jsx)("div",{id:"kc-header",className:F("kcHeaderClass"),children:(0,i.jsxs)("div",{id:"kc-header-wrapper",className:F("kcHeaderWrapperClass"),style:{fontFamily:'"Work Sans"'},children:[W("loginTitleHtml",I.displayNameHtml),"!!!"]})}),(0,i.jsxs)("div",{className:(0,n.W)(F("kcFormCardClass"),m&&F("kcFormCardAccountClass")),children:[(0,i.jsxs)("header",{className:F("kcFormHeaderClass"),children:[I.internationalizationEnabled&&((0,r.h)(void 0!==A),!0)&&A.supported.length>1&&(0,i.jsx)("div",{id:"kc-locale",children:(0,i.jsx)("div",{id:"kc-locale-wrapper",className:F("kcLocaleWrapperClass"),children:(0,i.jsxs)("div",{className:"kc-dropdown",id:"kc-locale-dropdown",children:[(0,i.jsx)("a",{href:"#",id:"kc-current-locale-link",children:T[E]}),(0,i.jsx)("ul",{children:A.supported.map((function(e){var s=e.languageTag;return(0,i.jsx)("li",{className:"kc-dropdown-item",children:(0,i.jsx)("a",{href:"#",onClick:function(){return L(s)},children:T[s]})},s)}))})]})})}),void 0===R||!R.showUsername||R.showResetCredentials?p?(0,i.jsxs)("div",{className:F("kcContentWrapperClass"),children:[(0,i.jsx)("div",{className:(0,n.W)(F("kcLabelWrapperClass"),"subtitle"),children:(0,i.jsxs)("span",{className:"subtitle",children:[(0,i.jsx)("span",{className:"required",children:"*"}),W("requiredFields")]})}),(0,i.jsx)("div",{className:"col-md-10",children:(0,i.jsx)("h1",{id:"kc-page-title",children:k})})]}):(0,i.jsx)("h1",{id:"kc-page-title",children:k}):p?(0,i.jsxs)("div",{className:F("kcContentWrapperClass"),children:[(0,i.jsx)("div",{className:(0,n.W)(F("kcLabelWrapperClass"),"subtitle"),children:(0,i.jsxs)("span",{className:"subtitle",children:[(0,i.jsx)("span",{className:"required",children:"*"})," ",W("requiredFields")]})}),(0,i.jsxs)("div",{className:"col-md-10",children:[x,(0,i.jsx)("div",{className:F("kcFormGroupClass"),children:(0,i.jsxs)("div",{id:"kc-username",children:[(0,i.jsx)("label",{id:"kc-attempted-username",children:null===R||void 0===R?void 0:R.attemptedUsername}),(0,i.jsx)("a",{id:"reset-login",href:H.loginRestartFlowUrl,children:(0,i.jsxs)("div",{className:"kc-login-tooltip",children:[(0,i.jsx)("i",{className:F("kcResetFlowIcon")}),(0,i.jsx)("span",{className:"kc-tooltip-text",children:W("restartLoginTooltip")})]})})]})})]})]}):(0,i.jsxs)(i.Fragment,{children:[x,(0,i.jsx)("div",{className:F("kcFormGroupClass"),children:(0,i.jsxs)("div",{id:"kc-username",children:[(0,i.jsx)("label",{id:"kc-attempted-username",children:null===R||void 0===R?void 0:R.attemptedUsername}),(0,i.jsx)("a",{id:"reset-login",href:H.loginRestartFlowUrl,children:(0,i.jsxs)("div",{className:"kc-login-tooltip",children:[(0,i.jsx)("i",{className:F("kcResetFlowIcon")}),(0,i.jsx)("span",{className:"kc-tooltip-text",children:W("restartLoginTooltip")})]})})]})})]})]}),(0,i.jsx)("div",{id:"kc-content",children:(0,i.jsxs)("div",{id:"kc-content-wrapper",children:[o&&void 0!==U&&("warning"!==U.type||!Z)&&(0,i.jsxs)("div",{className:(0,n.W)("alert","alert-".concat(U.type)),children:["success"===U.type&&(0,i.jsx)("span",{className:F("kcFeedbackSuccessIcon")}),"warning"===U.type&&(0,i.jsx)("span",{className:F("kcFeedbackWarningIcon")}),"error"===U.type&&(0,i.jsx)("span",{className:F("kcFeedbackErrorIcon")}),"info"===U.type&&(0,i.jsx)("span",{className:F("kcFeedbackInfoIcon")}),(0,i.jsx)("span",{className:"kc-feedback-text",dangerouslySetInnerHTML:{__html:U.summary}})]}),b,void 0!==R&&R.showTryAnotherWayLink&&f&&(0,i.jsx)("form",{id:"kc-select-try-another-way-form",action:H.loginAction,method:"post",className:(0,n.W)(m&&F("kcContentWrapperClass")),children:(0,i.jsx)("div",{className:(0,n.W)(m&&[F("kcFormSocialAccountContentClass"),F("kcFormSocialAccountClass")]),children:(0,i.jsxs)("div",{className:F("kcFormGroupClass"),children:[(0,i.jsx)("input",{type:"hidden",name:"tryAnotherWay",value:"on"}),(0,i.jsx)("a",{href:"#",id:"try-another-way",onClick:function(){return document.forms["kc-select-try-another-way-form"].submit(),!1},children:W("doTryAnotherWay")})]})})}),a&&(0,i.jsx)("div",{id:"kc-info",className:F("kcSignUpClass"),children:(0,i.jsx)("div",{id:"kc-info-wrapper",className:F("kcInfoAreaWrapperClass"),children:j})})]})})]})]}):null}},7747:function(e,s,a){a.d(s,{M:function(){return p}});var r=a(4165),n=a(2982),t=a(7762),c=a(5861),i=a(885),l=a(2791),o=a(1630),d=a(6055);function p(e){var s=e.doFetchDefaultThemeResources,a=e.styles,d=void 0===a?[]:a,p=e.scripts,m=void 0===p?[]:p,h=e.htmlClassName,f=e.bodyClassName,k=(0,l.useReducer)((function(){return!0}),!s),v=(0,i.Z)(k,2),x=v[0],y=v[1];return(0,l.useEffect)((function(){if(s){var e=!1,a=[];return(0,c.Z)((0,r.Z)().mark((function s(){var c,i,l,p,u,m;return(0,r.Z)().wrap((function(s){for(;;)switch(s.prev=s.next){case 0:c=(0,t.Z)((0,n.Z)(d).reverse()),s.prev=1,c.s();case 3:if((i=c.n()).done){s.next=13;break}return l=i.value,p=(0,o.t)({type:"css",position:"prepend",href:l}),u=p.prLoaded,m=p.remove,a.push(m),s.next=9,u;case 9:if(!e){s.next=11;break}return s.abrupt("return");case 11:s.next=3;break;case 13:s.next=18;break;case 15:s.prev=15,s.t0=s.catch(1),c.e(s.t0);case 18:return s.prev=18,c.f(),s.finish(18);case 21:y();case 22:case"end":return s.stop()}}),s,null,[[1,15,18,21]])})))(),m.forEach((function(e){var s=(0,o.t)({type:"javascript",src:e}).remove;a.push(s)})),function(){e=!0,a.forEach((function(e){return e()}))}}}),[]),u({target:"html",className:h}),u({target:"body",className:f}),{isReady:x}}function u(e){var s=e.target,a=e.className;(0,l.useEffect)((function(){if(void 0!==a){var e=document.getElementsByTagName(s)[0].classList,r=(0,d.W)(a).split(" ");return e.add.apply(e,(0,n.Z)(r)),function(){e.remove.apply(e,(0,n.Z)(r))}}}),[a])}},4943:function(){HTMLElement.prototype.prepend||(HTMLElement.prototype.prepend=function(e){if("string"===typeof e)throw new Error("Error with HTMLElement.prototype.appendFirst polyfill");this.insertBefore(e,this.firstChild)})},8258:function(e,s,a){a.d(s,{h:function(){return r.h}});var r=a(9883)},1630:function(e,s,a){a.d(s,{t:function(){return n}});a(4943);var r=a(3172);function n(e){var s=document.createElement(function(){switch(e.type){case"css":return"link";case"javascript":return"script"}}()),a=new r.Deferred;return s.addEventListener("load",(function(){return a.resolve()})),Object.assign(s,function(){switch(e.type){case"css":return{href:e.href,type:"text/css",rel:"stylesheet",media:"screen,print"};case"javascript":return{src:e.src,type:"text/javascript"}}}()),document.getElementsByTagName("head")[0][function(){switch(e.type){case"javascript":return"appendChild";case"css":return function(){switch(e.position){case"append":return"appendChild";case"prepend":return"prepend"}}()}}()](s),{prLoaded:a.pr,remove:function(){return s.remove()}}}}}]);
//# sourceMappingURL=4326.f8da0f3a.chunk.js.map