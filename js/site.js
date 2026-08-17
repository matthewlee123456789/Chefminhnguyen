
/* ===== js/icons.js ===== */
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


/* ===== js/i18n-auto.js ===== */
/* Từ điển sinh tự động bởi build.py — đừng sửa tay */
window.CMN_I18N = {
 "aca.c1a1": [
  "Muốn mở nhà hàng và tự giữ bí quyết công thức",
  "You want to open a restaurant and keep your own recipes"
 ],
 "aca.c1a2": [
  "Chưa biết cách tính giá bán và kiểm soát chi phí",
  "You are unsure how to price dishes and control cost"
 ],
 "aca.c1sk1": [
  "Thời lượng",
  "Length"
 ],
 "aca.c1sv1": [
  "Theo lịch của bạn",
  "Your own schedule"
 ],
 "aca.c1sk2": [
  "Quy mô lớp",
  "Class size"
 ],
 "aca.c1sv2": [
  "1 kèm 1 VIP",
  "One-to-one VIP"
 ],
 "aca.c1rk1": [
  "Khai giảng",
  "Intake"
 ],
 "aca.c1rv1": [
  "Liên tục quanh năm",
  "All year round"
 ],
 "aca.c1rk2": [
  "Địa điểm",
  "Location"
 ],
 "aca.c1rv2": [
  "TP. Hồ Chí Minh · hoặc online",
  "Ho Chi Minh City · or online"
 ],
 "aca.c1rk3": [
  "Đặc biệt",
  "Special"
 ],
 "aca.c1rv3": [
  "Thiết kế menu học theo yêu cầu học viên",
  "Menu designed around each student"
 ],
 "aca.c1rk4": [
  "Sau khoá",
  "After"
 ],
 "aca.c1rv4": [
  "Hỗ trợ kèm 24/7, ưu đãi tư vấn set up",
  "24/7 follow-up, discounted set-up consulting"
 ],
 "aca.c1h": [
  "Học nấu ăn để làm chủ",
  "Cook to own your kitchen"
 ],
 "aca.c1s": [
  "Dành cho người sắp mở nhà hàng và muốn tự đứng bếp, tự giữ công thức.",
  "For people about to open a restaurant who want to run the stove and keep their own recipes."
 ],
 "aca.c1badge": [
  "Khai giảng liên tục",
  "Rolling intake"
 ],
 "aca.c2a1": [
  "Muốn làm nghề bếp nhưng chưa biết bắt đầu từ đâu",
  "You want to cook professionally but do not know where to start"
 ],
 "aca.c2a2": [
  "Muốn học từ một người thầy đã thành công trong nghề",
  "You want to learn from someone who has done it"
 ],
 "aca.c2sk1": [
  "Thời lượng",
  "Length"
 ],
 "aca.c2sv1": [
  "1 – 2 tháng",
  "1 – 2 months"
 ],
 "aca.c2sk2": [
  "Quy mô lớp",
  "Class size"
 ],
 "aca.c2sv2": [
  "Tối đa 2 – 3 người",
  "Max 2 – 3 students"
 ],
 "aca.c2rk1": [
  "Khai giảng",
  "Intake"
 ],
 "aca.c2rv1": [
  "Liên tục quanh năm",
  "All year round"
 ],
 "aca.c2rk2": [
  "Lịch học",
  "Schedule"
 ],
 "aca.c2rv2": [
  "Phù hợp người vừa đi làm vừa học",
  "Fits people working full time"
 ],
 "aca.c2rk3": [
  "Địa điểm",
  "Location"
 ],
 "aca.c2rv3": [
  "TP. Hồ Chí Minh",
  "Ho Chi Minh City"
 ],
 "aca.c2rk4": [
  "Cách dạy",
  "Teaching"
 ],
 "aca.c2rv4": [
  "Truyền đạt bằng toàn bộ kinh nghiệm thực chiến",
  "Taught from real kitchen experience"
 ],
 "aca.c2h": [
  "Lớp món Á – Âu cơ bản",
  "Asian & European foundation"
 ],
 "aca.c2s": [
  "Dành cho người mới bước vào nghề bếp, cần một lộ trình rõ ràng.",
  "For people entering the trade who need a clear path."
 ],
 "aca.c2badge": [
  "Khai giảng liên tục",
  "Rolling intake"
 ],
 "aca.c3a1": [
  "Học các loại sốt đã thành công tại nhiều cuộc thi",
  "Learn the sauces that won at competition"
 ],
 "aca.c3a2": [
  "Sắp xếp và vận hành nhà bếp chuyên nghiệp",
  "Professional kitchen layout and operations"
 ],
 "aca.c3sk1": [
  "Thời lượng",
  "Length"
 ],
 "aca.c3sv1": [
  "Theo lịch của bạn",
  "Your own schedule"
 ],
 "aca.c3sk2": [
  "Quy mô lớp",
  "Class size"
 ],
 "aca.c3sv2": [
  "Tối đa 1 – 2 người",
  "Max 1 – 2 students"
 ],
 "aca.c3rk1": [
  "Khai giảng",
  "Intake"
 ],
 "aca.c3rv1": [
  "Hằng tháng",
  "Monthly"
 ],
 "aca.c3rk2": [
  "Chuyên sâu",
  "Depth"
 ],
 "aca.c3rv2": [
  "Sốt nền và sốt đặc biệt do Chef sáng tạo",
  "Base and signature sauces created by the Chef"
 ],
 "aca.c3rk3": [
  "Kỹ năng",
  "Skills"
 ],
 "aca.c3rv3": [
  "Trang trí và các trường phái nấu ăn",
  "Plating and major culinary schools"
 ],
 "aca.c3rk4": [
  "Tư duy",
  "Thinking"
 ],
 "aca.c3rv4": [
  "Thi đấu ẩm thực và sáng tạo món",
  "Competition and dish creation"
 ],
 "aca.c3h": [
  "Khoá Á – Âu nâng cao",
  "Asian & European advanced"
 ],
 "aca.c3s": [
  "Dành cho người đã có nền, muốn đi sâu vào sốt, kỹ thuật và tư duy thi đấu.",
  "For cooks with a base who want depth in sauces, technique and competition thinking."
 ],
 "aca.c3badge": [
  "Khai giảng hằng tháng",
  "Monthly intake"
 ],
 "aca.more": [
  "Xem chi tiết & đăng ký",
  "See details & register"
 ],
 "art.t1": [
  "Siêu Bếp mùa 2 · Tập 8 — Những món ăn thương nhớ miền Tây",
  "Siêu Bếp season 2 · Episode 8 — Dishes that miss the Mekong Delta"
 ],
 "art.s1": [
  "Chef Minh Nguyễn mang trái giác và tôm sú, hai đặc sản quê hương Sóc Trăng, lên sóng HTV7.",
  "Chef Minh Nguyễn brought wild grape and tiger prawn, two specialities of his native Sóc Trăng, to HTV7."
 ],
 "art.t2": [
  "Siêu Bếp mùa 2 · Tập 5 — Chinh phục thực khách bằng món ăn chữa lành",
  "Siêu Bếp season 2 · Episode 5 — Winning the table with food that heals"
 ],
 "art.s2": [
  "Món xôi gà thực dưỡng không dùng đạm động vật, kể lại quãng thời gian Chef sống ở vùng cao Tây Bắc.",
  "A macrobiotic sticky rice dish without animal protein, retelling the time the Chef spent in the northern highlands."
 ],
 "art.t3": [
  "Sứ giả của ẩm thực Việt trên đất châu Âu",
  "An ambassador for Vietnamese food in Europe"
 ],
 "art.s3": [
  "Chef Minh Nguyễn nói về việc mang hương vị Việt tới thực khách châu Âu và những gì học được trên đường đi.",
  "Chef Minh Nguyễn on bringing Vietnamese flavour to European diners, and what the road taught him."
 ],
 "art.read": [
  "Đọc bài viết",
  "Read the article"
 ],
 "blg.c1": [
  "Kỹ thuật bếp",
  "Technique"
 ],
 "blg.t1": [
  "Sous vide: nấu bằng nhiệt độ, không nấu bằng thời gian",
  "Sous vide: cooking by temperature, not by time"
 ],
 "blg.s1": [
  "Vì sao 63°C giữ được thứ mà 100°C phá mất, và khi nào kỹ thuật này thực sự đáng dùng.",
  "Why 63°C keeps what 100°C destroys, and when the technique is actually worth it."
 ],
 "blg.c2": [
  "Nguyên liệu",
  "Ingredients"
 ],
 "blg.t2": [
  "Dry-aging: làm khô có kiểm soát để vị đậm hơn",
  "Dry-aging: controlled drying for deeper flavour"
 ],
 "blg.s2": [
  "Nguyên lý đằng sau việc cố tình để nguyên liệu mất nước, và ranh giới giữa chín tới và hỏng.",
  "The principle behind deliberate moisture loss, and the line between aged and spoiled."
 ],
 "blg.c3": [
  "Cách nấu",
  "How to cook"
 ],
 "blg.t3": [
  "Nước dùng: phần không ai thấy nhưng quyết định cả món",
  "Stock: the part nobody sees that decides the dish"
 ],
 "blg.s3": [
  "Xương, nhiệt độ, thời gian và lý do nồi nước dùng không bao giờ được sôi bùng.",
  "Bones, temperature, time, and why a stock pot must never boil."
 ],
 "bio.title": [
  "Tiểu sử hoạt động và thành tích",
  "Career and achievements"
 ],
 "bio.sub": [
  "Chef Minh Nguyễn · 2008 → nay",
  "Chef Minh Nguyễn · 2008 → today"
 ],
 "bio.roles": [
  "Vai trò hiện tại",
  "Current roles"
 ],
 "bio.1": [
  "Bén duyên với nghề bếp khi mới 14 tuổi, bắt đầu làm việc trong bếp nhà hàng của gia đình tại Nhà Bè, TP. Hồ Chí Minh.",
  "Came to the trade at fourteen, starting in the kitchen of the family restaurant in Nhà Bè, Ho Chi Minh City."
 ],
 "bio.2": [
  "Bếp chính tại khách sạn Hương Sen, tiêu chuẩn 3 sao, trung tâm TP. Hồ Chí Minh.",
  "Head of the line at the three-star Hương Sen Hotel in central Ho Chi Minh City."
 ],
 "bio.3": [
  "Sang Thái Lan tu nghiệp để học hỏi từ môi trường quốc tế, trở về nước khi Bangkok xảy ra biến cố.",
  "Trained in Thailand to learn from an international kitchen, returning home when unrest broke out in Bangkok."
 ],
 "bio.4": [
  "Bếp phó nhà hàng The Kafe, TP. Hồ Chí Minh — chuỗi Việt Nam vừa gọi vốn nước ngoài 3,8 triệu đô la, doanh thu 2 – 2,8 tỷ đồng mỗi tháng.",
  "Sous chef at The Kafe, Ho Chi Minh City — a Vietnamese chain that had just raised 3.8 million USD, turning over 2 – 2.8 billion VND a month."
 ],
 "bio.5": [
  "Huy chương đồng cuộc thi Đầu bếp Việt Nam Tài năng, phần thi set menu món Việt. Cùng năm đạt huy chương bạc giải Đầu bếp trẻ Việt Nam Tài năng do hiệp hội đầu bếp thế giới tổ chức.",
  "Bronze medal at Vietnam Talented Chef for the Vietnamese set-menu round, plus silver at the Young Talented Chef award organised by the world chefs association."
 ],
 "bio.6": [
  "Bếp trưởng nhà hàng Indo tại Aarhus, thành phố lớn thứ hai Đan Mạch. Cùng đội ngũ đưa nhà hàng vào top 2 nhà hàng châu Á ngon nhất thành phố do giới phê bình bình chọn, lên báo và truyền hình Đan Mạch.",
  "Head chef at Indo in Aarhus, Denmark’s second city. With his team he took the restaurant into the city’s top two Asian restaurants as voted by critics, with coverage in Danish press and television."
 ],
 "bio.7": [
  "Bếp phó nhà hàng Cavas tại Frankfurt, Đức, dưới sự dẫn dắt của bếp trưởng hai sao Michelin Michael Riemenschneider — nơi học thế nào là ẩm thực châu Âu đỉnh cao.",
  "Sous chef at Cavas in Frankfurt, Germany, under two-Michelin-star chef Michael Riemenschneider — where he learned what European fine dining really demands."
 ],
 "bio.8": [
  "Quay về Việt Nam tìm nguồn cảm hứng để dựng một hướng đi riêng cho ẩm thực Việt.",
  "Returned to Vietnam to find the material for his own direction in Vietnamese cooking."
 ],
 "bio.9": [
  "Sống và làm việc tại Đồng Văn, Hà Giang. Chủ một homestay tại Làng cổ Thiên Hương.",
  "Lived and worked in Đồng Văn, Hà Giang, running a homestay in the old village of Thiên Hương."
 ],
 "bio.10": [
  "Huy chương vàng cuộc thi Đầu bếp Việt Nam Tài năng, phần thi các món thịt bò Mỹ.",
  "Gold medal at Vietnam Talented Chef in the US beef category."
 ],
 "bio.11": [
  "Bếp trưởng điều hành Senna Wellness Retreat Bắc Ninh, tiêu chuẩn 4 sao. Phục vụ các buổi tiệc lớn cho giới doanh nhân và quan chức cấp cao, dẫn dắt đội bếp hơn 20 người.",
  "Executive chef at the four-star Senna Wellness Retreat in Bắc Ninh, cooking for large events for business leaders and senior officials, leading a brigade of more than twenty."
 ],
 "bio.12": [
  "Top 4 chung cuộc Top Chef phiên bản Việt Nam, phát sóng trên VTV3, tranh tài cùng hàng nghìn thí sinh cả nước.",
  "Finished in the top four of Top Chef Vietnam on VTV3, against thousands of entrants nationwide."
 ],
 "bio.13": [
  "Sống và làm việc tại Budapest, Hungary. Thành lập công ty Le-Ng, chuyên cung cấp giải pháp ẩm thực và set up nhà hàng, quán ăn tại châu Âu.",
  "Based in Budapest, Hungary. Founded Le-Ng, providing culinary solutions and restaurant set-up across Europe."
 ],
 "bio.14": [
  "Giải thưởng Đầu bếp Bạc do hiệp hội đầu bếp quốc tế Best Gastronomie tại Pháp trao tặng.",
  "Silver Chef award from the international Best Gastronomie association in France."
 ],
 "bio.15": [
  "Danh hiệu Master Chef, hạng mục World’s Master Chef của International Business Alliances tại Singapore.",
  "Named Master Chef in the World’s Master Chef category by International Business Alliances in Singapore."
 ],
 "bio.16": [
  "Tham gia Siêu Bếp trên HTV7 khung giờ vàng. Ba tập đối đầu ba đầu bếp chuyên nghiệp với ba sở trường khác nhau: thắng 2, hoà 1.",
  "Appeared on Siêu Bếp in HTV7’s prime slot, facing three professional chefs across three episodes: two wins, one draw."
 ],
 "role.t1": [
  "Phó chủ tịch — đại diện Việt Nam",
  "Vice President — Vietnam representative"
 ],
 "role.d1": [
  "Chefs Sans Frontières (CSFint), hiệp hội đầu bếp không biên giới quốc tế do đầu bếp người Anh Alan Coxon sáng lập.",
  "Chefs Sans Frontières (CSFint), the international chefs-without-borders association founded by British chef Alan Coxon."
 ],
 "role.t2": [
  "Sáng lập và điều hành",
  "Founder and director"
 ],
 "role.d2": [
  "Viet Chefs Worldwide — tổ chức kết nối đầu bếp Việt Nam trên toàn thế giới.",
  "Viet Chefs Worldwide — connecting Vietnamese chefs across the globe."
 ],
 "pgchef.eyebrow": [
  "Hành trình",
  "The path"
 ],
 "pgchef.h": [
  "Nghề bếp học bằng thời gian,<br>không học bằng lối tắt.",
  "This trade is learned in years,<br>not in shortcuts."
 ],
 "pgcui.eyebrow": [
  "Ẩm thực",
  "Cuisine"
 ],
 "pgcui.h": [
  "Món ăn là bằng chứng,<br>không phải thực đơn.",
  "The dishes are evidence,<br>not a menu."
 ],
 "pgcui.lead": [
  "Bốn món, bốn vùng đất. Chạm vào từng món để đọc câu chuyện Chef Minh viết cho nó.",
  "Four dishes, four places. Tap any of them to read the story Chef Minh wrote for it."
 ],
 "sv.consulting1": [
  "Phát triển thực đơn",
  "Menu development"
 ],
 "sv.consulting2": [
  "Setup bếp và nhà hàng",
  "Kitchen and restaurant setup"
 ],
 "sv.consulting3": [
  "Vận hành và huấn luyện đội bếp",
  "Operations and team training"
 ],
 "sv.consulting4": [
  "Chuẩn hoá công thức và định lượng",
  "Standardised recipes and portioning"
 ],
 "sv.consulting5": [
  "Kiểm soát chi phí nguyên liệu",
  "Ingredient cost control"
 ],
 "sv.consulting6": [
  "Giải pháp khắc phục để tối ưu vận hành nhà bếp",
  "Fixes to optimise kitchen operations"
 ],
 "sv.consulting.t": [
  "Tư vấn",
  "Consulting"
 ],
 "sv.consulting.d": [
  "Dựng bếp, dựng thực đơn, dựng cách vận hành.",
  "Building the kitchen, the menu and the way it runs."
 ],
 "sv.consulting.c": [
  "Trao đổi về nhà hàng của bạn",
  "Talk about your restaurant"
 ],
 "sv.experiences1": [
  "Private Chef tại nhà",
  "Private Chef at home"
 ],
 "sv.experiences2": [
  "Private Dining",
  "Private Dining"
 ],
 "sv.experiences3": [
  "Sự kiện riêng và tiệc VIP",
  "Private events and VIP dinners"
 ],
 "sv.experiences.t": [
  "Trải nghiệm",
  "Experiences"
 ],
 "sv.experiences.d": [
  "Cá nhân hoá bữa tiệc của bạn bằng cách cộng tác với Chef Minh Nguyễn trong những dịch vụ dưới đây.",
  "Personalise your event by working with Chef Minh Nguyễn through the services below."
 ],
 "sv.experiences.c": [
  "Đặt trải nghiệm",
  "Book an experience"
 ],
 "sv.brand1": [
  "Hợp tác quảng bá cùng nhãn hàng",
  "Brand promotion partnerships"
 ],
 "sv.brand2": [
  "KOL ngành ẩm thực",
  "Food-industry KOL"
 ],
 "sv.brand3": [
  "Sản xuất video, hình ảnh quảng bá sản phẩm",
  "Product video and photo production"
 ],
 "sv.brand4": [
  "Biểu diễn ẩm thực quảng bá",
  "Live culinary demonstrations"
 ],
 "sv.brand.t": [
  "Thương hiệu",
  "Brand"
 ],
 "sv.brand.d": [
  "Đồng hành cùng các nhãn hàng bằng chuyên môn lâu năm và cả hình ảnh thực tế.",
  "Working with brands through long experience and real presence."
 ],
 "sv.brand.c": [
  "Nhận hồ sơ năng lực",
  "Request the profile"
 ],
 "sv.aca.t": [
  "Đào tạo",
  "Education"
 ],
 "sv.aca.h": [
  "Trụ thứ tư có trang riêng.",
  "The fourth pillar has its own page."
 ],
 "sv.aca.l": [
  "Ba khoá học, lịch khai giảng và cách đăng ký nằm ở trang Academy.",
  "Three courses, intake dates and how to register are on the Academy page."
 ],
 "pgsv.eyebrow": [
  "Dịch vụ",
  "Services"
 ],
 "pgsv.h": [
  "Bốn cách để làm việc<br>cùng Chef Minh.",
  "Four ways to work<br>with Chef Minh."
 ],
 "pgaca.eyebrow": [
  "Academy",
  "Academy"
 ],
 "pgaca.h": [
  "Học cùng Chef Minh.",
  "Learn with Chef Minh."
 ],
 "pgaca.lead": [
  "Lớp giới hạn số người để mỗi học viên đều được đứng bếp thật.",
  "Class sizes are capped so everyone actually cooks."
 ],
 "aca.c1a3": [
  "Muốn vận hành bếp không lệ thuộc vào nhân sự",
  "You want a kitchen that does not depend on one hire"
 ],
 "aca.c3a3": [
  "Thuật ngữ chuyên ngành và tư duy sáng tạo món ăn",
  "Industry terminology and creative thinking"
 ],
 "tru.press": [
  "Báo chí",
  "Press"
 ],
 "tru.pressh": [
  "Bài viết về Chef Minh.",
  "Articles about Chef Minh."
 ],
 "tru.vid": [
  "Video",
  "Video"
 ],
 "tru.vidh": [
  "Xem Chef Minh làm nghề.",
  "Watch Chef Minh at work."
 ],
 "tru.img": [
  "Hình ảnh & sự kiện",
  "Photos & events"
 ],
 "tru.imgh": [
  "Những nơi đã đi qua.",
  "Places along the way."
 ],
 "tru.aw": [
  "Thành tích",
  "Achievements"
 ],
 "pgpress.eyebrow": [
  "Truyền thông &amp; thành tích",
  "Press &amp; credentials"
 ],
 "pgpress.h": [
  "Nơi Chef Minh<br>đã xuất hiện.",
  "Where Chef Minh<br>has appeared."
 ],
 "art.t4": [
  "Đánh bại thách thức, xây dựng sự nghiệp đầu bếp quốc tế",
  "Beating the odds, building an international cooking career"
 ],
 "art.s4": [
  "Chân dung hành trình từ những quán ăn nhỏ tới vị trí bếp trưởng tại châu Âu, và góc nhìn về đưa ẩm thực Việt ra thế giới.",
  "From small eateries to head chef in Europe, and a view on taking Vietnamese food to the world."
 ],
 "art.t5": [
  "Vượt qua nghịch cảnh, trở thành đầu bếp vươn tầm quốc tế",
  "Through hardship to an international kitchen career"
 ],
 "art.s5": [
  "Bếp phó tại Việt Nam năm 18 tuổi, bếp trưởng tại châu Âu năm 20 tuổi, và kế hoạch dẫn dắt thế hệ đầu bếp trẻ.",
  "Sous chef in Vietnam at eighteen, head chef in Europe at twenty, and a plan to bring young Vietnamese cooks with him."
 ],
 "art.t6": [
  "Top Chef Việt Nam 2023 — mùa giải Chef Minh vào Top 4",
  "Top Chef Vietnam 2023 — the season Chef Minh reached the Top 4"
 ],
 "art.s6": [
  "Bài giới thiệu mùa giải và ban giám khảo của Top Chef Việt Nam 2023, sân chơi Chef Minh Nguyễn tranh tài.",
  "A preview of the season and judging panel of Top Chef Vietnam 2023, the contest Chef Minh Nguyễn competed in."
 ],
 "md.c1": [
  "Truyền hình",
  "Television"
 ],
 "md.t1": [
  "Top Chef Vietnam 2023",
  "Top Chef Vietnam 2023"
 ],
 "md.d1": [
  "Chef Minh Nguyễn vào tới Top 4 của mùa giải.",
  "Chef Minh Nguyễn reached the Top 4 of the season."
 ],
 "md.c2": [
  "Giải thưởng",
  "Award"
 ],
 "md.t2": [
  "Best Master Chef Awards 2024",
  "Best Master Chef Awards 2024"
 ],
 "md.d2": [
  "Chứng nhận trao cho Nguyen Thai Minh, tháng 9/2024.",
  "Certificate awarded to Nguyen Thai Minh, September 2024."
 ],
 "md.c3": [
  "Truyền hình",
  "Television"
 ],
 "md.t3": [
  "Siêu Bếp — HTV7",
  "Siêu Bếp — HTV7"
 ],
 "md.d3": [
  "Tham gia chương trình Siêu Bếp do TVHub sản xuất.",
  "Appearing on Siêu Bếp, produced by TVHub."
 ],
 "md.c4": [
  "Truyền hình",
  "Television"
 ],
 "md.t4": [
  "Siêu Bếp — phần thi",
  "Siêu Bếp — the challenge"
 ],
 "md.d4": [
  "Một phần thi trong chương trình Siêu Bếp.",
  "A challenge round on Siêu Bếp."
 ],
 "md.c5": [
  "Sự kiện",
  "Event"
 ],
 "md.t5": [
  "DigiCook — Cặp đôi hoàn hảo Amway Queen",
  "DigiCook — Amway Queen"
 ],
 "md.d5": [
  "Đồng hành cùng người chơi trong suốt chương trình.",
  "Working alongside contestants through the show."
 ],
 "md.c6": [
  "Hợp tác",
  "Partnership"
 ],
 "md.t6": [
  "One River",
  "One River"
 ],
 "md.d6": [
  "[CẦN XÁC NHẬN nội dung hợp tác]",
  "[TO BE CONFIRMED]"
 ],
 "pgblg.eyebrow": [
  "Kiến thức bếp",
  "Kitchen knowledge"
 ],
 "pgblg.h": [
  "Kiến thức bếp,<br>viết cho người muốn hiểu.",
  "Kitchen knowledge,<br>written for people who want to understand."
 ],
 "pgblg.lead": [
  "Kỹ thuật, nguyên liệu Việt và cách nấu — giải thích bằng ngôn ngữ của người đứng bếp.",
  "Technique, Vietnamese ingredients and how to cook them — explained by someone at the stove."
 ]
};


