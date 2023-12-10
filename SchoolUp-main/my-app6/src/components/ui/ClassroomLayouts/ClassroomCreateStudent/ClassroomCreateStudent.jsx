import '../../../../ProjectCSS.css';
import '../../../../mavrCSS.css';

import ReactDOM from 'react-dom';

import {TopPanel} from "../../NavigationPanels/NavigationPanels";
import {NewStFa, NewStFaPol, NewStFaNepol, NewStFaOp} from "../../../../See.js";

const element = <NewStFa />;
const element2 = <NewStFaPol />;
const element3 = <NewStFaNepol />;
const element4 = <NewStFaOp />;

let flag = false;
let flagFa=false;
let flagFa2=false;
let createStudentGroupOfRisk="нет";

let fastatstr;
let programDelete=0;

export let fastat="низкий доход";
export let obrurma="высшее";
export let zanma="работник по найму";
export let obrurfa="высшее";
export let zanfa="работник по найму";
export let obrurop="высшее";
export let zanop="работник по найму";

let port_reg_st = "http://mavr.kemsu.ru:5500/API/student/";
let port_reg_cl = "http://mavr.kemsu.ru:5500/API/class/";
let port_reg_fa = "http://mavr.kemsu.ru:5500/API/family/";
let cl = "http://localhost:3000/classroom";
let port_create_program = "http://mavr.kemsu.ru:5500/API/additEduc/";
let port_student_to_dop = "http://mavr.kemsu.ru:5500/API/additEduc/addSTUD";
let flst;

function Page() {
		window.onload = function() {
			enter3();
			document.getElementById('clruk').className = "topbutton-page";
		};
	return (
		<div>
			< TopPanel />
			<div className="mavr">
				<div className="classes-create-space">
					<p className="profileName">Создание ученика</p>

					<div className="ListSt2">
						<div className="student-info">
							
							<p className="text-main"> Основная информация: <hr/> </p>
								
								<p>
									Фамилия: <input id="createStudentName" type="text" className="student-input"></input>
									ФИО: <input id="createStudentFIO" type="text" className="student-input" style={{width: 250}}></input>
									
								</p>
								<p>
									Дата рождения: <input id="createStudentBirthday" className="student-input" type="date"></input>
									Пол:  
									<select id="clSex" className="student-input">
										<option value="0">м</option>
										<option value="1">ж</option>
									</select>
									Класс:
									<select id="clSel" className="student-input">
									</select>
								</p>
								<p> Группа риска:
									<select className="student-input" onChange={e => {createStudentGroupOfRisk = e.target.value}}>
										<option>нет</option>
										<option>девиантное поведение</option>
										<option>неуспеваемость</option>
										<option>иное</option>
									</select>
									Семья:
									<select id="createStudentFamilyStatus" className="student-input" onChange={e => {enter6(e.target.value)}}>
										<option value="полная">полная</option>
										<option value="неполная">неполная</option>
										<option value="опекун">опекун</option>
									</select>
								</p>
								<p> 
									Сертификат ПФДО:<input id="createStudentPFDO" className="student-input" type="text"></input>
								</p>
						</div>
						</div>
							<div id="pasteFa"> 
						</div>
						
						<div className="ListSt2">
						<div className="student-info">
							<p className="text-main"> Дополнительное образование: <hr/> </p>
							<div>
								<div className="stud-addition">
									<div>
										<p> Выберите направление: 
										<select id="listOfAdditionalEducations" className="student-input">
											<option selected disabled></option>
										</select>
										</p>
									</div>
									<div>
										<p>Направления учащегося: 
										<select id="listOfAdditionalEducationsAdd" className="student-input" size="3">
										</select>
										</p>
									</div>
									
								</div>
							</div>
							</div>
						</div>
							
						<button id="container" className="profile-button"><img src="https://i.ibb.co/h2SfXRm/performed.png" className="profile-button2" onClick={function(){enter();}}></img></button>
						
						<button id="container" className="profile-button"><img src="https://i.ibb.co/yBBD6GY/cancel.png"className=" profile-button2" onClick={function(){enter_exit();}}></img></button>
					</div>
				</div>

		</div>
  );	
}

