import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Info from "../Info";
import Review from "../Review";
import styles from "./Detail.module.css";

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [movieLoading, setMovieLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [reviews, setReviews] = useState([]);

  const getReviewList = async () => {
    const reviewList = await (
      await fetch(
        `http://localhost:3001/reviews?movie_id=${id}&_sort=id&_order=DESC`
      )
    ).json();
    setReviews(reviewList);
    setReviewsLoading(false);
  };

  const onSubmitReview = async (e) => {
    e.preventDefault();

    const newReview = {
      movie_id: id,
      title: title,
      content: content,
    };

    const createMovieReview = await (
      await fetch(`http://localhost:3001/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      })
    ).json();

    setTitle("");
    setContent("");
    getReviewList();
  };

  const onChangeTitle = (e) => setTitle(e.target.value);
  const onChangeContent = (e) => setContent(e.target.value);

  const getMovieData = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();

    setMovie(json.data.movie);
    setMovieLoading(false);
    console.log(json.data.movie);
  };
  console.log("여긴 디테일");

  useEffect(() => {
    getMovieData();
    getReviewList();
  }, []);

  return (
    <div>
      {movieLoading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <Info
          coverImg={movie.large_cover_image}
          title={movie.title_long}
          summary={movie.description_full}
          genres={movie.genres}
          rating={movie.rating}
          runtime={movie.runtime}
          likeCount={movie.like_count}
          downloadCount={movie.download_count}
        />
      )}
      <div>
        <h2>영화 후기를 남겨보세요</h2>
        <form onSubmit={onSubmitReview} className={styles.form}>
          <div>
            <label htmlFor="title">제목 </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={onChangeTitle}
            ></input>
          </div>
          <div>
            <label htmlFor="content">후기 </label>
            <input
              type="text"
              id="content"
              value={content}
              onChange={onChangeContent}
            ></input>
          </div>
          <button type="submit">등록하기</button>
        </form>
      </div>
      {reviewsLoading ? (
        <span>Loading...</span>
      ) : (
        <div>
          {reviews.map((review) => (
            <Review
              getReviewList={getReviewList}
              key={review.id}
              id={review.id}
              title={review.title}
              content={review.content}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Detail;