/* ===== js/main.js ===== */
/* ============================================================
   CHEF MINH NGUYỄN — script dùng chung cho mọi trang
   ============================================================ */
(function(){
'use strict';
/* ------------------------------------------------------------
   NƠI NHẬN THÔNG TIN TỪ FORM ĐĂNG KÝ
   ------------------------------------------------------------
   Để trống  → nút "Gửi thông tin" mở ứng dụng email của khách
               (chạy được ngay, nhưng nhiều khách sẽ rớt giữa chừng).
   Điền vào  → thông tin đi thẳng về hộp thư thaiminhchef@gmail.com.
   Cách lấy mã (Web3Forms, miễn phí, không giới hạn):
     1. Vào https://web3forms.com
     2. Nhập thaiminhchef@gmail.com, bấm "Create Access Key"
     3. Mở email, copy Access Key
     4. Dán vào giữa hai dấu nháy bên dưới. Xong.
   ------------------------------------------------------------ */
var FORM_ENDPOINT = 'https://api.web3forms.com/submit';
var FORM_ACCESS_KEY = '';          // ← dán Access Key vào đây
var FALLBACK_EMAIL  = 'thaiminhchef@gmail.com';
var LOCAL_PHP       = 'lien-he.php';   // dùng khi chạy thử trên XAMPP
var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var DICT = {
    'nav.blog':['Blog','Blog'],
    'blg.eyebrow':['Blog','Blog'],
    'blg.h':['Kiến thức bếp,<br>viết cho người muốn hiểu.','Kitchen knowledge,<br>written for people who want to understand.'],
    'blg.lead':['Kỹ thuật, nguyên liệu Việt và cách nấu — giải thích bằng ngôn ngữ của người đứng bếp.','Technique, Vietnamese ingredients and how to cook them — explained by someone who stands at the stove.'],
    'con.direct':['Liên hệ trực tiếp','Direct contact'],
    'con.web':['Website','Website'],
    'con.hours':['Chef và cộng sự phản hồi trong 24–48 giờ làm việc. Nếu gấp, gọi hoặc nhắn Zalo sẽ nhanh hơn.','Chef Minh and his team reply within 24–48 working hours. For anything urgent, a call or Zalo message is faster.'],
    'f.need':['Bạn cần gì?','What do you need?'],
    'f.need0':['— Chọn nội dung —','— Select —'],
    'f.zalo':['Zalo (nếu có)','Zalo (optional)'],
    'aca.badge1':['Khai giảng liên tục','Rolling intake'],
    'aca.badge3':['Khai giảng hằng tháng','Monthly intake'],
    'aca.more':['Xem chi tiết & đăng ký','See details & register'],
    'blg.readmore':['Đọc bài','Read'],
    'con.send':['Gửi thông tin','Send'],
    'nav.press':['Truyền thông','Press'],
    'hero.sound':['Đang tắt tiếng','Sound off'],
    'craft.cta2':['Đọc tiểu sử đầy đủ','Read the full biography'],
    'craft.cta':['Xem trang hành trình','Go to the full path'],
    'chef.intro':['Bắt đầu từ căn bếp nhà hàng của gia đình ở Nhà Bè năm mười bốn tuổi, đi qua Thái Lan, Đan Mạch, Đức và Hungary, rồi quay về Đồng Văn để tìm lại nguyên liệu Việt. Dưới đây là các mốc có thật, theo đúng thứ tự chúng đã xảy ra.','It started in the family restaurant kitchen in Nhà Bè at fourteen, went through Thailand, Denmark, Germany and Hungary, then returned to Đồng Văn to find Vietnamese ingredients again. Below are the real milestones, in the order they happened.'],
    'craft.s1s':['Top Chef Việt Nam 2023 · VTV3','Top Chef Vietnam 2023 · VTV3'],
    'craft.s2s':['World’s Master Chef 2024 · Singapore','World’s Master Chef 2024 · Singapore'],
    'craft.s3s':['Đầu bếp Việt Nam Tài năng 2015 & 2022','Vietnam Talented Chef 2015 & 2022'],
    'hero.cap':['Top Chef Việt Nam 2023 · Top 4','Top Chef Vietnam 2023 · Top 4'],
    'med.y':['15+ năm','15+ years'],
    'med.g':['Đầu bếp Việt Nam Tài năng 2022 · U.S. Beef','Vietnam Talented Chef 2022 · U.S. Beef'],
    'med.s':['Đầu bếp trẻ Việt Nam Tài năng 2015','Young Talented Chef 2015'],
    'med.b':['Đầu bếp Việt Nam Tài năng 2015','Vietnam Talented Chef 2015'],
    'med.t':['Top 4','Top 4'],
    'med.t2':['Top Chef Việt Nam 2023','Top Chef Vietnam 2023'],
    'med.m':['Master Chef','Master Chef'],
    'med.m2':['Singapore 2024','Singapore 2024'],
    'phil.quote2':['“Giữ hồn Việt trong từng nguyên liệu, dùng kỹ thuật hiện đại để đưa giá trị ấy đối thoại với thế giới.”','“Keeping the Vietnamese soul in every ingredient, and using modern technique to let it speak to the world.”'],
    'chef.tl':['Các mốc','Milestones'],
    'chef.tlh':['Từng chặng một.','One stage at a time.'],
    'cui.cta2':['Xem trang ẩm thực','Go to the cuisine page'],
    'aca.all':['Xem trang Academy','Go to the Academy page'],
    'tru.eyebrow':['Truyền thông & thành tích','Press & credentials'],
    'tru.h':['Nơi Chef Minh<br>đã xuất hiện.','Where Chef Minh<br>has appeared.'],
    'tru.press':['Báo chí','Press'],
    'tru.pressh':['Bài viết về Chef Minh.','Articles about Chef Minh.'],
    'tru.vid':['Video','Video'],
    'tru.vidh':['Xem Chef Minh làm nghề.','Watch Chef Minh at work.'],
    'tru.imgh':['Những nơi đã đi qua.','Places along the way.'],
    'tru.aw':['Thành tích','Achievements'],
    'aw.k1':['Truyền hình','Television'],'aw.k2':['Giải thưởng','Award'],'aw.k3':['Huy chương','Medal'],
    'aw.1':['Top 4 — Top Chef Việt Nam, VTV3','Top 4 — Top Chef Vietnam, VTV3'],
    'aw.2':['Master Chef — World’s Master Chef, International Business Alliances, Singapore','Master Chef — World’s Master Chef, International Business Alliances, Singapore'],
    'aw.3':['Đầu bếp Bạc — Best Gastronomie, Pháp','Silver Chef — Best Gastronomie, France'],
    'aw.4':['Huy chương vàng — Đầu bếp Việt Nam Tài năng, hạng mục U.S. Beef','Gold — Vietnam Talented Chef, U.S. Beef category'],
    'aw.5':['Huy chương bạc — Đầu bếp trẻ Việt Nam Tài năng','Silver — Young Talented Chef Vietnam'],
    'aw.6':['Huy chương đồng — Đầu bếp Việt Nam Tài năng','Bronze — Vietnam Talented Chef'],
    'tru.img':['Hình ảnh & sự kiện','Photos & events'],
    'tru.all':['Xem tất cả','See all'],
    'blg.all':['Xem tất cả bài viết','See all articles'],
    'nav.chef':['Chef','The Chef'],
    'nav.cuisine':['Ẩm thực','Cuisine'],
    'nav.services':['Dịch vụ','Services'],
    'nav.academy':['Academy','Academy'],
    'nav.contact':['Liên hệ','Contact'],
    'nav.cta':['Làm việc cùng Chef','Work with Chef Minh'],
    'hero.role':['Tư vấn ẩm thực · Đào tạo · Private Chef','Culinary Consultant · Educator · Private Chef'],
    'hero.sub':['Hơn mười lăm năm trong bếp. Ẩm thực dần được chuyển mình bằng những kỹ thuật hiện đại, những câu chuyện về nguyên liệu, cùng các giá trị truyền thống — cho nhà hàng, cho người học nghề, và cho đến những bữa tiệc sang trọng.','More than fifteen years in the kitchen. Cooking shifted by modern technique, by the stories behind each ingredient, and by traditional values — for restaurants, for people learning the trade, and for the finest tables.'],
    'hero.cta1':['Xem hành trình','See the work'],
    'hero.cta2':['Làm việc cùng Chef','Work with Chef Minh'],
    'craft.eyebrow':['Hành trình','The path'],
    'craft.label':['Năm theo nghề','Years of craft'],
    'craft.h':['Nghề bếp học bằng thời gian,<br>không học bằng lối tắt.','This trade is learned in years,<br>not in shortcuts.'],
    'craft.lead':['Chef Minh Nguyễn hiện nổi bật với vai trò Nhà sáng lập kiêm CEO của cộng đồng Vietchefs Worldwide (VCW) và gia nhập hiệp hội International Chefs Sans Frontières (CSFint). Anh đã tranh tài tại <a href=\"https://www.facebook.com/Minhnguyensg0110/\" target=\"_blank\" rel=\"noopener\">Top Chef Việt Nam 2023</a> và Siêu Bếp 2025, đẩy mạnh các giá trị cốt lõi của ẩm thực Việt Nam trước thềm APEC 2027, lan toả văn hoá ẩm thực thuần vị và kết nối thị trường.','Chef Minh Nguyễn is Founder and CEO of the Vietchefs Worldwide (VCW) community and a member of International Chefs Sans Frontières (CSFint). He competed at <a href=\"https://www.facebook.com/Minhnguyensg0110/\" target=\"_blank\" rel=\"noopener\">Top Chef Vietnam 2023</a> and Siêu Bếp 2025, pushing the core values of Vietnamese cuisine ahead of APEC 2027.'],

    'cui.eyebrow':['Ẩm thực','Cuisine'],
    'cui.h':['Món ăn là bằng chứng,<br>không phải thực đơn.','The dishes are evidence,<br>not a menu.'],
    'cui.lead':['Năm món, năm vùng đất. Chạm vào từng món để đọc câu chuyện Chef Minh viết cho nó.','Five dishes, five places. Tap any of them to read the story Chef Minh wrote for it.'],
    'cui.d1n':['Gỏi tôm sú','Tiger prawn salad'],
    'cui.d1s':['Tôm sú biển tái húng quế · sốt nước mắm đậu phộng · bọt trái giác','Seared prawn with Thai basil · peanut fish-sauce dressing · wild grape foam'],
    'cui.d2n':['Nọng heo đen vùng cao nướng muối ớt','Highland black pork jowl, chilli-salt grilled'],
    'cui.d2s':['Sous-vide · rau củ ủ bơ · sốt mù tạc mật ong bạc hà','Sous-vide · butter-braised vegetables · mustard and mint-honey sauce'],
    'cui.d3n':['Cá tuyết Na Uy dry-aged áp chảo','Pan-seared dry-aged Norwegian cod'],
    'cui.d3s':['Tỏi đen Lý Sơn · tiêu Phú Quốc · bánh phồng tôm','Lý Sơn black garlic · Phú Quốc pepper · prawn cracker'],
    'cui.d4n':['Gà đen H’Mông cuộn bắp non nướng xông gỗ quế','H’Mông black chicken rolled with young corn, cinnamon-wood smoked'],
    'cui.d4s':['Sốt chẩm chéo hạt dổi · măng rừng nướng · nếp nương hấp lá dứa','Chẩm chéo with dổi seed · grilled wild bamboo · pandan-steamed upland rice'],
    'cui.more':['Đọc câu chuyện','Read the story'],
    'pil.p1d':['Đào tạo học viên online từ xa','Remote online training'],
    'pil.p1e':['Chuyển giao công thức sốt các loại','Sauce recipe transfer'],
    'pil.p2d':['Biểu diễn ẩm thực quảng bá','Live culinary demonstrations'],
    'pil.p3d':['Giải pháp khắc phục để tối ưu vận hành nhà bếp','Fixes to optimise kitchen operations'],
    'phil.quote':['“Ẩm thực Việt không chỉ là món ăn, mà là câu chuyện về văn hóa, con người và vùng đất.”','“Vietnamese cuisine is never only about the food. It carries the story of a culture, its people, and the land they come from.”'],
    'phil.attr':['Chef Minh Nguyễn','Chef Minh Nguyễn'],
    'phil.t1':['Văn hóa','Culture'],
    'phil.t2':['Con người','People'],
    'phil.t3':['Vùng đất','Land'],
    'pil.eyebrow':['Dịch vụ','Services'],
    'pil.h':['Bốn cách để làm việc<br>cùng Chef Minh.','Four ways to work<br>with Chef Minh.'],
    'pil.focus':['Đang mở rộng','Growing'],
    'pil.p1h':['Đào tạo','Education'],
    'pil.p1s':['Dạy nghề bếp cho người muốn đi đường dài, không dạy mẹo.','Teaching the trade to people in it for the long run — not kitchen tricks.'],
    'pil.p1a':['Khai giảng liên tục các khoá 1 kèm 1 VIP','Rolling one-to-one VIP courses'],
    'pil.p1b':['Thiết kế menu cá nhân hoá','Personalised menu design'],
    'pil.p1c':['Lớp chuyên đề món Việt – Âu trong ngày','One-day Vietnamese–European workshops'],
    'pil.p1cta':['Xem các khóa học <span class="ar">→</span>','See the courses <span class="ar">→</span>'],
    'pil.p2h':['Thương hiệu','Brand'],
    'pil.p2s':['Đồng hành cùng các nhãn hàng bằng chuyên môn lâu năm và cả hình ảnh thực tế.','Working with brands through long experience and real presence, not just a face.'],
    'pil.p2a':['Hợp tác quảng bá cùng nhãn hàng','Brand promotion partnerships'],
    'pil.p2b':['KOL ngành ẩm thực','Food-industry KOL'],
    'pil.p2c':['Sản xuất video, hình ảnh quảng bá sản phẩm','Product video and photo production'],
    'pil.p2cta':['Xem hồ sơ hợp tác <span class="ar">→</span>','See the partnership profile <span class="ar">→</span>'],
    'pil.p3h':['Tư vấn','Consulting'],
    'pil.p3s':['Dựng bếp, dựng thực đơn, dựng cách vận hành.','Building the kitchen, the menu, and the way it runs.'],
    'pil.p3a':['Phát triển thực đơn','Menu development'],
    'pil.p3b':['Setup bếp và nhà hàng','Kitchen and restaurant setup'],
    'pil.p3c':['Vận hành và huấn luyện đội bếp','Operations and team training'],
    'pil.p3cta':['Trao đổi về nhà hàng <span class="ar">→</span>','Talk about your restaurant <span class="ar">→</span>'],
    'pil.p4h':['Trải nghiệm','Experiences'],
    'pil.p4s':['Cá nhân hoá bữa tiệc của bạn bằng cách cộng tác với Chef Minh Nguyễn trong những dịch vụ dưới đây.','Personalise your event by working with Chef Minh Nguyễn through the services below.'],
    'pil.p4a':['Private Chef','Private Chef'],
    'pil.p4b':['Private Dining','Private Dining'],
    'pil.p4c':['Sự kiện riêng','Private events'],
    'pil.p4cta':['Đặt trải nghiệm <span class="ar">→</span>','Book an experience <span class="ar">→</span>'],
    'aca.eyebrow':['Academy','Academy'],
    'aca.h':['Học cùng Chef Minh.','Learn with Chef Minh.'],
    'aca.lead':['Lớp giới hạn số người để mỗi học viên đều được đứng bếp thật.','Class sizes are capped so everyone actually cooks.'],
    'tru.kith':['Dành cho nhãn hàng và đối tác','For brands and partners'],
    'tru.kits':['Hồ sơ năng lực đầy đủ: kinh nghiệm, số liệu độ phủ, các chiến dịch đã thực hiện và hình thức hợp tác.','The full profile: experience, reach figures, past campaigns, and how a partnership works.'],
    'tru.kitcta':['Nhận hồ sơ năng lực','Request the profile'],
    'con.h':['Bắt đầu từ<br>việc của bạn.','Start with<br>what you need.'],
    'con.lead':['Chọn đúng nhu cầu để câu hỏi phía sau đi thẳng vào việc.','Pick the right one and the questions that follow get straight to the point.'],
    'con.r1':['Tôi muốn học','I want to learn'],
    'con.r2':['Tôi đại diện một thương hiệu','I represent a brand'],
    'con.r3':['Tôi có nhà hàng','I run a restaurant'],
    'con.r4':['Tôi muốn đặt trải nghiệm','I want to book a dinner'],
    'con.email':['Email','Email'],
    'con.tel':['Điện thoại','Phone'],
    'f.name':['Họ và tên','Full name'],
    'f.phone':['Số điện thoại','Phone'],
    'f.email':['Email','Email'],
    'f.course':['Khóa quan tâm','Course of interest'],
    'f.level':['Trình độ hiện tại','Current level'],
    'f.lv1':['Chưa có kinh nghiệm','No experience yet'],
    'f.lv2':['Đang làm bếp','Working in a kitchen'],
    'f.lv3':['Đã làm nhiều năm','Several years in'],
    'f.brand':['Tên thương hiệu','Brand name'],
    'f.camp':['Hình thức hợp tác','Type of partnership'],
    'f.cp1':['Chiến dịch truyền thông','Media campaign'],
    'f.cp2':['Nội dung ẩm thực','Culinary content'],
    'f.cp3':['Sự kiện','Event'],
    'f.cp4':['Đại sứ dài hạn','Long-term ambassador'],
    'f.type':['Loại hình','Type of venue'],
    'f.stage':['Giai đoạn','Stage'],
    'f.st1':['Chuẩn bị mở mới','Opening soon'],
    'f.st2':['Đang vận hành, cần cải tổ','Operating, needs a reset'],
    'f.st3':['Mở rộng thêm chi nhánh','Expanding'],
    'f.guests':['Số khách','Number of guests'],
    'f.date':['Ngày mong muốn','Preferred date'],
    'f.msg':['Nội dung','Message'],
    'f.send':['Gửi thông tin','Send'],
    'ft.tag':['Ẩm thực Việt, đọc lại bằng kỹ thuật hiện đại.','Vietnamese cooking, read through modern technique.'],
    'ft.h1':['Chef','The Chef'],
    'ft.h2':['Dịch vụ','Services'],
    'ft.h3':['Liên hệ','Contact'],
    'ft.l1':['Hành trình','The path'],
    'ft.l2':['Triết lý','Philosophy'],
    'ft.l3':['Ẩm thực','Cuisine'],
    'ft.l4':['Đào tạo','Education'],
    'ft.l5':['Thương hiệu','Brand'],
    'ft.l6':['Tư vấn','Consulting'],
    'ft.l7':['Trải nghiệm','Experiences'],
    'ft.l8':['Gửi yêu cầu','Send an enquiry'],
    'ft.rights':['Bảo lưu mọi quyền.','All rights reserved.'],
    'ft.by':['Thiết kế','Design'],
  };
/* ============================ SONG NGỮ ============================ */
var lang = 0; // 0 = VI, 1 = EN
try{ if(localStorage.getItem('cmn-lang') === 'en') lang = 1; }catch(e){}
/* Nạp từ điển sinh tự động cho các trang con */
if(window.CMN_I18N){ for(var k in window.CMN_I18N){ DICT[k] = window.CMN_I18N[k]; } }

function applyLang(){
  document.querySelectorAll('[data-i18n]').forEach(function(el){
    var v = DICT[el.getAttribute('data-i18n')];
    if(v && v[lang] != null) el.innerHTML = v[lang];
  });
  document.documentElement.lang = lang ? 'en' : 'vi';
  document.querySelectorAll('[data-lang]').forEach(function(b){
    b.setAttribute('aria-pressed', (b.dataset.lang === (lang ? 'en' : 'vi')) ? 'true' : 'false');
  });
  var note = document.getElementById('en-note');
  if(note) note.hidden = (lang === 0);
  document.dispatchEvent(new CustomEvent('langapplied'));
}
document.querySelectorAll('[data-lang]').forEach(function(b){
  b.addEventListener('click', function(){
    lang = (b.dataset.lang === 'en') ? 1 : 0;
    try{ localStorage.setItem('cmn-lang', lang ? 'en' : 'vi'); }catch(e){}
    applyLang();
    var mo = document.getElementById('modal');
    if(mo && mo.classList.contains('is-open') && mo.dataset.dish) openDish(mo.dataset.dish);
    startType(true);
  });
});
/* ============================ HEADER ============================ */
var hdr = document.getElementById('hdr');
if(hdr){
  var onScroll = function(){ hdr.classList.toggle('is-stuck', window.scrollY > 40); };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
  if('IntersectionObserver' in window){
    var lightHits = new Set();
    var navObs = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting) lightHits.add(en.target); else lightHits.delete(en.target);
      });
      hdr.classList.toggle('on-light', lightHits.size > 0 && !document.body.classList.contains('menu-open'));
    }, { rootMargin: '-1px 0px -100% 0px' });
    document.querySelectorAll('[data-nav="light"]').forEach(function(s){ navObs.observe(s); });
  }
}
var burger = document.getElementById('burger');
var mmenu = document.getElementById('mmenu');
function closeMenu(){
  document.body.classList.remove('menu-open');
  document.body.style.overflow = '';
  if(burger){ burger.setAttribute('aria-expanded','false'); burger.setAttribute('aria-label','Mở menu'); }
}
if(burger && mmenu){
  burger.addEventListener('click', function(){
    var open = document.body.classList.toggle('menu-open');
    document.body.style.overflow = open ? 'hidden' : '';
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
    if(open && hdr) hdr.classList.remove('on-light');
  });
  mmenu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });
}
document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeMenu(); });
/* ============================ HIỆN DẦN KHI CUỘN ============================ */
if('IntersectionObserver' in window && !reduce){
  var revObs = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add('in'); revObs.unobserve(en.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.reveal').forEach(function(el){ revObs.observe(el); });
} else {
  document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
}
/* ============================ ĐẾM SỐ 15 ============================ */
var counter = document.getElementById('counter');
if(counter && 'IntersectionObserver' in window && !reduce){
  var cObs = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(!en.isIntersecting) return;
      var t0 = null;
      function step(ts){
        if(!t0) t0 = ts;
        var p = Math.min((ts - t0) / 1100, 1);
        counter.textContent = Math.round(15 * (1 - Math.pow(1 - p, 3)));
        if(p < 1) requestAnimationFrame(step); else counter.textContent = 15;
      }
      requestAnimationFrame(step);
      cObs.disconnect();
    });
  }, { threshold: 0.5 });
  cObs.observe(counter);
}
/* ============================ HERO: VIDEO NỀN ============================ */
var vid = document.getElementById('hero-video');
var sndBtn = document.getElementById('sound-btn');
if(vid){
  /* Trình duyệt CHẶN video tự chạy nếu có tiếng, nên luôn khởi động
     ở chế độ tắt tiếng. Khách tự bật bằng nút góc dưới phải. */
  vid.muted = true;
  vid.defaultMuted = true;
  vid.setAttribute('muted', '');
  vid.playsInline = true;

  var tries = 0;
  function tryPlay(){
    if(!vid.paused) return;
    var p = vid.play();
    if(p && p.catch) p.catch(function(){});
  }

  /* Thử phát ở nhiều thời điểm: một số trình duyệt chỉ cho phép
     sau khi đã có đủ dữ liệu, hoặc sau thao tác đầu tiên của khách. */
  ['loadeddata','canplay','canplaythrough'].forEach(function(ev){
    vid.addEventListener(ev, tryPlay, { once:false });
  });
  vid.addEventListener('stalled', tryPlay);
  vid.addEventListener('pause', function(){
    /* Nếu bị dừng ngoài ý muốn thì chạy lại, tối đa 5 lần */
    if(tries++ < 5 && !document.hidden) setTimeout(tryPlay, 220);
  });
  document.addEventListener('visibilitychange', function(){
    if(!document.hidden) tryPlay();
  });
  ['pointerdown','keydown','touchstart','wheel'].forEach(function(ev){
    window.addEventListener(ev, tryPlay, { once:true, passive:true });
  });
  window.addEventListener('load', tryPlay);
  tryPlay();

  /* Ngoài khung nhìn thì tạm dừng cho đỡ tốn pin */
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(en){
      en.forEach(function(e){
        if(e.isIntersecting) tryPlay();
        else if(!vid.paused) vid.pause();
      });
    }, { threshold:0.05 }).observe(vid);
  }

  if(sndBtn){
    sndBtn.addEventListener('click', function(){
      vid.muted = !vid.muted;
      if(!vid.muted){ vid.volume = 0.55; }
      tryPlay();
      sndBtn.setAttribute('aria-pressed', vid.muted ? 'false' : 'true');
      var lbl = sndBtn.querySelector('span');
      if(lbl) lbl.textContent = vid.muted
        ? (lang ? 'Sound off' : 'Đang tắt tiếng')
        : (lang ? 'Sound on'  : 'Đang bật tiếng');
    });
  }
}

