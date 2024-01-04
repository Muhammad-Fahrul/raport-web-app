import { redirect } from "react-router-dom";

export const authLoader = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;
  if (userInfo) {
    throw redirect("/");
  }

  return null;
};

export const mentorLoader = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;
  if (userInfo) {
    if (!userInfo.isMentor) {
      throw redirect("/notfound");
    }
  } else {
    throw redirect("/login");
  }

  return null;
};

export const raportLoader = ({ params }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;

  if (!userInfo.isMentor) {
    if (userInfo._id !== params.studentId) {
      throw redirect("/notfound");
    }
  }

  return null;
};

export const userLoader = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;
  if (!userInfo) {
    throw redirect("/login");
  }
  return null;
};
