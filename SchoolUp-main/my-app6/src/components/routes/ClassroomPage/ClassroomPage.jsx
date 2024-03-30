import '../../../mavrCSS.css';
import ReactDOM from 'react-dom';

import {TopPanel} from "../../ui/NavigationPanels/NavigationPanels.jsx";
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
let port_find_fa = "http://mavr.kemsu.ru:5500/api/family/:id";
let port_reg_fa = "http://mavr.kemsu.ru:5500/API/family/";
let port_edit_fa = "http://localhost:5500/API/family/test";
let port_edit_st = "http://localhost:5500/API/student/red";
let port_delete_st = "http://localhost:5500/api/student/:id";
let port_red_fa = "http://localhost:5500/API/family/redold";
let port_show_students_dop = "http://localhost:5500/API/student/addeduc";
let port_show_dop_organization = "http://localhost:5500/api/institution/id";
let port_show_dop_directions = "http://localhost:5500/api/additEduc/getNAPR";
let port_show_thisuser = "http://mavr.kemsu.ru:5500/API/user/whoami";

var classes=new Array();

let profileStudentSexEdit;

let fastat="низкий доход";
let createStudentEducationLevelMother="высшее";
let createStudentWorkMother="работник по найму";
let createStudentEducationLevelFather="высшее";
let createStudentWorkFather="работник по найму";
let createStudentEducationLeveGuardian="высшее";
let createStudentWorkGuardian="работник по найму";

let flst;
let thisSt;

