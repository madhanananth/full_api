import "./Login.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope,faLock } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from "react"
import { Form, Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { authReset, loginAsync } from "../../redux/slices/authSlice"


const Login = () => {

    const {loginLoading,loginError, loginStatus} = useSelector(state => state.auth);
    const {register , handleSubmit, formState: {errors},reset } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect( () =>{
        if (loginStatus === 'success') {
            navigate('/')
            reset()
            dispatch(authReset())
            alert("login Successfully")
        }
    },[loginStatus])
    
    const onSubmit = (data) => {
        dispatch(loginAsync(data))
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
    <div className="body">
         <div className="container">
            <div className="header">
                <h3>Login</h3>
                <div className="line"></div>
            </div>
            <div className="inputs">
                <div className="input">
                <FontAwesomeIcon icon={faEnvelope} className="logo" />
                    <input {...register('username', {required:'Email is required'
                    })} placeholder="Email"  />
                </div>
                {<p className="Error">{errors.username && errors.username.message  }</p> } 
                <div className="input">
                <FontAwesomeIcon icon={faLock} className="logo" />
                    <input {...register ('password', {required: "password is required",
                    })} type="password" placeholder="Password" />
                </div>
                {<p className="Error">{errors.password && errors.password.message  }</p> }     
            </div>
            
            <div className="submit-container">
                <button className="submit" type="submit" disabled = {loginLoading}  > {loginLoading ? 'logIn...' :" LogIn"}</button>   
            </div>
            <div className="login-link"><p>Don't have an account ?{" "}<Link to="/Register">Sign up</Link></p></div>
        </div>
        {<p className="Error">{  loginError && "login failed"}</p> }     
    </div>
    </form>
  )
}

export default Login;
