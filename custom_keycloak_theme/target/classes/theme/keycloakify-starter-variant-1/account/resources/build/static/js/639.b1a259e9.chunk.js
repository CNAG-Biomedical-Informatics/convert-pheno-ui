"use strict";(self.webpackChunkkeycloakify_starter=self.webpackChunkkeycloakify_starter||[]).push([[639],{2889:function(s,e,c){c.d(e,{a:function(){return a}});var t=c(6055),l=c(969);function a(s){var e=s.defaultClasses;return{useGetClassName:function(s){var c=s.classes;return{getClassName:(0,l.O)((function(s){return(0,t.W)(s,e[s],null===c||void 0===c?void 0:c[s])}))}}}}},7107:function(s,e,c){c.d(e,{v:function(){return t}});var t=(0,c(2889).a)({defaultClasses:{kcBodyClass:void 0,kcHtmlClass:"login-pf",kcLoginClass:"login-pf-page",kcContentWrapperClass:"row",kcHeaderClass:"login-pf-page-header",kcHeaderWrapperClass:void 0,kcFormCardClass:"card-pf",kcFormCardAccountClass:"login-pf-accounts",kcFormSocialAccountClass:"login-pf-social-section",kcFormSocialAccountContentClass:"col-xs-12 col-sm-6",kcFormHeaderClass:"login-pf-header",kcLocaleWrapperClass:void 0,kcFeedbackErrorIcon:"pficon pficon-error-circle-o",kcFeedbackWarningIcon:"pficon pficon-warning-triangle-o",kcFeedbackSuccessIcon:"pficon pficon-ok",kcFeedbackInfoIcon:"pficon pficon-info",kcResetFlowIcon:"pficon pficon-arrow fa-2x",kcFormGroupClass:"form-group",kcLabelWrapperClass:"col-xs-12 col-sm-12 col-md-12 col-lg-12",kcSignUpClass:"login-pf-signup",kcInfoAreaWrapperClass:void 0,kcLogoClass:"login-pf-brand",kcContainerClass:"container-fluid",kcContentClass:"col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3",kcFeedbackAreaClass:"col-md-12",kcLocaleClass:"col-xs-12 col-sm-1",kcAlertIconClasserror:"pficon pficon-error-circle-o",kcFormAreaClass:"col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2",kcFormSocialAccountListClass:"login-pf-social list-unstyled login-pf-social-all",kcFormSocialAccountDoubleListClass:"login-pf-social-double-col",kcFormSocialAccountListLinkClass:"login-pf-social-link",kcWebAuthnKeyIcon:"pficon pficon-key",kcWebAuthnDefaultIcon:"pficon pficon-key",kcFormClass:"form-horizontal",kcFormGroupErrorClass:"has-error",kcLabelClass:"control-label",kcInputClass:"form-control",kcInputErrorMessageClass:"pf-c-form__helper-text pf-m-error required kc-feedback-text",kcInputWrapperClass:"col-xs-12 col-sm-12 col-md-12 col-lg-12",kcFormButtonsWrapperClass:void 0,kcFormOptionsClass:"col-xs-12 col-sm-12 col-md-12 col-lg-12",kcFormButtonsClass:"col-xs-12 col-sm-12 col-md-12 col-lg-12",kcFormSettingClass:"login-pf-settings",kcTextareaClass:"form-control",kcInfoAreaClass:"col-xs-12 col-sm-4 col-md-4 col-lg-5 details",kcFormGroupHeader:"pf-c-form__group",kcButtonClass:"btn",kcButtonPrimaryClass:"btn-primary",kcButtonDefaultClass:"btn-default",kcButtonLargeClass:"btn-lg",kcButtonBlockClass:"btn-block",kcInputLargeClass:"input-lg",kcSrOnlyClass:"sr-only",kcSelectAuthListClass:"list-group list-view-pf",kcSelectAuthListItemClass:"list-group-item list-view-pf-stacked",kcSelectAuthListItemFillClass:"pf-l-split__item pf-m-fill",kcSelectAuthListItemIconPropertyClass:"fa-2x select-auth-box-icon-properties",kcSelectAuthListItemIconClass:"pf-l-split__item select-auth-box-icon",kcSelectAuthListItemTitle:"select-auth-box-paragraph",kcSelectAuthListItemInfoClass:"list-view-pf-main-info",kcSelectAuthListItemLeftClass:"list-view-pf-left",kcSelectAuthListItemBodyClass:"list-view-pf-body",kcSelectAuthListItemDescriptionClass:"list-view-pf-description",kcSelectAuthListItemHeadingClass:"list-group-item-heading",kcSelectAuthListItemHelpTextClass:"list-group-item-text",kcAuthenticatorDefaultClass:"fa list-view-pf-icon-lg",kcAuthenticatorPasswordClass:"fa fa-unlock list-view-pf-icon-lg",kcAuthenticatorOTPClass:"fa fa-mobile list-view-pf-icon-lg",kcAuthenticatorWebAuthnClass:"fa fa-key list-view-pf-icon-lg",kcAuthenticatorWebAuthnPasswordlessClass:"fa fa-key list-view-pf-icon-lg",kcSelectOTPListClass:"card-pf card-pf-view card-pf-view-select card-pf-view-single-select",kcSelectOTPListItemClass:"card-pf-body card-pf-top-element",kcAuthenticatorOtpCircleClass:"fa fa-mobile card-pf-icon-circle",kcSelectOTPItemHeadingClass:"card-pf-title text-center",kcFormOptionsWrapperClass:void 0}}).useGetClassName},639:function(s,e,c){c.r(e),c.d(e,{default:function(){return i}});var t=c(184),l=c(7107),a=c(2791),o=c(969);function i(s){var e=s.kcContext,c=s.i18n,i=s.doUseDefaultCss,n=s.Template,r=s.classes,u=e.url,f=e.auth,p=(0,l.v)({doUseDefaultCss:i,classes:r}).getClassName,k=c.msg,d=(0,a.useRef)(null),m=(0,a.useRef)(null),C=(0,o.O)((function(){var s;null===(s=d.current)||void 0===s||s.submit()})),g=(0,o.O)((function(s){var e=s.currentTarget.dataset.authExecId;m.current&&e&&(m.current.value=e,C())}));return(0,t.jsx)(n,Object.assign({},{kcContext:e,i18n:c,doUseDefaultCss:i,classes:r},{headerNode:k("loginChooseAuthenticator")},{children:(0,t.jsx)("form",Object.assign({id:"kc-select-credential-form",className:p("kcFormClass"),ref:d,action:u.loginAction,method:"post"},{children:(0,t.jsxs)("div",Object.assign({className:p("kcSelectAuthListClass")},{children:[f.authenticationSelections.map((function(s,e){var c;return(0,t.jsx)("div",Object.assign({className:p("kcSelectAuthListItemClass")},{children:(0,t.jsxs)("div",Object.assign({style:{cursor:"pointer"},onClick:g,"data-auth-exec-id":s.authExecId,className:p("kcSelectAuthListItemInfoClass")},{children:[(0,t.jsx)("div",Object.assign({className:p("kcSelectAuthListItemLeftClass")},{children:(0,t.jsx)("span",{className:p(null!==(c=s.iconCssClass)&&void 0!==c?c:"kcAuthenticatorDefaultClass")})})),(0,t.jsx)("div",Object.assign({className:p("kcSelectAuthListItemBodyClass")},{children:(0,t.jsxs)("div",Object.assign({className:p("kcSelectAuthListItemDescriptionClass")},{children:[(0,t.jsx)("div",Object.assign({className:p("kcSelectAuthListItemHeadingClass")},{children:k(s.displayName)})),(0,t.jsx)("div",Object.assign({className:p("kcSelectAuthListItemHelpTextClass")},{children:k(s.helpText)}))]}))}))]}))}),e)})),(0,t.jsx)("input",{type:"hidden",id:"authexec-hidden-input",name:"authenticationExecution",ref:m})]}))}))}))}},6055:function(s,e,c){c.d(e,{W:function(){return o}});var t=c(2982),l=c(9883),a=c(9465),o=function s(){for(var e=arguments.length,c=0,o="";c<e;c++){var i=c<0||arguments.length<=c?void 0:arguments[c];if(null!=i){var n=void 0;switch(typeof i){case"boolean":break;case"object":if(Array.isArray(i))n=s.apply(void 0,(0,t.Z)(i));else for(var r in(0,l.h)(!(0,a.z)(i,!1)),n="",i)i[r]&&r&&(n&&(n+=" "),n+=r);break;default:n=i}n&&(o&&(o+=" "),o+=n)}}return o}},9465:function(s,e,c){function t(s,e){return e}c.d(e,{z:function(){return t}})}}]);
//# sourceMappingURL=639.b1a259e9.chunk.js.map