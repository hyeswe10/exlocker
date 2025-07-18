import "./App.scss";
import { useEffect, useState } from "react";
import MobilePage from "./pages/MobilePage";
import DesktopPage from "./pages/DesktopPage";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  const [isMobile,setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(()=>{
    const handleSize = ()=>{
      setIsMobile( window.innerWidth <= 768 );
    }
    handleSize();
    window.addEventListener("resize",handleSize);
    return ()=>{
      window.removeEventListener("resize",handleSize);
    }
  },[]);
  return (
    <BrowserRouter>
      <div id="app">
        {
          isMobile ? <MobilePage /> : <DesktopPage />
        }
      </div>
    </BrowserRouter>
  );
};

export default App;