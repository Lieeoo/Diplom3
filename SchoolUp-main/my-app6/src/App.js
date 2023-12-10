import logo from './images/logo.svg';
import { BrowserRouter as Router, Route, Routes, useRouteMatch, Switch } from "react-router-dom";

// Страницы

import LoginPage from "./login.js"; // Авторизация

import Profile from "./Profile.js"; // Профиль 
import EditProfile from "./Profile_edit.js"; // редактирование информации профиля

import Classroom from "./Classroom.js"; // Классное руководство 
import Clred from "./Clred.js"; // Редактирование ученика в классе   
import NewSt from "./NewSt.js"; // Новый ученик 

import EW from "./EducationalWork.js"; // Воспитательная работа 
import VRred from "./VRred.js"; // Редактирование воспитательного события 
import CVR from "./Goals.js"; // Цель воспитательной работы 
import EW_Archive from "./EW_Archive.js"; // Архив 

import Report1 from "./ReportManager1.js"; // менеджер отчетов, вкладка 1  
import Report2 from "./ReportManager2.js"; // менеджер отчетов, вкладка 2 
import Report3 from "./ReportManager3.js"; // менеджер отчетов, вкладка 3
 
import Control from "./Control.js"; // Управление системой
import ControlSystemEvents from "./ControlSystemEvents.js"; // Управление системой, воспитательный события
import ControlSystemClasses from "./ControlSystemClasses.js"; // Управление системой, классы
import ControlSystemPlans from "./ControlSystemPlans.js"; // Управление системой, планы
import ControlSystemAdditionalEducation from "./ControlSystemAdditionalEducation.js"; // Управление смистемой, дополнительное образование

import NewEv from "./NewEv.js"; // Новый ивент  



function App() {
  return (
	<Router>
		<div className="page">
			<Routes>
				<Route path="/" exact element={<LoginPage/>}/>
				<Route path="/profile" exact element={<Profile/>}/>
				<Route path="/profile_edit" exact element={<EditProfile/>}/>
				<Route path="/classroom" exact element={<Classroom/>}/>
				<Route path="/educational_work" exact element={<EW/>}/>
				<Route path="/educational_work_edit" exact element={<VRred/>}/>
				<Route path="/educational_work_archive" exact element={<EW_Archive/>}/>
				<Route path="/goals_of_educational_work" exact element={<CVR/>}/>
				<Route path="/Clred" exact element={<Clred/>}/>
				<Route path="/report_manager_employment" exact element={<Report1/>}/>
				<Route path="/report_manager_classes" exact element={<Report2/>}/>
				<Route path="/report_manager_other" exact element={<Report3/>}/>
				<Route path="/control_users" exact element={<Control/>}/>
				<Route path="/control_events" exact element={<ControlSystemEvents/>}/>
				<Route path="/control_classes" exact element={<ControlSystemClasses/>}/>
				<Route path="/control_plans" exact element={<ControlSystemPlans/>}/>
				<Route path="/create_new_student" exact element={<NewSt/>}/>
				<Route path="/new_event" exact element={<NewEv/>}/>
				<Route path="/control_additional_education" exact element={<ControlSystemAdditionalEducation/>}/>
			</Routes>
		</div>
	</Router>
  );
}


export default App;
