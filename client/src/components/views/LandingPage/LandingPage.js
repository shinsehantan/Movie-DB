import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "./Sections/MainImage";
import axios from "axios";
import GridCards from "../commons/GridCards";
import { Row } from "antd";
import Grid from "antd/lib/card/Grid";

{
  /* 선언, useEffect, useState부분을 아예 랜딩페이지 밖에서 하려고 했었음 ㅠ */
}
function LandingPage() {
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [Movies, setMovies] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(0);
  const [rainyPoster, setrainyPoster] = useState(null);

  {
    /* 2. useEffent 사용, fetch 사용, 괄호 종류 헤맴 */
  }
  {
    /* setMainMovieImage = {} 이런 식으로 사용해서 계속 오류났음 */
  }

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    // const rainy_url = `${API_URL}search/movie?api_key=${API_KEY}&query=A+Rainy+Day+in+New+York`;
    fetchMovies(endpoint);
    // RainyFetch(rainy_url);
  }, []);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        setMovies([...Movies, ...response.results]);
        setCurrentPage(response.page);
        if (CurrentPage === 0) {
          setMainMovieImage(response.results[0]);
        }
      });
  };

  // const RainyFetch = (rainy_url) => {
  //   fetch(rainy_url)
  //     .then((response) => response.json())
  //     .then((response) => {
  //       // console.log(response.results[0]);
  //       setrainyPoster(response.results[0]);
  //     });
  // };

  const onClickHandler = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetchMovies(endpoint);
  };

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {/* 1. 여기서 메인 이미지 넣는 방법 헤맴 */}
      {/* 버튼 눌러도, 메인 이미지는 고정하는 방법 잊음 */}
      {MainMovieImage && (
        <MainImage
          // image={`${IMAGE_BASE_URL}w1280${rainyPoster.backdrop_path}`}
          // title={rainyPoster.original_title}
          // text={rainyPoster.overview}
          image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          text={MainMovieImage.overview}
        />
      )}

      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>Movies by latest</h2>
        <hr />
        {/* map,Fragment 사용법 잊음 */}
        {/* movie.poster_path ? 이부분도 잊음 */}
        <Row gutter={[16, 16]}>
          {Movies &&
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCards
                  landingpage={true}
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                      : null
                  }
                  movieName={movie.original_title}
                  movieId={movie.id}
                />
              </React.Fragment>
            ))}
        </Row>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={onClickHandler}>Load More</button>
      </div>
    </div>
  );
}

export default LandingPage;
