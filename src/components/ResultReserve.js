import { useNavigate } from "react-router-dom";

const ResultReserve = () => {
  const navigate = useNavigate();
  return (
    <div className="result-page">
      <h2>결제되었습니다</h2>
      <div className="btn-mypage">
        <p>결제 내역을 확인해 보세요</p>
        <button onClick={()=>{navigate("/mypage")}}>마이페이지로 이동</button>
      </div>
    </div>
  );
};

export default ResultReserve;