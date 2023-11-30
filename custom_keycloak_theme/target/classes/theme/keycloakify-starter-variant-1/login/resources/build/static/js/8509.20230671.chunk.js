"use strict";(self.webpackChunkkeycloakify_starter=self.webpackChunkkeycloakify_starter||[]).push([[8509],{5995:function(e,s,a){a.r(s),a.d(s,{default:function(){return o}});var t=a(885),n=a(184),i=a(2791),r=a(6055),c=a(7123),l=a(7107);function o(e){var s=e.kcContext,a=e.i18n,o=e.doUseDefaultCss,d=e.Template,u=e.classes,m=(0,l.v)({doUseDefaultCss:o,classes:u}).getClassName,p=s.url,g=s.messagesPerField,j=s.recaptchaRequired,h=s.recaptchaSiteKey;s.realm.registrationEmailAsUsername;var b=a.msg,v=a.msgStr,f=(0,i.useState)(!1),x=(0,t.Z)(f,2),k=x[0],C=x[1];return(0,n.jsx)(d,Object.assign({},{kcContext:s,i18n:a,doUseDefaultCss:o,classes:u},{displayMessage:g.exists("global"),displayRequiredFields:!0,headerNode:b("registerTitle")},{children:(0,n.jsxs)("form",Object.assign({id:"kc-register-form",className:m("kcFormClass"),action:p.registrationAction,method:"post"},{children:[(0,n.jsx)(c.M,{kcContext:s,onIsFormSubmittableValueChange:C,i18n:a,getClassName:m}),j&&(0,n.jsx)("div",Object.assign({className:"form-group"},{children:(0,n.jsx)("div",Object.assign({className:m("kcInputWrapperClass")},{children:(0,n.jsx)("div",{className:"g-recaptcha","data-size":"compact","data-sitekey":h})}))})),(0,n.jsxs)("div",Object.assign({className:m("kcFormGroupClass"),style:{marginBottom:30}},{children:[(0,n.jsx)("div",Object.assign({id:"kc-form-options",className:m("kcFormOptionsClass")},{children:(0,n.jsx)("div",Object.assign({className:m("kcFormOptionsWrapperClass")},{children:(0,n.jsx)("span",{children:(0,n.jsx)("a",Object.assign({href:p.loginUrl},{children:b("backToLogin")}))})}))})),(0,n.jsx)("div",Object.assign({id:"kc-form-buttons",className:m("kcFormButtonsClass")},{children:(0,n.jsx)("input",{className:(0,r.W)(m("kcButtonClass"),m("kcButtonPrimaryClass"),m("kcButtonBlockClass"),m("kcButtonLargeClass")),type:"submit",value:v("doRegister"),disabled:!k})}))]}))]}))}))}},7123:function(e,s,a){a.d(s,{M:function(){return c}});var t=a(184),n=a(2791),i=a(6055),r=a(1027);function c(e){var s=e.kcContext,a=e.onIsFormSubmittableValueChange,c=e.i18n,l=e.getClassName,o=e.BeforeField,d=e.AfterField,u=c.advancedMsg,m=c.msg,p=(0,r.Q)({kcContext:s,i18n:c}),g=p.formValidationState,j=g.fieldStateByAttributeName,h=g.isFormSubmittable,b=p.formValidationDispatch,v=p.attributesWithPassword;(0,n.useEffect)((function(){a(h)}),[h]);var f="";return(0,t.jsx)(t.Fragment,{children:v.map((function(e,s){var a,r=e.group,c=void 0===r?"":r,p=e.groupDisplayHeader,g=void 0===p?"":p,h=e.groupDisplayDescription,v=void 0===h?"":h,x=j[e.name],k=x.value,C=x.displayableErrors,N=(0,i.W)(l("kcFormGroupClass"),0!==C.length&&l("kcFormGroupErrorClass"));return(0,t.jsxs)(n.Fragment,{children:[c!==f&&""!==(f=c)&&(0,t.jsxs)("div",Object.assign({className:N},{children:[(0,t.jsx)("div",Object.assign({className:l("kcContentWrapperClass")},{children:(0,t.jsx)("label",Object.assign({id:"header-".concat(c),className:l("kcFormGroupHeader")},{children:u(g)||f}))})),""!==v&&(0,t.jsx)("div",Object.assign({className:l("kcLabelWrapperClass")},{children:(0,t.jsx)("label",Object.assign({id:"description-".concat(c),className:l("kcLabelClass")},{children:u(v)}))}))]})),o&&(0,t.jsx)(o,{attribute:e}),(0,t.jsxs)("div",Object.assign({className:N},{children:[(0,t.jsxs)("div",Object.assign({className:l("kcLabelWrapperClass")},{children:[(0,t.jsx)("label",Object.assign({htmlFor:e.name,className:l("kcLabelClass")},{children:u(null!==(a=e.displayName)&&void 0!==a?a:"")})),e.required&&(0,t.jsx)(t.Fragment,{children:"*"})]})),(0,t.jsxs)("div",Object.assign({className:l("kcInputWrapperClass")},{children:[function(){var s=e.validators.options;return void 0!==s?(0,t.jsx)("select",Object.assign({id:e.name,name:e.name,onChange:function(s){return b({action:"update value",name:e.name,newValue:s.target.value})},onBlur:function(){return b({action:"focus lost",name:e.name})},value:k},{children:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("option",Object.assign({value:"",selected:!0,disabled:!0,hidden:!0},{children:m("selectAnOption")})),s.options.map((function(e){return(0,t.jsx)("option",Object.assign({value:e},{children:e}),e)}))]})})):(0,t.jsx)("input",{type:function(){switch(e.name){case"password-confirm":case"password":return"password";default:return"text"}}(),id:e.name,name:e.name,value:k,onChange:function(s){return b({action:"update value",name:e.name,newValue:s.target.value})},onBlur:function(){return b({action:"focus lost",name:e.name})},className:l("kcInputClass"),"aria-invalid":0!==C.length,disabled:e.readOnly,autoComplete:e.autocomplete})}(),0!==C.length&&function(){var s="input-error-".concat(e.name);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("style",{children:"#".concat(s," > span: { display: block; }")}),(0,t.jsx)("span",Object.assign({id:s,className:l("kcInputErrorMessageClass"),style:{position:1===C.length?"absolute":void 0},"aria-live":"polite"},{children:C.map((function(e){return e.errorMessage}))}))]})}()]}))]})),d&&(0,t.jsx)(d,{attribute:e})]},s)}))})}}}]);
//# sourceMappingURL=8509.20230671.chunk.js.map
