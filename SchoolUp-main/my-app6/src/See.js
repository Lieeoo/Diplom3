import './ProjectCSS.css';
import logo from './images/icon.png';

import {enter6, enter9, fastat, obrurma, zanma, obrurfa, zanfa, obrurop, zanop} from "./components/ui/ClassroomLayouts/ClassroomCreateStudent/ClassroomCreateStudent.jsx";
import {enter10} from "./components/routes/ClassroomPage/ClassroomPage.jsx";
import {entervr} from "./components/routes/EducationWorkPage/EducationalWork.jsx";
import {enterControlSystemUsers, enterControlSystemUsersClassToUser, enterControlSystemUsersCreateUser, enternewcl, enternewcl2, enterus2, enterus3} from "./components/routes/ControlPage/ControlPage.jsx";
import {enterControlSystemClassesDelete, enterControlSystemClasses} from "./components/ui/ControlSystemLayouts/ControlSystemClasses/ControlSystemClasses.jsx";
import {enterControlSystemEvents,enterControlSystemEventsShowDirections, directionDelete,enterControlSystemEventsDeleteDirections,enterControlSystemEventsDeleteOrganizations,enterControlSystemEventsThisDirection,enterControlSystemEventsDeleteDirectionFromSelect,enterControlSystemEventsCreateProgram,programDelete,enterControlSystemEventsDeletePrograms} from "./components/ui/ControlSystemLayouts/ControlSystemEvents/ControlSystemEvents.jsx";


let port_log = "http://mavr.kemsu.ru:5500/API/user/login";
let profile = "http://mavr.kemsu.ru/profile";
let prof = "http://localhost:3000/profile";

let user_edit = "http://mavr.kemsu.ru:5500/API/user/whoamiredact";

export function ProfileOfStudent() {
  return (
	<div id="SP" className="profile-student">
		<h2 id="fio" className="profileName"></h2>
		<div className="TextBox5">
			<div id="sex" className="text-info"></div>
			<div >,&nbsp;</div>
			<div className="text-info"> учится</div>
		</div>
		<hr className="hrEventProfile"/>
			<div className="student-info-text"><div>Состояние семьи:&nbsp;</div><div id="profileFamilyCondition"></div></div>
			<div className="student-info-text"><div>Детей в семье:&nbsp;</div><div>1</div></div>
			<div className="student-info-text"><div>Достаток семьи:&nbsp;</div><div id="profileFamilysMoney"></div></div>
		<div>
		<hr className="hrEventProfile"/>
			<p id="profileInfoimationAboutParents" className="text-info">Информация о родителях</p>
			<div id="profileInfoimationAboutFamily" className="student-info-text">
			</div>
		</div>
		<hr className="hrEventProfile"/>
		<p className="text-info">Дополнительное образование</p>
		<div className="student-info-text">
			<div style={{}}>Сертификат ПФДО:&nbsp;</div><div id="PFDO">785735572</div>
		</div>
		<div id="studentProfileSetAdditionalEducation">
		</div>
		<p> </p>
		<button id="profileEdit" className="profile-button"><img src="https://i.ibb.co/9VHb7z3/edit.png" className="profile-button2"></img></button> 
		<button id="profileDelete" className="profile-button"><img src="https://i.ibb.co/vJC86mY/trash.png" className="profile-button2"></img></button>
		<button id="addAdditionalEducation" className="profile-button"><img src="https://i.ibb.co/Tbth16X/add.png" className="profile-button2"></img></button>
	</div>
  );
}

export function AdditionalEducation() {
  return (
		<div className="TextBox2">
			<div id="profileOrganizationOfAdditionalEducation" className="TextBox3">
				<div className="TextBox4">учреждение</div>
			</div>
			<div id="profileDirection" className="TextBox3">
				<div className="TextBox4">направление</div>
			</div>
			<div id="profileProgram" className="TextBox3">
				<div className="TextBox4">программа</div>
			</div>
		</div>
  );
}

export function EvProf() {
  return (
		<div id="EP" className="ew_event">
			<div className="displayFlex"><div>Дата события:&nbsp;</div><div id="danavr2">15.03.22</div></div>
			<div className="displayFlex"><div>Форма воспитательной работы:&nbsp;</div><div id="fovr2">урок города</div></div>
			<div className="displayFlex"><div>Кто проводит:&nbsp;</div><div id="whvr2">классный руководитель</div></div>
			<div id="naprsob2" className="displayFlex"><div>Направление:&nbsp;</div></div>
			<div className="displayFlex"><div>Сетевое взаимодействие:&nbsp;</div><div id="svvr2">Библиотека "Читай - город"</div></div>
			<div className="displayFlex"><div>Проект:</div><div id="provr2" className="paddingLeft">Живые уроки</div></div>
			<div><div>Учащиеся:</div><div id="uvr2" className="ucheniki2"></div></div>
			<div><div>Приглашенные организации:</div><div id="povr2">орг1, орг2</div></div>
			<div><div>Приглашенные родители:</div><div id="prvr2"></div></div>
			<div className="displayFlex"><div>Сертификат:&nbsp;</div><div id="revr2"></div></div>
			<div className="box">
				<a href="src/components/ui/EducationWorkLayouts/EducationWorkEdit/EducationWorkEdit.jsx">
					<button className="profile-button"><img src="https://i.ibb.co/9VHb7z3/edit.png" className="profile-button2"></img></button> 
				</a>
				<a href="VRsoh"> 
					<button className="profile-button"><img src="https://i.ibb.co/h2SfXRm/performed.png" className="profile-button2"></img></button> 
				</a>
			</div>
		</div>
  );
}

