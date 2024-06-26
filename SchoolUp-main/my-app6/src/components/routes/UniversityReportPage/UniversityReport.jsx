import '../../../ProjectCSS.css';
import '../../../mavrCSS.css';
import ReactDOM from 'react-dom';
import React from 'react';

import {TopPanelUniversity, LeftPanelOfReportManagerUniversity} from "../../ui/NavigationPanels/NavigationPanels.jsx";
import {OCl, OVR, OClNORM2} from "../../../See.js";
import { Document, Packer, Paragraph, TextRun, AlignmentType} from 'docx';
import {convertToHtml} from "mammoth/mammoth.browser";
import { PDFDocument, rgb } from 'pdf-lib';
import ExcelJS from 'exceljs';

let port_reg_cl = "http://localhost:5500/API/class/";
let port_find_students = "http://localhost:5500/API/student/:id";

const element = <OCl />;
const element2 = <OVR />;
let flag = false;

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
		"Общежитие": [
			"Общее число студентов, проживающих в общежитии",
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
	const events = ["", "Студенческая весна, 22.03.23"];
	const faculties = ["", "Институт прикладной математики и компьютерных наук"];
	const groups = ["", "932209", "932210", "932211"];
	const samples = [
		"Шаблон 1",
		"Шаблон 2",
		"Шаблон 3"
	];
	const [selectedCriterion, setSelectedCriterion] = React.useState("");
	const [subCriteria, setSubCriteria] = React.useState([]);
	const [selectedSubCriterion, setSelectedSubCriterion] = React.useState([]);
	const [selectedEvent, setSelectedEvent] = React.useState("");
	const [isEventSelectEnabled, setIsEventSelectEnabled] = React.useState(false);
	const [isNumericValueEnabled, setIsNumericValueEnabled] = React.useState(false);
	const [isTypeSelectEnabled, setIsTypeSelectEnabled] = React.useState(false);
	const [numericValue, setNumericValue] = React.useState("");
	const [selectedDormitory, setSelectedDormitory] = React.useState("");
	const [isDormitorySelectEnabled, setIsDormitorySelectEnabled] = React.useState(false);
	const [selectedFaculty, setSelectedFaculty] = React.useState("");
	const [isFacultySelectEnabled, setIsFacultySelectEnabled] = React.useState(false);
	const [selectedGroup, setSelectedGroup] = React.useState("");
	const [isGroupSelectEnabled, setIsGroupSelectEnabled] = React.useState(false);
	const [todayDate] = React.useState(new Date().toISOString().slice(0, 10));
	const [entries, setEntries] = React.useState([]);
    const [startDate, setStartDate] = React.useState(new Date().toISOString().slice(0, 10));
    const [endDate, setEndDate] = React.useState(new Date().toISOString().slice(0, 10));
    const [selectedType, setSelectedType] = React.useState("количественный");
    const [selectedIndexes, setSelectedIndexes] = React.useState([]);
	const [selectedSample, setSelectedSample] = React.useState("");
	const [isSampleSelectEnabled, setIsSampleSelectEnabled] = React.useState(true); // предполагаем, что селектор изначально активен

	/*document.addEventListener('DOMContentLoaded', function() {
		document.getElementById("generate").addEventListener("click", () => generateWordDocument(entries), false);
	});*/
	

	const handleAddEntry = () => {
        const newEntry = {
            Criteria: selectedSubCriterion.join(", "),
            Number: isNumericValueEnabled ? numericValue : "",
            DataOn: startDate,
            DataOff: endDate,
            Type: selectedType,
            Place: entries.length + 1
        };
        setEntries(prevEntries => [...prevEntries, newEntry]);

        // Сброс состояний
        setSelectedCriterion("");
        setSubCriteria([]);
        setSelectedSubCriterion([]);
        setIsNumericValueEnabled(false);
        setNumericValue("");
        setStartDate(new Date().toISOString().slice(0, 10));
        setEndDate(new Date().toISOString().slice(0, 10));
        setSelectedType("количественный");
        setIsTypeSelectEnabled(false);
    };

	const handleSelectChange = (event) => {
        setSelectedIndexes([...event.target.selectedOptions].map(option => parseInt(option.value)));
    };

    const moveUp = () => {
        if (selectedIndexes.length === 1 && selectedIndexes[0] > 0) {
            const index = selectedIndexes[0];
            setEntries(currentEntries => {
                const newEntries = [...currentEntries];
                [newEntries[index - 1], newEntries[index]] = [newEntries[index], newEntries[index - 1]];
                return newEntries;
            });
        }
    };

    const moveDown = () => {
        if (selectedIndexes.length === 1 && selectedIndexes[0] < entries.length - 1) {
            const index = selectedIndexes[0];
            setEntries(currentEntries => {
                const newEntries = [...currentEntries];
                [newEntries[index], newEntries[index + 1]] = [newEntries[index + 1], newEntries[index]];
                return newEntries;
            });
        }
    };

	const removeSelected = () => {
		// Удаление выбранных элементов
		const newEntries = entries.filter((_, index) => !selectedIndexes.includes(index));
		// Переназначение порядковых номеров
		const updatedEntries = newEntries.map((entry, index) => ({
			...entry,
			Place: index + 1 // Новые порядковые номера начинаются с 1
		}));
		setEntries(updatedEntries);
		setSelectedIndexes([]); // Сброс выбранных индексов
	};

    const testEntries = () => {
        console.log(entries);
    };


	const handleCriterionChange = (event) => {
        const value = event.target.value;
        setSelectedCriterion(value);
        setSubCriteria(criteria[value] || []);
    };

    const handleSubCriterionChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
        setSelectedSubCriterion(selectedOptions);

		setNumericValue("");
		setSelectedEvent("");
		setSelectedDormitory("");
		setSelectedFaculty("");
		setSelectedGroup("");

        const enableNumericValue = selectedOptions.some(option =>
			["Число комнат с определенным числом свободных мест",
			 "Число комнат с определенным общим числом мест в комнате"].includes(option));
		setIsNumericValueEnabled(enableNumericValue);

		const enableEventSelect = selectedOptions.includes("Число студентов, участвующих в событии");
		setIsEventSelectEnabled(enableEventSelect);

		const enableDormitorySelect = selectedOptions.some(option =>
			["Общее число студентов, проживающих в общежитии",
			"Общее число комнат в общежитии",
			"Число комнат с определенным числом свободных мест",
			"Число комнат с определенным общим числом мест в комнате"].includes(option));
		setIsDormitorySelectEnabled(enableDormitorySelect);
	
		const enableFacultySelect = selectedOptions.some(option =>
			["Общее число студентов на факультете",
			"Число студентов, проживающих в общежитии",
			"Число студентов, которым оказывается материальная помощь"].includes(option));
		setIsFacultySelectEnabled(enableFacultySelect);
	
		const enableGroupSelect = selectedOptions.some(option =>
			["Общее число студентов в группе",
			"Число студентов, проживающих в общежитии",
			"Число студентов, которым оказывается материальная помощь"].includes(option));
		setIsGroupSelectEnabled(enableGroupSelect);

    };

    const isAddButtonDisabled = selectedSubCriterion.length === 0 || (isNumericValueEnabled && !numericValue);

	const sample = [
		{
			text: "Приказ",
			font: "Times New Roman",
			size: 16,
			alignment: "center",
			bold: true
		},
		{
			text: "[Отчет]",
			font: "Times New Roman",
			size: 12,
			alignment: "left",
			bold: false
		},
		{
			text: "Томск, 2024",
			font: "Times New Roman",
			size: 12,
			alignment: "center",
			bold: false
		}
	];

	window.onload = function() {
			document.getElementById('reportManagerEmploymentUniversity').className = "topbutton-page-university";
			document.getElementById('reportUniversityTab').className = "leftPanelUniversity_clicked";
			//enter();
		};
	return (
		<div className="pageUniversity">
			< TopPanelUniversity />
			<div className="mavr">
				< LeftPanelOfReportManagerUniversity />
					<div className="workspace-report-university">
						<div id="myModal" class="modal">
							<div class="modal-content">
								<span class="close">&times;</span>
								<div id="docContent"></div>
							</div>
						</div>
						<div className="report-space-university">
							<div>
								<div className="text-info"> 
									<p className="text-main-changed">Составить отчеты:</p>
								</div>
								<hr></hr>
								<div className="text-info"> 
									<p className="text-main-changed-smaller">Выбор критериев:</p>
								</div>
								<div className="select-container">
									<div className="block-horizontal-flex">
										<select id="criteriaSelect" onChange={handleCriterionChange} className="listboxClass-criteria" multiple size="5">
											{Object.keys(criteria).map(criterion => (
												<option key={criterion} value={criterion}>{criterion}</option>
											))}
										</select>
										<select id="subCriteriaSelect" onChange={handleSubCriterionChange} className="listboxClass-undercriteria" multiple size="4">
											{subCriteria.map(subCriterion => (
												<option key={subCriterion} value={subCriterion}>{subCriterion}</option>
											))}
										</select>
									</div>
									<div className="text-info"> 
										<p className="text-main-changed-smaller">Параметры:</p>
									</div>
									<div className="block-horizontal-flex">
										<div className="date-container">
											<label className="block-vertical-flex">
												Дата:
												<input type="date" id="startDate" defaultValue={todayDate} />
											</label>
											<label>
												Детальный:
												<input type="checkbox"></input>
											</label>
											<label>
												Скачать отчет:
												<input type="checkbox"></input>
											</label>
										</div>
										<div className="block-vertical-flex-report-parameters">
											<label className="block-horizontal-flex-report-right">
												Число мест:
												<input type="number" id="numericValue" value={numericValue} onChange={(e) => setNumericValue(e.target.value)} disabled={!isNumericValueEnabled} />
											</label>
											<label className="block-horizontal-flex-report-right">
												Событие:
												<select id="eventSelect"  onChange={(e) => setSelectedEvent(e.target.value)} className="listboxClass" disabled={!isEventSelectEnabled}>
													{events.map(event => (
														<option key={event} value={event}>{event}</option>
													))}
												</select>
											</label>
											<label className="block-horizontal-flex-report-right">
												Общежитие:
												<select id="dormitorySelect"  onChange={(e) => setSelectedDormitory(e.target.value)} className="listboxClass" disabled={!isDormitorySelectEnabled}>
													{dormitories.map(dormitory => (
														<option key={dormitory} value={dormitory}>{dormitory}</option>
													))}
												</select>
												</label>
											<label className="block-horizontal-flex-report-right">
												Факультет:
												<select id="facultySelect" onChange={(e) => setSelectedFaculty(e.target.value)} className="listboxClass" disabled={!isFacultySelectEnabled}>
													{faculties.map(faculty => (
														<option key={faculty} value={faculty}>{faculty}</option>
													))}
												</select>
											</label>
											<label className="block-horizontal-flex-report-right">
												Группа:
												<select id="groupSelect" onChange={(e) => setSelectedGroup(e.target.value)} className="listboxClass" disabled={!isGroupSelectEnabled}>
													{groups.map(group => (
														<option key={group} value={group}>{group}</option>
													))}
												</select>
											</label>
										</div>
									</div>
									<div className="block-horizontal-flex">
										<button onClick={handleAddEntry} disabled={!selectedSubCriterion.length || (isNumericValueEnabled && !numericValue)}>Добавить</button>
									</div>
									<div className="block-horizontal-flex-padding">
										<div className='block-vertical-up-down-delete'>
											<div className='block-vertical-up-down'>
												<button onClick={moveUp} disabled={selectedIndexes.length !== 1 || selectedIndexes[0] === 0}>Вверх</button>
												<button onClick={moveDown} disabled={selectedIndexes.length !== 1 || selectedIndexes[0] === entries.length - 1}>Вниз</button>
											</div>
											<button onClick={removeSelected} disabled={selectedIndexes.length === 0}>Убрать</button>
										</div>
										<select className="listboxClass-undercriteria" multiple size="8" onChange={handleSelectChange} value={selectedIndexes}>
											{entries.map((entry, index) => (
												<option key={index} value={index}>{entry.Criteria}</option>
											))}
										</select>
										<button hidden onClick={testEntries}>Test</button>
									</div>
									<div className="block-horizontal-flex-show-sample">
										<select id="SampleSelect" onChange={(e) => setSelectedSample(e.target.value)} className="listboxClass">
											{samples.map(type => (
												<option key={type} value={type}>{type}</option>
											))}
										</select>
										<button  onClick={() => showSample(sample)}>Предпросмотр</button>
									</div>
									<div>
										<button onClick={() => generateWordDocument(entries)}>Составить отчет</button>
									</div>
									<div>
									<button onClick={() => combinedFunction(sample, entries, 1)}>Test3</button>
									<textarea id="docTextArea" name="freeform" rows="10" cols="50">
									</textarea>
								</div>
								</div>
								
								<div className="text-info">
									<p className="text-main"> 
										Класс:
										<select id="clSel" className="student-input"> </select>
									</p>
								</div>
								<OClNORM2 />
								<div>
									<button className="profile-button"><img src="https://i.ibb.co/tDWy41D/create-document.png" className="profile-button2"></img></button> 
								</div>
							</div>
						</div>
					</div>
				</div>

		</div>
  );	
}

