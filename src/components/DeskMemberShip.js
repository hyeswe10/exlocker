import React, { useState } from 'react';
import AgreeMent from "./AgreeMent";
import MemberShip from './MemberShip';
const DeskMemberShip = () => {
  const [step,setStep] = useState(1);
  const handleNextClick = ()=>{
    setStep(step+1);
  }
  return (
    <div className='desk-membership'>
      <div className='desk-topheader'>
        <h1>EXlocker</h1>
        <p>지금 바로 빈 사물함을 찾아보세요</p>
      </div>
      <ul>
        <li className={step===1? "active":""}>STEP 1. 약관동의</li>
        <li className={step===2? "active":""}>STEP 2. 정보입력</li>        
      </ul>
      <div className='stepContents'>
        { step === 1 && <AgreeMent /> }
        { step === 2 && <MemberShip /> }
      </div>
      <div className='step-btn'>
        <button onClick={handleNextClick}>
          {step===1 ? "다음" : ""}
        </button>
      </div>
    </div>
  );
};

export default DeskMemberShip;