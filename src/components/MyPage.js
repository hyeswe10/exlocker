import { useNavigate, Link } from "react-router-dom";
import { PiLockers } from "react-icons/pi";

const MyPage = () => {
  const navigate = useNavigate();
  return (
    <div className="my-page">
      <button onClick={()=>{navigate("/myreserve")}}>내 이용 내역</button>
      <div>
        <h3>개인정보 변경</h3>
        <ul>
          <li><Link to="/">비밀번호 변경</Link></li>
          <li><Link to="/">휴대폰 번호 변경</Link></li>
        </ul>
      </div>
      <ul className="extra-menu">
        <li>제휴문의</li>
        <li>공지사항</li>
        <li>이용안내</li>
        <li>문의하기</li>
        <li>도움말</li>
      </ul>
      <PiLockers/>
    </div>
  );
};

export default MyPage;