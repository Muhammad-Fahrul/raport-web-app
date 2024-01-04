import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/home/Home";
import { Provider } from "react-redux";
import store from "./store.js";
import Profile from "./pages/profile/Profile.jsx";
import CreateStudent from "./pages/createStudent/CreateStudent.jsx";
import Students from "./pages/students/Students.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";
import {
  authLoader,
  mentorLoader,
  raportLoader,
  userLoader,
} from "./pages/loader.js";
import Raport from "./pages/raport/Raport.jsx";
import TopStudents from "./pages/topStudents.jsx/TopStudents.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route loader={authLoader}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route loader={userLoader}>
        <Route loader={mentorLoader}>
          <Route path="me/students/new" element={<CreateStudent />} />
          <Route path="me/students" element={<Students />} />
        </Route>
        <Route
          path="me/students/raports/:studentId/:studentName"
          element={<Raport />}
          loader={raportLoader}
        />
        <Route path="me/:userId" element={<Profile />} />
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
