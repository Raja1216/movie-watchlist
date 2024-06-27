import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { updateMovie  } from "../../features/movies/moviesSlice";

Modal.setAppElement("#root");

const RateModal = ({ isOpen, onRequestClose, movie }) => {
  const [rating, setRating] = useState(movie.rating);
  const [review, setReview] = useState(movie.review);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedMovie = {
      ...movie,
      rating,
      review,
    };
    dispatch(updateMovie({ id: movie.id, updatedMovie }));
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Rate and Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Review:</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        </div>
        <div className="btn_div">
        <button type="button" onClick={onRequestClose} className="cancle_button">
        Cancel
        </button>
        <button type="submit" className="save_button">
          Save
        </button>
      </div>
      </form>
    </Modal>
  );
};

export default RateModal;
