import axios from "axios";
import { Item } from "../models/menu";

const instance = axios.create({
  baseURL:
    "https://menuofmenus-58ec1-default-rtdb.europe-west1.firebasedatabase.app/items.json",
  headers: {
    "content-type": "application/json",
  },
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    throw new Error(err.response.data.message);
  }
);

const api = {
  getMenuItems: () =>
    instance({
      method: "GET",
    }),
  updateMenuItems: (item: Item | null) =>
    instance({
      method: "PUT",
      data: {
        item,
      },
    }),
};

export default api;
