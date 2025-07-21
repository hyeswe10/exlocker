import { Routes,Route, Navigate, useNavigate } from "react-router-dom";
import StartPage from "../components/StartPage";
import Login from "../components/Login";
import DeskLockerMap from "../components/DeskLockerMap";
import DeskMemberShip from "../components/DeskMemberShip";
import ReserveMent from "../components/ReserveMent";
import Reserves from "../components/Reserves";
import ResultReserve from "../components/ResultReserve";
import { useState } from "react";
const DesktopPage = ({isMobile}) => {
  const [myReserve,setMyReserve] = useState(null);
  const navigate = useNavigate(); 
  const handleMyReserve = (item) => {
    setMyReserve(item);
    navigate("/reserveMent");
  }
  return (
    <div id="desktop-page">
      <Routes>                
        <Route path="/" element={<StartPage />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/reserveMent" element={<Navigate to="/lockerMap/reservement"/>}/>
        <Route path="/reserves" element={<Navigate to="/lockerMap/result"/>}/>
        <Route path="/lockerMap" element={<DeskLockerMap onSelect={handleMyReserve}/>}>
          <Route path="reservement" element={<ReserveMent/>}/>
          <Route path="reserves" element={<Reserves/>} />
          <Route path="result" element={<ResultReserve/>}/>
        </Route>
        <Route path="/agreement" element={<DeskMemberShip />} />
      </Routes>
    </div>
  );
};

export default DesktopPage;