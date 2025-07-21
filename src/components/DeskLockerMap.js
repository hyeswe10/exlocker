import { useEffect, useState } from "react";
import { fetchCountFloor, fetchLockersByFloor, fetchMyReserve } from "../utils/LockerApi";
import { Outlet } from "react-router-dom";

const DeskLockerMap = ({onSelect}) => {
  const [floor, setFloor] = useState([]);
  const [locker, setLocker] = useState([]);
  const [selectLocker,setSelectLocker] = useState(null);
  const [myData,setMyData] = useState([]);
  useEffect(() => {
    const fetchFloor = async () => {
      const { data, error } = await fetchCountFloor();
      if (error) {
        alert("층 정보를 가져올 수 없습니다");
        return;
      }
      if (data) {
        setFloor(data);
        data.forEach((item)=>{fetchLocker(item)})
      }
    };
    const fetchLocker = async (floor) => {
      const { data: lockerData, error } = await fetchLockersByFloor(floor);
      if (error) {
        alert("층 사물함 정보 가져오기 실패");
        return;
      }
      if (lockerData) {
        setLocker((prev) => {
          return [...prev, lockerData];
        });
      }
    };
    const user = JSON.parse( localStorage.getItem("exlocker") );
      const fetchMyData = async ()=>{
        if( !user ) return;
        const {data:getData,error:getError} = await fetchMyReserve(user.id);
        if(getError){
          alert("내예약 정보 가져오다 실패!");
          return;
        }
        if( getData ){
          setMyData( getData.map((item)=>{
            return item.locker_id;
          }));
        }
      }
    fetchFloor(); //층에 대한 정보 가져오기
    fetchMyData(); //내 예약정보
  }, []);
  const getAllColumn = (itemData) => {
    if (!itemData) return;
    const cols = itemData.map((item) => {
      return item.col;
    });
    return Math.max(...cols);
  };
  const handleDeskClick = (item)=>{
    setSelectLocker(item);
  }
  const getDeskClass = (item)=>{
    if(item.is_reserved){
      return "isReserved";
    }
    //나의 예약 내역 : 보라
    if(myData.includes(item.id)){
      return "myReserved";
    }
    //내가 선택한 사물함
    if(selectLocker){
      if(item.id === selectLocker.id){
        return "mySelect";
      }
    }
    if(item.is_active){
      return "isActive";
    }
  }
  return (
    <>
    <div className="locker-left">
      <h2>사물함을 선택하세요</h2>
      {
        floor.map((item, idx) => {
          return (
            <div className={`floor-${item}`} key={idx}>
              <h3>{item}층</h3>
              <div
                className="locker-grid"
                style={{
                  gridTemplateColumns: `repeat(${getAllColumn(
                    locker[idx]
                  )},1fr)`,
                }}
              >
                {
                  Array.isArray(locker[idx]) && 
                  locker[idx].map((item)=>{
                    return (
                      <button 
                        key={item.id}
                        className={`locker-item ${getDeskClass(item)}`}
                        onClick={()=>{handleDeskClick(item)}}
                      >{item.row}-{item.col}</button>
                    )
                  })
                }
              </div>
              <button className="btn-reserv" onClick={()=>{onSelect(selectLocker)}}>예약하기</button>
            </div>
          );
        })}
    </div>
    <div className="locker-right">
      <Outlet/>
    </div>
    </>
  );
};

export default DeskLockerMap;