export function ArProf() {
  return (
		<div id="EP" className="ListPr">
			<div className="ListPrText">Дата события: 15.03.22</div>
			<div className="ListPrText">Форма воспитательной работы: урок города</div>
			<div className="ListPrText">Кто проводит: классный руководитель</div>
			<div className="ListPrText">Направление: познавательное</div>
			<div className="ListPrText">Сетевое взаимодействие: Библиотека "Читай - город"</div>
			<div className="ListPrText">Проект: "Живые уроки"</div>
			<p> </p>
			<div className="ListPrText">Приглашенные организации: орг1, орг2</div>
			<div className="ListPrText">Приглашенные родители:</div>
			<div className="ListPrText">Участники:</div>
			<p> </p>
			<div className="ListPrText">Сертификат:</div>
		</div>
  );
}


export function OCl() {
  return (
		<div className="OTB">
			<div className="ListPr3">
				<div className="ListPrText">Пофамильно:<input id="opof" className="ListPrText2" type="checkbox"></input></div>
				<div className="ListPrText">Количественный:<input id="okol" className="ListPrText2" type="checkbox"></input></div>
				<div className="ListPrText">Процентный:<input id="opr" className="ListPrText2" type="checkbox"></input></div>
				<button id="oClb" className="TBVR"> Сформировать отчет </button> 
			</div>
			<div className="ListPr3">
				<div className="ListPrText">Класс:</div>
				<select id="oCl">
				</select>
			</div>
		</div>
  );
}

export function OVR() {
  return (
		<div className="OTB">
			<div className="ListPr3">
				<div className="ListPrText">Количественный по каждому учреждению:<input id="okolu" className="ListPrText2" type="checkbox"></input></div>
				<div className="ListPrText">Количественный по секциям каждого учреждения:<input id="okolu" className="ListPrText2" type="checkbox"></input></div>
				<div className="ListPrText">Количественный по секциям дополнительного образования школы:<input id="okolu" className="ListPrText2" type="checkbox"></input></div>
				<button className="TBVR">Сформировать отчет </button>
			</div>
		</div>
  );
}

export function OAS() {
  return (
		<div className="OTB">
			<div className="ListPr3">
				<div className="ListPrText">Пофамильно:<input className="ListPrText2" type="checkbox"></input></div>
				<div className="ListPrText">Количественный:<input className="ListPrText2" type="checkbox"></input></div>
				<div className="ListPrText">Процентный:<input className="ListPrText2" type="checkbox"></input></div>
				<button className="TBVR"> Сформировать отчет </button> 
			</div>
			<div className="ListPr3">
				<div className="ListPrText">Классы:</div>
				<div className="MOCl">
					<p>Класс1</p>
					<p>Класс2</p>
				</div>
			</div>
		</div>
  );
}

export function NewStFa() {
  return (
		<div className="student-info">
				
				<p className="text-main"> Семья: <hr/> </p>
				<div className="family-create-space">
					<p> Достаток семьи:
						<select id="createStudentFamilysMoney" className="student-input" onChange={e => {fastat = e.target.value}}>
							<option>низкий доход</option>
							<option>средний доход</option>
							<option>вполне благополучная семья</option>
						</select>
					</p>
					<div id="familyHolder">
				</div>
			</div>
		</div>
  );
}

