const btt = document.querySelector('#btt');

const testimonial = document.querySelector('.testimonial');
const testimonialUl = testimonial.querySelector('.testimonial ul');
const testimonialUlBlockquote = testimonialUl.querySelector('.testimonial ul blockquote');
let currentIdx = 0;
const prevBtn = testimonial.querySelector('.prev');
const nextBtn = testimonial.querySelector('.next');
const blockquoteCount = blockquote.lingth;

function slideLayout(){
  testimonialUl.style.width = testimonial.offsetWidth * blockquoteCount + 'px';
}
slideLayout();

window.addEventListener('resize',()=>{
  slideLayout();
});

moveSlide(0);

function moveSlide(idx){
  testimonialUl.style.left = -idx*100+'%';
  currentIdx = idx;
  for(let blockquote of blockquote){
    blockquote.classList.remove('active');
  }
  blockquote[idx].classList.add('active');
}

nextBtn.addEventListener('click',()=>{
  let nextIdx = (currentIdx + 1)%blockquoteCount;
    moveSlide(nextIdx);
});
prevBtn.addEventListener('click',()=>{
  let nextIdx = (currentIdx - 1 + 1)%blockquoteCount;
    moveSlide(nextIdx);
});

window.scrollTo(0, 100);
window.addEventListener('scroll',()=>{
  let scrAmt = window.scrollY;
  if(scrAmt >= 300){
    btt.classList.add('active');
  } else{
    btt.classList.remove('active');
  }
});
btt.addEventListener('click',(e)=>{
  e.preventDefault();
  window.scrollTo({
    left:0,
    top:0,
    behavior:'smooth'
  });
});

const qs = document.querySelectorAll('.question');
for(let q of qs){
  q.addEventListener('click',()=>{
    for(let q of qs){
      q.classList.remove('active');
    }
    q.classList.add('active');
  });
}

// 팝업 레이어


const mypopup =document.querySelector('#popup');
const popupCloseBtn =mypopup.querySelector('button');
const onDayCheck = mypopup.querySelector('input');



function setCookie(name, value, day){

  let date = new Date(); //현재의 시간 생성
  date.setDate(date.getDate()+day);  // 하루 뒤 시간을 생성


    
    
  let myCookie = '';
  myCookie += `${name}=${value};`;
  myCookie += `expires=${date.toUTCString()};`;  //템플릿 리터럿 백팁

  document.cookie = myCookie;  
};

function checkCookie(name){
  let currentCookies = document.cookie; // 문자열로 존재
  let isPopupShow = (currentCookies.search(name)> -1)? false : true ;
 

  //  if(isPopupShow){
  //   mypopup.classList.add('active');
  //  }else{
  //   mypopup.classList.remove('active');
  //  }

  (isPopupShow)? mypopup.classList.add('active') : mypopup.classList.remove('active');

  /*
   currentCookies이 name이 확인하고 있다면,
   isPopupShow를 false로 변경
   없다면 true로 변경
  */
}
checkCookie('popup');
// setCookie('popup','yes',1);
//팝업띄우기 첫방문일때
//하루 안보이기 체크 닫기 >> 팝업 x

/*
순서 

첫방문일때 > 팝업 o (쿠키가 없을때)

하루 안보기 체크v 닫기  > 쿠키생성(popup-=o) >  팝업 x

하루 안보기 체크x 닫기  > 기존에 있던 팝업을 지워야함  > 팝업 o

*/
function deleteCookie(name){
  let date = new Date(); //현재의 시간 생성
  
  date.setDate(date.getDate()-1);  // 과거로 시간을 설정
  
  let myCookie = '';
  myCookie += `${name}=yes;`;
  myCookie += `expires=${date.toUTCString()};`;  //템플릿 리터럿 백팁
  document.cookie = myCookie;  
}



// 닫기 버튼을 클릭하면 할일
// ondDaycheck 값이 true와 같다면   -- 쿠키 생성
// 아니라면  -- 쿠키제거 
popupCloseBtn.addEventListener('click',()=>{

  if(onDayCheck.checked){
    setCookie('popup', 'no', 1)
    mypopup.classList.remove('active');
  }else{
    deleteCookie('popup');
    mypopup.classList.remove('active');
  }


});