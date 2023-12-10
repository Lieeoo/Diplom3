import './mavrCSS.css';

import React, { useState, useEffect } from 'react';

import {TopPanel} from "./Panels.js";
import set from "./icons/settings.png";

let ss = "";
//let ss = "http://mavr.kemsu.ru/";

let test = "http://mavr.kemsu.ru:5500/API/brand";
let goaway = "http://localhost:3000/";

let port_see_profile = "http://mavr.kemsu.ru:5500/api/user/whoamiredact";
let port_reg_cl = "http://mavr.kemsu.ru:5500/API/class/";
let get_user_role = "http://mavr.kemsu.ru:5500/API/user/role";

function Page() {
		
		window.onload = function() {
			document.getElementById('prped').className = "topbutton-page";
			enterprof();
		};
		
		
	return (
		<div>
			< TopPanel />
			<div className="mavr">
				<div className="workspace">
					<div className="profile-space">
						<div className="profileName">
							<a><h1 id="user_name"> имя пользователя </h1></a>
						</div>
						<div className="profile-info">
							<div className="infobar"> 
								<p> Связанные классы: </p>
								<p id="clprofile" className="clprofile3"> </p>
							</div>
							<div className="infobar">
								<p> Роль в системе: </p>
								<p id="my_user_role" className="text-info"> должность педагога </p>
							</div>
						</div>
						
						<button className="profile-button"><img src="https://i.ibb.co/7WvypCK/settings.png" className="profile-button2" onClick={function(){enter();}}></img></button> 
						<a href="http://mavr.kemsu.ru/"> 
						</a>
					</div>
				</div>
			</div>				
		</div>
  );	
}

async function enter() {
	window.location.assign(ss+'profile_edit');
}

async function enterprof() {
	let p;
	let txt;
	
	// получение роли
	let responseroleuser = await fetch (get_user_role,{
		method: 'GET',
		headers: {
			Authorization: `Bearer ${localStorage.token}`,
			'Content-Type': 'application/json;charset=utf-8'
		}
	});
	let resultroleuser = await responseroleuser.json();
	localStorage.setItem("userRole", resultroleuser.role);
	
	//Вывод информации о пользователе
	let showfrofile = {
	};
	let responseshowfrofile = await fetch(port_see_profile, {
	method: 'POST',
	headers: {
	Authorization: `Bearer ${localStorage.token}` ,
	'Content-Type': 'application/json;charset=utf-8'
	},
	body: JSON.stringify(showfrofile)
	});
	let resultshowfrofile = await responseshowfrofile.json();
	document.getElementById('user_name').innerHTML = resultshowfrofile.lname + '\u00A0' + resultshowfrofile.name + '\u00A0' + resultshowfrofile.mname;
	document.getElementById('my_user_role').innerHTML = resultshowfrofile.comm;
	
	//Вывод привязанных классов
	let response = await fetch(port_reg_cl, {
		method: 'GET',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		});
	let result = await response.json();
	let i=0;
	while(i<result.length-1){
		p = document.createElement('div')
		txt = document.createTextNode(result[i].number + result[i].letter + "," + '\u00A0');
		p.appendChild(txt);
		document.getElementById('clprofile').appendChild(p);
		i++;
	}
	p = document.createElement('div')
	txt = document.createTextNode(result[i].number + result[i].letter);
	p.appendChild(txt);
	document.getElementById('clprofile').appendChild(p);
}


export default Page;