export function NewStFaPol() {
  return (
	<div className="TextStyleNVR3Holder">
		<div className="family-info">
			<div>
			<p>Мать: </p>
				<div>
				<p>Образовательный уровень:
				<select id="createStudentEducationLevelMother" className="student-input" onChange={e => {obrurma = e.target.value}}>>
					<option>высшее</option>
					<option>незаконченное высшее</option>
					<option>средне-специальное</option>
					<option>среднее</option>
					<option>неполное среднее</option>
				</select>
				</p>
				<p>Занятость:
				<select id="createStudentWorkMother" className="student-input" onChange={e => {zanma = e.target.value}}>
					<option>работник по найму</option>
					<option>предпринимательская деятельность</option>
					<option>безработный</option>
					<option>декретный отпуск</option>
					<option>инвалид</option>
					<option>пенсионер</option>
				</select>
				</p>
				</div>
			</div>
		<div>
			<p>Отец: </p>
			<div>
				<p>Образовательный уровень:
				<select id="createStudentEducationLevelFather" className="student-input" onChange={e => {obrurfa = e.target.value}}>
					<option>высшее</option>
					<option>незаконченное высшее</option>
					<option>средне-специальное</option>
					<option>среднее</option>
					<option>неполное среднее</option>
				</select>
				</p>
				<p>Занятость:
				<select id="createStudentWorkFather" className="student-input" onChange={e => {zanfa = e.target.value}}>
					<option>работник по найму</option>
					<option>предпринимательская деятельность</option>
					<option>безработный</option>
					<option>декретный отпуск</option>
					<option>инвалид</option>
					<option>пенсионер</option>
				</select>
				</p>
				</div>
			</div>
		</div>
	</div>
  );
}

export function NewStFaNepol() {
  return (
	<div className="TextStyleNVR3Holder">
		<div className="family-info">
			<div>
				<p>Пол:<select id="sexNepolFa" className="student-input" onChange={e => {enter9(e.target.value)}}>
										<option value="ж">ж</option>
										<option value="м">м</option>
									</select>
									</p>
				<p>Образовательный уровень:
				<select id="createStudentEducationLeveGuardian" className="student-input" onChange={e => {obrurop = e.target.value}}>
					<option>высшее</option>
					<option>незаконченное высшее</option>
					<option>средне-специальное</option>
					<option>среднее</option>
					<option>неполное среднее</option>
				</select>
				</p>
				<p>Занятость:
				<select id="createStudentWorkGuardian" className="student-input" onChange={e => {zanop = e.target.value}}>
					<option>работник по найму</option>
					<option>предпринимательская деятельность</option>
					<option>безработный</option>
					<option>декретный отпуск</option>
					<option>инвалид</option>
					<option>пенсионер</option>
				</select>
				</p>
			</div>
		</div>
	</div>
  );
}

export function NewStFaOp() {
  return (
	<div className="TextStyleNVR3Holder">
		<div className="family-info">
			<div>
				<p>Пол:<select className="student-input" onChange={e => {enter9(e.target.value)}}>
										<option value="ж">ж</option>
										<option value="м">м</option>
									</select></p>
				<p>Образовательный уровень:
				<select id="createStudentEducationLeveGuardian" className="student-input" onChange={e => {obrurop = e.target.value}}>
					<option>высшее</option>
					<option>незаконченное высшее</option>
					<option>средне-специальное</option>
					<option>среднее</option>
					<option>неполное среднее</option>
				</select>
				</p>
				<p>Занятость:
				<select id="createStudentWorkGuardian" className="student-input" onChange={e => {zanop = e.target.value}}>
					<option>работник по найму</option>
					<option>предпринимательская деятельность</option>
					<option>безработный</option>
					<option>декретный отпуск</option>
					<option>инвалид</option>
					<option>пенсионер</option>
				</select>
				</p>
			</div>
		</div>
	</div>
  );
}

export function ClStudFaPol() {
  return (
	<div className="TextStyleNVR3Holder">
		<div className="family_student">
			Мать:
			<div>
				<p className="stud-addition"><div>Образовательный уровень:&nbsp;</div><div id="profileStudentEducationLeveMother"></div></p>
				<p className="stud-addition"><div>Занятость:&nbsp;</div><div id="profileStudentWorkMother"></div></p>
			</div>
		</div>
		<div className="family_student">
			Отец:
			<div>
				<p className="stud-addition"><div>Образовательный уровень:&nbsp;</div><div id="profileStudentEducationLeveFather"></div></p>
				<p className="stud-addition"><div>Занятость:&nbsp;</div><div id="profileStudentWorkFather"></div></p>
			</div>
		</div>
	</div>
  );
}

export function ClStudFaNepol() {
  return (
	<div className="TextStyleNVR3Holder">
		<div className="family_student">
			<div>
				<p className="stud-addition">
					<div>
						Образовательный уровень:&nbsp;
					</div>
					<div id="profileStudentEducationLeveGuardian">
					</div>
				</p>
				<p className="stud-addition">
					<div>Занятость:&nbsp;
					</div>
					<div id="createStudentWorkGuardian">
					</div>
				</p>
			</div>
		</div>
	</div>
  );
}

