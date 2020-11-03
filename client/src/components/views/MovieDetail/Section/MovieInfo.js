import React from "react";
import { Descriptions, Badge } from "antd";

function MovieInfo(prop) {
  const movie = prop.movie;
  // const { movie } = prop

  return (
    <div>
      <Descriptions title="Movie Info" bordered>
        <Descriptions.Item label="Title">
          {movie.original_title}
        </Descriptions.Item>
        <Descriptions.Item label="Released Date">
          {movie.release_date}
        </Descriptions.Item>
        <Descriptions.Item label="Revenue">{movie.revenue}</Descriptions.Item>
        <Descriptions.Item label="Run Time">{movie.runtime}</Descriptions.Item>
        <Descriptions.Item label="Vote Average">
          {movie.vote_average}
        </Descriptions.Item>
        <Descriptions.Item label="Vote Count">
          {movie.vote_count}
        </Descriptions.Item>
        <Descriptions.Item label="Status">{movie.status}</Descriptions.Item>
        <Descriptions.Item label="Popularity">
          {movie.popularity}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default MovieInfo;
