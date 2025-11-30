const btt = document.querySelector('#btt');

document.addEventListener('DOMContentLoaded', function () {
  const testimonial = document.querySelector('.testimonial');
  if (!testimonial) return;

  // 슬라이드 트랙과 슬라이드들
  const track   = testimonial.querySelector('ul');
  const slides  = testimonial.querySelectorAll('ul > li');
  const prevBtn = testimonial.querySelector('.prev');
  const nextBtn = testimonial.querySelector('.next');

  const total   = slides.length;
  let currentIdx = 0;

  if (!track || total === 0) return;

  // 현재 인덱스의 슬라이드로 이동
  function goToSlide(index) {
    currentIdx = index;
    // ul을 왼쪽으로 100%씩 이동
    track.style.transform = `translateX(-${index * 100}%)`;

    // active 클래스 관리 (스타일 강조용)
    slides.forEach((li, i) => {
      li.classList.toggle('active', i === index);
    });
  }

  // 다음 버튼
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      const nextIndex = (currentIdx + 1) % total;
      goToSlide(nextIndex);
    });
  }

  // 이전 버튼
  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      const prevIndex = (currentIdx - 1 + total) % total;
      goToSlide(prevIndex);
    });
  }

  // 초기 상태 – 첫 번째 슬라이드 활성화
  goToSlide(0);
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
    const popup    = document.getElementById('mainPopup');
    const btnToday = document.querySelector('.btn-popup-today');
    const btnClose = document.querySelector('.btn-popup-close');

    // 팝업 요소 자체가 없으면 종료
    if (!popup) return;

    // 로컬스토리지 key 이름(원하는대로 바꿔도 됨)
    const STORAGE_KEY = 'acmeMainPopupHideUntil';

    // YYYY-MM-DD 문자열로 오늘 날짜 구하기
    function getDateString(dateObj) {
      const y = dateObj.getFullYear();
      const m = String(dateObj.getMonth() + 1).padStart(2, '0');
      const d = String(dateObj.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }

    function getToday() {
      return getDateString(new Date());
    }

    // 내일 0시 기준으로 숨김 만료일 저장
    function setHideUntilTomorrow() {
      const t = new Date();
      t.setDate(t.getDate() + 1); // +1일
      const hideUntil = getDateString(t);
      localStorage.setItem(STORAGE_KEY, hideUntil);
    }

    // 초기 노출 여부 설정
    (function initPopup() {
      const today     = getToday();
      const hideUntil = localStorage.getItem(STORAGE_KEY);

      if (hideUntil && hideUntil >= today) {
        // 아직 숨기기로 한 기한이 남아있으면: 안 보이게
        popup.classList.remove('is-open');
        popup.classList.add('is-hidden');
      } else {
        // 보여줘야 할 때
        popup.classList.remove('is-hidden');
        popup.classList.add('is-open');
      }
    })();

    // 오늘 하루 안보기 버튼
    if (btnToday) {
      btnToday.addEventListener('click', function () {
        setHideUntilTomorrow();
        popup.classList.remove('is-open');
        popup.classList.add('is-hidden');
      });
    }

    // 닫기 버튼
    if (btnClose) {
      btnClose.addEventListener('click', function () {
        popup.classList.remove('is-open');
        popup.classList.add('is-hidden');
      });
    }
  });