import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import {
  updateMovie,
  fetchMovieById,
  clearSelectedMovie,
} from "../../features/movies/moviesSlice";
import AddEditModel from "../../components/addEditmodel/AddEditModel";
import DeleteModal from "../../components/deleteModel/DeleteModel";
import RateModal from "../../components/rateModel/RateModel";
import "./Details.scss";
import RatingStars from "../../components/rating/RatingStars";

const Details = ({ history }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const movie = useSelector((state) => state.movies.selectedMovie);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  const [addEditModalOpen, setAddEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [rateModalOpen, setRateModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchMovieById(id));
    return () => {
      dispatch(clearSelectedMovie());
    };
  }, [dispatch, id]);

  const openMovieModal = (movie) => {
    setAddEditModalOpen(true);
  };
  const openDeleteModal = (movie) => {
    setDeleteModalOpen(true);
  };

  const openRateModal = (movie) => {
    setRateModalOpen(true);
  };
  const handelWatched = (movie) => {
    const updatedMovie = {
      ...movie,
      watched: !movie.watched,
    };
    dispatch(updateMovie({ id: movie.id, updatedMovie }));
    console.log(movie);
  };

  return (
    <div className="container">
      <div className="breadcrumb glass_bg">
        <div className="brd_titles">
          <Link to={"/"}> {"Home  "} </Link> /{" "}
          <span style={{ color: "gray" }}>Details</span>
        </div>
        <h1>Details</h1>
        <div className="add_btn_sec"></div>
      </div>
      <div className="page_body glass_bg">
        {status === "loading" ?? <div>Loading...</div>}
        {status === "failed" ?? <div>Error: {error}</div>}
        {!movie ? (
          <div>Movie not found</div>
        ) : (
          <>
            <div className="movie_details_main">
              <div className="m_details_body">
                <div className="m_d_b_l">
                  <h2>{movie.title}</h2>
                  <p>{movie.description}</p>
                  <div>
                    <b>Rating:</b> &nbsp; &nbsp;
                    <div className="card_ratings">
                      <RatingStars rating={movie.rating} />
                    </div>
                  </div>
                  <div>
                    <b>Release Year:</b> &nbsp; &nbsp; {movie.releaseYear}
                  </div>
                  <div>
                    <b>Genre:</b> &nbsp; &nbsp; {movie.genre}
                  </div>
                  <div>
                    <b>Review:</b> &nbsp; &nbsp; {movie.review}
                  </div>
                </div>
                <div className="m_d_b_r">
                  <i
                    className="fa-solid fa-pencil"
                    style={{ color: "#03fb76", cursor: "pointer" }}
                    onClick={() => openMovieModal(movie)}
                  ></i>
                  &nbsp;
                  <i className="fa-solid fa-grip-lines-vertical"></i>
                  &nbsp;
                  <i
                    className="fa-solid fa-trash-can"
                    style={{ color: "#dc043a", cursor: "pointer" }}
                    onClick={() => openDeleteModal(movie)}
                  ></i>
                </div>
              </div>
              <hr style={{margin:0}}/>
              <div className="m_details_foot">
                <Button
                  bg={"info"}
                  title={"Rate"}
                  icon={"fa-solid fa-star"}
                  method={openRateModal}
                  methodValue={movie}
                />
                {movie.watched ? (
                  <Button
                    bg={"kamla"}
                    title={"Unwatched"}
                    icon={"fa-solid fa-clock"}
                    method={handelWatched}
                    methodValue={movie}
                  />
                ) : (
                  <Button
                    bg={"begni"}
                    title={"Watched"}
                    icon={"fa-solid fa-circle-check"}
                    method={handelWatched}
                    methodValue={movie}
                  />
                )}
              </div>
            </div>
            <AddEditModel
              isOpen={addEditModalOpen}
              onRequestClose={() => setAddEditModalOpen(false)}
              movie={movie}
            />
            <DeleteModal
              isOpen={deleteModalOpen}
              onRequestClose={() => setDeleteModalOpen(false)}
              movie={movie}
            />
            <RateModal
              isOpen={rateModalOpen}
              onRequestClose={() => setRateModalOpen(false)}
              movie={movie}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Details;
