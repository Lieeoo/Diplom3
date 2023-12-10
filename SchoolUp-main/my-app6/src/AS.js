import './ProjectCSS.css';
import ReactDOM from 'react-dom';
import './mavrCSS.css';
//изменение ради изменения

import {TopPanel, LeftPanelVR} from "./Panels.js";
import {ArProf} from "./See.js";

const element = <ArProf />;
let SetEventArchiveDone = false;

function Page() {
	window.onload = function() {
			document.getElementById('vrab').className = "topbutton-page";
			document.getElementById('as').style.background = "#8ccba1";
		};
	return (
		<div>
				< TopPanel />
				<div className="Test">
				<div>
					<LeftPanelVR/>
				</div>
					<div className="workspaceClassWork">
						<div className="ListSt">
							<p>Архив</p>
							<div className="TextStyleNVR">
								<div onClick={function(){enter();}}> 
									<p>"УРОК ГОРОДА"</p>
									<p>15.03.2022, урок города, познавательное</p>
								</div>
								<div id="SetEventArchive"></div>
							</div>
							<div className="TextStyleNVR"><p>НАЗВАНИЕ СОБЫТИЯ</p><p>дата, форма,направление</p></div>
							<div className="TextStyleNVR"><p>НАЗВАНИЕ СОБЫТИЯ</p><p>дата, форма,направление</p></div>
							<div className="TextStyleNVR"><p>НАЗВАНИЕ СОБЫТИЯ</p><p>дата, форма,направление</p></div>
						</div>
						<div className="FlRight">
							<div className="Fl">
								<div>Фильтры:</div>
								<div className="FlText"><div>Форма воспитательной работы:&nbsp;</div><select type="text">
									<option selected disabled></option>
									<option>классный час</option>
									<option>тематическая беседа</option>
								</select></div>
								<div className="FlText"><div>Кто проводит:&nbsp;</div><input type="text" className="FilterInput"></input></div>
								<div className="FlText"><div>Направление:&nbsp;</div><select type="text">
									<option selected disabled></option>
									<option>познавательное</option>
									<option>трудовое</option>
									<option>экологическое</option>
								</select></div>
								<div className="FlText"><div>Сетевое взаимодействие:&nbsp;</div><input type="text"></input></div>
								<div className="FlText"><div>Проект:&nbsp;</div><input type="text"></input></div>
								<div className="FlText"><div>Организация:&nbsp;</div><input type="text"></input></div>
								<div className="FlRight"><button className="profile-button"><img src="https://i.ibb.co/jbvfRzm/search.png" className="profile-button2"></img></button></div>
							</div>
						</div>
					</div>
				</div>

		</div>
  );	
}

async function enter() {
	ReactDOM.render(element, document.getElementById('SetEventArchive'));
	if(SetEventArchiveDone == true) {
		ReactDOM.unmountComponentAtNode(document.getElementById('SetEventArchive'));
	}
	SetEventArchiveDone = !SetEventArchiveDone;
}


export default Page;