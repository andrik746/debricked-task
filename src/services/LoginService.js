import axios from "@/axiosConfig";

export const simulateLoginRequest = async () => {
  // setup credentials or warn user to provide them
  const hardcodedUsername = localStorage.getItem("username");
  const hardcodedPassword = localStorage.getItem("password");
  if (!hardcodedUsername || !hardcodedPassword) {
    console.error(
      "Please, add password and username to the local storage and try again"
    );
    return;
  }

  return axios.post("login_check", {
    _username: hardcodedUsername,
    _password: hardcodedPassword,
  });
};
