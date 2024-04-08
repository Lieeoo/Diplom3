import '../../../ProjectCSS.css';
import '../../../mavrCSS.css';
import ReactDOM from 'react-dom';
import React from 'react';

import {TopPanelUniversity, LeftPanelOfReportManager} from "../../ui/NavigationPanels/NavigationPanels.jsx";
import {OCl, OVR, OClNORM2} from "../../../See.js";
import { Document, Packer, Paragraph, TextRun } from 'docx';
import {convertToHtml} from "mammoth/mammoth.browser";
import { PDFDocument, rgb } from 'pdf-lib';

let port_reg_cl = "http://localhost:5500/API/class/";
let port_find_students = "http://localhost:5500/API/student/:id";

const element = <OCl />;
const element2 = <OVR />;
let flag = false;

function ReportManagerPage() {
	const criteria = {
		"Студент": ["Общее количество", "Количество студентов, которым оказывается материальная помощь", "Количество студентов, проживающих в общежитии"],
		"Внеучебное событие": ["Общее количество", "Количество студентов, участвующих в событии", "Количество событий, начавшихся в определенный диапазон дат", "Количество событий, закончившихся в определенный диапазон дат", "Количество событий, продолжительность которых входит в определенный диапазон дат"],
		// Добавьте остальные критерии и подкритерии аналогичным образом
		};
	const [selectedCriterion, setSelectedCriterion] = React.useState("");
	const [subCriteria, setSubCriteria] = React.useState([]);
	const handleCriterionChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
        setSelectedCriterion(selectedOptions);
        // Обновляем подкритерии на основе выбранных критериев
        let updatedSubCriteria = [];
        selectedOptions.forEach(option => {
            updatedSubCriteria = updatedSubCriteria.concat(criteria[option] || []);
        });
        setSubCriteria(updatedSubCriteria);
    };

	window.onload = function() {
			document.getElementById('reportManagerEmploymentUniversity').className = "topbutton-page-university";
			//enter();
		};
	return (
		<div className="pageUniversity">
			< TopPanelUniversity />
			<div className="mavr">
					<LeftPanelOfReportManager/>
					<div className="workspace">
						<div id="myModal" class="modal">
							<div class="modal-content">
								<span class="close">&times;</span>
								<div id="docContent"></div>
							</div>
						</div>
						<div className="report-space">
							<div>
								<div className="text-info"> 
									<p className="text-main">
										Составить отчеты: 
										</p>
								</div>
								<div>
								<select id="criteriaSelect" onChange={handleCriterionChange} className="listboxClass" multiple size="8">
									<option value="">Выберите критерий</option>
									{Object.keys(criteria).map(criterion => (
										<option key={criterion} value={criterion}>{criterion}</option>
									))}
								</select>
								<select id="subCriteriaSelect" className="listboxClass" multiple size="8">
									{subCriteria.length > 0 ? subCriteria.map(subCriterion => (
										<option key={subCriterion} value={subCriterion}>{subCriterion}</option>
									)) : <option>Выберите критерий</option>}
								</select>
								</div>
								<div>
									<textarea id="docTextArea" name="freeform" rows="50" cols="50">
									</textarea>
								</div>
								<div>
									<button id="generate">Generate Word Document</button>
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

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("generate").addEventListener("click", generateWordDocument, false);
});

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


async function generateWordDocument() {
    const text = document.getElementById('docTextArea').value;
    const lines = text.split('\n');

    // Создаем массив параграфов на основе введенного текста
    const paragraphs = lines.map(line => {
        if (line.trim() === '') {
            // Для пустой строки добавляем параграф без текста, чтобы сохранить перенос
            return new Paragraph('');
        } else {
            // Для непустых строк создаем параграф с текстом
            return new Paragraph({
                children: [
                    new TextRun(line)
                ]
            });
        }
    });

    // Создание нового документа с учетом параграфов
    const doc = new Document({
        sections: [{
            properties: {},
            children: paragraphs, // Используем подготовленные параграфы
        }],
    });


    // Генерация Blob из документа
    const blob = await Packer.toBlob(doc);

	const html = await convertDocxBlobToHtml(blob);
    document.getElementById("docContent").innerHTML = html;
	
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

	//sendData(blob);
	

    // Сохранение сгенерированного документа
    saveDocument(blob, "generatedDocument.docx");
}

function saveDocument(blob, fileName) {
    // Создание временной ссылки для скачивания
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor); // Для Firefox
    anchor.click();
    document.body.removeChild(anchor); // Для Firefox
    URL.revokeObjectURL(url); // Освобождение URL
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