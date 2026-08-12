#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Dựng toàn bộ trang HTML của chefminhnguyen.com từ các khối dùng chung."""
import os, re

NAV = [
    ('the-chef.html',  'nav.chef',    'Chef'),
    ('cuisine.html',   'nav.cuisine', 'Ẩm thực'),
    ('services.html',  'nav.services','Dịch vụ'),
    ('academy.html',   'nav.academy', 'Academy'),
    ('press.html',     'nav.press',   'Truyền thông'),
    ('blog.html',      'nav.blog',    'Blog'),
]

SEAL_DEFS = open('_seal.svg', encoding='utf-8').read()


def head(title, desc, depth=0):
    up = '../' * depth
    return f'''<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#120E0C">
<meta property="og:type" content="website">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:locale" content="vi_VN">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23120E0C'/%3E%3Cg fill='none' stroke='%23C6A664' stroke-width='4'%3E%3Ccircle cx='50' cy='50' r='40'/%3E%3Ccircle cx='50' cy='50' r='30'/%3E%3C/g%3E%3Cpath d='M36 40h28v10H36z' fill='%23C6A664'/%3E%3Cpath d='M38 62l24 0' stroke='%23C6A664' stroke-width='5'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Be+Vietnam+Pro:wght@200;300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{up}css/style.css">
<link rel="stylesheet" href="{up}css/motion.css">
</head>
<body>
{SEAL_DEFS}
'''


def header(active='', depth=0):
    up = '../' * depth
    nav = '\n'.join(
        f'      <a href="{up}{h}" data-i18n="{k}"{" class=\"is-active\"" if h == active else ""}>{t}</a>'
        for h, k, t in NAV)
    mnav = '\n'.join(
        f'    <a href="{up}{h}"><span data-i18n="{k}">{t}</span></a>'
        for h, k, t in NAV)
    return f'''<header class="hdr" id="hdr">
  <div class="wrap hdr__in">
    <a href="{up}index.html" class="brand" aria-label="Chef Minh Nguyễn — trang chủ">
      <svg viewBox="0 0 200 200" aria-hidden="true"><use href="#seal-mini"/></svg>
      <span class="brand__txt">CHEF MINH NGUYỄN</span>
    </a>
    <nav class="nav" aria-label="Điều hướng chính">
{nav}
    </nav>
    <div class="hdr__right">
      <div class="lang" role="group" aria-label="Ngôn ngữ">
        <button type="button" data-lang="vi" aria-pressed="true">VI</button>
        <span>/</span>
        <button type="button" data-lang="en" aria-pressed="false">EN</button>
      </div>
      <a href="{up}index.html#contact" class="btn" data-i18n="nav.cta">Làm việc cùng Chef</a>
      <button class="burger" id="burger" aria-label="Mở menu" aria-expanded="false"><i></i><i></i><i></i></button>
    </div>
  </div>
</header>

<div class="mmenu" id="mmenu">
  <nav aria-label="Điều hướng di động">
{mnav}
    <a href="{up}index.html#contact"><span data-i18n="nav.contact">Liên hệ</span></a>
  </nav>
  <a href="{up}index.html#contact" class="btn btn--solid" data-i18n="nav.cta">Làm việc cùng Chef</a>
</div>
'''


def footer(depth=0):
    up = '../' * depth
    return f'''<footer class="ft">
  <div class="wrap">
    <div class="ft__grid">
      <div class="ft__brand">
        <svg viewBox="0 0 200 200" aria-hidden="true"><use href="#seal-mini"/></svg>
        <p data-i18n="ft.tag">Ẩm thực Việt, đọc lại bằng kỹ thuật hiện đại.</p>
        <div class="ft__social">
          <a href="#" aria-label="Facebook">FB</a>
          <a href="#" aria-label="Instagram">IG</a>
          <a href="#" aria-label="YouTube">YT</a>
          <a href="#" aria-label="TikTok">TT</a>
        </div>
      </div>
      <div>
        <h4 data-i18n="ft.h1">Chef</h4>
        <ul>
          <li><a href="{up}the-chef.html" data-i18n="ft.l1">Hành trình</a></li>
          <li><a href="{up}the-chef.html#philosophy" data-i18n="ft.l2">Triết lý</a></li>
          <li><a href="{up}cuisine.html" data-i18n="ft.l3">Ẩm thực</a></li>
        </ul>
      </div>
      <div>
        <h4 data-i18n="ft.h2">Dịch vụ</h4>
        <ul>
          <li><a href="{up}academy.html" data-i18n="ft.l4">Đào tạo</a></li>
          <li><a href="{up}services.html#brand" data-i18n="ft.l5">Thương hiệu</a></li>
          <li><a href="{up}services.html#consulting" data-i18n="ft.l6">Tư vấn</a></li>
          <li><a href="{up}services.html#experiences" data-i18n="ft.l7">Trải nghiệm</a></li>
          <li><a href="{up}blog.html" data-i18n="nav.blog">Blog</a></li>
        </ul>
      </div>
      <div>
        <h4 data-i18n="ft.h3">Liên hệ</h4>
        <ul>
          <li><a href="mailto:thaiminhchef@gmail.com">thaiminhchef@gmail.com</a></li>
          <li><a href="tel:+84352118837">0352 118 837</a></li>
          <li><a href="https://zalo.me/0352118837" target="_blank" rel="noopener">Zalo: 0352 118 837</a></li>
          <li><a href="{up}index.html#contact" data-i18n="ft.l8">Gửi yêu cầu</a></li>
        </ul>
      </div>
    </div>
    <div class="ft__base">
      <p>© <span id="yr">2026</span> Chef Minh Nguyễn. <span data-i18n="ft.rights">Bảo lưu mọi quyền.</span></p>
      <a class="sig" href="#" aria-label="Thiết kế bởi mattdesignwebsite">
        <i></i><span data-i18n="ft.by">Thiết kế</span> <b>mattdesignwebsite</b>
      </a>
    </div>
  </div>
</footer>

<script src="{'../' * depth}js/main.js"></script>
<script src="{'../' * depth}js/motion.js"></script>
</body>
</html>
'''


MODAL = '''<div class="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <div class="modal__bg" data-close></div>
  <div class="modal__panel">
    <button class="modal__close" type="button" data-close aria-label="Đóng">✕</button>
    <div class="modal__hero" id="modal-hero"></div>
    <div class="modal__body">
      <span class="idx" id="modal-idx"></span>
      <h3 id="modal-title"></h3>
      <p class="modal__sub" id="modal-sub"></p>
      <div class="modal__story" id="modal-story"></div>
      <div class="modal__alt" id="modal-alt"></div>
    </div>
  </div>
</div>
'''


def pagehead(crumb_html, eyebrow, h1, lead=''):
    lead = f'<p class="lead">{lead}</p>' if lead else ''
    return f'''<section class="pagehead">
  <div class="wrap">
    <p class="crumb">{crumb_html}</p>
    <p class="eyebrow">{eyebrow}</p>
    <h1 class="h-display" style="font-size:clamp(2.4rem,5.4vw,4rem)">{h1}</h1>
    {lead}
  </div>
</section>
'''


DISHES = [
    ('1', 'mon-01-trai-giac.jpg',  '01', 'Trái Giác', 'Miền Tây · kẹo, gel và bọt từ trái giác', 'dish--a'),
    ('2', 'mon-02-goi-tom-su.jpg', '02', 'Gỏi tái tôm sú', 'Tôm sú · trái giác · nấm tuyết', 'dish--b'),
    ('3', 'mon-03-ca-tuyet.jpg',   '03', 'Cá tuyết Na Uy dry-aged áp chảo', 'Tỏi đen Lý Sơn · tiêu Phú Quốc · bánh phồng tôm', 'dish--wide'),
    ('4', 'mon-04-nong-heo.jpg',   '04', 'Nọng heo đen vùng cao nướng muối ớt', 'Đồng Văn, Hà Giang · rau củ Đà Lạt', 'dish--h'),
    ('5', 'mon-05-ga-den.jpg',     '05', 'Gà đen H’Mông', 'Gỗ quế · chẩm chéo · xôi nếp nương', 'dish--h'),
]


