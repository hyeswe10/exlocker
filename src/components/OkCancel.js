import { Link, useNavigate } from "react-router-dom";

const OkCancel = () => {
    const navigate = useNavigate();;
    return (
        <div className="ok-cancel">
            <h3>예약이<br/>취소되었습니다</h3>
            <Link to="/mypage">내 이용내역으로 이동</Link>
            <button onClick={()=>{navigate("/lockerMap")}}>사물함 지도 보기</button>
        </div>
    );
};

export default OkCancel;