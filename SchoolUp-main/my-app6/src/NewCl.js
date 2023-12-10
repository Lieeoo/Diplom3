import './ProjectCSS.css';

import {TopPanel} from "./components/ui/NavigationPanels/NavigationPanels.jsx";

let port_reg_cl = "http://mavr.kemsu.ru:5500/API/class/";

function Page() {
	return (
		<div className="pages">
				< TopPanel />
				<div className="Test">
					<div className="Blockk">
						<div className="ListSt">
							<p>Создание пользователя</p>
							<div className="TextStyleNVR">
							<p>Буква класса:<input id="le" type="text"></input></p>
							<p>Номер класса:<input id="nu" type="text"></input></p>
							<p>Создан:<input id="bi" type="date"></input></p>
							<button className="TBVRed" onClick={function(){enternewcl2();}}> Вывести все </button> 
							<button className="TBVRed" onClick={function(){enternewcl();}}> Сохранить </button> 
							</div>
						</div>
					</div>
				</div>

		</div>
  );	
}

export async function enternewcl() {
	
	let class2 = {
			letter:document.getElementById("le").value,
			number:document.getElementById("nu").value,
			birthday:document.getElementById("bi").value,
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

export async function enternewcl2() {
	let class2 = {
			letter:"а",
			number:1,
			birthday:"0001-01-01",
		};
	let response = await fetch(port_reg_cl, {
		method: 'GET',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		});
	let result = await response.json();
	let result2 = JSON.stringify(result);
	alert(result2);
}

export default Page;