import axios from "axios";

const setBearer = (bearerToken) => {
  if (bearerToken) {
    axios.defaults.headers.common["authorization"] = `Bearer ${bearerToken}`;
  } else {
    delete axios.defaults.headers.common["authorization"];
  }
};

export default setBearer;
