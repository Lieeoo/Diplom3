import './mavrCSS.css';

import logo from './images/icon.png'; 

let port_log = "http://mavr.kemsu.ru:5500/API/user/login";

//let profile="http://mavr.kemsu.ru/profile";
let profile = "http://localhost:3000/profile";

// <button onClick={forgot} className="Login-button2"> Забыли пароль? </button> 
// Не знаю, нужно нам это будет или нет

function Page() {
  return (
    <div name="login" id="index_login" className="workspace">	  
		<div className="login-space">
			
			<p className="hello"> Добро пожаловать в информационную систему "МАВР" </p>
			
			<div>
				<input id="login1" type="text" placeholder="логин" className="login-input"/>
				<input id="login2" type="password" placeholder="пароль" className="login-input"/>
			</div>
					
			<div>
				<button onClick={function(){enter();}}  className="login-button">  Войти </button>
			</div>
	
		</div>
		
	</div>
  );
}

async function enter() {
	
	let user = {
    email: document.getElementById("login1").value,//не путайтесь,  нашем случае емейл это просто стринг для логина
    password: document.getElementById("login2").value,// очевидно пароль
	};

	let response = await fetch(port_log, {
	method: 'POST',// пока что пользуем методы POST и GET, далее может быть еще какие либо  методы будем использовать, особенно для админов
	headers: {
	'Content-Type': 'application/json;charset=utf-8'// стандартная строка которую менять не стоит в принципе если мы конечно не хотим здраво так упороться
	},
	body: JSON.stringify(user)
	});
	
	let result = await response.json();// дада, вот этой и она тоже асинхронна
	// в ней по идее должен быть  джейсон с токеном
	if(response.status===200) { 
		localStorage.setItem("token", result.token);
		window.location.assign(profile); }
	else { alert(result.message);}
}


export default Page;