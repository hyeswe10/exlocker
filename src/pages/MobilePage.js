import { Route, Routes, useNavigate } from "react-router-dom";
import StartPage from "../components/StartPage";
import Login from "../components/Login";
import LockerMap from "../components/LockerMap";
import { useState } from "react";
import ReserveMent from "../components/ReserveMent";
import Reserves from "../components/Reserves";
import ResultReserve from "../components/ResultReserve";
import MyPage from "../components/MyPage";
import MyReserve from "../components/MyReserve";
import CancelPage from "../components/CancelPage";
import OkCancel from "../components/OkCancel";
import AgreeMent from "../components/AgreeMent";
import MemberShip from "../components/MemberShip";

const MobilePage = () => { 
  const navigate = useNavigate(); 
  const [myReserve,setMyReserve] = useState(null);
  const [cancel,setCancel] = useState({reserveID:0, lockerID:0});
  const handleCancel = (item)=>{    
    setCancel(item);
    navigate('/cancel');
  }
  const handleMyReserve = (item) => {
    setMyReserve(item);
    navigate("/reserveMent");
  }
  return (
    <div id="mobile-page">
      <Routes>
        <Route path="/" element={<StartPage />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/agreement" element={<AgreeMent/>}/>
        <Route path="/memberShip" element={<MemberShip/>}/>
        <Route path="/lockerMap" element={<LockerMap onSelect={handleMyReserve}/>}/>
        <Route path="/reserveMent" element={<ReserveMent />} />
        <Route path="/reserves" element={<Reserves myReserve={myReserve}/>} />
        <Route path="/result" element={<ResultReserve />}/>        
        <Route path="/mypage" element={<MyPage />}/>
        <Route path="/myreserve" element={<MyReserve onCancel={handleCancel}/>} />
        <Route path="/cancel" element={<CancelPage cancelData={cancel} />} />
        <Route path="/cancelOk" element={<OkCancel/>}/>
      </Routes>      
    </div>
  );
};
export default MobilePage;