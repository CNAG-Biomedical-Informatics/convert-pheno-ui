<!DOCTYPE html><html lang="en"><head><script>
    window.kcContext=
<#assign pageId="error.ftl">
(()=>{

    const out = ${ftl_object_to_js_code_declaring_an_object(.data_model, [])?no_esc};

    out["msg"]= function(){ throw new Error("use import { useKcMessage } from 'keycloakify'"); };
    out["advancedMsg"]= function(){ throw new Error("use import { useKcMessage } from 'keycloakify'"); };

    out["messagesPerField"]= {
        <#assign fieldNames = [ "totp", "userLabel", "password", "password-confirm", "username", "email", "firstName", "lastName", "global" ]>

        <#attempt>
            <#if profile?? && profile.attributes?? && profile.attributes?is_enumerable>
                <#list profile.attributes as attribute>
                    <#if fieldNames?seq_contains(attribute.name)>
                        <#continue>
                    </#if>
                    <#assign fieldNames += [attribute.name]>
                </#list>
            </#if>
        <#recover>
        </#attempt>

        "printIfExists": function (fieldName, text) {

            <#if !messagesPerField?? || !(messagesPerField?is_hash)>
                throw new Error("You're not supposed to use messagesPerField.printIfExists in this page");
            <#else>
                <#list fieldNames as fieldName>
                    if(fieldName === "${fieldName}" ){

                        <#-- https://github.com/keycloakify/keycloakify/pull/359 Compat with Keycloak prior v12 -->
                        <#if !messagesPerField.existsError??>

                            <#-- https://github.com/keycloakify/keycloakify/pull/218 -->
                            <#if ('${fieldName}' == 'username' || '${fieldName}' == 'password') && pageId != 'register.ftl' && pageId != 'register-user-profile.ftl'>

                                <#assign doExistMessageForUsernameOrPassword = "">

                                <#attempt>
                                    <#assign doExistMessageForUsernameOrPassword = messagesPerField.exists('username')>
                                <#recover>
                                    <#assign doExistMessageForUsernameOrPassword = true>
                                </#attempt>

                                <#if !doExistMessageForUsernameOrPassword>
                                    <#attempt>
                                        <#assign doExistMessageForUsernameOrPassword = messagesPerField.exists('password')>
                                    <#recover>
                                        <#assign doExistMessageForUsernameOrPassword = true>
                                    </#attempt>
                                </#if>

                                return <#if doExistMessageForUsernameOrPassword>text<#else>undefined</#if>;

                            <#else>

                                <#assign doExistMessageForField = "">

                                <#attempt>
                                    <#assign doExistMessageForField = messagesPerField.exists('${fieldName}')>
                                <#recover>
                                    <#assign doExistMessageForField = true>
                                </#attempt>

                                return <#if doExistMessageForField>text<#else>undefined</#if>;

                            </#if>

                        <#else>

                            <#-- https://github.com/keycloakify/keycloakify/pull/218 -->
                            <#if ('${fieldName}' == 'username' || '${fieldName}' == 'password') && pageId != 'register.ftl' && pageId != 'register-user-profile.ftl'>

                                <#assign doExistErrorOnUsernameOrPassword = "">

                                <#attempt>
                                    <#assign doExistErrorOnUsernameOrPassword = messagesPerField.existsError('username', 'password')>
                                <#recover>
                                    <#assign doExistErrorOnUsernameOrPassword = true>
                                </#attempt>

                                <#if doExistErrorOnUsernameOrPassword>
                                    return text;
                                <#else>

                                    <#assign doExistMessageForField = "">

                                    <#attempt>
                                        <#assign doExistMessageForField = messagesPerField.exists('${fieldName}')>
                                    <#recover>
                                        <#assign doExistMessageForField = true>
                                    </#attempt>

                                    return <#if doExistMessageForField>text<#else>undefined</#if>;

                                </#if>

                            <#else>

                                <#assign doExistMessageForField = "">

                                <#attempt>
                                    <#assign doExistMessageForField = messagesPerField.exists('${fieldName}')>
                                <#recover>
                                    <#assign doExistMessageForField = true>
                                </#attempt>

                                return <#if doExistMessageForField>text<#else>undefined</#if>;

                            </#if>

                        </#if>

                    }
                </#list>

                throw new Error(fieldName + "is probably runtime generated, see: https://docs.keycloakify.dev/limitations#field-names-cant-be-runtime-generated");
            </#if>

        },
        "existsError": function (fieldName) {

            <#if !messagesPerField?? || !(messagesPerField?is_hash)>
                throw new Error("You're not supposed to use messagesPerField.printIfExists in this page");
            <#else>
                <#list fieldNames as fieldName>
                    if(fieldName === "${fieldName}" ){

                        <#-- https://github.com/keycloakify/keycloakify/pull/359 Compat with Keycloak prior v12 -->
                        <#if !messagesPerField.existsError??>

                            <#-- https://github.com/keycloakify/keycloakify/pull/218 -->
                            <#if ('${fieldName}' == 'username' || '${fieldName}' == 'password') && pageId != 'register.ftl' && pageId != 'register-user-profile.ftl'>

                                <#assign doExistMessageForUsernameOrPassword = "">

                                <#attempt>
                                    <#assign doExistMessageForUsernameOrPassword = messagesPerField.exists('username')>
                                <#recover>
                                    <#assign doExistMessageForUsernameOrPassword = true>
                                </#attempt>

                                <#if !doExistMessageForUsernameOrPassword>
                                    <#attempt>
                                        <#assign doExistMessageForUsernameOrPassword = messagesPerField.exists('password')>
                                    <#recover>
                                        <#assign doExistMessageForUsernameOrPassword = true>
                                    </#attempt>
                                </#if>

                                return <#if doExistMessageForUsernameOrPassword>true<#else>false</#if>;

                            <#else>

                                <#assign doExistMessageForField = "">

                                <#attempt>
                                    <#assign doExistMessageForField = messagesPerField.exists('${fieldName}')>
                                <#recover>
                                    <#assign doExistMessageForField = true>
                                </#attempt>

                                return <#if doExistMessageForField>true<#else>false</#if>;

                            </#if>

                        <#else>

                            <#-- https://github.com/keycloakify/keycloakify/pull/218 -->
                            <#if ('${fieldName}' == 'username' || '${fieldName}' == 'password') && pageId != 'register.ftl' && pageId != 'register-user-profile.ftl'>

                                <#assign doExistErrorOnUsernameOrPassword = "">

                                <#attempt>
                                    <#assign doExistErrorOnUsernameOrPassword = messagesPerField.existsError('username', 'password')>
                                <#recover>
                                    <#assign doExistErrorOnUsernameOrPassword = true>
                                </#attempt>

                                return <#if doExistErrorOnUsernameOrPassword>true<#else>false</#if>;

                            <#else>

                                <#assign doExistErrorMessageForField = "">

                                <#attempt>
                                    <#assign doExistErrorMessageForField = messagesPerField.existsError('${fieldName}')>
                                <#recover>
                                    <#assign doExistErrorMessageForField = true>
                                </#attempt>

                                return <#if doExistErrorMessageForField>true<#else>false</#if>;

                            </#if>

                        </#if>

                    }
                </#list>

                throw new Error(fieldName + "is probably runtime generated, see: https://docs.keycloakify.dev/limitations#field-names-cant-be-runtime-generated");

            </#if>

        },
        "get": function (fieldName) {


            <#if !messagesPerField?? || !(messagesPerField?is_hash)>
                throw new Error("You're not supposed to use messagesPerField.get in this page");
            <#else>
                <#list fieldNames as fieldName>
                    if(fieldName === "${fieldName}" ){

                        <#-- https://github.com/keycloakify/keycloakify/pull/359 Compat with Keycloak prior v12 -->
                        <#if !messagesPerField.existsError??>

                            <#-- https://github.com/keycloakify/keycloakify/pull/218 -->
                            <#if ('${fieldName}' == 'username' || '${fieldName}' == 'password') && pageId != 'register.ftl' && pageId != 'register-user-profile.ftl'>

                                <#assign doExistMessageForUsernameOrPassword = "">

                                <#attempt>
                                    <#assign doExistMessageForUsernameOrPassword = messagesPerField.exists('username')>
                                <#recover>
                                    <#assign doExistMessageForUsernameOrPassword = true>
                                </#attempt>

                                <#if !doExistMessageForUsernameOrPassword>
                                    <#attempt>
                                        <#assign doExistMessageForUsernameOrPassword = messagesPerField.exists('password')>
                                    <#recover>
                                        <#assign doExistMessageForUsernameOrPassword = true>
                                    </#attempt>
                                </#if>

                                <#if !doExistMessageForUsernameOrPassword>
                                    return "";
                                <#else>
                                    <#attempt>
                                        return "${kcSanitize(msg('invalidUserMessage'))?no_esc}";
                                    <#recover>
                                        return "Invalid username or password.";
                                    </#attempt>
                                </#if>

                            <#else>

                                <#attempt>
                                    return "${messagesPerField.get('${fieldName}')?no_esc}";
                                <#recover>
                                    return "invalid field";
                                </#attempt>

                            </#if>

                        <#else>

                            <#-- https://github.com/keycloakify/keycloakify/pull/218 -->
                            <#if ('${fieldName}' == 'username' || '${fieldName}' == 'password') && pageId != 'register.ftl' && pageId != 'register-user-profile.ftl'>

                                <#assign doExistErrorOnUsernameOrPassword = "">

                                <#attempt>
                                    <#assign doExistErrorOnUsernameOrPassword = messagesPerField.existsError('username', 'password')>
                                <#recover>
                                    <#assign doExistErrorOnUsernameOrPassword = true>
                                </#attempt>

                                <#if doExistErrorOnUsernameOrPassword>

                                    <#attempt>
                                        return "${kcSanitize(msg('invalidUserMessage'))?no_esc}";
                                    <#recover>
                                        return "Invalid username or password.";
                                    </#attempt>

                                <#else>

                                    <#attempt>
                                        return "${messagesPerField.get('${fieldName}')?no_esc}";
                                    <#recover>
                                        return "";
                                    </#attempt>

                                </#if>

                            <#else>

                                <#attempt>
                                    return "${messagesPerField.get('${fieldName}')?no_esc}";
                                <#recover>
                                    return "invalid field";
                                </#attempt>

                            </#if>

                        </#if>

                    }
                </#list>

                throw new Error(fieldName + "is probably runtime generated, see: https://docs.keycloakify.dev/limitations#field-names-cant-be-runtime-generated");

            </#if>

        },
        "exists": function (fieldName) {

            <#if !messagesPerField?? || !(messagesPerField?is_hash)>
                throw new Error("You're not supposed to use messagesPerField.exists in this page");
            <#else>
                <#list fieldNames as fieldName>
                    if(fieldName === "${fieldName}" ){

                        <#-- https://github.com/keycloakify/keycloakify/pull/359 Compat with Keycloak prior v12 -->
                        <#if !messagesPerField.existsError??>

                            <#-- https://github.com/keycloakify/keycloakify/pull/218 -->
                            <#if ('${fieldName}' == 'username' || '${fieldName}' == 'password') && pageId != 'register.ftl' && pageId != 'register-user-profile.ftl'>

                                <#assign doExistMessageForUsernameOrPassword = "">

                                <#attempt>
                                    <#assign doExistMessageForUsernameOrPassword = messagesPerField.exists('username')>
                                <#recover>
                                    <#assign doExistMessageForUsernameOrPassword = true>
                                </#attempt>

                                <#if !doExistMessageForUsernameOrPassword>
                                    <#attempt>
                                        <#assign doExistMessageForUsernameOrPassword = messagesPerField.exists('password')>
                                    <#recover>
                                        <#assign doExistMessageForUsernameOrPassword = true>
                                    </#attempt>
                                </#if>

                                return <#if doExistMessageForUsernameOrPassword>true<#else>false</#if>;

                            <#else>

                                <#assign doExistMessageForField = "">

                                <#attempt>
                                    <#assign doExistMessageForField = messagesPerField.exists('${fieldName}')>
                                <#recover>
                                    <#assign doExistMessageForField = true>
                                </#attempt>

                                return <#if doExistMessageForField>true<#else>false</#if>;

                            </#if>

                        <#else>

                            <#-- https://github.com/keycloakify/keycloakify/pull/218 -->
                            <#if ('${fieldName}' == 'username' || '${fieldName}' == 'password') && pageId != 'register.ftl' && pageId != 'register-user-profile.ftl'>

                                <#assign doExistErrorOnUsernameOrPassword = "">

                                <#attempt>
                                    <#assign doExistErrorOnUsernameOrPassword = messagesPerField.existsError('username', 'password')>
                                <#recover>
                                    <#assign doExistErrorOnUsernameOrPassword = true>
                                </#attempt>

                                return <#if doExistErrorOnUsernameOrPassword>true<#else>false</#if>;

                            <#else>

                                <#assign doExistErrorMessageForField = "">

                                <#attempt>
                                    <#assign doExistErrorMessageForField = messagesPerField.exists('${fieldName}')>
                                <#recover>
                                    <#assign doExistErrorMessageForField = true>
                                </#attempt>

                                return <#if doExistErrorMessageForField>true<#else>false</#if>;

                            </#if>

                        </#if>

                    }
                </#list>

                throw new Error(fieldName + "is probably runtime generated, see: https://docs.keycloakify.dev/limitations#field-names-cant-be-runtime-generated");
            </#if>

        }
    };

    <#if account??>
        out["url"]["getLogoutUrl"] = function () {
            <#attempt>
                return "${url.getLogoutUrl()}";
            <#recover>
            </#attempt>
        };
    </#if>

    out["keycloakifyVersion"] = "9.1.2";
    out["themeVersion"] = "5.0.3";
    out["themeType"] = "login";
    out["themeName"] = "keycloakify-starter-variant-1";
    out["pageId"] = "${pageId}";

    return out;

})()
<#function ftl_object_to_js_code_declaring_an_object object path>

        <#local isHash = "">
        <#attempt>
            <#local isHash = object?is_hash || object?is_hash_ex>
        <#recover>
            <#return "ABORT: Can't evaluate if " + path?join(".") + " is hash">
        </#attempt>

        <#if isHash>

            <#if path?size gt 10>
                <#return "ABORT: Too many recursive calls">
            </#if>

            <#local keys = "">

            <#attempt>
                <#local keys = object?keys>
            <#recover>
                <#return "ABORT: We can't list keys on this object">
            </#attempt>


            <#local out_seq = []>

            <#list keys as key>

                <#if ["class","declaredConstructors","superclass","declaringClass" ]?seq_contains(key) >
                    <#continue>
                </#if>

                <#if
                    (
                        ["loginUpdatePasswordUrl", "loginUpdateProfileUrl", "loginUsernameReminderUrl", "loginUpdateTotpUrl"]?seq_contains(key) &&
                        are_same_path(path, ["url"])
                    ) || (
                        key == "updateProfileCtx" &&
                        are_same_path(path, [])
                    ) || (
                        <#-- https://github.com/keycloakify/keycloakify/pull/65#issuecomment-991896344 (reports with saml-post-form.ftl) -->
                        <#-- https://github.com/keycloakify/keycloakify/issues/91#issue-1212319466 (reports with error.ftl and Kc18) -->
                        <#-- https://github.com/keycloakify/keycloakify/issues/109#issuecomment-1134610163 -->
                        <#-- https://github.com/keycloakify/keycloakify/issues/357 -->
                        key == "loginAction" &&
                        are_same_path(path, ["url"]) &&
                        ["saml-post-form.ftl", "error.ftl", "info.ftl", "login-oauth-grant.ftl", "logout-confirm.ftl"]?seq_contains(pageId) &&
                        !(auth?has_content && auth.showTryAnotherWayLink())
                    ) || (
                        <#-- https://github.com/keycloakify/keycloakify/issues/362 -->
                        ["secretData", "value"]?seq_contains(key) &&
                        are_same_path(path, [ "totp", "otpCredentials", "*" ])
                    ) || (
                        ["contextData", "idpConfig", "idp", "authenticationSession"]?seq_contains(key) &&
                        are_same_path(path, ["brokerContext"]) &&
                        ["login-idp-link-confirm.ftl", "login-idp-link-email.ftl" ]?seq_contains(pageId)
                    ) || (
                        key == "identityProviderBrokerCtx" &&
                        are_same_path(path, []) &&
                        ["login-idp-link-confirm.ftl", "login-idp-link-email.ftl" ]?seq_contains(pageId)
                    ) ||  (
                        ["masterAdminClient", "delegateForUpdate", "defaultRole"]?seq_contains(key) &&
                        are_same_path(path, ["realm"])
                    ) || (
                        "error.ftl" == pageId &&
                        are_same_path(path, ["realm"]) &&
                        !["name", "displayName", "displayNameHtml", "internationalizationEnabled", "registrationEmailAsUsername" ]?seq_contains(key)
                    ) || (
                        "applications.ftl" == pageId &&
                        are_same_path(path, ["applications", "applications", "*", "client", "realm"])
                    ) || (
                        "applications.ftl" == pageId &&
                        "masterAdminClient" == key
                    )
                >
                    <#local out_seq += ["/*If you need '" + key + "' on " + pageId + ", please submit an issue to the Keycloakify repo*/"]>
                    <#continue>
                </#if>

                <#if pageId == "register.ftl" && key == "attemptedUsername" && are_same_path(path, ["auth"])>
                    <#attempt>
                        <#-- https://github.com/keycloak/keycloak/blob/3a2bf0c04bcde185e497aaa32d0bb7ab7520cf4a/themes/src/main/resources/theme/base/login/template.ftl#L63 -->
                        <#-- https://github.com/keycloakify/keycloakify/discussions/406 -->
                        <#if !(auth?has_content && auth.showUsername() && !auth.showResetCredentials())>
                            <#continue>
                        </#if>
                    <#recover>
                    </#attempt>
                </#if>

                <#attempt>
                    <#if !object[key]??>
                        <#continue>
                    </#if>
                <#recover>
                    <#local out_seq += ["/*Couldn't test if '" + key + "' is available on this object*/"]>
                    <#continue>
                </#attempt>

                <#local propertyValue = "">

                <#attempt>
                    <#local propertyValue = object[key]>
                <#recover>
                    <#local out_seq += ["/*Couldn't dereference '" + key + "' on this object*/"]>
                    <#continue>
                </#attempt>

                <#local rec_out = ftl_object_to_js_code_declaring_an_object(propertyValue, path + [ key ])>

                <#if rec_out?starts_with("ABORT:")>

                    <#local errorMessage = rec_out?remove_beginning("ABORT:")>

                    <#if errorMessage != " It's a method" >
                        <#local out_seq += ["/*" + key + ": " + errorMessage + "*/"]>
                    </#if>

                    <#continue>
                </#if>

                <#local out_seq +=  ['"' + key + '": ' + rec_out + ","]>

            </#list>

            <#return (["{"] + out_seq?map(str -> ""?right_pad(4 * (path?size + 1)) + str) + [ ""?right_pad(4 * path?size) + "}"])?join("\n")>

        </#if>

        <#local isMethod = "">
        <#attempt>
            <#local isMethod = object?is_method>
        <#recover>
            <#return "ABORT: Can't test if it'sa method.">
        </#attempt>

        <#if isMethod>

            <#if are_same_path(path, ["auth", "showUsername"])>
                <#attempt>
                    <#return auth.showUsername()?c>
                <#recover>
                    <#return "ABORT: Couldn't evaluate auth.showUsername()">
                </#attempt>
            </#if>

            <#if are_same_path(path, ["auth", "showResetCredentials"])>
                <#attempt>
                    <#return auth.showResetCredentials()?c>
                <#recover>
                    <#return "ABORT: Couldn't evaluate auth.showResetCredentials()">
                </#attempt>
            </#if>

            <#if are_same_path(path, ["auth", "showTryAnotherWayLink"])>
                <#attempt>
                    <#return auth.showTryAnotherWayLink()?c>
                <#recover>
                    <#return "ABORT: Couldn't evaluate auth.showTryAnotherWayLink()">
                </#attempt>
            </#if>

            <#return "ABORT: It's a method">
        </#if>

        <#local isBoolean = "">
        <#attempt>
            <#local isBoolean = object?is_boolean>
        <#recover>
            <#return "ABORT: Can't test if it's a boolean">
        </#attempt>

        <#if isBoolean>
            <#return object?c>
        </#if>

        <#local isEnumerable = "">
        <#attempt>
            <#local isEnumerable = object?is_enumerable>
        <#recover>
            <#return "ABORT: Can't test if it's an enumerable">
        </#attempt>


        <#if isEnumerable>

            <#local out_seq = []>

            <#local i = 0>

            <#list object as array_item>

                <#if !array_item??>
                    <#local out_seq += ["null,"]>
                    <#continue>
                </#if>

                <#local rec_out = ftl_object_to_js_code_declaring_an_object(array_item, path + [ i ])>

                <#local i = i + 1>

                <#if rec_out?starts_with("ABORT:")>

                    <#local errorMessage = rec_out?remove_beginning("ABORT:")>

                    <#if errorMessage != " It's a method" >
                        <#local out_seq += ["/*" + i?string + ": " + errorMessage + "*/"]>
                    </#if>

                    <#continue>
                </#if>

                <#local out_seq += [rec_out + ","]>

            </#list>

            <#return (["["] + out_seq?map(str -> ""?right_pad(4 * (path?size + 1)) + str) + [ ""?right_pad(4 * path?size) + "]"])?join("\n")>

        </#if>

        <#local isDate = "">
        <#attempt>
            <#local isDate = object?is_date_like>
        <#recover>
            <#return "ABORT: Can't test if it's a date">
        </#attempt>

        <#if isDate>
            <#return '"' + object?datetime?iso_utc + '"'>
        </#if>

        <#attempt>
            <#return '"' + object?js_string + '"'>;
        <#recover>
        </#attempt>

        <#return "ABORT: Couldn't convert into string non hash, non method, non boolean, non enumerable object">

