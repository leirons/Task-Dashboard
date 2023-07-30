import data from "../data.json";
import info from "../images/info.png";
import help from "../images/help.png";
import userPicture from "../images/userPicture.png";


export default function Header(){

    return(
        <div>
            <div className="header">
                <div className="header__wrapper">
                    <div className="header__first-part">

                        <div>
                            <span className="header__project">Projects </span>
                        </div>
                        <div className="header__projects-number-wrapper">
                            <span className="header__projects-number">{data.length}</span>
                        </div>

                    </div>
                    <div className="header__second-part">
                        <div className="header__info">
                            <img src={info}/>

                        </div>
                        <div className="header__help">
                            <img src={help}/>

                        </div>
                        <div className="header__profile">
                            <img src={userPicture}/>

                        </div>
                    </div>


                </div>

            </div>
        </div>
    )
}