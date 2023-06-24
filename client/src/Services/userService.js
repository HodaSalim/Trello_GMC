import {
  registrationStart,
  registrationEnd,
  loginStart,
  loginFailure,
  loginSuccess,
  loadSuccess,
  loadFailure,
  loadStart,
  fetchingStart,
  fetchingFinish,
} from "../Redux/Slices/userSlice";
import { openAlert } from "../Redux/Slices/alertSlice";
import setBearer from "../api/setBearer";
import { api } from "../api";

export const register = async (
  { name, surname, email, password, repassword },
  dispatch
) => {
  dispatch(registrationStart());
  if (password !== repassword) {
    dispatch(
      openAlert({
        message: "Your passwords does not match!",
        severity: "error",
      })
    );
  } else {
    try {
      const res = await api.post(`user/register`, {
        name,
        surname,
        email,
        password,
      });
      dispatch(
        openAlert({
          message: res.data.message,
          severity: "success",
          nextRoute: "/login",
          duration: 1500,
        })
      );
    } catch (error) {
      dispatch(
        openAlert({
          message: error?.response?.data?.errMessage
            ? error.response.data.errMessage
            : error.message,
          severity: "error",
        })
      );
    }
  }
  dispatch(registrationEnd());
};

export const login = async ({ email, password }, dispatch) => {
  dispatch(loginStart());

  try {
    const res = await api.post(`/user/login`, { email, password });
    const { user, message } = await res.data;

    dispatch(loginSuccess({ user }));

    dispatch(
      openAlert({
        message,
        severity: "success",
        duration: 500,
        nextRoute: "/boards",
      })
    );
  } catch (error) {
    dispatch(loginFailure());
    dispatch(
      openAlert({
        message: error?.response?.data?.errMessage
          ? error.response.data.errMessage
          : error.message,
        severity: "error",
      })
    );
  }
};

export const loadUser = async (dispatch) => {
  dispatch(loadStart());
  if (!localStorage.token) return dispatch(loadFailure());
  setBearer(localStorage.token);
  try {
    const res = await api.get("user/get-user");
    dispatch(loadSuccess({ user: res.data }));
  } catch (error) {
    dispatch(loadFailure());
  }
};

export const getUserFromEmail = async (email, dispatch) => {
  dispatch(fetchingStart());
  if (!email) {
    dispatch(
      openAlert({
        message: "Please write an email to invite",
        severity: "warning",
      })
    );
    dispatch(fetchingFinish());
    return null;
  }

  try {
    const res = await api.post("user/get-user-with-email", { email });
    dispatch(fetchingFinish());
    return res.data;
  } catch (error) {
    dispatch(
      openAlert({
        message: error?.response?.data?.errMessage
          ? error.response.data.errMessage
          : error.message,
        severity: "error",
      })
    );
    dispatch(fetchingFinish());
    return null;
  }
};
