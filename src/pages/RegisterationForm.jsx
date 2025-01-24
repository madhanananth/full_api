import "./Registeration.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope,faLock } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"


const RegisterationForm = () =>{
    const [action, setAction] = useState("Sign Up")

    return(
        <>
        <div className="container">
            <div className="header">
                <h3>{action}</h3>
                <div className="line"></div>
            </div>
            <div className="inputs">
                <div className="input">
                <FontAwesomeIcon icon={faEnvelope} className="logo" />
                    <input type="email" placeholder="Email" />
                </div>
                <div className="input">
                <FontAwesomeIcon icon={faLock} className="logo" />
                    <input type="password" placeholder="Password" />
                </div>
            </div>
            <div className="submit-container">
                <span className="submit">{action}</span>
                
            </div>
        </div>
        </>
    )
}

export default RegisterationForm;