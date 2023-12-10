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
								<a href="MO3"> 
								"Отчет"
								</a>
							</div>
						</div>
					</div>
					<div className="ClCl">
						<a href="MOList"> 
								<div className="ClnClVR">
								Классы
								</div>
						</a>
						<a href="MO2List"> 
							<div className="ClnClVR">
							Воспитательная работа
							</div>
						</a>
						<div className="ClyClVR">
						Общие
						</div>
					</div>
				</div>

		</div>
  );	
}

export default Page;