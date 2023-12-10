import {mavr_context} from "../globalContext";

export default async function AuthorizationUser (emailUser, passwordUser) {
    let user = {
        email: emailUser,
        password: passwordUser,
    };

    let response = await fetch(mavr_context.mavr_api.userInformation.UserAuthorization, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });

    let result = await response.json();
    if(response.status===200) {
        localStorage.setItem("token", result.token);
        window.location.assign("profile"); }
    else { alert(result.message);}

};