import { supabase } from "./supabaseClient";

//1. 로그인
export const fetchLogin = async (userID,password) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id',userID)
    .eq('password',password)
    .single();
  return {data,error};
}
//2. 회원가입 : 아이디, 비밀번호, 휴대폰번호
export const fetchSignUp = async (userID,password,phone) =>{
  const {error} = await supabase
    .from('users')
    .insert([{user_id:userID, password:password, phone:phone}]);
  return {success:!error,error};
}
//3. 아이디 찾기 : phone으로 검색 : "01011111111"
export const findUserId = async (phone) => {
  const {data,error} = await supabase
    .from('users')
    .select('user_id')
    .eq('phone',phone)
    .single();
  return {data,error};
}
//4. 비밀번호 찾기 : id, phone으로 검색 "user1","01011111111"
export const findPassword = async (userID,phone) => {
  const {data,error} = await supabase
    .from('users')
    .select('password')
    .eq('user_id',userID)
    .eq('phone',phone)
    .single();
  return {data,error};
}
//5. 층 정보 가져오기
export const fetchCountFloor = async ()=>{
  const {data,error} = await supabase
    .from('lockers')
    .select('floor',{count:"exact",head:false})
    .order("floor",{ascending:true});
  const floors = new Set(data.map((item)=>{
    return item.floor;
  }));
  return {data:[...floors],error};
}
//6. 층별 사물함 지도 가져오기
export const fetchLockersByFloor = async (floor) =>{
  const {data,error} = await supabase
    .from('lockers')
    .select('*')
    .eq('floor',floor)
    .order("id",{ascending:true});
  return {data,error};
}
//7. 예약 & 결제를 동시에 처리
export const reserveAndPay = async ({
  userID,
  lockerID,
  startTime,
  endTime,
  amount
}) =>{
  //예약테이블에 추가
  const {data,error:reserveError} = await supabase
    .from('reservations')
    .insert([{
      user_id: userID,
      locker_id:lockerID,
      start_date: new Date(startTime),
      end_date: new Date(endTime),
      status: 'active'
    }])
    .select()
    .single();
    if( reserveError ){
      return { data:false, error:reserveError };
    }
    //payments 에 추가
    const reservationID = data.id;
    const {error:payError} = await supabase
      .from('payments')
      .insert([{
        user_id: userID,
        reservation_id: reservationID,
        amount: amount,
        status:'paid'
      }]);
    if( payError ){
      return {data:false, error:payError};
    }
    //사물함을 예약 상태 변경
    const { error: lockerError} = await supabase
      .from('lockers')
      .update({is_reserved:true})
      .eq('id',lockerID);
    if( lockerError ) {
      return {data:false, error:lockerError};
    }
  // 모든 업데이트가 다 완료/
  return {data:reservationID,error:false};
}
//8. 예약 취소
export const cancelReserve = async (reserveID,lockerID)=>{
  const {error} = await supabase
    .from('reservations')
    .update({status:'canceled'})
    .eq('id',reserveID);
  if( error ){
    return {data:false, error};
  }
  //사물함을 예약 상태 변경
  const { error: lockerError} = await supabase
    .from('lockers')
    .update({is_reserved:false})
    .eq('id',lockerID);
  if( lockerError ) {
    return {data:false, error:lockerError};
  }
  return {data:true, error};
}
//9. 내 예약 정보 가져오기
export const fetchMyReserve = async (userID)=>{
  const {data,error} = await supabase
    .from('reservations')
    .select('*')
    .eq('user_id',userID );
  return {data,error};
}
//10. 전체 사물함 정보 가져오기
export const fetchAllLocker = async ()=>{
  const {data,error} = await supabase
    .from('lockers')
    .select("*");
  return {data,error};
}