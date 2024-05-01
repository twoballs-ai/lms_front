const getLocalRefreshToken = () => {
    const refresh_token = JSON.parse(localStorage.getItem("refresh_token"));
    return refresh_token;
  };
  
  const getLocalAccessToken = () => {
    const access_token = JSON.parse(localStorage.getItem("access_token"));
    return access_token;
  };
  
  const updateLocalRefreshToken = (token) => {
    let refresh_token = JSON.parse(localStorage.getItem("refresh_token"));
    refresh_token = token;
    localStorage.setItem("refresh_token", JSON.stringify(refresh_token));
  };

  const updateLocalAccessToken = (token) => {
    let access_token = JSON.parse(localStorage.getItem("access_token"));
    access_token = token;
    localStorage.setItem("access_token", JSON.stringify(access_token));
  };
  
  const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalRefreshToken,
    updateLocalAccessToken,
  };
  
  export default TokenService;