import '../../../mavrCSS.css';
import ReactDOM from 'react-dom';

import {TopPanelUniversity} from "../../ui/NavigationPanels/NavigationPanels.jsx";
import {enter6, enter9} from "../../ui/ClassroomLayouts/ClassroomCreateStudent/ClassroomCreateStudent.jsx";
import {ProfileOfStudent, ClStudFaPol, ClStudFaNepol, StudProfRed, NewStFaPol, NewStFaNepol, NewStFaOp, Overlay,AdditionalEducation} from "../../../See.js";

const renderProfileOfStudent = <ProfileOfStudent />;
const element2 = <ClStudFaPol />;
const element3 = <ClStudFaNepol />;
const element4 = <StudProfRed />;
const element5 = <NewStFaPol />;
const element6 = <NewStFaNepol />;
const element7 = <NewStFaOp />;
const element8 = <Overlay />;
const element9 = <AdditionalEducation />;

let flag = false;

let port_reg_cl = "http://localhost:5500/API/class/";
let port_find_students = "http://localhost:5500/API/student/:id";
let port_find_fa = "http://localhost:5500/api/family/:id";
let port_reg_fa = "http://localhost:5500/API/family/";
let port_edit_fa = "http://localhost:5500/API/family/test";
let port_edit_st = "http://localhost:5500/API/student/red";
let port_delete_st = "http://localhost:5500/api/student/:id";
let port_red_fa = "http://localhost:5500/API/family/redold";
let port_show_students_dop = "http://localhost:5500/API/student/addeduc";
let port_show_dop_organization = "http://localhost:5500/api/institution/id";
let port_show_dop_directions = "http://localhost:5500/api/additEduc/getNAPR";
let port_show_thisuser = "http://localhost:5500/API/user/whoami";
let port_show_all_students = "http://localhost:5500/api/student/ALLL";

var classes=new Array();


function UniversityPage() {
	window.onload = function() {
			document.getElementById('university_studs').className = "topbutton-page-university";
			//enter2(classes)
			enter4(classes);
		};
	return (
		<div className="pageUniversity">
			< TopPanelUniversity />
			<div className="mavr">
				<div id="ClList" className="classes">
				</div>
				<div id="aaa" className="classes-space-university">
					<div className="student-list">
                        <div className="elements-to-row">
                            <p className="text-main">Институт</p>
                            <div className="elements-to-center">
                                <select id="institute-select">
                                <option value="">Институт прикладной математики и компьютерных наук</option>
                                </select>
                            </div>
                        </div>
                        <div className="elements-to-row">
                            <p className="text-main">Группа</p>
							<div className="elements-to-center">
                                <select id="institute-select">
                                <option value="">932209</option>
                                </select>
                            </div>
                        </div>
						<a href="create_new_student"><button className="profile-button"><img src="https://i.ibb.co/4mZtQCb/user-student-add.png" className="profile-button2"></img></button></a>
						<p className="text-main">Состав группы</p>
						<div id="Students">
						</div>							
					</div>
					<div id="SetSP" className="indent">
					</div>
				</div>
			</div>
			<div id= "a"></div>
		</div>
  );	
}

//Вывод кнопок классов
async function enter2(classes) {
	let responsegetclassesofuser = await fetch(port_reg_cl, {
		method: 'GET',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		});
	let resultgetclassesofuser = await responsegetclassesofuser.json();
	let result2 = JSON.stringify(resultgetclassesofuser);
	alert(result2);
}

//Вывод учеников класса
async function enter4(classes) {
	let responsegetclassesofuser = await fetch(port_show_all_students, {
		method: 'GET',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		});
	let resultgetclassesofuser = await responsegetclassesofuser.json();
	let result2 = JSON.stringify(resultgetclassesofuser);
	alert(result2);
}

export default UniversityPage;