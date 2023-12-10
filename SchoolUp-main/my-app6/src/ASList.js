import './ProjectCSS.css';

import TopPanel from "./TopPanel.js";

function Page() {
	return (
		<div className="pages">
				< TopPanel />
				<div className="Test">
					<div className="Blockk">
						<div className="ListSt">
							<p>Архив</p>
							<a href="AS"> 
								<div className="TextStyleNVR">
								<p>"УРОК ГОРОДА"</p>
								<p>15.03.2022, урок города, познавательное</p>
								</div> 
							</a>
							<div className="TextStyleNVR"><p>НАЗВАНИЕ СОБЫТИЯ</p><p>дата, форма,направление</p></div>
							<div className="TextStyleNVR"><p>НАЗВАНИЕ СОБЫТИЯ</p><p>дата, форма,направление</p></div>
							<div className="TextStyleNVR"><p>НАЗВАНИЕ СОБЫТИЯ</p><p>дата, форма,направление</p></div>
						</div>
						<div className="Fl">
						Фильтры:
							<div className="FlText">Дата события:<input type="text"></input></div>
							<div className="FlText">Форма воспитательной работы:<input type="text"></input></div>
							<div className="FlText">Кто проводит:<input type="text"></input></div>
							<div className="FlText">Направление:<input type="text"></input></div>
							<div className="FlText">Сетевое взаимодействие:<input type="text"></input></div>
							<div className="FlText">Проект:<input type="text"></input></div>
							<div className="FlText"><p>Организации:</p>
							<div className="FlOr">
								<p>Орг1<input type="checkbox"></input></p>
								<p>Орг2<input type="checkbox"></input></p>
								<p>Орг3<input type="checkbox"></input></p>
								<p>Орг4<input type="checkbox"></input></p>
							</div>
							</div>
						</div>
					</div>
					<div className="ClCl">
						<a href="VRList"> 
							<div className="ClnClVR">
							Воспитательные события
							</div>
						</a>
						<a href="CVR"> 
						<div className="ClnClVR">
						Цели воспитательной работы
						</div>
						</a>
						<div className="ClyClVR">
						Архив событий
						</div>
					</div>
				</div>

		</div>
  );	
}

export default Page;