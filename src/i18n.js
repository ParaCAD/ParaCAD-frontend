import {createI18n} from "vue-i18n";
// TODO: translate all error messages
const translations = {
    en: {
        title: {
            main: 'Main',
            search: 'Search',
            template: 'Template',
            user: 'User',
            create_template: 'Create template',
            login: 'Login',
            register: 'Register',
        },
        nav: {
            home: "Home",
            search: "Search",
            create_template: 'Create template',
        },
        main: {
            content: "Welcome to ParaCAD!",
        },
        template: {
            created_by: "Created by",
            deleted: "Deleted user",
            generate_button: "Generate",
            delete_button: "Delete",
            error: {
                too_small: "Too small (min value: {min})",
                too_large: "Too large (max value: {max})",
                too_short: "Too short (min length: {min})",
                too_long: "Too long (max length: {max})",
            },
        },
        user: {
            users_templates: "Templates created by",
            your_templates: "Your templates",
            user_does_not_exist: "User does not exist!",
            template_count: "Templates",
            last_login: "Last login",
            button_edit: "Save",
            button_delete: "Delete",
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
        create_template: {
            header: "Create template",
            template_name: "Template name",
            template_content: "Template content",
            template_content_disclaimer: "(we suggest writing the template in official OpenSCAD IDE and pasting finished code here)",
            template_description: "Template description",
            create_button: "Create",
            parameters: {
                integer: "Add integer",
                float: "Add float",
                string: "Add string",
                bool: "Add bool"
            },
            error: {
                too_short: "{name} must be at least {value} characters",
                too_long: "{name} must be at max {value} characters",
                ungeneratable: "This template could not be generated!",
                no_parameters: "Template must have at least one parameter",
            },
        },
        login: {
            login: "Log in to ParaCAD",
            username: "Username",
            password: "Password",
            login_button: "Log in",
            no_account_register: "I don't have an account",
            logged_in_as: "Logged in as",
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
            create_template: 'Dodawanie szablonu',
            login: 'Logowanie',
            register: 'Rejestracja',
        },
        nav: {
            home: "Strona główna",
            search: "Wyszukaj",
            create_template: 'Dodawanie szablonu',
        },
        main: {
            content: "Witamy w aplikacji ParaCAD!",
        },
        template: {
            created_by: "Stworzony przez",
            deleted: "Użytkownik usunięty",
            generate_button: "Generuj",
            delete_button: "Usuń",
            error: {
                too_small: "Za mało (minimalna wartość: {min})",
                too_large: "Za dużo (maksymalna wartość: {max})",
                too_short: "Za krótki (minimalna długość: {min})",
                too_long: "Za długi (maksymalna długość: {max})",
            },
        },
        user: {
            users_templates: "Szablony użytkownika",
            your_templates: "Twoje szablony",
            user_does_not_exist: "Użytkownik nie istnieje!",
            template_count: "Szablony",
            last_login: "Ostatnio aktywny",
            button_edit: "Zapisz",
            button_delete: "Usuń",
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
        create_template: {
            header: "Tworzenie szablonu",
            template_name: "Nazwa szablonu",
            template_content: "Treść szablonu",
            template_content_disclaimer: "(zalecamy stworzenie szablonu w oficjalnym IDE OpenSCAD i wklejenie tu gotowego kodu)",
            template_description: "Opis szablonu",
            create_button: "Stwórz",
            parameters: {
                integer: "Dodaj liczbę całkowitą",
                float: "Dodaj liczbę dziesiętną",
                string: "Dodaj tekst",
                bool: "Dodaj wartość logiczną"
            },
            error: {
                too_short: "{name} musi mieć przynajmniej {value} znaków",
                too_long: "{name} może mieć najwyżej {value} znaków",
                ungeneratable: "Nie udało się wygenerować modelu z danego szablonu!",
                no_parameters: "Szablon musi mieć przynajmniej jeden parametr",
            },
        },
        login: {
            login: "Zaloguj się do ParaCAD",
            username: "Nazwa użytkownika",
            password: "Hasło",
            login_button: "Zaloguj się",
            no_account_register: "Nie mam konta",
            logged_in_as: "Witaj",
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