async function enter_exit() {
	window.location.assign(cl);
}

//Добавление ученика в БД
async function enter() {
	let family2;
	let response2;
	let result2;
	//Добавление семьи
	switch(flst) {
		case 0:
		family2 = {
		family_status:0
		};
		response2 = await fetch(port_reg_fa, {
		method: 'POST',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(family2),
		});
		result2 = await response2.json();
		break;
		case 1:
		family2 = {
		family_status:1,
		material_condition:document.getElementById('createStudentFamilysMoney').value,
		educationFather:document.getElementById('createStudentEducationLevelFather').value,
		educationMother:document.getElementById('createStudentEducationLevelMother').value,
		fatherStat:document.getElementById('createStudentWorkFather').value,
		motherStat:document.getElementById('createStudentWorkMother').value
		};
		response2 = await fetch(port_reg_fa, {
		method: 'POST',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(family2),
		});
		result2 = await response2.json();
		break;
		case 2:
		family2 = {
		family_status:2,
		material_condition:document.getElementById('createStudentFamilysMoney').value,
		educationMother:document.getElementById('createStudentEducationLeveGuardian').value,
		motherStat:document.getElementById('createStudentWorkGuardian').value
		};
		response2 = await fetch(port_reg_fa, {
		method: 'POST',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(family2),
		});
		result2 = await response2.json();
		break;
		case 3:
		alert(3);
		family2 = {
		family_status:3,
		material_condition:document.getElementById('createStudentFamilysMoney').value,
		educationFather:document.getElementById('createStudentEducationLeveGuardian').value,
		fatherStat:document.getElementById('createStudentWorkGuardian').value
		};
		response2 = await fetch(port_reg_fa, {
		method: 'POST',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(family2),
		});
		result2 = await response2.json();
		alert(33);
		break;
		case 4:
		family2 = {
		family_status:4,
		material_condition:document.getElementById('createStudentFamilysMoney').value,
		educationMother:document.getElementById('createStudentEducationLeveGuardian').value,
		motherStat:document.getElementById('createStudentWorkGuardian').value
		};
		response2 = await fetch(port_reg_fa, {
		method: 'POST',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(family2),
		});
		result2 = await response2.json();
		break;
		case 5:
		family2 = {
		family_status:5,
		material_condition:document.getElementById('createStudentFamilysMoney').value,
		educationFather:document.getElementById('createStudentEducationLeveGuardian').value,
		fatherStat:document.getElementById('createStudentWorkGuardian').value
		};
		response2 = await fetch(port_reg_fa, {
		method: 'POST',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(family2),
		});
		result2 = await response2.json();
		break;
	}
	let result3 = parseInt(JSON.stringify(result2.id));
	//Добавление ученика
	alert(document.getElementById('createStudentPFDO').value);
	let student = {
		name:document.getElementById('createStudentName').value,
		fullname:document.getElementById('createStudentFIO').value,
		class_ID:document.getElementById('clSel').value,
		birthday:document.getElementById('createStudentBirthday').value,
		group_of_risk:createStudentGroupOfRisk,
		sex:document.getElementById('clSex').value,
		family_id:result3,
		PFDO:document.getElementById('createStudentPFDO').value
		};
	let response = await fetch(port_reg_st, {
		method: 'POST',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(student),
		});
	let result = await response.json();
	let result4 = parseInt(JSON.stringify(result.id));
	alert(JSON.stringify(result));
	//Добавление дополнительного образования
	let m=0;
	while(m<document.getElementById("listOfAdditionalEducationsAdd").options.length){
		let studenttodop = {
			id:document.getElementById("listOfAdditionalEducationsAdd").options[m].value,
			stud_id:result4
			};
		let responsestudenttodop = await fetch(port_student_to_dop, {
			method: 'POST',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(studenttodop),
			});
		let resultstudenttodop = await responsestudenttodop.json();
		m++;
	}
	window.location.assign(cl);
}

