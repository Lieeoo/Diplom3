import '../../../ProjectCSS.css';
import ReactDOM from 'react-dom';
import '../../../mavrCSS.css';

import {TopPanel,LeftPanelOfControlPage} from "../../ui/NavigationPanels/NavigationPanels.jsx";
import {ClassToUser, UserNewUser} from "../../../See.js";

let test = "http://mavr.kemsu.ru:5500/api/user/whoami";
let linkk = "http://mavr.kemsu.ru:5500/api/student";
let port_reg_pl = "http://mavr.kemsu.ru:5500/api/plan/";
let port_reg_napravlenie = "http://mavr.kemsu.ru:5500/api/napravlenie/";
let port_reg_cl = "http://mavr.kemsu.ru:5500/API/class/";
let port_show_users = "http://mavr.kemsu.ru:5500/API/user/all";
let port_reg_classtouser = "http://mavr.kemsu.ru:5500/API/user/addClass";
let port_reg_user = "http://mavr.kemsu.ru:5500/API/user/registration";

function ControlPage() {
	window.onload = function() {
			document.getElementById('upr').className = "topbutton-page";
			document.getElementById('controlUsers').style.background = "#8ccba1";
			enterControlSystemUsers();
		};
	return (
		<div>
				< TopPanel />
				<div className="mavr">
					<LeftPanelOfControlPage/>
					<div className="control-space">
						<div>
						<p className="text-main"> Создать пользователя:  
							<UserNewUser />
							</p>
						</div>
					
						<div>
						<p className="text-main"> <hr/> Назначить классное руководство: 
							<ClassToUser />
							</p>
						</div>
						
					</div>
				</div>

		</div>
  );	
}
//Создание направления
export async function enterus3() {
	
	let crnapravlenie = {
		name:document.getElementById("createDirection").value,
		};
	let responsecrnapravlenie = await fetch(port_reg_napravlenie, {
		method: 'POST',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(crnapravlenie),
		});
	let resultcrnapravlenie = await responsecrnapravlenie.json();
	alert(JSON.stringify(resultcrnapravlenie));
}
//Заполнение данных
export async function enterControlSystemUsers() {
	//Заполнение классов
	let response = await fetch(port_reg_cl, {
		method: 'GET',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		});
	let result = await response.json();
	let i=0;
	while(i<result.length){
		let result2 = result[i].number +  " " + result[i].letter;
		let p = document.createElement('option')
		p.value=result[i].id;
		let txt = document.createTextNode(result2)
		p.appendChild(txt);
		document.getElementById('ClassToUserClass').appendChild(p);
		i++;
	}
	//Заполнение пользователей
	let responseUsers = await fetch(port_show_users, {
		method: 'GET',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		});
	let resultUsers = await responseUsers.json();
	let j=0;
	while(j<resultUsers.length){
		let resultresultUsers2 = resultUsers[j].lname + " " + resultUsers[j].name + " " + resultUsers[j].mname;
		let p = document.createElement('option')
		p.value=resultUsers[j].id;
		let txt = document.createTextNode(resultresultUsers2)
		p.appendChild(txt);
		document.getElementById('ClassToUserUser').appendChild(p);
		j++;
	}
}

//Привязка класса к пользователю
export async function enterControlSystemUsersClassToUser() {
	let classtouser = {
		id:document.getElementById("ClassToUserUser").value,
		class_id:document.getElementById("ClassToUserClass").value
		};
	let responseclasstouser = await fetch(port_reg_classtouser, {
		method: 'POST',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(classtouser),
		});
	let resultclasstouser = await responseclasstouser.json();
	alert(JSON.stringify(resultclasstouser));
}

//Создание пользователя
export async function enterControlSystemUsersCreateUser() {
	let createuser = {
		email:document.getElementById("newUserLogin").value,
		password:document.getElementById("newUserPassword").value,
		role:document.getElementById("newUserRole").value,
		name:document.getElementById("newUserName").value,
		lname:document.getElementById("newUserLastname").value,
		mname:document.getElementById("newUserMiddlename").value,
		comm: document.getElementById("newUserComment").value
		};
	let responsecreateuser = await fetch(port_reg_user, {
		method: 'POST',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(createuser),
		});
	let resultcreateuser = await responsecreateuser.json();
	alert(JSON.stringify(resultcreateuser));
}


export async function enternewcl() {
	
	let class2 = {
			letter:document.getElementById("le").value,
			number:document.getElementById("nu").value,
			birthday:"03-09-2021"
		};
	let response = await fetch(port_reg_cl, {
		method: 'POST',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(class2),
		});
	let result = await response.json();
}

export async function enterus() {
	let response = await fetch(port_reg_cl, {
		method: 'GET',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		});
	let result = await response.json();
	let i=0;
	while(i<result.count){
		let result2 = result.rows[i].number +  " " + result.rows[i].letter;
		let p = document.createElement('option')
		p.value=result.rows[i].id;
		let txt = document.createTextNode(result2)
		p.appendChild(txt);
		document.getElementById('delClSelect').appendChild(p);
		i++;
	}
}

export async function enterus2() {
	
	let crpl = {
		year_of_plan:document.getElementById("crdaplan").value,
		goals_of_educational_activity:document.getElementById("crcvrch").value,
		target_priorities_1to4:document.getElementById("crcpr14").value,
		target_priorities_5to9:document.getElementById("crcpr59").value,
		target_priorities_10to11:document.getElementById("crcpr1011").value,
		tasks:document.getElementById("crzvr").value 
		};
	let responsecrpl = await fetch(port_reg_pl, {
		method: 'POST',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(crpl),
		});
	let resultcrpl = await responsecrpl.json();
	alert(JSON.stringify(resultcrpl));
}



export default ControlPage;