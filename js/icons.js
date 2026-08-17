/* ============================================================
   BỘ ICON — nét mảnh, cùng ngôn ngữ với con dấu
   Dùng: CMNIcon('arrow')  → trả về chuỗi SVG
   Tự gắn vào các phần tử có [data-i] khi trang tải xong.
   ============================================================ */
(function(){
'use strict';

var P = {
  arrow:   '<path d="M4 12h16M14 6l6 6-6 6"/>',
  chef:    '<path d="M7 21h10M6 21v-5h12v5M6 16c-2 0-3.5-1.7-3.5-3.7C2.5 10.4 4 9 5.8 9 6.2 6.7 8 5 10.3 5c1.6 0 3 .8 3.8 2 .5-.3 1-.4 1.6-.4 2 0 3.6 1.6 3.6 3.6 0 .3 0 .6-.1.9 1.4.4 2.4 1.7 2.4 3.2 0 1.5-1.2 2.7-2.6 2.7"/>',
  dish:    '<path d="M3 11h18M12 11V7M12 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4M5 11c0 4 3 7 7 7s7-3 7-7M4 21h16"/>',
  service: '<path d="M12 3v18M7 3v6a2 2 0 0 0 4 0V3M17 3c-1.5 1.5-2 3.5-2 5.5S16 12 17 12v9"/>',
  book:    '<path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2V5ZM6 19h12v2H6"/>',
  media:   '<path d="M3 5h18v12H3zM10 9l5 3-5 3zM8 21h8"/>',
  pen:     '<path d="M4 20h4L20 8a2.8 2.8 0 0 0-4-4L4 16v4ZM14 6l4 4"/>',
  mail:    '<path d="M3 6h18v12H3zM3 7l9 6 9-6"/>',
  phone:   '<path d="M6 3h3l2 5-2 1c.9 2 2.5 3.6 4.5 4.5l1-2 5 2v3c0 1-.8 2-2 2C10.8 18.5 5.5 13.2 4 6c0-1.2 1-2 2-2Z"/>',
  chat:    '<path d="M21 12a8 8 0 0 1-8 8H5l-2 2V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8Z"/>',
  clock:   '<path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 7v5l3 2"/>',
  pin:     '<path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11ZM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>',
  users:   '<path d="M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20M9.5 10.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M21 20v-1.5a4 4 0 0 0-3-3.9M16.5 3.7a4 4 0 0 1 0 6.8"/>',
  star:    '<path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-2.9L6.7 19.6l1.1-6L3.4 9.4l6-.8L12 3Z"/>',
  check:   '<path d="M4 12.5 9 18 20 6"/>',
  play:    '<path d="M8 5v14l11-7z"/>',
  tag:     '<path d="M3 12V4h8l10 10-8 8L3 12ZM7.5 7.5h.01"/>',
  globe:   '<path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z"/>',
  up:      '<path d="M12 20V5M6 11l6-6 6 6"/>',
  menu:    '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close:   '<path d="M6 6l12 12M18 6L6 18"/>',
  fb:      '<path d="M14 8h3V4.5h-3c-2.2 0-4 1.8-4 4V11H7.5v3.5H10V21h3.5v-6.5H16l.5-3.5H13.5V8.5c0-.3.2-.5.5-.5Z"/>',
  tiktok:  '<path d="M15 4c.5 2.2 2 3.7 4.2 4v3.1c-1.6 0-3-.5-4.2-1.4v6.1a5.9 5.9 0 1 1-5.9-5.9c.3 0 .6 0 .9.1v3.2a2.8 2.8 0 1 0 2 2.7V4H15Z"/>',
  yt:      '<path d="M21.3 8.2a2.4 2.4 0 0 0-1.7-1.7C18 6 12 6 12 6s-6 0-7.6.5A2.4 2.4 0 0 0 2.7 8.2 25 25 0 0 0 2.3 12c0 1.3.1 2.5.4 3.8a2.4 2.4 0 0 0 1.7 1.7C6 18 12 18 12 18s6 0 7.6-.5a2.4 2.4 0 0 0 1.7-1.7c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8ZM10.2 14.7V9.3L14.8 12l-4.6 2.7Z"/>',
  zalo:    '<path d="M4 4h16v12H12l-5 4v-4H4V4ZM7.5 8h4l-4 4h4M15 8v4M15 8c1.7 0 3 1 3 2s-1.3 2-3 2"/>',
  medal:   '<path d="M8 3 5 9M16 3l3 6M12 3l-2 5M12 3l2 5M12 21a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM12 12.5l1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2L8.8 14.8 11 14.5l1-2Z"/>',
  toque:   '<path d="M7 21h10M6.5 21v-4.5h11V21M6.5 16.5c-2.1 0-3.8-1.7-3.8-3.8 0-1.9 1.4-3.5 3.3-3.7C6.4 6.6 8.3 5 10.6 5c1.6 0 3 .8 3.9 2 .5-.2 1-.3 1.6-.3 2.1 0 3.8 1.7 3.8 3.8 0 .3 0 .6-.1.9 1.3.5 2.2 1.8 2.2 3.2 0 1.6-1.3 2.9-2.9 2.9M9.5 9.5v7M14.5 9.5v7"/>',
  cutlery: '<path d="M7 3v7a2 2 0 0 0 4 0V3M9 12v9M16.5 3c-1.4 1.4-2 3.3-2 5.2 0 1.5.7 2.8 1.7 3.3V21"/>',
  years:   '<path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 7.5v5l3.2 1.8"/>',
  fire:    '<path d="M12 3c.6 3 3 4.2 3 7a3 3 0 0 1-6 0c0-1 .4-1.8 1-2.4M12 21a6 6 0 0 0 6-6c0-3.4-2.4-5.2-3.6-8.4"/>',
  leaf:    '<path d="M4 20c0-8 6-14 16-15 0 10-5 15-13 15H4ZM8 16c2-4 5-6 8-7"/>',
  ig:      '<path d="M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8ZM12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM17 7h.01"/>'
};

function icon(name, cls){
  var d = P[name];
  if(!d) return '';
  return '<svg class="ic ' + (cls || '') + '" viewBox="0 0 24 24" fill="none" ' +
    'stroke="currentColor" stroke-width="1.5" stroke-linecap="round" ' +
    'stroke-linejoin="round" aria-hidden="true" focusable="false">' + d + '</svg>';
}
/* Icon dạng đặc (mạng xã hội) */
function solid(name){
  var d = P[name];
  if(!d) return '';
  return '<svg class="ic" viewBox="0 0 24 24" fill="currentColor" stroke="none" ' +
    'aria-hidden="true" focusable="false">' + d + '</svg>';
}

window.CMNIcon = icon;
window.CMNIconSolid = solid;

function fill(){
  document.querySelectorAll('[data-i]').forEach(function(el){
    /* Xoá icon đã chèn trước đó, tránh chèn chồng khi đổi ngôn ngữ */
    var old = el.querySelectorAll(':scope > svg.ic');
    for(var i = 0; i < old.length; i++) old[i].remove();

    var name = el.dataset.i;
    var svg = (name === 'fb' || name === 'tiktok' || name === 'yt' || name === 'ig')
      ? solid(name) : icon(name);
    if(!svg) return;
    if(el.dataset.iPos === 'end') el.insertAdjacentHTML('beforeend', svg);
    else el.insertAdjacentHTML('afterbegin', svg);
  });
}

if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fill);
else fill();

/* Đổi ngôn ngữ không làm mất icon, nhưng chạy lại cho chắc — hàm đã idempotent */
document.addEventListener('langapplied', fill);
})();
