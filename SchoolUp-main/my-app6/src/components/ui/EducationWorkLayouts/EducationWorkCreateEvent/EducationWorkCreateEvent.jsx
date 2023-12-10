import '../../../../ProjectCSS.css';
import ReactDOM from 'react-dom';

import {TopPanel} from "../../NavigationPanels/NavigationPanels.jsx";

let port_reg_vr = "http://mavr.kemsu.ru:5500/api/event/";
let port_reg_napksob = "http://mavr.kemsu.ru:5500/api/event/napravlenie_set";
let port_reg_cl = "http://mavr.kemsu.ru:5500/API/class/";
let port_find_students = "http://mavr.kemsu.ru:5500/API/student/:id";
let port_add_students = "http://mavr.kemsu.ru:5500/API/event/stud_give";
let port_see_napr = "http://mavr.kemsu.ru:5500/api/napravlenie";

let fovr=1;
let nap;
let fovrtext="классный час";
let naprtext="трудовое";
let tekcl;
let resultnap;

function Page() {
	window.onload = function() {
			enternewvr6();
		};
	return (
		<div className="pages">
			< TopPanel />
			<div className="Test">
				<div className="Blockk3">
				<p>Создание события</p>
					<div className="ListSt2">
						<div>
							<div className="TextStyleNVR">
								<div className="displayFlex">
									<div>
										<p>Название:<input id="navr" type="text"></input></p>
										<p>Дата начала:<input id="danavr" type="date"></input></p>
										<p>Дата окончания:<input id="daokvr" type="date"></input></p>
										<p>Форма воспитательной работы:
											<select id="fovr" onChange={e => {fovrtext=e.target.value;}}>
												<option selected disabled></option>
												<option>классный час</option>
												<option>тематическая беседа</option>
												<option>урок города</option>
												<option>квиз</option>
											</select>
										</p>
										<p>Направление:
											<select id="napr2vr" onChange={e => {nap = e.target.value;}}>
												<option selected disabled></option>
											</select>
										</p>
										<p>В рамках проекта:<input id="provr" type="text"></input></p>
										<p>Сетевое взаимодействие:<input id="svvr" type="text"></input></p>
										<p>Сертификат:<input id="revr" type="text"></input></p>
										<button className="TBVR" onClick={function(){enternewvr();}}> Автозаполнить </button>
										<button className="TBVR" onClick={function(){enternewvr2();}}> Сохранить </button> 
									</div>
									<div>
										<p>Ученики:<select id="uchenvr" size="4" onChange={e => {enternewvr5(e.target.selectedIndex)}}>
										</select>
										<select id="cllivr" onChange={e => {enternewvr7(e.target.value);}}>
										<option selected disabled></option>
										</select>
										<select id="clvr" onChange={e => {enternewvr4(e.target.value);}}>
										</select>
										</p>		
										<p>Кто проводит:<textarea id="whvr" type="text" style={{width: 250, height:50}}></textarea></p>
										<p>Приглашенные организации:<textarea id="povr" type="text" style={{width: 250, height:100}}></textarea></p>
										<p>Приглашенные родители:<textarea id="prvr" type="text" style={{width: 250, height:100}}></textarea></p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
  );	
}

//Автозаполнение полей воспитательного события
async function enternewvr() {
	document.getElementById('navr').value = "УРОК ГОРОДА";
	document.getElementById('danavr').value = "2005-03-03";
	document.getElementById('daokvr').value = null;
	document.getElementById('fovr').value = "классный час";
	document.getElementById('provr').value = "Живые уроки";
	document.getElementById('svvr').value = "МБОУ СОШ №75";
	document.getElementById('whvr').value = "Иванова Мария Александровна";
	document.getElementById('povr').value = "МБОУ СОШ №75, МБОУ СОШ №30, МБОУ СОШ №68";
	document.getElementById('prvr').value = "Климов Артём Ярославович, Родионов Иван Ибрагимович, Герасимова Елизавета Владимировна, Тихомирова Милана Ильинична, Емельянова Ольга Андреевна, Савин Кирилл Викторович, Михайлова Арина Матвеевна, Кожевников Макар Сергеевич, Орлов Лука Даниилович, Трофимов Сергей Арсентьевич";
	document.getElementById('revr').value = "4356675456";
}

