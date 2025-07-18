import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ReserveMent = () => {
  const navigate = useNavigate();
  const [check,setCheck] = useState(false);
  return (
    <div className="reserve-ment">
      <p className="big-p">1시간당 1,000원</p>
      <p>사물함 사용 전 안내사항</p>
      <ul>
        <li>귀중품은 보관하지 마세요. 도난, 분실 시 책임지지 않습니다.</li>
        <li>지정된 기간 내에만 사용 가능합니다. 기간 초과 시 자동 반납 처리 됩니다</li>
        <li>사용 중 파손 또는 문제 발생 시 즉시 관리자에게 연락해주세요</li>
        <li>사물함 내부는 항상 깨끗하게 유지해 주세요</li>
      </ul>
      <p className="last-p">사물함 사용은 위 규칙에 동의한 것으로 간주됩니다.</p>
      <div className="agree-check">
        <input 
          type="checkbox" 
          id="agree"
          value={check}
          onChange={(e)=>{setCheck(e.target.checked)}}
        />
        <label htmlFor="agree">동의하고 예약하기</label>
      </div>
      <button 
        onClick={()=>{navigate("/reserves")}} 
        disabled={!check}
      >예약하기</button>
    </div>
  );
};

export default ReserveMent;