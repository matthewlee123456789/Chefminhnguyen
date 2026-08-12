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
    'nav.press':['Truyền thông','Press'],
    'hero.sound':['Đang tắt tiếng','Sound off'],
    'craft.cta':['Xem hành trình 15 năm <span class=\"ar\">→</span>','See the 15-year path <span class=\"ar\">→</span>'],
    'craft.s2s':['Best Master Chef Awards','Best Master Chef Awards'],
    'cui.cta2':['Xem trang ẩm thực <span class=\"ar\">→</span>','Go to the cuisine page <span class=\"ar\">→</span>'],
    'aca.all':['Xem trang Academy <span class=\"ar\">→</span>','Go to the Academy page <span class=\"ar\">→</span>'],
    'aca.detail':['Chi tiết','Details'],
    'aca.fee2':['Học phí trao đổi trực tiếp theo lộ trình từng người.','Tuition is discussed directly, based on each student’s path.'],
    'aca.c1h':['Các món châu Âu — cơ bản','European cooking — foundation'],
    'aca.c1s':['Nền tảng bếp Âu: dao, lửa, nước dùng, sốt mẹ và cách dựng một đĩa ăn hoàn chỉnh.','The foundations: knife, heat, stock, mother sauces and how a plate is built.'],
    'aca.c1dur':['30 buổi','30 sessions'],
    'aca.c1start':['Khai giảng hằng ngày','Starts daily'],
    'aca.c1loc':['TP. Hồ Chí Minh','Ho Chi Minh City'],
    'aca.c1seat':['Còn 3 chỗ','3 seats left'],
    'aca.c2h':['Các món châu Âu — nâng cao','European cooking — advanced'],
    'aca.c2s':['Đi sâu vào kỹ thuật hiện đại, kiểm soát nhiệt, kết cấu và tư duy dựng thực đơn.','Modern technique, heat control, texture and menu thinking in depth.'],
    'aca.c2dur':['90 buổi','90 sessions'],
    'aca.c2start':['Khai giảng hằng ngày','Starts daily'],
    'aca.c2loc':['TP. Hồ Chí Minh','Ho Chi Minh City'],
    'aca.c2seat':['Còn 3 chỗ','3 seats left'],
    'tru.eyebrow':['Truyền thông & thành tích','Press & credentials'],
    'tru.h':['Nơi Chef Minh<br>đã xuất hiện.','Where Chef Minh<br>has appeared.'],
    'tru.all':['Xem tất cả <span class=\"ar\">→</span>','See all <span class=\"ar\">→</span>'],
        'blg.all':['Xem tất cả bài viết <span class=\"ar\">→</span>','See all articles <span class=\"ar\">→</span>'],
    'nav.chef':['Chef','The Chef'],
    'nav.cuisine':['Ẩm thực','Cuisine'],
    'nav.services':['Dịch vụ','Services'],
    'nav.academy':['Academy','Academy'],
    'nav.contact':['Liên hệ','Contact'],
    'nav.cta':['Làm việc cùng Chef','Work with Chef Minh'],

    'hero.role':['Tư vấn ẩm thực · Đào tạo · Private Chef','Culinary Consultant · Educator · Private Chef'],
    'hero.sub':['Mười lăm năm trong bếp. Ẩm thực Việt được đọc lại bằng kỹ thuật hiện đại — cho nhà hàng, cho người học nghề, và cho những bàn ăn riêng tư.','Fifteen years in the kitchen. Vietnamese cooking read through modern technique — for restaurants, for people learning the trade, and for private tables.'],
    'hero.cta1':['Xem hành trình','See the work'],
    'hero.cta2':['Làm việc cùng Chef','Work with Chef Minh'],

    'craft.eyebrow':['Hành trình','The path'],
    'craft.label':['Năm theo nghề','Years of craft'],
    'craft.h':['Nghề bếp học bằng thời gian,<br>không học bằng lối tắt.','This trade is learned in years,<br>not in shortcuts.'],
    'craft.lead':['[CẦN NỘI DUNG TỪ CHEF] Hai đến ba câu tóm tắt chặng đường: bắt đầu từ đâu, đi qua những căn bếp nào, và điều gì đã định hình cách nấu hôm nay.','[CONTENT NEEDED FROM CHEF] Two or three sentences on the path: where it started, which kitchens shaped it, and what defines the cooking today.'],
    'craft.s1s':['Top Chef Vietnam 2023','Top Chef Vietnam 2023'],
    'craft.s2s':['[Cần số liệu thật — ví dụ: số dự án tư vấn đã thực hiện]','[Real figure needed — e.g. consulting projects delivered]'],
    'craft.s3b':['[Số]','[Number]'],
    'craft.s3s':['[Cần số liệu thật — ví dụ: số học viên đã đào tạo]','[Real figure needed — e.g. students trained]'],

    'cui.eyebrow':['Ẩm thực','Cuisine'],
    'cui.h':['Món ăn là bằng chứng,<br>không phải thực đơn.','The dishes are evidence,<br>not a menu.'],
    'cui.lead':['Năm món, năm vùng đất. Chạm vào từng món để đọc câu chuyện Chef Minh viết cho nó.','Five dishes, five places. Tap any of them to read the story Chef Minh wrote for it.'],
    'cui.d1n':['Trái Giác','Trái Giác'],'cui.d1s':['Miền Tây · kẹo, gel và bọt từ trái giác','Mekong Delta · candy, gel and foam'],
    'cui.d2n':['Gỏi tái tôm sú','Tiger prawn ceviche'],'cui.d2s':['Tôm sú · trái giác · nấm tuyết','Tiger prawn · wild grape · snow fungus'],
    'cui.d3n':['Cá tuyết Na Uy dry-aged áp chảo','Pan-seared dry-aged Norwegian cod'],'cui.d3s':['Tỏi đen Lý Sơn · tiêu Phú Quốc · bánh phồng tôm','Lý Sơn black garlic · Phú Quốc pepper · prawn cracker'],
    'cui.d4n':['Nọng heo đen vùng cao nướng muối ớt','Highland black pork jowl, chilli-salt grilled'],'cui.d4s':['Đồng Văn, Hà Giang · rau củ Đà Lạt','Đồng Văn, Hà Giang · Đà Lạt vegetables'],
    'cui.d5n':['Gà đen H’Mông','H’Mông black chicken'],'cui.d5s':['Gỗ quế · chẩm chéo · xôi nếp nương','Cinnamon wood · chẩm chéo · upland sticky rice'],
    'cui.more':['Đọc câu chuyện','Read the story'],

    'phil.quote':['“Ẩm thực Việt không chỉ là món ăn, mà là câu chuyện về văn hóa, con người và vùng đất.”','“Vietnamese cuisine is never only about the food. It carries the story of a culture, its people, and the land they come from.”'],
    'phil.quote2':['“Tôi muốn giữ được cái hồn Việt trong từng nguyên liệu, đồng thời dùng kỹ thuật và tư duy hiện đại để đưa những giá trị ấy đối thoại với thế giới.”','“My work is to keep that origin alive in every ingredient — and to use modern technique and thinking to let it speak to the world.”'],
    'phil.attr':['Chef Minh Nguyễn','Chef Minh Nguyễn'],
    'phil.t1':['Văn hóa','Culture'],'phil.t2':['Con người','People'],'phil.t3':['Vùng đất','Land'],

    'pil.eyebrow':['Dịch vụ','Services'],
    'pil.h':['Bốn cách để làm việc<br>cùng Chef Minh.','Four ways to work<br>with Chef Minh.'],
    'pil.focus':['Đang mở rộng','Growing'],
    'pil.p1h':['Đào tạo','Education'],
    'pil.p1s':['Dạy nghề bếp cho người muốn đi đường dài, không dạy mẹo.','Teaching the trade to people in it for the long run — not kitchen tricks.'],
    'pil.p1a':['Lớp học ngắn hạn','Short courses'],'pil.p1b':['Masterclass chuyên đề','Masterclasses'],'pil.p1c':['Đào tạo bếp chuyên nghiệp','Professional kitchen training'],
    'pil.p1cta':['Xem các khóa học <span class="ar">→</span>','See the courses <span class="ar">→</span>'],
    'pil.p2h':['Thương hiệu','Brand'],
    'pil.p2s':['Đồng hành cùng nhãn hàng bằng chuyên môn bếp, không chỉ bằng hình ảnh.','Working with brands through kitchen expertise, not just a face.'],
    'pil.p2a':['Hợp tác nhãn hàng','Brand partnerships'],'pil.p2b':['KOC ngành ẩm thực','Food-industry KOC'],'pil.p2c':['Chiến dịch và nội dung ẩm thực','Culinary campaigns and content'],
    'pil.p2cta':['Xem hồ sơ hợp tác <span class="ar">→</span>','See the partnership profile <span class="ar">→</span>'],
    'pil.p3h':['Tư vấn','Consulting'],
    'pil.p3s':['Dựng bếp, dựng thực đơn, dựng cách vận hành.','Building the kitchen, the menu, and the way it runs.'],
    'pil.p3a':['Phát triển thực đơn','Menu development'],'pil.p3b':['Setup bếp và nhà hàng','Kitchen and restaurant setup'],'pil.p3c':['Vận hành và huấn luyện đội bếp','Operations and team training'],
    'pil.p3cta':['Trao đổi về nhà hàng <span class="ar">→</span>','Talk about your restaurant <span class="ar">→</span>'],
    'pil.p4h':['Trải nghiệm','Experiences'],
    'pil.p4s':['Bữa ăn riêng, nấu tại chỗ, thực đơn dựng riêng cho từng bàn.','Private meals, cooked on site, with a menu built for the table.'],
    'pil.p4a':['Private Chef','Private Chef'],'pil.p4b':['Private Dining','Private Dining'],'pil.p4c':['Sự kiện riêng','Private events'],
    'pil.p4cta':['Đặt trải nghiệm <span class="ar">→</span>','Book an experience <span class="ar">→</span>'],

    'aca.eyebrow':['Academy','Academy'],
    'aca.h':['Học cùng Chef Minh.','Learn with Chef Minh.'],
    'aca.lead':['Lớp giới hạn số người để mỗi học viên đều được đứng bếp thật.','Class sizes are capped so everyone actually cooks.'],
    'aca.lv':['Cấp độ:','Level:'],'aca.dur':['Thời lượng:','Length:'],'aca.start':['Khai giảng:','Starts:'],'aca.loc':['Địa điểm:','Location:'],
    'aca.c1h':['[Tên khóa 01]','[Course 01]'],'aca.c1s':['[Mô tả ngắn một dòng về nội dung khóa học]','[One line on what the course covers]'],
    'aca.c1seat':['Còn [N] chỗ','[N] seats left'],'aca.c1fee':['[Số tiền]','[Amount]'],
    'aca.c2h':['[Tên khóa 02]','[Course 02]'],'aca.c2s':['[Mô tả ngắn một dòng về nội dung khóa học]','[One line on what the course covers]'],
    'aca.c2seat':['Còn [N] chỗ','[N] seats left'],'aca.c2fee':['[Số tiền]','[Amount]'],

            'tru.kith':['Dành cho nhãn hàng và đối tác','For brands and partners'],
    'tru.kits':['Hồ sơ năng lực đầy đủ: kinh nghiệm, số liệu độ phủ, các chiến dịch đã thực hiện và hình thức hợp tác.','The full profile: experience, reach figures, past campaigns, and how a partnership works.'],
    'tru.kitcta':['Nhận hồ sơ năng lực','Request the profile'],

    'con.h':['Bắt đầu từ<br>việc của bạn.','Start with<br>what you need.'],
    'con.lead':['Chọn đúng nhu cầu để câu hỏi phía sau đi thẳng vào việc.','Pick the right one and the questions that follow get straight to the point.'],
    'con.r1':['Tôi muốn học','I want to learn'],
    'con.r2':['Tôi đại diện một thương hiệu','I represent a brand'],
    'con.r3':['Tôi có nhà hàng','I run a restaurant'],
    'con.r4':['Tôi muốn đặt trải nghiệm','I want to book a dinner'],
    'con.email':['Email','Email'],'con.tel':['Điện thoại','Phone'],

    'f.name':['Họ và tên','Full name'],'f.phone':['Số điện thoại','Phone'],'f.email':['Email','Email'],
    'f.course':['Khóa quan tâm','Course of interest'],'f.level':['Trình độ hiện tại','Current level'],
    'f.lv1':['Chưa có kinh nghiệm','No experience yet'],'f.lv2':['Đang làm bếp','Working in a kitchen'],'f.lv3':['Đã làm nhiều năm','Several years in'],
    'f.brand':['Tên thương hiệu','Brand name'],'f.camp':['Hình thức hợp tác','Type of partnership'],
    'f.cp1':['Chiến dịch truyền thông','Media campaign'],'f.cp2':['Nội dung ẩm thực','Culinary content'],'f.cp3':['Sự kiện','Event'],'f.cp4':['Đại sứ dài hạn','Long-term ambassador'],
    'f.type':['Loại hình','Type of venue'],'f.stage':['Giai đoạn','Stage'],
    'f.st1':['Chuẩn bị mở mới','Opening soon'],'f.st2':['Đang vận hành, cần cải tổ','Operating, needs a reset'],'f.st3':['Mở rộng thêm chi nhánh','Expanding'],
    'f.guests':['Số khách','Number of guests'],'f.date':['Ngày mong muốn','Preferred date'],
    'f.msg':['Nội dung','Message'],'f.send':['Gửi thông tin','Send'],

    'ft.tag':['Ẩm thực Việt, đọc lại bằng kỹ thuật hiện đại.','Vietnamese cooking, read through modern technique.'],
    'ft.h1':['Chef','The Chef'],'ft.h2':['Dịch vụ','Services'],'ft.h3':['Liên hệ','Contact'],
    'ft.l1':['Hành trình','The path'],'ft.l2':['Triết lý','Philosophy'],'ft.l3':['Ẩm thực','Cuisine'],
    'ft.l4':['Đào tạo','Education'],'ft.l5':['Thương hiệu','Brand'],'ft.l6':['Tư vấn','Consulting'],'ft.l7':['Trải nghiệm','Experiences'],
    'ft.l8':['Gửi yêu cầu','Send an enquiry'],
    'ft.rights':['Bảo lưu mọi quyền.','All rights reserved.'],
    'ft.by':['Thiết kế','Design'],

  };

