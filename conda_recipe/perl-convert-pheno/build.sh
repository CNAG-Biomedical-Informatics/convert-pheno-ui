#!/bin/bash

general_deps=(
    "Data::Leaf::Walker"
    #"JSON::Validator"
    "File::ShareDir::ProjectDistDir"
    "Moo"
    "Path::Tiny"
    "Test::Deep"
    "Text::CSV_XS"
    "Text::Similarity"
    "Types::Standard"
    "XML::Fast"
    "YAML::XS"
)

# install dependencies not found in conda channels
install_deps() {
    local deps=("${!1}")  # Use "!" to dereference the array variable passed as an argument

    for dep in "${deps[@]}"; do
        echo "Installing the dependency: $dep"
        HOME=/tmp cpanm -v "$dep" || {
        # cpanm "$dep" || {
            echo "Failed to install perl module $dep"
            exit 1
        }
    done
}

if [[ "$(uname)" == Darwin ]]; then
    # export HOME=`pwd`
    # potential fix for the compilation errors
    # conda install -c conda-forge perl'>=5.32.1,<5.33.0a0' -y
    conda install -c bioconda perl-test-leaktrace -y
    conda install -c bioconda perl-params-util -y
    conda install -c conda-forge perl-data-optlist -y
    conda install -c bioconda perl-sub-exporter -y
    conda install -c bioconda perl-mac-systemdirectory -y
    conda install -c bioconda perl-json-validator
    #perl-mac-system directory needs perl 5.26.2

    conda install -c bioconda perl-file-homedir -y
    # conda install -v -c conda-forge perl-yaml-libyaml=0.85 -y
    #perl-yaml-libyaml=0.85 needs perl 5.32.1
fi

cpanm File::ShareDir::Install
if [[ "$(uname)" == Darwin ]]; then
    install_deps general_deps[@]
else
    new_deps=("${general_deps[@]}" "JSON::Validator")
    install_deps new_deps[@]
fi
# install_deps
perl Makefile.PL INSTALLDIRS=site
make
# make test
make test TEST_FILES="t/mapping.t t/module.t t/ohdsi.t t/stream.t"
make install

# This will allow them to be run on environment activation.
for CHANGE in "activate" "deactivate";
do
  mkdir -p "${PREFIX}/etc/conda/${CHANGE}.d"
done
echo "#!/bin/sh" > "${PREFIX}/etc/conda/activate.d/${PKG_NAME}_activate.sh"
echo "export PERL5LIB=$PREFIX/lib/perl5/site_perl/5.22.0/" >> "${PREFIX}/etc/conda/activate.d/${PKG_NAME}_activate.sh"
echo "#!/bin/sh" > "${PREFIX}/etc/conda/deactivate.d/${PKG_NAME}_deactivate.sh"
echo "unset PERL5LIB" >> "${PREFIX}/etc/conda/deactivate.d/${PKG_NAME}_deactivate.sh"
