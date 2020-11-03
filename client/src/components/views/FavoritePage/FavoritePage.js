import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./FavoritePage.css";
import { Popover } from "antd";
import { IMAGE_BASE_URL } from "../../Config";

function FavoritePage() {
  const [FavoriteMovie, setFavoriteMovie] = useState([]);

  useEffect(() => {
    fetchFavoredMovie();
  }, []);

  const fetchFavoredMovie = () => {
    Axios.post("/api/favorite/getFavoredMovie", {
      userFrom: localStorage.getItem("userId"),
    }).then((response) => {
      console.log(response.data);
      setFavoriteMovie(response.data.favoritedMovie);
      if (response.data) {
      } else {
        alert("좋아하는 영화를 가져오는 데 실패했습니다.");
      }
    });
  };

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId,
      userFrom,
    };

    Axios.post("/api/favorite/removeFromFavorites", variables).then(
      (response) => {
        if (response.data.success) {
          fetchFavoredMovie();
        } else {
          alert("리스트에서 지우는 데 실패했습니다.");
        }
      }
    );
  };

  const renderCards = FavoriteMovie.map((movie, index) => {
    const content = (
      <div>
        {movie.moviePost ? (
          <img src={`${IMAGE_BASE_URL}w500${movie.moviePost}`} />
        ) : (
          "no image"
        )}
      </div>
    );
    return (
      <tr key={index}>
        <Popover content={content} title={`${movie.movieTitle}`}>
          <td>{movie.movieTitle}</td>
        </Popover>
        <td>{movie.movieRuntime} min</td>
        <td>
          <button onClick={() => onClickDelete(movie.movieId, movie.userFrom)}>
            remove
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h2>favorite movies</h2>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Runtime</th>
            <th>remove from favorite</th>
          </tr>
        </thead>
        <tbody>{renderCards}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
