const safeParseToken = (value: string | null): string | null => {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as string;
  } catch {
    return null;
  }
};

const getLocalRefreshToken = () => {
  return safeParseToken(localStorage.getItem("refresh_token"));
};

const getLocalAccessToken = () => {
  return safeParseToken(localStorage.getItem("access_token"));
};

const updateLocalRefreshToken = (token: string) => {
  localStorage.setItem("refresh_token", JSON.stringify(token));
};

const updateLocalAccessToken = (token: string) => {
  localStorage.setItem("access_token", JSON.stringify(token));
};

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalRefreshToken,
  updateLocalAccessToken,
};

export default TokenService;
