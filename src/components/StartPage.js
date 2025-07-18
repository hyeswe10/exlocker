import { PiLockers } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();
  return (
    <div className="start-page">
      <h1>EXLocker</h1>
      <PiLockers />
      <div className="start-ment">
        <p>환영합니다!</p>
        <p>다양한 크기와 위치의 사물함이</p>
        <p>준비되어 있습니다.</p>        
      </div>
      <div className="start-footer">
        <p>지금 바로 빈 사물함을 찾아보세요</p>
        <button onClick={()=>{navigate("/login")}}>시작하기</button>
      </div>
    </div>
  );
};

export default StartPage;