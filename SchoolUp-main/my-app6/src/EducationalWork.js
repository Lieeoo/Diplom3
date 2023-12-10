import './ProjectCSS.css';
import ReactDOM from 'react-dom';
import './mavrCSS.css';

import {TopPanel, LeftPanelVR} from "./Panels.js";
import {EvProf,EventsForClassSelect} from "./See.js";

let port_show_vr = "http://mavr.kemsu.ru:5500/api/event/";
let port_reg_napksob2 = "http://mavr.kemsu.ru:5500/api/event/napravlenie_give";
let port_delete_ev = "http://mavr.kemsu.ru:5500/api/event/";
let port_see_u = "http://mavr.kemsu.ru:5500/api/event/stud_set";
let port_show_rl = "http://mavr.kemsu.ru:5500/API/user/role";
let port_reg_cl = "http://mavr.kemsu.ru:5500/API/class/";
let port_ev_cl = "http://mavr.kemsu.ru:5500/API/class/getEvents";

const element = <EvProf />;
const eventsforclasses = <EventsForClassSelect />;
var flags=new Array();
let roleofuser;
let thisclass;


function Page() {
	window.onload = function() {
			document.getElementById('vrab').className = "topbutton-page";
			document.getElementById('vr').style.background = "#8ccba1";
			entervr2();
			//entervr3(4);
		};
	return (
		<div>
			< TopPanel />
			<div className="mavr">
					<div id="LeftPanelVR">
						<LeftPanelVR/>
					</div>
					<div className="ew_workspace">
						<div className="ListSt">
							<a href="new_event"><button className="profile-button"><img src="https://i.ibb.co/Tbth16X/add.png" className="profile-button2"></img></button></a>
							<p className="profileName">Список событий</p>
							<div id="SetClassesEvents"></div>
							<div id="Events" className="TextStyleN">
							</div>

						</div>
						<div className="FlRight">
							<div className="Fl">
								<div className="ew_text_search">Фильтры:</div>
								<div className="ew_text"><div>Форма воспитательной работы:&nbsp;</div><select  className="student-input" type="text">
									<option selected disabled></option>
									<option>классный час</option>
									<option>тематическая беседа</option>
								</select></div>
								<div className="ew_text"><div>Кто проводит:&nbsp;</div><input type="text"  className="student-input"></input></div>
								<div className="ew_text"><div>Направление:&nbsp;</div><select  className="student-input" type="text">
									<option selected disabled></option>
									<option>познавательное</option>
									<option>трудовое</option>
									<option>экологическое</option>
								</select></div>
								<div className="ew_text"><div>Сетевое взаимодействие:&nbsp;</div><input  className="student-input" type="text"></input></div>
								<div className="ew_text"><div>Проект:&nbsp;</div><input className="student-input" type="text"></input></div>
								<div className="ew_text"><div>Организация:&nbsp;</div><input className="student-input" type="text"></input></div>
								<div className="FlRight"><button className="profile-button"><img src="https://i.ibb.co/jbvfRzm/search.png" className="profile-button2"></img></button></div>
							</div>
						</div>
					</div>
				</div>

		</div>
  );	
}
//Вывод данных в профиль события
export async function entervr(a, count, napr) {
	let p;
	let txt
	switch(flags[a.id]) {
		case false:
		let i=1;
		while(i<count){
			ReactDOM.render(null, document.getElementById(a.id+"SetSP"));
			flags[i]=false;	
			i++;
		}
		ReactDOM.render(element, document.getElementById(a.id+"SetSP"));
		document.getElementById('profileEventDateOfEvent').innerHTML = a.date_of_nach_event;
		//Вывод всех направлений воспитательного события
		let j=0;
		while(j<napr.length-1)
		{
			p = document.createElement('div')
			txt = document.createTextNode(napr[j].name);
			p.className = "float";
			p.appendChild(txt);
			document.getElementById('profileEventDirection').appendChild(p);
			p = document.createElement('div')
			txt = document.createTextNode(","+'\u00A0');
			p.appendChild(txt);
			document.getElementById('profileEventDirection').appendChild(p);
			j++;
		}
		p = document.createElement('div')
		txt = document.createTextNode(napr[j].name);
		p.appendChild(txt);
		document.getElementById('profileEventDirection').appendChild(p);
		document.getElementById('profileEventFormOfEducationalActivity').innerHTML = a.form_vosp_rab;
		document.getElementById('profileEventWhoProvide').innerHTML = a.who;
		let uviz = {
		id:a.id,
		};
		let responseuviz = await fetch(port_see_u, {
		method: 'POST',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(uviz)
		});
		let resultuviz = await responseuviz.json();
		//Вывод всех учеников-участников воспитательного события
		i=0;
		while(i<resultuviz.length-1){
			p = document.createElement('div')
			txt = document.createTextNode(resultuviz[i].fullname);
			p.appendChild(txt);
			document.getElementById('profileEventStudents').appendChild(p);
			p = document.createElement('div')
			txt = document.createTextNode(","+'\u00A0');
			p.appendChild(txt);
			document.getElementById('profileEventStudents').appendChild(p);
			i++;
		}
		if(resultuviz.length!=0){
			p = document.createElement('div')
			txt = document.createTextNode(resultuviz[i].fullname);
			p.appendChild(txt);
		}
		document.getElementById('profileEventStudents').appendChild(p);
		document.getElementById('profileEventNetworkConnection').innerHTML = a.network_interaction;
		document.getElementById('profileEventProject').innerHTML = a.project;
		document.getElementById('profileEventInvitedOrganizations').innerHTML = a.invited_organizations;
		document.getElementById('profileEventInvitedParents').innerHTML = a.invited_parents;
		document.getElementById('profileEventSertificate').innerHTML = a.sertificate;
		flags[a.id]=true;
		break;
		case true:
		ReactDOM.render(null, document.getElementById(a.id+"SetSP"));
		flags[a.id]=false;
		break;
	}
}
//Вывод всех событий
export async function entervr2() {
	let napksob2;
	let responsenapksob2;
	let resultnaprsob2;
	let showevents;
	let responseshowevents;
	let resultshowevents;
	let i;
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
		let responsevr = await fetch(port_show_vr, {
		method: 'GET',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		});
		let resultvr = await responsevr.json();
		i=0;
		while(i<resultvr.length){
			napksob2 = {
			id:resultvr[i].id,
			};
			responsenapksob2 = await fetch(port_reg_napksob2, {
			method: 'POST',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(napksob2)
			});
			resultnaprsob2 = await responsenapksob2.json();
			let p = document.createElement('div')
			p.className = 'ew_text_title';
			p.id=resultvr[i].id+"event";
			document.getElementById('Events').appendChild(p);
			p = document.createElement('div')
			p.className = 'ew_text';
			p.id=resultvr[i].id+"osn";
			let j=parseInt(resultvr[i].id);
			let i2 =parseInt(i);
			flags[j]=false;
			p.onclick = function() {entervr(resultvr[i2],resultvr.length,resultnaprsob2);};
			document.getElementById(resultvr[i].id+"event").appendChild(p);
			p = document.createElement('p')
			p.id=resultvr[i].id+"osn2";
			document.getElementById(resultvr[i].id+"osn").appendChild(p);
			p = document.createElement('div')
			p.id=resultvr[i].id+"navr";
			let txt = document.createTextNode(resultvr[i].event_name);
			p.appendChild(txt);
			document.getElementById(resultvr[i].id+"osn2").appendChild(p);
			p = document.createElement('div')
			p.id=resultvr[i].id+"flex";
			p.className="displayFlex";
			document.getElementById(resultvr[i].id+"osn").appendChild(p);
			p = document.createElement('div')
			p.id=resultvr[i].id+"danavr";
			txt = document.createTextNode(resultvr[i].date_of_nach_event);
			//txt = document.createTextNode(resultvr[i].id);
			p.appendChild(txt);
			document.getElementById(resultvr[i].id+"flex").appendChild(p);
			p = document.createElement('div')
			txt = document.createTextNode(","+'\u00A0');
			p.appendChild(txt);
			document.getElementById(resultvr[i].id+"flex").appendChild(p);
			p = document.createElement('div')
			p.id=resultvr[i].id+"fovr";
			txt = document.createTextNode(resultvr[i].form_vosp_rab);
			p.appendChild(txt);
			document.getElementById(resultvr[i].id+"flex").appendChild(p);
			p = document.createElement('div')
			txt = document.createTextNode(","+'\u00A0');
			p.appendChild(txt);
			document.getElementById(resultvr[i].id+"flex").appendChild(p);
			p = document.createElement('div')
			p.id=resultvr[i].id+"napvr";
			//Вывод всех направлений воспитательного события
			let h=0;
			while(h<resultnaprsob2.length-1){
				txt = document.createTextNode(resultnaprsob2[h].name + ","+'\u00A0');
				p.appendChild(txt);
				h++;
			}
			txt = document.createTextNode(resultnaprsob2[h].name);
			p.appendChild(txt);
			document.getElementById(resultvr[i].id+"flex").appendChild(p);
			p = document.createElement('div')
			p.id=resultvr[i].id+"SetSP";
			document.getElementById(resultvr[i].id+"event").appendChild(p);
			i++;
		}
		break;
		case "USER":
		let response = await fetch(port_reg_cl, {
			method: 'GET',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			});
		let result = await response.json();
		if(result.length==1){
			thisclass=result[0].id;
			showevents = {
			id:result[0].id,
			};
			responseshowevents = await fetch(port_ev_cl, {
			method: 'POST',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(showevents)
			});
			resultshowevents = await responseshowevents.json();
			i=0;
			while(i<resultshowevents.length){
				napksob2 = {
				id:resultshowevents[i].id,
				};
				responsenapksob2 = await fetch(port_reg_napksob2, {
				method: 'POST',
				headers: {
				Authorization: `Bearer ${localStorage.token}` ,
				'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(napksob2)
				});
				resultnaprsob2 = await responsenapksob2.json();
				let p = document.createElement('div')
				p.className = 'ew_text_title';
				p.id=resultshowevents[i].id+"event";
				document.getElementById('Events').appendChild(p);
				p = document.createElement('div')
				p.className = 'ew_text';
				p.id=resultshowevents[i].id+"osn";
				let j=parseInt(resultshowevents[i].id);
				let i2 =parseInt(i);
				flags[j]=false;
				p.onclick = function() {entervr(resultshowevents[i2],resultshowevents.length,resultnaprsob2);};
				document.getElementById(resultshowevents[i].id+"event").appendChild(p);
				p = document.createElement('p')
				p.id=resultshowevents[i].id+"osn2";
				document.getElementById(resultshowevents[i].id+"osn").appendChild(p);
				p = document.createElement('div')
				p.id=resultshowevents[i].id+"navr";
				let txt = document.createTextNode(resultshowevents[i].event_name);
				p.appendChild(txt);
				document.getElementById(resultshowevents[i].id+"osn2").appendChild(p);
				p = document.createElement('div')
				p.id=resultshowevents[i].id+"flex";
				p.className="displayFlex";
				document.getElementById(resultshowevents[i].id+"osn").appendChild(p);
				p = document.createElement('div')
				p.id=resultshowevents[i].id+"danavr";
				txt = document.createTextNode(resultshowevents[i].date_of_nach_event);
				//txt = document.createTextNode(resultshowevents[i].id);
				p.appendChild(txt);
				document.getElementById(resultshowevents[i].id+"flex").appendChild(p);
				p = document.createElement('div')
				txt = document.createTextNode(","+'\u00A0');
				p.appendChild(txt);
				document.getElementById(resultshowevents[i].id+"flex").appendChild(p);
				p = document.createElement('div')
				p.id=resultshowevents[i].id+"fovr";
				txt = document.createTextNode(resultshowevents[i].form_vosp_rab);
				p.appendChild(txt);
				document.getElementById(resultshowevents[i].id+"flex").appendChild(p);
				p = document.createElement('div')
				txt = document.createTextNode(","+'\u00A0');
				p.appendChild(txt);
				document.getElementById(resultshowevents[i].id+"flex").appendChild(p);
				p = document.createElement('div')
				p.id=resultshowevents[i].id+"napvr";
				//Вывод всех направлений воспитательного события
				let h=0;
				while(h<resultnaprsob2.length-1){
					txt = document.createTextNode(resultnaprsob2[h].name + ","+'\u00A0');
					p.appendChild(txt);
					h++;
				}
				txt = document.createTextNode(resultnaprsob2[h].name);
				p.appendChild(txt);
				document.getElementById(resultshowevents[i].id+"flex").appendChild(p);
				p = document.createElement('div')
				p.id=resultshowevents[i].id+"SetSP";
				document.getElementById(resultshowevents[i].id+"event").appendChild(p);
				i++;
			}
		}
		else{
			ReactDOM.render(eventsforclasses, document.getElementById('SetClassesEvents'));
			let i=0;
			while(i<result.length){
				let result2 = result[i].number +  " " + result[i].letter;
				let p = document.createElement('option')
				p.value=result[i].id;
				let txt = document.createTextNode(result2)
				p.appendChild(txt);
				document.getElementById('EventClasses').appendChild(p);
				i++;
			}
			document.getElementById('EventClasses').onchange = e => {entervrChangeClass(e.target.value)};
		}
		break;
	}
}
//Удаление воспитательного события
export async function entervr3(a) {
	let evdel = {
	id:a,
	};
	let responseevdel = await fetch(port_delete_ev, {
	method: 'DELETE',
	headers: {
	Authorization: `Bearer ${localStorage.token}` ,
	'Content-Type': 'application/json;charset=utf-8'
	},
	body: JSON.stringify(evdel)
	});
	let resultevdel = await responseevdel.json();
}
//Вывод событий класса из select
export async function entervrChangeClass(a) {
	ReactDOM.render(null, document.getElementById('Events'));
	thisclass=a;
	let showevents = {
	id:a,
	};
	let responseshowevents = await fetch(port_ev_cl, {
	method: 'POST',
	headers: {
	Authorization: `Bearer ${localStorage.token}` ,
	'Content-Type': 'application/json;charset=utf-8'
	},
	body: JSON.stringify(showevents)
	});
	let resultshowevents = await responseshowevents.json();
	let i=0;
	while(i<resultshowevents.length){
		let napksob2 = {
		id:resultshowevents[i].id,
		};
		let responsenapksob2 = await fetch(port_reg_napksob2, {
		method: 'POST',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(napksob2)
		});
		let resultnaprsob2 = await responsenapksob2.json();
		let p = document.createElement('div')
		p.className = 'ew_text_title';
		p.id=resultshowevents[i].id+"event";
		document.getElementById('Events').appendChild(p);
		p = document.createElement('div')
		p.className = 'ew_text';
		p.id=resultshowevents[i].id+"osn";
		let j=parseInt(resultshowevents[i].id);
		let i2 =parseInt(i);
		flags[j]=false;
		p.onclick = function() {entervr(resultshowevents[i2],resultshowevents.length,resultnaprsob2);};
		document.getElementById(resultshowevents[i].id+"event").appendChild(p);
		p = document.createElement('p')
		p.id=resultshowevents[i].id+"osn2";
		document.getElementById(resultshowevents[i].id+"osn").appendChild(p);
		p = document.createElement('div')
		p.id=resultshowevents[i].id+"navr";
		let txt = document.createTextNode(resultshowevents[i].event_name);
		p.appendChild(txt);
		document.getElementById(resultshowevents[i].id+"osn2").appendChild(p);
		p = document.createElement('div')
		p.id=resultshowevents[i].id+"flex";
		p.className="displayFlex";
		document.getElementById(resultshowevents[i].id+"osn").appendChild(p);
		p = document.createElement('div')
		p.id=resultshowevents[i].id+"danavr";
		txt = document.createTextNode(resultshowevents[i].date_of_nach_event);
		//txt = document.createTextNode(resultshowevents[i].id);
		p.appendChild(txt);
		document.getElementById(resultshowevents[i].id+"flex").appendChild(p);
		p = document.createElement('div')
		txt = document.createTextNode(","+'\u00A0');
		p.appendChild(txt);
		document.getElementById(resultshowevents[i].id+"flex").appendChild(p);
		p = document.createElement('div')
		p.id=resultshowevents[i].id+"fovr";
		txt = document.createTextNode(resultshowevents[i].form_vosp_rab);
		p.appendChild(txt);
		document.getElementById(resultshowevents[i].id+"flex").appendChild(p);
		p = document.createElement('div')
		txt = document.createTextNode(","+'\u00A0');
		p.appendChild(txt);
		document.getElementById(resultshowevents[i].id+"flex").appendChild(p);
		p = document.createElement('div')
		p.id=resultshowevents[i].id+"napvr";
		//Вывод всех направлений воспитательного события
		let h=0;
		while(h<resultnaprsob2.length-1){
			txt = document.createTextNode(resultnaprsob2[h].name + ","+'\u00A0');
			p.appendChild(txt);
			h++;
		}
		txt = document.createTextNode(resultnaprsob2[h].name);
		p.appendChild(txt);
		document.getElementById(resultshowevents[i].id+"flex").appendChild(p);
		p = document.createElement('div')
		p.id=resultshowevents[i].id+"SetSP";
		document.getElementById(resultshowevents[i].id+"event").appendChild(p);
		i++;
	}
}

export default Page;