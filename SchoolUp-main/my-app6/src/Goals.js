import './ProjectCSS.css';
import './mavrCSS.css';
import ReactDOM from 'react-dom';

import {TopPanel, LeftPanelVR} from "./Panels.js";
import {PlanForAdmin, PlanForClass, PlanForClassSelect} from "./See.js";

const planforadmin = <PlanForAdmin/>
const planforclass = <PlanForClass/>
const planforclassselect = <PlanForClassSelect/>
let port_reg_pl = "http://mavr.kemsu.ru:5500/api/plan/";
let port_show_rl = "http://mavr.kemsu.ru:5500/API/user/role";
let port_reg_cl = "http://mavr.kemsu.ru:5500/API/class/";
let roleofuser;
let thisclass;

function Page() {
	window.onload = function() {
			document.getElementById('vrab').className = "topbutton-page";
			document.getElementById('cvr').style.background = "#8ccba1";
			entercvr();
		};
	return (
		<div>
				< TopPanel />
				<div className="mavr">
				<div>
					<LeftPanelVR />
				</div>
					<div className="ewg_workspace">
						<p>Год плана:<select id="YearsOfPlan" className="student-input" onChange={e => {enterGoalsShowInformation(e.target.value, roleofuser);}}>
						<option selected disabled></option>
						</select></p>
						<div id="SetClasses">
						</div>
						<div id="SetPlan">
						</div>
					</div>
				</div>

		</div>
  );	
}
//Ввод годов планов
export async function entercvr() {
	let responserl = await fetch(port_show_rl, {
		method: 'GET',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		});
	let resultrl = await responserl.json();
	roleofuser=resultrl.role;
	switch(resultrl.role) {
			case "ADMIN":
			ReactDOM.render(planforadmin, document.getElementById('SetPlan'));
			break;
			case "USER":
			ReactDOM.render(planforclass, document.getElementById('SetPlan'));
			let response = await fetch(port_reg_cl, {
				method: 'GET',
				headers: {
				Authorization: `Bearer ${localStorage.token}` ,
				'Content-Type': 'application/json;charset=utf-8'
				},
				});
			let result = await response.json();
			if(result.length==1){
				thisclass=result[0].number;
			}
			else{
				ReactDOM.render(planforclassselect, document.getElementById('SetClasses'));
				let i=0;
				while(i<result.length){
					let result2 = result[i].number +  " " + result[i].letter;
					let p = document.createElement('option')
					p.value=result[i].id;
					let txt = document.createTextNode(result2)
					p.appendChild(txt);
					document.getElementById('PlanClasses').appendChild(p);
					i++;
				}
				document.getElementById('PlanClasses').onchange = e => {enterGoalsChangeClass(e.target.selectedIndex, document.getElementById('YearsOfPlan').value)};
			}
			break;
	}
	let responsepl = await fetch(port_reg_pl, {
		method: 'GET',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		});
	let resultpl = await responsepl.json();
	let i=0;
	while(i<resultpl.length){
		let result2 = resultpl[i].year_of_plan;
		let p = document.createElement('option')
		p.value=resultpl[i].id;
		let txt = document.createTextNode(result2)
		p.appendChild(txt);
		document.getElementById('YearsOfPlan').appendChild(p);
		i++;
	}
}
//Вывод плана
export async function enterGoalsShowInformation(a, roleofuser2) {
	let responsepl = await fetch(port_reg_pl, {
		method: 'GET',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		});
	let resultpl = await responsepl.json();
	switch(roleofuser2) {
		case "ADMIN":
		document.getElementById('cpvrch').innerHTML = resultpl[a-1].goals_of_educational_activity;
		document.getElementById('cpr14').innerHTML = resultpl[a-1].target_priorities_1to4;
		document.getElementById('zr14').innerHTML = resultpl[a-1].tasks_1to4;
		document.getElementById('cpr59').innerHTML = resultpl[a-1].target_priorities_5to9;
		document.getElementById('zr59').innerHTML = resultpl[a-1].tasks_5to9;
		document.getElementById('cpr1011').innerHTML = resultpl[a-1].target_priorities_10to11;
		document.getElementById('zr1011').innerHTML = resultpl[a-1].tasks_10to11;
		break;
		case "USER":
		if(thisclass!=null){
			if(thisclass<=4){
				document.getElementById('goalsOfEducationalActivity').innerHTML = resultpl[a-1].goals_of_educational_activity;
				document.getElementById('TargetPriorities').innerHTML = resultpl[a-1].target_priorities_1to4;
				document.getElementById('Tasks').innerHTML = resultpl[a-1].tasks_1to4;
			}
			else if(thisclass<=9){
				document.getElementById('goalsOfEducationalActivity').innerHTML = resultpl[a-1].goals_of_educational_activity;
				document.getElementById('TargetPriorities').innerHTML = resultpl[a-1].target_priorities_5to9;
				document.getElementById('Tasks').innerHTML = resultpl[a-1].tasks_5to9;
			}
			else{
				document.getElementById('goalsOfEducationalActivity').innerHTML = resultpl[a-1].goals_of_educational_activity;
				document.getElementById('TargetPriorities').innerHTML = resultpl[a-1].target_priorities_10to11;
				document.getElementById('Tasks').innerHTML = resultpl[a-1].tasks_10to11;
			}
		}
		break;
	}
}
//Вывод классов
export async function enterGoalsShowClasses(a) {
	let responsepl = await fetch(port_reg_pl, {
		method: 'GET',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		});
	let resultpl = await responsepl.json();
	document.getElementById('cpvrch').innerHTML = resultpl[a].goals_of_educational_activity;
	document.getElementById('cpr14').innerHTML = resultpl[a].target_priorities_1to4;
	document.getElementById('zr14').innerHTML = resultpl[a].tasks_1to4;
	document.getElementById('cpr59').innerHTML = resultpl[a].target_priorities_5to9;
	document.getElementById('zr59').innerHTML = resultpl[a].tasks_5to9;
	document.getElementById('cpr1011').innerHTML = resultpl[a].target_priorities_10to11;
	document.getElementById('zr1011').innerHTML = resultpl[a].tasks_10to11;
}
//Считывание какой сейчас класс
export async function enterGoalsChangeClass(a, year) {
	let responsepl = await fetch(port_reg_pl, {
		method: 'GET',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		});
	let resultpl = await responsepl.json();
	let numberofclass= document.getElementById('PlanClasses').options[a].text;
	thisclass = numberofclass.substring(0, numberofclass.length - 2);
	if(year!=null){
		if(thisclass<=4){
			document.getElementById('goalsOfEducationalActivity').innerHTML = resultpl[year-1].goals_of_educational_activity;
			document.getElementById('TargetPriorities').innerHTML = resultpl[year-1].target_priorities_1to4;
			document.getElementById('Tasks').innerHTML = resultpl[year-1].tasks_1to4;
		}
		else if(thisclass<=9){
			document.getElementById('goalsOfEducationalActivity').innerHTML = resultpl[year-1].goals_of_educational_activity;
			document.getElementById('TargetPriorities').innerHTML = resultpl[year-1].target_priorities_5to9;
			document.getElementById('Tasks').innerHTML = resultpl[year].tasks_5to9;
		}
		else{
			document.getElementById('goalsOfEducationalActivity').innerHTML = resultpl[year-1].goals_of_educational_activity;
			document.getElementById('TargetPriorities').innerHTML = resultpl[year-1].target_priorities_10to11;
			document.getElementById('Tasks').innerHTML = resultpl[year-1].tasks_10to11;
		}
	}
}

export default Page;