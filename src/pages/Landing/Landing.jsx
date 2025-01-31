import { loggedOut } from "../../redux/slices/authSlice";
import { useSelector , useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Landing = () => {
  const {loggedIn} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(loggedOut())
  }
  

  return (

  <>
   { !loggedIn && 
    <div>
    <Link to = '/Login'>Login</Link>
    <Link to ="/register">SignUp</Link>
    </div>
  }
  { loggedIn &&
    <div>
      <h6>To-Do</h6>
      <a onClick={logout}>Logout</a>
    </div>
  }
    

    <h1>Hello World</h1>
    </>
  )
}

export default Landing;
