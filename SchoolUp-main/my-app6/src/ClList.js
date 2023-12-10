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
					<a href="test"> 
						<div className="TextStyleN" onClick={function(){kodimg();}}>Бызова Мария</div>
					</a>
					<div className="TextStyleN">Козлов Ярослав</div>
					<div className="TextStyleN">Киприянов Данила</div>			
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