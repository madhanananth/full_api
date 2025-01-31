import './reset.css'
import './App.css'
import RegisterationForm from './pages/RegisterationForm/RegisterationForm'
import Landing from './pages/Landing'
import Login from './pages/Login'
import { BrowserRouter , Routes , Route } from 'react-router-dom'

function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Landing/>}/>
    <Route path='/register' element={<RegisterationForm/>}/>
    <Route path='/Login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    
    
    </>
  )
}

export default App
