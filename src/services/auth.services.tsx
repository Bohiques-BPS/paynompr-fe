export const setToken = (data: { data: {} }) => {
  localStorage.setItem("user", JSON.stringify(data.data));
};

export const fetchToken = () => {
  const data = localStorage.getItem("user");
  if (data) {
    const user = JSON.parse(data);

    return user.access_token;
  }
  return null;
};

export const fetchName = () => {
  const data = localStorage.getItem("user");
  if (data) {
    const user = JSON.parse(data);

    return user.name;
  }
  return null;
};

export const setLogout = () => {
  localStorage.removeItem("user");
};