export function StudProfRed() {
  return (
	<div id="SPRed" className="student_edit-space">
		<div className="student-info-text">
			Фамилия:
			<input id="profileStudentNameEdit" className="student-input" type="text"></input>
			ФИО:
			<input id="profileStudentFIOEdit" className="student-input" type="text" style={{width: 250}}></input>
			
		</div>
		
		<div className="student-info-text">
			Дата рождения:
			<input id="profileStudentBirthdayEdit" className="student-input" type="date"></input>
			
			Пол:<select id="profileStudentSexEdit" className="student-input" >
					<option>мужской</option>
					<option>женский</option>
				</select><div>,</div><div>учится</div>
			
			</div>

	<div className="student-info-text">
			Группа риска:
			<select id="profileStudentGroupOfRiskEdit" className="student-input">
				<option>нет</option>
				<option>девиантное поведение</option>
				<option>неуспеваемость</option>
				<option>иное</option>
				</select>
		</div>
		
		<div className="student-info-text">
			<div>
				Состояние семьи:
				<select id="profileStudentFamilyStatusEdit" className="student-input" onChange={e => {enter10(e.target.value)}}>
					<option value="полная">полная</option>
					<option value="неполная">неполная</option>
					<option value="опекун">опекун</option>
					</select>
				Детей в семье: 
				1
				</div>
			</div>
		
		<div className="student-info-text">
				Достаток семьи: 
				<select id="profileStudentFamilysMoneyEdit" className="student-input">
					<option value="низкий доход">низкий доход</option>
					<option value="средний доход">средний доход</option>
					<option value="вполне благополучная семья">вполне благополучная семья</option>
					</select>
				</div>
			
		
		<p id="profileStudentInformationAboutParentsEdit"> Информация о родителях </p>
			
			
		<div className="student-info-text">
			
			<div id="profileStudentInformationAboutParentsEditContainer" className="student-input">
			</div>
		</div>
		
		<p> Дополнительное образование</p>
		
		
		<div className="student-info-text">
			<div style={{}}>Сертификат ПФДО: </div><input id="profileStudentPFDOEdit" className="student-input" type="text"></input>
		</div>
		<div className="TextBox2">
			<div className="TextBox3">
				<div className="TextBox4">учреждение</div>
				<div className="TextBox4">МБОУ "СОШ №11"</div>
			</div>
			<div className="TextBox3">
				<div className="TextBox4">направление</div>
				<div className="TextBox4">техническое</div>
			</div>
			<div className="TextBox3">
				<div className="TextBox4">программа</div>
				<div className="TextBox4">"фиксики"</div>
			</div>
		</div>
		<button id="profileStudentEditAccept" className="profile-button"><img src="https://i.ibb.co/WpvGmC9/save.png" className="profile-button2"></img></button> 
		<button id="profileStudentEditCancel" className="profile-button"><img src="https://i.ibb.co/yBBD6GY/cancel.png" className="profile-button2"></img></button>
	</div>
  );
}

export function Overlay() {
  return (
	  <div>
		<div className="overlay"></div>
		<div className="overlay2" id="blockAllToEdit"></div>
	</div>
  );
}

export function Event() {
  return (
	<div className="TextStyleNVR">
		<p><div id="navr2">НАЗВАНИЕ СОБЫТИЯ</div></p>
		<p className="displayFlex"><div id="danavr2">дата</div><div>,</div><div id="fovr2">форма</div><div>,</div><div id="napvr2">познавательное</div></p>
	</div>
  );
}

export function EventCreateClass() {
  return (
	<div className="ListPr4">
		<p className="text-info">Номер класса: <input id="createClassNumber"  className="student-input" type="text"></input></p>
		<p className="text-info">Буква класса: <input id="createClassLetter"  className="student-input" type="text"></input></p>
		<button id="container" className="profile-button"><img src="https://i.ibb.co/h2SfXRm/performed.png" className="profile-button2" onClick={function(){enterControlSystemClasses();}}></img></button> 
	</div>
  );
}

export function EventDelClass() {
  return (
	<div className="ListPr4">
		<p className="text-info">Класс:
			<select id="deleteClassSelect" className="student-input">
			</select>
		</p>
		<button id="container" className="profile-button"><img src="https://i.ibb.co/h2SfXRm/performed.png" className="profile-button2" onClick={function(){enterControlSystemClassesDelete();}}></img></button> 
	</div>
  );
}

export function EventCreateNapr() {
  return (
		<div className="ListPr4">
			<p className="text-info">Название направления: 
			<input id="createDirection" className="student-input" type="text"></input>
			</p>
			<button id="container" className="profile-button"><img src="https://i.ibb.co/h2SfXRm/performed.png" className="profile-button2" onClick={function(){enterus3();}}></img></button> 
		</div>
  );
}

export function EventCreateOrganization() {
  return (
		<div className="ListPr4">
			<p className="text-info">Название организации: <input id="EventCreateOrganizationInputName" className="student-input" type="text"></input></p>
			<p className="text-info">Описание: <textarea id="EventCreateOrganizationInputDescriprtion" className="student-input" type="text"></textarea></p>
			<button id="container" className="profile-button"><img src="https://i.ibb.co/h2SfXRm/performed.png" className="profile-button2" onClick={function(){enterControlSystemEvents();}}></img></button>
			
		</div>
  );
}

