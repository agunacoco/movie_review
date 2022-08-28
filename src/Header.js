import { Link } from "react-router-dom";

function Header() {
  // react는 css 코드를 javascript 오브젝트로 변환.
  return (
    <div>
      <Link to="/">
        <h1>Movie Review</h1>
      </Link>
      <p>영화 제목을 클릭해서 영화 후기를 적어보세요</p>
      <hr />
    </div>
  );
}

export default Header;
