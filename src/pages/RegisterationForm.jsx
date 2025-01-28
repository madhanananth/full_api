import "./Registeration.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope,faLock } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { registerationAsync } from "../redux/slice"


const RegisterationForm = () =>{

    const [email, SetEmail] = useState("")
    const [password, SetPassword] = useState("")
    const dispatch = useDispatch()
    const {registerError,registerLoading} = useSelector(state => state.auth)

    const handleSubmit = () =>{
        let obj = {email: email, password : password}
        dispatch(registerationAsync(obj))

    }
    return(
        <>

        <div className="container">
            <div className="header">
                <h3>Sign Up</h3>
                <div className="line"></div>
            </div>
            <div className="inputs">
                <div className="input">
                <FontAwesomeIcon icon={faEnvelope} className="logo" />
                    <input type="email" placeholder="Email" value={email}  onChange={e => SetEmail(e.target.value)}/>
                </div>
                <div className="input">
                <FontAwesomeIcon icon={faLock} className="logo" />
                    <input type="password" placeholder="Password"  value={password} onChange={e =>SetPassword(e.target.value)}/>
                </div>
               
            </div>
             <p className="Error">{  registerError && "Failed to fetch"}</p>
            <div className="submit-container">
                <button className="submit" type="submit" onClick={handleSubmit} disabled={registerLoading} >{ registerLoading ? "Sign Up...." : "Sign Up"}</button>   
            </div>
            <div className="login-link"><p>Already have a account ?{" "}<a href="#">Sign In</a></p></div>
        </div>
        

        </>
    )
}

export default RegisterationForm;