def dish_grid(depth=0):
    up = '../' * depth
    out = ['    <div class="dish-grid reveal">']
    for did, img, idx, name, sub, cls in DISHES:
        out.append(f'''      <button class="dish {cls}" type="button" data-dish="{did}">
        <div class="dish__img">
          <img src="{up}assets/{img}" alt="{name}" loading="lazy">
          <span class="dish__more" data-i18n="cui.more">Đọc câu chuyện</span>
        </div>
        <div class="dish__cap">
          <span class="idx">{idx}</span>
          <h3 class="h-3" data-i18n="cui.d{did}n">{name}</h3>
          <p data-i18n="cui.d{did}s">{sub}</p>
        </div>
      </button>
''')
    out.append('    </div>')
    return '\n'.join(out)


# ============================================================
# TRANG CHỦ
# ============================================================
def build_index():
    return head('Chef Minh Nguyễn — Tư vấn ẩm thực · Đào tạo · Private Chef',
                'Chef Minh Nguyễn — 15 năm nghề bếp. Tư vấn ẩm thực, đào tạo chuyên nghiệp, hợp tác thương hiệu và trải nghiệm private dining.') + header() + '''
<main id="top">

<!-- ================= HERO ================= -->
<section class="hero hero--video">
  <div class="hero__video" aria-hidden="true">
    <video id="hero-video" src="assets/hero.mp4" poster="assets/hero-poster.jpg"
           autoplay loop muted playsinline preload="metadata"></video>
  </div>

  <div class="wrap">
    <div style="max-width:760px">
      <p class="hero__role rise rise--1" data-i18n="hero.role">Tư vấn ẩm thực · Đào tạo · Private Chef</p>
      <h1 class="h-display hero__name">
        <span class="word"><span>Chef</span></span>
        <span class="word"><span>Minh Nguyễn</span></span>
      </h1>
      <p class="hero__sub type" data-type-key="hero.sub"
         data-fallback="Mười lăm năm trong bếp. Ẩm thực Việt được đọc lại bằng kỹ thuật hiện đại — cho nhà hàng, cho người học nghề, và cho những bàn ăn riêng tư."></p>
      <div class="hero__cta rise rise--4">
        <a href="the-chef.html" class="btn btn--solid btn--pulse" data-i18n="hero.cta1">Xem hành trình</a>
        <a href="#contact" class="btn btn--pulse" data-i18n="hero.cta2">Làm việc cùng Chef</a>
      </div>
    </div>
  </div>

  <button class="sound-btn" id="sound-btn" type="button" aria-pressed="false">
    <i></i><span data-i18n="hero.sound">Đang tắt tiếng</span>
  </button>
</section>

<!-- ================= 15 NĂM ================= -->
<section class="band band--raised" id="craft">
  <div class="wrap">
    <div class="craft reveal">
      <div>
        <div class="craft__num" id="counter">15</div>
        <div class="craft__numlab" data-i18n="craft.label">Năm theo nghề</div>
      </div>
      <div>
        <p class="eyebrow" data-i18n="craft.eyebrow">Hành trình</p>
        <h2 class="h-2" data-i18n="craft.h">Nghề bếp học bằng thời gian,<br>không học bằng lối tắt.</h2>
        <p class="lead" data-i18n="craft.lead">[CẦN NỘI DUNG TỪ CHEF] Hai đến ba câu tóm tắt chặng đường: bắt đầu từ đâu, đi qua những căn bếp nào, và điều gì đã định hình cách nấu hôm nay.</p>
        <div class="stats">
          <div class="stat"><b>Top 4</b><span data-i18n="craft.s1s">Top Chef Vietnam 2023</span></div>
          <div class="stat"><b>2024</b><span data-i18n="craft.s2s">Best Master Chef Awards</span></div>
          <div class="stat"><b data-i18n="craft.s3b">[Số]</b><span data-i18n="craft.s3s">[Cần số liệu thật — ví dụ: số học viên đã đào tạo]</span></div>
        </div>
        <div style="margin-top:30px"><a href="the-chef.html" class="link-arrow" data-i18n="craft.cta">Xem hành trình 15 năm <span class="ar">→</span></a></div>
      </div>
    </div>
  </div>
</section>

<!-- ================= ẨM THỰC ================= -->
<section class="band band--shell" id="cuisine" data-nav="light">
  <div class="wrap">
    <div class="reveal" style="max-width:640px;margin-bottom:56px">
      <p class="eyebrow" data-i18n="cui.eyebrow">Ẩm thực</p>
      <h2 class="h-2" data-i18n="cui.h">Món ăn là bằng chứng,<br>không phải thực đơn.</h2>
      <p class="lead" data-i18n="cui.lead">Năm món, năm vùng đất. Chạm vào từng món để đọc câu chuyện Chef Minh viết cho nó.</p>
    </div>
''' + dish_grid() + '''
    <div style="margin-top:52px" class="reveal">
      <a href="cuisine.html" class="link-arrow" data-i18n="cui.cta2">Xem trang ẩm thực <span class="ar">→</span></a>
    </div>
  </div>
</section>

<!-- ================= TRIẾT LÝ ================= -->
<section class="band band--dark" id="philosophy" style="text-align:center">
  <div class="wrap">
    <div class="stalk-rule reveal" style="margin-bottom:52px">
      <svg viewBox="60 0 80 44" aria-hidden="true"><use href="#stalk"/></svg>
    </div>
    <blockquote class="reveal" style="margin:0 auto;max-width:19ch">
      <p style="font-family:var(--display);font-weight:400;font-size:clamp(1.9rem,4.4vw,3.5rem);line-height:1.24;margin:0;color:var(--shell)" data-i18n="phil.quote">“Ẩm thực Việt không chỉ là món ăn, mà là câu chuyện về văn hóa, con người và vùng đất.”</p>
      <p style="font-size:1rem;line-height:1.8;color:var(--cream-soft);max-width:52ch;margin:34px auto 0" data-i18n="phil.quote2">“Tôi muốn giữ được cái hồn Việt trong từng nguyên liệu, đồng thời dùng kỹ thuật và tư duy hiện đại để đưa những giá trị ấy đối thoại với thế giới.”</p>
      <footer style="margin-top:36px"><span class="label" data-i18n="phil.attr">Chef Minh Nguyễn</span></footer>
    </blockquote>
    <div class="stalk-rule reveal" style="margin-top:56px">
      <svg viewBox="60 0 80 44" aria-hidden="true"><use href="#stalk"/></svg>
    </div>
    <div class="reveal" style="margin-top:34px;display:flex;gap:34px;justify-content:center;flex-wrap:wrap">
      <span class="label" data-i18n="phil.t1">Văn hóa</span>
      <span class="label" style="color:var(--gold-dim)">·</span>
      <span class="label" data-i18n="phil.t2">Con người</span>
      <span class="label" style="color:var(--gold-dim)">·</span>
      <span class="label" data-i18n="phil.t3">Vùng đất</span>
    </div>
  </div>
</section>

<!-- ================= BỐN TRỤ ================= -->
<section class="band band--raised" id="pillars">
  <div class="wrap">
    <div class="reveal" style="max-width:600px;margin-bottom:52px">
      <p class="eyebrow" data-i18n="pil.eyebrow">Dịch vụ</p>
      <h2 class="h-2" data-i18n="pil.h">Bốn cách để làm việc<br>cùng Chef Minh.</h2>
    </div>
    <div class="pillars reveal">
      <article class="pillar pillar--lg">
        <span class="pillar__rank" data-i18n="pil.focus">Đang mở rộng</span>
        <h3 class="h-3" data-i18n="pil.p1h">Đào tạo</h3>
        <p class="small" data-i18n="pil.p1s">Dạy nghề bếp cho người muốn đi đường dài, không dạy mẹo.</p>
        <ul>
          <li data-i18n="pil.p1a">Lớp học ngắn hạn</li>
          <li data-i18n="pil.p1b">Masterclass chuyên đề</li>
          <li data-i18n="pil.p1c">Đào tạo bếp chuyên nghiệp</li>
        </ul>
        <a href="academy.html" class="link-arrow" data-i18n="pil.p1cta">Xem các khóa học <span class="ar">→</span></a>
      </article>
      <article class="pillar pillar--lg">
        <span class="pillar__rank" data-i18n="pil.focus">Đang mở rộng</span>
        <h3 class="h-3" data-i18n="pil.p2h">Thương hiệu</h3>
        <p class="small" data-i18n="pil.p2s">Đồng hành cùng nhãn hàng bằng chuyên môn bếp, không chỉ bằng hình ảnh.</p>
        <ul>
          <li data-i18n="pil.p2a">Hợp tác nhãn hàng</li>
          <li data-i18n="pil.p2b">KOC ngành ẩm thực</li>
          <li data-i18n="pil.p2c">Chiến dịch và nội dung ẩm thực</li>
        </ul>
        <a href="services.html#brand" class="link-arrow" data-i18n="pil.p2cta">Xem hồ sơ hợp tác <span class="ar">→</span></a>
      </article>
      <article class="pillar pillar--sm">
        <h3 class="h-3" data-i18n="pil.p3h">Tư vấn</h3>
        <p class="small" data-i18n="pil.p3s">Dựng bếp, dựng thực đơn, dựng cách vận hành.</p>
        <ul>
          <li data-i18n="pil.p3a">Phát triển thực đơn</li>
          <li data-i18n="pil.p3b">Setup bếp và nhà hàng</li>
          <li data-i18n="pil.p3c">Vận hành và huấn luyện đội bếp</li>
        </ul>
        <a href="services.html#consulting" class="link-arrow" data-i18n="pil.p3cta">Trao đổi về nhà hàng <span class="ar">→</span></a>
      </article>
      <article class="pillar pillar--sm">
        <h3 class="h-3" data-i18n="pil.p4h">Trải nghiệm</h3>
        <p class="small" data-i18n="pil.p4s">Bữa ăn riêng, nấu tại chỗ, thực đơn dựng riêng cho từng bàn.</p>
        <ul>
          <li data-i18n="pil.p4a">Private Chef</li>
          <li data-i18n="pil.p4b">Private Dining</li>
          <li data-i18n="pil.p4c">Sự kiện riêng</li>
        </ul>
        <a href="services.html#experiences" class="link-arrow" data-i18n="pil.p4cta">Đặt trải nghiệm <span class="ar">→</span></a>
      </article>
    </div>
  </div>
</section>

<!-- ================= ACADEMY ================= -->
<section class="band band--shell" id="academy" data-nav="light">
  <div class="wrap">
    <div class="reveal" style="max-width:600px;margin-bottom:48px">
      <p class="eyebrow" data-i18n="aca.eyebrow">Academy</p>
      <h2 class="h-2" data-i18n="aca.h">Học cùng Chef Minh.</h2>
      <p class="lead" data-i18n="aca.lead">Lớp giới hạn số người để mỗi học viên đều được đứng bếp thật.</p>
    </div>
''' + course_cards() + '''
    <div style="margin-top:20px" class="reveal">
      <a href="academy.html" class="link-arrow" data-i18n="aca.all">Xem trang Academy <span class="ar">→</span></a>
    </div>
  </div>
</section>

<!-- ================= TRUYỀN THÔNG ================= -->
<section class="band band--dark" id="trust">
  <div class="wrap">
    <div class="reveal" style="max-width:640px;margin-bottom:48px">
      <p class="eyebrow" data-i18n="tru.eyebrow">Truyền thông &amp; thành tích</p>
      <h2 class="h-2" data-i18n="tru.h">Nơi Chef Minh<br>đã xuất hiện.</h2>
    </div>
''' + media_grid(limit=3) + '''
    <div style="margin-top:44px" class="reveal">
      <a href="press.html" class="link-arrow" data-i18n="tru.all">Xem tất cả <span class="ar">→</span></a>
    </div>

    <div class="kit reveal">
      <div>
        <h3 class="h-3" data-i18n="tru.kith">Dành cho nhãn hàng và đối tác</h3>
        <p class="small" data-i18n="tru.kits">Hồ sơ năng lực đầy đủ: kinh nghiệm, số liệu độ phủ, các chiến dịch đã thực hiện và hình thức hợp tác.</p>
      </div>
      <a href="#contact" data-need="brand" class="btn btn--solid" data-i18n="tru.kitcta">Nhận hồ sơ năng lực</a>
    </div>
  </div>
</section>

<!-- ================= BLOG ================= -->
<section class="band band--shell" id="blog" data-nav="light">
  <div class="wrap">
    <div class="reveal" style="max-width:620px;margin-bottom:48px">
      <p class="eyebrow" data-i18n="blg.eyebrow">Kiến thức bếp</p>
      <h2 class="h-2" data-i18n="blg.h">Kiến thức bếp,<br>viết cho người muốn hiểu.</h2>
      <p class="lead" data-i18n="blg.lead">Kỹ thuật, nguyên liệu Việt và cách nấu — giải thích bằng ngôn ngữ của người đứng bếp.</p>
    </div>
''' + post_grid() + '''
    <div style="margin-top:44px" class="reveal">
      <a href="blog.html" class="link-arrow" data-i18n="blg.all">Xem tất cả bài viết <span class="ar">→</span></a>
    </div>
  </div>
</section>

''' + contact_section() + '''
</main>
''' + MODAL + footer()


