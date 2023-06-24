import * as React from "react";
import { Snackbar, Alert } from "@mui/material/";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { closeAlert } from "../Redux/Slices/alertSlice";
import { useNavigate } from "react-router-dom";

const AlertUi = React.forwardRef(function AlertUi(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertSnackBar = () => {
  const dispatch = useDispatch();
  const { open, message, severity, duration, nextRoute } = useSelector(
    (state) => state.alert
  );
  const navigate = useNavigate();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeAlert());
    try {
      navigate(nextRoute);
    } catch (error) {}
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <AlertUi
          onClose={handleClose}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </AlertUi>
      </Snackbar>
    </>
  );
};

export default AlertSnackBar;
