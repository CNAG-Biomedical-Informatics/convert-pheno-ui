"use strict";(self.webpackChunkkeycloakify_starter=self.webpackChunkkeycloakify_starter||[]).push([[9180],{9180:function(e,s,a){a.r(s),a.d(s,{default:function(){return c}});var t=a(885),n=a(2791),r=a(6055),i=a(7123),l=a(7107),o=a(184);function c(e){var s=e.kcContext,a=e.i18n,c=e.doUseDefaultCss,u=e.Template,d=e.classes,m=(0,l.v)({doUseDefaultCss:c,classes:d}).getClassName,p=a.msg,f=a.msgStr,b=s.url,g=s.isAppInitiatedAction,C=(0,n.useState)(!1),k=(0,t.Z)(C,2),h=k[0],j=k[1];console.log("UpdateUserProfile",{kcContext:s,i18n:a,doUseDefaultCss:c,classes:d});var x=s.profile.attributes.filter((function(e){return"email"!==e.name})),v=x.filter((function(e){return"firstName"!==e.name}));return console.log("UpdateUserProfile",{profileAttributesWithoutEmail:x}),s.profile.attributes=v,delete s.profile.attributesByName.email,delete s.profile.attributesByName.firstName,console.log("New kcContext UpdateUserProfile",{kcContext:s}),(0,o.jsx)(u,{kcContext:s,i18n:a,doUseDefaultCss:c,classes:d,headerNode:p("loginProfileTitle"),children:(0,o.jsxs)("form",{id:"kc-update-profile-form",className:m("kcFormClass"),action:b.loginAction,method:"post",children:[(0,o.jsx)(i.M,{kcContext:s,onIsFormSubmittableValueChange:j,i18n:a,getClassName:m}),(0,o.jsxs)("div",{className:m("kcFormGroupClass"),children:[(0,o.jsx)("div",{id:"kc-form-options",className:m("kcFormOptionsClass"),children:(0,o.jsx)("div",{className:m("kcFormOptionsWrapperClass")})}),(0,o.jsx)("div",{id:"kc-form-buttons",className:m("kcFormButtonsClass"),children:g?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("input",{className:(0,r.W)(m("kcButtonClass"),m("kcButtonPrimaryClass"),m("kcButtonLargeClass")),type:"submit",value:f("doSubmit")}),(0,o.jsx)("button",{className:(0,r.W)(m("kcButtonClass"),m("kcButtonDefaultClass"),m("kcButtonLargeClass")),type:"submit",name:"cancel-aia",value:"true",formNoValidate:!0,children:p("doCancel")})]}):(0,o.jsx)("input",{className:(0,r.W)(m("kcButtonClass"),m("kcButtonPrimaryClass"),m("kcButtonBlockClass"),m("kcButtonLargeClass")),type:"submit",defaultValue:f("doSubmit"),disabled:!h})})]})]})})}},7123:function(e,s,a){a.d(s,{M:function(){return l}});var t=a(184),n=a(2791),r=a(6055),i=a(1027);function l(e){var s=e.kcContext,a=e.onIsFormSubmittableValueChange,l=e.i18n,o=e.getClassName,c=e.BeforeField,u=e.AfterField,d=l.advancedMsg,m=l.msg,p=(0,i.Q)({kcContext:s,i18n:l}),f=p.formValidationState,b=f.fieldStateByAttributeName,g=f.isFormSubmittable,C=p.formValidationDispatch,k=p.attributesWithPassword;(0,n.useEffect)((function(){a(g)}),[g]);var h="";return(0,t.jsx)(t.Fragment,{children:k.map((function(e,s){var a,i=e.group,l=void 0===i?"":i,p=e.groupDisplayHeader,f=void 0===p?"":p,g=e.groupDisplayDescription,k=void 0===g?"":g,j=b[e.name],x=j.value,v=j.displayableErrors,N=(0,r.W)(o("kcFormGroupClass"),0!==v.length&&o("kcFormGroupErrorClass"));return(0,t.jsxs)(n.Fragment,{children:[l!==h&&""!==(h=l)&&(0,t.jsxs)("div",Object.assign({className:N},{children:[(0,t.jsx)("div",Object.assign({className:o("kcContentWrapperClass")},{children:(0,t.jsx)("label",Object.assign({id:"header-".concat(l),className:o("kcFormGroupHeader")},{children:d(f)||h}))})),""!==k&&(0,t.jsx)("div",Object.assign({className:o("kcLabelWrapperClass")},{children:(0,t.jsx)("label",Object.assign({id:"description-".concat(l),className:o("kcLabelClass")},{children:d(k)}))}))]})),c&&(0,t.jsx)(c,{attribute:e}),(0,t.jsxs)("div",Object.assign({className:N},{children:[(0,t.jsxs)("div",Object.assign({className:o("kcLabelWrapperClass")},{children:[(0,t.jsx)("label",Object.assign({htmlFor:e.name,className:o("kcLabelClass")},{children:d(null!==(a=e.displayName)&&void 0!==a?a:"")})),e.required&&(0,t.jsx)(t.Fragment,{children:"*"})]})),(0,t.jsxs)("div",Object.assign({className:o("kcInputWrapperClass")},{children:[function(){var s=e.validators.options;return void 0!==s?(0,t.jsx)("select",Object.assign({id:e.name,name:e.name,onChange:function(s){return C({action:"update value",name:e.name,newValue:s.target.value})},onBlur:function(){return C({action:"focus lost",name:e.name})},value:x},{children:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("option",Object.assign({value:"",selected:!0,disabled:!0,hidden:!0},{children:m("selectAnOption")})),s.options.map((function(e){return(0,t.jsx)("option",Object.assign({value:e},{children:e}),e)}))]})})):(0,t.jsx)("input",{type:function(){switch(e.name){case"password-confirm":case"password":return"password";default:return"text"}}(),id:e.name,name:e.name,value:x,onChange:function(s){return C({action:"update value",name:e.name,newValue:s.target.value})},onBlur:function(){return C({action:"focus lost",name:e.name})},className:o("kcInputClass"),"aria-invalid":0!==v.length,disabled:e.readOnly,autoComplete:e.autocomplete})}(),0!==v.length&&function(){var s="input-error-".concat(e.name);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("style",{children:"#".concat(s," > span: { display: block; }")}),(0,t.jsx)("span",Object.assign({id:s,className:o("kcInputErrorMessageClass"),style:{position:1===v.length?"absolute":void 0},"aria-live":"polite"},{children:v.map((function(e){return e.errorMessage}))}))]})}()]}))]})),u&&(0,t.jsx)(u,{attribute:e})]},s)}))})}}}]);
//# sourceMappingURL=9180.fb96054f.chunk.js.map