//Функция-тест
async function enter2() {
	alert(document.getElementById('createStudentGroupOfRisk').value);
}

//Заполнение данных на странице
async function enter3() {
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
		let result2 = JSON.stringify(result.rows[i].number +  " " + result.rows[i].letter);
		var result3 = result2.substring(1, result2.length-1);
		let p = document.createElement('option')
		p.value=result.rows[i].id;
		let txt = document.createTextNode(result3)
		p.appendChild(txt);
		document.getElementById('clSel').appendChild(p);
		i++;
	}
	flst = 1;
	ReactDOM.render(element, document.getElementById('pasteFa'));
	ReactDOM.render(element2, document.getElementById('familyHolder'));
	//Заполнение списков программ для дополнительного образования
	let responseprogram = await fetch(port_create_program, {
		method: 'GET',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		});
	let resultprogram = await responseprogram.json();
	let j=0;
	while(j<resultprogram.count){
		let resultprogram2 = resultprogram.rows[j].name;
		let p = document.createElement('option')
		p.value=resultprogram.rows[j].id;
		let txt = document.createTextNode(resultprogram2)
		p.appendChild(txt);
		document.getElementById('listOfAdditionalEducations').appendChild(p);
		j++;
	}
	document.getElementById('listOfAdditionalEducationsAdd').onchange = e => {enterNewStudentDeleteProgramFromSelect(e.target.selectedIndex);};
	document.getElementById('listOfAdditionalEducations').onchange = e => {enterControlSystemEventsThisProgram(e.target.value);};
}

//Автозаполнение полей ученика
async function enter4() {
	document.getElementById('ln').value = "Студент";
	document.getElementById('fio').value = "Студент Студентович Студентов";
	document.getElementById('dd').value = "2005-03-03";
	document.getElementById('fl').value = "полная";
	flst = 1;
	document.getElementById('pfdo').value = "88006660606";
}
//Открытие создания семьи
export async function enter6(a) {
	ReactDOM.render(element, document.getElementById('pasteFa'));
	switch(a) {
		case 'полная':
		ReactDOM.render(element2, document.getElementById('familyHolder'));
		flst=1;
		break;
		case 'неполная':
		ReactDOM.render(element3, document.getElementById('familyHolder'));
		flst=2;
		break;
		case 'опекун':
		ReactDOM.render(element4, document.getElementById('familyHolder'));
		flst=4;
		break;
	}
}
//Заполнение поля неполной семьи в зависимости от матери/отца-одиночки или опекуна
export async function enter9(a) {
	switch(a) {
		case 'ж':
		if (flst==2||flst==3){
			flst=2;
		}
		else {
			flst=4;
		}
		break;
		case 'м':
		if (flst==2||flst==3){
			flst=3;
		}
		else {
			flst=5;
		}
		break;
	}
}

export async function enterControlSystemEventsThisProgram(a) {
	//Проверка, нет ли уже этого направления в select
	let kolstr = document.getElementById("listOfAdditionalEducationsAdd").options.length;
	let i=0;
	let j=0;
	while(i<kolstr){
		if(document.getElementById("listOfAdditionalEducationsAdd").options[i].value==a) j++;
		i++;
	}
	if (j>0){
		alert("Это направление уже есть в списке!");
	}
	else{
		//Добавление выбранного направления в select
		let responsedirection = await fetch(port_create_program, {
			method: 'GET',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			});
		let resultdirection = await responsedirection.json();
		let h=0;
		while(a!=resultdirection.rows[h].id) h++;
		let thisDirection = resultdirection.rows[h].name;
		let p = document.createElement('option')
		p.value=resultdirection.rows[h].id;
		let txt = document.createTextNode(thisDirection);
		p.appendChild(txt);
		document.getElementById('listOfAdditionalEducationsAdd').appendChild(p);
	}
}
//Удаление программы из select-а при клике
export async function enterNewStudentDeleteProgramFromSelect(a) {
	document.getElementById("listOfAdditionalEducationsAdd").options[a] = null;
}


export default Page;