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

install_deps() {
    local deps=("${!1}")  # Use "!" to dereference the array variable passed as an argument

    for dep in "${deps[@]}"; do
        echo "Installing $dep"
        # HOME=/tmp cpanm -v "$dep" || {
        # # cpanm "$dep" || {
        #     echo "Failed to install perl module $dep"
        #     exit 1
        # }
    done
}

new_deps=("${general_deps[@]}" "JSON::Validator")
install_deps new_deps[@]
