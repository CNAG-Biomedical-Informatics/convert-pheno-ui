
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
mamba env update -n build-env -f bioconda_utils-requirements.txt
mamba install python=3.7
```

## build & test package in docker container
```bash
mamba activate build-env
bioconda-utils build . ./config.yml --docker --mulled-test > ./build.docker.log 2>&1
```

## build package on local machine and test in docker container

```bash
mamba activate build-env
bioconda-utils build . ./config.yml --mulled-test > ./build.local.log 2>&1
