"use strict";(self.webpackChunkkeycloakify_starter=self.webpackChunkkeycloakify_starter||[]).push([[2514],{2514:function(e,s,t){t.r(s),t.d(s,{default:function(){return j}});var a=t(2791),n=t(7406),l=(0,n.Lv)({en:{alphanumericalCharsOnly:"Only alphanumerical characters",gender:"Gender",doForgotPassword:"I forgot my password",invalidUserMessage:"Invalid username or password. (this message was overwrite in the theme)"},fr:{alphanumericalCharsOnly:"Caract\xe8re alphanum\xe9rique uniquement",gender:"Genre",doForgotPassword:"J'ai oubli\xe9 mon mot de passe",invalidUserMessage:"Nom d'utilisateur ou mot de passe invalide. (ce message a \xe9t\xe9 \xe9cras\xe9 dans le th\xe8me)"}}).useI18n,r=t(885),o=t(6055),i=t(7123),c=t(7107),u=t(184);function d(e){var s=e.kcContext,t=e.i18n,n=e.doUseDefaultCss,l=e.Template,d=e.classes,m=(0,c.v)({doUseDefaultCss:n,classes:d}).getClassName,f=t.msg,C=t.msgStr,p=s.url,k=s.isAppInitiatedAction,x=(0,a.useState)(!1),h=(0,r.Z)(x,2),g=h[0],y=h[1];console.log("UpdateUserProfile",{kcContext:s,i18n:t,doUseDefaultCss:n,classes:d});var b=s.profile.attributes.filter((function(e){return"email"!==e.name}));return console.log("UpdateUserProfile",{profileAttributesWithoutEmail:b}),s.profile.attributes=b,delete s.profile.attributesByName.email,console.log("New kcContext UpdateUserProfile",{kcContext:s}),(0,u.jsx)(l,{kcContext:s,i18n:t,doUseDefaultCss:n,classes:d,headerNode:f("loginProfileTitle"),children:(0,u.jsxs)("form",{id:"kc-update-profile-form",className:m("kcFormClass"),action:p.loginAction,method:"post",children:[(0,u.jsx)(i.M,{kcContext:s,onIsFormSubmittableValueChange:y,i18n:t,getClassName:m}),(0,u.jsxs)("div",{className:m("kcFormGroupClass"),children:[(0,u.jsx)("div",{id:"kc-form-options",className:m("kcFormOptionsClass"),children:(0,u.jsx)("div",{className:m("kcFormOptionsWrapperClass")})}),(0,u.jsx)("div",{id:"kc-form-buttons",className:m("kcFormButtonsClass"),children:k?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("input",{className:(0,o.W)(m("kcButtonClass"),m("kcButtonPrimaryClass"),m("kcButtonLargeClass")),type:"submit",value:C("doSubmit")}),(0,u.jsx)("button",{className:(0,o.W)(m("kcButtonClass"),m("kcButtonDefaultClass"),m("kcButtonLargeClass")),type:"submit",name:"cancel-aia",value:"true",formNoValidate:!0,children:f("doCancel")})]}):(0,u.jsx)("input",{className:(0,o.W)(m("kcButtonClass"),m("kcButtonPrimaryClass"),m("kcButtonBlockClass"),m("kcButtonLargeClass")),type:"submit",defaultValue:C("doSubmit"),disabled:!g})})]})]})})}var m=(0,a.lazy)((function(){return t.e(4326).then(t.bind(t,4326))})),f=(0,a.lazy)((function(){return t.e(3870).then(t.bind(t,3870))})),C=(0,a.lazy)((function(){return t.e(5738).then(t.bind(t,5738))})),p=(0,a.lazy)((function(){return t.e(579).then(t.bind(t,579))})),k=(0,a.lazy)((function(){return t.e(4726).then(t.bind(t,4726))})),x=(0,a.lazy)((function(){return t.e(6475).then(t.bind(t,6202))})),h=(0,a.lazy)((function(){return t.e(7697).then(t.bind(t,637))})),g=(0,a.lazy)((function(){return t.e(121).then(t.bind(t,121))})),y=(0,a.lazy)((function(){return t.e(2444).then(t.bind(t,2444))})),b={kcHtmlClass:"my-root-class",kcHeaderWrapperClass:"my-color my-font"};function j(e){var s=e.kcContext,t=l({kcContext:s});return null===t?null:(0,u.jsx)(a.Suspense,{children:function(){switch(s.pageId){case"login.ftl":return(0,u.jsx)(C,{kcContext:s,i18n:t,Template:m,classes:b,doUseDefaultCss:!0});case"register.ftl":return(0,u.jsx)(p,{kcContext:s,i18n:t,Template:m,classes:b,doUseDefaultCss:!0});case"register-user-profile.ftl":return(0,u.jsx)(k,{kcContext:s,i18n:t,Template:m,classes:b,doUseDefaultCss:!0});case"terms.ftl":return(0,u.jsx)(x,{kcContext:s,i18n:t,Template:m,classes:b,doUseDefaultCss:!0});case"my-extra-page-1.ftl":return(0,u.jsx)(h,{kcContext:s,i18n:t,Template:m,classes:b,doUseDefaultCss:!0});case"my-extra-page-2.ftl":return(0,u.jsx)(g,{kcContext:s,i18n:t,Template:m,classes:b,doUseDefaultCss:!0});case"info.ftl":return(0,u.jsx)(y,{kcContext:s,i18n:t,classes:b,Template:f,doUseDefaultCss:!0});case"update-user-profile.ftl":return(0,u.jsx)(d,{kcContext:s,i18n:t,classes:b,Template:m,doUseDefaultCss:!0});default:return(0,u.jsx)(n.ZP,{kcContext:s,i18n:t,classes:b,Template:m,doUseDefaultCss:!0})}}()})}}}]);
//# sourceMappingURL=2514.0be219a4.chunk.js.map
