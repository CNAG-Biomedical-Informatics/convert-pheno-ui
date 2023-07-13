
# Instructions for building perl-convert-pheno package locally

## Install conda/mamba/mircromamba

### e.g. mamba on linux

```bash
curl -L -O "https://github.com/conda-forge/miniforge/releases/latest/download/Mambaforge-$(uname)-$(uname -m).sh"
bash Mambaforge-$(uname)-$(uname -m).sh
```

## create conda environment

```bash
mamba create -n build-env python=3.7
mamba env update -n build-env -f conda_recipe/bioconda_utils-requirements.txt
mamba install python=3.7
```

## build package

```bash
mamba activate build-env
bioconda-utils build conda_recipe conda_recipe/config.yml --docker --mulled-test > conda_recipe/build.log 2>&1
```
