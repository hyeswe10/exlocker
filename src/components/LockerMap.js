import { useEffect, useState } from "react";
import { fetchCountFloor, fetchLockersByFloor, fetchMyReserve } from "../utils/LockerApi";
import { useLocation } from "react-router-dom";

const LockerMap = ({onSelect}) => {
  const [floor, setFloor] = useState([]);
  const [locker,setLocker] = useState([]);
  const [selectLocker, setSelectLocker] = useState(null);
  const [myData,setMyData] = useState([]);
  const location = useLocation();
  useEffect(()=>{
    const fetchData = async ()=>{
      const {data,error} = await fetchCountFloor();
      if( error ){
        alert("층 정보를 가져올 수 없습니다");
        return;
      }
      if( data ){
        setFloor(data);
      }
    } 
    const user = JSON.parse( localStorage.getItem("exlocker") );
    const fetchMyData = async ()=>{
      if( !user ) return;
      const {data,error} = await fetchMyReserve(user.id);
      if(error){
        alert("내예약 정보 가져오다 실패!");
        return;
      }
      if( data ){
        setMyData( data.map((item)=>{
          return item.locker_id;
        }));
      }
    }
    fetchData(); 
    fetchMyData();
  },[location.pathname]);
  const handleBtnClick = async (idx)=>{
    const {data,error} = await fetchLockersByFloor(idx);
    if( error ){
      alert("층 사물함 정보가져오기 실패");
      return;
    }
    if( data ){
      setLocker(data);
    }
  }
  const handleMyClick = (locker)=>{
    setSelectLocker(locker);    
  }
  const getMaxColumn = ()=>{    
    const cols = locker.map((item)=>{return item.col});
    return Math.max(...cols);    
  }
  const getLockerClass = (item) => {
    if( myData.includes(item.id) ){
      return "myReserved"; //내예약 내역
    }
    if( selectLocker ){
      if( item.id === selectLocker.id ) {
        return "mySelect";
      }
    }
    if( item.is_reserved ) {
      return "isReserved";
    }
    if( item.is_active ) { 
      return "isActive";
    }
  }
  return (
    <div className="locker-map">
      <h2>층을 선택하세요</h2>
      <div className="floor-btn">
        {
          floor.length>0 &&(
            floor.map((item,idx)=>{
              return <button key={idx} onClick={()=>{handleBtnClick(idx+1)}}>{item}층</button>
            })
          )
        }
      </div>
      <div 
        className="locker-grid"
        style={{
          gridTemplateColumns: `repeat(${getMaxColumn()},1fr)`
        }}
      >
        {
          locker.map((item)=>{            
            return <button 
                      key={item.id} 
                      className={`locker-item ${getLockerClass(item)}`}
                      onClick={()=>{handleMyClick(item)}}
                  >{item.row}-{item.col}</button>
          })
        }
      </div>
      <button 
        className="btn-reserv"
        onClick={()=>{
          onSelect(selectLocker);
        }}
        disabled={!selectLocker}
      >예약하기</button>
    </div>
  );
};

export default LockerMap;