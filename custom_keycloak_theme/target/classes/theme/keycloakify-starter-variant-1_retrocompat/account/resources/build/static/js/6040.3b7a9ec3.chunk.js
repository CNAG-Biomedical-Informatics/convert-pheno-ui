"use strict";(self.webpackChunkkeycloakify_starter=self.webpackChunkkeycloakify_starter||[]).push([[6040],{6040:function(e,s,a){a.r(s),a.d(s,{default:function(){return o}});var n=a(885),t=a(184),i=a(2791),r=a(6055),l=a(7123),c=a(7107);function o(e){var s=e.kcContext,a=e.i18n,o=e.doUseDefaultCss,u=e.Template,d=e.classes,m=(0,c.v)({doUseDefaultCss:o,classes:d}).getClassName,p=a.msg,g=a.msgStr,j=s.url,b=(0,i.useState)(!1),h=(0,n.Z)(b,2),f=h[0],v=h[1];return(0,t.jsx)(u,Object.assign({},{kcContext:s,i18n:a,doUseDefaultCss:o,classes:d},{headerNode:p("loginIdpReviewProfileTitle")},{children:(0,t.jsxs)("form",Object.assign({id:"kc-idp-review-profile-form",className:m("kcFormClass"),action:j.loginAction,method:"post"},{children:[(0,t.jsx)(l.M,{kcContext:s,onIsFormSubmittableValueChange:v,i18n:a,getClassName:m}),(0,t.jsxs)("div",Object.assign({className:m("kcFormGroupClass")},{children:[(0,t.jsx)("div",Object.assign({id:"kc-form-options",className:m("kcFormOptionsClass")},{children:(0,t.jsx)("div",{className:m("kcFormOptionsWrapperClass")})})),(0,t.jsx)("div",Object.assign({id:"kc-form-buttons",className:m("kcFormButtonsClass")},{children:(0,t.jsx)("input",{className:(0,r.W)(m("kcButtonClass"),m("kcButtonPrimaryClass"),m("kcButtonBlockClass"),m("kcButtonLargeClass")),type:"submit",value:g("doSubmit"),disabled:!f})}))]}))]}))}))}},7123:function(e,s,a){a.d(s,{M:function(){return l}});var n=a(184),t=a(2791),i=a(6055),r=a(1027);function l(e){var s=e.kcContext,a=e.onIsFormSubmittableValueChange,l=e.i18n,c=e.getClassName,o=e.BeforeField,u=e.AfterField,d=l.advancedMsg,m=l.msg,p=(0,r.Q)({kcContext:s,i18n:l}),g=p.formValidationState,j=g.fieldStateByAttributeName,b=g.isFormSubmittable,h=p.formValidationDispatch,f=p.attributesWithPassword;(0,t.useEffect)((function(){a(b)}),[b]);var v="";return(0,n.jsx)(n.Fragment,{children:f.map((function(e,s){var a,r=e.group,l=void 0===r?"":r,p=e.groupDisplayHeader,g=void 0===p?"":p,b=e.groupDisplayDescription,f=void 0===b?"":b,k=j[e.name],C=k.value,x=k.displayableErrors,N=(0,i.W)(c("kcFormGroupClass"),0!==x.length&&c("kcFormGroupErrorClass"));return(0,n.jsxs)(t.Fragment,{children:[l!==v&&""!==(v=l)&&(0,n.jsxs)("div",Object.assign({className:N},{children:[(0,n.jsx)("div",Object.assign({className:c("kcContentWrapperClass")},{children:(0,n.jsx)("label",Object.assign({id:"header-".concat(l),className:c("kcFormGroupHeader")},{children:d(g)||v}))})),""!==f&&(0,n.jsx)("div",Object.assign({className:c("kcLabelWrapperClass")},{children:(0,n.jsx)("label",Object.assign({id:"description-".concat(l),className:c("kcLabelClass")},{children:d(f)}))}))]})),o&&(0,n.jsx)(o,{attribute:e}),(0,n.jsxs)("div",Object.assign({className:N},{children:[(0,n.jsxs)("div",Object.assign({className:c("kcLabelWrapperClass")},{children:[(0,n.jsx)("label",Object.assign({htmlFor:e.name,className:c("kcLabelClass")},{children:d(null!==(a=e.displayName)&&void 0!==a?a:"")})),e.required&&(0,n.jsx)(n.Fragment,{children:"*"})]})),(0,n.jsxs)("div",Object.assign({className:c("kcInputWrapperClass")},{children:[function(){var s=e.validators.options;return void 0!==s?(0,n.jsx)("select",Object.assign({id:e.name,name:e.name,onChange:function(s){return h({action:"update value",name:e.name,newValue:s.target.value})},onBlur:function(){return h({action:"focus lost",name:e.name})},value:C},{children:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("option",Object.assign({value:"",selected:!0,disabled:!0,hidden:!0},{children:m("selectAnOption")})),s.options.map((function(e){return(0,n.jsx)("option",Object.assign({value:e},{children:e}),e)}))]})})):(0,n.jsx)("input",{type:function(){switch(e.name){case"password-confirm":case"password":return"password";default:return"text"}}(),id:e.name,name:e.name,value:C,onChange:function(s){return h({action:"update value",name:e.name,newValue:s.target.value})},onBlur:function(){return h({action:"focus lost",name:e.name})},className:c("kcInputClass"),"aria-invalid":0!==x.length,disabled:e.readOnly,autoComplete:e.autocomplete})}(),0!==x.length&&function(){var s="input-error-".concat(e.name);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("style",{children:"#".concat(s," > span: { display: block; }")}),(0,n.jsx)("span",Object.assign({id:s,className:c("kcInputErrorMessageClass"),style:{position:1===x.length?"absolute":void 0},"aria-live":"polite"},{children:x.map((function(e){return e.errorMessage}))}))]})}()]}))]})),u&&(0,n.jsx)(u,{attribute:e})]},s)}))})}}}]);
//# sourceMappingURL=6040.3b7a9ec3.chunk.js.map