//Создание события
async function enternewvr2() {
	let daok=document.getElementById('daokvr').value;
	if (document.getElementById('daokvr').value.length==0){
		daok=null;
	}
	//Создание события
	let vospsob = {
	plan_id:0,
	event_name:document.getElementById('navr').value,
	date_of_nach_event:document.getElementById('danavr').value,
	date_of_conch_event:daok,
	form_vosp_rab:document.getElementById('fovr').value,
	project:document.getElementById('provr').value,
	network_interaction:document.getElementById('svvr').value,
	who:document.getElementById('whvr').value,
	invited_organizations:document.getElementById('povr').value,
	invited_parents:document.getElementById('prvr').value,
	sertificate:document.getElementById('revr').value
	};
	let responsevr = await fetch(port_reg_vr, {
	method: 'POST',
	headers: {
	Authorization: `Bearer ${localStorage.token}` ,
	'Content-Type': 'application/json;charset=utf-8'
	},
	body: JSON.stringify(vospsob),
	});
	let resultvr = await responsevr.json();
	alert(JSON.stringify(resultvr));
	//Вывод всех событий для вывода количества строк
	let responsevrget = await fetch(port_reg_vr, {
	method: 'GET',
	headers: {
	Authorization: `Bearer ${localStorage.token}` ,
	'Content-Type': 'application/json;charset=utf-8'
	},
	});
	let resultvrget = await responsevrget.json();
	//Привязка направления к событию
	let naprksob = {
	id:resultvrget.rows[resultvrget.count-1].id,
	napr_id:nap
	};
	let responsenaprksob = await fetch(port_reg_napksob, {
	method: 'POST',
	headers: {
	Authorization: `Bearer ${localStorage.token}` ,
	'Content-Type': 'application/json;charset=utf-8'
	},
	body: JSON.stringify(naprksob),
	});
	let resultnaprksob = await responsenaprksob.json();
	alert(JSON.stringify(resultnaprksob));
	//Привязка учеников к событию
	let kolstr = document.getElementById("uchenvr").options.length;
	let i=0;
	while(i<kolstr){
		let uchksob = {
		id:resultvrget.rows[resultvrget.count-1].id,
		stud_id:document.getElementById("uchenvr").options[i].value
		};
		let responseuchksob = await fetch(port_add_students, {
		method: 'POST',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(uchksob),
		});
		let resultuchksob = await responseuchksob.json();
		alert(JSON.stringify(resultuchksob));
		i++;
	}
}

//Добавление ученика в список учеников
async function enternewvr4(a) {
	let kolstr = document.getElementById("uchenvr").options.length;
	let i=0;
	let j=0;
	while(i<kolstr){
		if(document.getElementById("uchenvr").options[i].value==a) j++;
		i++;
	}
	if (j>0){
		alert("Этот ученик уже есть в списке!");
	}
	else {
		let student = {
			class_ID:tekcl,
		};
	let response = await fetch(port_find_students, {
		method: 'POST',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(student)
		});
	let result = await response.json();
	i=0;
	while (result.rows[i].id!=a){
		i++;
	}
	let result2 = result.rows[i].fullname;
	let p = document.createElement('option')
	p.value=result.rows[i].id;
	let txt = document.createTextNode(result2)
	p.appendChild(txt);
	document.getElementById('uchenvr').appendChild(p);
	}
}

async function enternewvr5(a) {
	document.getElementById("uchenvr").options[a] = null;
}

async function enternewvr6() {
	//Заполнение списка классов
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
		document.getElementById('cllivr').appendChild(p);
		i++;
	}
	//Заполнение списка направлений
	let responsenap = await fetch(port_see_napr, {
		method: 'GET',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		});
	resultnap = await responsenap.json();
	
	i=0;
	while(i<resultnap.count){
		let result2 = resultnap.rows[i].name;
		let p = document.createElement('option')
		p.value=resultnap.rows[i].id;
		let txt = document.createTextNode(result2)
		p.appendChild(txt);
		document.getElementById('napr2vr').appendChild(p);
		i++;
	}
}
//Заполнение списка учеников
async function enternewvr7(a) {
	tekcl=a;
	let kolstr = document.getElementById("clvr").options.length;
	let i=kolstr;
	while(i>=0){
		document.getElementById("clvr").options[i] = null;
		i--;
	}
	let student = {
			class_ID:a,
		};
	let response = await fetch(port_find_students, {
		method: 'POST',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(student)
		});
	let result = await response.json();
	let p = document.createElement('option')
	p.disabled = true;
	p.selected = true;
	document.getElementById('clvr').appendChild(p);
	i=0;
	while(i<result.count){
		let result2 = result.rows[i].fullname;
		let p = document.createElement('option')
		p.value=result.rows[i].id;
		let txt = document.createTextNode(result2)
		p.appendChild(txt);
		document.getElementById('clvr').appendChild(p);
		i++;
	}
}


export default Page;