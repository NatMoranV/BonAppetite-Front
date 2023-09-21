import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logged, addUserLogged } from "../redux/actions/actions";
import axios from "axios";

function useAutoSignin() {
  const dispatch = useDispatch();
  const [authCompleted, setAuthCompleted] = useState(false);
  /* userLogged */

  useEffect(() => {
    const fetchValidateToken = async () => {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      if (accessToken) {
        try {
          const { data } = await axios.post(
            `https://resto-p4fa.onrender.com/auth/${accessToken}`
          );

          dispatch(logged(true));
          dispatch(addUserLogged(data));
          setAuthCompleted(true);
        } catch (error) {
          dispatch(logged(false));
          addUserLogged({
            id: "",
            email: "",
            role: "",
            name: "",
          });
          console.error(error);
          setAuthCompleted(true);
        }
      } else {
        dispatch(logged(false));
        addUserLogged({
          id: "",
          email: "",
          role: "",
          name: "",
        });
        setAuthCompleted(true);
      }
    };
    fetchValidateToken();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return authCompleted;
}

export default useAutoSignin;
