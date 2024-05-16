import '../../../ProjectCSS.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../../../mavrCSS.css';

import { TopPanelUniversity, LeftPanelOfDormitoriesWork } from "../../ui/NavigationPanels/NavigationPanels.jsx";
import { EvProf } from "../../../See.js";

const documentsData = [
  {
    id: 1,
    dateOfFormation: "08.02.24",
    fio: "Григорьев Михаил Кириллович",
    dormitory: "Общежитие 7",
    dateOfContract: "08.02.24",
    periodOfResidence: "08.02.24 - 08.03.24",
    contractDocument: "Документ",
    agreementDate: "08.02.24",
    paymentAmount: "2300 руб.",
    rectorOrder: "Приказ ректора",
    agreementDocument: "Документ"
  },
  {
    id: 2,
    dateOfFormation: "10.03.24",
    fio: "Иванов Иван Иванович",
    dormitory: "Общежитие 5",
    dateOfContract: "10.03.24",
    periodOfResidence: "10.03.24 - 10.04.24",
    contractDocument: "Документ",
    agreementDate: "10.03.24",
    paymentAmount: "1500 руб.",
    rectorOrder: "Приказ ректора",
    agreementDocument: "Документ"
  },
  // Добавьте другие документы при необходимости
];

function DocumentCard({ document, isVisible, onClick, index }) {
  return (
    <div>
      <p className={isVisible ? "profileNameClicked" : "profileName"} onClick={onClick}>
        {index + 1}. Документ - {document.dateOfFormation}
      </p>
      {isVisible && (
        <div className="document-container-border">
          <div className="document-container">
            <div className="document-section">
              <p>ФИО: {document.fio}</p>
              <p>Общежитие: {document.dormitory}</p>
              <p>Дата заключения договора: {document.dateOfContract}</p>
              <p>Период проживания: {document.periodOfResidence}</p>
              <p className="material_help_document_href">{document.contractDocument}</p>
            </div>
            <div className="document-section">
              <p className="material_help_bold">Соглашение к договору:</p>
              <p>Дата заключения соглашения: {document.agreementDate}</p>
              <p>Размер оплаты: {document.paymentAmount}</p>
              <p className="material_help_document_href">{document.rectorOrder}</p>
              <p className="material_help_document_href">{document.agreementDocument}</p>
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
    document.getElementById('dormitoriesWork').className = "topbutton-page-university";
    document.getElementById('vr').className = "leftPanelUniversity_clicked";
  };

  return (
    <div className="pageUniversity">
      <TopPanelUniversity />
      <div className="mavr">
        <div id="LeftPanelVR">
          <LeftPanelOfDormitoriesWork />
        </div>
        <div className="ew_workspace_university">
          <div className="ListSt">
            <p className="profileName">Список документов</p>
            {documentsData.map((document, index) => (
              <DocumentCard
                key={document.id}
                document={document}
                isVisible={visibleDocument === document.id}
                onClick={() => handleDocumentClick(document.id)}
                index={index}
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
