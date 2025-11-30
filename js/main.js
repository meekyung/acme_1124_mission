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

// POPUP

document.addEventListener('DOMContentLoaded', function () {
    const popup       = document.getElementById('mainPopup');
    const btnToday    = document.querySelector('.btn-popup-today');
    const btnClose    = document.querySelector('.btn-popup-close');
    const STORAGE_KEY = 'hideMainPopupUntil';

    if (!popup) return; // 팝업이 없으면 아무것도 안 함

    // 오늘 날짜 문자열(YYYY-MM-DD) 생성
    function getToday() {
      const d = new Date();
      const year  = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const date  = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${date}`;
    }

    // 내일 0시 기준으로 숨김 만료 날짜를 저장 (원하시면 +1일 → +N일로 바꿔도 됨)
    function setHideUntilTomorrow() {
      const t = new Date();
      t.setDate(t.getDate() + 1);
      const year  = t.getFullYear();
      const month = String(t.getMonth() + 1).padStart(2, '0');
      const date  = String(t.getDate()).padStart(2, '0');
      const hideUntil = `${year}-${month}-${date}`;
      localStorage.setItem(STORAGE_KEY, hideUntil);
    }

    // 페이지 로드 시, localStorage 값 체크
    (function initPopup() {
      const today     = getToday();
      const hideUntil = localStorage.getItem(STORAGE_KEY);

      if (hideUntil && hideUntil >= today) {
        // 아직 숨김 기간이 남아 있으면 팝업 안 보이게
        popup.classList.add('is-hidden');
      } else {
        // 숨김 기간이 지났거나 없으면 팝업 보여줌
        popup.classList.remove('is-hidden');
      }
    })();

    // 오늘 하루 안보기 버튼
    if (btnToday) {
      btnToday.addEventListener('click', function () {
        setHideUntilTomorrow();
        popup.classList.add('is-hidden');
      });
    }

    // 단순 닫기 버튼 (오늘 안보기와 별개)
    if (btnClose) {
      btnClose.addEventListener('click', function () {
        popup.classList.add('is-hidden');
      });
    }
  });