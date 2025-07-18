import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AgreeMent = () => {
    const [age,setAge] = useState(false);
    const [terms,setTerms] = useState(false);
    const [privacy,setPrivacy] = useState(false);
    const [event,setEvent] = useState(false);
    const [checkAll,setCheckAll] = useState(false);
    const navigate = useNavigate();
    return (
        <div className="agree-ment">
            <h3>약관동의</h3>
            <p>원활한 서비스 제공을 위해 약관 동의가 필요합니다.</p>
            <ul className="check-wrap">
                <li>
                    <label htmlFor="check1">[필수] 14세 이상입니다.</label>
                    <input 
                        type="checkbox" 
                        id="check1" 
                        checked={age}
                        onChange={(e)=>{setAge(e.target.value)}}/>
                </li>
                <li>
                    <label htmlFor="check2">[필수] 서비스 이용 약관 동의 ▷</label>
                    <input 
                        type="checkbox" 
                        id="check2"
                        checked={terms}
                        onChange={(e)=>{setTerms(e.target.value)}}/>
                </li>
                <li>
                    <label htmlFor="check3">[필수] 개인 정보 처리 방침 ▷</label>
                    <input 
                        type="checkbox" 
                        id="check3"
                        checked={privacy}
                        onChange={(e)=>{setPrivacy(e.target.value)}}/>
                </li>
                <li>
                    <label htmlFor="check4">[선택] 할인, 이벤트 정보 수신 ▷<br/>맞춤형 할인 쿠폰과 이벤트 소식 보내드려요.</label>
                    <input 
                        type="checkbox" 
                        id="check4"
                        checked={event}
                        onChange={(e)=>{setEvent(e.target.value)}}/>
                </li>
            </ul>
            <div className="check-all">
                <label htmlFor="allcheck">전체 내용에 동의합니다.</label>
                <input 
                    type="checkbox" 
                    id="allcheck"
                    checked={checkAll}
                    onChange={(e)=>{
                        //모든 체크 항목이 체크가 되거나, 체크가 해제되거나
                        const value = e.target.checked;
                        setCheckAll(value);
                        setAge(value);
                        setTerms(value);
                        setPrivacy(value);
                        setEvent(value);
                    }}/>
            </div>
            <button 
                onClick={()=>{navigate("/signUp")}}
                disabled={!(age && terms && privacy)}
            >다음</button>
        </div>
    );
};

export default AgreeMent;