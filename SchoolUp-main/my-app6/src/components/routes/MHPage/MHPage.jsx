import '../../../ProjectCSS.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../../../mavrCSS.css';

import { TopPanelUniversity, LeftPanelOfMaterialrWork } from "../../ui/NavigationPanels/NavigationPanels.jsx";
import { EvProf } from "../../../See.js";

const documentsData = [
  {
    id: 1,
    title: "Документ 1",
    fio: "Григорьев Михаил Кириллович",
    dateOfStatement: "08.02.24",
    validityPeriod: "08.02.24 - 08.03.24",
    amount: "2300 руб.",
    basis: "Пункт положения: 2.2.3.1. обучающийся из многодетной семьи"
  },
  // Добавьте сюда другие документы
  {
    id: 2,
    title: "Документ 2",
    fio: "Иванов Иван Иванович",
    dateOfStatement: "10.03.24",
    validityPeriod: "10.03.24 - 10.04.24",
    amount: "1500 руб.",
    basis: "Пункт положения: 3.4.5.2. обучающийся с отличием"
  },
  {
    id: 3,
    title: "Документ 3",
    fio: "Сидоров Петр Петрович",
    dateOfStatement: "15.04.24",
    validityPeriod: "15.04.24 - 15.05.24",
    amount: "2000 руб.",
    basis: "Пункт положения: 1.2.3.4. обучающийся из неполной семьи"
  },
  {
    id: 4,
    title: "Документ 4",
    fio: "Кузнецов Николай Николаевич",
    dateOfStatement: "20.05.24",
    validityPeriod: "20.05.24 - 20.06.24",
    amount: "2500 руб.",
    basis: "Пункт положения: 2.3.4.1. обучающийся с высокими достижениями в спорте"
  },
  {
    id: 5,
    title: "Документ 5",
    fio: "Попов Андрей Андреевич",
    dateOfStatement: "25.06.24",
    validityPeriod: "25.06.24 - 25.07.24",
    amount: "3000 руб.",
    basis: "Пункт положения: 4.5.6.7. обучающийся, получающий социальную стипендию"
  }
];

function DocumentCard({ document, isVisible, onClick }) {
  return (
    <div>
      <p className={isVisible ? "profileNameClicked" : "profileName"} onClick={onClick}>
        {document.title}
      </p>
      {isVisible && (
        <div className="document-container-border">
          <div className="document-container">
            <div className="document-section">
              <p className="material_help_bold">Заявление:</p>
              <p>ФИО: {document.fio}</p>
              <p>Дата заключения заявления: {document.dateOfStatement}</p>
              <p>Дата действия заявления: {document.validityPeriod}</p>
              <p>Сумма: {document.amount}</p>
              <p className="material_help_document_href">Документ</p>
            </div>
            <div className="document-section">
              <p className="material_help_bold">Основание к заявлению:</p>
              <p>{document.basis}</p>
              <p className="material_help_document_href">Документ</p>
            </div>
          </div>
          <br />
          <div className="block-edit-delete">
            <p className="material_help_bold">Редактировать</p>
            <p className="material_help_bold">Удалить</p>
          </div>
        </div>
      )}
    </div>
  );
}

function MHPage() {
  const [visibleDocument, setVisibleDocument] = useState(null);

  const handleDocumentClick = (id) => {
    setVisibleDocument(visibleDocument === id ? null : id);
  };

  window.onload = function() {
		document.getElementById('materialWork').className = "topbutton-page-university";
		document.getElementById('vr').className = "leftPanelUniversity_clicked";
	};

  return (
    <div className="pageUniversity">
      <TopPanelUniversity />
      <div className="mavr">
        <div id="LeftPanelVR">
          <LeftPanelOfMaterialrWork />
        </div>
        <div className="material_help_workspace_university">
          <div className="ListSt">
            <p className="profileName">Список документов</p>
            {documentsData.map((document) => (
              <DocumentCard
                key={document.id}
                document={document}
                isVisible={visibleDocument === document.id}
                onClick={() => handleDocumentClick(document.id)}
              />
            ))}
            <div id="Events" className="TextStyleN"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MHPage;