/*document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("generate").addEventListener("click", generateWordDocument, false);
});*/

async function countNonEmptyLinesAndNewlines() {
    const text = document.getElementById('docTextArea').value;
    const lines = text.split('\n');

    // Подготовим объект для хранения результатов
    const result = {
        nonEmptyLinesCount: 0,
        newlinesAfterLines: [],
		nonEmptyLinesText: []
    };

    // Переменная для подсчета переносов строк после непустой строки
    let newlineCount = 1;
    
    lines.forEach((line, index) => {
        // Проверяем, является ли текущая строка непустой
        if (line.trim() !== '') {
            result.nonEmptyLinesCount += 1; // Учитываем непустую строку
            result.nonEmptyLinesText.push(line.trim()); // Добавляем текст непустой строки в массив

            // Если это непустая строка и после предыдущей непустой строки были переносы,
            // записываем количество переносов и обнуляем счетчик переносов
            if (newlineCount > 0) {
                result.newlinesAfterLines.push(newlineCount);
                newlineCount = 1;
            }
        } else {
            // Если строка пуста, увеличиваем счетчик переносов
            newlineCount += 1;
        }
    });

    // Добавляем оставшиеся переносы строк после последней непустой строки, если таковые имеются
    if (newlineCount > 0) {
        result.newlinesAfterLines.push(newlineCount);
    }

    return result;
}


