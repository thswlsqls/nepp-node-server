import { naverAxios } from "./index.js";

export const getMovieList = async (params) => {
  const result = await naverAxios.get("/v1/search/movie.json", { params });

  return result.data;
};
