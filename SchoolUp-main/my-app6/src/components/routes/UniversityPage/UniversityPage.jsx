import '../../../mavrCSS.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { TopPanelUniversity } from "../../ui/NavigationPanels/NavigationPanels.jsx";
import { enter6, enter9 } from "../../ui/ClassroomLayouts/ClassroomCreateStudent/ClassroomCreateStudent.jsx";
import { ProfileOfStudentUniversity, ClStudFaPol, ClStudFaNepol, StudProfRed, NewStFaPol, NewStFaNepol, NewStFaOp, Overlay, AdditionalEducation } from "../../../See.js";

const facultiesGroups = {
  "Автономная образовательная программа TISP": [
    "862001",
    "862101",
    "862201",
    "862301"
  ],
  "Автономная образовательная программа Анализ естественного языка (NLP) в лингвистике и IT": [
    "722303",
    "722304"
  ],
  "Автономная образовательная программа Биофотоника": [
    "902211",
    "902311",
    "902411"
  ],
  "Автономная образовательная программа Дата-аналитика для бизнеса": [
    "722301"
  ],
  "Автономная образовательная программа Евразийская интеграция: политика, право, торгово-экономическое взаимодействие": [
    "282204",
    "282304"
  ],
  "Автономная образовательная программа Изучение Сибири и Арктики": [
    "282201",
    "282301"
  ],
  "Автономная образовательная программа Компьютерная и когнитивная лингвистика": [
    "132283",
    "132383"
  ],
  "Автономная образовательная программа Устойчивое развитие и управление территорией": [
    "282202"
  ],
  "Геолого-географический факультет": [
    "022001",
    "022002",
    "022003",
    "022004",
    "022005",
    "022006",
    "022007",
    "022101",
    "022102",
    "022103"
  ],
  "Институт биологии, экологии, почвоведения, сельского и лесного хозяйства (Биологический институт)": [
    "00000",
    "012001",
    "012002",
    "012003",
    "012004",
    "012005",
    "012006",
    "012007",
    "012101",
    "012102"
  ]
};

const studentsData = {
  "022002": [
    "Иванов Иван Иванович",
    "Петров Петр Петрович",
    "Сидоров Сидор Сидорович",
    "Кузнецов Николай Николаевич",
    "Смирнов Сергей Сергеевич"
  ],
  // Другие группы и студенты могут быть добавлены здесь
};

const renderProfileOfStudentUniversity = <ProfileOfStudentUniversity />;

function UniversityPage() {
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [students, setStudents] = useState([]);

  window.onload = function() {
    document.getElementById('university_studs').className = "topbutton-page-university";
  };

  const handleFacultyChange = (event) => {
    setSelectedFaculty(event.target.value);
    setSelectedGroup("");
    setStudents([]);
  };

  const handleGroupChange = (event) => {
    const group = event.target.value;
    setSelectedGroup(group);
    if (group === "022002") {
      setStudents(studentsData["022002"]);
    } else {
      setStudents([]);
    }
  };

  return (
    <div className="pageUniversity">
      <TopPanelUniversity />
      <div className="mavr">
        <div id="aaa" className="classes-space-university">
        	<div className="student-list">
				<div className="elements-to-row">
				<p className="text-main">Институт</p>
				<div className="elements-to-center">
					<select id="faculty-select" value={selectedFaculty} onChange={handleFacultyChange}>
					<option value="">Выберите институт</option>
					{Object.keys(facultiesGroups).map((faculty) => (
						<option key={faculty} value={faculty}>{faculty}</option>
					))}
					</select>
				</div>
				</div>
				<div className="elements-to-row">
				<p className="text-main">Группа</p>
				<div className="elements-to-center">
					<select id="group-select" value={selectedGroup} onChange={handleGroupChange} disabled={!selectedFaculty}>
					<option value="">Выберите группу</option>
					{selectedFaculty && facultiesGroups[selectedFaculty].map((group) => (
						<option key={group} value={group}>{group}</option>
					))}
					</select>
				</div>
				</div>
				<p className="text-main">Состав группы</p>
				<div className="elements-to-row-card">
					<div id="Students">
						{students.map((student, index) => (
						<p key={index}>{student}</p>
						))}
					</div>
					<div id="SetSP" className="indent">
						<ProfileOfStudentUniversity />
					</div>
				</div>
        	</div>
        </div>
      </div>
    </div>
  );
}

export default UniversityPage;
