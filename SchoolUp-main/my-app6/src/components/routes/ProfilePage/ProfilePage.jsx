import '../../../mavrCSS.css';

import React, { useState, useEffect } from 'react';

import {TopPanel} from "../../ui/NavigationPanels";
import {getInformation} from "../../ui/ProfileLayout/ProfileFetchGetInfo";
import {mavr_context} from "../../ui/globalContext";

function Page() {
		window.onload = function() {
			document.getElementById('prped').className = "topbutton-page";
			getInformation();
		};
		
	return (
		<div>
			< TopPanel />
			<div className="mavr">
				<div className="workspace">
					<div className="profile-space">
						<div className="profileName">
							<a><h1 id="user_name"> имя пользователя </h1></a>
						</div>
						<div className="profile-info">
							<div className="infobar"> 
								<p> Связанные классы: </p>
								<p id="clprofile" className="clprofile3"> </p>
							</div>
							<div className="infobar">
								<p> Роль в системе: </p>
								<p id="my_user_role" className="text-info"> должность педагога </p>
							</div>
						</div>
						
						<button className="profile-button"><img src="https://i.ibb.co/7WvypCK/settings.png" className="profile-button2" onClick={function(){enter();}}></img></button>
						<a href="src/components/routes/ProfilePage/ProfilePage.jsx">
						</a>
					</div>
				</div>
			</div>				
		</div>
  );	
}

async function enter() {
	window.location.assign(mavr_context.mavr_local+'profile_edit');
}

export default Page;