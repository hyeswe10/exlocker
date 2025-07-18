import { useEffect, useState } from "react";
import { cancelReserve, fetchAllLocker, fetchMyReserve } from "../utils/LockerApi";

const MyReserve = ({onCancel}) => {
  const [myReserve,setMyReserve] = useState([]);
  const [user,setUser] = useState(null);
  const [locker,setLocker] = useState([]);
  const [color,setColor] = useState('');

  useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem("exlocker"));
    setUser(storedUser);
    const fetchData = async ()=>{
      const {data,error} = await fetchMyReserve(storedUser.id);
      if( error ){
        alert("내 예약 정보 가져오기 실패!");
        return;
      }
      if( data ){
        console.log( data );
        setMyReserve(data);
      }
    }
    const fetchAll = async ()=>{
      const {data,error} = await fetchAllLocker();
      if( error ){
        alert("내 예약 정보 가져오기 실패!");        
      }    
      if( data ) {
        setLocker(data);
      }
    }
    if( storedUser ){
      fetchData();
      fetchAll();
    }    
  },[]);
  const getStatusText = (item)=>{
    let value = '';
    if( item === "active" ){
      value = "예약중";
    } else if( item === "canceled") {
      value= "예약취소";
    } else {
      value = "종료";
    }
    return value;
  }
  const getLockerInfo = (lockerID)=>{
    const select = locker.find((item)=>{return item.id === lockerID});
    if( select ){
      return `${select.floor}층 ${select.row}-${select.col}`;
    }
    return "";
  }
  return (
    <div className="my-reserve">
      {
        user ? (<h3>{user.user_id}의 예약 내역</h3>) : (<h3>정보불러오는중...</h3>)
      }
      <ul>
        {
          myReserve.map((item)=>{
            return (
              <li key={item.id}>
                <p>{item.start_date}<br/> ~ {item.end_date}</p>
                <div className="btn-wrapped">
                  <div className="txt-wrapped">
                    <p><strong>{getLockerInfo(item.locker_id)}</strong></p>
                    <p 
                    className={item.status === "active" ? "green" : item.status === "canceled" ? "red" : "gray"}><span>●</span>{getStatusText(item.status)}</p>
                  </div>
                  {
                    item.status === 'active' ? (
                    <button 
                      onClick={()=>{
                        onCancel({
                          reserveID : item.id,
                          lockerID : item.locker_id
                        })
                      }}
                    >예약취소</button>) : ""
                  }
                </div>
              </li>
            )
          })
        }
      </ul>
      
    </div>
  );
};
export default MyReserve;