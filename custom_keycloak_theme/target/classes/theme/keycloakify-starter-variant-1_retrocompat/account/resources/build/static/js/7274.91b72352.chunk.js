"use strict";(self.webpackChunkkeycloakify_starter=self.webpackChunkkeycloakify_starter||[]).push([[7274],{2889:function(s,a,e){e.d(a,{a:function(){return t}});var l=e(6055),c=e(969);function t(s){var a=s.defaultClasses;return{useGetClassName:function(s){var e=s.classes;return{getClassName:(0,c.O)((function(s){return(0,l.W)(s,a[s],null===e||void 0===e?void 0:e[s])}))}}}}},7107:function(s,a,e){e.d(a,{v:function(){return l}});var l=(0,e(2889).a)({defaultClasses:{kcBodyClass:void 0,kcHtmlClass:"login-pf",kcLoginClass:"login-pf-page",kcContentWrapperClass:"row",kcHeaderClass:"login-pf-page-header",kcHeaderWrapperClass:void 0,kcFormCardClass:"card-pf",kcFormCardAccountClass:"login-pf-accounts",kcFormSocialAccountClass:"login-pf-social-section",kcFormSocialAccountContentClass:"col-xs-12 col-sm-6",kcFormHeaderClass:"login-pf-header",kcLocaleWrapperClass:void 0,kcFeedbackErrorIcon:"pficon pficon-error-circle-o",kcFeedbackWarningIcon:"pficon pficon-warning-triangle-o",kcFeedbackSuccessIcon:"pficon pficon-ok",kcFeedbackInfoIcon:"pficon pficon-info",kcResetFlowIcon:"pficon pficon-arrow fa-2x",kcFormGroupClass:"form-group",kcLabelWrapperClass:"col-xs-12 col-sm-12 col-md-12 col-lg-12",kcSignUpClass:"login-pf-signup",kcInfoAreaWrapperClass:void 0,kcLogoClass:"login-pf-brand",kcContainerClass:"container-fluid",kcContentClass:"col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3",kcFeedbackAreaClass:"col-md-12",kcLocaleClass:"col-xs-12 col-sm-1",kcAlertIconClasserror:"pficon pficon-error-circle-o",kcFormAreaClass:"col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2",kcFormSocialAccountListClass:"login-pf-social list-unstyled login-pf-social-all",kcFormSocialAccountDoubleListClass:"login-pf-social-double-col",kcFormSocialAccountListLinkClass:"login-pf-social-link",kcWebAuthnKeyIcon:"pficon pficon-key",kcWebAuthnDefaultIcon:"pficon pficon-key",kcFormClass:"form-horizontal",kcFormGroupErrorClass:"has-error",kcLabelClass:"control-label",kcInputClass:"form-control",kcInputErrorMessageClass:"pf-c-form__helper-text pf-m-error required kc-feedback-text",kcInputWrapperClass:"col-xs-12 col-sm-12 col-md-12 col-lg-12",kcFormButtonsWrapperClass:void 0,kcFormOptionsClass:"col-xs-12 col-sm-12 col-md-12 col-lg-12",kcFormButtonsClass:"col-xs-12 col-sm-12 col-md-12 col-lg-12",kcFormSettingClass:"login-pf-settings",kcTextareaClass:"form-control",kcInfoAreaClass:"col-xs-12 col-sm-4 col-md-4 col-lg-5 details",kcFormGroupHeader:"pf-c-form__group",kcButtonClass:"btn",kcButtonPrimaryClass:"btn-primary",kcButtonDefaultClass:"btn-default",kcButtonLargeClass:"btn-lg",kcButtonBlockClass:"btn-block",kcInputLargeClass:"input-lg",kcSrOnlyClass:"sr-only",kcSelectAuthListClass:"list-group list-view-pf",kcSelectAuthListItemClass:"list-group-item list-view-pf-stacked",kcSelectAuthListItemFillClass:"pf-l-split__item pf-m-fill",kcSelectAuthListItemIconPropertyClass:"fa-2x select-auth-box-icon-properties",kcSelectAuthListItemIconClass:"pf-l-split__item select-auth-box-icon",kcSelectAuthListItemTitle:"select-auth-box-paragraph",kcSelectAuthListItemInfoClass:"list-view-pf-main-info",kcSelectAuthListItemLeftClass:"list-view-pf-left",kcSelectAuthListItemBodyClass:"list-view-pf-body",kcSelectAuthListItemDescriptionClass:"list-view-pf-description",kcSelectAuthListItemHeadingClass:"list-group-item-heading",kcSelectAuthListItemHelpTextClass:"list-group-item-text",kcAuthenticatorDefaultClass:"fa list-view-pf-icon-lg",kcAuthenticatorPasswordClass:"fa fa-unlock list-view-pf-icon-lg",kcAuthenticatorOTPClass:"fa fa-mobile list-view-pf-icon-lg",kcAuthenticatorWebAuthnClass:"fa fa-key list-view-pf-icon-lg",kcAuthenticatorWebAuthnPasswordlessClass:"fa fa-key list-view-pf-icon-lg",kcSelectOTPListClass:"card-pf card-pf-view card-pf-view-select card-pf-view-single-select",kcSelectOTPListItemClass:"card-pf-body card-pf-top-element",kcAuthenticatorOtpCircleClass:"fa fa-mobile card-pf-icon-circle",kcSelectOTPItemHeadingClass:"card-pf-title text-center",kcFormOptionsWrapperClass:void 0}}).useGetClassName},7274:function(s,a,e){e.r(a),e.d(a,{default:function(){return r}});var l=e(184),c=e(6055),t=e(7107);function r(s){var a,e,r,o,i=s.kcContext,n=s.i18n,p=s.doUseDefaultCss,m=s.Template,d=s.classes,u=(0,t.v)({doUseDefaultCss:p,classes:d}).getClassName,f=i.url,k=i.messagesPerField,C=i.register,g=i.realm,b=i.passwordRequired,h=i.recaptchaRequired,j=i.recaptchaSiteKey,x=n.msg,v=n.msgStr;return(0,l.jsx)(m,Object.assign({},{kcContext:i,i18n:n,doUseDefaultCss:p,classes:d},{headerNode:x("registerTitle")},{children:(0,l.jsxs)("form",Object.assign({id:"kc-register-form",className:u("kcFormClass"),action:f.registrationAction,method:"post"},{children:[(0,l.jsxs)("div",Object.assign({className:(0,c.W)(u("kcFormGroupClass"),k.printIfExists("firstName",u("kcFormGroupErrorClass")))},{children:[(0,l.jsx)("div",Object.assign({className:u("kcLabelWrapperClass")},{children:(0,l.jsx)("label",Object.assign({htmlFor:"firstName",className:u("kcLabelClass")},{children:x("firstName")}))})),(0,l.jsx)("div",Object.assign({className:u("kcInputWrapperClass")},{children:(0,l.jsx)("input",{type:"text",id:"firstName",className:u("kcInputClass"),name:"firstName",defaultValue:null!==(a=C.formData.firstName)&&void 0!==a?a:""})}))]})),(0,l.jsxs)("div",Object.assign({className:(0,c.W)(u("kcFormGroupClass"),k.printIfExists("lastName",u("kcFormGroupErrorClass")))},{children:[(0,l.jsx)("div",Object.assign({className:u("kcLabelWrapperClass")},{children:(0,l.jsx)("label",Object.assign({htmlFor:"lastName",className:u("kcLabelClass")},{children:x("lastName")}))})),(0,l.jsx)("div",Object.assign({className:u("kcInputWrapperClass")},{children:(0,l.jsx)("input",{type:"text",id:"lastName",className:u("kcInputClass"),name:"lastName",defaultValue:null!==(e=C.formData.lastName)&&void 0!==e?e:""})}))]})),(0,l.jsxs)("div",Object.assign({className:(0,c.W)(u("kcFormGroupClass"),k.printIfExists("email",u("kcFormGroupErrorClass")))},{children:[(0,l.jsx)("div",Object.assign({className:u("kcLabelWrapperClass")},{children:(0,l.jsx)("label",Object.assign({htmlFor:"email",className:u("kcLabelClass")},{children:x("email")}))})),(0,l.jsx)("div",Object.assign({className:u("kcInputWrapperClass")},{children:(0,l.jsx)("input",{type:"text",id:"email",className:u("kcInputClass"),name:"email",defaultValue:null!==(r=C.formData.email)&&void 0!==r?r:"",autoComplete:"email"})}))]})),!g.registrationEmailAsUsername&&(0,l.jsxs)("div",Object.assign({className:(0,c.W)(u("kcFormGroupClass"),k.printIfExists("username",u("kcFormGroupErrorClass")))},{children:[(0,l.jsx)("div",Object.assign({className:u("kcLabelWrapperClass")},{children:(0,l.jsx)("label",Object.assign({htmlFor:"username",className:u("kcLabelClass")},{children:x("username")}))})),(0,l.jsx)("div",Object.assign({className:u("kcInputWrapperClass")},{children:(0,l.jsx)("input",{type:"text",id:"username",className:u("kcInputClass"),name:"username",defaultValue:null!==(o=C.formData.username)&&void 0!==o?o:"",autoComplete:"username"})}))]})),b&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("div",Object.assign({className:(0,c.W)(u("kcFormGroupClass"),k.printIfExists("password",u("kcFormGroupErrorClass")))},{children:[(0,l.jsx)("div",Object.assign({className:u("kcLabelWrapperClass")},{children:(0,l.jsx)("label",Object.assign({htmlFor:"password",className:u("kcLabelClass")},{children:x("password")}))})),(0,l.jsx)("div",Object.assign({className:u("kcInputWrapperClass")},{children:(0,l.jsx)("input",{type:"password",id:"password",className:u("kcInputClass"),name:"password",autoComplete:"new-password"})}))]})),(0,l.jsxs)("div",Object.assign({className:(0,c.W)(u("kcFormGroupClass"),k.printIfExists("password-confirm",u("kcFormGroupErrorClass")))},{children:[(0,l.jsx)("div",Object.assign({className:u("kcLabelWrapperClass")},{children:(0,l.jsx)("label",Object.assign({htmlFor:"password-confirm",className:u("kcLabelClass")},{children:x("passwordConfirm")}))})),(0,l.jsx)("div",Object.assign({className:u("kcInputWrapperClass")},{children:(0,l.jsx)("input",{type:"password",id:"password-confirm",className:u("kcInputClass"),name:"password-confirm"})}))]}))]}),h&&(0,l.jsx)("div",Object.assign({className:"form-group"},{children:(0,l.jsx)("div",Object.assign({className:u("kcInputWrapperClass")},{children:(0,l.jsx)("div",{className:"g-recaptcha","data-size":"compact","data-sitekey":j})}))})),(0,l.jsxs)("div",Object.assign({className:u("kcFormGroupClass")},{children:[(0,l.jsx)("div",Object.assign({id:"kc-form-options",className:u("kcFormOptionsClass")},{children:(0,l.jsx)("div",Object.assign({className:u("kcFormOptionsWrapperClass")},{children:(0,l.jsx)("span",{children:(0,l.jsx)("a",Object.assign({href:f.loginUrl},{children:x("backToLogin")}))})}))})),(0,l.jsx)("div",Object.assign({id:"kc-form-buttons",className:u("kcFormButtonsClass")},{children:(0,l.jsx)("input",{className:(0,c.W)(u("kcButtonClass"),u("kcButtonPrimaryClass"),u("kcButtonBlockClass"),u("kcButtonLargeClass")),type:"submit",value:v("doRegister")})}))]}))]}))}))}},6055:function(s,a,e){e.d(a,{W:function(){return r}});var l=e(2982),c=e(9883),t=e(9465),r=function s(){for(var a=arguments.length,e=0,r="";e<a;e++){var o=e<0||arguments.length<=e?void 0:arguments[e];if(null!=o){var i=void 0;switch(typeof o){case"boolean":break;case"object":if(Array.isArray(o))i=s.apply(void 0,(0,l.Z)(o));else for(var n in(0,c.h)(!(0,t.z)(o,!1)),i="",o)o[n]&&n&&(i&&(i+=" "),i+=n);break;default:i=o}i&&(r&&(r+=" "),r+=i)}}return r}},9465:function(s,a,e){function l(s,a){return a}e.d(a,{z:function(){return l}})}}]);
//# sourceMappingURL=7274.91b72352.chunk.js.map
