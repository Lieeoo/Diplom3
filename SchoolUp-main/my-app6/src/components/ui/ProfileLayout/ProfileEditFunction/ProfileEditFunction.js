import {PostNewUserPass, PostUserInfo} from "../ProfileFetchPostInfo";

export async function editUserInformation() {

    let user = {
        name: document.getElementById("name").value,
        lname: document.getElementById("last_name").value,
        mname: document.getElementById("middle_name").value,
    };

    await PostUserInfo(user);
}

export async function editUserPass() {
    let user = {
        password: document.getElementById("pass").value,
    };

    await PostNewUserPass(user)

}