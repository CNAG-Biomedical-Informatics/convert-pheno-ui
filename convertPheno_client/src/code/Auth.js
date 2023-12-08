/**
  helper functions for authentication

  This file is part of convert-pheno-ui

  Last modified: Dec/08/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/

import jwt_decode from "jwt-decode";

export default {
  user: {
    authenticated: false,
    access_token: "",
  },
  getToken() {
    return this.user.keycloak !== undefined ? this.user.keycloak.token : false;
  },
  decoded() {
    return this.user.keycloak !== undefined ? jwt_decode(this.user.keycloak.token) : "empty";
  },
  setToken(user) {
    this.user = user;
    this.user.authenticated = true;
  },
  getUser() {
    return this.user;
  },
  getUserName() {
    if (this.user.keycloak !== undefined) {
      return this.user.keycloak.idTokenParsed.preferred_username;
    }
  },
  getUserGroups() {
    // if (window.Cypress) {
    //   return [localStorage.getItem('kcGroup')]
    // }
    if (this.user.keycloak !== undefined) {
      return this.user.keycloak.idTokenParsed.group.map(group => group.replace('/', ''));
    }
    return [];
  },
  tokenExpired() {
    const now = new Date();
    const secondsSinceEpoch = Math.round(now.getTime() / 1000);
    return this.decoded().exp > secondsSinceEpoch ? false : true;
  },
};
