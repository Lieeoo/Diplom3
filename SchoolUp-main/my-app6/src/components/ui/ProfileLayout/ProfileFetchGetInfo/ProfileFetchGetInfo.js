import {mavr_context} from "../../globalContext";

export async function getInformation() {
    let p;
    let txt;

    // получение роли
    let responseroleuser = await fetch (mavr_context.mavr_api.userInformation.getUserRole,{
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    });
    let resultroleuser = await responseroleuser.json();
    localStorage.setItem("userRole", resultroleuser.role);

    //Вывод информации о пользователе
    let showfrofile = {
    };
    let responseshowfrofile = await fetch(mavr_context.mavr_api.userInformation.postInformation, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.token}` ,
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(showfrofile)
    });
    let resultshowfrofile = await responseshowfrofile.json();
    document.getElementById('user_name').innerHTML = resultshowfrofile.lname + '\u00A0' + resultshowfrofile.name + '\u00A0' + resultshowfrofile.mname;
    document.getElementById('my_user_role').innerHTML = resultshowfrofile.comm;

    //Вывод привязанных классов
    let response = await fetch(mavr_context.mavr_api.classes.classesList, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.token}` ,
            'Content-Type': 'application/json;charset=utf-8'
        },
    });
    let result = await response.json();
    let i=0;
    while(i<result.length-1){
        p = document.createElement('div')
        txt = document.createTextNode(result[i].number + result[i].letter + "," + '\u00A0');
        p.appendChild(txt);
        document.getElementById('clprofile').appendChild(p);
        i++;
    }
    p = document.createElement('div')
    txt = document.createTextNode(result[i].number + result[i].letter);
    p.appendChild(txt);
    document.getElementById('clprofile').appendChild(p);
}
