import React from "react";
import "./Card.scss";
import Button from "../button/Button";
import { Link } from "react-router-dom";
import RatingStars from "../rating/RatingStars";

const Card = ({
  movie,
  openRateModal,
  handelWatched,
  openDeleteModal,
  openMovieModal,
}) => {
  return (
    <div className="card_main">
      <div className="card_header">
        <div className="card_title">
          <Link to={`/details/${movie?.id}`}>{movie.title} </Link>
        </div>
        <div className="card_action">
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
      <div className="card_body">
        <div className="card_desc">
          <Link to={`/details/${movie.id}`}>
            {movie.description}
          </Link>
        </div>
        <hr style={{ width: "100%", margin: 0 }} />
        <div className="card_oth_details">
          <div className="card_r_date">
            <label htmlFor="r_date">Realise Date</label>
            <span>{movie.releaseYear}</span>
          </div>
          <div className="card_genre">
            <label htmlFor="r_date">Genre</label>
            <span>{movie.genre}</span>
          </div>
        </div>
        <div className="card_ratings">
          <RatingStars rating={movie.rating} />
        </div>
      </div>
      <div className="card_footer">
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
  );
};

export default Card;
