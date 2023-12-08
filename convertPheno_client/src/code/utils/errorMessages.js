const errorMessages = {
  "TypeError: Cannot read properties of undefined (reading 'map')": "An unexpected error occurred while processing your data. Please try again.",
  "Error: Request failed with status code 404": "The requested resource could not be found. Please check your input and try again.",
  "Error: Network Error": "A network error occurred. Please check your internet connection and try again."
};

export function getFriendlyErrorMessage(errorMessage) {
  return errorMessages[errorMessage] || "An unexpected error occurred. Please try again.";
}
