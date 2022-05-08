import axios from "@/axiosConfig";
import {login, password} from "@/constants"

export const simulateLoginRequest = async () => {
  // setup credentials or warn user to provide them

  if (!login || !password) {
    console.error(
      "Please, add password and username to the local storage and try again"
    );
    return;
  }

  return axios.post("login_check", {
    _username: login,
    _password: password,
  });
};
