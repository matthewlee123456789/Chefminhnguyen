/* ============================================================
   CHEF MINH NGUYỄN — HỆ CHUYỂN ĐỘNG
   Tự tìm các thành phần có sẵn rồi gắn hiệu ứng, không cần
   sửa HTML. Toàn bộ tính toán chạy trong MỘT vòng lặp rAF duy
   nhất để không làm giật khi cuộn.
   ============================================================ */
(function(){
'use strict';

var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var fine   = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
var $  = function(s, c){ return (c || document).querySelector(s); };
var $$ = function(s, c){ return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

/* ============================================================
   1. GẮN VAI TRÒ CHUYỂN ĐỘNG
   ============================================================ */
function tag(sel, mode, delayStep){
  $$(sel).forEach(function(el, i){
    if(el.hasAttribute('data-mo')) return;
    el.setAttribute('data-mo', mode);
    if(delayStep) el.style.setProperty('--mo-d', (i % 4) * delayStep + 'ms');
  });
}

/* Chữ: tiêu đề, dẫn nhập, trích dẫn */
tag('.h-display:not(.hero__name), .h-2, .pagehead .lead, blockquote p', 'text', 70);

/* Ảnh: bọc lại để có khung cắt */
$$('.dish__img, .media-card > img, .course > img, .post-link > img, .article > img, .band > .wrap > img').forEach(function(el){
  if(el.tagName === 'IMG'){
    if(el.closest('[data-mo="img"]')) return;
    if(el.parentNode.classList.contains('mo-frame')) return;
    var f = document.createElement('span');
    f.className = 'mo-frame';
    f.style.cssText = 'display:block;overflow:hidden;position:relative';
    el.parentNode.insertBefore(f, el);
    f.appendChild(el);
    f.setAttribute('data-mo', 'img');
  } else if(!el.hasAttribute('data-mo')){
    el.setAttribute('data-mo', 'img');
  }
});

/* Nhóm con so le */
tag('.pillars, .media-grid, .posts, .stats, .dish-grid, .routes, .clients, .course__meta', 'stagger');

/* Nghiêng 3D */
if(fine && !reduce){
  $$('.pillar, .media-card, .post-link, .course, .dish, .kit').forEach(function(el){
    el.classList.add('tilt');
    if(getComputedStyle(el).position === 'static') el.style.position = 'relative';
    var p = el.parentNode;
    if(!p.classList.contains('tilt-wrap')) p.classList.add('tilt-wrap');
  });
  $$('.hero__cta .btn, .kit .btn, .contact-grid .btn--solid').forEach(function(b){
    b.classList.add('magnet');
  });
}

/* Bông lúa: đo chiều dài nét để vẽ dần */
$$('.stalk-rule svg path').forEach(function(p){
  try{ p.style.setProperty('--len', Math.ceil(p.getTotalLength()) + ''); }catch(e){}
});

/* ============================================================
   2. HIỆN DẦN KHI VÀO KHUNG NHÌN
   ============================================================ */
var revealTargets = $$('[data-mo], .stalk-rule, .stats, .awards, .reveal');

if('IntersectionObserver' in window){
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(!en.isIntersecting) return;
      var el = en.target;
      el.classList.add('in');

      /* Con của khối so le: giãn nhịp từng phần tử */
      if(el.getAttribute('data-mo') === 'stagger'){
        Array.prototype.forEach.call(el.children, function(c, i){
          c.style.transitionDelay = Math.min(i, 8) * 85 + 'ms';
        });
      }
      if(el.classList.contains('stats') || el.classList.contains('awards')){
        $$('.stat, .award-row', el).forEach(function(r, i){
          r.style.setProperty('--mo-d', i * 110 + 'ms');
        });
      }
      io.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
  revealTargets.forEach(function(el){ io.observe(el); });
} else {
  revealTargets.forEach(function(el){ el.classList.add('in'); });
}

/* ============================================================
   3. MỘT VÒNG LẶP DUY NHẤT CHO PARALLAX
   ============================================================ */
var vh = window.innerHeight;
var ticking = false;

var pxImgs   = [];
var heroWrap = $('.hero--video .wrap');
var counterN = $('.craft__num');
var sealGh   = null;
var bar      = null;

function collect(){
  pxImgs = $$('[data-mo="img"]').map(function(f){
    return { frame:f, img:f.querySelector('img'), depth: f.closest('.dish--wide') ? 26 : 16 };
  }).filter(function(o){ return o.img; });
}

function frame(){
  ticking = false;
  var y = window.pageYOffset;

  /* Vạch tiến độ */
  if(bar){
    var max = document.documentElement.scrollHeight - vh;
    bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
  }

  /* Hero rời đi */
  if(heroWrap){
    var p = Math.min(y / (vh * 0.85), 1);
    heroWrap.style.setProperty('--hero-y', (y * 0.22).toFixed(1) + 'px');
    heroWrap.style.setProperty('--hero-o', (1 - p * 1.15).toFixed(3));
  }

  /* Ảnh trôi trong khung */
  for(var i = 0; i < pxImgs.length; i++){
    var o = pxImgs[i];
    var r = o.frame.getBoundingClientRect();
    if(r.bottom < -200 || r.top > vh + 200) continue;
    var c = (r.top + r.height / 2 - vh / 2) / (vh / 2);   // -1 … 1
    o.img.style.setProperty('--py', (-c * o.depth).toFixed(1) + 'px');
  }

  /* Số 15 nhô nhẹ */
  if(counterN){
    var rc = counterN.getBoundingClientRect();
    if(rc.bottom > 0 && rc.top < vh){
      var cc = (rc.top + rc.height / 2 - vh / 2) / (vh / 2);
      counterN.style.setProperty('--num-y', (-cc * 22).toFixed(1) + 'px');
    }
  }

  /* Con dấu chìm xoay */
  if(sealGh){
    var rs = sealGh.getBoundingClientRect();
    if(rs.bottom > 0 && rs.top < vh){
      sealGh.style.setProperty('--rot', ((y - sealGh.offsetTop) * 0.035).toFixed(2) + 'deg');
    }
  }
}

function onScroll(){
  if(!ticking){ ticking = true; requestAnimationFrame(frame); }
}

/* ============================================================
   4. NGHIÊNG 3D THEO CON TRỎ
   ============================================================ */
if(fine && !reduce){
  $$('.tilt').forEach(function(el){
    var raf = null, rect = null;

    el.addEventListener('pointerenter', function(){
      rect = el.getBoundingClientRect();
      el.classList.add('active');
    });

    el.addEventListener('pointermove', function(e){
      if(!rect) rect = el.getBoundingClientRect();
      if(raf) return;
      raf = requestAnimationFrame(function(){
        raf = null;
        var px = (e.clientX - rect.left) / rect.width;
        var py = (e.clientY - rect.top) / rect.height;
        var rx = (0.5 - py) * 5.5;
        var ry = (px - 0.5) * 5.5;
        el.style.transform = 'rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateZ(8px)';
        el.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        el.style.setProperty('--my', (py * 100).toFixed(1) + '%');
      });
    });

    el.addEventListener('pointerleave', function(){
      el.classList.remove('active');
      el.style.transform = '';
      rect = null;
    });
  });

  /* Nút hút nhẹ về phía con trỏ */
  $$('.magnet').forEach(function(b){
    var r = null;
    b.addEventListener('pointerenter', function(){ r = b.getBoundingClientRect(); b.classList.add('active'); });
    b.addEventListener('pointermove', function(e){
      if(!r) return;
      var dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      var dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      b.style.transform = 'translate(' + (dx * 5).toFixed(1) + 'px,' + (dy * 4).toFixed(1) + 'px)';
    });
    b.addEventListener('pointerleave', function(){
      b.classList.remove('active'); b.style.transform = ''; r = null;
    });
  });
}

/* ============================================================
   5. CHUYỂN TRANG MƯỢT
   ============================================================ */
var veil = null;
function buildVeil(){
  veil = document.createElement('div');
  veil.className = 'page-veil';
  veil.innerHTML = '<svg viewBox="0 0 200 200" aria-hidden="true"><use href="#seal-mini"/></svg>';
  document.body.appendChild(veil);

  document.body.classList.add('booting');
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){ document.body.classList.remove('booting'); });
  });

  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a');
    if(!a) return;
    var href = a.getAttribute('href') || '';
    if(!href || href.charAt(0) === '#' || a.target === '_blank') return;
    if(/^(mailto:|tel:|https?:\/\/)/.test(href)) return;
    if(e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    veil.classList.add('on');
    setTimeout(function(){ window.location.href = href; }, 300);
  });

  /* Quay lại bằng nút Back: bỏ màn che */
  window.addEventListener('pageshow', function(ev){
    if(ev.persisted) veil.classList.remove('on');
  });
}