# ============================================================
# KHỐI DÙNG LẠI
# ============================================================
COURSES = [
    ('academy-01.jpg', 'Các món châu Âu — cơ bản',
     'Nền tảng bếp Âu: dao, lửa, nước dùng, sốt mẹ và cách dựng một đĩa ăn hoàn chỉnh.',
     '30 buổi', 'Khai giảng hằng ngày', 'TP. Hồ Chí Minh', '3'),
    ('academy-02.jpg', 'Các món châu Âu — nâng cao',
     'Đi sâu vào kỹ thuật hiện đại, kiểm soát nhiệt, kết cấu và tư duy dựng thực đơn.',
     '90 buổi', 'Khai giảng hằng ngày', 'TP. Hồ Chí Minh', '3'),
]


def course_cards(depth=0, detail=False):
    up = '../' * depth
    out = ['    <div class="reveal">']
    for i, (img, name, desc, dur, start, loc, seats) in enumerate(COURSES, 1):
        out.append(f'''      <article class="course">
        <img src="{up}assets/{img}" alt="{name}" loading="lazy" style="width:100%;aspect-ratio:4/3;object-fit:cover">
        <div>
          <h3 class="h-3" data-i18n="aca.c{i}h">{name}</h3>
          <p class="small" style="margin:0" data-i18n="aca.c{i}s">{desc}</p>
          <ul class="course__meta">
            <li><b data-i18n="aca.dur">Thời lượng:</b> <span data-i18n="aca.c{i}dur">{dur}</span></li>
            <li><b data-i18n="aca.start">Khai giảng:</b> <span data-i18n="aca.c{i}start">{start}</span></li>
            <li><b data-i18n="aca.loc">Địa điểm:</b> <span data-i18n="aca.c{i}loc">{loc}</span></li>
          </ul>
          <span class="seats" data-i18n="aca.c{i}seat">Còn {seats} chỗ</span>
        </div>
        <div class="course__price">
          <p class="course__note" data-i18n="aca.fee2">Học phí trao đổi trực tiếp theo lộ trình từng người.</p>
          <a href="{up}index.html?need=hoc#contact" class="btn btn--solid" data-i18n="aca.detail">Chi tiết</a>
        </div>
      </article>''')
    out.append('    </div>')
    return '\n'.join(out)


MEDIA = [
    ('press-topchef.jpg', 'Truyền hình', 'Top Chef Vietnam 2023',
     'Chef Minh Nguyễn vào tới Top 4 của mùa giải.', ''),
    ('press-award.jpg', 'Giải thưởng', 'Best Master Chef Awards 2024',
     'Chứng nhận trao cho Nguyen Thai Minh, tháng 9/2024.', 'media-card--tall'),
    ('press-sieubep-01.jpg', 'Truyền hình', 'Siêu Bếp — HTV7',
     'Tham gia chương trình Siêu Bếp do TVHub sản xuất.', ''),
    ('press-sieubep-02.jpg', 'Truyền hình', 'Siêu Bếp — phần thi',
     'Một phần thi trong chương trình Siêu Bếp.', ''),
    ('press-digicook.jpg', 'Sự kiện', 'DigiCook — Cặp đôi hoàn hảo Amway Queen',
     'Đồng hành cùng người chơi trong suốt chương trình.', ''),
    ('press-oneriver.jpg', 'Hợp tác', 'One River',
     '[CẦN XÁC NHẬN nội dung hợp tác]', ''),
]


def media_grid(limit=None, depth=0):
    up = '../' * depth
    items = MEDIA[:limit] if limit else MEDIA
    out = ['    <div class="media-grid reveal">']
    for img, cat, title, desc, extra in items:
        out.append(f'''      <article class="media-card {extra}">
        <img src="{up}assets/{img}" alt="{title}" loading="lazy">
        <div class="media-card__body">
          <span class="media-card__cat">{cat}</span>
          <h3>{title}</h3>
          <p>{desc}</p>
          <a href="#" class="link-arrow">Đọc bài viết <span class="ar">→</span></a>
        </div>
      </article>''')
    out.append('    </div>')
    return '\n'.join(out)


