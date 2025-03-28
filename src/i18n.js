import {createI18n} from "vue-i18n";

const translations = {
    en: {
        title: {
            main: 'Main',
            search: 'Search',
            template: 'Template',
        },
        nav: {
            home: "Home",
            search: "Search",
        },
        main: {
            content: "Welcome to ParaCAD!",
        },
        template: {
            generate_button: "Generate",
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
                empty: "Nothing here!",
            },
        },
    },
    pl: {
        title: {
            main: 'Strona gówna',
            search: 'Wyszukaj',
            template: 'Szablon',
        },
        nav: {
            home: "Strona główna",
            search: "Wyszukaj",
        },
        main: {
            content: "Witamy w aplikacji ParaCAD!",
        },
        template: {
            generate_button: "Generuj",
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
                empty: "Nic tu nie ma!",
            },
        },
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