import '../../../../mavrCSS.css';

import {TopPanel} from "../../NavigationPanels/NavigationPanels.jsx";
import {ProfileEditObject} from "../ProfileEditObject/ProfileEditObject";


let prof = "http://localhost:3000/profile";

function Page() {
		window.onload = function() {
			document.getElementById('prped').className = "topbutton-page";
		};
	return (
		<div>
			< TopPanel />
			<div className="mavr">
				<div className="workspace">
					<div className="profile-space-edit">

						<p className="profileName"> Изменить данные пользователя </p>

						<ProfileEditObject />

						<button id="container" className="profile-button"><img src="https://i.ibb.co/h2SfXRm/performed.png" className="profile-button2" onClick={function(){enter();}}></img></button>

					</div>
				</div>
			</div>				
		</div>
  );	
}

async function enter(){
	window.location.assign(prof);
}

export default Page;