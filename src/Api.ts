import axios from "axios";

export const getPost = async () => {
  return await axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.data)
    .catch((err) => err);
};

export const getPostById = async (id: any) => {
  return await axios
    .get(`http://localhost:3030/posts`, {
      params: {
        id: id,
      },
    })
    .then((res) => res.data[0])
    .catch((err) => err);
};

export const createPost = async (props: { title: string; body: string }) => {
  return await axios
    .post("http://localhost:3030/posts", {
      ...props,
      userId: 12,
      id: Math.floor(Math.random() * 1000).toLocaleString(),
    })
    .then((res) => res.data)
    .catch((err) => err);
};

export const getUser = async () => {
  return await axios
    .get(`https://fake-json-api.mock.beeceptor.com/users`)
    .then((res) => res.data)
    .catch((err) => console.log("error caught", err));
};

export const getUserById = async (userId: any) => {
  return await axios
    .get(`/${userId}`, {
      baseURL: "https://fake-json-api.mock.beeceptor.com/users",
    })
    .then((res) => res.data)
    .catch((err) => console.log("error caught", err));
};
