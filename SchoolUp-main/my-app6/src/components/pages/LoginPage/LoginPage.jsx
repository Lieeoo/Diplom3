import React from "react";

import '../../../mavrCSS.css';
import AuthorizationUser from "../../ui/AuthorizationUser";

const LoginPage:React.FC = () => {
  return (
    <div id="index_login" className="workspace">
		<div className="login-space">
			
			<p className="hello"> Добро пожаловать в информационную систему "МАВР" </p>
			
			<div>
				<input id="emailUser" type="text" placeholder="логин" className="login-input"/>
				<input id="passwordUser" type="password" placeholder="пароль" className="login-input"/>
			</div>
					
			<div>
				<button onClick={function(){EnterLoginIn().then(r => r);}} className="login-button">  Войти </button>
				<button onClick={function(){GoToUniversity().then(r => r);}} className="login-button">  ВУЗ </button>
			</div>
	
		</div>
		
	</div>
  );
};

export async function GoToUniversity () {
    window.location.assign("university");
};

async function EnterLoginIn() {

    const email = document.getElementById("emailUser").value;
    const password = document.getElementById("passwordUser").value;

	await AuthorizationUser(email, password);
}

async function GoToVUZPage() {
	await GoToUniversity();
}


export default LoginPage;