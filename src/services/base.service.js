import Store from "../store";
import Router from "../router";

export const authHeader = () => {
  const { currentUser } = Store.state;

  return {
    "Content-Type": "application/json",
    "authorization": "Bearer " + currentUser?.token
  };
};

export const handleResponseWithLoginCheck = (promise) => {
  return promise.then(data => {
    return data;
  }).catch((error) => {
    const status = error?.response?.status;

    // Unauthorized or Forbidden
    if (status === 401 || status === 403) {
      Store.dispatch("clearUser").then(() => {
        Router.push("/login").catch((error) => {
          console.log(error)
        });
      });
    }
    return Promise.reject(error)
  });
};