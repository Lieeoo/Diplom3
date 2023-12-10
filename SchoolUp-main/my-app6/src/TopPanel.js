import './ProjectCSS.css';

import icon from "./icon.png"
let ss = "";
//let ss = "http://mavr.kemsu.ru/";

function TopPanel() {
	return(
		<div className="topPanel">
			<body>
			
				<img src={icon} className="icon" alt /> 
				<a href={ss+"ClList"}> 
					<button className="topButtons"> Классное руководство </button> 
				</a>
				<a href={ss+"VRList"}> 
					<button className="topButtons"> Воспитательная работа </button> 
				</a> 
				<a href={ss+"MOList"}> 
					<button className="topButtons"> Менеджер отчётов </button> 
				</a>
				<a href={ss+"US"}> 
					<button className="topButtons"> Управление системой </button> 
				</a> 
				<a href={ss+"profile"}> 
					<button className="topButtons"> Профиль педагога </button> 
				</a>
				<a href={"http://mavr.kemsu.ru/"}> 
					<button className="topButtons"> Выход из системы </button> 
				</a> 
				
			</body>
		</div>
	);

}

export default TopPanel;