import { useEffect, useState } from "react";
import { fetchSignUp } from "../utils/LockerApi";
import { useNavigate } from "react-router-dom";

const MemberShip = () => {
    const navigate = useNavigate();
    const [userId,setUserId] = useState('');
    const [pass,setPass] = useState('');
    const [rePass,setRePass] = useState('');
    const [phone,setPhone] = useState('');
    const [isMatch,setIsMatch] = useState(false);
    useEffect(()=>{
        pass === rePass ? setIsMatch(true) : setIsMatch(false);
    },[pass,rePass])
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(pass !== rePass){
            alert("비밀번호가 일치하지 않습니다.")
            return;
        }
        const {success,error} = await fetchSignUp(userId,pass,phone);
        if(error){
            alert("정보가 입력되지않았습니다.")
            return;
        }
        if(success){
            alert("회원가입이 성공적으로 완료되었습니다.")
            navigate("/login")
        }
    }
    return (
        <div className="sign-up">
            <h3>회원가입</h3>
            <form onSubmit={handleSubmit}>
                <div className="sign-input">
                    <label>아이디</label>
                    <input
                        value={userId}
                        onChange={(e)=>{setUserId(e.target.value)}}
                        placeholder="아이디를 입력하세요"/>
                </div>
                <div className="sign-input">
                    <label>비밀번호</label>
                    <input
                        type="password"
                        value={pass}
                        onChange={(e)=>{setPass(e.target.value)}}
                        placeholder="비밀번호를 입력하세요"/>
                </div>
                <div className="sign-input">
                    <label>비밀번호 재입력</label>
                    <input 
                        type="password"
                        value={rePass}
                        onChange={(e)=>{setRePass(e.target.value)}}
                        placeholder="비밀번호를 다시 입력하세요"/>
                </div>
                <p style={{color: isMatch ? "green" : "red"}}>
                    {
                        rePass.length > 0 && (isMatch ? "비밀번호가 일치합니다" : "비밀번호가 일치하지 않습니다")
                    }
                </p>
                <div className="sign-input">
                    <label>휴대폰 번호</label>
                    <input 
                        type="number"
                        value={phone}
                        onChange={(e)=>{setPhone(e.target.value)}}
                        placeholder="휴대폰 번호를 입력하세요"/>
                </div>
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default MemberShip;