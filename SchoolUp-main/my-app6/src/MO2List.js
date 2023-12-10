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
								<a href="MO2"> 
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
						<div className="ClyClVR">
						Воспитательная работа
						</div>
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