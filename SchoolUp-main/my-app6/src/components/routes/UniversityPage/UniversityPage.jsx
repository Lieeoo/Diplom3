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

var classes=new Array();


function ClassroomPage() {
	window.onload = function() {
			document.getElementById('university_studs').className = "topbutton-page-university";
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
                                <option value="dog">Dog</option>
                                </select>
                            </div>
                        </div>
                        <div className="elements-to-row">
                            <p className="text-main">Группа</p>
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

export default ClassroomPage;