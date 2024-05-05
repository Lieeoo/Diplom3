import '../../../ProjectCSS.css';
import ReactDOM from 'react-dom';
import '../../../mavrCSS.css';

import {TopPanelUniversity, LeftPanelOfMaterialrWork} from "../../ui/NavigationPanels/NavigationPanels.jsx";
import {EvProf} from "../../../See.js";

function MHPage() {
	window.onload = function() {
            document.getElementById('materialWork').className = "topbutton-page-university";
            document.getElementById('vr').className = "leftPanelUniversity_clicked";
		};
	return (
		<div className="pageUniversity">
			< TopPanelUniversity />
			<div className="mavr">
					<div id="LeftPanelVR">
						<LeftPanelOfMaterialrWork/>
					</div>
					<div className="material_help_workspace_university">
						<div className="ListSt">
							<p className="profileName">Список документов</p>
							<p className="profileName">1. Документ</p>
							<div className="document-container-border">
								<div className="document-container">
									<div className="document-section">
										<p className="material_help_bold">Заявление:</p>
										<p>ФИО: Григорьев Михаил Кириллович</p>
										<p>Дата заключения заявления: 08.02.24</p>
										<p>Дата действия заявления: 08.02.24 - 08.03.24</p>
										<p>Сумма: 2300 руб.</p>
										<p className="material_help_document_href">Документ</p>
									</div>
									<div className="document-section">
										<p className="material_help_bold">Основание к заявлению:</p>
										<p>Пункт положения: 2.2.3.1. обучающийся из многодетной семьи</p>
										<p className="material_help_document_href">Документ</p>
									</div>
								</div>
								<br></br>
								<div className="block-edit-delete">
									<p className="material_help_bold">Редактировать</p>
									<p className="material_help_bold">Удалить</p>
								</div>
							</div>
							<p className="profileName">2. Документ</p>
							<p className="profileName">3. Документ</p>
							<div id="Events" className="TextStyleN">
						</div>
						</div>
					</div>
				</div>

		</div>
  );	
}

export default MHPage;