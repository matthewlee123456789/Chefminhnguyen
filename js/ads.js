/* ============================================================
   QUẢNG CÁO — thẻ dọc 160×600 trên desktop, banner ngang trên mobile
   SỬA NỘI DUNG NGAY BÊN DƯỚI. Song ngữ: ['Tiếng Việt','English']
   ============================================================ */
(function(){
'use strict';

var ADS = [
  {
    side:'left',
    imgs:['assets/ad-tour-v.jpg'],
    imgH:'assets/ad-tour-h.jpg',
    alt:'Hà Giang Loop cùng MatthewTour',
    kicker:['Đi cùng Chef','Travel with the Chef'],
    title:['Hà Giang Loop','Hà Giang Loop'],
    line:['Tới tận nơi có nọng heo đen cao nguyên đá Đồng Văn và gà đen H’Mông Tây Bắc.',
          'Ride to where the black pork of Đồng Văn and the H’Mông black chicken come from.'],
    list:[['Cao nguyên đá Đồng Văn','Người dẫn đường bản địa','Honda XR150 · Yamaha WR155'],
          ['Đồng Văn stone plateau','Local-led expedition','Honda XR150 · Yamaha WR155']],
    cta:['Xem hành trình','See the route'],
    url:'https://www.hagiangwithmatt.com'
  },
  {
    side:'right',
    imgs:['assets/ad-lapxuong-v.jpg','assets/ad-matong-v.jpg'],
    imgH:'assets/ad-lapxuong-h.jpg',
    alt:'Đặc sản cao nguyên đá Đồng Văn',
    kicker:['Cửa hàng','Shop'],
    title:['Đặc sản Đồng Văn','Đồng Văn specialities'],
    line:['Nguyên liệu Chef Minh dùng trong bếp, gửi thẳng từ cao nguyên đá.',
          'The ingredients Chef Minh cooks with, sent straight from the stone plateau.'],
    list:[['Lạp sườn gác bếp','Mật ong bạc hà','Món chế biến sẵn của Chef'],
          ['Smoked highland sausage','Mint honey','Chef’s ready-to-eat dishes']],
    cta:['Xem sản phẩm','See products'],
    url:'https://www.hagiangwithmatt.com'
  }
];

var LABEL = ['Tài trợ','Sponsored'];

if(!ADS.length) return;
try{ if(sessionStorage.getItem('ad-off') === '1') return; }catch(e){}

var lang = 0;
try{ if(localStorage.getItem('cmn-lang') === 'en') lang = 1; }catch(e){}
var P = location.pathname.indexOf('/blog/') > -1 ? '../' : '';
var I = window.CMNIcon || function(){ return ''; };
function t(v){ return Array.isArray(v) ? v[lang] : v; }

/* ---------- Thẻ dọc ---------- */
function cardHTML(ad, i){
  var imgs = ad.imgs.map(function(src, n){
    return '<img class="' + (n ? 'b' : 'a') + '" src="' + P + src + '" alt="' + (n ? '' : ad.alt) +
           '" width="320" height="420" loading="lazy" decoding="async">';
  }).join('');
  var list = t(ad.list).map(function(x){ return '<li>' + I('check') + x + '</li>'; }).join('');
  return '<a class="adcard ' + (i ? 'adcard--b' : '') + '" href="' + ad.url + '" target="_blank" rel="noopener sponsored">' +
    '<button class="adcard__x" type="button" aria-label="Ẩn quảng cáo">✕</button>' +
    '<span class="adcard__tag">' + I('tag') + '<span data-adlabel>' + t(LABEL) + '</span></span>' +
    '<span class="adcard__img">' + imgs + '</span>' +
    '<span class="adcard__body">' +
      '<span class="adcard__kicker">' + t(ad.kicker) + '</span>' +
      '<span class="adcard__title">' + t(ad.title) + '</span>' +
      '<span class="adcard__line">' + t(ad.line) + '</span>' +
      '<ul class="adcard__list">' + list + '</ul>' +
      '<span class="adcard__cta">' + t(ad.cta) + I('arrow') + '</span>' +
    '</span></a>';
}

/* ---------- Banner ngang ---------- */
function barHTML(ad){
  return '<a class="adbar" href="' + ad.url + '" target="_blank" rel="noopener sponsored">' +
    '<button class="adbar__x" type="button" aria-label="Ẩn quảng cáo">✕</button>' +
    '<span class="adbar__tag">' + I('tag') + '<span data-adlabel>' + t(LABEL) + '</span></span>' +
    '<span class="adbar__img"><img src="' + P + ad.imgH + '" alt="' + ad.alt +
      '" width="960" height="300" loading="lazy" decoding="async"></span>' +
    '<span class="adbar__body">' +
      '<span class="adbar__kicker">' + t(ad.kicker) + '</span>' +
      '<span class="adbar__title">' + t(ad.title) + '</span>' +
      '<span class="adbar__line">' + t(ad.line) + '</span>' +
      '<span class="adbar__cta">' + t(ad.cta) + I('arrow') + '</span>' +
    '</span></a>';
}

var rails = {};
function build(){
  Object.keys(rails).forEach(function(k){ rails[k].remove(); });
  rails = {};
  document.querySelectorAll('.adbar-slot').forEach(function(s){ s.innerHTML = ''; });

  ADS.forEach(function(ad, i){
    if(!rails[ad.side]){
      var r = document.createElement('aside');
      r.className = 'adrail adrail--' + ad.side;
      r.setAttribute('aria-label', 'Nội dung tài trợ');
      document.body.appendChild(r);
      rails[ad.side] = r;
    }
    rails[ad.side].insertAdjacentHTML('beforeend', cardHTML(ad, i));
  });

  /* Banner ngang: chèn sau phần Ẩm thực và sau phần Academy */
  var slots = ['cuisine', 'academy'];
  slots.forEach(function(id, i){
    var sec = document.getElementById(id);
    if(!sec || !ADS[i]) return;
    var slot = sec.querySelector('.adbar-slot');
    if(!slot){
      slot = document.createElement('div');
      slot.className = 'adbar-slot';
      slot.style.marginTop = '52px';
      var w = sec.querySelector('.wrap');
      (w || sec).appendChild(slot);
    }
    slot.innerHTML = barHTML(ADS[i]);
  });

  document.querySelectorAll('.adcard__x, .adbar__x').forEach(function(b){
    b.addEventListener('click', function(e){
      e.preventDefault(); e.stopPropagation();
      Object.keys(rails).forEach(function(k){ rails[k].remove(); });
      document.querySelectorAll('.adbar-slot').forEach(function(s){ s.remove(); });
      document.querySelectorAll('.adz').forEach(function(s){ s.classList.remove('adz'); });
      try{ sessionStorage.setItem('ad-off', '1'); }catch(err){}
    });
  });
}

function zone(){
  var start = document.getElementById('craft') || document.querySelector('main > section');
  var end   = document.getElementById('blog') || start;
  if(!start) return null;
  var on = false;
  document.querySelectorAll('main > section').forEach(function(s){
    if(s === start) on = true;
    if(on) s.classList.add('adz');
    if(s === end) on = false;
  });
  return { start:start, end:end };
}

function place(z){
  if(!z) return;
  var top = z.start.getBoundingClientRect().top + window.pageYOffset;
  var bot = z.end.getBoundingClientRect().bottom + window.pageYOffset;
  Object.keys(rails).forEach(function(k){
    rails[k].style.top = Math.round(top) + 'px';
    rails[k].style.height = Math.max(Math.round(bot - top), 0) + 'px';
  });
}

function watchLight(){
  if(!('IntersectionObserver' in window)) return;
  var hits = new Set();
  var io = new IntersectionObserver(function(en){
    en.forEach(function(e){ e.isIntersecting ? hits.add(e.target) : hits.delete(e.target); });
    var on = hits.size > 0;
    Object.keys(rails).forEach(function(k){ rails[k].classList.toggle('on-light', on); });
  }, { rootMargin:'-40% 0px -40% 0px' });
  document.querySelectorAll('[data-nav="light"]').forEach(function(s){ io.observe(s); });
}

function boot(){
  build();
  var z = zone();
  place(z);
  watchLight();
  var re = function(){ place(z); };
  window.addEventListener('resize', re, { passive:true });
  window.addEventListener('load', re);
  setTimeout(re, 900); setTimeout(re, 2600);

  document.addEventListener('langapplied', function(){
    var l = 0;
    try{ if(localStorage.getItem('cmn-lang') === 'en') l = 1; }catch(e){}
    if(l === lang) return;
    lang = l; build(); place(z);
  });
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', boot);
} else { boot(); }

})();
