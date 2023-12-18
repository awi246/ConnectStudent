import { Suspense, useEffect, useState } from "react";
import Loading from "../components/UI/Loading";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { login, selectUser } from "../feature/userSlice";
import { auth } from "../firebase";
import Main from "../layouts/Main";
import Login from "../components/auth/login";

function TotalRoutes() {
  const user = useSelector(selectUser);
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
