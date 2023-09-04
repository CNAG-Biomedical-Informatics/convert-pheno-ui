/**
  Header component of the application

  This file is part of convert-pheno-ui

  Last Modified: Apr/28/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/

import React, { useState } from "react";
import {
  Avatar,
  AppBar,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import GitHubIcon from "@mui/icons-material/GitHub";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CP_LOGO from "./CP-logo.png";

import auth from "../Auth";

const pages = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Convert Clinical Data",
    path: "conversion",
  },
  {
    name: "About",
    path: "about",
  },
];

function renderChangeThemeToggle(toggleColorMode, currentTheme) {
  return (
    <IconButton onClick={toggleColorMode}>
      {currentTheme === "dark" ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
}

export default function Header(props) {
  const { toggleColorMode, currentTheme, authenticated, setAuthenticated } =
    props;

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const HandleMenuItemClick = (event) => {
    setAnchorElUser(null);
    const content = event.target.textContent;
    if (content !== "Logout") return;
    auth.user.keycloak.logout();
    setAuthenticated(false);
  };

  const renderNavLink = (page) => {
    const defaultStyle = {
      textDecoration: "none",
      color: "inherit",
      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      fontWeight: "bold",
      fontSize: "14px",
      display: "inline-block",
      padding: "6px",
      textTransform: "uppercase",
    };

    return (
      <NavLink
        to={page.path}
        style={({ isActive }) => {
          const color = isActive ? "orange" : "white";
          return { ...defaultStyle, color };
        }}
      >
        {page.name}
      </NavLink>
    );
  };

  const renderUserAvatar = () => {
    return (
      <>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenUserMenu}
          color="inherit"
        >
          {/* TODO Avatar letter should not be hardcoded */}
          <Avatar>T</Avatar>
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={HandleMenuItemClick}>
            <NavLink
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
              to="/"
            >
              Logout
            </NavLink>
          </MenuItem>
        </Menu>
      </>
    );
  };

  const renderLoginButton = (theme) => {
    return (
      <NavLink
        to={{ pathname: "/conversion/" }}
        className={"nav-link-login"}
        style={{
          color: theme === "dark" ? "#90CAF9" : "white",
        }}
      >
        login
      </NavLink>
    );
  };

  // TODO
  // Github links should not be hardcoded
  return (
    <AppBar position="static">
      <Toolbar>
        <img
          src={CP_LOGO}
          style={{ height: "60px", padding: "4px 2px 2px 4px" }}
          alt="logo"
        />
        <Grid container>
          <Grid item xs={6}>
            {pages.map((page) => {
              if (page.name === "Documentation") {
                return (
                  <Button
                    key={page.path}
                    href="https://cnag-biomedical-informatics.github.io/convert-pheno-ui/"
                    target="_blank"
                    rel="noopener"
                  >
                    {page.name}
                  </Button>
                );
              }
              return renderNavLink(page);
            })}
          </Grid>
        </Grid>
        {renderChangeThemeToggle(toggleColorMode, currentTheme)}
        <IconButton
          variant="contained"
          href="https://cnag-biomedical-informatics.github.io/convert-pheno-ui/"
          target="_blank"
          rel="noopener"
          aria-label="Documentation"
        >
          <MenuBookIcon />
        </IconButton>

        <IconButton
          variant="contained"
          href="https://github.com/CNAG-Biomedical-Informatics/convert-pheno-ui"
          target="_blank"
          rel="noopener"
          aria-label="GitHub"
        >
          <GitHubIcon />
        </IconButton>

        {authenticated ? renderUserAvatar() : renderLoginButton(currentTheme)}
      </Toolbar>
    </AppBar>
  );
}
