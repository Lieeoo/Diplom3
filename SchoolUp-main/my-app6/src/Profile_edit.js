import './mavrCSS.css';

import {TopPanel} from "./Panels.js";

import set from "./icons/settings.png";

import {EventEditUser} from "./See.js";
const element = <EventEditUser/>;

let prof = "http://localhost:3000/profile";
let test = "http://mavr.kemsu.ru:5500/API/brand";
let goaway = "http://localhost:3000/";
let user_edit = "http://mavr.kemsu.ru:5500/API/user/whoamiredact";

function Page() {
		window.onload = function() {
			document.getElementById('prped').className = "topbutton-page";
		};
	return (
		<div>
			< TopPanel />
			<div className="mavr">
				<div className="workspace">
					<div className="profile-space-edit">
						
						<p className="profileName"> Изменить данные пользователя </p>
						
						<EventEditUser/>
						
						<button id="container" className="profile-button"><img src="https://i.ibb.co/h2SfXRm/performed.png" className="profile-button2" onClick={function(){enter();}}></img></button>
						
					</div>
				</div>
			</div>				
		</div>
  );	
}

async function enter(){
	window.location.assign(prof);
}

async function edituser() {
	
	let user = {
		name: document.getElementById("name").value,//имя
		lname: document.getElementById("last_name").value,// фамилия
		mname: document.getElementById("middle_name").value,// отчетсво
	};

	let response = await fetch(user_edit, {
	method: 'POST',// пока что пользуем методы POST и GET, далее может быть еще какие либо  методы будем использовать, особенно для админов
	headers: {
	Authorization: `Bearer ${localStorage.token}`,
	'Content-Type': 'application/json;charset=utf-8'// стандартная строка которую менять не стоит в принципе если мы конечно не хотим здраво так упороться
	},
	body: JSON.stringify(user)
	});
	
	let result = await response.json();// дада, вот этой и она тоже асинхронна
										// в ней по идее должен быть  джейсон с токеном
}



export default Page;