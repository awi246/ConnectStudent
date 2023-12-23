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
    <Router>
      <Suspense fallback={<Loading />}>
        {loading ? (
          <Loading />
        ) : (
          <Routes>
            {/* Add a route for the notes-section that is not protected */}
            <Route path="/notes-section" element={<NotesSection />} />

            {user && user.type === "student" ? (
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