/* ============================ HERO: CHỮ CHẠY TỪNG KÝ TỰ ============================ */
var typeEl = document.querySelector('.type');
var typeTimer = null;
function startType(restart){
  if(!typeEl) return;
  var key = typeEl.getAttribute('data-type-key');
  var full = (DICT[key] && DICT[key][lang]) || typeEl.getAttribute('data-fallback') || '';
  if(typeTimer){ clearInterval(typeTimer); typeTimer = null; }
  typeEl.classList.remove('done');
  if(reduce){ typeEl.textContent = full; typeEl.classList.add('done'); return; }
  typeEl.innerHTML = '<span class="txt"></span><span class="caret"></span>';
  var txt = typeEl.querySelector('.txt');
  var i = 0;
  typeTimer = setInterval(function(){
    i++;
    txt.textContent = full.slice(0, i);
    if(i >= full.length){
      clearInterval(typeTimer); typeTimer = null;
      typeEl.classList.add('done');            /* chạy hết là dừng hẳn */
    }
  }, 28);
}
window.addEventListener('load', function(){
  startType(false);
  var nm = document.querySelector('.hero__name');
  if(nm && !reduce) setTimeout(function(){ nm.classList.add('is-lit'); }, 1100);
});
  var STORIES = {
    '1': {
      idx:'01',
      name:['Gỏi tôm sú biển tái húng quế','Seared tiger prawn with Thai basil'],
      sub:['Sốt nước mắm đậu phộng · form bọt trái giác','Peanut fish-sauce dressing · wild grape foam'],
      img:'assets/mon-01-trai-giac.jpg',
      body:[
        ['Có những hương vị không chỉ nằm trên đầu lưỡi, mà neo lại cả một miền ký ức. Với tôi, đó là trái giác.',
         'Tuổi thơ tôi gắn liền với gia đình, với những buổi chiều quây quần bên nồi canh chua cá nấu trái giác còn nghi ngút khói. Vị chua thanh, hơi chát, mộc mạc mà sâu lắng — như chính vòng tay của cha mẹ, như tiếng cười giản dị của những ngày xưa cũ.',
         'Món này được xây dựng theo tinh thần tươi — chua — nhẹ, lấy trái giác làm điểm nhấn xuyên suốt. Trái giác nấu nhẹ cùng nước mắm và đường, tạo nền vị chua mặn hài hoà. Tôm sú làm tái vừa, giữ độ ngọt tự nhiên, kết hợp cùng húng quế, nấm tuyết, hành tím và đậu phộng.',
         'Ở phần hoàn thiện, lecithin tạo lớp bọt nhẹ giúp hương chua lan nhanh khi chạm lưỡi. Trái giác còn được làm thành kẹo và gel — khoác lên mình một bộ cánh hiện đại hơn.',
         'Với tôi, đó không phải là sự thay đổi, mà là sự tiếp nối. Lấy ký ức làm gốc, lấy nguyên liệu Việt làm linh hồn, rồi dùng kỹ thuật mới để kể lại câu chuyện cũ bằng ngôn ngữ của hiện tại.'],
        ['Some flavours do not stay on the tongue. They anchor a whole stretch of memory. For me that flavour is trái giác, the wild grape of the Mekong Delta.',
         'It belongs to childhood afternoons around a steaming pot of sour fish soup — a clean sourness with a faint bitterness underneath.',
         'The dish is built on three ideas: fresh, sour, light. The fruit is cooked gently with fish sauce and sugar to set a balanced base. The prawn is only lightly cured so its sweetness stays, finished with Thai basil, snow fungus, shallot and peanut.',
         'Lecithin gives a light foam that carries the acidity quickly across the palate. The fruit also appears as candy and as gel — an older flavour in newer clothes.',
         'To me this is not a change of direction but a continuation. Memory as the root, Vietnamese ingredients as the soul, new technique to retell an old story.']
      ],
      spirit:['Tôn trọng quá khứ — sáng tạo cho tương lai — và luôn nấu ăn bằng cả trái tim.',
              'Respect the past — create for the future — and always cook with the whole heart.']
    },
    '2': {
      idx:'02',
      name:['Nọng heo đen Hà Giang sous-vide nướng muối ớt','Hà Giang black pork jowl, sous-vide then chilli-salt grilled'],
      sub:['Rau củ ủ bơ · ớt nướng salsa · sốt mù tạc Pháp mật ong bạc hà','Butter-braised vegetables · grilled chilli salsa · Dijon and mint-honey sauce'],
      img:'assets/mon-02-goi-tom-su.jpg',
      body:[
        ['Món ăn bắt đầu từ nọng heo đen cao nguyên đá Đồng Văn, Hà Giang — phần thịt nằm gần má và cổ, có tỷ lệ nạc và mỡ đan xen đặc biệt. Thịt được sous-vide để kiểm soát chính xác độ chín, sau đó ướp muối ớt và nướng trên lửa, để lớp mỡ tan chậm và tạo lớp cháy cạnh thơm.',
         'Vị mặn và cay được cân bằng bằng sốt mù tạc Pháp, mật ong và bạc hà. Mật ong mang vị ngọt tự nhiên, mù tạc tạo độ cay nhẹ, bạc hà bổ sung một nốt thảo mộc mát, kết nối món ăn vùng cao với kỹ thuật bếp hiện đại.',
         'Rau củ được ủ bơ để giữ màu, độ ngọt và cấu trúc. Phần salsa ớt nướng lấy mùi khói và vị ngọt tự nhiên — nếu nọng heo là phần đậm và béo, salsa là lớp vị tươi sáng làm nhẹ món ăn sau mỗi miếng.'],
        ['The dish begins with black pork jowl from the Đồng Văn stone plateau in Hà Giang — the cut near the cheek and neck, with an unusual weave of lean and fat. It is cooked sous-vide for precise doneness, then cured in chilli salt and finished over fire so the fat renders slowly and the edges char.',
         'The salt and heat are balanced by a sauce of Dijon mustard, honey and mint: honey for natural sweetness, mustard for a light bite, mint for a cool herbal note joining highland cooking to modern technique.',
         'Vegetables are braised in butter to hold their colour, sweetness and structure. A grilled-chilli salsa, charred first for smoke and sweetness, gives the bright lift after each rich bite.']
      ],
      spirit:['Núi rừng gặp kỹ thuật hiện đại — nguyên liệu mộc mạc, tinh thần nguyên bản.',
              'The highlands meeting modern technique — plain ingredients, original spirit.']
    },
    '3': {
      idx:'03',
      name:['Cá tuyết Na Uy dry-aged áp chảo','Pan-seared dry-aged Norwegian cod'],
      sub:['Tỏi đen Lý Sơn · tiêu Phú Quốc · bánh phồng tôm','Lý Sơn black garlic · Phú Quốc pepper · prawn cracker'],
      img:'assets/mon-03-ca-tuyet.jpg',
      alt:'assets/mon-03-ca-tuyet-b.jpg',
      body:[
        ['Món ăn bắt đầu từ cá tuyết Na Uy, một nguyên liệu của vùng biển lạnh Bắc Âu. Cá được dry-aged để giảm độ ẩm, cô đọng vị ngọt tự nhiên và tạo cấu trúc thịt săn chắc hơn, sau đó áp chảo ở nhiệt độ cao để có lớp vỏ vàng thơm nhưng vẫn mềm mọng bên trong.',
         'Từ biển lạnh ấy, câu chuyện dần trở về Việt Nam. Tỏi đen Lý Sơn được dùng trong nước sốt như một điểm nối giữa biển và đất. Qua lên men, vị cay nồng của tỏi chuyển thành vị ngọt sâu, caramel và umami, gợi nhớ vùng đất núi lửa nơi tỏi được trồng.',
         'Puree bắp mang vị ngọt, mềm và béo, được đánh thức bằng tiêu đen Phú Quốc — thứ gia vị mang mùi thơm ấm, cay và một chút hương nhiệt đới. Trứng cá hồi muối tạo những điểm nhấn mặn và tươi của biển.',
         'Nhưng dấu ấn Việt Nam rõ nhất nằm ở những chi tiết tưởng như rất nhỏ: vụn bánh phồng tôm nướng thay cho breadcrumb, mang theo mùi tôm và ký ức của những bữa ăn miền Nam; cùng tuile làm từ xương cá sau khi fillet, tạo nên một lớp giòn đậm vị biển.',
         'Đây không đơn thuần là sự kết hợp giữa nguyên liệu Việt Nam và quốc tế. Đó là câu chuyện về một con cá đi qua nhiều vùng địa lý, nhưng cuối cùng được kể lại bằng ngôn ngữ của Việt Nam.'],
        ['The dish starts with Norwegian cod from the cold North Atlantic, dry-aged to draw out moisture and concentrate its sweetness, then seared hard for a golden crust with a juicy centre.',
         'From that cold sea the story travels back to Vietnam. Lý Sơn black garlic works in the sauce as the join between sea and land: fermentation turns its sharpness into deep caramel sweetness and umami.',
         'Sweetcorn purée brings softness and richness, woken up by Phú Quốc black pepper — warm, spicy, faintly tropical. Salted salmon roe adds bright, saline punctuation.',
         'The clearest Vietnamese marks are the smallest details: toasted prawn-cracker crumb in place of breadcrumb, and a tuile made from the bones left after filleting.',
         'This is not simply Vietnamese ingredients meeting international ones. It is one fish crossing several geographies, finally told in Vietnamese.']
      ],
      spirit:['Biển lạnh Na Uy. Đất núi lửa Lý Sơn. Tiêu Phú Quốc. Bánh phồng tôm miền Nam.',
              'Cold Norwegian sea. Volcanic Lý Sơn soil. Phú Quốc pepper. Southern prawn cracker.']
    },
    '4': {
      idx:'04',
      name:['Gà đen H’Mông cuộn bắp non nướng xông gỗ quế','H’Mông black chicken rolled with young corn, cinnamon-wood smoked'],
      sub:['Sốt chẩm chéo hạt dổi · măng rừng nướng · nếp nương hấp lá dứa','Chẩm chéo with dổi seed · grilled wild bamboo · pandan-steamed upland rice'],
      img:'assets/mon-04-nong-heo.jpg',
      body:[
        ['Món ăn bắt đầu từ gà đen H’Mông, giống gà gắn liền với đời sống và văn hoá ẩm thực của đồng bào vùng cao phía Bắc. Thịt gà săn chắc, thơm và có vị đậm tự nhiên, vì vậy được xử lý tối giản để giữ lại bản chất của nguyên liệu.',
         'Phần thịt được cuộn cùng bắp non, tạo nên sự kết hợp giữa vị đậm và săn của gà với vị ngọt, giòn và tươi của bắp. Cuộn gà sau đó được nướng xông gỗ quế, để khói và tinh dầu quế thấm nhẹ vào bề mặt thịt. Ở đây gỗ quế không chỉ là nhiên liệu mà trở thành một phần của món ăn.',
         'Đi cùng là sốt chẩm chéo hạt dổi, lấy cảm hứng từ gia vị quen thuộc của vùng Tây Bắc. Chẩm chéo được tinh chỉnh để có cấu trúc sốt mượt hơn nhưng vẫn giữ tinh thần nguyên bản: một chút cay, một chút mặn, nhiều hương thơm và hậu vị rất vùng cao.',
         'Măng rừng nướng bổ sung độ đắng nhẹ và mùi khói. Nếp nương hấp lá dứa đóng vai trò phần nền — hấp thụ nước gà và sốt, đồng thời làm dịu vị cay và khói của món chính.',
         'Đây là câu chuyện về một bữa ăn vùng cao được kể lại bằng ngôn ngữ đương đại. Không cố làm vùng cao trở nên sang trọng hơn, mà dùng kỹ thuật hiện đại để làm nổi bật vẻ đẹp vốn có của vùng đất ấy.'],
        ['The dish starts with H’Mông black chicken, a bird bound up with the life and food culture of the northern highlands. The meat is firm, fragrant and naturally deep in flavour, so it is handled minimally.',
         'It is rolled with young corn — the firm, savoury bird against sweet, crisp kernels — then smoked over cinnamon wood so that smoke and cinnamon oil settle lightly on the surface. Here the wood is not just fuel; it becomes part of the dish.',
         'Alongside is a chẩm chéo sauce with dổi seed, drawn from a staple seasoning of the northwest, refined into a smoother sauce while keeping its original spirit.',
         'Grilled wild bamboo shoot adds a light bitterness and smoke. Pandan-steamed upland sticky rice works as the base, absorbing juices and sauce while softening the heat.',
         'This is a highland meal told in a contemporary language — not an attempt to make the highlands look luxurious, but to show what was already beautiful there.']
      ],
      spirit:['Núi cao — Gỗ quế — Nương rẫy — Chẩm chéo — Nếp nương — Ký ức Tây Bắc.',
              'High mountains — cinnamon wood — hill fields — chẩm chéo — sticky rice — memory of the northwest.']
    }
  };
