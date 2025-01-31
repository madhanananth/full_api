import "./Registeration.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope,faLock } from '@fortawesome/free-solid-svg-icons'
import { useSelector,useDispatch } from "react-redux"
import { authReset, registerationAsync } from "../../redux/slices/authSlice"
import { Link, useNavigate  } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useEffect } from "react"



const RegisterationForm = () =>{

    const {register, handleSubmit , formState:{errors},reset} = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {registerError,registerLoading, registerStatus} = useSelector(state => state.auth)


    useEffect(()=>{
        if (registerStatus === 'success') {
            navigate('/')
            reset()
            dispatch(authReset())
        }
    },[registerStatus])

    const onSubmit = (data) =>{
        dispatch(registerationAsync(data))
        console.log(data)
    }
    return(
        <>

        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container">
            <div className="header">
                <h3>Sign Up</h3>
                <div className="line"></div>
            </div>
            <div className="inputs">
                <div className="input">
                <FontAwesomeIcon icon={faEnvelope} className="logo" />
                    <input {...register('email',
                     {required: "Email is require", })}  placeholder="Email" />
                </div>
                <p className="Error">{ errors.email && errors.email.message}</p>
                <div className="input">
                <FontAwesomeIcon icon={faLock} className="logo" />
                    <input {...register('password',
                         {required:"password is empty",
                            minLength:{
                                value:8,
                                message:"password must be 8 char "
                            }
                         })} placeholder="Password" type="password" />
                </div>
                <p className="Error">{ errors.password && errors.password.message}</p>
               
            </div>

            <div className="submit-container">
                <button className="submit" type="submit" disabled={registerLoading}  >{ registerLoading ? "Sign Up...." : "Sign Up"}</button>  
            </div>
            <div className="login-link"><p>Already have an account ?{" "}<Link to="/Login">Sign In</Link></p></div> 
            
            <p className="Error">{  registerError && "Failed to fetch"}</p>
        </div>
        </form>

        

        </>
    )
}

export default RegisterationForm;