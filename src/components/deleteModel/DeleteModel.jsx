import React from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { removeMovie } from "../../features/movies/moviesSlice";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const DeleteModal = ({ isOpen, onRequestClose, movie }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleDelete = () => {
    dispatch(removeMovie(movie.id)).then(() => {
      navigate(`/`);
    });
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete the movie "{movie.title}"?</p>
      <div className="btn_div">
        <button type="button" onClick={handleDelete} className="cancle_button">
          Yes
        </button>
        <button type="submit" className="save_button" onClick={onRequestClose}>
          No
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
