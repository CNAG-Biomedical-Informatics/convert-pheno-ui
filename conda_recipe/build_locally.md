
# Instructions for building perl-convert-pheno package locally

## Install conda/mamba/mircromamba

### e.g. micromamba on linux

```bash
"${SHELL}" <(curl -L micro.mamba.pm/install.sh)
```

## create conda environment

```bash
micromamba create -n build-env -f bioconda_utils/requirements.txt
micromamba activate build-env
#micromamba config append channels conda-forge
#micromamba config append channels bioconda
```

## build package

```bash
micromamba activate build-env
#conda-build . > build.log 2>&1
bioconda-utils build conda_recipe conda_recipe/config.yml > conda_recipe/build.log
```
