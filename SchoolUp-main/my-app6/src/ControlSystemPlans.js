import './ProjectCSS.css';
import ReactDOM from 'react-dom';
import './mavrCSS.css';

import {TopPanel,LeftPanelUS} from "./Panels.js";
import {CrPlan} from "./See.js";

let test = "http://mavr.kemsu.ru:5500/api/user/whoami";
let linkk = "http://mavr.kemsu.ru:5500/api/student";
let port_reg_pl = "http://mavr.kemsu.ru:5500/api/plan/";

function Page() {
	window.onload = function() {
			document.getElementById('upr').className = "topbutton-page";
			document.getElementById('controlPlans').style.background = "#8ccba1";
		};
	return (
		<div>
				< TopPanel />
				<div className="mavr">
					<LeftPanelUS/>
					<div className="control-space">
							<div>
								<p className="text-main"> Работа с планом воспитательной работы:
									<CrPlan />
								</p>
							</div>
					</div>
				</div>

		</div>
  );	
}

//Создание общего плана
export async function enterControlSystemPlans() {
	let crpl = {
		year_of_plan:document.getElementById("createYearPlanInputYear").value,
		goals_of_educational_activity:document.getElementById("createYearPlanInputGoalsOfEducationalWork").value,
		target_priorities_1to4:document.getElementById("createYearPlanInputTargetPriorities14").value,
		tasks_1to4:document.getElementById("createYearPlanInputTasks14").value,
		target_priorities_5to9:document.getElementById("createYearPlanInputTargetPriorities59").value,
		tasks_5to9:document.getElementById("createYearPlanInputTasks59").value,
		target_priorities_10to11:document.getElementById("createYearPlanInputTargetPriorities1011").value,
		tasks_10to11:document.getElementById("createYearPlanInputTasks1011").value
		};
	let responsecrpl = await fetch(port_reg_pl, {
		method: 'POST',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(crpl),
		});
	let resultcrpl = await responsecrpl.json();
}

export default Page;