import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile.jsx";
import CreateStudent from "./pages/createStudent/CreateStudent.jsx";
import MyStudents from "./pages/students/MyStudents.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";

import { Provider } from "react-redux";
import store from "./store.js";
import {
  signLoader,
  mentorLoader,
  raportLoader,
  userLoader,
} from "./pages/loader.js";
import Raport from "./pages/raport/Raport.jsx";
import TopStudents from "./pages/topStudents.jsx/TopStudents.jsx";
import EditUser from "./pages/editUser/EditUser.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} loader={signLoader} />
      <Route path="register" element={<Register />} />
      <Route loader={userLoader}>
        <Route loader={mentorLoader}>
          <Route path="me/students/new" element={<CreateStudent />} />
          <Route path="me/students" element={<MyStudents />} />
        </Route>
        <Route
          path="me/students/raports/:studentId/:studentName"
          element={<Raport />}
          loader={raportLoader}
        />
        <Route path="me/:userId" element={<Profile />} />
        <Route path="/me/update" element={<EditUser />} />
      </Route>
      <Route path="rank" element={<TopStudents />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
