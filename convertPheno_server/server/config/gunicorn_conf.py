#!/usr/bin/env python3
#
#   gunicorn config
#
#   This file is part of convert-pheno-ui
#
#   Last Modified: Apr/28/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)
#
#   License: GPL-3.0 license

bind = "0.0.0.0:5000"
workers = 2
timeout = 600