async function generateWordDocument(entries) {
    const textAreaContent = document.getElementById('docTextArea').value; // Получаем текст пользователя

    // Форматируем и отображаем данные в модальном окне
    const modalContent = document.getElementById("docContent");
    const formattedData = entries.map(entry => formatEntry(entry)).join("\n");
    const combinedContent = formattedData + "\n\n" + textAreaContent; // Комбинируем текст с данными JSON
	modalContent.innerHTML = combinedContent.replace(/\n/g, '<br>');
	document.getElementById("myModal").style.display = "block";
    
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Создание Word документа с комбинированным содержимым
    const paragraphs = combinedContent.split('\n').map(line => {
        if (line.trim() === '') {
            // Создаем параграф с переносом строки для пустых строк
            return new Paragraph('');
        } else {
            // Для непустых строк создаем параграф с текстом
            return new Paragraph({
                children: [
                    new TextRun({
                        text: line,
                        break: 1 // Здесь добавляем перенос строки после каждой строки
                    })
                ]
            });
        }
    });
    
    const doc = new Document({
        sections: [{
            properties: {},
            children: paragraphs
        }]
    });

    // Генерация Blob из документа и его скачивание
    const blob = await Packer.toBlob(doc);
    saveDocument(blob, "Отчет.docx");

	// Генерация Excel файла
	const workbook = new ExcelJS.Workbook();
	const worksheet = workbook.addWorksheet("Numbers");

	// Добавление данных в Excel
	const numbersInWords = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
	numbersInWords.forEach((item, index) => {
		worksheet.addRow([item]);
	});

	// Настройка заголовков
	worksheet.getRow(1).font = { bold: true };

	// Сохранение в Blob и инициация скачивания
	const buffer = await workbook.xlsx.writeBuffer();
	const blob2 = new Blob([buffer], {
		type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
	});
	saveDocument(blob2, "numbers.xlsx");
}

