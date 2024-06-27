import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./AddEditModel.scss";
import { useDispatch } from "react-redux";
import { createMovie, updateMovie } from "../../features/movies/moviesSlice";

const AddEditModel = ({ isOpen, onRequestClose, movie }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [genre, setGenre] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const movieData = {
      title,
      description,
      releaseYear,
      genre,
      watched: movie ? movie.watched : false,
      rating: movie ? movie.rating : 0,
      review: movie ? movie.review : "",
    };

    if (movie) {
      dispatch(updateMovie({ id: movie.id, updatedMovie: movieData }));
    } else {
      dispatch(createMovie(movieData));
    }

    onRequestClose();
  };

  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setDescription(movie.description);
      setReleaseYear(movie.releaseYear);
      setGenre(movie.genre);
    } else {
      setTitle("");
      setDescription("");
      setReleaseYear("");
      setGenre("");
    }
  }, [movie]);
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>{movie ? "Edit Movie" : "Add Movie"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Release Year:</label>
          <input
            type="number"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
          />
        </div>
        <div>
          <label>Genre:</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <div className="btn_div">
          <button type="button" onClick={onRequestClose} className="cancle_button">
            Cancel
          </button>
          <button type="submit" className="save_button">Save</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddEditModel;