POSTS = [
    ('blog/sous-vide.html', 'mon-02-goi-tom-su.jpg', 'Kỹ thuật bếp',
     'Sous vide: nấu bằng nhiệt độ, không nấu bằng thời gian',
     'Vì sao 63°C giữ được thứ mà 100°C phá mất, và khi nào kỹ thuật này thực sự đáng dùng.'),
    ('blog/dry-aging.html', 'mon-03-ca-tuyet.jpg', 'Nguyên liệu',
     'Dry-aging: làm khô có kiểm soát để vị đậm hơn',
     'Nguyên lý đằng sau việc cố tình để nguyên liệu mất nước, và ranh giới giữa chín tới và hỏng.'),
    ('blog/nuoc-dung.html', 'mon-04-nong-heo.jpg', 'Cách nấu',
     'Nước dùng: phần không ai thấy nhưng quyết định cả món',
     'Xương, nhiệt độ, thời gian và lý do nồi nước dùng không bao giờ được sôi bùng.'),
]


def post_grid(depth=0):
    up = '../' * depth
    out = ['    <div class="posts reveal">']
    for link, img, cat, title, sub in POSTS:
        out.append(f'''      <a class="post post-link" href="{up}{link}">
        <img src="{up}assets/{img}" alt="" loading="lazy">
        <span class="post__cat">{cat}</span>
        <h3>{title}</h3>
        <p>{sub}</p>
      </a>''')
    out.append('    </div>')
    return '\n'.join(out)


def contact_section(depth=0):
    up = '../' * depth
    return f'''<!-- ================= LIÊN HỆ ================= -->
<section class="band contact" id="contact">
  <div class="wrap">
    <div class="reveal">
      <h2 class="h-display" style="font-size:clamp(2.4rem,6vw,4.4rem)" data-i18n="con.h">Bắt đầu từ<br>việc của bạn.</h2>
      <p class="lead" style="margin:26px auto 0;text-align:center" data-i18n="con.lead">Chọn đúng nhu cầu để câu hỏi phía sau đi thẳng vào việc.</p>
    </div>

    <div class="contact-grid reveal">
      <div class="contact-grid__left">
        <p class="eyebrow" data-i18n="con.direct">Liên hệ trực tiếp</p>
        <div class="info-row">
          <span class="label" data-i18n="con.email">Email</span>
          <a href="mailto:thaiminhchef@gmail.com">thaiminhchef@gmail.com</a>
        </div>
        <div class="info-row">
          <span class="label" data-i18n="con.tel">Điện thoại</span>
          <span class="v"><a href="tel:+84352118837">0352 118 837</a> &nbsp;·&nbsp; <a href="tel:+84961838367">0961 838 367</a></span>
        </div>
        <div class="info-row">
          <span class="label">Zalo</span>
          <a href="https://zalo.me/0352118837" target="_blank" rel="noopener">0352 118 837</a>
        </div>
        <div class="info-row">
          <span class="label" data-i18n="con.web">Website</span>
          <a href="https://www.chefminhnguyen.com">chefminhnguyen.com</a>
        </div>
        <p class="small" style="margin-top:30px" data-i18n="con.hours">Chef và cộng sự phản hồi trong 24–48 giờ làm việc. Nếu gấp, gọi hoặc nhắn Zalo sẽ nhanh hơn.</p>
      </div>

      <div class="contact-grid__right">
        <form class="form is-open" id="form" novalidate>
          <div class="field">
            <label for="f-need" data-i18n="f.need">Bạn cần gì?</label>
            <select id="f-need" name="need">
              <option value="" data-i18n="f.need0">— Chọn nội dung —</option>
              <option value="hoc" data-i18n="con.r1">Tôi muốn học</option>
              <option value="brand" data-i18n="con.r2">Tôi đại diện một thương hiệu</option>
              <option value="nhahang" data-i18n="con.r3">Tôi có nhà hàng</option>
              <option value="trainghiem" data-i18n="con.r4">Tôi muốn đặt trải nghiệm</option>
            </select>
            <div class="chips" role="group" aria-label="Chọn nhanh">
              <button class="chip" type="button" data-route="hoc" aria-pressed="false" data-i18n="con.r1">Tôi muốn học</button>
              <button class="chip" type="button" data-route="brand" aria-pressed="false" data-i18n="con.r2">Tôi đại diện một thương hiệu</button>
              <button class="chip" type="button" data-route="nhahang" aria-pressed="false" data-i18n="con.r3">Tôi có nhà hàng</button>
              <button class="chip" type="button" data-route="trainghiem" aria-pressed="false" data-i18n="con.r4">Tôi muốn đặt trải nghiệm</button>
            </div>
          </div>

          <div class="form__row">
            <div class="field">
              <label for="f-name" data-i18n="f.name">Họ và tên</label>
              <input id="f-name" name="name" type="text" autocomplete="name" required>
            </div>
            <div class="field">
              <label for="f-phone" data-i18n="f.phone">Số điện thoại</label>
              <input id="f-phone" name="phone" type="tel" autocomplete="tel">
            </div>
          </div>

          <div class="form__row">
            <div class="field">
              <label for="f-email" data-i18n="f.email">Email</label>
              <input id="f-email" name="email" type="email" autocomplete="email" required>
            </div>
            <div class="field">
              <label for="f-zalo" data-i18n="f.zalo">Zalo (nếu có)</label>
              <input id="f-zalo" name="zalo" type="tel">
            </div>
          </div>

          <div class="form__row branch" data-branch="hoc" hidden>
            <div class="field">
              <label for="f-course" data-i18n="f.course">Khóa quan tâm</label>
              <input id="f-course" name="course" type="text">
            </div>
            <div class="field">
              <label for="f-level" data-i18n="f.level">Trình độ hiện tại</label>
              <select id="f-level" name="level">
                <option data-i18n="f.lv1">Chưa có kinh nghiệm</option>
                <option data-i18n="f.lv2">Đang làm bếp</option>
                <option data-i18n="f.lv3">Đã làm nhiều năm</option>
              </select>
            </div>
          </div>

          <div class="form__row branch" data-branch="brand" hidden>
            <div class="field">
              <label for="f-brand" data-i18n="f.brand">Tên thương hiệu</label>
              <input id="f-brand" name="brand" type="text">
            </div>
            <div class="field">
              <label for="f-camp" data-i18n="f.camp">Hình thức hợp tác</label>
              <select id="f-camp" name="campaign">
                <option data-i18n="f.cp1">Chiến dịch truyền thông</option>
                <option data-i18n="f.cp2">Nội dung ẩm thực</option>
                <option data-i18n="f.cp3">Sự kiện</option>
                <option data-i18n="f.cp4">Đại sứ dài hạn</option>
              </select>
            </div>
          </div>

          <div class="form__row branch" data-branch="nhahang" hidden>
            <div class="field">
              <label for="f-type" data-i18n="f.type">Loại hình</label>
              <input id="f-type" name="venue" type="text">
            </div>
            <div class="field">
              <label for="f-stage" data-i18n="f.stage">Giai đoạn</label>
              <select id="f-stage" name="stage">
                <option data-i18n="f.st1">Chuẩn bị mở mới</option>
                <option data-i18n="f.st2">Đang vận hành, cần cải tổ</option>
                <option data-i18n="f.st3">Mở rộng thêm chi nhánh</option>
              </select>
            </div>
          </div>

          <div class="form__row branch" data-branch="trainghiem" hidden>
            <div class="field">
              <label for="f-guests" data-i18n="f.guests">Số khách</label>
              <input id="f-guests" name="guests" type="number" min="1">
            </div>
            <div class="field">
              <label for="f-date" data-i18n="f.date">Ngày mong muốn</label>
              <input id="f-date" name="date" type="date">
            </div>
          </div>

          <div class="field">
            <label for="f-msg" data-i18n="f.msg">Nội dung</label>
            <textarea id="f-msg" name="message"></textarea>
          </div>

          <button type="submit" class="btn btn--solid" data-i18n="f.send">Gửi thông tin</button>
          <p class="form__note" id="form-status" role="status" aria-live="polite"></p>
        </form>
      </div>
    </div>
  </div>
</section>
'''


