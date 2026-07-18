"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const virtues = [
  ["๐๑", "มีคุณธรรม จริยธรรม", "ยึดมั่นในหลักธรรม มีความกตัญญู และร่วมกิจกรรมทางพระพุทธศาสนาอย่างสม่ำเสมอ", "image24.jpeg"],
  ["๐๒", "มีระเบียบวินัย", "แต่งกายเรียบร้อย เคารพกฎของโรงเรียน และปฏิบัติตามกฎจราจรเพื่อความปลอดภัย", "image18.jpeg"],
  ["๐๓", "มีจิตสำนึกที่ดี", "ร่วมกิจกรรมจิตอาสาและการแสดงเฉลิมพระเกียรติ เพื่อประโยชน์ของชุมชนและสังคม", "image21.jpeg"],
  ["๐๔", "รักการเรียนรู้ในสิ่งที่ดี", "พัฒนาตนเองผ่านการอบรมภาษาอังกฤษ ฟ้อนเล็บ และเรียนรู้ศิลปวัฒนธรรมล้านนา", "image28.jpeg"],
  ["๐๕", "รักและห่วงใยครอบครัว", "ใช้เวลาร่วมกับครอบครัว รับฟัง ช่วยเหลือ และสร้างความอบอุ่นในทุกโอกาส", "image34.jpeg"],
  ["๐๖", "รักความเป็นไทย", "สืบสานดนตรีพื้นเมือง รำไทย และวัฒนธรรมล้านนาผ่านเวทีและงานประเพณี", "image42.jpeg"],
  ["๐๗", "สุขภาพกายและใจดี", "ออกกำลังกายอย่างสม่ำเสมอ ร่าเริง มองโลกในแง่ดี และสร้างพลังบวกให้คนรอบข้าง", "image52.jpeg"],
  ["๐๘", "วิถีประชาธิปไตย", "เคารพความคิดเห็นผู้อื่น ทำงานเป็นทีม และมีส่วนร่วมในกิจกรรมโรงเรียนและชุมชน", "image55.jpeg"],
  ["๐๙", "ห่างไกลอบายมุข", "ใช้เวลาว่างอย่างสร้างสรรค์ และร่วมกิจกรรมต่อต้านสารเสพติดของสถานศึกษา", "image63.jpeg"],
];

const awards = [
  ["image5.jpeg", "เหรียญทองมารยาทไทย", "วันการศึกษาเอกชนภาคเหนือ ครั้งที่ ๑๑"],
  ["image9.jpeg", "เยาวชนดีเด่นเชียงใหม่", "ด้านการสร้างชื่อเสียง ประจำปี ๒๕๖๘"],
  ["image10.jpeg", "เยาวชนดีเด่น", "ด้านศิลปวัฒนธรรม จังหวัดเชียงใหม่"],
  ["image12.jpeg", "เด็กและเยาวชนดีเด่น", "ด้านอนุรักษ์ศิลปวัฒนธรรมไทย"],
  ["image15.jpeg", "รางวัลเชิดชูเกียรติ", "เยาวชนผู้อนุรักษ์และสืบสานมรดกไทย"],
];

