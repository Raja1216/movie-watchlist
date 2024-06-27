import axios from "axios";

const api = axios.create({
  baseURL: "https://movie-watch-list-fdfr.onrender.com",
});

export const getMovies = () => api.get("/movies");
export const getMovieById = (id) => api.get(`/movies/${id}`);
export const addMovie = (movie) => api.post("/movies", movie);
export const editMovie = (id, updatedMovie) =>
  api.put(`/movies/${id}`, updatedMovie);
export const deleteMovie = (id) => api.delete(`/movies/${id}`);

export default api;