export function EventShowDirections() {
  return (
		<div className="ListPr4">
			<p className="text-info">Направления:<select id="showDirectionsSelect" className="student-input" size="10"></select></p>
			<button id="container" className="profile-button"><img src="https://i.ibb.co/h2SfXRm/performed.png" className="profile-button2" onClick={function(){enterControlSystemEventsDeleteDirections();}}></img></button>
			
		</div>
  );
}

export function EventShowOrganizations() {
  return (
		<div className="ListPr4">
			<p className="text-info">Организации:<select id="showOrganizationsSelect" className="student-input" size="10"></select></p>
			<button id="container" className="profile-button"><img src="https://i.ibb.co/h2SfXRm/performed.png" className="profile-button2" onClick={function(){enterControlSystemEventsDeleteDirections();}}></img></button>
			
		</div>
  );
}

export function EventCreateProgram() {
  return (
		<div className="ListPr4">
			<p className="text-info">Название программы: <input id="createProgramNameInput" className="student-input" type="text"></input></p>
			<p className="text-info">Описание: <textarea id="createProgramDescriprtionInput" className="student-input" type="text"></textarea></p>
			<p className="text-info">Учреждение: <select id="createProgramShowOrganizationsSelect" className="student-input">
			<option selected disabled></option>
			</select></p>
			<p className="text-info">Направление: <select id="createProgramShowDirectionsSelectChoose" className="student-input" size="3" onChange={e => {enterControlSystemEventsDeleteDirectionFromSelect(e.target.selectedIndex)}}></select>
			<select id="createProgramShowDirectionsSelect" className="student-input">
			<option selected disabled></option>
			</select></p>
			<button id="container" className="profile-button"><img src="https://i.ibb.co/h2SfXRm/performed.png" className="profile-button2" onClick={function(){enterControlSystemEventsCreateProgram();}}></img></button>
	
		</div>
  );
}

export function EventShowPrograms() {
  return (
		<div className="ListPr4">
			<p className="text-info">Программы: <select id="showProgramSelect" className="student-input" size="10"></select></p>
			<button id="container" className="profile-button"><img src="https://i.ibb.co/h2SfXRm/performed.png" className="profile-button2" onClick={function(){enterControlSystemEventsDeletePrograms();}}></img></button>
			
		</div>
  );
}

export function CrPlan() {
  return (
		<div className="ListPr4">
			<p className="text-info">Год плана: <input id="createYearPlanInputYear" className="student-input" type="text"></input></p>
			<p className="text-info">Цели воспитательной работы: </p>
			<p className="text-info"><textarea id="createYearPlanInputGoalsOfEducationalWork" className="student-input" type="text" ></textarea></p>
			<p className="text-info">Целевые приоритеты для учащихся с 1 по 4 кл: </p>
			<p className="text-info"><textarea id="createYearPlanInputTargetPriorities14" className="student-input" type="text" ></textarea></p>
			<p className="text-info">Целевые приоритеты для учащихся с 5 по 9 кл: </p>
			<p className="text-info"><textarea id="createYearPlanInputTargetPriorities59" className="student-input" type="text" ></textarea></p>
			<p className="text-info">Целевые приоритеты для учащихся с 10 по 11 кл: </p>
			<p className="text-info"><textarea id="createYearPlanInputTargetPriorities1011" className="student-input" type="text" ></textarea></p>
			<p className="text-info">Задачи воспитательной работы: </p>
			<p className="text-info"><textarea id="createYearPlanInputTasksOfEducationalWork" className="student-input" type="text" ></textarea></p>
			<button id="container" className="profile-button"><img src="https://i.ibb.co/h2SfXRm/performed.png" className="profile-button2" onClick={function(){enterus2();}}></img></button>
		</div>
  );
}

export function OCl2() {
  return (
		<div className="OTB2">
			<div className="displayFlex">
				<div className="ListPr3">
					<div className="ListPrText">Пофамильно:<input id="opof" className="ListPrText2" type="checkbox"></input></div>
					<div className="ListPrText">Количественный:<input id="okol" className="ListPrText2" type="checkbox"></input></div>
				</div>
				<div className="ListPr3">
					<div className="ListPrText">Класс:</div>
					<select id="oCl2">
					</select>
				</div>
			</div>
			<button id="orClb" className="TBVR"> Сформировать отчет </button> 
		</div>
  );
}

export function OCl3() {
  return (
		<div className="OTB2">
			<div className="displayFlex">
				<div className="ListPr3">
					<div className="ListPrText">Мальчиков:<input id="omal" className="ListPrText2" type="checkbox"></input></div>
					<div className="ListPrText">Девочек:<input id="odev" className="ListPrText2" type="checkbox"></input></div>
				</div>
				<div className="ListPr3">
					<div className="ListPrText">Класс:</div>
					<select id="oCl3">
					</select>
				</div>
			</div>
			<button id="orClb3" className="TBVR"> Сформировать отчет </button> 
		</div>
  );
}