const gallery = [
  [21, "กิจกรรมจิตอาสากับคณะเยาวชน"], [22, "กิจกรรมกลุ่มเยาวชนในชุมชน"],
  [23, "ร่วมกิจกรรมกลางแจ้งกับเพื่อน"], [24, "กิจกรรมบำเพ็ญประโยชน์"],
  [25, "เข้าร่วมกิจกรรมเพื่อสังคม"], [26, "ถ่ายภาพหมู่หลังทำกิจกรรม"],
  [28, "ฝึกฟ้อนเล็บในงานวัฒนธรรม"], [29, "แสดงฟ้อนเล็บร่วมกับคณะ"],
  [31, "ใช้เวลาร่วมกับครอบครัว"], [33, "เรียนรู้วิถีชุมชน"],
  [34, "ทำกิจกรรมพักผ่อนกับครอบครัว"], [35, "แต่งกายชุดไทยในงานประเพณี"],
  [36, "ร่วมงานวัฒนธรรมล้านนา"], [38, "การแสดงศิลปวัฒนธรรมไทย"],
  [39, "ร่วมขบวนในชุดวัฒนธรรม"], [41, "บรรเลงดนตรีพื้นเมือง"],
  [42, "แสดงดนตรีไทยบนเวที"], [43, "ร่วมวงดนตรีในงานกิจกรรม"],
  [44, "ภาพหมู่นักดนตรีเยาวชน"], [45, "แสดงบนเวทีงานวัฒนธรรม"],
  [46, "การแสดงบนเวทีกลางคืน"], [48, "คณะนักเรียนร่วมกิจกรรมโรงเรียน"],
  [49, "ร่วมงานประเพณีในชุมชน"], [50, "ภาพหมู่กิจกรรมยามค่ำคืน"],
  [51, "ร่วมการแข่งขันกีฬาสำหรับเยาวชน"], [52, "วิ่งออกกำลังกายกับเพื่อน"],
  [53, "ทัศนศึกษานอกสถานที่"], [54, "รำไทยในงานโรงเรียน"],
  [55, "กิจกรรมการแสดงร่วมกับนักเรียน"], [56, "การแสดงนาฏศิลป์ไทย"],
  [62, "การแสดงในเทศกาลพิพิธภัณฑ์ยามค่ำคืน"], [63, "ร่วมกิจกรรมวันสำคัญของโรงเรียน"],
].map(([number, alt], index) => ({
  src: `image${number}.jpeg`,
  alt,
  category: index < 6 ? "community" : index < 10 ? "family" : index < 16 ? "culture" : index < 24 ? "music" : "activity",
}));

const galleryFilters = [
  ["all", "ทั้งหมด"], ["culture", "วัฒนธรรม"], ["music", "ดนตรีและการแสดง"],
  ["community", "จิตอาสา"], ["family", "ครอบครัว"], ["activity", "กิจกรรม"],
];

