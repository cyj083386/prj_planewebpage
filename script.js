/* text.js */
(function(){ //웹브라우저가 로딩시 한번만 실행되면 되는코드. 전역 스코프안에 남아있을 필요없음. 
    // 따라서 즉시실행 함수작성하여 한번 실행한 이후로 코드는 메모리 상에서 삭제된것으로 취급한다. 메모리가 쾌적해진다.
    
    // span 요소 노드 가져오기
    const spanEl = document.querySelector("main h2 span"); // consol.log(spanEl)로 콘솔창에서 잘 선택됐는지 확인가능
    // 화면에 표시할 문장 배열
    const txtArr = ['Web Publisher', 'Front-End Developer', 'Web UI Designer', 'UX Designer', 'Back-End Developer'];
    // 배열의 인덱스 초깃값
    let index = 0;
    // 화면에 표시할 문장 배열에서 텍스트를 하나 가져온 뒤, 배열로 만들기(index는 함수에서 변경)
    let currentTxt = txtArr[index].split("");

    function writeTxt(){
        // spanEl에 담긴 요소에 Node.textContent 프로퍼티로 텍스트를 추가함.
        // 프로퍼티는 "key(키)" : "value(값)" 의 형식으로 객체 안의 콤마(쉼표 ,)로 구분되어 할당
        spanEl.textContent  += currentTxt.shift();  //shift() 메소드는 배열의 첫번째 요소를 반환하고 삭제.
        if(currentTxt.length !== 0){ // 문장이 남아 있을때까지만 setTimeout() 사용
            //setTimeout(메소드, 지연시간, 메소드 인자): 일정시간뒤에 호출하는 메소드
            setTimeout(writeTxt, Math.floor(Math.random() * 100)); //랜덤하게 1ms ~ 99ms 사이 값으로 실행 설정
        }else{
            currentTxt = spanEl.textContent.split(""); //기존문장 복구(화면에 출력한 문장 가져옴)하여 currentTxt에 대입
            setTimeout(deleteTxt, 3000); //3초정도 이후에 deleteTxt 실행
        }
    }   

    function deleteTxt(){
        currentTxt.pop(); // pop() 메소드는 배열의 마지막에 요소를 반환하고 삭제
        spanEl.textContent = currentTxt.join(""); // join()메소드는 배열의 모든 요소를 구분자로 구분하여 하나의 string으로 생성
        if(currentTxt.length !== 0){ // 문장이 남아 있을때까지만 setTimeout() 사용
            setTimeout(deleteTxt, Math.floor(Math.random() * 100)) //랜덤하게 1ms ~ 99ms 사이 값으로 실행 설정
        }else{ //문장이 모두 지워진경우
            index = (index + 1) % txtArr.length; //인덱스를 +1하고 5가 되는 순간 다시 0으로 초기화
            currentTxt = txtArr[index].split(""); // 문장배열에서 다음 텍스트 가져오고
            writeTxt(); // 출력실행
        }
    }

    writeTxt();
})();

 // 함수실행
/* End text.js */


/* scroll_request.js */

/* 수직 스크롤이 발생하면 header 태그에 active 클래스 추가 및 삭제 */
(function(){
    const headerEl = document.querySelector("header"); //header 문서 노드 가져오기
    window.addEventListener('scroll', function(){ //윈도우에 스크롤이 발생하면 scrollcheck 실행
    requestAnimationFrame(scrollCheck); // 웹브라우저가 감당할수 있을만큼 스크롤 함수 호출 처리
    //스크롤 이벤트 발생시마다 scrollCheck을 호출하면 scrollCheck 내 코드가 길어질수로 부담이 될수 있다.
    });
    function scrollCheck(){
        //window.scrollY를 지원하지 않으면 window.pageYOffset 사용하여 Y좌표 확인
        let browerScrollY = window.scrollY ? window.scrollY : window.pageYOffset;
        if(browerScrollY > 0){ //스크롤 값이 있으면 header 태그에 class = "active" 추가
            headerEl.classList.add("active");
        }else{ //스크롤 값이 없으면 header 태그에 class = "active" 삭제
            headerEl.classList.remove("active");
        }
    }
})();

/* End scroll_request.js */

/* move.js */
/* 애니메이션 스크롤 이동 */
(function(){
const animationMove = function(selector){
    // ① selector 매개변수로 이동할 대상 요소 노드 가져오기
    const targetEl = document.querySelector(selector);
    // ② 현재 브라우저의 스크롤 정보(y 값)
    const browserScrollY = window.pageYOffset;
    // ③ 이동할 대상의 위치(y 값)
    //getBoundingClientRect()는 화면에 보이는 영역(viewport)을 기준으로 element 위치 정보 객체를 반환, top등의 프로퍼티로 접근
    // 이때 element 가 보이지 않는 영역, 그리고 보이는 영역의 위에있다면 top 값은 음수가 된다.
    // 보이는 영역을 기준으로 위치값이므로 현재 스크롤 위치(절대 Y)를 더하면 절대 위치가 나온다.
    const targetScorllY = targetEl.getBoundingClientRect().top + browserScrollY; 
    // ④ 스크롤 이동
    window.scrollTo({ top: targetScorllY, behavior: 'smooth' });
  };
  // 스크롤 이벤트 연결하기
  const scollMoveEl = document.querySelectorAll("[data-scroll='true']"); 
  for(let i = 0; i < scollMoveEl.length; i++){
    scollMoveEl[i].addEventListener('click', function(e){
      const target = this.dataset.target; // 이벤트 객체 -> dataset 속성-> 사용자 정의 key로 추출하기. ==e.dataset.target 함수안에서만 사용가능
    animationMove(target);
    });
  }
})();

  /* End move.js */