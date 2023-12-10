import React from "react";
import {editUserInformation, editUserPass} from "../ProfileEditFunction";

export const ProfileEditObject: React.FC = () => {
    return <div className="ListPr4">
        <p className="text-info">Изменить ФИО:
            <div>
                <input id="name" type="text" placeholder="имя" className="login-input"/>

                <input id="middle_name" type="text" placeholder="отчество" className="login-input"/>

                <input id="last_name" type="text" placeholder="фамилия" className="login-input"/>
            </div>
        </p>

        <button id="container" className="profile-button"><img src="https://i.ibb.co/h2SfXRm/performed.png" className="profile-button2" onClick={function(){editUserInformation();}}></img></button>

        <p className="text-info">Изменить пароль:
            <div>
                <input id="pass" type="password" placeholder="новый пароль" className="login-input"/>
            </div>
        </p>

        <button id="container" className="profile-button"><img src="https://i.ibb.co/h2SfXRm/performed.png" className="profile-button2" onClick={function(){editUserPass();}}></img></button>

    </div>
};