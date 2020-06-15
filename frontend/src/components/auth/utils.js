import decode from "jwt-decode";

export const isLoggedIn = () => {
  let user = getProfile();
  if (!user) {
    return false;
  }

  if (Math.round(new Date().getTime() / 1000) < user.exp) {
    return true;
  }

  return false;
};

export const getProfile = () => {
  let token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  let user = decode(token);
  return user;
};
