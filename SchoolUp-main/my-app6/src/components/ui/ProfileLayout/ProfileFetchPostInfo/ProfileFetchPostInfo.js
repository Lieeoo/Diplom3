import {mavr_context} from "../../globalContext";


export async function PostUserInfo (user) {
    let response = await fetch(mavr_context.mavr_api.userInformation.postInformation, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });

    let result = await response.json();
    if(response.status===200) {
        alert("Изменение успешно") }
    else { alert(result.message);}
};

export async function PostNewUserPass (user) {
    let response = await fetch(mavr_context.mavr_api.userInformation.postInformation, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });

    let result = await response.json();
    if(response.status===200) {
        alert("Изменение успешно") }
    else { alert(result.message);}
};