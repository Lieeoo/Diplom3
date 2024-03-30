export const mavr_context = {
    mavr_api: {
        userInformation: {
            UserAuthorization: "http://localhost:5500/API/user/login",
            getUserRole: "http://localhost:5500/API/user/role",
            postInformation: "http://localhost:5500/API/user/whoamiredact",
        },
        classes: {
            classesList: "http://mavr.kemsu.ru:5500/API/class/",
        },
    },
    mavr_local: "http://localhost:3000/",
    mavr_global: "http://mavr.kemsu.ru/",
};