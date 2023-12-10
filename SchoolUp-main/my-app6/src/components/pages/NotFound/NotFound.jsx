import React from "react";
import {FakeTopPanel} from "../../ui/NavigationPanels/NavigationPanels";

const NotFound:React.FC = () => {
    return (
        <div>
            <FakeTopPanel/>
            <div className="mavr">
                <div className="workspace">
                    <div className="profile-space">
                        <div className="profileName">
                            <a><h1 id="user_name"> ERROR: 404 </h1></a>
                        </div>
                        <div>
                            <p> СТРАНИЦА НЕ НАЙДЕНА! </p>
                            Пожалуйста, проверьте правильность ссылки!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;