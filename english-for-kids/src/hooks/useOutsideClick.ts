import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../redux/reducers/modalReducer";
import { RootState } from "../redux/store";

export const useOutsideClick = (ref: any) => {
  const dispatch = useDispatch();
  const { isActiveSidebar } = useSelector((state: RootState) => state.modal);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as HTMLElement) &&
        isActiveSidebar
      ) {
        dispatch(toggleSidebar());
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);
};
