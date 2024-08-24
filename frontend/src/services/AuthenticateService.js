const endpoint = "http://localhost:8000";

export default class AuthenticateService {
  async postLoginUser(userInformation) {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userInformation.username,
          email: userInformation.username,
          password: userInformation.password,
        }),
        credentials: "include",
      };
      const loginResp = await fetch(endpoint + "/login/", options);
      return await loginResp.json();
    } catch (e) {
      console.error(`Unable to login user: ${e}`);
      return e.response;
    }
  }

  async postSignUpUser(userInformation) {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: userInformation.first_name,
          last_name: userInformation.last_name,
          username: userInformation.username,
          email: userInformation.email,
          password: userInformation.password,
        }),
        credentials: "include",
      };
      const signupResp = await fetch(endpoint + "/sign-up/", options);
      return await signupResp.json();
    } catch (e) {
      console.error(`Unable to sign up user: ${e}`);
      return e.response;
    }
  }
  async postLogOutUser() {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      const logoutResp = await fetch(endpoint + "/logout/", options);
      return await logoutResp.json();
    } catch (e) {
      console.error(`Unable to logout user: ${e}`);
    }
  }
  async getAuthenticateUser() {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      const authenticateResp = await fetch(
        endpoint + "/authenticate/",
        options
      );
      return await authenticateResp.json();
    } catch (e) {
      console.error(`Unable to authenticate user: ${e}`);
      return e.response;
    }
  }
}
