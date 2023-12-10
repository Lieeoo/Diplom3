
import '../../../../mavrCSS.css';
import ReactDOM from 'react-dom';

import {TopPanel, LeftPanelOfReportManager} from "../../NavigationPanels/NavigationPanels.jsx";
import {OCl2, OCl3, OCl4, OCl5, OCl6, OCl7, OCl8, OCl9, OClNORM} from "../../../../See.js";

let port_reg_cl = "http://mavr.kemsu.ru:5500/API/class/";
let port_find_students = "http://mavr.kemsu.ru:5500/API/student/:id";


function Page() {
	window.onload = function() {
			document.getElementById('mo').className = "topbutton-page";
			document.getElementById('o2').className = "mark-page";
			enterocl();
		};
	return (
		<div>
				< TopPanel />
				<div className="mavr">
					<LeftPanelOfReportManager/>
					<div className="workspace">
						<div>
							<div className="report-space">
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
								<OClNORM/>
								<div>
									<button className="profile-button"><img src="https://i.ibb.co/tDWy41D/create-document.png" className="profile-button2"></img></button> 
								</div>
							</div>
						</div>
					</div>
				</div>

		</div>
  );	
}

async function enterocl() {
	let responseo = await fetch(port_reg_cl, {
		method: 'GET',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		});
	let resulto = await responseo.json();
	let i=0;
	while(i<resulto.length){
		let result2 = resulto[i].number + resulto[i].letter;
		let p = document.createElement('option')
		p.value=resulto[i].id;
		let txt = document.createTextNode(result2)
		p.appendChild(txt);
		document.getElementById('clSel').appendChild(p);
		i++;
	}
	document.getElementById('orClb').onclick = function() {enterocl2();};
	
}

async function enterocl2() {
	if(document.getElementById('opof').checked&&document.getElementById('okol').checked){
		alert("Выберите один отчет");
	}
	else{
		if (document.getElementById('opof').checked){
				let ocl = {
					class_ID:document.getElementById('oCl').value,
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
				alert(resultocl.rows[i].name);
				i++;
			}
		}
		if (document.getElementById('okol').checked){
				let ocl = {
					class_ID:document.getElementById('oCl').value,
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
			alert(resultocl.count);
		}
	}
}

export default Page;