import './ProjectCSS.css';

import {TopPanel} from "./components/ui/NavigationPanels/NavigationPanels.jsx";

function Page() {
	return (
		<div className="pages">
				< TopPanel />
				<div className="Test">
					<div className="Blockk">
						<div className="ListSt">
							<p>Список событий</p>
							<div className="TextStyleNVR"><p>НАЗВАНИЕ СОБЫТИЯ</p><p>дата, форма,направление</p></div>
							<div className="TextStyleNVR"><p>НАЗВАНИЕ СОБЫТИЯ</p><p>дата, форма,направление</p></div>
							<div className="TextStyleNVR"><p>НАЗВАНИЕ СОБЫТИЯ</p><p>дата, форма,направление</p></div>
							<div className="TextStyleNVR"><p>НАЗВАНИЕ СОБЫТИЯ</p><p>дата, форма,направление</p></div>
							<div className="TextStyleNVR"><p>НАЗВАНИЕ СОБЫТИЯ</p><p>дата, форма,направление</p></div>
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
						<div className="ClyClVR">
						Воспитательные события
						</div>
						<div className="ClnClVR">
						Цели воспитательной работы
						</div>
						<a href="ASList"> 
							<div className="ClnClVR">
							Архив событий
							</div>
						</a>
					</div>
				</div>

		</div>
  );	
}

export default Page;