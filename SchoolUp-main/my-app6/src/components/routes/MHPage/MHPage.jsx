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
					<div className="ew_workspace_university">
						<div className="ListSt">
							<a href="create_event"><button className="profile-button"><img src="https://i.ibb.co/Tbth16X/add.png" className="profile-button2"></img></button></a>
							<p className="profileName">Список документов</p>
							<div id="Events" className="TextStyleN">
							</div>

						</div>
						<div className="FlRight">
							<div className="Fl">
								<div className="ew_text_search">Фильтры:</div>
								<div className="ew_text"><div>Форма воспитательной работы:&nbsp;</div><select  className="student-input" type="text">
									<option selected disabled></option>
									<option>классный час</option>
									<option>тематическая беседа</option>
								</select></div>
								<div className="ew_text"><div>Кто проводит:&nbsp;</div><input type="text"  className="student-input"></input></div>
								<div className="ew_text"><div>Направление:&nbsp;</div><select  className="student-input" type="text">
									<option selected disabled></option>
									<option>познавательное</option>
									<option>трудовое</option>
									<option>экологическое</option>
								</select></div>
								<div className="ew_text"><div>Сетевое взаимодействие:&nbsp;</div><input  className="student-input" type="text"></input></div>
								<div className="ew_text"><div>Проект:&nbsp;</div><input className="student-input" type="text"></input></div>
								<div className="ew_text"><div>Организация:&nbsp;</div><input className="student-input" type="text"></input></div>
								<div className="FlRight"><button className="profile-button"><img src="https://i.ibb.co/jbvfRzm/search.png" className="profile-button2"></img></button></div>
							</div>
						</div>
					</div>
				</div>

		</div>
  );	
}

export default MHPage;