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