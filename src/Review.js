import styles from "./Info.module.css";
import PropTypes from "prop-types";
import { useState } from "react";
import { useParams } from "react-router-dom";

function Review({ id, title, content, getReviewList }) {
  const params = useParams();
  const [showEditForm, setShowEditForm] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(title);
  const [updateContent, setUpdateContent] = useState(content);

  const deleteReview = () => {
    fetch(`http://localhost:3001/reviews/${id}`, {
      method: "DELETE",
    }).then(() => getReviewList());
  };

  const onClickShowEdit = () => setShowEditForm(true);
  const onChangeTitle = (e) => setUpdateTitle(e.target.value);
  const onChangeContent = (e) => setUpdateContent(e.target.value);

  const editReview = async (e) => {
    e.preventDefault();

    const updateReview = {
      title: updateTitle,
      content: updateContent,
      movie_id: params.id,
    };

    const updateMoviewReview = await (
      await fetch(`http://localhost:3001/reviews/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateReview),
      })
    ).json();
    setShowEditForm(false);
    getReviewList();
  };

  return (
    <div>
      <hr />
      {showEditForm ? (
        <form onSubmit={editReview} className={styles.form}>
          <div>
            <label htmlFor="title">제목 </label>
            <input
              type="text"
              id="title"
              value={updateTitle}
              onChange={onChangeTitle}
            ></input>
          </div>
          <div>
            <label htmlFor="content">후기 </label>
            <input
              type="text"
              id="content"
              value={updateContent}
              onChange={onChangeContent}
            ></input>
          </div>
          <button type="submit">저장하기</button>
        </form>
      ) : (
        <div className={styles.review}>
          <div>
            <h3>{title}</h3>
            <p>{content}</p>
          </div>
          <div>
            <button onClick={onClickShowEdit} className={styles.review__btn}>
              수정
            </button>
            <button onClick={deleteReview} className={styles.review__btn}>
              삭제
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

Review.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Review;