# ============================================================
# CÁC TRANG CON
# ============================================================
def build_cuisine():
    return head('Ẩm thực — Chef Minh Nguyễn', 'Năm món signature của Chef Minh Nguyễn, mỗi món kèm câu chuyện do chính Chef viết.') \
        + header('cuisine.html') \
        + pagehead('<a href="index.html">Trang chủ</a> / Ẩm thực', 'Ẩm thực',
                   'Món ăn là bằng chứng,<br>không phải thực đơn.',
                   'Năm món, năm vùng đất. Chạm vào từng món để đọc câu chuyện Chef Minh viết cho nó.') + '''
<main>
<section class="band band--shell" data-nav="light">
  <div class="wrap">
''' + dish_grid() + '''
    <div style="margin-top:56px" class="reveal">
      <a href="index.html?need=nhahang#contact" class="link-arrow">Trao đổi về thực đơn của bạn <span class="ar">→</span></a>
    </div>
  </div>
</section>
</main>
''' + MODAL + footer()


def build_the_chef():
    return head('Chef Minh Nguyễn — Hành trình 15 năm', '15 năm nghề bếp của Chef Minh Nguyễn: hành trình, triết lý và thành tích.') \
        + header('the-chef.html') \
        + pagehead('<a href="index.html">Trang chủ</a> / Chef', 'Hành trình',
                   'Nghề bếp học bằng thời gian,<br>không học bằng lối tắt.') + '''
<main>

<section class="band band--dark">
  <div class="wrap">
    <div class="craft reveal">
      <div>
        <div class="craft__num" id="counter">15</div>
        <div class="craft__numlab">Năm theo nghề</div>
      </div>
      <div>
        <p class="draft-note">[CẦN NỘI DUNG TỪ CHEF] Phần tiểu sử và các mốc thời gian bên dưới đang để trống. Cần Chef cung cấp: bắt đầu nghề năm nào, đã làm ở những căn bếp nào, mốc chuyển sang tư vấn và đào tạo.</p>
        <p class="lead">[Đoạn giới thiệu 3–4 câu về Chef Minh Nguyễn, viết bằng lời Chef.]</p>
        <div class="stats">
          <div class="stat"><b>Top 4</b><span>Top Chef Vietnam 2023</span></div>
          <div class="stat"><b>2024</b><span>Best Master Chef Awards</span></div>
          <div class="stat"><b>[Số]</b><span>[Số học viên đã đào tạo — cần số thật]</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="band band--shell" data-nav="light">
  <div class="wrap">
    <p class="eyebrow">Các mốc</p>
    <h2 class="h-2">Từng chặng một.</h2>
    <div class="awards" style="border-color:var(--shell-line)">
      <div class="award-row" style="border-color:var(--shell-line)">
        <b style="color:var(--cinnabar)">[Năm]</b>
        <span style="color:var(--ink-soft)">[Mốc 01 — bắt đầu nghề bếp ở đâu, làm gì]</span>
        <em style="color:var(--shell-line)">Cần bổ sung</em>
      </div>
      <div class="award-row" style="border-color:var(--shell-line)">
        <b style="color:var(--cinnabar)">[Năm]</b>
        <span style="color:var(--ink-soft)">[Mốc 02 — kinh nghiệm quốc tế]</span>
        <em style="color:var(--shell-line)">Cần bổ sung</em>
      </div>
      <div class="award-row" style="border-color:var(--shell-line)">
        <b style="color:var(--cinnabar)">2023</b>
        <span style="color:var(--ink-soft)">Top 4 Top Chef Vietnam</span>
        <em style="color:var(--shell-line)">Đã xác nhận</em>
      </div>
      <div class="award-row" style="border-color:var(--shell-line)">
        <b style="color:var(--cinnabar)">2024</b>
        <span style="color:var(--ink-soft)">Best Master Chef Awards — chứng nhận trao cho Nguyen Thai Minh</span>
        <em style="color:var(--shell-line)">Đã xác nhận</em>
      </div>
      <div class="award-row" style="border-color:var(--shell-line)">
        <b style="color:var(--cinnabar)">Nay</b>
        <span style="color:var(--ink-soft)">Tư vấn ẩm thực · Đào tạo · Private Chef</span>
        <em style="color:var(--shell-line)">Đã xác nhận</em>
      </div>
    </div>
  </div>
</section>

<section class="band band--dark" id="philosophy" style="text-align:center">
  <div class="wrap">
    <div class="stalk-rule reveal" style="margin-bottom:52px">
      <svg viewBox="60 0 80 44" aria-hidden="true"><use href="#stalk"/></svg>
    </div>
    <blockquote class="reveal" style="margin:0 auto;max-width:19ch">
      <p style="font-family:var(--display);font-weight:400;font-size:clamp(1.9rem,4.4vw,3.5rem);line-height:1.24;margin:0;color:var(--shell)">“Ẩm thực Việt không chỉ là món ăn, mà là câu chuyện về văn hóa, con người và vùng đất.”</p>
      <p style="font-size:1rem;line-height:1.8;color:var(--cream-soft);max-width:52ch;margin:34px auto 0">“Tôi muốn giữ được cái hồn Việt trong từng nguyên liệu, đồng thời dùng kỹ thuật và tư duy hiện đại để đưa những giá trị ấy đối thoại với thế giới.”</p>
      <footer style="margin-top:36px"><span class="label">Chef Minh Nguyễn</span></footer>
    </blockquote>
    <div class="stalk-rule reveal" style="margin-top:56px">
      <svg viewBox="60 0 80 44" aria-hidden="true"><use href="#stalk"/></svg>
    </div>
    <div class="reveal" style="margin-top:34px;display:flex;gap:34px;justify-content:center;flex-wrap:wrap">
      <span class="label">Văn hóa</span><span class="label" style="color:var(--gold-dim)">·</span>
      <span class="label">Con người</span><span class="label" style="color:var(--gold-dim)">·</span>
      <span class="label">Vùng đất</span>
    </div>
    <div style="margin-top:52px"><a href="cuisine.html" class="link-arrow">Xem ẩm thực <span class="ar">→</span></a></div>
  </div>
</section>

</main>
''' + footer()


def build_services():
    blocks = [
        ('consulting', 'Tư vấn', 'Dựng bếp, dựng thực đơn, dựng cách vận hành.',
         ['Phát triển thực đơn', 'Setup bếp và nhà hàng', 'Vận hành và huấn luyện đội bếp',
          'Chuẩn hóa công thức và định lượng', 'Kiểm soát chi phí nguyên liệu'],
         'nhahang', 'Trao đổi về nhà hàng của bạn'),
        ('experiences', 'Trải nghiệm', 'Bữa ăn riêng, nấu tại chỗ, thực đơn dựng riêng cho từng bàn.',
         ['Private Chef tại nhà', 'Private Dining', 'Sự kiện riêng và tiệc VIP'],
         'trainghiem', 'Đặt trải nghiệm'),
        ('brand', 'Thương hiệu', 'Đồng hành cùng nhãn hàng bằng chuyên môn bếp, không chỉ bằng hình ảnh.',
         ['Hợp tác nhãn hàng', 'KOC ngành ẩm thực', 'Chiến dịch và nội dung ẩm thực',
          'Phát triển công thức cho sản phẩm'],
         'brand', 'Nhận hồ sơ năng lực'),
    ]
    body = ''
    for i, (bid, title, desc, items, need, cta) in enumerate(blocks):
        shell = ' band--shell" data-nav="light' if i % 2 == 1 else ' band--dark'
        lis = '\n'.join(f'          <li>{x}</li>' for x in items)
        body += f'''
<section class="band{shell}" id="{bid}">
  <div class="wrap">
    <div class="reveal" style="max-width:640px">
      <p class="eyebrow">{title}</p>
      <h2 class="h-2">{desc}</h2>
      <ul style="list-style:none;padding:0;margin:28px 0 34px;max-width:520px">
{lis}
      </ul>
      <a href="index.html?need={need}#contact" class="btn btn--solid">{cta}</a>
    </div>
  </div>
</section>
'''
    body = body.replace('<li>', '<li style="padding:12px 0 12px 20px;position:relative;border-bottom:1px solid rgba(198,166,100,.14)">')
    return head('Dịch vụ — Chef Minh Nguyễn', 'Tư vấn nhà hàng, private dining và hợp tác thương hiệu cùng Chef Minh Nguyễn.') \
        + header('services.html') \
        + pagehead('<a href="index.html">Trang chủ</a> / Dịch vụ', 'Dịch vụ',
                   'Bốn cách để làm việc<br>cùng Chef Minh.') \
        + '<main>' + body + '''
<section class="band band--raised">
  <div class="wrap" style="text-align:center">
    <p class="eyebrow" style="justify-content:center">Đào tạo</p>
    <h2 class="h-2">Trụ thứ tư có trang riêng.</h2>
    <p class="lead" style="margin:0 auto 30px">Các khóa học, lịch khai giảng và số chỗ còn lại nằm ở trang Academy.</p>
    <a href="academy.html" class="btn">Xem Academy</a>
  </div>
</section>
</main>
''' + footer()


