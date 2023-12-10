import './mavrCSS.css';

import icon from "./images/icon.png"

//let ss = "http://mavr.kemsu.ru/";
let ss= "http://localhost:3000"

export function TopPanel() {
	return(
		<div className="top-panel">
				<img src={icon} className="top-icon" alt /> 
				<a href="classroom"> 
					<button id="clruk" className="topbutton" > Классное руководство </button> 
				</a>
				<a href="educational_work"> 
					<button id="vrab" className="topbutton"> Воспитательная работа </button> 
				</a> 
				<a href="report_manager_employment"> 
					<button id="mo" className="topbutton"> Менеджер отчётов </button> 
				</a>
				{localStorage.getItem("userRole")=="ADMIN" && <div>
					<a href="control_users"> 
						<button id="upr" className="topbutton"> Управление системой </button> 
					</a>
				</div>}
				
				<a href="profile"> 
					<button id="prped" className="topbutton"> Профиль педагога </button> 
				</a>
				<a href={ss}> 
					<button className="topbutton" onClick={function(){al();}}> Выход из системы </button> 
				</a>
		</div>
	);

}


export function LeftPanelVR() {
	return(
		<div className="bookmarks">
			<a href="educational_work"><button id="vr" className="leftPanel">Воспитательные события</button></a> 
			<a href="goals_of_educational_work"><button id="cvr" className="leftPanel">Цели воспитательной работы</button></a>
			<a href="educational_work_archive"><button id="as" className="leftPanel">Архив событий</button></a>
		</div>
	);

}

export function LeftPanelO() {
	return(
		<div className="bookmarks">
			<a href="report_manager_employment"><button id="o" className="leftPanel">Занятость учащихся</button></a> 
			<a href="report_manager_classes"><button id="o2" className="leftPanel">Работа с классами</button></a>
		</div>
	);

}

export function LeftPanelUS() {
	return(
		<div className="bookmarks">
			<a href="control_users"><button id="controlUsers" className="leftPanel">Пользователи</button></a> 
			<a href="control_classes"><button id="controlClasses" className="leftPanel">Классы</button></a>
			<a href="control_events"><button id="controlEvents" className="leftPanel">Воспитательные события</button></a>
			<a href="control_additional_education"><button id="controlAdditionalEducatuion" className="leftPanel">Дополнительное образование</button></a>
			<a href="control_plans"><button id="controlPlans" className="leftPanel">Планы воспитательной работы</button></a>
		</div>
	);

}

async function al() {
	localStorage.clear();
}