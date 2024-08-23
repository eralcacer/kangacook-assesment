const endpoint = "http://localhost:8000";

export default class AuthenticateService {
  async postLoginUser(userInformation) {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userInformation.username,
          email: userInformation.email,
          password: userInformation.password,
        }),
      };
      const loginResp = await fetch(endpoint + "/login/", options);
      return await loginResp.json();
    } catch (e) {
      console.error(`Unable to login user: ${e}`);
      return e.response;
    }
  }
}
