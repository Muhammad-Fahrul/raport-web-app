import { redirect } from "react-router-dom";

export const signLoader = ({ request }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;
  if (userInfo) {
    throw redirect("/");
  }
  return new URL(request.url).searchParams.get("message");
};

export const userLoader = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;
  if (!userInfo) {
    throw redirect("/login?message=You must log in first");
  }
  return null;
};

export const mentorLoader = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;
  if (!userInfo.isMentor) {
    throw redirect("/notfound");
  }
  return null;
};

export const raportLoader = ({ params }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;
  if (!userInfo.isMentor && userInfo._id !== params.studentId) {
    throw redirect("/notfound");
  }
  return null;
};
