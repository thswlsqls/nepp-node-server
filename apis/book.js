import { naverAxios } from "./index.js";

export const getBookList = async (params) => {
  const result = await naverAxios.get("/v1/search/book.json", { params });

  return result.data;
};

export const getBookDetail = async (params) => {
  const result = await naverAxios.get("/v1/search/book_adv.json", { params });

  return result.data;
};
