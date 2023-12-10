import '../../../../ProjectCSS.css';

import {TopPanel} from "../../NavigationPanels/NavigationPanels.jsx";

function Page() {
	return (
		<div className="pages">
				< TopPanel />
				<div className="Test">
					<div className="Blockk">
						<div className="ListSt">
							<p>Редактирование события</p>
							<div id="1" className="TextStyleNVR">
							<p><input type="text" value="УРОК ГОРОДА"></input></p>
									<div className="ListPrRed">
										<div className="VRredBox">
											<div className="ListPrTextRed">Дата события:<input type="text" value="15.03.22"></input></div>
											<div className="ListPrTextRed">Форма воспитательной работы:<input type="text" value="урок города"></input></div>
											<div className="ListPrTextRed">Кто проводит:<input type="text" value="классный руководитель"></input></div>
											<div className="ListPrTextRed">Направление:<input type="text" value="познавательное"></input></div>
											<div className="ListPrTextRed">Сетевое взаимодействие:<input type="text" value="Библиотека Читай - город"></input></div>
											<div className="ListPrTextRed">Проект:<input type="text" value="Живые уроки"></input></div>
										</div>
										<div className="VRredBox">
											<div className="ListPrTextRed">
											Приглашенные организации:
												<div className="ListBox">
												<p>Орг1</p>
												<p>Орг2</p>
												</div>
											Приглашенные родители:
												<div className="ListBox">
												<p>Родитель1</p>
												<p>Родитель2</p>
												</div>
											Участники:
												<div className="ListBox">
												<p>Участник1</p>
												<p>Участникь2</p>
												</div>
											Сертификат:
												<div className="ListBox"></div>
											</div>
										</div>
										<a href="VR"> 
											<button className="TBVRed"> Сохранить </button> 
										</a>
									</div>
							</div>
						</div>
					</div>
				</div>

		</div>
  );	
}

export default Page;