async function combinedFunction(data, entries, replacePosition) {
    const modalContent = document.getElementById("docContent");
    const textAreaContent = document.getElementById('docTextArea').value; // Получаем текст пользователя
    let combinedContent = '';
    let documentContent = [];

    // Обработка до точки замены
    data.slice(0, replacePosition).forEach(item => {
        combinedContent += formatHTML(item);
        documentContent.push(formatParagraph(item));
    });

    // Получаем стиль элемента, который заменяем
    const baseStyle = data[replacePosition];

    // Обработка entries и текста пользователя с применением стиля заменяемого элемента
    const formattedEntries = entries.map(entry => formatEntry(entry)).join("\n");
    const entriesContent = formattedEntries.replace(/\n/g, '<br>') + "<br><br>" + textAreaContent.replace(/\n/g, '<br>') + "<br><br>";
    combinedContent += `<div style='font-family: ${baseStyle.font}; font-size: ${baseStyle.size}px; text-align: ${baseStyle.alignment}; font-weight: ${baseStyle.bold ? 'bold' : 'normal'};'>${entriesContent}</div>`;

    formattedEntries.split('\n').concat(textAreaContent).forEach(line => {
        documentContent.push(new Paragraph({
            children: [new TextRun({
                text: line,
                bold: baseStyle.bold,
                font: baseStyle.font,
                size: baseStyle.size * 2
            })],
            alignment: getAlignment(baseStyle.alignment)
        }));
    });

    // Обработка после точки замены
    data.slice(replacePosition + 1).forEach(item => {
        combinedContent += formatHTML(item);
        documentContent.push(formatParagraph(item));
    });

    // Вывод в HTML
    modalContent.innerHTML = combinedContent;
    document.getElementById("myModal").style.display = "block";
    setupModal();

    // Создаем и скачиваем документ Word
    const doc = new Document({
        sections: [{
            properties: {},
            children: documentContent
        }]
    });

    const blob = await Packer.toBlob(doc);
    saveDocument(blob, "Отчет.docx");
}

