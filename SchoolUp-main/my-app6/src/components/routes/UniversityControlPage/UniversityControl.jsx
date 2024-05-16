import '../../../ProjectCSS.css';
import '../../../mavrCSS.css';
import ReactDOM from 'react-dom';
import React, { useState } from 'react';

import {TopPanelUniversity, LeftPanelOfControlUniversity} from "../../ui/NavigationPanels/NavigationPanels.jsx";
import {OCl, OVR, OClNORM2} from "../../../See.js";
import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx';
import {convertToHtml} from "mammoth/mammoth.browser";
import { PDFDocument, rgb } from 'pdf-lib';
import ExcelJS from 'exceljs';

let port_reg_cl = "http://localhost:5500/API/class/";
let port_find_students = "http://localhost:5500/API/student/:id";


function ReportManagerPage() {
	const criteria = {
		"Студент": [
			"Общее число студентов",
			"Число студентов, которым оказывается материальная помощь",
			"Число студентов, проживающих в общежитии"
		],
		"Внеучебное событие": [
			"Общее число событий",
			"Число студентов, участвующих в событии"
		],
		"Расселение в общежития": [
			"Число студентов, проживающих в общежитии"
		],
		"Материальная помощь": [
			"Число студентов, которым оказывается материальная помощь"
		],
		"Общежитие": [
			"Число студентов, проживающих в общежитии",
			"Общее число комнат в общежитии",
			"Число комнат с определенным числом свободных мест",
			"Число комнат с определенным общим числом мест в комнате"
		],
		"Факультет": [
			"Общее число студентов на факультете",
			"Число студентов, проживающих в общежитии",
			"Число студентов, которым оказывается материальная помощь"
		],
		"Группа": [
			"Общее число студентов в группе",
			"Число студентов, проживающих в общежитии",
			"Число студентов, которым оказывается материальная помощь"
		]
	};

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
		"Институт биологии,экологии,почвоведения,сельского и лесного хозяйства (Биологический институт)": [
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

	const tabs = ["Студенты", "Внеучебная работа", "Материальная помощь", "Расселение в общежития", "Менеджер отчётов", "Управление системой"];

	const dormitories = [
		"",
		"Cтуденческий жилой комплекс «Парус» (№ 9)",
		"Студенческий жилой комплекс «Маяк»",
		"Общежитие №5",
		"Общежитие №6",
		"Общежитие №3",
		"Общежитие №7",
		"Общежитие №8"
	];

	const sideTabs = {
        "Внеучебная работа": [
            "Внеучебные события",
			"Цели внеучебной работы",
			"Архив событий"
        ],
        "Материальная помощь": [
            "Документы",
			"Внести документ",
			"Архив документов"
        ],
		"Расселение в общежития": [
            "Документы",
			"Внести документ",
			"Архив документов"
        ],
        "Менеджер отчётов": [
            "Составление отчетов",
            "Архив"
        ],
        "Управление системой": [
            "Основное",
			"Внеучебные планы",
			"Группы",
			"Внеучебные события",
			"Отчеты"
        ]
    };

	const samples = [
		"Шаблон 1",
		"Шаблон 2",
		"Шаблон 3"
	];

	const studentFields = [
		"Материальная помощь",
		"Расселение в общежития"
	];

	const [selectedTab, setSelectedTab] = React.useState(tabs[0]);
    const [roleName, setRoleName] = React.useState("");
	const [selectedSample, setSelectedSample] = useState(samples[0]);
	const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedCriteria, setSelectedCriteria] = useState([]);
    const [selectedFinalItems, setSelectedFinalItems] = useState([]);
    const [selectedItemToRemove, setSelectedItemToRemove] = useState('');
    const [selectedItemsToRemove, setSelectedItemsToRemove] = useState([]);
	const [selectedSamples, setSelectedSamples] = useState([studentFields[0]]);
	const [selectedOptions, setSelectedOptions] = useState({}); 

    const handleCategoryChange = (event) => {
        const selected = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedCategories(selected);
    };

	const handleSelectionChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedSamples(selectedOptions); // Обновляем состояние с выбранными опциями
    };

    const handleCriteriaChange = (event) => {
        const selected = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedCriteria(selected);
        updateFinalItems(selected);
    };

    const updateFinalItems = (newItems) => {
        const uniqueNewItems = newItems.filter(item => !selectedFinalItems.includes(item));
        setSelectedFinalItems(prevItems => [...prevItems, ...uniqueNewItems]);
    };

    const handleFinalItemsSelection = (event) => {
        const selected = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedItemsToRemove(selected);
    };

    const handleRemoveSelected = () => {
        setSelectedFinalItems(selectedFinalItems.filter(item => !selectedItemsToRemove.includes(item)));
    };

	const handleCheckboxChange = (category, value, isChecked) => {
        const updatedOptions = { ...selectedOptions };
        if (isChecked) {
            if (updatedOptions[category]) {
                updatedOptions[category].add(value);
            } else {
                updatedOptions[category] = new Set([value]);
            }
        } else {
            updatedOptions[category].delete(value);
            if (updatedOptions[category].size === 0) {
                delete updatedOptions[category];
            }
        }
        setSelectedOptions(updatedOptions);
    };

	window.onload = function() {
			document.getElementById('controlUsersUniversity').className = "topbutton-page-university";
			document.getElementById('commonUniversityTab').className = "leftPanelUniversity_clicked";
			//enter();
		};
	return (
		<div className="pageUniversity">
			< TopPanelUniversity />
			<div className="mavr">
				< LeftPanelOfControlUniversity />
					<div className="workspace">
						<div id="myModal" class="modal">
							<div class="modal-content">
								<span class="close">&times;</span>
								<div id="docContent"></div>
							</div>
						</div>
						<div className="report-space-university-control">
							<div>
								<div className="text-info"><p className="text-main">Создание новой роли:</p></div>
								<label>Название роли:</label>
								<input type="text" value={roleName} onChange={(e) => setRoleName(e.target.value)} />
								<div className="block-horizontal-flex-show-sample-control">
									<div className="block-vertical-flex">
										<label className="text-main">Доступные вкладки:</label>
										<select className="listboxClass-accessible-tab" multiple size={6} onChange={(e) => setSelectedTab(e.target.value)}>
											{tabs.map(tab => (
												<option key={tab} value={tab}>{tab}</option>
											))}
										</select>
										<label className="text-main">Доступные боковые вкладки:</label>
										{Object.entries(sideTabs).map(([key, values]) => (
											<div key={key} className="block-vertical-flex">
												<label className="label-main">{key}</label>
												{values.map(value => (
													<div key={value}>
														<label>
															{value}
															<input
																type="checkbox"
																checked={selectedOptions[key] && selectedOptions[key].has(value)}
																onChange={(e) => handleCheckboxChange(key, value, e.target.checked)}
															/>
														</label>
													</div>
												))}
											</div>
										))}
									</div>
									<div className="block-vertical-flex">
										<label className="text-main">Доступные критерии:</label>
										{Object.entries(criteria).map(([key, values]) => (
											<div key={key} className="block-vertical-flex">
												<label className="label-main">{key}</label>
												{values.map(value => (
													<div key={value}>
														<label>
															{value} {}
															<input
																type="checkbox"
																checked={selectedOptions[key] && selectedOptions[key].has(value)}
																onChange={(e) => handleCheckboxChange(key, value, e.target.checked)}
															/>
														</label>
													</div>
												))}
											</div>
										))}
									</div>
									<div className="block-vertical-flex">
										<label className="text-main">Доступные шаблоны:</label>
										<select className="listboxClass-accessible-tab" multiple size={8} id="sampleSelect"
											value={selectedSamples}
											onChange={handleSelectionChange}>
											{samples.map((sample, index) => (
												<option key={index} value={sample}>
													{sample}
												</option>
											))}
										</select>
									</div>
								</div>
								<div className="text-info"><p className="text-main">Работа со студентами:</p></div>
								<label className="text-main">Информация о студентах, доступная пользователю:</label>
								<div className="block-horizontal-flex-show-sample-control">
									<div className="block-vertical-flex">
										<label>
											Все:
											<input type="checkbox"></input>
										</label>
										<label>
											По факультетам:
											<input type="checkbox"></input>
										</label>
										<label>
											По группам:
											<input type="checkbox"></input>
										</label>
									</div>
									<div className="block-vertical-flex">
										<div className="block-horizontal-flex">
											<select className="listboxClass-undercriteria" multiple size={7} onChange={handleCategoryChange}>
												{Object.keys(facultiesGroups).map(category => (
													<option key={category} value={category}>{category}</option>
												))}
											</select>
											<select className="listboxClass-group" multiple size={3} onChange={handleCriteriaChange}>
												{selectedCategories.flatMap(category => facultiesGroups[category] || []).map(criteriaItem => (
													<option key={criteriaItem} value={criteriaItem}>{criteriaItem}</option>
												))}
											</select>
										</div>
									</div>
									<div className="block-vertical-flex">
										<label>Доступные группы:</label>
										<div className="block-horizontal-flex">
											<select className="listboxClass-group" multiple value={selectedItemsToRemove} onChange={handleFinalItemsSelection}>
												{selectedFinalItems.map(item => (
													<option key={item} value={item}>{item}</option>
												))}
											</select>
											<button onClick={handleRemoveSelected}>Убрать</button>
										</div>
									</div>
								</div>
								<div className="text-info"><p className="text-main">Доступная информация в карточке студента:</p></div>
								<select className="listboxClass-accessible-tab" multiple size={2} id="sampleSelect"
									value={selectedSamples}
									onChange={handleSelectionChange}>
									{studentFields.map((sample, index) => (
										<option key={index} value={sample}>
											{sample}
										</option>
									))}
								</select>
								<div className="text-info"><p className="text-main">Внеучебная работа:</p></div>
								<label className="text-main">Внеучебные события, доступные пользователю:</label>
								<div className="block-horizontal-flex-show-sample-control">
									<div className="block-vertical-flex">
										<label>
											Все:
											<input type="checkbox"></input>
										</label>
										<label>
											По факультетам:
											<input type="checkbox"></input>
										</label>
										<label>
											По группам:
											<input type="checkbox"></input>
										</label>
										<label>
											Только свои:
											<input type="checkbox"></input>
										</label>
									</div>
									<div className="block-vertical-flex">
										<div className="block-horizontal-flex">
											<select className="listboxClass-undercriteria" multiple size={7} disabled onChange={handleCategoryChange}>
												{Object.keys(facultiesGroups).map(category => (
													<option key={category} value={category}>{category}</option>
												))}
											</select>
											<select className="listboxClass-group" multiple size={3} disabled>
											</select>
										</div>
									</div>
									<div className="block-vertical-flex">
										<label>Доступные группы:</label>
										<div className="block-horizontal-flex">
											<select className="listboxClass-group" multiple size={3} disabled>
											</select>
											<button disabled>Убрать</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

		</div>
  );	
}


export default ReportManagerPage;