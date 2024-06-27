import React, { useEffect, useState } from "react";
import "./Home.scss";
import Button from "../../components/button/Button";
import Card from "../../components/card/Card";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, updateMovie } from "../../features/movies/moviesSlice";
import AddEditModel from "../../components/addEditmodel/AddEditModel";
import DeleteModal from "../../components/deleteModel/DeleteModel";
import RateModal from "../../components/rateModel/RateModel";

const Home = () => {
  const movies = useSelector((state) => state.movies.movies);
  const loading = useSelector((state) => state.movies.loading);
  console.log(loading);
  const dispatch = useDispatch();
  const [addEditModalOpen, setAddEditModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [rateModalOpen, setRateModalOpen] = useState(false);

  const openMovieModal = (movie) => {
    setSelectedMovie(movie);
    setAddEditModalOpen(true);
  };
  const openDeleteModal = (movie) => {
    setSelectedMovie(movie);
    setDeleteModalOpen(true);
  };

  const openRateModal = (movie) => {
    setSelectedMovie(movie);
    setRateModalOpen(true);
  };
  const handelWatched = (movie) => {
    const updatedMovie = {
      ...movie,
      watched: !movie.watched,
    };
    dispatch(updateMovie({ id: movie.id, updatedMovie }));
  };

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <div className="breadcrumb glass_bg">
          <div className="brd_titles">
            {" "}
            <span style={{ color: "gray" }}>Home/</span>
          </div>
          <h1>Home</h1>
          <div className="add_btn_sec">
            <Button
              bg={"gulab"}
              title={"Add Movie"}
              icon={"fa-solid fa-circle-plus"}
              method={openMovieModal}
            />
          </div>
        </div>
        <div className="page_body glass_bg">
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            <>
              {movies.map((movie, i) => (
                <Card
                  key={i}
                  movie={movie}
                  openRateModal={openRateModal}
                  handelWatched={handelWatched}
                  openDeleteModal={openDeleteModal}
                  openMovieModal={openMovieModal}
                />
              ))}
            </>
          )}
        </div>
      </div>

      {selectedMovie !== null && (
        <>
          <AddEditModel
            isOpen={addEditModalOpen}
            onRequestClose={() => setAddEditModalOpen(false)}
            movie={selectedMovie}
          />
          <DeleteModal
            isOpen={deleteModalOpen}
            onRequestClose={() => setDeleteModalOpen(false)}
            movie={selectedMovie}
          />
          <RateModal
            isOpen={rateModalOpen}
            onRequestClose={() => setRateModalOpen(false)}
            movie={selectedMovie}
          />
        </>
      )}
      {selectedMovie === null && (
        <AddEditModel
          isOpen={addEditModalOpen}
          onRequestClose={() => setAddEditModalOpen(false)}
          movie={null}
        />
      )}
    </>
  );
};

export default Home;
