const todoForm = document.querySelector('.js-todo-form'),
    userTODO = todoForm.querySelector('.js-userTODO'),
    todoList = document.querySelector('.js-todo-list');

const TODO_LOCAL_STORAGE = 'TODOs' 
let todoTexts = [];

const saveTodo = () =>{
    localStorage.setItem(TODO_LOCAL_STORAGE, JSON.stringify(todoTexts));    
    //localStorage에 TODOs의 키와 todoTexts의 배열을 JSON의 stringfy함수를 통해서 data type을 string화 시킨다.
}

const deleteTodo = function(event){
    const btn = event.target;
    const li = btn.parentNode;
    todoList.removeChild(li); //ul

    // localStorage에서 TODOs의 배열의 객체 항목 삭제 (영구삭제)
    const cleanTodos = todoTexts.filter((todo) =>{ // todo는 todoTexts배열의 todoObj객체항목 하나를 뜻함.
        return todo.id !== parseInt(li.id); // li의 id는 string타입이므로 parseInt 내장 함수를 사용
    })
    todoTexts = cleanTodos; // 제거 할 todo빼고 나머지 todo들을 todoTexts에 대입하고 
    saveTodo(); // localStorage의 TODOs에 저장
}

const submitTodo = () =>{
    todoForm.addEventListener('submit', (event) =>{ // todo를 입력하고 저장할때의 이벤트 생성
        event.preventDefault();
        const todo = userTODO.value; // input태그에 사용자가 적어놓은 todo를 value프로퍼티로 접근
        addTodo(todo); // addTodo에 todo를 인자로 넘겨 실행
        userTODO.value = ""; // input태그의 value값에는 아무런 값을 넣지 않음 (새로고침 효과)
    })
}

const addTodo = (text) =>{
    const list = document.createElement('li') // li태그 생성
    const span = document.createElement('span'); // span 태그 생성
    span.innerHTML = text; // span 태그의 내용에는 사용자가 입력한 todo 텍스트를저장
    const deleteBtn = document.createElement('span') // 삭제 버튼 생성
    deleteBtn.innerHTML = '    ❌'; // 삭제 버튼에는 x모양 이모지 입력
    deleteBtn.addEventListener('click',deleteTodo); // 삭제 버튼을 누를 떄 해당 todo를 삭제하는 이벤트
    list.appendChild(span); // li태그안에 span을 자식으로 추가
    list.appendChild(deleteBtn); // 삭제 버튼도 마찬가지
    list.style.cssText = "color : #f9d56e; font-size : 2rem; list-style: none;"
    deleteBtn.style.cssText = 'cursor: pointer;'
    todoList.appendChild(list); // todoList의 ul태그에 li태그를 자식으로 넣음

    const newId = todoTexts.length + 1; // id값 생성 => todoTexts의 배열의 길이에 1씩 더함
    list.id = newId; // 새로운 todo를 생성할때마다 리스트에는 1씩 증가시키는 새로운 id값 생성 
    const todoObj = { // todoTexts의 배열안에 들어갈 객체
        text : text, // todo의 내용이 들어감
        id : newId // id값도 함께들어감
    }
    todoTexts.push(todoObj); // todoTexts의 배열에 todoObj를 추가
    saveTodo(); // localStorage에 저장
}

const loadTodos = function(){
    const todos = localStorage.getItem(TODO_LOCAL_STORAGE); // getItem을 통하여서 null 값인지 아닌지.
    if(todos !== null) { // null이 아니면 == 기존의 todo내용이 있다면
        const parseTodo = JSON.parse(todos); 
        // localstroage의 TODOs의 값을 JSON.parse를 통해서 string에서 코드로 변환 (최종저장된 todoTexts를 불러옴)
        parseTodo.forEach((todo) =>{ // forEach는 parseTodo == TodoTexts와 같은 형이므로(배열) 사용 가능
            addTodo(todo.text) // 내용을 추가하여 DOM에 띄움
        });
        submitTodo(); // 사용자가 todo를 추가할 경우  
    }else {
        submitTodo(); // 내용이 아무것도 없으면 todo를 받음
    }
    
}

const init = function(){
    loadTodos();
}
init();