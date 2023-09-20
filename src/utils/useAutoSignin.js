import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logged, addUserLogged } from "../redux/actions/actions";
import axios from "axios";

function useAutoSignin() {
  const dispatch = useDispatch();
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
          dispatch(
            addUserLogged({
              id: data.uid,
              email: data.email,
              role: data.role,
              name: data.name,
            })
          );
        } catch (error) {
          dispatch(logged(false));
          addUserLogged({
            id: "",
            email: "",
            role: "",
            name: "",
          });
          console.error(error);
        }
      } else {
        dispatch(logged(false));
        addUserLogged({
          id: "",
          email: "",
          role: "",
          name: "",
        });
      }
    };
    fetchValidateToken();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useAutoSignin;
