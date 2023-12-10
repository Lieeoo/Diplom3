import '../../../../ProjectCSS.css';
import '../../../../mavrCSS.css';

import {TopPanel, LeftPanelOfEducationalWork} from "../../NavigationPanels/NavigationPanels.jsx";

let port_reg_pl = "http://mavr.kemsu.ru:5500/api/plan/";

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
					<LeftPanelOfEducationalWork />
				</div>
					<div className="ewg_workspace">
						<table height="100%" border="1">
						  <tr>
						  <td width="200px">Цель воспитательной деятельности школы:</td>
						  <td width="200px"></td>
						  <td width="700px" id="cpvrch"></td>
						  </tr>
						  <tr>
						  <td>Целевые приоритеты:</td>
						  <td>Для учащихся с 1 по 4 кл:</td>
						  <td id="cpr14">
						</td>
						  </tr>
						  <tr>
						  <td></td>
						  <td>Для учащихся с 5 по 9 класс</td>
						  <td id="cpr59">
						</td>
						  </tr>
						  <tr>
						  <td></td>
						  <td>Учащиеся с 10 по 11 класс</td>
						  <td id="cpr1011">
						</td>
						  </tr>
						  <tr>
						  <td>Задачи воспитательной деятельности:</td>
						  <td>Для всех классов (с 1 по 11 кл)</td>
						  <td id="zvr">
						</td>
						  </tr>
						</table>
					</div>
				</div>

		</div>
  );	
}

export async function entercvr() {
	let responsepl = await fetch(port_reg_pl, {
		method: 'GET',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		});
	let resultpl = await responsepl.json();
	document.getElementById('cpvrch').innerHTML = resultpl.rows[0].goals_of_educational_activity;
	document.getElementById('cpr14').innerHTML = resultpl.rows[0].target_priorities_1to4;
	document.getElementById('cpr59').innerHTML = resultpl.rows[0].target_priorities_5to9;
	document.getElementById('cpr1011').innerHTML = resultpl.rows[0].target_priorities_10to11;
	document.getElementById('zvr').innerHTML = resultpl.rows[0].tasks;
}

export default Page;