export function OCl4() {
  return (
		<div className="OTB2">
			<div className="displayFlex">
				<div className="ListPr3">
					<div className="ListPrText">Всего семей:<input id="osemvs" className="ListPrText2" type="checkbox"></input></div>
					<div className="ListPrText">Полных:<input id="osempol" className="ListPrText2" type="checkbox"></input></div>
					<div className="ListPrText">Неполных:<input id="osemnepol" className="ListPrText2" type="checkbox"></input></div>
					<div className="ListPrText">Опекунов:<input id="osemo" className="ListPrText2" type="checkbox"></input></div>
				</div>
				<div className="ListPr3">
					<div className="ListPrText">Класс:</div>
					<select id="oCl4">
					</select>
				</div>
			</div>
			<button id="orClb4" className="TBVR"> Сформировать отчет </button> 
		</div>
  );
}

export function OCl5() {
  return (
		<div className="OTB2">
			<div className="displayFlex">
				<div className="ListPr3">
					<div className="ListPrText">Многодетные:<input id="omn" className="ListPrText2" type="checkbox"></input></div>
					<div className="ListPrText">Малообеспеченные:<input id="omob" className="ListPrText2" type="checkbox"></input></div>
					<div className="ListPrText">Матери-одиночки:<input id="omo" className="ListPrText2" type="checkbox"></input></div>
					<div className="ListPrText">Отцы-одиночки:<input id="ooo" className="ListPrText2" type="checkbox"></input></div>

				</div>
				<div className="ListPr3">
					<div className="ListPrText">Класс:</div>
					<select id="oCl5">
					</select>
				</div>
			</div>
			<button id="orClb5" className="TBVR"> Сформировать отчет </button> 
		</div>
  );
}

export function OCl6() {
  return (
		<div className="OTB2">
			<div className="displayFlex">
				<div className="ListPr3">
					<div className="ListPrText">Низкий:<input id="oniz" className="ListPrText2" type="checkbox"></input></div>
					<div className="ListPrText">Средний:<input id="osr" className="ListPrText2" type="checkbox"></input></div>
					<div className="ListPrText">Вполне благополучные:<input id="obl" className="ListPrText2" type="checkbox"></input></div>
				</div>
				<div className="ListPr3">
					<div className="ListPrText">Класс:</div>
					<select id="oCl6">
					</select>
				</div>
			</div>
			<button id="orClb6" className="TBVR"> Сформировать отчет </button> 
		</div>
  );
}

export function OCl7() {
  return (
		<div className="OTB2">
			<div className="displayFlex">
				<div className="ListPr3">
					<div className="ListPrText">Высшее:<input id="ovi" className="ListPrText2" type="checkbox"></input></div>
					<div className="ListPrText">Незаконченное высшее:<input id="onevi" className="ListPrText2" type="checkbox"></input></div>
					<div className="ListPrText">Средне-специальное:<input id="osrsp" className="ListPrText2" type="checkbox"></input></div>
					<div className="ListPrText">Среднее:<input id="osred" className="ListPrText2" type="checkbox"></input></div>
					<div className="ListPrText">Неполное среднее:<input id="onepsr" className="ListPrText2" type="checkbox"></input></div>
				</div>
				<div className="ListPr3">
					<div className="ListPrText">Класс:</div>
					<select id="oCl7">
					</select>
				</div>
			</div>
			<button id="orClb7" className="TBVR"> Сформировать отчет </button> 
		</div>
  );
}

export function OCl8() {
  return (
		<div className="OTB2">
			<div className="displayFlex">
				<div className="ListPr3">
					<div className="ListPrText">Работник по найму:<input id="odevpov" className="ListPrText2" type="checkbox"></input></div>
					<div className="ListPrText">Предпринимательская деятельность:<input id="oneusp" className="ListPrText2" type="checkbox"></input></div>
					<div className="ListPrText">Безработный:<input id="oin" className="ListPrText2" type="checkbox"></input></div>
					<div className="ListPrText">Декретный отпуск:<input id="odevpov" className="ListPrText2" type="checkbox"></input></div>
					<div className="ListPrText">Инвалид:<input id="oneusp" className="ListPrText2" type="checkbox"></input></div>
					<div className="ListPrText">Пенсионер:<input id="oin" className="ListPrText2" type="checkbox"></input></div>
				</div>
				<div className="ListPr3">
					<div className="ListPrText">Класс:</div>
					<select id="oCl8">
					</select>
				</div>
			</div>
			<button id="orClb8" className="TBVR"> Сформировать отчет </button> 
		</div>
  );
}