def build_academy():
    return head('Academy — Học cùng Chef Minh Nguyễn', 'Các khóa học bếp Âu cơ bản và nâng cao cùng Chef Minh Nguyễn tại TP. Hồ Chí Minh.') \
        + header('academy.html') \
        + pagehead('<a href="index.html">Trang chủ</a> / Academy', 'Academy',
                   'Học cùng Chef Minh.',
                   'Lớp giới hạn số người để mỗi học viên đều được đứng bếp thật.') + '''
<main>
<section class="band band--shell" data-nav="light">
  <div class="wrap">
''' + course_cards() + '''
    <div class="reveal" style="margin-top:56px;max-width:640px">
      <h3 class="h-3">Cách đăng ký</h3>
      <p class="small">Bấm <b>Chi tiết</b> ở khóa bạn quan tâm. Form sẽ mở sẵn ở mục “Tôi muốn học”, chỉ cần điền tên và cách liên hệ. Chef hoặc cộng sự sẽ gọi lại để trao đổi lộ trình và học phí phù hợp với trình độ của bạn.</p>
    </div>
  </div>
</section>
</main>
''' + footer()


def build_press():
    return head('Truyền thông & thành tích — Chef Minh Nguyễn', 'Các chương trình truyền hình, giải thưởng và hoạt động Chef Minh Nguyễn đã tham gia.') \
        + header('press.html') \
        + pagehead('<a href="index.html">Trang chủ</a> / Truyền thông', 'Truyền thông &amp; thành tích',
                   'Nơi Chef Minh<br>đã xuất hiện.') + '''
<main>
<section class="band band--dark">
  <div class="wrap">
    <p class="draft-note">[CẦN LINK] Các nút “Đọc bài viết” đang tạm khoá vì chưa có đường dẫn bài báo thật. Gửi URL cụ thể của từng bài, mình gắn vào là mở khoá ngay.</p>
''' + media_grid() + '''

    <div class="awards reveal">
      <p class="eyebrow" style="margin-top:44px">Thành tích</p>
      <div class="award-row">
        <b>2023</b><span>Top 4 — Top Chef Vietnam</span><em>Truyền hình</em>
      </div>
      <div class="award-row">
        <b>2024</b><span>Best Master Chef Awards — chứng nhận trao cho Nguyen Thai Minh, tháng 9/2024</span><em>Giải thưởng</em>
      </div>
      <div class="award-row">
        <b>[Năm]</b><span>[Thành tích khác — cần Chef bổ sung]</span><em>Cần bổ sung</em>
      </div>
    </div>

    <div class="kit reveal">
      <div>
        <h3 class="h-3">Dành cho nhãn hàng và đối tác</h3>
        <p class="small">Hồ sơ năng lực đầy đủ: kinh nghiệm, số liệu độ phủ, các chiến dịch đã thực hiện và hình thức hợp tác.</p>
      </div>
      <a href="index.html?need=brand#contact" class="btn btn--solid">Nhận hồ sơ năng lực</a>
    </div>
  </div>
</section>
</main>
''' + footer()


def build_blog():
    return head('Kiến thức bếp — Chef Minh Nguyễn', 'Kỹ thuật bếp, nguyên liệu và cách nấu, giải thích bằng ngôn ngữ của người đứng bếp.') \
        + header('blog.html') \
        + pagehead('<a href="index.html">Trang chủ</a> / Blog', 'Kiến thức bếp',
                   'Kiến thức bếp,<br>viết cho người muốn hiểu.',
                   'Kỹ thuật, nguyên liệu Việt và cách nấu — giải thích bằng ngôn ngữ của người đứng bếp.') + '''
<main>
<section class="band band--shell" data-nav="light">
  <div class="wrap">
''' + post_grid() + '''
  </div>
</section>
</main>
''' + footer()


# ============================================================
# BÀI VIẾT BLOG
# ============================================================
def article_page(slug, cat, title, sub, img, body_html, prev_next):
    return head(f'{title} — Chef Minh Nguyễn', sub, depth=1) \
        + header('blog.html', depth=1) \
        + f'''<section class="pagehead">
  <div class="wrap">
    <p class="crumb"><a href="../index.html">Trang chủ</a> / <a href="../blog.html">Kiến thức bếp</a></p>
    <p class="eyebrow">{cat}</p>
    <h1 class="h-display" style="font-size:clamp(2rem,4.4vw,3.2rem);max-width:20ch">{title}</h1>
    <p class="lead">{sub}</p>
    <p class="article__meta"><span>Chef Minh Nguyễn</span><span>Kiến thức bếp</span></p>
  </div>
</section>

<main>
<section class="band band--shell" data-nav="light">
  <div class="wrap">
    <img src="../assets/{img}" alt="" style="width:100%;aspect-ratio:21/9;object-fit:cover;margin-bottom:48px" loading="lazy">
    <div class="article">
      <p class="draft-note">[CẦN CHEF DUYỆT] Bài này do bên thiết kế soạn từ kiến thức bếp chuyên nghiệp phổ thông, dùng làm bản nháp. Chef cần đọc, sửa theo kinh nghiệm thực tế và duyệt trước khi đăng dưới tên mình. Xoá đoạn này sau khi duyệt.</p>
{body_html}
    </div>

    <div style="margin-top:64px;padding-top:34px;border-top:1px solid var(--shell-line);display:flex;gap:28px;flex-wrap:wrap;justify-content:space-between">
      <a href="../blog.html" class="link-arrow">Tất cả bài viết <span class="ar">→</span></a>
      <a href="{prev_next[0]}" class="link-arrow">{prev_next[1]} <span class="ar">→</span></a>
    </div>
  </div>
</section>
</main>
''' + footer(depth=1)


