import './ProjectCSS.css';
import ReactDOM from 'react-dom';
import './mavrCSS.css';
import {CSSTransition} from 'react-transition-group';

import {TopPanel, LeftPanelO} from "./Panels.js";
import {OClNORM2} from "./See.js";

let port_reg_cl = "http://mavr.kemsu.ru:5500/API/class/";
let port_find_students = "http://mavr.kemsu.ru:5500/API/student/:id";

let flag = false;

function Page() {
	window.onload = function() {
			document.getElementById('mo').className = "topbutton-page";
			document.getElementById('o').style.background = "#8ccba1";
			enter();
		};
	return (
		<div>
				< TopPanel />
				<div className="Test">
					<LeftPanelO/>
					<div className="workspaceClassWork">
						<div className="displayFlexColumnNorm">
						<div>Составить отчеты:</div>
						<div>Класс:<select id="clSel">
						</select></div>
							<OClNORM2 />
						<div>
							<button id="oClb" className="profile-button"><img src="https://i.ibb.co/tDWy41D/create-document.png" className="profile-button2"></img></button> 
						</div>
						</div>
					</div>
				</div>

		</div>
  );	
}
//Заполнение списка классов
async function enter() {
	let responseo = await fetch(port_reg_cl, {
		method: 'GET',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		});
	let resulto = await responseo.json();
	let i=0;
	while(i<resulto.count){
		let result2 = resulto.rows[i].number + resulto.rows[i].letter;
		let p = document.createElement('option')
		p.value=resulto.rows[i].id;
		let txt = document.createTextNode(result2)
		p.appendChild(txt);
		document.getElementById('clSel').appendChild(p);
		i++;
	}
	document.getElementById('oClb').onclick = function() {entero();};
}

async function entero() {
	let checked=0;
	if(document.getElementById('opof').checked) {checked++};
	if(document.getElementById('okol').checked) {checked++};
	if(document.getElementById('opr').checked) {checked++};
	if(checked>1){
		alert("Выберите один отчет");
	}
	else{
		if (document.getElementById('opof').checked){
				let ocl = {
					class_ID:document.getElementById('clSel').value,
				};
			let responseocl = await fetch(port_find_students, {
				method: 'POST',
				headers: {
				Authorization: `Bearer ${localStorage.token}` ,
				'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(ocl)
				});
			let resultocl = await responseocl.json();
			let i = 0;
			while (i<resultocl.count){
				if(resultocl.rows[i].PFDO.length!=0){
					alert(resultocl.rows[i].name);
				}
				i++;
			}
		}
		if (document.getElementById('okol').checked){
				let ocl = {
					class_ID:document.getElementById('clSel').value,
				};
			let responseocl = await fetch(port_find_students, {
				method: 'POST',
				headers: {
				Authorization: `Bearer ${localStorage.token}` ,
				'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(ocl)
				});
			let resultocl = await responseocl.json();
			let i = 0;
			let j = 0;
			while (i<resultocl.count){
				if(resultocl.rows[i].PFDO.length!=0){
					j++;
				}
				i++;
			}
			alert(j);
		}
		if (document.getElementById('opr').checked){
			let ocl = {
					class_ID:document.getElementById('clSel').value,
				};
			let responseocl = await fetch(port_find_students, {
				method: 'POST',
				headers: {
				Authorization: `Bearer ${localStorage.token}` ,
				'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(ocl)
				});
			let resultocl = await responseocl.json();
			let i = 0;
			let j = 0;
			while (i<resultocl.count){
				if((resultocl.rows[i].PFDO.length!=0)&&(resultocl.rows[i].PFDO!="отсутствует")){
					j++;
				}
				i++;
			}
			alert(j/resultocl.count*100 + "%");
		}
	}
}

export default Page;