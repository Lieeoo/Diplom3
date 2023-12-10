import './ProjectCSS.css';
import './mavrCSS.css';
import ReactDOM from 'react-dom';

import {TopPanel, LeftPanelO} from "./Panels.js";
import {OClNORM2} from "./See.js";

let port_reg_cl = "http://mavr.kemsu.ru:5500/API/class/";
let port_find_students = "http://mavr.kemsu.ru:5500/API/student/:id";
let port_show_family = "http://mavr.kemsu.ru:5500/API/family/";

let flag = false;

function Page() {
	window.onload = function() {
			document.getElementById('mo').className = "topbutton-page";
			document.getElementById('o').className = "mark-page";
			enter();
		};
	return (
		<div>
			< TopPanel />
			<div className="mavr">
					<LeftPanelO/>
					<div className="workspace">
						<div className="report-space">
							<div>
								<div className="text-info"> 
									<p className="text-main">
										Составить отчеты: 
										</p>
								</div>
								<div className="text-info">
									<p className="text-main"> 
										Класс:
										<select id="clSel" className="student-input"> </select>
									</p>
								</div>
								<OClNORM2 />
								<div>
									<button id="oClb" className="profile-button"><img src="https://i.ibb.co/tDWy41D/create-document.png" className="profile-button2"></img></button> 
								</div>
							</div>
						</div>
					</div>
				</div>

		</div>
  );	
}

//Заполнение списка классов
async function enter() {
	let responsegetclassesofuser = await fetch(port_reg_cl, {
		method: 'GET',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		});
	let resultgetclassesofuser = await responsegetclassesofuser.json();
	let i=0;
	while(i<resultgetclassesofuser.length){
		let result2 = resultgetclassesofuser[i].number + resultgetclassesofuser[i].letter;
		let p = document.createElement('option')
		p.value=resultgetclassesofuser[i].id;
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
			while (i<resultocl.length){
				if(resultocl[i].PFDO.length!=0){
					alert(resultocl[i].name);
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
			while (i<resultocl.length){
				if(resultocl[i].PFDO.length!=0){
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
			while (i<resultocl.length){
				if((resultocl[i].PFDO.length!=0)&&(resultocl[i].PFDO!="отсутствует")){
					j++;
				}
				i++;
			}
			alert(j/resultocl.length*100 + "%");
		}
	}
}
export default Page;