export default function Home() {
  const [virtue, setVirtue] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [menu, setMenu] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("top");
  const [galleryFilter, setGalleryFilter] = useState("all");
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lightboxTriggerRef = useRef<HTMLButtonElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const current = useMemo(() => virtues[virtue], [virtue]);
  const filteredGallery = useMemo(() => galleryFilter === "all" ? gallery : gallery.filter(image => image.category === galleryFilter), [galleryFilter]);
  const lightboxOpen = lightbox !== null;

  useEffect(() => {
    const reveal = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("is-visible")), { threshold: .12 });
    document.querySelectorAll(".reveal").forEach(el => reveal.observe(el));
    const onScroll = () => {
      setShowTop(window.scrollY > 650);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0);
      const sections = ["top", "story", "awards", "virtues", "gallery"];
      const currentSection = [...sections].reverse().find(id => {
        const element = document.getElementById(id);
        return element ? window.scrollY + window.innerHeight * .32 >= element.offsetTop : false;
      });
      if (currentSection) setActiveSection(currentSection);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { reveal.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox(i => i === null ? 0 : (i + 1) % gallery.length);
      if (e.key === "ArrowLeft") setLightbox(i => i === null ? 0 : (i - 1 + gallery.length) % gallery.length);
      if (e.key === "Tab") {
        const focusable = lightboxRef.current?.querySelectorAll<HTMLButtonElement>("button");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    window.addEventListener("keydown", key);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", key); lightboxTriggerRef.current?.focus(); };
  }, [lightboxOpen]);

  useEffect(() => {
    const main = mainRef.current;
    if (!main || window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const followPointer = (event: PointerEvent) => {
      main.style.setProperty("--pointer-x", `${event.clientX}px`);
      main.style.setProperty("--pointer-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", followPointer, { passive: true });
    return () => window.removeEventListener("pointermove", followPointer);
  }, []);

  return <main ref={mainRef}>
    <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }} aria-hidden="true"/>
    <nav className="nav" aria-label="เมนูหลัก">
      <a className="brand" href="#top"><img src="/portfolio/image1.png" alt="ตราคนดีศรีเชียงใหม่" width={42} height={42}/><span>สายรุ้ง</span></a>
      <button className="menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="เปิดเมนู">{menu ? "×" : "☰"}</button>
      <div className={`nav-links ${menu ? "open" : ""}`} onClick={() => setMenu(false)}>
        <a className={activeSection === "story" ? "active" : ""} href="#story">เรื่องราว</a><a className={activeSection === "awards" ? "active" : ""} href="#awards">รางวัล</a><a className={activeSection === "virtues" ? "active" : ""} href="#virtues">คุณธรรม</a><a className={activeSection === "gallery" ? "active" : ""} href="#gallery">ภาพกิจกรรม</a>
      </div>
    </nav>

    <header className="hero" id="top">
      <div className="hero-copy reveal">
        <p className="eyebrow">บุคคลต้นแบบคนดีศรีเชียงใหม่ · ๒๕๖๙</p>
        <h1>รุ้งกานฎา<br/><em>จีนา</em></h1>
        <p className="hero-lead">เด็กหญิงผู้ใช้ศิลปะ วัฒนธรรม และหัวใจจิตอาสา สร้างสีสันที่งดงามให้เชียงใหม่</p>
        <div className="hero-actions"><a className="button primary" href="#story">รู้จักสายรุ้ง</a><a className="button ghost" href="#gallery">ชมผลงาน ↓</a></div>
      </div>
      <div className="hero-visual reveal">
        <div className="portrait-frame"><img src="/portfolio/image2.jpeg" alt="เด็กหญิงรุ้งกานฎา จีนา"/></div>
        <div className="skill-chip chip-music">ดนตรีพื้นเมือง</div>
        <div className="skill-chip chip-dance">รำไทย</div>
        <div className="skill-chip chip-volunteer">จิตอาสา</div>
        <div className="orbit-note"><b>๙</b><span>คุณธรรม<br/>นำทางชีวิต</span></div>
        <p className="vertical-word">CHIANG MAI · GOOD YOUTH</p>
      </div>
      <div className="hero-marquee"><span>มุ่งมั่น · ตั้งมั่น · ทำให้สำเร็จ · มุ่งมั่น · ตั้งมั่น · ทำให้สำเร็จ · </span></div>
      <a className="scroll-cue" href="#story" aria-label="เลื่อนลงดูเรื่องราว"><span></span><small>เลื่อนเพื่อชมเรื่องราว</small></a>
    </header>

    <section className="story section" id="story">
      <div className="section-label reveal"><span>๐๑</span><p>เรื่องราวของสายรุ้ง</p></div>
      <div className="story-grid reveal">
        <h2>เติบโตด้วย<br/><i>รากวัฒนธรรม</i></h2>
        <div><p className="large-copy">“สายรุ้ง” นักเรียนชั้นมัธยมศึกษาปีที่ ๑ แห่งโรงเรียนเทพบดินทร์วิทยาเชียงใหม่ ผู้รักดนตรีพื้นเมือง รำไทย และการแสดง</p><p>จากความสนใจเล็ก ๆ สู่การลงมือทำอย่างต่อเนื่อง เธอร่วมสืบสานศิลปวัฒนธรรมล้านนา ทำกิจกรรมจิตอาสา และพัฒนาตนเองทั้งด้านการเรียนรู้ วินัย และการอยู่ร่วมกับผู้อื่น</p></div>
      </div>
      <div className="facts reveal"><div><strong>๑๓</strong><span>ปี</span><small>อายุ</small></div><div><strong>๙</strong><span>ด้าน</span><small>คุณธรรมต้นแบบ</small></div><div><strong>๕+</strong><span>รางวัล</span><small>เกียรติประวัติ</small></div><div><strong>๓</strong><span>ทักษะ</span><small>ดนตรี · รำ · เต้น</small></div></div>
    </section>

    <section className="awards section" id="awards">
      <div className="section-label light reveal"><span>๐๒</span><p>เกียรติประวัติ</p></div>
      <div className="section-head reveal"><h2>รางวัลที่ไม่ใช่ปลายทาง<br/><i>แต่คือแรงให้ก้าวต่อ</i></h2><p>ทุกเวทีคือพื้นที่เรียนรู้ และทุกประกาศนียบัตรคือความตั้งใจที่มองเห็นได้</p></div>
      <div className="award-track reveal">{awards.map((a,i) => <article className="award-card" key={a[0]}><div className="award-image"><img src={`/portfolio/${a[0]}`} alt={a[1]}/></div><p>0{i+1}</p><h3>{a[1]}</h3><span>{a[2]}</span></article>)}</div>
    </section>

    <section className="virtues section" id="virtues">
      <div className="section-label reveal"><span>๐๓</span><p>คุณธรรม ๙ ประการ</p></div>
      <div className="virtue-layout reveal">
        <div className="virtue-list">{virtues.map((v,i) => <button key={v[1]} className={i===virtue ? "active" : ""} onClick={() => setVirtue(i)}><span>{v[0]}</span>{v[1]}</button>)}</div>
        <article className="virtue-detail" key={current[0]}><div className="virtue-photo"><img src={`/portfolio/${current[3]}`} alt={current[1]}/></div><span>{current[0]} / ๐๙</span><h3>{current[1]}</h3><p>{current[2]}</p></article>
      </div>
    </section>

    <section className="feature-story" id="feature" aria-labelledby="feature-title">
      <div className="feature-backdrop" aria-hidden="true"><img src="/portfolio/image48.jpeg" alt=""/></div>
      <div className="feature-content reveal">
        <p className="feature-kicker">CULTURE IN MOTION · CHIANG MAI</p>
        <h2 id="feature-title">วัฒนธรรม<br/><i>ที่ยังมีชีวิต</i></h2>
        <blockquote>“เมื่อเยาวชนลงมือสืบสาน ศิลปะล้านนาจึงไม่ได้อยู่เพียงในความทรงจำ แต่ยังเติบโตไปพร้อมคนรุ่นใหม่”</blockquote>
        <div className="feature-meta">
          <div><strong>๐๑</strong><span>เรียนรู้<br/>จากรากเหง้า</span></div>
          <div><strong>๐๒</strong><span>ถ่ายทอด<br/>ผ่านการแสดง</span></div>
          <div><strong>๐๓</strong><span>ส่งต่อ<br/>ด้วยหัวใจอาสา</span></div>
        </div>
      </div>
      <figure className="feature-inset reveal">
        <img src="/portfolio/image42.jpeg" alt="การแสดงศิลปวัฒนธรรมล้านนา"/>
        <figcaption><span>FIELD NOTE / 04</span> ทุกเวทีคือพื้นที่เรียนรู้</figcaption>
      </figure>
      <div className="feature-index" aria-hidden="true">04 — 05</div>
    </section>

    <section className="gallery section" id="gallery">
      <div className="section-label reveal"><span>๐๔</span><p>ภาพกิจกรรม</p></div>
      <div className="section-head reveal"><h2>ความทรงจำ<br/><i>ระหว่างทาง</i></h2><p>เรื่องเล่าจากห้องเรียน เวทีการแสดง งานวัฒนธรรม ครอบครัว และกิจกรรมเพื่อสังคม</p></div>
      <div className="gallery-filters reveal" role="group" aria-label="กรองภาพกิจกรรม">{galleryFilters.map(([value,label]) => <button key={value} className={galleryFilter === value ? "active" : ""} aria-pressed={galleryFilter === value} onClick={() => setGalleryFilter(value)}>{label}</button>)}</div>
      <div className="masonry reveal" key={galleryFilter}>{filteredGallery.map((image,i) => <button key={image.src} className={`tile tile-${i%5}`} onClick={event => { lightboxTriggerRef.current = event.currentTarget; setLightbox(gallery.indexOf(image)); }} aria-label={`เปิด ${image.alt}`}><img src={`/portfolio/${image.src}`} alt={image.alt}/><span>{image.alt}</span></button>)}</div>
    </section>

    <footer><img src="/portfolio/image1.png" alt="" width={70} height={70}/><p>“ความดี เริ่มจากการลงมือทำในทุกวัน”</p><small>แฟ้มสะสมผลงาน เด็กหญิงรุ้งกานฎา จีนา · เชียงใหม่ ๒๕๖๙</small></footer>

    {lightbox !== null && <div className="lightbox" ref={lightboxRef} role="dialog" aria-modal="true" aria-label="ภาพขนาดใหญ่" onClick={() => setLightbox(null)}><button className="close" ref={closeButtonRef} onClick={() => setLightbox(null)} aria-label="ปิด">×</button><button className="prev" onClick={e => {e.stopPropagation();setLightbox((lightbox-1+gallery.length)%gallery.length)}} aria-label="ภาพก่อนหน้า">‹</button><div className="lightbox-image" onClick={e => e.stopPropagation()}><img src={`/portfolio/${gallery[lightbox].src}`} alt={gallery[lightbox].alt}/></div><button className="next" onClick={e => {e.stopPropagation();setLightbox((lightbox+1)%gallery.length)}} aria-label="ภาพถัดไป">›</button><p>{lightbox+1} / {gallery.length}</p></div>}
    <button className={`to-top ${showTop ? "show" : ""}`} onClick={() => window.scrollTo({top:0,behavior:"smooth"})} aria-label="กลับด้านบน">↑</button>
  </main>;
}
