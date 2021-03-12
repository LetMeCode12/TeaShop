export const loginErrorsValid = (errors) => {
    switch (errors) {
        case "Incorrect username or password.":
            return "Błędne hasło lub login";
        case "User is not confirmed.":
            return "Podaj kod otrzymany na email"
        case "Invalid verification code provided, please try again.":
            return "Nieprawidłowy kod aktywacyjny"
        case "Attempt limit exceeded, please try after some time.":
            return "Przekroczono limit. Spróbuj ponownie później"
        default:
            return errors;
    }
}