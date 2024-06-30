export const isLoggedIn = () => {
  const authToken = localStorage.getItem("access_token");
  if (authToken) {
    return !!authToken;
  }
};

export const getAuthToken = () => {
  return localStorage.getItem("access_token");
};