/* ============================================================
   6. CON DẤU CHÌM Ở PHẦN TRIẾT LÝ
   ============================================================ */
function buildSeal(){
  var sec = document.getElementById('philosophy');
  if(!sec) return;
  if(getComputedStyle(sec).position === 'static') sec.style.position = 'relative';
  sec.style.overflow = 'hidden';
  sealGh = document.createElement('div');
  sealGh.className = 'seal-ghost';
  sealGh.setAttribute('aria-hidden', 'true');
  sealGh.innerHTML = '<svg viewBox="0 0 200 200"><use href="#seal-mini"/></svg>';
  sec.insertBefore(sealGh, sec.firstChild);
}

/* ============================================================
   7. KHỞI ĐỘNG
   ============================================================ */
function init(){
  /* Bật hệ chuyển động. Không có class này thì mọi thứ hiện bình thường. */
  document.documentElement.classList.add('mo');

  /* Lưới an toàn: sau 2,5 giây, bất kể chuyện gì xảy ra,
     mọi phần tử còn đang ẩn đều được hiện ra. */
  setTimeout(function(){
    revealTargets.forEach(function(el){ el.classList.add('in'); });
    $$('.reveal').forEach(function(el){ el.classList.add('in'); });
  }, 2500);

  if(!reduce){
    bar = document.createElement('div');
    bar.className = 'scroll-bar';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    buildSeal();
    buildVeil();
  }
  collect();
  frame();
  window.addEventListener('scroll', onScroll, { passive:true });
  window.addEventListener('resize', function(){
    vh = window.innerHeight; collect(); onScroll();
  }, { passive:true });
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', init);
} else { init(); }

/* Đổi ngôn ngữ làm thay đổi chiều dài chữ → đo lại */
document.addEventListener('langapplied', function(){
  setTimeout(function(){ collect(); onScroll(); }, 60);
});

})();