function setupModal() {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    };
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

function formatHTML(item) {
    return `<div style='font-family: ${item.font}; font-size: ${item.size}px; text-align: ${item.alignment}; font-weight: ${item.bold ? 'bold' : 'normal'};'>${item.text}</div><br><br>`;
}

function formatParagraph(item) {
    return new Paragraph({
        children: [
            new TextRun({
                text: item.text,
                bold: item.bold,
                font: item.font,
                size: item.size * 2 // Умножаем размер шрифта на 2 для Half-point measure
            })
        ],
        alignment: getAlignment(item.alignment)
    });
}

function getAlignment(align) {
    switch (align.toLowerCase()) {
        case 'left': return AlignmentType.LEFT;
        case 'center': return AlignmentType.CENTER;
        case 'right': return AlignmentType.RIGHT;
        case 'justify': return AlignmentType.JUSTIFIED;
        default: return AlignmentType.LEFT;
    }
}

async function showSample(data) {
    const modalContent = document.getElementById("docContent");
    let combinedContent = '';
    let documentContent = [];

    // Обрабатываем каждый элемент массива
    data.forEach(item => {
        // Добавляем HTML для модального окна
        combinedContent += `<div style='font-family: ${item.font}; font-size: ${item.size}px; text-align: ${item.alignment}; font-weight: ${item.bold ? 'bold' : 'normal'};'>${item.text}</div><br><br>`;

        // Создаем абзац для документа Word
        const paragraph = new Paragraph({
            children: [
                new TextRun({
                    text: item.text,
                    bold: item.bold,
                    font: item.font,
                    size: item.size * 2  // Размер шрифта в Half-point measure, поэтому умножаем на 2
                })
            ],
            alignment: getAlignment(item.alignment)
        });
		
        documentContent.push(paragraph);
        documentContent.push(new Paragraph({})); // Добавляем пустой абзац как разделитель
    });

    // Вставляем HTML в модальное окно
    modalContent.innerHTML = combinedContent;
    document.getElementById("myModal").style.display = "block";

    // Настройка закрытия модального окна
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    };
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    // Создаем документ Word
    const doc = new Document({
        styles: {
            paragraphStyles: [
                {
                    id: "CustomStyle",
                    name: "CustomStyle",
                    basedOn: "Normal",
                    next: "Normal",
                    run: {
                        bold: true,
                        font: "Calibri"
                    },
                    paragraph: {}
                }
            ]
        },
        sections: [{
            properties: {},
            children: documentContent
        }]
    });

    // Генерация и скачивание документа
    const blob = await Packer.toBlob(doc);
    saveDocument(blob, "Отчет.docx");
}

function saveDocument(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor); // Для Firefox
    anchor.click();
    document.body.removeChild(anchor); // Для Firefox
    URL.revokeObjectURL(url); // Освобождение URL
}

function formatEntry(entry) {
    let formattedText = `${entry.Criteria}: ${Math.floor(Math.random() * 10) + 1}`;
    if (entry.Type === "процентный") {
        formattedText += "%";
    }
    if (entry.Number) {
        formattedText += `\nЧисло мест: ${entry.Number}`;
    }
    formattedText += `\nДата: 2024-01-30\n`;
    return formattedText;
}


async function convertDocxBlobToHtml(blob) {
    try {
        const result = await convertToHtml({arrayBuffer: await blob.arrayBuffer()});
        return result.value; // Содержимое DOCX в формате HTML
    } catch (error) {
        console.error("Ошибка при конвертации:", error);
        return "";
    }
}

