import './ProjectCSS.css';

import TopPanel from "./TopPanel.js";


function kodimg(el) {
alert(el.className);
}

function enter() {
	window.location.assign("http://localhost:3000/profile");
}		

function Page() {
	return (
		<div className="pages">
				< TopPanel />
				<div className="Test">
					<div className="Blockk">
					<div className="ListSt">
					<p>Состав класса:</p>
					<a href="ClList"> 
						<div className="TextStyleN" onClick={function(){kodimg();}}>Карпова Полина</div>
					</a>
					<div className="TextStyleN">Волков Виктор</div>
					<div className="TextStyleN">Корнев Артём</div>			
					</div>
					<div className="St">
					<h2>Карпова Полина Ильинична</h2>
					<p>женский, учится</p>
					<div className="TextBox">
					<p>Состояние семьи: полная</p>
					<p>Детей в семье: 1</p>
					<p>Достаток семьи: средний</p>
					<p>Образовательный уровень родителей: высшее</p>
					<p>Занятость родителей: ИП</p>
					</div>
					<p>Дополнительное образование</p>
					<div className="TextBox2">
						<div className="TextBox3">
							<div className="TextBox4">
							учреждение
							</div>
							<div className="TextBox4">
							направление
							</div>
							<div className="TextBox4">
							программа
							</div>
							<div className="TextBox4">
							ПФДО
							</div>
						</div>
						<div className="TextBox3">
							<div className="TextBox4">
							МБОУ "СОШ №11"
							</div>
							<div className="TextBox4">
							техническое
							</div>
							<div className="TextBox4">
							"фиксики"
							</div>
							<div className="TextBox4">
							785735572
							</div>
						</div>
					</div>
						<a href="Clred"> 
						<button className="TBVR"> Редактировать </button> 
						</a>
					</div>
					</div>
					<div className="ClCl">
						<div className="ClyCl">
						5 "а"
						</div>
						<div className="ClnCl">
						6 "а"
						</div>
						<div className="ClnCl">
						7 "а"
						</div>
						<div className="ClnCl">
						</div>
						<div className="ClnCl">
						</div>
						<div className="ClnCl">
						</div>
						<div className="ClnCl">
						</div>
						<div className="ClnCl">
						</div>
						<div className="ClnCl">
						</div>
						<div className="ClnCl">
						</div>
						<div className="ClnCl">
						</div>
					</div>
				</div>

		</div>
  );	
}

export default Page;