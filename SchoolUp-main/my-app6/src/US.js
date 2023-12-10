import './ProjectCSS.css';
import ReactDOM from 'react-dom';
import './mavrCSS.css';

import {TopPanel,LeftPanelUS} from "./Panels.js";
import {EventCreateClass,EventDelClass,CrPlan,EventCreateNapr} from "./See.js";

let test = "http://mavr.kemsu.ru:5500/api/user/whoami";
let linkk = "http://mavr.kemsu.ru:5500/api/student";
let port_reg_cl = "http://mavr.kemsu.ru:5500/API/class/";
let port_reg_pl = "http://mavr.kemsu.ru:5500/api/plan/";
let port_reg_napravlenie = "http://mavr.kemsu.ru:5500/api/napravlenie/";

const element = <EventCreateClass />;
const element2 = <EventDelClass />;
const element3 = <CrPlan />;

let flag = false;
let flag2 = false;

function kodimg(el) {
alert(el.className);
}

function enter() {
	window.location.assign("http://localhost:3000/profile");
}		

function Page() {
	window.onload = function() {
			document.getElementById('upr').className = "topbutton-page";
			document.getElementById('controlUsers').style.background = "#8ccba1";
			enterus();
		};
	return (
		<div>
				< TopPanel />
				<div className="Test">
					<LeftPanelUS/>
					<div className="workspaceClassWork">
						<div className="ListSt">
							<div className="displayFlex">
								<div>
									<EventCreateClass />
								</div>
								<div>
									<EventDelClass />
								</div>
								<div>
									<CrPlan />
								</div>
							</div>
						</div>
					</div>
				</div>

		</div>
  );	
}
//Создание нового класса
export async function enternewcl() {
	
	let class2 = {
			letter:document.getElementById("createClassLetter").value,
			number:document.getElementById("createClassNumber").value,
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
//Заполнение классов
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
		document.getElementById('deleteClassSelect').appendChild(p);
		i++;
	}
}
//Создание общего плана
export async function enterus2() {
	
	let crpl = {
		year_of_plan:document.getElementById("createYearPlanInputYear").value,
		goals_of_educational_activity:document.getElementById("createYearPlanInputGoalsOfEducationalWork").value,
		target_priorities_1to4:document.getElementById("createYearPlanInputTargetPriorities14").value,
		target_priorities_5to9:document.getElementById("createYearPlanInputTargetPriorities59").value,
		target_priorities_10to11:document.getElementById("createYearPlanInputTargetPriorities1011").value,
		tasks:document.getElementById("createYearPlanInputTasksOfEducationalWork").value 
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

export default Page;