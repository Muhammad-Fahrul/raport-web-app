import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainLayout from './layout/MainLayout';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import CreateStudent from './pages/createStudent/CreateStudent.jsx';
import NotFound from './pages/notFound/NotFound.jsx';

import { Provider } from 'react-redux';
import store from './store.js';
import MyStudents from './pages/students/MyStudents.jsx';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="newstudent" element={<CreateStudent />} />
            <Route path="students" element={<MyStudents />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
