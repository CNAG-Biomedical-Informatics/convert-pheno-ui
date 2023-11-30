"use strict";(self.webpackChunkkeycloakify_starter=self.webpackChunkkeycloakify_starter||[]).push([[3585],{2889:function(s,e,c){c.d(e,{a:function(){return a}});var l=c(6055),t=c(969);function a(s){var e=s.defaultClasses;return{useGetClassName:function(s){var c=s.classes;return{getClassName:(0,t.O)((function(s){return(0,l.W)(s,e[s],null===c||void 0===c?void 0:c[s])}))}}}}},7107:function(s,e,c){c.d(e,{v:function(){return l}});var l=(0,c(2889).a)({defaultClasses:{kcBodyClass:void 0,kcHtmlClass:"login-pf",kcLoginClass:"login-pf-page",kcContentWrapperClass:"row",kcHeaderClass:"login-pf-page-header",kcHeaderWrapperClass:void 0,kcFormCardClass:"card-pf",kcFormCardAccountClass:"login-pf-accounts",kcFormSocialAccountClass:"login-pf-social-section",kcFormSocialAccountContentClass:"col-xs-12 col-sm-6",kcFormHeaderClass:"login-pf-header",kcLocaleWrapperClass:void 0,kcFeedbackErrorIcon:"pficon pficon-error-circle-o",kcFeedbackWarningIcon:"pficon pficon-warning-triangle-o",kcFeedbackSuccessIcon:"pficon pficon-ok",kcFeedbackInfoIcon:"pficon pficon-info",kcResetFlowIcon:"pficon pficon-arrow fa-2x",kcFormGroupClass:"form-group",kcLabelWrapperClass:"col-xs-12 col-sm-12 col-md-12 col-lg-12",kcSignUpClass:"login-pf-signup",kcInfoAreaWrapperClass:void 0,kcLogoClass:"login-pf-brand",kcContainerClass:"container-fluid",kcContentClass:"col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3",kcFeedbackAreaClass:"col-md-12",kcLocaleClass:"col-xs-12 col-sm-1",kcAlertIconClasserror:"pficon pficon-error-circle-o",kcFormAreaClass:"col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2",kcFormSocialAccountListClass:"login-pf-social list-unstyled login-pf-social-all",kcFormSocialAccountDoubleListClass:"login-pf-social-double-col",kcFormSocialAccountListLinkClass:"login-pf-social-link",kcWebAuthnKeyIcon:"pficon pficon-key",kcWebAuthnDefaultIcon:"pficon pficon-key",kcFormClass:"form-horizontal",kcFormGroupErrorClass:"has-error",kcLabelClass:"control-label",kcInputClass:"form-control",kcInputErrorMessageClass:"pf-c-form__helper-text pf-m-error required kc-feedback-text",kcInputWrapperClass:"col-xs-12 col-sm-12 col-md-12 col-lg-12",kcFormButtonsWrapperClass:void 0,kcFormOptionsClass:"col-xs-12 col-sm-12 col-md-12 col-lg-12",kcFormButtonsClass:"col-xs-12 col-sm-12 col-md-12 col-lg-12",kcFormSettingClass:"login-pf-settings",kcTextareaClass:"form-control",kcInfoAreaClass:"col-xs-12 col-sm-4 col-md-4 col-lg-5 details",kcFormGroupHeader:"pf-c-form__group",kcButtonClass:"btn",kcButtonPrimaryClass:"btn-primary",kcButtonDefaultClass:"btn-default",kcButtonLargeClass:"btn-lg",kcButtonBlockClass:"btn-block",kcInputLargeClass:"input-lg",kcSrOnlyClass:"sr-only",kcSelectAuthListClass:"list-group list-view-pf",kcSelectAuthListItemClass:"list-group-item list-view-pf-stacked",kcSelectAuthListItemFillClass:"pf-l-split__item pf-m-fill",kcSelectAuthListItemIconPropertyClass:"fa-2x select-auth-box-icon-properties",kcSelectAuthListItemIconClass:"pf-l-split__item select-auth-box-icon",kcSelectAuthListItemTitle:"select-auth-box-paragraph",kcSelectAuthListItemInfoClass:"list-view-pf-main-info",kcSelectAuthListItemLeftClass:"list-view-pf-left",kcSelectAuthListItemBodyClass:"list-view-pf-body",kcSelectAuthListItemDescriptionClass:"list-view-pf-description",kcSelectAuthListItemHeadingClass:"list-group-item-heading",kcSelectAuthListItemHelpTextClass:"list-group-item-text",kcAuthenticatorDefaultClass:"fa list-view-pf-icon-lg",kcAuthenticatorPasswordClass:"fa fa-unlock list-view-pf-icon-lg",kcAuthenticatorOTPClass:"fa fa-mobile list-view-pf-icon-lg",kcAuthenticatorWebAuthnClass:"fa fa-key list-view-pf-icon-lg",kcAuthenticatorWebAuthnPasswordlessClass:"fa fa-key list-view-pf-icon-lg",kcSelectOTPListClass:"card-pf card-pf-view card-pf-view-select card-pf-view-single-select",kcSelectOTPListItemClass:"card-pf-body card-pf-top-element",kcAuthenticatorOtpCircleClass:"fa fa-mobile card-pf-icon-circle",kcSelectOTPItemHeadingClass:"card-pf-title text-center",kcFormOptionsWrapperClass:void 0}}).useGetClassName},3585:function(s,e,c){c.r(e),c.d(e,{default:function(){return o}});var l=c(184),t=c(6055),a=c(7107);function o(s){var e=s.kcContext,c=s.i18n,o=s.doUseDefaultCss,i=s.Template,r=s.classes,n=(0,a.v)({doUseDefaultCss:o,classes:r}).getClassName,f=e.url,p=e.realm,u=e.auth,k=c.msg,m=c.msgStr;return(0,l.jsx)(i,Object.assign({},{kcContext:e,i18n:c,doUseDefaultCss:o,classes:r},{displayMessage:!1,headerNode:k("emailForgotTitle"),infoNode:k("emailInstruction")},{children:(0,l.jsxs)("form",Object.assign({id:"kc-reset-password-form",className:n("kcFormClass"),action:f.loginAction,method:"post"},{children:[(0,l.jsxs)("div",Object.assign({className:n("kcFormGroupClass")},{children:[(0,l.jsx)("div",Object.assign({className:n("kcLabelWrapperClass")},{children:(0,l.jsx)("label",Object.assign({htmlFor:"username",className:n("kcLabelClass")},{children:p.loginWithEmailAllowed?p.registrationEmailAsUsername?k("email"):k("usernameOrEmail"):k("username")}))})),(0,l.jsx)("div",Object.assign({className:n("kcInputWrapperClass")},{children:(0,l.jsx)("input",{type:"text",id:"username",name:"username",className:n("kcInputClass"),autoFocus:!0,defaultValue:void 0!==u&&u.showUsername?u.attemptedUsername:void 0})}))]})),(0,l.jsxs)("div",Object.assign({className:(0,t.W)(n("kcFormGroupClass"),n("kcFormSettingClass"))},{children:[(0,l.jsx)("div",Object.assign({id:"kc-form-options",className:n("kcFormOptionsClass")},{children:(0,l.jsx)("div",Object.assign({className:n("kcFormOptionsWrapperClass")},{children:(0,l.jsx)("span",{children:(0,l.jsx)("a",Object.assign({href:f.loginUrl},{children:k("backToLogin")}))})}))})),(0,l.jsx)("div",Object.assign({id:"kc-form-buttons",className:n("kcFormButtonsClass")},{children:(0,l.jsx)("input",{className:(0,t.W)(n("kcButtonClass"),n("kcButtonPrimaryClass"),n("kcButtonBlockClass"),n("kcButtonLargeClass")),type:"submit",value:m("doSubmit")})}))]}))]}))}))}},6055:function(s,e,c){c.d(e,{W:function(){return o}});var l=c(2982),t=c(9883),a=c(9465),o=function s(){for(var e=arguments.length,c=0,o="";c<e;c++){var i=c<0||arguments.length<=c?void 0:arguments[c];if(null!=i){var r=void 0;switch(typeof i){case"boolean":break;case"object":if(Array.isArray(i))r=s.apply(void 0,(0,l.Z)(i));else for(var n in(0,t.h)(!(0,a.z)(i,!1)),r="",i)i[n]&&n&&(r&&(r+=" "),r+=n);break;default:r=i}r&&(o&&(o+=" "),o+=r)}}return o}},9465:function(s,e,c){function l(s,e){return e}c.d(e,{z:function(){return l}})}}]);
//# sourceMappingURL=3585.a9656b63.chunk.js.map