var modal = document.getElementById('modal');
function openDish(id){
  var d = STORIES[id];
  if(!d || !modal) return;
  document.getElementById('modal-hero').innerHTML = d.img ? '<img src="' + d.img + '" alt="">' : '';
  document.getElementById('modal-idx').textContent = d.idx;
  document.getElementById('modal-title').textContent = d.name[lang];
  document.getElementById('modal-sub').textContent = d.sub[lang];
  var html = d.body[lang].map(function(p){ return '<p>' + p + '</p>'; }).join('');
  if(d.spirit) html += '<p class="spirit">' + d.spirit[lang] + '</p>';
  if(lang === 1) html += '<p style="font-size:.8rem;color:var(--gold-dim);margin-top:22px">Draft translation — pending Chef Minh’s approval.</p>';
  document.getElementById('modal-story').innerHTML = html;
  document.getElementById('modal-alt').innerHTML = d.alt ? '<img src="' + d.alt + '" alt="" loading="lazy">' : '';
  modal.dataset.dish = id;
  modal.classList.add('is-open');
  document.body.classList.add('modal-open');
  modal.querySelector('.modal__close').focus();
}
function closeDish(){
  if(!modal) return;
  modal.classList.remove('is-open');
  document.body.classList.remove('modal-open');
}
document.querySelectorAll('.dish').forEach(function(b){
  b.addEventListener('click', function(){ openDish(b.dataset.dish); });
});
if(modal){
  modal.querySelectorAll('[data-close]').forEach(function(el){ el.addEventListener('click', closeDish); });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && modal.classList.contains('is-open')) closeDish();
  });
}
/* ============================ MODAL TIỂU SỬ ============================ */
var bioModal = document.getElementById('bio-modal');
var bioBtn = document.getElementById('open-bio');
if(bioModal){
  function openBio(){
    bioModal.classList.add('is-open');
    document.body.classList.add('modal-open');
    var c = bioModal.querySelector('.modal__close');
    if(c) c.focus();
  }
  function closeBio(){
    bioModal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
  }
  if(bioBtn) bioBtn.addEventListener('click', openBio);
  bioModal.querySelectorAll('[data-close]').forEach(function(el){
    el.addEventListener('click', closeBio);
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && bioModal.classList.contains('is-open')) closeBio();
  });
}

