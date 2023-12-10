import './ProjectCSS.css';

import {TopPanel} from "./Panels.js";

function Page() {
	return (
		<div className="pages">
				< TopPanel />
				<div className="Test">
					<div className="Blockk">
						<div className="ListSt">
							<p>Редактирование профиля</p>
							<div className="TextStyleNVR">
							<p>Фамилия:<input type="text" value="Карпова"></input></p>
							<p>Имя:<input type="text" value="Полина"></input></p>
							<p>Отчество:<input type="text" value="Ильинична"></input></p>
									<div className="ListClRed">
										<div className="VRredBox">
											<div className="ListPrTextRed">Пол:<input type="text" value="женский"></input></div>
											<div className="ListPrTextRed">Статус:<input type="text" value="учится"></input></div>
											<div className="ListPrTextRed">Состояние семьи:<input type="text" value="полная"></input></div>
											<div className="ListPrTextRed">Образовательный уровень родителей:<input type="text" value="высшее"></input></div>
											<div className="ListPrTextRed">Занятость родителей:<input type="text" value="ИП"></input></div>
										</div>
										<div className="TextBox2">
											<div className="TextBox3">
												<div className="TextBox4">учреждение</div>
												<div className="TextBox4">МБОУ "СОШ №11"</div>
											</div>
											<div className="TextBox3">
												<div className="TextBox4">направление</div>
												<div className="TextBox4">техническое</div>
											</div>
											<div className="TextBox3">
												<div className="TextBox4">программа</div>
												<div className="TextBox4">"фиксики"</div>
											</div>
										</div>
										<a href="Test"> 
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