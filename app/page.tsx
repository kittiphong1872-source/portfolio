"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

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

const gallery = [21,22,23,24,25,26,28,29,31,33,34,35,36,38,39,41,42,43,44,45,46,48,49,50,51,52,53,54,55,56,62,63].map(n => `image${n}.jpeg`);

export default function Home() {
  const [virtue, setVirtue] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [menu, setMenu] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const current = useMemo(() => virtues[virtue], [virtue]);

  useEffect(() => {
    const reveal = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("is-visible")), { threshold: .12 });
    document.querySelectorAll(".reveal").forEach(el => reveal.observe(el));
    const onScroll = () => setShowTop(window.scrollY > 650);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { reveal.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox(i => i === null ? 0 : (i + 1) % gallery.length);
      if (e.key === "ArrowLeft") setLightbox(i => i === null ? 0 : (i - 1 + gallery.length) % gallery.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", key);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", key); };
  }, [lightbox]);

  return <main>
    <nav className="nav" aria-label="เมนูหลัก">
      <a className="brand" href="#top"><Image src="/portfolio/image1.png" alt="ตราคนดีศรีเชียงใหม่" width={42} height={42}/><span>สายรุ้ง</span></a>
      <button className="menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="เปิดเมนู">{menu ? "×" : "☰"}</button>
      <div className={`nav-links ${menu ? "open" : ""}`} onClick={() => setMenu(false)}>
        <a href="#story">เรื่องราว</a><a href="#awards">รางวัล</a><a href="#virtues">คุณธรรม</a><a href="#gallery">ภาพกิจกรรม</a>
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
        <div className="portrait-frame"><Image src="/portfolio/image2.jpeg" alt="เด็กหญิงรุ้งกานฎา จีนา" fill priority sizes="(max-width: 800px) 88vw, 42vw"/></div>
        <div className="orbit-note"><b>๙</b><span>คุณธรรม<br/>นำทางชีวิต</span></div>
        <p className="vertical-word">CHIANG MAI · GOOD YOUTH</p>
      </div>
      <div className="hero-marquee"><span>มุ่งมั่น · ตั้งมั่น · ทำให้สำเร็จ · มุ่งมั่น · ตั้งมั่น · ทำให้สำเร็จ · </span></div>
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
      <div className="award-track reveal">{awards.map((a,i) => <article className="award-card" key={a[0]}><div className="award-image"><Image src={`/portfolio/${a[0]}`} alt={a[1]} fill sizes="300px"/></div><p>0{i+1}</p><h3>{a[1]}</h3><span>{a[2]}</span></article>)}</div>
    </section>

    <section className="virtues section" id="virtues">
      <div className="section-label reveal"><span>๐๓</span><p>คุณธรรม ๙ ประการ</p></div>
      <div className="virtue-layout reveal">
        <div className="virtue-list">{virtues.map((v,i) => <button key={v[1]} className={i===virtue ? "active" : ""} onClick={() => setVirtue(i)}><span>{v[0]}</span>{v[1]}</button>)}</div>
        <article className="virtue-detail" key={current[0]}><div className="virtue-photo"><Image src={`/portfolio/${current[3]}`} alt={current[1]} fill sizes="(max-width: 800px) 90vw, 40vw"/></div><span>{current[0]} / ๐๙</span><h3>{current[1]}</h3><p>{current[2]}</p></article>
      </div>
    </section>

    <section className="gallery section" id="gallery">
      <div className="section-label reveal"><span>๐๔</span><p>ภาพกิจกรรม</p></div>
      <div className="section-head reveal"><h2>ความทรงจำ<br/><i>ระหว่างทาง</i></h2><p>เรื่องเล่าจากห้องเรียน เวทีการแสดง งานวัฒนธรรม ครอบครัว และกิจกรรมเพื่อสังคม</p></div>
      <div className="masonry reveal">{gallery.map((img,i) => <button key={img} className={`tile tile-${i%5}`} onClick={() => setLightbox(i)} aria-label={`เปิดภาพกิจกรรมที่ ${i+1}`}><Image src={`/portfolio/${img}`} alt="ภาพกิจกรรมและผลงาน" fill sizes="(max-width: 600px) 50vw, 25vw"/></button>)}</div>
    </section>

    <footer><Image src="/portfolio/image1.png" alt="" width={70} height={70}/><p>“ความดี เริ่มจากการลงมือทำในทุกวัน”</p><small>แฟ้มสะสมผลงาน เด็กหญิงรุ้งกานฎา จีนา · เชียงใหม่ ๒๕๖๙</small></footer>

    {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="ภาพขนาดใหญ่" onClick={() => setLightbox(null)}><button className="close" aria-label="ปิด">×</button><button className="prev" onClick={e => {e.stopPropagation();setLightbox((lightbox-1+gallery.length)%gallery.length)}} aria-label="ภาพก่อนหน้า">‹</button><div className="lightbox-image" onClick={e => e.stopPropagation()}><Image src={`/portfolio/${gallery[lightbox]}`} alt="ภาพกิจกรรมขนาดใหญ่" fill sizes="90vw"/></div><button className="next" onClick={e => {e.stopPropagation();setLightbox((lightbox+1)%gallery.length)}} aria-label="ภาพถัดไป">›</button><p>{lightbox+1} / {gallery.length}</p></div>}
    <button className={`to-top ${showTop ? "show" : ""}`} onClick={() => window.scrollTo({top:0,behavior:"smooth"})} aria-label="กลับด้านบน">↑</button>
  </main>;
}
