import {createI18n} from "vue-i18n";

const translations = {
    en: {
        title: {
            main: 'Main',
            search: 'Search',
            template: 'Template',
            user: 'User',
            login: 'Login',
            register: 'Register',
        },
        nav: {
            home: "Home",
            search: "Search",
        },
        main: {
            content: "Welcome to ParaCAD!",
        },
        template: {
            created_by: "Created by",
            generate_button: "Generate",
        },
        user: {
            users_templates: "Templates created by",
            your_templates: "Your templates",
            user_does_not_exist: "User does not exist!",
        },
        search: {
            button: "Search",
            parameters: {
                query: "Search...",
                search_description: "Search description",
                sorting: {
                    newest: "Newest",
                    oldest: "Oldest",
                }
            },
            results: {
                by_author: "by",
                created: "created",
                empty: "Nothing here!",
            },
        },
        login: {
            login: "Log in to ParaCAD",
            username: "Username",
            password: "Password",
            login_button: "Log in",
            no_account_register: "I don't have an account",
        },
        register: {
            register: "Register",
            username: "Username",
            email: "Email",
            password: "Password",
            repeat_password: "Repeat password",
            register_button: "Register",
            fill_field: "Fill field",
            passwords_no_match: "Given passwords don't match!",
            user_exists: "This account already exists!",
        }
    },
    pl: {
        title: {
            main: 'Strona gówna',
            search: 'Wyszukaj',
            template: 'Szablon',
            user: 'Użytkownik',
            login: 'Logowanie',
            register: 'Rejestracja',
        },
        nav: {
            home: "Strona główna",
            search: "Wyszukaj",
        },
        main: {
            content: "Witamy w aplikacji ParaCAD!",
        },
        template: {
            created_by: "Stworzony przez",
            generate_button: "Generuj",
        },
        user: {
            users_templates: "Szablony użytkownika",
            your_templates: "Twoje szablony",
            user_does_not_exist: "Użytkownik nie istnieje!",
        },
        search: {
            button: "Szukaj",
            parameters: {
                query: "Szukaj...",
                search_description: "Szukaj w opisach",
                sorting: {
                    newest: "Najnowsze",
                    oldest: "Najstarsze",
                }
            },
            results: {
                by_author: "autorstwa",
                created: "utworzony",
                empty: "Nic tu nie ma!",
            },
        },
        login: {
            login: "Zaloguj się do ParaCAD",
            username: "Nazwa użytkownika",
            password: "Hasło",
            login_button: "Zaloguj się",
            no_account_register: "Nie mam konta",
        },
        register: {
            register: "Zarejestruj się",
            username: "Nazwa użytkownika",
            email: "Email",
            password: "Hasło",
            repeat_password: "Powtórz hasło",
            register_button: "Zarejestruj",
            fill_field: "Wypełnij pole",
            passwords_no_match: "Podane hasła nie są identyczne!",
            user_exists: "To konto już istnieje!",
        }
    }
}

let locale = navigator.language;
if (navigator.languages !== undefined)
    locale = navigator.languages[0];

export const i18n = createI18n({
    legacy: false,
    locale: locale,
    fallbackLocale: 'en',
    messages: translations,
})