/* ============================ FORM ĐĂNG KÝ ============================ */
var form = document.getElementById('form');
if(form){
  var need = document.getElementById('f-need');
  var chips = document.querySelectorAll('.chip');
  var status = document.getElementById('form-status');
  function setNeed(val){
    if(need) need.value = val;
    chips.forEach(function(c){ c.setAttribute('aria-pressed', c.dataset.route === val ? 'true' : 'false'); });
    document.querySelectorAll('.branch').forEach(function(br){ br.hidden = (br.dataset.branch !== val); });
  }
  chips.forEach(function(c){ c.addEventListener('click', function(){ setNeed(c.dataset.route); }); });
  if(need) need.addEventListener('change', function(){ setNeed(need.value); });
  /* Trang khác dẫn sang kèm ?need=... hoặc #contact?need=... */
  var pre = new URLSearchParams(location.search).get('need');
  if(pre) setNeed(pre);
  /* Liên kết trong cùng trang: đặt sẵn nhu cầu rồi cuộn tới form */
  document.querySelectorAll('[data-need]').forEach(function(a){
    a.addEventListener('click', function(){
      setNeed(a.dataset.need);
      var f = document.getElementById('contact');
      if(f) setTimeout(function(){
        form.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block:'center' });
      }, 320);
    });
  });
  var LABELS = {
    hoc:['Đăng ký học','Course enquiry'],
    brand:['Hợp tác thương hiệu','Brand partnership'],
    nhahang:['Tư vấn nhà hàng','Restaurant consulting'],
    trainghiem:['Đặt trải nghiệm','Private dining booking']
  };
  function collect(){
    var out = {};
    form.querySelectorAll('input, select, textarea').forEach(function(f){
      var wrap = f.closest('.branch');
      if(wrap && wrap.hidden) return;
      if(!f.value) return;
      var fieldEl = f.closest('.field');
      var lab = fieldEl ? fieldEl.querySelector('label') : null;
      out[(lab ? lab.textContent.trim() : f.name || f.id)] = f.value;
    });
    return out;
  }
  function say(msg, ok){
    if(!status) return;
    status.textContent = msg;
    status.style.color = ok ? 'var(--gold)' : 'var(--cinnabar)';
  }
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var name = document.getElementById('f-name');
    var email = document.getElementById('f-email');
    if(!name.value.trim() || !email.value.trim()){
      say(lang ? 'Please enter your name and email.' : 'Vui lòng điền họ tên và email.', false);
      return;
    }
    var cur = need ? need.value : '';
    var subject = (LABELS[cur] ? LABELS[cur][lang] : 'Liên hệ') + ' — ' + name.value.trim();
    var data = collect();
    data.subject = subject;
    data.need = cur;
    var btn = form.querySelector('button[type="submit"]');
    var oldLabel = btn.textContent;
    function toMail(){
      var lines = Object.keys(data).map(function(k){ return k + ': ' + data[k]; });
      window.location.href = 'mailto:' + FALLBACK_EMAIL
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(lines.join('\n'));
      say(lang ? 'Opening your email app…' : 'Đang mở ứng dụng email của bạn…', true);
    }
    /* Mở bằng file:// thì không gửi được, chuyển thẳng sang email */
    if(location.protocol === 'file:'){ toMail(); return; }
    var url, payload;
    if(FORM_ACCESS_KEY){
      /* Đã cấu hình Web3Forms → gửi thẳng về hộp thư Chef */
      url = FORM_ENDPOINT;
      data.access_key = FORM_ACCESS_KEY;
      data.from_name = 'chefminhnguyen.com';
      payload = data;
    } else {
      /* Chưa cấu hình → thử lien-he.php (chạy được trên XAMPP).
         Nếu không có PHP, bước catch bên dưới sẽ chuyển sang email. */
      url = LOCAL_PHP;
      payload = data;
    }
    btn.disabled = true;
    btn.textContent = lang ? 'Sending…' : 'Đang gửi…';
    say('', true);
    fetch(url, {
      method:'POST',
      headers:{ 'Content-Type':'application/json', 'Accept':'application/json' },
      body: JSON.stringify(payload)
    }).then(function(r){
      if(!r.ok) throw new Error('http ' + r.status);
      return r.json();
    }).then(function(res){
      if(res.success){
        form.reset();
        document.querySelectorAll('.branch').forEach(function(b){ b.hidden = true; });
        chips.forEach(function(c){ c.setAttribute('aria-pressed','false'); });
        say(lang
          ? 'Sent. Chef Minh and his team will reply within 24–48 working hours.'
          : 'Đã gửi. Chef và cộng sự sẽ phản hồi trong 24–48 giờ làm việc.', true);
      } else {
        throw new Error(res.message || 'failed');
      }
    }).catch(function(){
      /* Không có PHP và chưa cấu hình Web3Forms → mở ứng dụng email */
      if(!FORM_ACCESS_KEY){ toMail(); return; }
      say(lang ? 'Could not send. Please call or message on Zalo.' : 'Chưa gửi được. Bạn gọi hoặc nhắn Zalo giúp mình nhé.', false);
    }).then(function(){
      btn.disabled = false; btn.textContent = oldLabel;
    });
  });
}
/* ============================ VIDEO YOUTUBE ============================ */
/* Chỉ nạp trình phát khi khách thực sự bấm. Nhúng sẵn 5 iframe sẽ kéo
   về vài MB script của YouTube ngay khi mở trang. */