export function OCl9() {
  return (
		<div className="OTB2">
			<div className="displayFlex">
				<div className="ListPr3">
					<div className="ListPrText">Девиантное поведение:<input id="odevpov" className="ListPrText2" type="checkbox"></input></div>
					<div className="ListPrText">Неуспеваемость:<input id="oneusp" className="ListPrText2" type="checkbox"></input></div>
					<div className="ListPrText">Иное:<input id="oin" className="ListPrText2" type="checkbox"></input></div>
					<button id="orClb8" className="TBVR"> Сформировать отчет </button> 
				</div>
				<div className="ListPr3">
					<div className="ListPrText">Класс:</div>
					<select id="oCl8">
					</select>
				</div>
			</div>
			<button id="orClb9" className="TBVR"> Сформировать отчет </button> 
		</div>
  );
}

export function OClNORM() {
  return (
		<div className="ONORMVIR">
			<div className="OClNORMBlock">
				<div className="student-info-text"><b>По учащимся класса</b></div>
				<div className="OClNORMBlockIn">
					<div className="report-bar"><div className="text-info">Пофамильно:</div><input className="ListPrText2" type="checkbox"></input></div>
					<div className="report-bar"><div className="text-info">Количественный:</div><input className="ListPrText2" type="checkbox"></input></div>
				</div>
				<hr/>
				<div className="student-info-text"><b>По количеству мальчиков/девочек в классе:</b></div>
				<div className="OClNORMBlockIn">
					<div className="report-bar"><div className="text-info">Мальчиков:</div><input className="ListPrText2" type="checkbox"></input></div>
					<div className="report-bar"><div className="text-info">Девочек:</div><input className="ListPrText2" type="checkbox"></input></div>
				</div>
				<hr/>
				<div className="student-info-text"><b>Количественный по статусу семей:</b></div>
				<div className="OClNORMBlockIn">
					<div className="report-bar"><div className="text-info">Всего семей:</div><input className="ListPrText2" type="checkbox"></input></div>
					<div className="report-bar"><div className="text-info">Полных:</div><input className="ListPrText2" type="checkbox"></input></div>
					<div className="report-bar"><div className="text-info">Неполных:</div><input className="ListPrText2" type="checkbox"></input></div>
					<div className="report-bar"><div className="text-info">Опекунов:</div><input className="ListPrText2" type="checkbox"></input></div>
					<div className="report-bar"><div className="text-info">Многодетные:</div><input className="ListPrText2" type="checkbox"></input></div>
					<div className="report-bar"><div className="text-info">Малообеспеченные:</div><input className="ListPrText2" type="checkbox"></input></div>
					<div className="report-bar"><div className="text-info">Отцы-одиночки:</div><input className="ListPrText2" type="checkbox"></input></div>
					<div className="report-bar"><div className="text-info">Матери-одиночки:</div><input className="ListPrText2" type="checkbox"></input></div>
				</div>
				<hr/>
				<div className="student-info-text"><b>По материальному состоянию семей</b></div>
				<div className="OClNORMBlockIn">
					<div className="report-bar"><div className="text-info">Низкий:</div><input className="ListPrText2" type="checkbox"></input></div>
					<div className="report-bar"><div className="text-info">Средний:</div><input className="ListPrText2" type="checkbox"></input></div>
					<div className="report-bar"><div className="text-info">Вполне благополучный:</div><input className="ListPrText2" type="checkbox"></input></div>
				</div>
			</div>
			<div className="OClNORMBlock">
				<div><b>По образовательному уровню родителей:</b></div>
				<div className="OClNORMBlockIn">
					<div className="report-bar"><div className="text-info">Высшее:</div><input className="ListPrText2" type="checkbox"></input></div>
					<div className="report-bar"><div className="text-info">Незаконченное высшее:</div><input className="ListPrText2" type="checkbox"></input></div>
					<div className="report-bar"><div className="text-info">Средне-специальное:</div><input className="ListPrText2" type="checkbox"></input></div>
					<div className="report-bar"><div className="text-info">Среднее:</div><input className="ListPrText2" type="checkbox"></input></div>
					<div className="report-bar"><div className="text-info">Неполное среднее:</div><input className="ListPrText2" type="checkbox"></input></div>
				</div>
				<hr/>
				<div><b>По занятости родителей:</b></div>
				<div className="OClNORMBlockIn">
					<div className="report-bar"><div className="text-info">Работник по найму:</div><input className="ListPrText2" type="checkbox"></input></div>
					<div className="report-bar"><div className="text-info">Предпринимательская деятельность:</div><input className="ListPrText2" type="checkbox"></input></div>
					<div className="report-bar"><div className="text-info">Безработный:</div><input className="ListPrText2" type="checkbox"></input></div>
					<div className="report-bar"><div className="text-info">Декретный отпуск:</div><input className="ListPrText2" type="checkbox"></input></div>
					<div className="report-bar"><div className="text-info">Инвалид:</div><input className="ListPrText2" type="checkbox"></input></div>
					<div className="report-bar"><div className="text-info">Пенсионер:</div><input className="ListPrText2" type="checkbox"></input></div>
				</div>
				<hr/>
				<div><b>По группам риска:</b></div>
				<div className="OClNORMBlockIn">
					<div className="report-bar"><div className="text-info">Девиантное поведение:</div><input className="ListPrText2" type="checkbox"></input></div>
					<div className="report-bar"><div className="text-info">Неуспеваемость:</div><input className="ListPrText2" type="checkbox"></input></div>
					<div className="report-bar"><div className="text-info">Иное:</div><input className="ListPrText2" type="checkbox"></input></div>
				</div>
			</div>
		</div>
  );
}

