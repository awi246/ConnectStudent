/* eslint-disable no-unused-vars */
import { Suspense, useEffect, useState } from "react";
import Loading from "../components/UI/Loading";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { login, selectUser } from "../feature/userSlice";
import {  selectTeacher } from "../feature/teacherSlice";
import { auth } from "../firebase";
import Main from "../layouts/Main";
import Login from "../pages/auth/login";

function TotalRoutes() {
  const user = useSelector(selectUser);
  // console.log("user",user);
  const teacher = useSelector(selectTeacher);
  // console.log("teacher",teacher);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setLoading(false);
      if (authUser) {
        dispatch(
          login({
            userName: authUser.displayName,
            photo: authUser.photoURL,
            email: authUser.email,
            uid: authUser.uid,
            type: "student",
          })
        );
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense fallback={<Loading />}>
      {loading ? (
        <Loading />
      ) : user && user.type === "student" ? (
        <Main />
      ) : (
        <Login />
      )}
    </Suspense>
  );
}

export default TotalRoutes;
