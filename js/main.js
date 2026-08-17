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
    'craft.lead':['Chef Minh Nguyễn trong năm 2026 nổi bật với vai trò Nhà sáng lập kiêm CEO của cộng đồng Vietchefs Worldwide (VCW) và gia nhập hiệp hội International Chefs Sans Frontières (CSFint). Anh cũng tích cực đồng hành cùng các đấu trường ẩm thực lớn như <a href=\\"https://www.facebook.com/Minhnguyensg0110/\\" target=\\"_blank\\" rel=\\"noopener\\">Top Chef Việt Nam 2026</a>, đẩy mạnh các giá trị cốt lõi của ẩm thực Việt Nam trước thềm APEC 2027, lan toả văn hoá ẩm thực thuần vị và kết nối thị trường.','In 2026 Chef Minh Nguyễn works as Founder and CEO of the Vietchefs Worldwide (VCW) community and joined International Chefs Sans Frontières (CSFint). He also works alongside major culinary competitions such as <a href=\\"https://www.facebook.com/Minhnguyensg0110/\\" target=\\"_blank\\" rel=\\"noopener\\">Top Chef Vietnam 2026</a>, pushing the core values of Vietnamese cuisine ahead of APEC 2027.'],
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