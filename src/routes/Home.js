import React, { useState } from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";

function Home({ toDos, addToDo }) {
    console.log("스토어에서 받은 addToDo : ", addToDo);

    // 사용자가 입력한 텍스트로 변경
    const [text, setText] = useState("");  // Hook: 함수 컴포넌트는 "state가 없는 컴포넌트"지만, Hook을 통해 [React state]를 함수 안에서 사용할 수 있게 해줌 (초기값: "")
    function onChange(e) {
        setText(e.target.value);
    }

    // 버튼 누르면 이게 발동
    function onSubmit(e) {
        e.preventDefault();
        addToDo(text);
        setText("");
    }

    return (
        <>
            <h1> 목록 </h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={text} onChange={onChange} />
                <button> 추가 </button>
            </form>

            <ul> {JSON.stringify(toDos)} </ul>
        </>
    );
}







// Redux state로부터 home(component)에 prop으로써 전달 -> 우리의 todo를 render 할 수 있게 됨
function mapStateToProps(state, ownProps) {
    console.log("1. mapStateToProps", state, ownProps);    
    return { toDos: state }
}

// dispatch: 콘솔로그 찍어보면 store.dispatch()처럼 redux에서 제공하는 함수라는 점을 알 수 있다.
function mapDispatchToProps(dispatch, ownProps) {
    console.log("mapDispatchToProps 실행");
    

    return {
        // 아래의 값을 리턴한 뒤, 콘솔로그로 Home.js에 들어오는 addToDo를 확인해보면 addToDo라는 함수가 다시 들어온다.
        addToDo: (text) => dispatch(actionCreators.addToDo(text))   // dispatch를 호출 -> 그리고 dispatch는 store에서 만든 actionCreators를 호출 -> actionCreators 안에 있는 여러 action들 중에서 addToDo를 가져옴 -> addToDo는 텍스트를 인자로 받음
    };
}

// connect는 나의 components들을 store에 연결시켜준다.
export default connect(mapStateToProps, mapDispatchToProps)(Home);  // export default Home; 을 수정

// connect는 state나 dispach 둘 중 하나를 고르기 위해 2개의 인자를 받는다.
// 1. store에 dispach를 통해 action을 전달해서 값을 넣을 것인가?
// 2. store에서 getState를 해서 값을 가져올 것인가?
// -> 따라서 우리는 이 중 어떤걸 원하는지 결정해야 한다.