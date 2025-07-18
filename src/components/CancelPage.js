import { useState } from "react";
import { cancelReserve } from "../utils/LockerApi";
import { useNavigate } from "react-router-dom";

const CancelPage = ({cancelData}) => {
  const navigate = useNavigate();
  const [cancel, setCancel] = useState(false);
  //취소시 테이블 변경
  console.log(cancelData)
  const handleClick = async (itemID,lockerID)=>{
    const {data,error} = await cancelReserve(itemID,lockerID);
    if( error ){
      alert("예약 취소시 오류가 발생했습니다");
      return;
    } 
    if( data ){
      navigate("/cancelOk")
    }
  }
  return (
    <div className="cancel-page">
      <h3>내 이용내역</h3>
      <p>예약을 취소하시겠습니까?</p>
      <ul>
        <li>예약 취소 시, 해당 사물함은 다른 사용자에게 다시 제공됩니다</li>
        <li>결제하신 금액은 환불 규정에 따라 처리됩니다</li>
        <li>시작일 이전까지만 취소가 가능하며, 시작 이후에는 취소 및 환불이 불가능합니다.</li>
        <li>동일 사용자는 일정 기간 내 반복 취소 시 이용 제한이 있을 수 있습니다.</li>
      </ul>
      <div className="cancel-check">
        <input 
          type="checkbox" 
          id="input-check"
          value={cancel}
          onChange={(e)=>{setCancel(e.target.value)}}
        />
        <label htmlFor="input-check">취소 후에는 이전 예약 정보 복원이 불가능 하오니 신중히 선택해 주세요.</label>
      </div>
      <button disabled={!cancel} onClick={()=>{handleClick(cancelData.reserveID, cancelData.lockerID)}}>취소하기</button>
    </div>
  );
};

export default CancelPage;