SOUS_VIDE = '''      <p>Trong bếp truyền thống, chúng ta điều khiển món ăn bằng thời gian: chiên năm phút, hầm hai tiếng. Nhiệt độ thì gần như không kiểm soát được — chảo có thể 180°C hoặc 240°C tuỳ hôm. Sous vide đảo ngược chuyện đó. Nó cố định nhiệt độ, và biến thời gian thành thứ ít quan trọng hơn.</p>

      <h2>Nguyên lý: mỗi loại protein hỏng ở một mốc nhiệt khác nhau</h2>
      <p>Thịt không "chín" ở một điểm duy nhất. Các nhóm protein biến tính lần lượt ở những mốc khác nhau, và chính thứ tự đó quyết định miếng thịt mềm hay khô.</p>
      <ul>
        <li><b>Khoảng 50°C</b> — myosin bắt đầu đông lại. Thịt chuyển từ trong sang đục, giữ nguyên độ mọng.</li>
        <li><b>Khoảng 60–65°C</b> — collagen bắt đầu tan thành gelatin. Đây là lý do phần thịt nhiều gân trở nên mềm khi nấu lâu ở mốc này.</li>
        <li><b>Trên 68°C</b> — actin biến tính và co mạnh, ép nước ra khỏi sợi cơ. Đây là điểm miếng thịt bắt đầu khô, và không có cách nào cứu lại.</li>
      </ul>
      <p>Nấu bằng chảo hay lò nghĩa là bề mặt vượt xa 68°C từ lâu trước khi lõi đạt tới nhiệt độ mong muốn. Kết quả là một lát cắt có gradient: viền ngoài xám và khô, lõi giữa mới đúng độ. Sous vide đặt toàn bộ miếng thịt vào một môi trường đúng bằng nhiệt độ đích, nên không phần nào vượt quá.</p>

      <h2>Vì sao phải hút chân không</h2>
      <p>Túi hút chân không không phải để "giữ hương vị" như nhiều người nói. Nó có hai việc kỹ thuật rõ ràng: đẩy hết không khí ra để nguyên liệu tiếp xúc trực tiếp với nước — không khí dẫn nhiệt kém hơn nước rất nhiều — và giữ cho túi chìm thay vì nổi lên.</p>

      <h2>Thời gian: quyết định bởi độ dày, không phải khối lượng</h2>
      <p>Một sai lầm phổ biến là tính thời gian theo cân nặng. Nhiệt truyền theo chiều dày, nên một miếng thịt 2kg dẹt sẽ chín nhanh hơn một khối 1kg dày. Quy tắc thực tế: thời gian để lõi đạt nhiệt tăng theo bình phương độ dày. Gấp đôi độ dày thì mất khoảng bốn lần thời gian.</p>
      <p>Sau khi lõi đã đạt nhiệt, thời gian thêm không làm thịt chín hơn — nó làm collagen tan thêm. Đó là lý do một số phần thịt dai được nấu 24 đến 48 giờ ở nhiệt độ thấp.</p>

      <h2>Bước không được bỏ: áp chảo sau</h2>
      <p>Sous vide không tạo được lớp vỏ. Phản ứng Maillard — thứ tạo màu nâu và hàng trăm hợp chất thơm — cần nhiệt độ trên 140°C và bề mặt khô. Vì vậy quy trình đầy đủ luôn là: nấu chậm để kiểm soát lõi, lau thật khô bề mặt, rồi áp chảo cực nhanh ở lửa lớn.</p>
      <p>Lau khô là bước hay bị bỏ qua và cũng là bước quyết định. Bề mặt còn ẩm thì toàn bộ năng lượng của chảo sẽ dùng để bốc hơi nước thay vì tạo vỏ, và trong lúc chờ, lõi thịt tiếp tục chín quá mức.</p>

      <h2>Rủi ro an toàn thực phẩm</h2>
      <p>Đây là phần nghiêm túc nhất và cũng hay bị xem nhẹ nhất. Khoảng 5°C đến 55°C là vùng vi khuẩn sinh sôi nhanh. Sous vide thường vận hành ngay sát mép trên của vùng đó.</p>
      <div class="callout">Diệt khuẩn là kết hợp giữa nhiệt độ <b>và</b> thời gian giữ. Ở 55°C cần rất lâu; ở 60°C nhanh hơn nhiều. Nấu ở nhiệt độ thấp mà rút ngắn thời gian là rủi ro thật, không phải lý thuyết.</div>
      <p>Ba nguyên tắc bắt buộc trong bếp chuyên nghiệp: dùng nguyên liệu tươi và bảo quản lạnh đúng cách; đạt đủ thời gian giữ nhiệt tương ứng với nhiệt độ đã chọn; và nếu không phục vụ ngay thì làm lạnh nhanh trong nước đá rồi trữ lạnh, không để nguội tự nhiên ở nhiệt độ phòng.</p>

      <h2>Khi nào không nên dùng sous vide</h2>
      <p>Kỹ thuật này không phải lúc nào cũng tốt hơn. Nó vô nghĩa với những món mà giá trị nằm ở lớp vỏ và độ tương phản kết cấu — đồ chiên giòn, đồ nướng than. Nó cũng không cứu được nguyên liệu kém: sous vide giữ nguyên bản chất nguyên liệu, nên nguyên liệu nhạt sẽ cho ra món nhạt, chỉ mềm hơn.</p>
      <p>Nơi nó thật sự đáng dùng là khi cần độ chính xác lặp lại: một nhà hàng phải cho ra hai trăm phần giống hệt nhau, hoặc một phần thịt đắt tiền mà không được phép nấu hỏng.</p>
'''

DRY_AGING = '''      <p>Nghe qua thì vô lý: cố tình để một nguyên liệu đắt tiền mất nước và mất khối lượng, chấp nhận phải cắt bỏ phần ngoài, để đổi lấy cái gì? Câu trả lời nằm ở ba quá trình xảy ra song song trong lúc đó.</p>

      <h2>Ba việc xảy ra cùng lúc</h2>
      <h3>1. Mất nước làm vị cô đặc lại</h3>
      <p>Đây là phần dễ hiểu nhất. Nước bay hơi khỏi bề mặt và dần rút ra từ bên trong. Cùng một lượng hợp chất tạo vị nhưng nằm trong ít nước hơn, nên mỗi miếng cắn đậm hơn. Với thịt bò, mức hao hụt có thể lên tới một phần ba khối lượng.</p>

      <h3>2. Enzyme tự phân giải cấu trúc</h3>
      <p>Đây mới là phần quan trọng. Các enzyme vốn có sẵn trong mô — nhóm calpain và cathepsin — tiếp tục hoạt động sau khi con vật chết. Chúng cắt các protein dài thành mảnh ngắn hơn, làm sợi cơ lỏng ra. Kết quả là thịt mềm hơn theo cách mà không kỹ thuật nấu nào tạo được.</p>
      <p>Cùng lúc đó, protein bị cắt thành các axit amin tự do, trong đó có glutamate — nguồn gốc trực tiếp của vị umami. Mỡ cũng bị phân giải một phần thành axit béo, tạo ra hương thơm sâu, hơi hạt, hơi phô mai.</p>

      <h3>3. Vi sinh vật bề mặt</h3>
      <p>Trong phòng ủ có kiểm soát, một lớp nấm mốc lành tính hình thành trên bề mặt. Lớp này vừa bảo vệ phần thịt bên trong khỏi vi sinh vật gây hỏng, vừa đóng góp vào hương. Phần vỏ ngoài này sẽ bị gọt bỏ trước khi chế biến.</p>

      <h2>Điều kiện: bốn thông số không được sai</h2>
      <ul>
        <li><b>Nhiệt độ</b> — khoảng 1–3°C. Cao hơn thì vi khuẩn gây hỏng thắng; thấp hơn thì enzyme gần như ngừng hoạt động.</li>
        <li><b>Độ ẩm</b> — khoảng 80–85%. Quá khô thì lớp vỏ cứng lại quá nhanh và chặn quá trình bên trong; quá ẩm thì mốc xấu phát triển.</li>
        <li><b>Luồng khí</b> — phải liên tục và nhẹ. Không khí tù đọng là điều kiện lý tưởng cho vi khuẩn kỵ khí.</li>
        <li><b>Thời gian</b> — 21 đến 28 ngày là khoảng phổ biến với thịt bò. Sau 45 ngày, hương phô mai và hạt trở nên rất mạnh, không phải khẩu vị của mọi người.</li>
      </ul>

      <h2>Với cá thì khác</h2>
      <p>Cá dry-age theo thang thời gian hoàn toàn khác — thường tính bằng ngày chứ không phải tuần, và ở độ ẩm thấp hơn. Mục tiêu cũng khác: chủ yếu là loại bớt nước để thịt săn chắc và da giòn được khi áp chảo, chứ không nhắm tới hương lên men mạnh.</p>
      <p>Cá cũng phải được xử lý sạch triệt để trước khi ủ — bỏ mang, bỏ nội tạng, lau khô hoàn toàn. Một sai sót nhỏ ở bước này sẽ hỏng cả mẻ.</p>

      <div class="callout">Ranh giới giữa dry-aging và thịt hỏng nằm ở chỗ có kiểm soát hay không. Không có tủ chuyên dụng, không có nhiệt kế và ẩm kế, thì đó không phải kỹ thuật — đó là để thịt hỏng có chủ đích.</div>

      <h2>Cái giá phải trả</h2>
      <p>Hao hụt 20–35% khối lượng, cộng với phần vỏ phải gọt bỏ. Cần thiết bị riêng và không gian riêng. Cần thời gian, nghĩa là cần vốn nằm chờ. Với một nhà hàng, đây là quyết định tài chính trước khi là quyết định ẩm thực — phải tính được giá bán có gánh nổi phần hao hụt đó không.</p>
'''

