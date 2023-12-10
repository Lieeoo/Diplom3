import '../../../../ProjectCSS.css';
import ReactDOM from 'react-dom';
import '../../../../mavrCSS.css';
import * as XLSX from 'xlsx/xlsx.mjs';
//import { FileInput} from "@blueprintjs/core";

import {TopPanel,LeftPanelOfControlPage} from "../../NavigationPanels/NavigationPanels.jsx";
import {EventCreateClass,EventDelClass} from "../../../../See.js";

let test = "http://mavr.kemsu.ru:5500/api/user/whoami";
let linkk = "http://mavr.kemsu.ru:5500/api/student";
let port_reg_cl = "http://mavr.kemsu.ru:5500/API/class/";
let port_find_excel = "http://mavr.kemsu.ru:5500/api/class/addsomeclasses";

const element = <EventCreateClass />;
const element2 = <EventDelClass />;

let flag = false;
let flag2 = false;
var jsontext, jsonjson;

function Page() {
	window.onload = function() {
			document.getElementById('upr').className = "topbutton-page";
			document.getElementById('controlClasses').style.background = "#8ccba1";
			enterControlSystemClasses2();
		};
	return (
		<div>
				< TopPanel />
				<div className="mavr">
					<LeftPanelOfControlPage/>
					<div className="control-space">
						<div>
							<p className="text-main"> Создать класс:  
							<EventCreateClass />
							</p>
						</div>
						<div>
							<p className="text-main"> <hr/> Удалить класс: 
							<EventDelClass />
							</p>
						</div>
						<input type="file" onChange={readUploadFile}></input>
						<button className="profile-button"><img src="https://i.ibb.co/h2SfXRm/performed.png" className="profile-button2" onClick={function(){showFile(jsonjson);}}></img></button> 
					</div>
				</div>

		</div>
  );	
}

export async function showFile(input) {
	let response = await fetch(port_find_excel, {
	method: 'POST',
	headers: {
	Authorization: `Bearer ${localStorage.token}`,
	'Content-Type': 'application/json;charset=utf-8'
	},
	body: JSON.stringify(input)
	}); 
}
const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);
			jsonjson = {exelmassive :json};
        };
        reader.readAsArrayBuffer(e.target.files[0]);
    }
}
//Создание нового класса
export async function enterControlSystemClasses() {
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
export async function enterControlSystemClasses2() {
	let response = await fetch(port_reg_cl, {
		method: 'GET',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		});
	let result = await response.json();
	let i=0;
	while(i<result.length){
		let result2 = result[i].number +  " " + result[i].letter;
		let p = document.createElement('option')
		p.value=result[i].id;
		let txt = document.createTextNode(result2)
		p.appendChild(txt);
		document.getElementById('deleteClassSelect').appendChild(p);
		i++;
	}
}
//Удаление класса
export async function enterControlSystemClassesDelete() {
	let class2 = {
			id:document.getElementById("deleteClassSelect").value
		};
	let response = await fetch(port_reg_cl, {
		method: 'DELETE',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(class2),
		});
	let result = await response.json();
}

export default Page;