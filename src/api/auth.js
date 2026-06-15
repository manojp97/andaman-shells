import API from "./api";

export const login = async (credentials) => {
  const res = await API.post("/auth/login", credentials);
  return res.data;
};

export const register = async (payload) => {
  const res = await API.post("/auth/register", payload);
  return res.data;
};

export const logout = async () => {
  const res = await API.post("/auth/logout");
  return res.data;
};

export const refreshToken = async ({ refreshToken }) => {
  const res = await API.post("/auth/refresh-token", {
    refreshToken,
  });
  return res.data;
};

export const getProfile = async () => {
  const res = await API.get("/auth/profile");
  return res.data;
};

export const updateProfile = async (profile) => {
  const res = await API.put("/auth/profile", profile);
  return res.data;
};

export const changePassword = async (payload) => {
  const res = await API.post("/auth/change-password", payload);
  return res.data;
};
export const adminRegister = async (payload) => {
  const res = await API.post("/admin/register", payload);
  return res.data;
};

export const adminLogin = async (credentials) => {
  const res = await API.post("/admin/login", credentials);
  return res.data;
};
export default {
  login,
  register,
  logout,
  refreshToken,
  getProfile,
  updateProfile,
  changePassword,
  adminLogin,
  adminRegister,
};