document.querySelectorAll('.lyt').forEach(function(b){
  b.addEventListener('click', function(){
    if(b.dataset.done) return;
    b.dataset.done = '1';
    var id = b.dataset.yt;
    var cap = b.querySelector('.lyt__cap');
    var title = cap ? cap.textContent : 'Video';
    b.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id +
      '?autoplay=1&rel=0" title="' + title +
      '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture" ' +
      'allowfullscreen></iframe>';
    b.style.cursor = 'default';
  });
});
/* ============================ NÚT VỀ ĐẦU TRANG ============================ */
var toTop = document.getElementById('to-top');
if(toTop){
  toTop.addEventListener('click', function(){
    window.scrollTo({ top:0, behavior: reduce ? 'auto' : 'smooth' });
  });
  var tt = function(){ toTop.classList.toggle('on', window.scrollY > 600); };
  window.addEventListener('scroll', tt, { passive:true }); tt();
}

/* ============================ NĂM HIỆN TẠI ============================ */
document.querySelectorAll('#yr').forEach(function(el){ el.textContent = new Date().getFullYear(); });
applyLang();
})();

/* ===== js/motion.js ===== */
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


/* ===== js/sponsor.js ===== */
/* ============================================================
   QUẢNG CÁO — thẻ dọc 160×600 trên desktop, banner ngang trên mobile
   SỬA NỘI DUNG NGAY BÊN DƯỚI. Song ngữ: ['Tiếng Việt','English']
   ============================================================ */