NUOC_DUNG = '''      <p>Khách không bao giờ gọi một bát nước dùng. Nhưng nếu nước dùng nhạt, mọi món sốt trong bếp đều nhạt theo, và không có gia vị nào chữa được. Đây là phần hạ tầng của bếp — không ai thấy, nhưng mọi thứ đứng trên nó.</p>

      <h2>Nước dùng làm được gì mà nước lã không làm được</h2>
      <p>Ba thứ: gelatin, hợp chất thơm và vị umami nền.</p>
      <p>Gelatin đến từ collagen trong xương và mô liên kết. Đây là thứ tạo cảm giác đầy đặn, hơi dính môi, và là lý do một món sốt tốt bám được vào thìa. Không có gelatin, sốt chỉ là nước có màu, dù có cô đặc bao nhiêu đi nữa.</p>

      <h2>Xương: chọn loại nào</h2>
      <ul>
        <li><b>Xương khớp, chân, đuôi</b> — nhiều collagen nhất. Đây là nguồn gelatin chính.</li>
        <li><b>Xương ống</b> — cho tuỷ và vị béo, nhưng ít collagen hơn nhiều người tưởng.</li>
        <li><b>Xương có dính thịt</b> — cho vị, nhưng cũng cho nhiều bọt đục hơn.</li>
      </ul>
      <p>Tỷ lệ thực tế trong bếp: khoảng một phần xương với hai phần nước tính theo khối lượng. Ít nước hơn thì cô đặc nhưng dễ cháy đáy; nhiều nước hơn thì phải nấu lâu để cô lại, và càng lâu càng dễ đục.</p>

      <h2>Trắng hay nâu: một bước duy nhất tạo khác biệt</h2>
      <p>Nước dùng trắng thì xương vào nồi ngay. Nước dùng nâu thì xương được nướng trước ở nhiệt cao cho tới khi ngả nâu sâu. Phản ứng Maillard trên bề mặt xương tạo ra hàng trăm hợp chất thơm không tồn tại trong nước dùng trắng, và cũng cho màu.</p>
      <p>Rau củ nền — hành tây, cà rốt, cần tây — cũng nên được xử lý tương ứng: để sống cho nước dùng trắng, xào hoặc nướng ngả nâu cho nước dùng nâu.</p>

      <h2>Nguyên tắc quan trọng nhất: không được sôi bùng</h2>
      <p>Nồi nước dùng phải giữ ở trạng thái lăn tăn — bề mặt chỉ khẽ động, thỉnh thoảng nổi một bong bóng. Khoảng 85–95°C.</p>
      <p>Lý do rất cụ thể. Khi nước sôi mạnh, chuyển động cơ học đánh nhỏ các hạt mỡ và protein đông tụ, phân tán chúng thành nhũ tương lơ lửng. Nước dùng đục vĩnh viễn, và không lọc được nữa. Nước dùng đã đục thì chỉ còn cách làm trong bằng lòng trắng trứng — một quy trình tốn công và làm mất bớt hương.</p>
      <div class="callout">Vớt bọt liên tục trong nửa giờ đầu. Đó là lúc phần lớn protein đông tụ và tạp chất nổi lên. Bỏ qua bước này thì chúng sẽ tan trở lại vào nồi.</div>

      <h2>Thời gian: nhiều hơn không phải lúc nào cũng tốt hơn</h2>
      <ul>
        <li><b>Cá</b> — 20 đến 45 phút. Nấu lâu hơn sẽ ra vị đắng và tanh từ xương.</li>
        <li><b>Gà</b> — 3 đến 4 giờ.</li>
        <li><b>Bò, bê</b> — 6 đến 8 giờ, có nơi làm tới 12.</li>
      </ul>
      <p>Sau mốc tối ưu, collagen đã tan hết còn các hợp chất thơm bắt đầu phân huỷ. Nồi nước dùng nấu 24 giờ không đậm gấp đôi nồi 12 giờ — nó chỉ ngả sang vị xương và vị kim loại.</p>

      <h2>Sai lầm hay gặp</h2>
      <ul>
        <li><b>Cho muối từ đầu.</b> Nước dùng sẽ được cô đặc ở các bước sau. Muối không bay hơi, nên món sốt cuối cùng sẽ mặn không thể sửa. Nêm ở bước cuối, không bao giờ ở bước đầu.</li>
        <li><b>Đậy kín vung.</b> Hơi nước ngưng tụ rơi ngược xuống mang theo mùi hăng. Để hé vung.</li>
        <li><b>Khuấy.</b> Không có lý do gì để khuấy nồi nước dùng. Khuấy chỉ làm đục.</li>
        <li><b>Để nguội tự nhiên qua đêm.</b> Một nồi lớn mất rất nhiều giờ để đi qua vùng nhiệt độ nguy hiểm. Làm lạnh nhanh bằng nước đá rồi mới cho vào tủ.</li>
      </ul>

      <h2>Cách kiểm tra</h2>
      <p>Cho một ít nước dùng vào chén, để lạnh. Nước dùng tốt sẽ đông lại thành thạch mềm — đó là bằng chứng có đủ gelatin. Nếu vẫn lỏng như nước, mẻ đó thiếu collagen: lần sau tăng tỷ lệ xương khớp, hoặc giảm lượng nước.</p>
'''


def build_articles():
    os.makedirs('blog', exist_ok=True)
    arts = [
        ('sous-vide.html', 'Kỹ thuật bếp',
         'Sous vide: nấu bằng nhiệt độ, không nấu bằng thời gian',
         'Vì sao 63°C giữ được thứ mà 100°C phá mất, và khi nào kỹ thuật này thực sự đáng dùng.',
         'mon-02-goi-tom-su.jpg', SOUS_VIDE, ('dry-aging.html', 'Bài tiếp: Dry-aging')),
        ('dry-aging.html', 'Nguyên liệu',
         'Dry-aging: làm khô có kiểm soát để vị đậm hơn',
         'Nguyên lý đằng sau việc cố tình để nguyên liệu mất nước, và ranh giới giữa chín tới và hỏng.',
         'mon-03-ca-tuyet.jpg', DRY_AGING, ('nuoc-dung.html', 'Bài tiếp: Nước dùng')),
        ('nuoc-dung.html', 'Cách nấu',
         'Nước dùng: phần không ai thấy nhưng quyết định cả món',
         'Xương, nhiệt độ, thời gian và lý do nồi nước dùng không bao giờ được sôi bùng.',
         'mon-04-nong-heo.jpg', NUOC_DUNG, ('sous-vide.html', 'Bài tiếp: Sous vide')),
    ]
    for slug, cat, title, sub, img, body, pn in arts:
        open('blog/' + slug, 'w', encoding='utf-8').write(
            article_page(slug, cat, title, sub, img, body, pn))
    return [a[0] for a in arts]


# ============================================================
# CHẠY
# ============================================================
if __name__ == '__main__':
    pages = {
        'index.html': build_index(),
        'the-chef.html': build_the_chef(),
        'cuisine.html': build_cuisine(),
        'services.html': build_services(),
        'academy.html': build_academy(),
        'press.html': build_press(),
        'blog.html': build_blog(),
    }
    for name, html in pages.items():
        open(name, 'w', encoding='utf-8').write(html)
        print('✓', name, len(html) // 1024, 'KB')
    for a in build_articles():
        print('✓ blog/' + a)


def build_404():
    return head('Không tìm thấy trang — Chef Minh Nguyễn', 'Trang bạn tìm không tồn tại.') \
        + header() + '''
<main>
<section class="band band--dark" style="min-height:64vh;display:flex;align-items:center;text-align:center">
  <div class="wrap">
    <p class="eyebrow" style="justify-content:center">404</p>
    <h1 class="h-display" style="font-size:clamp(2.4rem,6vw,4.4rem)">Món này<br>không có trong thực đơn.</h1>
    <p class="lead" style="margin:26px auto 38px">Đường dẫn bạn vừa mở không tồn tại hoặc đã đổi tên.</p>
    <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">
      <a href="index.html" class="btn btn--solid">Về trang chủ</a>
      <a href="cuisine.html" class="btn">Xem ẩm thực</a>
    </div>
  </div>
</section>
</main>
''' + footer()


open('404.html', 'w', encoding='utf-8').write(build_404())
print('✓ 404.html')

SITE = 'https://www.chefminhnguyen.com/'
urls = ['', 'the-chef.html', 'cuisine.html', 'services.html', 'academy.html',
        'press.html', 'blog.html', 'blog/sous-vide.html', 'blog/dry-aging.html', 'blog/nuoc-dung.html']
sm = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
for u in urls:
    pr = '1.0' if u == '' else ('0.8' if '/' not in u else '0.6')
    sm += '  <url><loc>%s%s</loc><priority>%s</priority></url>\n' % (SITE, u, pr)
sm += '</urlset>\n'
open('sitemap.xml', 'w', encoding='utf-8').write(sm)
open('robots.txt', 'w', encoding='utf-8').write(
    'User-agent: *\nAllow: /\n\nSitemap: %ssitemap.xml\n' % SITE)
open('CNAME', 'w', encoding='utf-8').write('chefminhnguyen.com\n')
open('.nojekyll', 'w', encoding='utf-8').write('')
print('✓ sitemap.xml, robots.txt, CNAME, .nojekyll')
