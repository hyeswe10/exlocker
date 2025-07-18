import { useEffect, useState } from "react";
import { reserveAndPay } from "../utils/LockerApi";
import { useNavigate } from "react-router-dom";

const Reserves = ({myReserve}) => {
  const [startDate,setStartDate] = useState('');
  const [startTime,setStartTime] = useState('');
  const [endDate,setEndDate] = useState('');
  const [endTime,setEndTime] = useState('');
  const [price,setPrice] = useState(0);
  const [userID,setuserID] = useState(null);
  const TIME_AMOUNT = 1000;
  const navigate = useNavigate();

  useEffect(()=>{
    const user = JSON.parse( localStorage.getItem("exlocker") );
    setuserID(user.id);
  },[]);

  useEffect(()=>{
    if( startDate && startTime && endDate && endTime ){
      const start = new Date(`${startDate}T${startTime}`);
      const end = new Date(`${endDate}T${endTime}`);
      console.log(end);
      console.log(start);
      const diff = end - start;
      console.log(diff);
      if( diff <= 0 ){
        setPrice(0);
        return;
      }
      const hours = Math.ceil(diff / (1000*60*60));
      setPrice(hours*TIME_AMOUNT);
      console.log(price);
    }
  },[startDate,startTime,endDate,endTime]);

  const handleClick = async ()=>{
    const {data,error} = await reserveAndPay({
      userID : userID,
      lockerID : myReserve.id,
      startTime : `${startDate}T${startTime}`,
      endTime : `${endDate}T${endTime}`,
      amount : price
    });
    if( error ){
      alert("결제오류");
      return;
    }
    if( data ){
      navigate("/result");
    }
  }
  return (
    <div className="reserves">
      <h2>사물함 예약</h2>
      <div className="pos">
        <h3>예약위치</h3>
        <div className="pos-info">
          <button>{myReserve.floor}층</button>
          <p>{myReserve.row}-{myReserve.col}</p>
        </div>
      </div>
      <div className="reserve-time">
        <h3>예약시간</h3>
        <div className="start-time">
          <label>시작시간</label>
          <input 
            type="date" 
            value={startDate} 
            onChange={(e)=>{setStartDate(e.target.value)}}
          />
          {/* <input 
            type="time" 
            value={startTime}
            onChange={(e)=>{setStartTime(e.target.value)}}
          /> */}
          <select
            value={startTime}
            onChange={(e)=>{setStartTime(e.target.value)}}>
              {
                Array.from({length:24},(_,i)=>{
                  const hour = String(i+1).padStart(2,"0");
                  return (
                    <option key={i} value={`${hour}:00`}>{hour}시</option>
                  )
                })
              }
            </select>
        </div>
        <div className="end-time">
          <label>종료시간</label>
          <input 
            type="date" 
            value={endDate} 
            onChange={(e)=>{setEndDate(e.target.value)}}
          />
          {/* <input 
            type="time" 
            value={endTime}
            onChange={(e)=>{setEndTime(e.target.value)}}
          /> */}
          <select
            value={endTime}
            onChange={(e)=>{setEndTime(e.target.value)}}>
              {
                Array.from({length:24},(_,i)=>{
                  const hour = String(i+1).padStart(2,"0");
                  return (
                    <option key={i} value={`${hour}:00`}>{hour}시</option>
                  )
                })
              }
            </select>
        </div>
      </div>
      <p className="amount">결제금액 : {price.toLocaleString("ko-KR")}원</p>
      <button onClick={handleClick} className="payment-btn" disabled={price.toLocaleString("ko-KR") <= 0}>{price}원 결제하기</button>
    </div>
  );
};

export default Reserves;