export function OClNORM2() {
  return (
		<div className="ONORMVIR">
			<div className="OClNORMBlock">
				<div className="student-info-text"><b>По учащимся, имеющим сертификат ПФДО</b></div>
				<div className="OClNORMBlockIn">
					<div className="report-bar"><div className="text-info">Пофамильно:</div><input id="opof" className="ListPrText2" type="checkbox"></input></div>
					<div className="report-bar"><div className="text-info">Количественный:</div><input id="okol" className="ListPrText2" type="checkbox"></input></div>
					<div className="report-bar"><div className="text-info">Процентный:</div><input id="opr" className="ListPrText2" type="checkbox"></input></div>
				</div>
			</div>
			<div className="OClNORMBlock">
				<div className="student-info-text"><b>По занятости учащихся:</b></div>
				<div className="OClNORMBlockIn">
					<div className="report-bar"><div className="text-info">Количественный по каждому учреждению:</div><input className="ListPrText2" type="checkbox"></input></div>
					<div className="report-bar"><div className="text-info">Количественный по секциям каждого учреждения:</div><input className="ListPrText2" type="checkbox"></input></div>
					<div className="report-bar"><div className="text-info">Количественный по секциям дополнительного образования школы:</div><input className="ListPrText2" type="checkbox"></input></div>
				</div>
			</div>
		</div>
  );
}


export function EventCreateUser() {
  return (
	<div className="OTB">
		<div className="ListPr4">
			<p>Логин пользователя: <input id="nu" type="text"></input></p>
			<p>Пароль пользователя:<input id="le" type="text"></input></p>
			<button className="TBVR" onClick={function(){enternewcl();}}> Создать Пользователя </button>
		</div>
	</div>
  );
}

export function EventDelUser() {
  return (
	<div className="OTB">
		<div className="ListPr4">
			<p>Пользователь:
				<select id="delClSelect">
				</select>
			</p>
			<button className="TBVR" onClick={function(){}}> Удалить Пользователя </button>
		</div>
	</div>
  );
}

export function EventUserRole() {
  return (
	<div className="OTB">
		<div className="ListPr4">
			<p>Пользователь:
				<select id="delClSelect">
				</select>
			</p>
			<p>Роль:
				<select id="delClSelect">
				</select>
			</p>
			<button className="TBVR" onClick={function(){}}> Назначить роль </button>
		</div>
	</div>
  );
}




export function ClassToUser() {
  return (
		<div className="ListPr4">
			<p className="text-info">Пользователь:<select id="ClassToUserUser" className="student-input">
				<option selected disabled></option>
				</select></p>
			<p className="text-info">Класс:<select id="ClassToUserClass" className="student-input">
				<option selected disabled></option>
				</select></p>
				
			<button id="container" className="profile-button"><img src="https://i.ibb.co/h2SfXRm/performed.png" className="profile-button2" onClick={function(){enterControlSystemUsersClassToUser();}}></img></button> 
		</div>
  );
}

export function UserNewUser() {
  return (
		<div className="ListPr4">
			<p className="text-info">Логин: <input id="newUserLogin" className="student-input" type="text"></input></p>
			<p className="text-info">Пароль: <input id="newUserPassword" className="student-input" type="password"></input></p>
			<p className="text-info">Фамилия: <input id="newUserLastname" className="student-input" type="text"></input></p>
			<p className="text-info">Имя: <input id="newUserName" className="student-input" type="text"></input></p>
			<p className="text-info">Отчество: <input id="newUserMiddlename" className="student-input" type="text"></input></p>
			<p className="text-info">Комментарий: <input id="newUserComment" className="student-input" type="text"></input></p>
			<p className="text-info">Роль: <select id="newUserRole" className="student-input">
				<option selected disabled></option>
				<option value="USER">классный руководитель</option>
				<option value="ADMIN">заместитель по воспитательной работе</option>
				</select></p>
				
			
			
			<button id="container" className="profile-button"><img src="https://i.ibb.co/h2SfXRm/performed.png" className="profile-button2" onClick={function(){enterControlSystemUsersCreateUser();}}></img></button> 
		</div>
  );
}