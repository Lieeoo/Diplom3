import '../../../mavrCSS.css';

import icon from "../../../images/icon.png"
import {mavr_context} from "../globalContext";

export function TopPanelUniversity() {
	return(
		<div className="top-panel-university">
				<img src={icon} className="top-icon" alt /> 
				<a href="university">
					<button id="university_studs" className="topbuttonUniversity" > Студенты </button> 
				</a>
				<a href="extracurricular_work"> 
					<button id="extracurricularWork" className="topbuttonUniversity"> Внеучебная работа </button> 
				</a> 
				<a href="material_aid"> 
					<button id="materialAid" className="topbuttonUniversity"> Материальная помощь </button> 
				</a>
				<a href="accommodation_dormitories"> 
					<button id="accommodationDormitories" className="topbuttonUniversity"> Расселение в общежития </button> 
				</a>
				<a href="report_manager_employment"> 
					<button id="reportManagerEmploymentUniversity" className="topbuttonUniversity"> Менеджер отчётов </button> 
				</a>
				{localStorage.getItem("userRole")=="ADMIN" && <div>
					<a href="control_users_university"> 
						<button id="controlUsersUniversity" className="topbuttonUniversity"> Управление системой </button> 
					</a>
				</div>}
				
				<a href="profile">
					<button id="prped" className="topbuttonUniversity"> Профиль </button> 
				</a>
				<a>
					<button className="topbuttonUniversity" onClick={function(){ClearLocal();}}> Выход из системы </button>
				</a>
		</div>
	);

}

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
				<a>
					<button className="topbutton" onClick={function(){ClearLocal();}}> Выход из системы </button>
				</a>
		</div>
	);

}

export function FakeTopPanel() {
	return(
		<div className="top-panel">
			<img src={icon} className="top-icon" alt />
			<a>
				<button className="topbutton" > Классное руководство </button>
			</a>
			<a>
				<button className="topbutton"> Воспитательная работа </button>
			</a>
			<a>
				<button className="topbutton"> Менеджер отчётов </button>
			</a>

			{localStorage.getItem("userRole")=="ADMIN" && <div>
				<a>
					<button className="topbutton"> Управление системой </button>
				</a>
			</div>}
			<a>
				<button className="topbutton"> Профиль педагога </button>
			</a>
			<a>
				<button className="topbutton"> Выход из системы </button>
			</a>
		</div>
	);

}


export function LeftPanelOfEducationalWork() {
	return(
		<div className="bookmarks">
			<a href="educational_work"><button id="vr" className="leftPanel">Воспитательные события</button></a> 
			<a href="goals_of_educational_work"><button id="cvr" className="leftPanel">Цели воспитательной работы</button></a>
			<a href="educational_work_archive"><button id="as" className="leftPanel">Архив событий</button></a>
		</div>
	);

}

export function LeftPanelOfReportManager() {
	return(
		<div className="bookmarks">
			<a href="report_manager_employment"><button id="o" className="leftPanel">Занятость учащихся</button></a> 
			<a href="report_manager_classes"><button id="o2" className="leftPanel">Работа с классами</button></a>
		</div>
	);

}

export function LeftPanelOfControlPage() {
	return(
		<div className="bookmarks">
			<a href="control_users"><button id="controlUsers" className="leftPanel">Пользователи</button></a> 
			<a href="control_classes"><button id="controlClasses" className="leftPanel">Классы</button></a>
			<a href="control_events"><button id="controlEvents" className="leftPanel">Воспитательные события</button></a>
			<a href="control_plans"><button id="controlPlans" className="leftPanel">Планы воспитательной работы</button></a>
		</div>
	);

}

async function ClearLocal() {
	localStorage.clear();
	window.location.assign(mavr_context.mavr_local);
}