/* ============================ SONG NGỮ ============================ */
var lang = 0; // 0 = VI, 1 = EN
try{ if(localStorage.getItem('cmn-lang') === 'en') lang = 1; }catch(e){}

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
  /* Trình duyệt CHẶN video tự chạy nếu có tiếng.
     Nên video luôn khởi động ở chế độ tắt tiếng, khách tự bật nếu muốn. */
  vid.muted = true;
  vid.play().catch(function(){ /* một số máy chặn hẳn, bỏ qua */ });

  if(sndBtn){
    sndBtn.addEventListener('click', function(){
      vid.muted = !vid.muted;
      if(!vid.muted){ vid.volume = 0.55; vid.play().catch(function(){}); }
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
      name:['Trái Giác','Trái Giác'],
      sub:['Miền Tây · kẹo, gel và bọt từ trái giác','Mekong Delta · candy, gel and foam from wild grape'],
      img:'assets/mon-01-trai-giac.jpg',
      body:[
        ['Có những hương vị không chỉ nằm trên đầu lưỡi, mà neo lại cả một miền ký ức. Với tôi, đó là trái giác.',
         'Tuổi thơ tôi gắn liền với gia đình, với những buổi chiều quây quần bên nồi canh chua cá nấu trái giác còn nghi ngút khói. Vị chua thanh, hơi chát, mộc mạc mà sâu lắng — như chính vòng tay của cha mẹ, như tiếng cười giản dị của những ngày xưa cũ. Dù sau này tôi có là ai, đi bao xa, những khoảnh khắc ấy vẫn sẽ mãi nằm yên trong tâm trí, không phai mờ.',
         'Tôi đã tự mình đi hái những trái giác chín đúng thời điểm nhất. Không chỉ để nấu lại món ăn quen thuộc, mà để kể câu chuyện của ký ức theo một cách mới. Trái giác được làm thành kẹo, được biến hoá thành gel, thành form bọt, khoác lên mình một “bộ cánh” hiện đại hơn trong món ăn hôm nay.',
         'Với tôi, đó không phải là sự thay đổi, mà là sự tiếp nối. Lấy ký ức làm gốc, lấy nguyên liệu Việt làm linh hồn, rồi dùng kỹ thuật và tư duy mới để kể lại câu chuyện cũ theo ngôn ngữ của hiện tại.'],
        ['Some flavours do not stay on the tongue. They anchor a whole stretch of memory. For me that flavour is trái giác, the wild grape of the Mekong Delta.',
         'It belongs to childhood afternoons around a steaming pot of sour fish soup. A clean sourness with a faint bitterness underneath — plain, but it goes deep. However far I travel, those afternoons stay put.',
         'I picked the fruit myself, at the exact point of ripeness. Not to repeat the familiar dish, but to tell the memory differently: the fruit turned into candy, into gel, into foam — given a more contemporary form on the plate.',
         'To me this is not a change of direction. It is a continuation. Memory as the root, Vietnamese ingredients as the soul, and new technique to retell an old story in the language of now.']
      ],
      spirit:['Tôn trọng quá khứ — sáng tạo cho tương lai — và luôn nấu ăn bằng cả trái tim.',
              'Respect the past — create for the future — and always cook with the whole heart.']
    },
    '2': {
      idx:'02',
      name:['Gỏi tái tôm sú','Tiger prawn ceviche'],
      sub:['Tôm sú · trái giác · nấm tuyết','Tiger prawn · wild grape · snow fungus'],
      img:'assets/mon-02-goi-tom-su.jpg',
      body:[
        ['Ceviche tôm sú được xây dựng theo tinh thần tươi — chua — nhẹ, lấy trái giác làm điểm nhấn hương vị xuyên suốt món ăn.',
         'Trái giác được nấu nhẹ cùng nước mắm và đường, tạo nền vị chua mặn hài hòa. Tôm sú làm tái vừa, giữ độ ngọt tự nhiên. Khi hoàn thiện, tôm kết hợp cùng nấm tuyết, hành tím, húng quế và đậu phộng, sắp xếp gọn trong khuôn tròn để món ăn có cấu trúc rõ ràng và dễ thưởng thức.',
         'Ở phần hoàn thiện, lecithin tạo lớp kết cấu nhẹ, giúp hương chua lan nhanh khi chạm lưỡi. Bên cạnh đó, trái tắc ngào đường và trái giác xay nhuyễn được xử lý như những thành phần bổ trợ, làm vị chua rõ hơn nhưng vẫn dịu, không gắt.',
         'Tổng thể, đây là một món khai vị tập trung vào độ tươi của nguyên liệu, hương vị trái cây bản địa và cảm giác nhiều lớp khi thưởng thức.'],
        ['A ceviche built on three ideas: fresh, sour, light — with trái giác running through the whole dish.',
         'The fruit is cooked gently with fish sauce and sugar to set a balanced sour-salt base. The prawn is only lightly cured so its natural sweetness stays. It is finished with snow fungus, shallot, Thai basil and peanut, set in a ring so the dish has a clear structure.',
         'Lecithin gives a light aerated layer that carries the acidity quickly across the palate. Candied calamansi and puréed trái giác sharpen the sourness without letting it turn harsh.',
         'The result is a starter about ingredient freshness, native fruit, and the sensation of eating something in layers.']
      ],
      spirit:['Tươi — chua — nhẹ.','Fresh — sour — light.']
    },
    '3': {
      idx:'03',
      name:['Cá tuyết Na Uy dry-aged áp chảo','Pan-seared dry-aged Norwegian cod'],
      sub:['Tỏi đen Lý Sơn · tiêu Phú Quốc · bánh phồng tôm','Lý Sơn black garlic · Phú Quốc pepper · prawn cracker'],
      img:'assets/mon-03-ca-tuyet.jpg',
      alt:'assets/mon-03-ca-tuyet-b.jpg',
      body:[
        ['Món ăn bắt đầu từ cá tuyết Na Uy, một nguyên liệu của vùng biển lạnh Bắc Âu. Cá được dry-aged để giảm bớt độ ẩm, cô đọng vị ngọt tự nhiên và tạo nên cấu trúc thịt săn chắc hơn. Sau đó áp chảo ở nhiệt độ cao, tạo lớp vỏ vàng thơm bên ngoài nhưng vẫn giữ được sự mềm mọng bên trong.',
         'Từ biển lạnh ấy, câu chuyện dần trở về Việt Nam. Tỏi đen Lý Sơn được dùng trong nước sốt như một điểm nối giữa biển và đất. Qua quá trình lên men, vị cay nồng của tỏi chuyển thành vị ngọt sâu, caramel và umami, gợi nhớ vùng đất núi lửa nơi tỏi được trồng. Một chút siro sung Mỹ bổ sung vị ngọt trái cây và acid nhẹ, cân bằng độ béo của cá.',
         'Bên cạnh đó là khoai tây và cà rốt nấu chậm trong bơ, giữ trọn vị ngọt rồi áp chảo nhẹ để có thêm hương caramel. Puree bắp Mỹ mang vị ngọt, mềm và béo, được đánh thức bằng tiêu đen Phú Quốc — thứ gia vị mang mùi thơm ấm, cay và một chút hương nhiệt đới. Trên nền vị ấy, trứng cá hồi muối tạo những điểm nhấn mặn và tươi của biển.',
         'Nhưng dấu ấn Việt Nam rõ nhất lại nằm ở những chi tiết tưởng như rất nhỏ: vụn bánh phồng tôm nướng thay cho breadcrumb, mang theo mùi tôm và ký ức của những bữa ăn miền Nam; cùng tuile từ xương cá, nơi phần xương sau khi fillet được tận dụng để tạo nên một lớp giòn đậm vị biển.',
         'Đây không đơn thuần là sự kết hợp giữa nguyên liệu Việt Nam và nguyên liệu quốc tế. Đó là câu chuyện về một con cá đi qua nhiều vùng địa lý, nhưng cuối cùng được kể lại bằng ngôn ngữ của Việt Nam.'],
        ['The dish starts with Norwegian cod from the cold North Atlantic. It is dry-aged to draw out moisture, concentrate its natural sweetness and firm up the flesh, then seared hard for a golden crust with a still-juicy centre.',
         'From that cold sea, the story travels back to Vietnam. Lý Sơn black garlic works in the sauce as the join between sea and land: fermentation turns its sharpness into deep caramel sweetness and umami, carrying the volcanic soil it grew in. A little fig syrup adds fruit sweetness and gentle acidity to balance the fat.',
         'Alongside are potato and carrot cooked slowly in butter, then briefly seared for caramel aroma. Sweetcorn purée brings softness and richness, woken up by Phú Quốc black pepper — warm, spicy, faintly tropical. Salted salmon roe adds bright, saline punctuation.',
         'The clearest Vietnamese marks are the smallest details: toasted prawn-cracker crumb in place of breadcrumb, carrying the smell of southern family meals; and a tuile made from the fish bones left after filleting, turned into a crisp layer with deep sea flavour.',
         'This is not simply Vietnamese ingredients meeting international ones. It is the story of one fish crossing several geographies, and finally being told in Vietnamese.']
      ],
      spirit:['Biển lạnh Na Uy. Đất núi lửa Lý Sơn. Tiêu Phú Quốc. Bánh phồng tôm miền Nam.',
              'Cold Norwegian sea. Volcanic Lý Sơn soil. Phú Quốc pepper. Southern prawn cracker.']
    },
    '4': {
      idx:'04',
      name:['Nọng heo đen vùng cao nướng muối ớt','Highland black pork jowl, chilli-salt grilled'],
      sub:['Đồng Văn, Hà Giang · rau củ Đà Lạt','Đồng Văn, Hà Giang · Đà Lạt vegetables'],
      img:'assets/mon-04-nong-heo.jpg',
      body:[
        ['Món ăn bắt đầu từ nọng heo đen vùng cao nguyên đá Đồng Văn, Hà Giang — phần thịt nằm gần má và cổ, có tỷ lệ nạc và mỡ đan xen đặc biệt. Thay vì nướng theo cách thông thường, thịt được ướp muối ớt rồi nướng trên lửa, để nhiệt làm lớp mỡ tan chậm, thấm ngược vào thớ thịt và tạo nên lớp cháy cạnh thơm, đậm vị.',
         'Vị mặn và cay của muối ớt được cân bằng bằng sốt mật ong, mù tạc hạt và hương thảo. Mật ong mang vị ngọt tự nhiên, mù tạc tạo độ cay nhẹ, còn hương thảo bổ sung một nốt thảo mộc ấm, kết nối món ăn vùng cao với kỹ thuật bếp hiện đại.',
         'Da heo đen sấy giòn được giữ lại như một lớp texture tương phản. Từ phần tưởng như phụ phẩm, qua sấy và làm giòn, nó trở thành điểm nhấn và đồng thời kể câu chuyện tận dụng trọn vẹn nguyên liệu.',
         'Đi cùng thịt là rau củ Đà Lạt sous-vide để giữ màu, độ ngọt và cấu trúc, sau đó xào nhanh cùng hành tím confit. Phần salsa ớt không cay được nướng trước để lấy mùi khói và vị ngọt tự nhiên, rồi trộn cùng rau củ và rau thơm — nếu nọng heo là phần đậm và béo, salsa là lớp vị tươi sáng làm nhẹ món ăn sau mỗi miếng.',
         'Cuối cùng là thạch lá gừng và lá dứa — chi tiết nhỏ nhưng mang tính ký ức. Lá gừng cho hương xanh, hơi cay, rất gần gian bếp Việt; lá dứa bổ sung mùi thơm dịu và quen thuộc. Khi chuyển thành dạng thạch, hai mùi hương ấy trở nên trong trẻo và hiện đại hơn.'],
        ['The dish begins with black pork jowl from the Đồng Văn stone plateau in Hà Giang — the cut near the cheek and neck, with an unusual weave of lean and fat. Rather than a standard grill, it is cured in chilli salt and cooked over fire so the fat renders slowly back into the meat and the edges char and deepen.',
         'The salt and heat are balanced by a sauce of honey, grain mustard and rosemary: honey for natural sweetness, mustard for a light bite, rosemary for a warm herbal note joining highland cooking to modern kitchen technique.',
         'Crisp-dried black pork skin stays on the plate as a contrasting texture — a supposed by-product turned into a highlight, and a small argument for using the whole animal.',
         'With it come Đà Lạt vegetables, sous-vide to hold their colour, sweetness and structure, then flashed through confit shallot. A mild grilled-chilli salsa, charred first for smoke and sweetness, is folded with vegetables and herbs: where the jowl is rich and heavy, the salsa is the bright, acidic lift after each bite.',
         'Last, a jelly of ginger leaf and pandan — a small detail carrying memory. Ginger leaf brings a green, faintly spicy note very close to a Vietnamese home kitchen; pandan adds a soft, familiar sweetness. Set as jelly, both read clearer and more contemporary.']
      ],
      spirit:['Núi rừng gặp khu vườn Đà Lạt — nguyên liệu mộc mạc, kỹ thuật hiện đại, tinh thần nguyên bản.',
              'Mountains meeting the Đà Lạt garden — plain ingredients, modern technique, original spirit.']
    },
    '5': {
      idx:'05',
      name:['Gà đen H’Mông','H’Mông black chicken'],
      sub:['Gỗ quế · chẩm chéo · xôi nếp nương','Cinnamon wood · chẩm chéo · upland sticky rice'],
      img:'',
      body:[
        ['Món ăn bắt đầu từ gà đen H’Mông, giống gà gắn liền với đời sống và văn hóa ẩm thực của đồng bào vùng cao phía Bắc. Thịt gà săn chắc, thơm và có vị đậm tự nhiên, vì vậy được xử lý tối giản để giữ lại bản chất của nguyên liệu.',
         'Phần thịt được cuộn cùng bắp non, tạo nên sự kết hợp giữa vị đậm và săn của gà với vị ngọt, giòn và tươi của bắp. Cuộn gà sau đó được nướng trên gỗ quế, để khói và tinh dầu quế thấm nhẹ vào bề mặt thịt, tạo mùi thơm ấm, cay dịu và rất đặc trưng của núi rừng. Ở đây gỗ quế không chỉ là nhiên liệu mà trở thành một phần của món ăn.',
         'Đi cùng gà là sốt ớt chẩm chéo, lấy cảm hứng từ một loại gia vị quen thuộc của vùng Tây Bắc. Chẩm chéo được tinh chỉnh để có cấu trúc sốt mượt hơn nhưng vẫn giữ tinh thần nguyên bản: một chút cay, một chút mặn, nhiều hương thơm và một hậu vị rất vùng cao.',
         'Bên cạnh đó là xôi nếp nương, thứ gạo gắn liền với những thửa ruộng bậc thang. Hạt nếp được hấp chín để giữ độ dẻo, thơm và vị ngọt tự nhiên. Xôi đóng vai trò như phần nền, hấp thụ nước gà và sốt chẩm chéo, đồng thời làm dịu vị cay và khói của món chính.',
         'Đây là câu chuyện về một bữa ăn vùng cao được kể lại bằng ngôn ngữ đương đại. Một món ăn không cố gắng làm vùng cao trở nên sang trọng hơn, mà dùng kỹ thuật hiện đại để làm nổi bật vẻ đẹp vốn có của vùng đất ấy.'],
        ['The dish starts with H’Mông black chicken, a bird bound up with the life and food culture of the northern highlands. The meat is firm, fragrant and naturally deep in flavour, so it is handled minimally.',
         'It is rolled with young corn — the firm, savoury bird against sweet, crisp, fresh kernels — then grilled over cinnamon wood so that smoke and cinnamon oil settle lightly on the surface. Here the wood is not just fuel; it becomes part of the dish.',
         'Alongside is a chẩm chéo chilli sauce, drawn from a staple seasoning of the northwest. It is refined into a smoother sauce while keeping its original spirit: a little heat, a little salt, a great deal of aroma, and a finish that belongs to the highlands.',
         'Then upland sticky rice, the grain of the terraced fields, steamed to keep its chew and natural sweetness. It works as the base, absorbing chicken juices and sauce while softening the heat and smoke.',
         'This is a highland meal told in a contemporary language — not an attempt to make the highlands look luxurious, but to use modern technique to show what was already beautiful there.']
      ],
      spirit:['Núi cao — Gỗ quế — Nương rẫy — Chẩm chéo — Xôi nếp — Ký ức Tây Bắc.',
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

/* ============================ NĂM HIỆN TẠI ============================ */
document.querySelectorAll('#yr').forEach(function(el){ el.textContent = new Date().getFullYear(); });

applyLang();
})();
