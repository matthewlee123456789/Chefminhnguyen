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
      var ws = el.querySelectorAll ? el.querySelectorAll('.w-split') : [];
      for(var wi = 0; wi < ws.length; wi++) ws[wi].classList.add('in');

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
  var up = location.pathname.indexOf('/blog/') > -1 ? '../' : '';
  veil.innerHTML = '<img src="' + up + 'assets/logo-64.png" alt="" width="64" height="64">';
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
  if(!sec || sec.querySelector('.ph-bg')) return;   /* đã có ảnh nền thì thôi */
  if(getComputedStyle(sec).position === 'static') sec.style.position = 'relative';
  sec.style.overflow = 'hidden';
  sealGh = document.createElement('div');
  sealGh.className = 'seal-ghost';
  sealGh.setAttribute('aria-hidden', 'true');
  sealGh.innerHTML = '<svg viewBox="0 0 200 200"><use href="#seal-mini"/></svg>';
  sec.insertBefore(sealGh, sec.firstChild);
}


/* ============================================================
   8. TIÊU ĐỀ HIỆN THEO TỪNG CHỮ
   Tách chữ ở tầng DOM nên vẫn giữ nguyên khả năng xuống dòng
   và không phá dấu tiếng Việt.
   ============================================================ */
function splitWords(el){
  if(reduce) return;
  if(el.dataset.splitDone === (el.textContent || '').length + '') return;
  el.dataset.splitDone = (el.textContent || '').length + '';
  el.classList.add('split');

  var idx = 0;
  function walk(node){
    var kids = Array.prototype.slice.call(node.childNodes);
    kids.forEach(function(n){
      if(n.nodeType === 3){                       /* văn bản */
        var parts = n.nodeValue.split(/(\s+)/);
        var frag = document.createDocumentFragment();
        parts.forEach(function(p){
          if(!p) return;
          if(/^\s+$/.test(p)){ frag.appendChild(document.createTextNode(p)); return; }
          var w = document.createElement('span');
          w.className = 'w-split';
          var inner = document.createElement('i');
          inner.textContent = p;
          inner.style.setProperty('--wd', Math.min(idx, 14) * 55 + 'ms');
          idx++;
          w.appendChild(inner);
          frag.appendChild(w);
        });
        node.replaceChild(frag, n);
      } else if(n.nodeType === 1 && n.tagName !== 'BR' && !n.classList.contains('w-split')){
        walk(n);
      }
    });
  }
  walk(el);
}

function applySplit(){
  $$('.h-display:not(.hero__name), .h-2').forEach(function(el){
    if(el.closest('.sponsor-card, .sponsor-bar')) return;
    splitWords(el);
    if(el.classList.contains('in')){
      $$('.w-split', el).forEach(function(w){ w.classList.add('in'); });
    }
  });
}

/* ============================================================
   9. DẢI CHỮ CHẠY VÔ TẬN
   ============================================================ */
var TICK = {
  vi: ['Vietchefs Worldwide', 'Top Chef Vietnam 2023 · Top 4',
       'Best Master Chef Awards 2024', 'International Chefs Sans Frontières',
       'Hơn 15 năm nghề bếp', 'Hồn Việt · Kỹ thuật hiện đại'],
  en: ['Vietchefs Worldwide', 'Top Chef Vietnam 2023 · Top 4',
       'Best Master Chef Awards 2024', 'International Chefs Sans Frontières',
       'Over 15 years in the kitchen', 'Vietnamese soul · Modern technique']
};

function buildTicker(){
  var host = document.getElementById('ticker');
  if(!host) return;
  var lang = 0;
  try{ if(localStorage.getItem('cmn-lang') === 'en') lang = 1; }catch(e){}
  var list = lang ? TICK.en : TICK.vi;
  var dot = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
            'stroke-linecap="round"><path d="M12 4v16M4 12h16"/></svg>';
  var set = '<span class="ticker__set">' +
    list.map(function(x){ return '<span class="ticker__item">' + x + dot + '</span>'; }).join('') +
    '</span>';
  host.innerHTML = '<div class="ticker__track">' + set + set + '</div>';
}

/* ============================================================
   10. VỆT SÁNG BÁM CON TRỎ TRÊN VÙNG NỀN TỐI
   ============================================================ */
function spotlight(){
  if(!fine || reduce) return;
  $$('.band--dark, .band--raised, .contact').forEach(function(s){
    s.classList.add('spot');
    var raf = null;
    s.addEventListener('pointerenter', function(){ s.classList.add('lit'); });
    s.addEventListener('pointerleave', function(){ s.classList.remove('lit'); });
    s.addEventListener('pointermove', function(e){
      if(raf) return;
      raf = requestAnimationFrame(function(){
        raf = null;
        var r = s.getBoundingClientRect();
        s.style.setProperty('--sx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
        s.style.setProperty('--sy', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
      });
    });
  });
}

/* ============================================================
   11. CUỘN MƯỢT KIỂU LERP — MẶC ĐỊNH TẮT
   ------------------------------------------------------------
   Bật bằng cách đổi thành true. Cảnh báo: cách cuộn này ghi đè
   lên cuộn tự nhiên của trình duyệt, có thể gây khó chịu trên
   chuột cảm ứng và làm chậm máy yếu. Đã thử nghiệm và giữ ở
   mức nhẹ nhất có thể.
   ============================================================ */
var SMOOTH_SCROLL = false;

function smoothWheel(){
  if(!SMOOTH_SCROLL || reduce || !fine) return;
  var target = window.pageYOffset, current = target, running = false;
  function loop(){
    current += (target - current) * 0.12;
    if(Math.abs(target - current) < 0.6){ current = target; running = false; }
    window.scrollTo(0, current);
    if(running) requestAnimationFrame(loop);
  }
  window.addEventListener('wheel', function(e){
    if(e.ctrlKey) return;
    e.preventDefault();
    var max = document.documentElement.scrollHeight - window.innerHeight;
    target = Math.max(0, Math.min(target + e.deltaY * 1.0, max));
    if(!running){ running = true; current = window.pageYOffset; requestAnimationFrame(loop); }
  }, { passive:false });
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
  applySplit();
  buildTicker();
  spotlight();
  smoothWheel();
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
  setTimeout(function(){
    $$('.h-display, .h-2').forEach(function(el){ el.dataset.splitDone = ''; });
    applySplit();
    buildTicker();
    collect(); onScroll();
  }, 60);
});

})();
