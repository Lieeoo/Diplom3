import './ProjectCSS.css';
import ReactDOM from 'react-dom';

import {TopPanel, LeftPanelO} from "./Panels.js";
import {OAS} from "./See.js";

const element = <OAS />;
let flag = false;

function Page() {
	window.onload = function() {
			document.getElementById('mo').className = "topButtons2";
			document.getElementById('o3').className = "ClyCl";
		};
	return (
		<div className="pages">
				< TopPanel />
				<div className="Test">
					<LeftPanelO/>
					<div className="Blockk">
						<div className="ListSt">
							<div className="TextStyleNVR">
								<div onClick={function(){enter();}}>Отчет</div>
								<div id="SetOAS"></div>
							</div>
						</div>
					</div>
				</div>

		</div>
  );	
}

async function enter() {
	ReactDOM.render(element, document.getElementById('SetOAS'));
	if(flag == true) {
		ReactDOM.unmountComponentAtNode(document.getElementById('SetOAS'));
	}
	flag = !flag;
}

export default Page;