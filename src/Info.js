import PropTypes from "prop-types";
import styles from "./Info.module.css";

function Info({
  coverImg,
  title,
  summary,
  genres,
  rating,
  runtime,
  likeCount,
  downloadCount,
}) {
  return (
    <div className={styles.movie}>
      <img src={coverImg} alt={title} className={styles.movie__img} />
      <div>
        <h2 className={styles.movie__title}>{title}</h2>
        <h3 className={styles.movie__runtime}>{runtime}분</h3>
        <p>{summary}</p>
        <p>별점 : {rating}</p>
        <p>좋아요수 : {likeCount}</p>
        <p>다운로드수 : {downloadCount}</p>
        <ul className={styles.movie__genres}>
          장르 :
          {genres.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

Info.propTypes = {
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  rating: PropTypes.number.isRequired,
  runtime: PropTypes.number.isRequired,
  likeCount: PropTypes.number.isRequired,
  downloadCount: PropTypes.number.isRequired,
};

export default Info;
