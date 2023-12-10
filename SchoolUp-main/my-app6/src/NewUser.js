import './ProjectCSS.css';

import {TopPanel} from "./components/ui/NavigationPanels/NavigationPanels.jsx";

let port_reg = "http://mavr.kemsu.ru:5500/API/user/registration";

function Page() {
	return (
		<div className="pages">
				< TopPanel />
				<div className="Test">
					<div className="Blockk">
						<div className="ListSt">
							<p>Создание пользователя</p>
							<div className="TextStyleNVR">
							<p>email:<input id="em" type="text" placeholder="email"></input></p>
							<p>password:<input id="pass" type="text" placeholder="password" ></input></p>
							<p>role:<input id="rol" type="text" placeholder="role" ></input></p>
							<button className="TBVRed" onClick={function(){al();}}> Автозаполнить </button> 
							<button className="TBVRed" onClick={function(){enter();}}> Сохранить </button> 
							</div>
						</div>
					</div>
				</div>

		</div>
  );	
}

async function al() {
	document.getElementById('em').value = "admin1";
	document.getElementById('pass').value = "admin1";
	document.getElementById('rol').value = "ADMIN";
}

async function enter() {
	
	let user = {
    email: document.getElementById("em").value,//не путайтесь,  нашем случае емейл это просто стринг для логина
    password: document.getElementById("pass").value,// очевидно пароль
	role: document.getElementById("rol").value,
	};

	let response = await fetch(port_reg, {
	method: 'POST',// пока что пользуем методы POST и GET, далее может быть еще какие либо  методы будем использовать, особенно для админов
	headers: {
	'Content-Type': 'application/json;charset=utf-8'// стандартная строка которую менять не стоит в принципе если мы конечно не хотим здраво так упороться
	},
	body: JSON.stringify(user)
	});
	let result = await response.json();// дада, вот этой и она тоже асинхронна
}

export default Page;