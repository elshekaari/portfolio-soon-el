/* ========================================
   BACKGROUND SLIDESHOW
======================================== */
const slides = [
  { type: 'image', src: '' },
  { type: 'video', src: 'media/bg3.mp4' }
];

const SLIDE_DURATION = 7000;      // duration per slide in ms
const TRANSITION_DELAY = 1200;    // crossfade time in ms

let currentIndex = 0;
let showingA = true;

const layerA = document.getElementById('layerA');
const layerB = document.getElementById('layerB');

function setLayer(layer, slide){
  layer.innerHTML = '';
  if(slide.type === 'video'){
    const v = document.createElement('video');
    v.src = slide.src;
    v.autoplay = true;
    v.loop = true;
    v.muted = true;
    v.playsInline = true;
    v.style.width = '100%';
    v.style.height = '100%';
    v.style.objectFit = 'cover';
    v.style.position = 'absolute';
    v.style.top = 0;
    v.style.left = 0;
    layer.appendChild(v);
  } else {
    layer.style.backgroundImage = `url('${slide.src}')`;
  }
}

function showNextSlide(){
  const nextIndex = (currentIndex + 1) % slides.length;
  const nextSlide = slides[nextIndex];
  const incoming = showingA ? layerA : layerB;
  const outgoing = showingA ? layerB : layerA;

  setLayer(incoming, nextSlide);
  incoming.classList.add('show');
  outgoing.classList.remove('show');

  showingA = !showingA;
  currentIndex = nextIndex;
}

// start slideshow
function startSlideshow(){
  setLayer(layerA, slides[0]);
  layerA.classList.add('show');
  if(slides.length > 1){
    setLayer(layerB, slides[1]);
    currentIndex = 1;
    showingA = false;
    layerB.classList.remove('show');
    setInterval(showNextSlide, SLIDE_DURATION);
  }
}

/* ========================================
   PANEL NAVIGATION (single-page smooth)
======================================== */
function showPanel(toId){
  const current = document.querySelector('.panel.active');
  const next = document.getElementById(toId);
  if(!current || !next || current.id === toId) return;

  current.classList.remove('active');
  // small delay for smooth fade transition
  setTimeout(() => {
    next.classList.add('active');
    next.scrollTop = 0;
  }, 420);
}

// NAV LINKS
document.addEventListener('DOMContentLoaded', () => {
  startSlideshow();

  document.getElementById('home-link').addEventListener('click', e => {
    e.preventDefault();
    showPanel('home');
  });
  document.getElementById('works-link').addEventListener('click', e => {
    e.preventDefault();
    showPanel('works');
  });
  document.getElementById('bio-link').addEventListener('click', e => {
    e.preventDefault();
    showPanel('bio');
  });
  document.getElementById('contact-link').addEventListener('click', e => {
    e.preventDefault();
    showPanel('contact');
  });

  // WORKS SUBMENU
  document.getElementById('painting-link').addEventListener('click', e => {
    e.preventDefault();
    showPanel('painting');
  });
  document.getElementById('videoart-link').addEventListener('click', e => {
    e.preventDefault();
    showPanel('videoart');
  });
  document.getElementById('installation-link').addEventListener('click', e => {
    e.preventDefault();
    showPanel('installation');
  });

  // optional: back buttons inside each panel
  document.querySelectorAll('.btn.back').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.back || 'home';
      showPanel(target);
    });
  });
});
