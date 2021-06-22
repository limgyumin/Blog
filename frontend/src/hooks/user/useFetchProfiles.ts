import { RootState } from "modules";
import { fetchProfilesThunk, initUserError } from "modules/user";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function useFetchProfiles() {
  const { error, data } = useSelector((state: RootState) => state.users);
  const { userCount, adminProfile, profiles } = data;

  const dispatch = useDispatch();

  const fetchProfilesHandler = useCallback(() => {
    dispatch(fetchProfilesThunk());
  }, [dispatch]);

  useEffect(() => {
    fetchProfilesHandler();
  }, [fetchProfilesHandler]);

  useEffect(() => {
    if (error) {
      toast.error("사용자 부분에서 오류가 발생했어요!");
      dispatch(initUserError());
    }
  }, [error, dispatch]);

  return {
    userCount,
    adminProfile,
    profiles,
  };
}
