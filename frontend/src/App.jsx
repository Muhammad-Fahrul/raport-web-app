import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ROLES } from './config/ROLES.JS';
import store from './app/store.js';

import MainLayout from './layout/MainLayout';
import PersistLogin from './layout/PersistLogin.jsx';
import RequireAuth from './layout/RequireAuth.jsx';

import Login from './pages/auth/login/Login.jsx';
import Register from './pages/auth/register/Register.jsx';

import Home from './pages/home/Home';

import NewStudent from './pages/student/newStudent/NewStudent.jsx';
import StudentList from './pages/student/studentList/StudentList.jsx';

import Profile from './pages/user/profile/Profile.jsx';
import EditUser from './pages/user/editUser/EditUser.jsx';

import NotFound from './pages/notFound/NotFound.jsx';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />

            <Route element={<PersistLogin />}>
              <Route
                element={
                  <RequireAuth allowedRoles={[...Object.values(ROLES)]} />
                }
              >
                <Route path="me" element={<Profile />} />
                <Route path="edit" element={<EditUser />} />

                <Route element={<RequireAuth allowedRoles={[ROLES.mentor]} />}>
                  <Route path="newstudent" element={<NewStudent />} />
                  <Route path="students" element={<StudentList />} />
                </Route>
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