(function(){
'use strict';

var ADS = [
  {
    side:'left',
    imgs:['assets/trip-tour-v.jpg'],
    imgH:'assets/trip-tour-h.jpg',
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
    imgs:['assets/shop-lapxuong-v.jpg','assets/shop-matong-v.jpg'],
    imgH:'assets/shop-lapxuong-h.jpg',
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
try{ if(sessionStorage.getItem('sponsor-off') === '1') return; }catch(e){}

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
  return '<a class="sponsor-card ' + (i ? 'sponsor-card--b' : '') + '" href="' + ad.url + '" target="_blank" rel="noopener nofollow">' +
    '<button class="sponsor-card__x" type="button" aria-label="Ẩn quảng cáo">✕</button>' +
    '<span class="sponsor-card__tag">' + I('tag') + '<span data-sponsor-label>' + t(LABEL) + '</span></span>' +
    '<span class="sponsor-card__img">' + imgs + '</span>' +
    '<span class="sponsor-card__body">' +
      '<span class="sponsor-card__kicker">' + t(ad.kicker) + '</span>' +
      '<span class="sponsor-card__title">' + t(ad.title) + '</span>' +
      '<span class="sponsor-card__line">' + t(ad.line) + '</span>' +
      '<ul class="sponsor-card__list">' + list + '</ul>' +
      '<span class="sponsor-card__cta">' + t(ad.cta) + I('arrow') + '</span>' +
    '</span></a>';
}

/* ---------- Banner ngang ---------- */
function barHTML(ad){
  return '<a class="sponsor-bar" href="' + ad.url + '" target="_blank" rel="noopener nofollow">' +
    '<button class="sponsor-bar__x" type="button" aria-label="Ẩn quảng cáo">✕</button>' +
    '<span class="sponsor-bar__tag">' + I('tag') + '<span data-sponsor-label>' + t(LABEL) + '</span></span>' +
    '<span class="sponsor-bar__img"><img src="' + P + ad.imgH + '" alt="' + ad.alt +
      '" width="960" height="300" loading="lazy" decoding="async"></span>' +
    '<span class="sponsor-bar__body">' +
      '<span class="sponsor-bar__kicker">' + t(ad.kicker) + '</span>' +
      '<span class="sponsor-bar__title">' + t(ad.title) + '</span>' +
      '<span class="sponsor-bar__line">' + t(ad.line) + '</span>' +
      '<span class="sponsor-bar__cta">' + t(ad.cta) + I('arrow') + '</span>' +
    '</span></a>';
}

var rails = {};
function build(){
  Object.keys(rails).forEach(function(k){ rails[k].remove(); });
  rails = {};
  document.querySelectorAll('.sponsor-slot').forEach(function(s){ s.innerHTML = ''; });

  ADS.forEach(function(ad, i){
    if(!rails[ad.side]){
      var r = document.createElement('aside');
      r.className = 'sponsor-rail sponsor-rail--' + ad.side;
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
    var slot = sec.querySelector('.sponsor-slot');
    if(!slot){
      slot = document.createElement('div');
      slot.className = 'sponsor-slot';
      slot.style.marginTop = '52px';
      var w = sec.querySelector('.wrap');
      (w || sec).appendChild(slot);
    }
    slot.innerHTML = barHTML(ADS[i]);
  });

  document.querySelectorAll('.sponsor-card__x, .sponsor-bar__x').forEach(function(b){
    b.addEventListener('click', function(e){
      e.preventDefault(); e.stopPropagation();
      Object.keys(rails).forEach(function(k){ rails[k].remove(); });
      document.querySelectorAll('.sponsor-slot').forEach(function(s){ s.remove(); });
      document.querySelectorAll('.szone').forEach(function(s){ s.classList.remove('szone'); });
      try{ sessionStorage.setItem('sponsor-off', '1'); }catch(err){}
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
    if(on) s.classList.add('szone');
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

