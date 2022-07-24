import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/login/Login';
import Register from './components/login/Register';
import PostDetails from './components/Postdetails/PostDetails';
import EditProfile from './pages/editprofile/EditProfile';
import Home from './pages/Home';
import People from './pages/people/People';
import Profile from './pages/profile/Profile';
import User from './pages/ProfileUser/User';

function App() {
  
  return (
    <>
    <Router>
      <ToastContainer position='top-right' limit={3} />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/profile/edit' element={<EditProfile />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/posts/:id' element={<PostDetails />}/>
        <Route path=':id' element={<User />}/>
        <Route path='/people' element={<People />}/>
      </Routes>
    </Router>
  </>
  );
}

export default App;
