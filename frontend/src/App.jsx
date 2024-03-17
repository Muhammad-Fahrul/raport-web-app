import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ROLES } from './config/ROLES.JS';
import store from './app/store.js';

import MainLayout from './layout/MainLayout';
import PersistLogin from './layout/PersistLogin.jsx';
import RequireAuth from './layout/RequireAuth.jsx';

import Login from './pages/auth/login/Login.jsx';

import Home from './pages/home/Home';

import NewStudent from './pages/student/newStudent/NewStudent.jsx';
import StudentList from './pages/student/studentList/StudentList.jsx';

import Profile from './pages/user/profile/Profile.jsx';
import EditUser from './pages/user/editUser/EditUser.jsx';

import NotFound from './pages/notFound/NotFound.jsx';
import RaportList from './pages/raport/raportList/RaportList.jsx';
import Prefetch from './layout/Prefetch.jsx';

function App() {
  const allRoles = [...Object.values(ROLES)];
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="login" element={<Login />} />

            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth roles={allRoles} />}>
                <Route element={<Prefetch />}>
                  <Route index element={<Home />} />
                  <Route path=":username" element={<Profile />} />
                  <Route path=":username/edit" element={<EditUser />} />
                  <Route path="students">
                    <Route index element={<StudentList />} />
                    <Route path=":username" element={<Profile />} />
                    <Route path=":username/raports" element={<RaportList />} />
                  </Route>
                  <Route element={<RequireAuth roles={[ROLES.mentor]} />}>
                    <Route path="newstudent" element={<NewStudent />} />
                  </Route>
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
