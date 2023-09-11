import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMenu } from "../redux/actions/actions";
import translateMenuFromApi from "./translateMenuFromApi";

function useMenu() {
  const dispatch = useDispatch();
  const menuAPI = useSelector((state) => state.filteredMaster);
  const menu = translateMenuFromApi(menuAPI);

  useEffect(() => {
    dispatch(getMenu());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return menu;
}

export default useMenu;
