"use strict";(self.webpackChunkkeycloakify_starter=self.webpackChunkkeycloakify_starter||[]).push([[3798],{2889:function(s,e,l){l.d(e,{a:function(){return a}});var c=l(6055),t=l(969);function a(s){var e=s.defaultClasses;return{useGetClassName:function(s){var l=s.classes;return{getClassName:(0,t.O)((function(s){return(0,c.W)(s,e[s],null===l||void 0===l?void 0:l[s])}))}}}}},7107:function(s,e,l){l.d(e,{v:function(){return c}});var c=(0,l(2889).a)({defaultClasses:{kcBodyClass:void 0,kcHtmlClass:"login-pf",kcLoginClass:"login-pf-page",kcContentWrapperClass:"row",kcHeaderClass:"login-pf-page-header",kcHeaderWrapperClass:void 0,kcFormCardClass:"card-pf",kcFormCardAccountClass:"login-pf-accounts",kcFormSocialAccountClass:"login-pf-social-section",kcFormSocialAccountContentClass:"col-xs-12 col-sm-6",kcFormHeaderClass:"login-pf-header",kcLocaleWrapperClass:void 0,kcFeedbackErrorIcon:"pficon pficon-error-circle-o",kcFeedbackWarningIcon:"pficon pficon-warning-triangle-o",kcFeedbackSuccessIcon:"pficon pficon-ok",kcFeedbackInfoIcon:"pficon pficon-info",kcResetFlowIcon:"pficon pficon-arrow fa-2x",kcFormGroupClass:"form-group",kcLabelWrapperClass:"col-xs-12 col-sm-12 col-md-12 col-lg-12",kcSignUpClass:"login-pf-signup",kcInfoAreaWrapperClass:void 0,kcLogoClass:"login-pf-brand",kcContainerClass:"container-fluid",kcContentClass:"col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3",kcFeedbackAreaClass:"col-md-12",kcLocaleClass:"col-xs-12 col-sm-1",kcAlertIconClasserror:"pficon pficon-error-circle-o",kcFormAreaClass:"col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2",kcFormSocialAccountListClass:"login-pf-social list-unstyled login-pf-social-all",kcFormSocialAccountDoubleListClass:"login-pf-social-double-col",kcFormSocialAccountListLinkClass:"login-pf-social-link",kcWebAuthnKeyIcon:"pficon pficon-key",kcWebAuthnDefaultIcon:"pficon pficon-key",kcFormClass:"form-horizontal",kcFormGroupErrorClass:"has-error",kcLabelClass:"control-label",kcInputClass:"form-control",kcInputErrorMessageClass:"pf-c-form__helper-text pf-m-error required kc-feedback-text",kcInputWrapperClass:"col-xs-12 col-sm-12 col-md-12 col-lg-12",kcFormButtonsWrapperClass:void 0,kcFormOptionsClass:"col-xs-12 col-sm-12 col-md-12 col-lg-12",kcFormButtonsClass:"col-xs-12 col-sm-12 col-md-12 col-lg-12",kcFormSettingClass:"login-pf-settings",kcTextareaClass:"form-control",kcInfoAreaClass:"col-xs-12 col-sm-4 col-md-4 col-lg-5 details",kcFormGroupHeader:"pf-c-form__group",kcButtonClass:"btn",kcButtonPrimaryClass:"btn-primary",kcButtonDefaultClass:"btn-default",kcButtonLargeClass:"btn-lg",kcButtonBlockClass:"btn-block",kcInputLargeClass:"input-lg",kcSrOnlyClass:"sr-only",kcSelectAuthListClass:"list-group list-view-pf",kcSelectAuthListItemClass:"list-group-item list-view-pf-stacked",kcSelectAuthListItemFillClass:"pf-l-split__item pf-m-fill",kcSelectAuthListItemIconPropertyClass:"fa-2x select-auth-box-icon-properties",kcSelectAuthListItemIconClass:"pf-l-split__item select-auth-box-icon",kcSelectAuthListItemTitle:"select-auth-box-paragraph",kcSelectAuthListItemInfoClass:"list-view-pf-main-info",kcSelectAuthListItemLeftClass:"list-view-pf-left",kcSelectAuthListItemBodyClass:"list-view-pf-body",kcSelectAuthListItemDescriptionClass:"list-view-pf-description",kcSelectAuthListItemHeadingClass:"list-group-item-heading",kcSelectAuthListItemHelpTextClass:"list-group-item-text",kcAuthenticatorDefaultClass:"fa list-view-pf-icon-lg",kcAuthenticatorPasswordClass:"fa fa-unlock list-view-pf-icon-lg",kcAuthenticatorOTPClass:"fa fa-mobile list-view-pf-icon-lg",kcAuthenticatorWebAuthnClass:"fa fa-key list-view-pf-icon-lg",kcAuthenticatorWebAuthnPasswordlessClass:"fa fa-key list-view-pf-icon-lg",kcSelectOTPListClass:"card-pf card-pf-view card-pf-view-select card-pf-view-single-select",kcSelectOTPListItemClass:"card-pf-body card-pf-top-element",kcAuthenticatorOtpCircleClass:"fa fa-mobile card-pf-icon-circle",kcSelectOTPItemHeadingClass:"card-pf-title text-center",kcFormOptionsWrapperClass:void 0}}).useGetClassName},3798:function(s,e,l){l.r(e),l.d(e,{default:function(){return o}});var c=l(184),t=l(6055),a=l(7107);function o(s){var e,l=s.kcContext,o=s.i18n,i=s.doUseDefaultCss,r=s.Template,n=s.classes,u=(0,a.v)({doUseDefaultCss:i,classes:n}).getClassName,f=o.msg,p=o.msgStr,k=l.url,m=l.messagesPerField,d=l.isAppInitiatedAction,C=l.email;return(0,c.jsx)(r,Object.assign({},{kcContext:l,i18n:o,doUseDefaultCss:i,classes:n},{headerNode:f("updateEmailTitle")},{children:(0,c.jsxs)("form",Object.assign({id:"kc-update-email-form",className:u("kcFormClass"),action:k.loginAction,method:"post"},{children:[(0,c.jsxs)("div",Object.assign({className:(0,t.W)(u("kcFormGroupClass"),m.printIfExists("email",u("kcFormGroupErrorClass")))},{children:[(0,c.jsx)("div",Object.assign({className:u("kcLabelWrapperClass")},{children:(0,c.jsx)("label",Object.assign({htmlFor:"email",className:u("kcLabelClass")},{children:f("email")}))})),(0,c.jsx)("div",Object.assign({className:u("kcInputWrapperClass")},{children:(0,c.jsx)("input",{type:"text",id:"email",name:"email",defaultValue:null!==(e=C.value)&&void 0!==e?e:"",className:u("kcInputClass"),"aria-invalid":m.existsError("email")})}))]})),(0,c.jsxs)("div",Object.assign({className:u("kcFormGroupClass")},{children:[(0,c.jsx)("div",Object.assign({id:"kc-form-options",className:u("kcFormOptionsClass")},{children:(0,c.jsx)("div",{className:u("kcFormOptionsWrapperClass")})})),(0,c.jsx)("div",Object.assign({id:"kc-form-buttons",className:u("kcFormButtonsClass")},{children:d?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("input",{className:(0,t.W)(u("kcButtonClass"),u("kcButtonPrimaryClass"),u("kcButtonLargeClass")),type:"submit",defaultValue:p("doSubmit")}),(0,c.jsx)("button",Object.assign({className:(0,t.W)(u("kcButtonClass"),u("kcButtonDefaultClass"),u("kcButtonLargeClass")),type:"submit",name:"cancel-aia",value:"true"},{children:f("doCancel")}))]}):(0,c.jsx)("input",{className:(0,t.W)(u("kcButtonClass"),u("kcButtonPrimaryClass"),u("kcButtonBlockClass"),u("kcButtonLargeClass")),type:"submit",defaultValue:p("doSubmit")})}))]}))]}))}))}},6055:function(s,e,l){l.d(e,{W:function(){return o}});var c=l(2982),t=l(9883),a=l(9465),o=function s(){for(var e=arguments.length,l=0,o="";l<e;l++){var i=l<0||arguments.length<=l?void 0:arguments[l];if(null!=i){var r=void 0;switch(typeof i){case"boolean":break;case"object":if(Array.isArray(i))r=s.apply(void 0,(0,c.Z)(i));else for(var n in(0,t.h)(!(0,a.z)(i,!1)),r="",i)i[n]&&n&&(r&&(r+=" "),r+=n);break;default:r=i}r&&(o&&(o+=" "),o+=r)}}return o}},9465:function(s,e,l){function c(s,e){return e}l.d(e,{z:function(){return c}})}}]);
//# sourceMappingURL=3798.bbb1dc52.chunk.js.map