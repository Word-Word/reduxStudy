import React from "react";
import { connect } from "react-redux";

function Detail({ toDo }) {    
    
    return (
        <>
            {/* 콘솔 로그로 toDo 찍어보면 toDo -> text 순으로 값이 있다. 근데 toDo 안이 텅 비어있다면 오류 떠서 예외처리 필요 */}
            <h1> { toDo && toDo.이름 ? toDo.이름 : "삭제된 페이지랍니다"} </h1> <hr></hr>

            <h2> 기본 정보 </h2>
            <h5> 아이디: {toDo && toDo.id ? toDo.id : "정보 없음"} </h5>
            <h5> 휴대번화번호: {toDo && toDo.휴대전화번호 ? toDo.휴대전화번호 : ""} </h5>
        </>)
}

function mapStateToProps(state, ownProps) {
    const id = ownProps.match.params.id;    // console.log(ownProps) 이걸로 확인해보면 match -> params -> id가 존재한다는 것을 알 수 있다.    
    return { toDo: state.find(toDo => toDo.id === parseInt(id))}  // 배열.find() 함수는 조건에 만족하는 첫번째 요소를 반환한다.
}

export default connect(mapStateToProps, null)(Detail);