function ClassroomPage() {
	window.onload = function() {
			enter2(classes);
			document.getElementById('clruk').className = "topbutton-page";
		};
	return (
		<div className="page">
			< TopPanel />
			<div className="mavr">
				<div id="ClList" className="classes">
				</div>
				<div id="aaa" className="classes-space">
					<div className="student-list">
						<a href="create_new_student"><button className="profile-button"><img src="https://i.ibb.co/4mZtQCb/user-student-add.png" className="profile-button2"></img></button></a>
						<p className="text-main">Состав класса</p>
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

//Нажатие на кнопку ученика в списке
async function enter(a, result) {
	if ((thisSt==a.id)&&(document.getElementById('SetSP').innerHTML.length!=0)){
		ReactDOM.render(null, document.getElementById('SetSP'));
		let j = 0;
		var thisid;
		while (j<result.length){
			thisid=result[j].id+"st";
			document.getElementById(thisid).className = "TextStyleN";
			j++;
		}
	}
	else{
		ReactDOM.render(null, document.getElementById('SetSP'));
		ReactDOM.render(renderProfileOfStudent, document.getElementById('SetSP'));
		var newid = document.getElementById(a.id).id.substring(0, document.getElementById(a.id).id.length-2);
		let i=0;
		while(result[i].id!=newid){
			i++;
		}
		document.getElementById("fio").innerHTML = result[i].fullname;
		if (result[i].sex==2) {document.getElementById("sex").innerHTML = "мужской";}
		else {document.getElementById("sex").innerHTML = "женский";}
		document.getElementById("PFDO").innerHTML = result[i].PFDO;
		let family_id;
		family_id = result[i].family_id;
		//Ищет семью для вывода в профиль
		let edit = {
				id:family_id,
			};
		let responseedit = await fetch(port_edit_fa, {
			method: 'PATCH',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(edit)
			});
		let resultedit = await responseedit.json();
		let resultedit2 = JSON.stringify(resultedit.family_status);
		//Заполнение полей семьи в профиле
		switch(resultedit.family_status) {
			case 0:
			document.getElementById("profileFamilyCondition").innerHTML = "нет";
			document.getElementById("profileInfoimationAboutParents").innerHTML = "";
			ReactDOM.render("", document.getElementById('profileInfoimationAboutFamily'));
			break;
			case 1:
			document.getElementById("profileFamilyCondition").innerHTML = "полная";
			document.getElementById("profileInfoimationAboutParents").innerHTML = "Информация о родителях";
			ReactDOM.render(element2, document.getElementById('profileInfoimationAboutFamily'));
			document.getElementById("profileStudentEducationLeveMother").innerHTML = resultedit.educationMother;
			document.getElementById("profileStudentWorkMother").innerHTML = resultedit.motherStat;
			document.getElementById("profileStudentEducationLeveFather").innerHTML = resultedit.educationFather;
			document.getElementById("profileStudentWorkFather").innerHTML = resultedit.fatherStat;
			break;
			case 2:
			document.getElementById("profileFamilyCondition").innerHTML = "неполная";
			document.getElementById("profileInfoimationAboutParents").innerHTML = "Информация о матери";
			ReactDOM.render(element3, document.getElementById('profileInfoimationAboutFamily'));
			document.getElementById("profileStudentEducationLeveGuardian").innerHTML = resultedit.educationMother;
			document.getElementById("profileStudentWorkGuardian").innerHTML = resultedit.motherStat;
			break;
			case 3:
			document.getElementById("profileFamilyCondition").innerHTML = "неполная";
			document.getElementById("profileInfoimationAboutParents").innerHTML = "Информация об отце";
			ReactDOM.render(element3, document.getElementById('profileInfoimationAboutFamily'));
			document.getElementById("profileStudentEducationLeveGuardian").innerHTML = resultedit.educationFather;
			document.getElementById("profileStudentWorkGuardian").innerHTML = resultedit.fatherStat;		
			break;
			case 4:
			document.getElementById("profileFamilyCondition").innerHTML = "опекун";
			document.getElementById("profileInfoimationAboutParents").innerHTML = "Информация об опекуне";
			ReactDOM.render(element3, document.getElementById('profileInfoimationAboutFamily'));
			document.getElementById("profileStudentEducationLeveGuardian").innerHTML = resultedit.educationMother;
			document.getElementById("profileStudentWorkGuardian").innerHTML = resultedit.motherStat;
			break;
			case 5:
			document.getElementById("profileFamilyCondition").innerHTML = "опекун";
			document.getElementById("profileInfoimationAboutParents").innerHTML = "Информация об опекуне";
			ReactDOM.render(element3, document.getElementById('profileInfoimationAboutFamily'));
			document.getElementById("profileStudentEducationLeveGuardian").innerHTML = resultedit.educationFather;
			document.getElementById("profileStudentWorkGuardian").innerHTML = resultedit.fatherStat;
			break;
		}
		document.getElementById("profileFamilysMoney").innerHTML = resultedit.material_condition;
		//Вывод допобразований ученика
		ReactDOM.render(null, document.getElementById('studentProfileSetAdditionalEducation'));
		ReactDOM.render(element9, document.getElementById('studentProfileSetAdditionalEducation'));
		let getdop = {
				id:result[i].id
			};
		let responsegetdop = await fetch(port_show_students_dop, {
			method: 'PATCH',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(getdop)
			});
		let resultgetdop = await responsegetdop.json();
		let k=0;
		while(k<resultgetdop.length){
			//Поиск учреждения дополнительного образования
			let getorganizationofdop = {
				id:resultgetdop[k].id_institution
			};
			let responsegetorganizationofdop = await fetch(port_show_dop_organization, {
			method: 'POST',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(getorganizationofdop)
			});
			let resultgetorganizationofdop = await responsegetorganizationofdop.json();
			//Поиск направлений дополнительного образования
			let getdirectionsofdop = {
				id:resultgetdop[k].id
			};
			let responsegetdirectionsofdop = await fetch(port_show_dop_directions, {
			method: 'POST',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(getdirectionsofdop)
			});
			let resultgetdirectionsofdop = await responsegetdirectionsofdop.json();
			let p = document.createElement('div')
			p.className = "TextBox4";
			let txt = document.createTextNode(resultgetorganizationofdop.name);
			p.appendChild(txt);
			document.getElementById('profileOrganizationOfAdditionalEducation').appendChild(p);
			p = document.createElement('div')
			p.className = "TextBox4";
			//Вывод всех направлений
			let n=0;
			while(n<resultgetdirectionsofdop.length-1)
			{
				txt = document.createTextNode(resultgetdirectionsofdop[n].name + ",\u00A0");
				p.appendChild(txt);
				n++;
			}
			txt = document.createTextNode(resultgetdirectionsofdop[n].name);
			p.appendChild(txt);
			document.getElementById('profileDirection').appendChild(p);
			p = document.createElement('div')
			p.className = "TextBox4";
			txt = document.createTextNode(resultgetdop[k].name);
			p.appendChild(txt);
			document.getElementById('profileProgram').appendChild(p);
			k++;
		}
		document.getElementById('profileEdit').onclick = function() {classtoomProfileStudentEdit(result[i].id, result[i].name, result[i].fullname, result[i].sex,  result[i].birthday, result[i].group_of_risk, result[i].PFDO, result[i].family_id, resultedit.family_status, resultedit.material_condition, resultedit.educationMother, resultedit.motherStat, resultedit.educationFather, resultedit.fatherStat, result[i].class_ID, result, a);};
		document.getElementById("profileDelete").onclick = function() {enter12(newid, result[i].class_ID);};
		thisSt = newid+"st";
		let j = 0;
		var thisid;
		while (j<result.length){
			thisid=result[j].id+"st";
			document.getElementById(thisid).className = "TextStyleN";
			j++;
		}
		document.getElementById(a.id).className = "TextStyleY";
	}
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
	let i=0;
	while(i<resultgetclassesofuser.length){
		let result2 = resultgetclassesofuser[i].number +  " " + resultgetclassesofuser[i].letter;
		let p = document.createElement('div')
		p.className = 'leftPanel';
		p.value=resultgetclassesofuser[i].id;
		p.id=resultgetclassesofuser[i].id+"cl";
		let txt = document.createTextNode(result2)
		p.appendChild(txt);
		p.onclick = function() {enter4(this);};
		document.getElementById('ClList').appendChild(p);
		classes.push(resultgetclassesofuser[i].id);
		i++;
	}
}

async function enter3() {
	alert(classes);
}
//Вывод учеников класса
async function enter4(a) {
	ReactDOM.render(null, document.getElementById('SetSP'));
	if(document.getElementById('Students').innerHTML.trim().length != 0) {
		const deleteElement = document.querySelector("#Students");
		deleteElement.innerHTML = '';
	}
	let student = {
			class_ID:a.value,
		};
	let response = await fetch(port_find_students, {
		method: 'POST',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(student)
		});
	let result = await response.json();
	let i=0;
	while(i<result.length){
		let result2 = JSON.stringify(i+1 + ". " + result[i].fullname);
		var result3 = result2.substring(1, result2.length-1);
		let p = document.createElement('div')
		p.className = 'TextStyleN';
		p.id=result[i].id+"st";
		p.onclick = function() {enter(this, result);};
		let txt = document.createTextNode(result3)
		p.appendChild(txt);
		document.getElementById('Students').appendChild(p);
		i++;
	}
	let j=0;
	while(j<classes.length){
		var divv=((classes[j])+"cl");
		document.getElementById(divv).style.background = '#bcf3bd';
		j++;		
	}
	document.getElementById(a.id).style.background = "#8ccba1";
}

async function enter5() {
	document.getElementById('SetSP').style.display = "none";
}
//Удаление ученика
async function enter12(a, classid) {
	let stedit = {
	id:a,
	};
	let responsestdelete = await fetch(port_delete_st, {
	method: 'DELETE',
	headers: {
	Authorization: `Bearer ${localStorage.token}` ,
	'Content-Type': 'application/json;charset=utf-8'
	},
	body: JSON.stringify(stedit)
	});
	let resultstdelete = await responsestdelete.json();
	document.getElementById('SetSP').style.display = "none";
}
//Редактирование ученика
async function classtoomProfileStudentEdit(stid, name, fullname, sex, birthday, group_of_risk, PFDO, family_id, family_status, material_condition, educationMother, motherStat, educationFather, fatherStat, class_id, result, a) {
	ReactDOM.render(element8, document.getElementById('a'));
	ReactDOM.render(element4, document.getElementById('blockAllToEdit'));
	document.getElementById('profileStudentNameEdit').value = name;
	document.getElementById("profileStudentFIOEdit").value = fullname;
	switch(sex) {
		case 1:
		document.getElementById('profileStudentSexEdit').value = "женский";
		profileStudentSexEdit=1;
		break;
		case 2:
		document.getElementById('profileStudentSexEdit').value = "мужской";
		profileStudentSexEdit=2;
		break;
	}
	document.getElementById("profileStudentGroupOfRiskEdit").value = group_of_risk;
	document.getElementById("profileStudentBirthdayEdit").value = birthday;
	document.getElementById('profileStudentSexEdit').onchange = e => {enter8(e.target.value)};
	document.getElementById('profileStudentFamilysMoneyEdit').value = material_condition;
	flst=family_status;
	alert("familystatus: " + family_status);
	switch(family_status) {
		case 1:
		ReactDOM.render(element5, document.getElementById('profileStudentInformationAboutParentsEditContainer'));
		document.getElementById('profileStudentFamilyStatusEdit').value = "полная";
		document.getElementById("profileStudentInformationAboutParentsEdit").innerHTML = "Информация о родителях";
		document.getElementById('createStudentEducationLevelMother').value = educationMother;
		document.getElementById('createStudentWorkMother').value = motherStat;
		document.getElementById('createStudentEducationLevelFather').value = educationFather;
		document.getElementById('createStudentWorkFather').value = fatherStat;
		break;
		case 2:
		ReactDOM.render(element6, document.getElementById('profileStudentInformationAboutParentsEditContainer'));
		document.getElementById('profileStudentFamilyStatusEdit').value = "неполная";
		document.getElementById("profileStudentInformationAboutParentsEdit").innerHTML = "Информация о матери";
		document.getElementById('createStudentEducationLeveGuardian').value = educationMother;
		document.getElementById('createStudentWorkGuardian').value = motherStat;
		break;
		case 3:
		ReactDOM.render(element6, document.getElementById('profileStudentInformationAboutParentsEditContainer'));
		document.getElementById('profileStudentFamilyStatusEdit').value = "неполная";
		document.getElementById("profileStudentInformationAboutParentsEdit").innerHTML = "Информация об отце";
		document.getElementById('createStudentEducationLeveGuardian').value = educationFather;
		document.getElementById('createStudentWorkGuardian').value = fatherStat;
		break;
		case 4:
		ReactDOM.render(element7, document.getElementById('profileStudentInformationAboutParentsEditContainer'));
		document.getElementById('profileStudentFamilyStatusEdit').value = "неполная";
		document.getElementById("profileStudentInformationAboutParentsEdit").innerHTML = "Информация об опекуне";
		document.getElementById('createStudentEducationLeveGuardian').value = educationMother;
		document.getElementById('createStudentWorkGuardian').value = motherStat;
		break;
		case 5:
		ReactDOM.render(element7, document.getElementById('profileStudentInformationAboutParentsEditContainer'));
		document.getElementById('profileStudentFamilyStatusEdit').value = "неполная";
		document.getElementById("profileStudentInformationAboutParentsEdit").innerHTML = "Информация об опекуне";
		document.getElementById('createStudentEducationLeveGuardian').value = educationFather;
		document.getElementById('createStudentWorkGuardian').value = fatherStat;
		break;
	}
	document.getElementById('profileStudentPFDOEdit').value = PFDO;
	document.getElementById('profileStudentEditAccept').onclick = function() {
	if(flst==1){
		enter13(stid, document.getElementById('profileStudentNameEdit').value, document.getElementById('profileStudentFIOEdit').value, class_id, profileStudentSexEdit, document.getElementById("profileStudentBirthdayEdit").value, document.getElementById("profileStudentGroupOfRiskEdit").value, document.getElementById('profileStudentPFDOEdit').value, family_id, flst, document.getElementById('profileStudentFamilysMoneyEdit').value, document.getElementById('createStudentEducationLevelMother').value, document.getElementById('createStudentEducationLevelFather').value, document.getElementById('createStudentWorkMother').value, document.getElementById('createStudentWorkFather').value); ReactDOM.render(null, document.getElementById('a'));
		}
	else{
		enter14(stid, document.getElementById('profileStudentNameEdit').value, document.getElementById("profileStudentFIOEdit").value, class_id, profileStudentSexEdit, document.getElementById("profileStudentBirthdayEdit").value, document.getElementById("profileStudentGroupOfRiskEdit").value, document.getElementById('profileStudentPFDOEdit').value, family_id, flst, document.getElementById('profileStudentFamilysMoneyEdit').value, document.getElementById('createStudentEducationLeveGuardian').value, document.getElementById('createStudentWorkGuardian').value); ReactDOM.render(null, document.getElementById('a'));
		}
	};
	document.getElementById('profileStudentEditCancel').onclick = function() {ReactDOM.render(null, document.getElementById('a'));};
}
//Переделывание пола в int
async function enter8(a) {
	switch(a) {
		case 'женский':
		profileStudentSexEdit=1;
		break;
		case 'мужской':
		profileStudentSexEdit=2;
		break;
	}
}
//Редактирование семьи ученика
export async function enter10(a) {
	switch(a) {
		case 'полная':
		ReactDOM.render(element5, document.getElementById('profileStudentInformationAboutParentsEditContainer'));
		flst=1;
		break;
		case 'неполная':
		ReactDOM.render(element6, document.getElementById('profileStudentInformationAboutParentsEditContainer'));
		flst=2;
		break;
		case 'опекун':
		ReactDOM.render(element7, document.getElementById('profileStudentInformationAboutParentsEditContainer'));
		flst=4;
		break;
	}
}

//Редактирование ученика ввод полная семья
export async function enter13(stid, name2, fullname2, class_ID2, sex2, birthday2, group_of_risk2, PFDO2, family_id2, family_status2, material_condition2, educationMother2, educationFather2, createStudentWorkMother2, createStudentWorkFather2) {
	let stred = {
		id:stid,
		name:name2,
		fullname:fullname2,
		class_ID:class_ID2,
		birthday:birthday2,
		group_of_risk:group_of_risk2,
		sex:sex2,
		family_id:family_id2,
		PFDO:PFDO2
		};
	let responsestred = await fetch(port_edit_st, {
		method: 'PATCH',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(stred),
		});
	let resultstred = await responsestred.json();
	let fared = {
		id:family_id2,
		family_status:family_status2,
		material_condition:material_condition2,
		educationFather:educationFather2,
		educationMother:educationMother2,
		fatherStat:createStudentWorkFather2,
		motherStat:createStudentWorkMother2
		};
	let responsefared = await fetch(port_red_fa, {
		method: 'PATCH',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(fared),
		});
	let resultfared = await responsefared.json();
}
//Редактирование ученика ввод неполная семья
export async function enter14(stid, name2, fullname2, class_ID2, sex2, birthday2, group_of_risk2, PFDO2, family_id2, family_status2, material_condition2, educationOp2, createStudentWorkGuardian2) {
	let fared;
	let responsefared;
	let resultfared;
	let resultfared2
	let stred = {
		id:stid,
		name:name2,
		fullname:fullname2,
		class_ID:class_ID2,
		birthday:birthday2,
		group_of_risk:group_of_risk2,
		sex:sex2,
		family_id:family_id2,
		PFDO:PFDO2
		};
	let responsestred = await fetch(port_edit_st, {
		method: 'PATCH',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(stred),
		});
	let resultstred = await responsestred.json();
	switch(family_status2) {
		case 2:
		fared = {
			id:family_id2,
			family_status:family_status2,
			material_condition:material_condition2,
			educationMother:educationOp2,
			motherStat:createStudentWorkGuardian
			};
		responsefared = await fetch(port_red_fa, {
			method: 'PATCH',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(fared),
			});
		resultfared = await responsefared.json();
		break;
		case 3:
		fared = {
			id:family_id2,
			family_status:family_status2,
			material_condition:material_condition2,
			educationFather:educationOp2,
			fatherStat:createStudentWorkGuardian2,
			};
		responsefared = await fetch(port_red_fa, {
			method: 'PATCH',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(fared),
			});
		resultfared = await responsefared.json();
		break;
		case 4:
		fared = {
			id:family_id2,
			family_status:family_status2,
			material_condition:material_condition2,
			educationMother:educationOp2,
			motherStat:createStudentWorkGuardian
		};
		responsefared = await fetch(port_red_fa, {
			method: 'PATCH',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(fared),
			});
		resultfared = await responsefared.json();
		break;
		case 5:
		fared = {
			id:family_id2,
			family_status:family_status2,
			material_condition:material_condition2,
			educationFather:educationOp2,
			fatherStat:createStudentWorkGuardian2,
			};
		responsefared = await fetch(port_red_fa, {
			method: 'PATCH',
			headers: {
			Authorization: `Bearer ${localStorage.token}` ,
			'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(fared),
			});
		resultfared = await responsefared.json();
		break;
	}
}


export default ClassroomPage;