/*const sendData = async (blob) => {
    const formData = new FormData();
    formData.append("document", blob, "document.docx");

    try {
        const response = await fetch('http://localhost:5500/API/class/convertToPdf', { // Обновленный URL
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const pdfBlob = await response.blob();
            displayPdfInModal(pdfBlob);
        } else {
            console.error('Ошибка при загрузке файла');
        }
    } catch (error) {
        console.error('Ошибка при отправке запроса', error);
    }
};*/

/*async function sendData(blob) {
	const text = await blob.text();
	console.log(text);
	const formData = new FormData();
    formData.append("document", blob);

	let responseocl = await fetch('http://localhost:5500/API/class/convertToPdf', {
		method: 'POST',
		body: formData
	});

	if (responseocl.ok) {
		const pdfBlob = await responseocl.blob(); // Получаем PDF как blob
		// Теперь можете что-то сделать с pdfBlob, например, отобразить его
	} else {
		console.error('Ошибка при загрузке файла');
		// Если вы всё же ожидаете JSON с ошибкой, убедитесь, что сервер его отправляет, и вызывайте .json() только один раз.
		const errorText = await responseocl.text(); // Лучше использовать .text() для отладки
		alert("Ошибка: " + errorText);
	}
}*/

const displayPdfInModal = (pdfBlob) => {
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '600px';
    iframe.src = pdfUrl;
    
    const modalContent = document.getElementById("docContent");
    modalContent.innerHTML = '';
    modalContent.appendChild(iframe);

    const modal = document.getElementById("myModal");
    modal.style.display = "block";
};

async function enter() {
	let responseo = await fetch(port_reg_cl, {
		method: 'GET',
		headers: {
		Authorization: `Bearer ${localStorage.token}` ,
		'Content-Type': 'application/json;charset=utf-8'
		},
		});
	let resulto = await responseo.json();
	let i=0;
	while(i<resulto.length){
		let result2 = JSON.stringify(resulto[i].number +  " " + resulto[i].letter);
		var result3 = result2.substring(1, result2.length-1);
		let p = document.createElement('option')
		p.value=resulto[i].id;
		let txt = document.createTextNode(result3)
		p.appendChild(txt);
		document.getElementById('clSel').appendChild(p);
		i++;
	}
	document.getElementById('oClb').onclick = function() {entero();};;
}

async function entero() {
	let checked=0;
	if(document.getElementById('opof').checked) {checked++};
	if(document.getElementById('okol').checked) {checked++};
	if(document.getElementById('opr').checked) {checked++};
	if(checked>1){
		alert("Выберите один отчет");
	}
	else{
		if (document.getElementById('opof').checked){
				let ocl = {
					class_ID:document.getElementById('oCl').value,
				};
			let responseocl = await fetch(port_find_students, {
				method: 'POST',
				headers: {
				Authorization: `Bearer ${localStorage.token}` ,
				'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(ocl)
				});
			let resultocl = await responseocl.json();
			let i = 0;
			while (i<resultocl.count){
				if(resultocl.rows[i].PFDO.length!=0){
					alert(resultocl.rows[i].name);
				}
				i++;
			}
		}
		if (document.getElementById('okol').checked){
				let ocl = {
					class_ID:document.getElementById('oCl').value,
				};
			let responseocl = await fetch(port_find_students, {
				method: 'POST',
				headers: {
				Authorization: `Bearer ${localStorage.token}` ,
				'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(ocl)
				});
			let resultocl = await responseocl.json();
			let i = 0;
			let j = 0;
			while (i<resultocl.count){
				if(resultocl.rows[i].PFDO.length!=0){
					j++;
				}
				i++;
			}
			alert(j);
		}
		if (document.getElementById('opr').checked){
			let ocl = {
					class_ID:document.getElementById('oCl').value,
				};
			let responseocl = await fetch(port_find_students, {
				method: 'POST',
				headers: {
				Authorization: `Bearer ${localStorage.token}` ,
				'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(ocl)
				});
			let resultocl = await responseocl.json();
			let i = 0;
			let j = 0;
			while (i<resultocl.count){
				if(resultocl.rows[i].PFDO.length!=0){
					j++;
				}
				i++;
			}
			alert(j/resultocl.count*100 + "%");
		}
	}
}

export default ReportManagerPage;