import React, { useState, useEffect } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "./Section/MovieInfo";
import { Descriptions, Badge } from "antd";
import { Row } from "antd";
import GridCards from "../commons/GridCards";
import Favorite from "./Section/Favorite";

function MovieDetail(props) {
  let movieId = props.match.params.movieId;
  const [movie, setmovie] = useState([]);
  const [cast, setcast] = useState([]);
  const [crewButton, setcrewButton] = useState(false);

  useEffect(() => {
    // const movieId = props.match.params.movieId;
    let movieURL = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    let getcastURL = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;
    Fetch(movieURL);
    CastFetch(getcastURL);
  }, []);

  const Fetch = (movieURL) => {
    fetch(movieURL)
      .then((response) => response.json())
      .then((response) => {
        setmovie(response);
        // console.log(response);
      });
  };

  const CastFetch = (getcastURL) => {
    fetch(getcastURL)
      .then((response) => response.json())
      .then((response) => {
        setcast(response.cast);
      });
  };

  const crewInfoHandler = () => {
    setcrewButton(!crewButton);
  };

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {/* main */}
      {movie && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${movie.backdrop_path}`}
          title={movie.original_title}
          text={movie.overview}
        />
      )}

      {/* Favorie Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
          marginRight: "20px",
        }}
      >
        <Favorite
          movieInfo={movie}
          movieId={movieId}
          userFrom={localStorage.getItem("userId")}
        />
      </div>

      {/* Movie Info */}
      {movie && <MovieInfo movie={movie} />}
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={crewInfoHandler}> Crew Info </button>
      </div>

      {/* Crew Info Button */}
      {crewButton && (
        <div style={{ width: "85%", margin: "1rem auto" }}>
          <Row gutter={[16, 16]}>
            {cast &&
              cast.map((cast, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    crews
                    image={
                      cast.profile_path
                        ? `${IMAGE_BASE_URL}w500${cast.profile_path}`
                        : null
                    }
                    CastName={cast.name}
                  />
                </React.Fragment>
              ))}
          </Row>
        </div>
      )}
    </div>
  );
}

export default MovieDetail;
