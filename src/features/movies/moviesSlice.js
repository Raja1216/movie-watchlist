import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMovies, getMovieById, addMovie, editMovie, deleteMovie } from '../../services/api';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await getMovies();
  return response.data;
});

export const fetchMovieById = createAsyncThunk('movies/fetchMovieById', async (id) => {
  const response = await getMovieById(id);
  return response.data;
});

export const createMovie = createAsyncThunk('movies/createMovie', async (movie) => {
  const response = await addMovie(movie);
  return response.data;
});

export const updateMovie = createAsyncThunk('movies/updateMovie', async ({ id, updatedMovie }) => {
  const response = await editMovie(id, updatedMovie);
  return response.data;
});

export const removeMovie = createAsyncThunk('movies/removeMovie', async (id) => {
  await deleteMovie(id);
  return id;
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    selectedMovie: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedMovie(state) {
      state.selectedMovie = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        const index = state.movies.findIndex(movie => movie.id === action.payload.id);
        if (index !== -1) {
          state.movies[index] = action.payload;
        }
        if (state.selectedMovie && state.selectedMovie.id === action.payload.id) {
          state.selectedMovie = action.payload;
        }
      })
      .addCase(removeMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter(movie => movie.id !== action.payload);
      });
  },
});
export const { clearSelectedMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
