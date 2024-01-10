/* eslint-disable no-unused-vars */
import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "../components/UI/Loading";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { login, selectUser } from "../feature/userSlice";
import { selectTeacher } from "../feature/teacherSlice";
import { auth } from "../firebase";
import Main from "../layouts/Main";
import Login from "../pages/auth/login";
import NotesSection from "../pages/Notes";

function TotalRoutes() {
  const user = useSelector(selectUser);
  const teacher = useSelector(selectTeacher);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setLoading(false);
      if (authUser) {
        dispatch(
          login({
            userName: authUser.displayName ? authUser.displayName : "Teacher",
            photo: authUser.photoURL,
            email: authUser.email,
            uid: authUser.uid,
            type: authUser.photoURL ? "student" : "teacher",
            role:
              authUser.uid === "3teHvZwJW0NKrWALyQjSM0RcDj52" ||
              authUser.uid === "MBoMt7JeegPDRViNmI6KcFi8fJK2" ||
              authUser.uid === "rdo53kUSqYfGo1GdQyDcp5Y3uCE2"
                ? "Admin"
                : "",
          })
        );
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        {loading ? (
          <Loading />
        ) : (
          <Routes>
            <Route path="/notes-section" element={<NotesSection />} />

            {user ? (
              <Route path="/" element={<Main />} />
            ) : (
              <Route path="/" element={<Login />} />
            )}
          </Routes>
        )}
      </Suspense>
    </Router>
  );
}

export default TotalRoutes;
