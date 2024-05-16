import '../../../mavrCSS.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { TopPanelUniversity } from "../../ui/NavigationPanels/NavigationPanels.jsx";
import { ProfileOfStudentUniversity } from "../../../See.js";

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
    {
      fio: "Иванов Иван Иванович",
      gender: "Мужской",
      age: 20,
      program: "Магистратура",
      citizenship: "Россия",
      score: 85,
      dormitory: "Общежитие 1",
      period: "01.09.2022 - 01.07.2023",
      document: "Договор №123",
      helpPoint: "Пункт 1",
      applicationDate: "01.09.2022",
      helpDocument: "Заявление №456"
    },
    {
      fio: "Петров Петр Петрович",
      gender: "Мужской",
      age: 21,
      program: "Магистратура",
      citizenship: "Россия",
      score: 90,
      dormitory: "Общежитие 2",
      period: "01.09.2022 - 01.09.2023",
      document: "Договор №124",
      helpPoint: "Пункт 2",
      applicationDate: "01.09.2022",
      helpDocument: "Заявление №457"
    },
    {
      fio: "Сидоров Сидор Сидорович",
      gender: "Мужской",
      age: 22,
      program: "Магистратура",
      citizenship: "Россия",
      score: 88,
      dormitory: "Общежитие 3",
      period: "01.09.2022 - 01.07.2023",
      document: "Договор №125",
      helpPoint: "Пункт 3",
      applicationDate: "01.09.2022",
      helpDocument: "Заявление №458"
    },
    {
      fio: "Кузнецов Николай Николаевич",
      gender: "Мужской",
      age: 23,
      program: "Магистратура",
      citizenship: "Россия",
      score: 87,
      dormitory: "Общежитие 4",
      period: "01.09.2022 - 01.07.2023",
      document: "Договор №126",
      helpPoint: "Пункт 4",
      applicationDate: "01.09.2022",
      helpDocument: "Заявление №459"
    },
    {
      fio: "Смирнов Сергей Сергеевич",
      gender: "Мужской",
      age: 24,
      program: "Магистратура",
      citizenship: "Россия",
      score: 89,
      dormitory: "Общежитие 5",
      period: "01.09.2022 - 01.07.2023",
      document: "Договор №127",
      helpPoint: "Пункт 5",
      applicationDate: "01.09.2022",
      helpDocument: "Заявление №460"
    }
  ]
  // Другие группы и студенты могут быть добавлены здесь
};

function UniversityPage() {
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  window.onload = function() {
    document.getElementById('university_studs').className = "topbutton-page-university";
  };

  const handleFacultyChange = (event) => {
    setSelectedFaculty(event.target.value);
    setSelectedGroup("");
    setStudents([]);
    setSelectedStudent(null);
  };

  const handleGroupChange = (event) => {
    const group = event.target.value;
    setSelectedGroup(group);
    if (group in studentsData) {
      setStudents(studentsData[group]);
    } else {
      setStudents([]);
    }
    setSelectedStudent(null);
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
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
            <p className="profileName">Состав группы</p>
			<div className="elements-to-row-card" style={{ display: "flex" }}>
			<div id="Students" style={{ flex: 1 }}>
				{students.map((student, index) => (
					<div key={index} className={selectedStudent === student ? "profileNameClicked" : "profileName"} onClick={() => handleStudentClick(student)} style={{ marginBottom: "8px" }}>
					{student.fio}
					</div>
				))}
			</div>
					<div id="SetSP" className="indent" style={{ marginLeft: "auto" }}>
					{selectedStudent && (
					<ProfileOfStudentUniversity
						student={selectedStudent}
						faculty={selectedFaculty}
					/>
					)}
				</div>
			</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UniversityPage;