import './ProjectCSS.css';

import TopPanel from "./TopPanel.js";

function Page() {
	return (
		<div className="pages">
				< TopPanel />
				<div className="Test">
					<div className="Blockk">
						<div className="ListSt">
							<div className="TextStyleNVR">
								<a href="MO"> 
								"Отчет"
								</a>
							</div>
						</div>
					</div>
					<div className="ClCl">
						<div className="ClyClVR">
						Классы
						</div>
						<a href="MO2List"> 
							<div className="ClnClVR">
							Воспитательная работа
							</div>
						</a>
						<a href="MO3List"> 
							<div className="ClnClVR">
							Общие
							</div>
						</a>
					</div>
				</div>

		</div>
  );	
}

export default Page;