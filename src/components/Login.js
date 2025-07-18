import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { fetchLogin } from "../utils/LockerApi";

const Login = () => {
  const [userID, setUserID] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();
  const handleClick = async (e)=>{
    e.preventDefault();
    //userID, password 의 입력된 값을 가지고 있음
    //users 테이블에 정보가 있는지 체크 확인
    const {data,error} = await fetchLogin(userID,password);
    if( error ){
      alert("로그인 정보가 없습니다. 회원가입하세요");
      return;
    }
    if( data ){
      console.log( "로그인 성공" );
      //사용자 정보를 localstorage에 저장
      localStorage.setItem("exlocker",JSON.stringify(data));
      navigate("/lockerMap");
    }
  }
  return (
    <div className="login-page">
      <h2>로그인 해 주세요</h2>
      <form onSubmit={handleClick}>
        <div className="login-label">
          <label>아이디</label>
          <input 
            placeholder="아이디를 입력하세요"
            type="text"
            value={userID}
            onChange={(e)=>{setUserID(e.target.value)}}
          />
        </div>
        <div className="login-label">
          <label>비밀번호</label>
          <input 
            type="password" 
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
          />
        </div>
        <div className="login-check">
          <input type="checkbox" id="id-save"/>
          <label htmlFor="id-save">아이디 정보 저장하기</label>
        </div>
        <button type="submit">로그인</button>
      </form>
      <ul>
        <li><SiNaver className="naver"/></li>
        <li><RiKakaoTalkFill /></li>
        <li><FaFacebook /></li>
      </ul>
      <div className="login-txt">
        <p>아이디가 없으신가요?</p>
        <Link to="/agreement">회원가입</Link>
      </div>
      <div className="login-txt">
        <Link to="">아이디찾기</Link>
        <Link to="">비밀번호찾기</Link>
      </div>
    </div>
  );
};

export default Login;