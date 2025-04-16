import api from "configs/api";

const getProfile = () => api.get("user/whoami").then((res) => res || false);

const getPosts = () => api.get("post/my");

const getAllPosts = () => api.get(""); //تا تمام پشت ها زا به ما بدهد loacalhost:3400 درخواست می فرستد به

export { getProfile, getPosts, getAllPosts }  