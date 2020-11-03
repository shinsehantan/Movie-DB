import React, { useEffect, useState } from "react";
import Axios from "axios";
import responsiveObserve from "antd/lib/_util/responsiveObserve";
import { Button } from "antd";

// export default Favorite;

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRuntime = props.movieInfo.runtime;

  const [favoriteNumber, setfavoriteNumber] = useState(0);
  const [favorited, setfavorited] = useState(false);

  let variables = {
    userFrom: userFrom,
    movieId: movieId,
    movieTitle: movieTitle,
    moviePost: moviePost,
    movieRuntime: movieRuntime,
  };
  console.log("var:", variables);

  useEffect(() => {
    Axios.post("/api/favorite/favoriteNumber", variables).then((response) => {
      //   console.log(response.data);
      setfavoriteNumber(response.data.favoriteNumber);
      if (response.data.success) {
      } else {
        alert("숫자 정보를 가져오는 데 실패했습니다.");
      }
    });

    Axios.post("/api/favorite/favorited", variables).then((response) => {
      //   console.log("favorited", response.data);
      if (response.data.success) {
        setfavorited(response.data.favorited);
      } else {
        alert("정보를 가져오는 데 실패했습니다.");
      }
    });
  }, []);

  const onClickFavorite = () => {
    if (favorited) {
      Axios.post("/api/favorite/removeFromFavorite", variables).then(
        (response) => {
          if (response.data.success) {
            setfavoriteNumber(favoriteNumber - 1);
            setfavorited(!favorited);
          } else {
            alert("Favorite 리스트에서 지우는 것을 실패했습니다.");
          }
        }
      );
    } else {
      Axios.post("/api/favorite/addToFavorite", variables).then((response) => {
        console.log("addbtn :", variables);
        if (response.data.success) {
          setfavoriteNumber(favoriteNumber + 1);
          setfavorited(!favorited);
        } else {
          alert("Favorite 리스트에 추가하는 것을 실패했습니다.");
        }
      });
    }
  };

  return (
    <div>
      <Button onClick={onClickFavorite}>
        {favorited ? "Not Favorite" : "Add to Favorite"} {favoriteNumber}
      </Button>
    </div>
  );
}
export default Favorite;