</#function>
<#function are_same_path path searchedPath>

    <#if path?size != searchedPath?size>
        <#return false>
    </#if>

    <#local i=0>

    <#list path as property>

        <#local searchedProperty=searchedPath[i]>

        <#if searchedProperty?is_string && searchedProperty == "*">
            <#continue>
        </#if>

        <#if searchedProperty?is_string && !property?is_string>
            <#return false>
        </#if>

        <#if searchedProperty?is_number && !property?is_number>
            <#return false>
        </#if>

        <#if searchedProperty?string != property?string>
            <#return false>
        </#if>

        <#local i+= 1>

    </#list>

    <#return true>

</#function>
;
</script>

<#if scripts??>
    <#list scripts as script>
        <script src="${script}" type="text/javascript"></script>
    </#list>
</#if>
<style>
:root {
    --url117749661f1c024: url(${url.resourcesPath}/build/static/media/background.7cd80027de24cbc2280b.svg) no-repeat 50% fixed;
}
</style>
<meta charset="utf-8"><link rel="icon" href="${url.resourcesPath}/build/favicon.ico"><meta name="viewport" content="width=device-width,initial-scale=1"><title>React App</title><link rel="preload" href="${url.resourcesPath}/build/fonts/WorkSans/worksans-bold-webfont.woff2" as="font" crossorigin="anonymous"><link rel="preload" href="${url.resourcesPath}/build/fonts/WorkSans/worksans-medium-webfont.woff2" as="font" crossorigin="anonymous"><link rel="preload" href="${url.resourcesPath}/build/fonts/WorkSans/worksans-regular-webfont.woff2" as="font" crossorigin="anonymous"><link rel="preload" href="${url.resourcesPath}/build/fonts/WorkSans/worksans-semibold-webfont.woff2" as="font" crossorigin="anonymous"><style>@font-face{font-family:'Work Sans';font-style:normal;font-weight:400;font-display:swap;src:url(${url.resourcesPath}/build/fonts/WorkSans/worksans-regular-webfont.woff2) format("woff2")}@font-face{font-family:'Work Sans';font-style:normal;font-weight:500;font-display:swap;src:url(${url.resourcesPath}/build/fonts/WorkSans/worksans-medium-webfont.woff2) format("woff2")}@font-face{font-family:'Work Sans';font-style:normal;font-weight:600;font-display:swap;src:url(${url.resourcesPath}/build/fonts/WorkSans/worksans-semibold-webfont.woff2) format("woff2")}@font-face{font-family:'Work Sans';font-style:normal;font-weight:700;font-display:swap;src:url(${url.resourcesPath}/build/fonts/WorkSans/worksans-bold-webfont.woff2) format("woff2")}</style><script defer="defer" src="${url.resourcesPath}/build/static/js/main.e9788297.js"></script></head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div></body></html>
