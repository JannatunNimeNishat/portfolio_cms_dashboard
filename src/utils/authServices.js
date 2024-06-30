export const isLoggedIn = () => {
    const authToken = localStorage.getItem("access_token");
    if (authToken) {
      return !!authToken;
    }
  };