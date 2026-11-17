'use strict';
// Screen effects (flashes, glitches, shakes), intercept popup, typewriter text.

// ══════════════════════════════════════════════════
//  SCREEN FX
// ══════════════════════════════════════════════════
function doShake(){
  if(fxOff()) return;
  const w=document.getElementById('game-wrap');
  if(!w) return;
  w.classList.remove('shake'); void w.offsetWidth; w.classList.add('shake');
  setTimeout(()=>w.classList.remove('shake'),520);
}
function doFlash(color='#ff1a1a',strength='.4'){
  if(fxOff()) return;
  const f=document.getElementById('flash');
  if(!f) return;
  f.style.background=color; f.style.opacity=strength;
  setTimeout(()=>{f.style.transition='opacity .3s';f.style.opacity='0';setTimeout(()=>f.style.transition='',350);},45);
}
function doEmp(){
  const e=document.getElementById('emp-flash');
  if(!e) return;
  if(fxOff()){ playEmp(); return; }
  e.style.opacity='.75'; playEmp();
  doShake(); doScreenTear(3);
  setTimeout(()=>{e.style.transition='opacity .7s';e.style.opacity='0';setTimeout(()=>e.style.transition='',750);},55);
}
function doGlitch(){
  const gr=document.getElementById('glitch-r'), gb=document.getElementById('glitch-b');
  if(!gr||!gb) return;
  playGlitch();
  if(fxOff()) return;
  // Frame 1 — full split
  const rx=(Math.random()-.5)*22, bx=(Math.random()-.5)*18;
  const ry=(Math.random()-.5)*3;
  gr.style.opacity='.9'; gb.style.opacity='.8';
  gr.style.clipPath=`inset(${Math.random()*55}% 0 ${Math.random()*28}% 0)`;
  gb.style.clipPath=`inset(${Math.random()*35}% 0 ${Math.random()*45}% 0)`;
  gr.style.transform=`translate(${rx}px,${ry}px) skewX(${(Math.random()-.5)*4}deg)`;
  gb.style.transform=`translate(${bx}px) scaleX(${1+(Math.random()-.5)*.04})`;
  // Frame 2 — 55ms later: new random positions (re-query to be safe)
  setTimeout(()=>{
    const gr2=document.getElementById('glitch-r'), gb2=document.getElementById('glitch-b');
    if(!gr2||!gb2) return;
    gr2.style.clipPath=`inset(${Math.random()*75}% 0 ${Math.random()*12}% 0)`;
    gr2.style.transform=`translate(${(Math.random()-.5)*12}px) skewX(${(Math.random()-.5)*2}deg)`;
    gb2.style.clipPath=`inset(${Math.random()*20}% 0 ${Math.random()*60}% 0)`;
    gb2.style.transform=`translate(${(Math.random()-.5)*16}px)`;
  },55);
  // Frame 3 — 105ms: clear
  setTimeout(()=>{
    const gr3=document.getElementById('glitch-r'), gb3=document.getElementById('glitch-b');
    if(!gr3||!gb3) return;
    gr3.style.opacity='0'; gb3.style.opacity='0';
    gr3.style.clipPath=''; gb3.style.clipPath='';
    gr3.style.transform=''; gb3.style.transform='';
  },105);
}
function doShockwave(){
  if(fxOff()) return;
  const s=document.getElementById('shockwave');
  if(!s)return;
  s.style.transition='none'; s.style.transform='scale(0)';
  s.style.border='3px solid rgba(255,26,26,.9)'; s.style.width='2px'; s.style.height='2px';
  void s.offsetWidth;
  s.style.transition='transform .65s ease-out, border-color .65s ease-out, border-width .65s';
  s.style.transform='scale(500)'; s.style.borderColor='rgba(255,26,26,0)'; s.style.borderWidth='1px';
  setTimeout(()=>{ s.style.transition='none'; s.style.transform='scale(0)'; },700);
}
function doVignette(){
  const v=document.getElementById('vignette-pulse');
  if(!v)return;
  v.style.opacity='1'; setTimeout(()=>v.style.opacity='0',700);
}
function doLightning(){
  const lc=document.getElementById('lightning-canvas');
  if(!lc)return;
  if(fxOff()){ setTimeout(playThunder,600+Math.random()*2200); return; }
  lc.width=window.innerWidth; lc.height=window.innerHeight;
  const ctx=lc.getContext('2d');
  lc.style.opacity='1';
  function bolt(x1,y1,x2,y2,spread,depth,bright=1){
    if(depth<=0)return;
    ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2);
    // Core white bolt
    ctx.strokeStyle=`rgba(255,255,255,${0.9*bright*depth/4})`; ctx.lineWidth=depth*0.8; ctx.stroke();
    // Outer glow in amber
    ctx.strokeStyle=`rgba(255,200,60,${0.35*bright*depth/4})`; ctx.lineWidth=depth*2.5; ctx.stroke();
    if(depth>1){
      const mx=(x1+x2)/2+(Math.random()-.5)*spread, my=(y1+y2)/2+(Math.random()-.5)*spread;
      bolt(x1,y1,mx,my,spread/2,depth-1,bright);
      bolt(mx,my,x2,y2,spread/2,depth-1,bright);
      if(Math.random()>.45) bolt(mx,my,mx+(Math.random()-.5)*spread*2.2,my+spread*1.1,spread*.55,depth-2,bright*.7);
    }
  }
  const numBolts=Math.random()>.5?2:1;
  for(let i=0;i<numBolts;i++){
    const sx=Math.random()*window.innerWidth;
    bolt(sx,-10,sx+(Math.random()-.5)*500,window.innerHeight*.6+Math.random()*350,160,4);
  }
  // Double flash: instant white then amber decay
  doFlash('#ffffff','.38');
  setTimeout(()=>doFlash('#ffee88','.18'),90);
  setTimeout(()=>{ctx.clearRect(0,0,lc.width,lc.height); lc.style.opacity='0';},180);
  // Thunder follows with realistic delay (sound travels ~300m/s)
  const delay=600+Math.random()*2200;
  setTimeout(playThunder, delay);
}

// ── SCREEN TEAR: horisontale svarte striper ──────────
function doScreenTear(n=4){
  if(fxOff()) return;
  for(let i=0;i<n;i++){
    const el=document.createElement('div');
    const y=5+Math.random()*90;
    const h=2+Math.random()*14;
    const x=(Math.random()-.5)*60;
    el.style.cssText=`position:fixed;top:${y}%;left:0;right:0;height:${h}px;background:#000;z-index:9993;pointer-events:none;transform:translateX(${x}px);`;
    document.body.appendChild(el);
    setTimeout(()=>el.remove(), 55+Math.random()*70);
  }
}

// ── SCAN BAR: rask rød strek over skjermen ───────────
function doScanBar(){
  const el=document.getElementById('scan-bar');
  if(!el) return;
  el.style.transition='none'; el.style.top='-4px'; el.style.opacity='0.85';
  void el.offsetWidth;
  el.style.transition='top .22s linear';
  el.style.top='102%';
  setTimeout(()=>{ el.style.opacity='0'; },250);
}

// ── RAD HAZE: grønn glød ved strålings-milepæler ────
function doRadHaze(alpha=0.22){
  const el=document.getElementById('rad-haze');
  if(!el) return;
  el.style.transition='none'; el.style.opacity=alpha;
  void el.offsetWidth;
  setTimeout(()=>{ el.style.transition='opacity 3s ease'; el.style.opacity='0'; setTimeout(()=>el.style.transition='',3100); }, 400);
}

// ── UPDATE RAD AMBIENCE: body-klasser + static-canvas intensitet ──
function updateRadAmbience(){
  const r=state.rad;
  const b=document.body;
  b.classList.remove('rad-warm','rad-high','rad-crit');
  if(r>=85)      b.classList.add('rad-crit');
  else if(r>=55) b.classList.add('rad-high');
  else if(r>=30) b.classList.add('rad-warm');
  const sv=document.getElementById('static-canvas');
  if(sv) sv.style.opacity=(0.03+Math.min(r,100)*0.001).toFixed(4);
}

// ── SCENE COUNTER ────────────────────────────────────
let sceneCount=0;
function updateSceneCounter(){
  sceneCount++;
  const el=document.getElementById('scene-counter');
  if(el) el.textContent=`SONE ${String(sceneCount).padStart(2,'0')}`;
}

// ── THREAT LEVEL — updates from frykt + rad ──────────
function updateThreatLevel(){
  const score=Math.max(state.frykt, state.rad, state.mot<20?60:0);
  let cls='lav', lbl='LAV';
  if(score>=80){cls='krit';lbl='KRITISK';}
  else if(score>=55){cls='hoy';lbl='HØY';}
  else if(score>=30){cls='medium';lbl='MEDIUM';}
  const dot=document.getElementById('threat-dot');
  const lvl=document.getElementById('threat-level');
  if(dot){dot.className=cls;}
  if(lvl){lvl.className=cls;lvl.textContent=lbl;}
}

// ── FLOATING STAT NUMBER ─────────────────────────────
function spawnStatFloat(barEl, text, color){
  if(!barEl) return;
  const r=barEl.getBoundingClientRect();
  const el=document.createElement('div');
  el.className='stat-float';
  el.textContent=text;
  el.style.color=color;
  el.style.left=(r.left+r.width/2)+'px';
  el.style.top=(r.top-8)+'px';
  document.body.appendChild(el);
  setTimeout(()=>el.remove(), 1000);
}

// ── EDGE DAMAGE FLASH — FPS-style ────────────────────
function doEdgeDamage(good=false){
  const ids=good?['edge-t','edge-b']:['edge-t','edge-b','edge-l','edge-r'];
  const greenIds=['edge-t','edge-b'];
  const color=good?'rgba(0,255,136,.5)':'rgba(255,26,26,.6)';
  if(good){
    greenIds.forEach(id=>{
      const el=document.getElementById(id);
      if(!el)return;
      const orig=el.style.background;
      el.style.background=`linear-gradient(to ${id==='edge-t'?'bottom':'top'},${color},transparent)`;
      el.style.opacity='.9';
      setTimeout(()=>{el.style.transition='opacity .4s';el.style.opacity='0';setTimeout(()=>{el.style.transition='';el.style.background='';},450);},120);
    });
  } else {
    ids.forEach(id=>{
      const el=document.getElementById(id);
      if(!el)return;
      el.style.opacity='.9';
      setTimeout(()=>{el.style.transition='opacity .5s';el.style.opacity='0';setTimeout(()=>el.style.transition='',550);},80);
    });
  }
}

// ── ZONE ENTRY OVERLAY ───────────────────────────────
function showZoneEntry(title, sub=''){
  const ov=document.getElementById('zone-overlay');
  const zt=document.getElementById('zone-title');
  const zs=document.getElementById('zone-sub');
  const zd=document.getElementById('zone-divider');
  if(!ov||!zt) return;
  zt.textContent=title;
  zs.textContent=sub;
  zd.style.width='0';
  ov.classList.remove('fire');
  void ov.offsetWidth;
  ov.classList.add('fire');
  setTimeout(()=>ov.classList.remove('fire'), 1150);
}

// ── IMPACT LABEL (big brief overlay text) ────────────
function showImpact(text, color='#ff1a1a'){
  const el=document.getElementById('impact-label');
  if(!el) return;
  el.textContent=text;
  el.style.color=color;
  el.classList.remove('fire');
  void el.offsetWidth;
  el.classList.add('fire');
  setTimeout(()=>el.classList.remove('fire'), 800);
}

// ── KEYBOARD SHORTCUTS for choices ───────────────────
let kbChoices=[];
function setupKeyboard(choices){
  kbChoices=choices;
}
document.addEventListener('keydown', e=>{
  if(e.ctrlKey||e.metaKey||e.altKey) return;
  if(e.key==='m'||e.key==='M'){ toggleMute(); return; }
  const n=parseInt(e.key,10)-1;
  if(isNaN(n)||n<0||n>=kbChoices.length) return;
  const btn=kbChoices[n];
  if(!btn||!btn.isConnected||btn.classList.contains('locked')) return;
  // visual feedback
  btn.classList.add('kb-active');
  setTimeout(()=>btn.classList.remove('kb-active'), 200);
  setTimeout(()=>btn.click(), 180);
});


// ── WHITEOUT: vedvarende hvit blending ──────────────
function doWhiteout(holdMs=120,fadeMs=350){
  if(fxOff()) return;
  const el=document.getElementById('whiteout');
  if(!el) return;
  el.style.transition='none'; el.style.opacity='1';
  setTimeout(()=>{
    el.style.transition=`opacity ${fadeMs}ms ease`;
    el.style.opacity='0';
  }, holdMs);
}

// ── NEGATIVE: inverterer farger momentant ───────────
function doNegative(dur=90){
  if(fxOff()) return;
  document.body.classList.add('negative');
  setTimeout(()=>document.body.classList.remove('negative'), dur);
}

// ── CHROMATIC BLEED: RGB-kanal separasjon ───────────
function doChromaticBleed(dur=140){
  if(fxOff()) return;
  const el=document.getElementById('chromatic');
  if(!el) return;
  el.className=''; el.style.opacity='0.85';
  const phase=Math.random()>.5?'bleed-r':'bleed-g';
  el.classList.add(phase);
  setTimeout(()=>{
    el.classList.remove(phase);
    const phase2=phase==='bleed-r'?'bleed-g':'bleed-r';
    el.classList.add(phase2);
    setTimeout(()=>{ el.classList.remove(phase2); el.style.opacity='0'; el.className=''; }, dur*.5);
  }, dur*.5);
}

// ── ZOOM PULSE: kamera-sjokk zoom ───────────────────
function doZoomPulse(){
  if(fxOff()) return;
  document.body.classList.remove('zoom-pulse');
  void document.body.offsetWidth;
  document.body.classList.add('zoom-pulse');
  setTimeout(()=>document.body.classList.remove('zoom-pulse'), 380);
}

// ── PIXEL BREAK: skjermen sprekker i piksler ────────
function doPixelBreak(n=30){
  if(fxOff()) return;
  const colors=['#ff1a1a','#ffffff','#ff8800','#ff0000','#000000'];
  for(let i=0;i<n;i++){
    const el=document.createElement('div');
    const sz=3+Math.random()*18;
    const x=Math.random()*100, y=Math.random()*100;
    const c=colors[Math.floor(Math.random()*colors.length)];
    const life=60+Math.random()*180;
    el.style.cssText=`position:fixed;left:${x}%;top:${y}%;width:${sz}px;height:${sz}px;background:${c};z-index:9994;pointer-events:none;opacity:${0.5+Math.random()*.5};`;
    document.body.appendChild(el);
    setTimeout(()=>el.remove(), life);
  }
}

// ── SCAN FLICKER: rask opasitets-flimring ───────────
function doScanFlicker(n=3){
  if(fxOff()) return;
  let count=0;
  const pb=document.getElementById('pre-boot') || document.body;
  function flick(){
    pb.style.opacity=count%2===0?'0.04':'1';
    count++;
    if(count<n*2) setTimeout(flick, 38);
    else pb.style.opacity='1';
  }
  flick();
}

// ── MEGA SHAKE: voldsomt 8-retnings rystelse ────────
function doMegaShake(){
  if(fxOff()) return;
  const el=document.getElementById('pre-boot')||document.getElementById('game-wrap');
  if(!el) return;
  el.classList.remove('pb-shake','mega-shake'); void el.offsetWidth;
  el.classList.add('pb-shake');
  setTimeout(()=>el.classList.remove('pb-shake'), 700);
}

// Random glitch events — CSS only (audio only if ready)
function scheduleGlitch(){
  setTimeout(()=>{doGlitch(); scheduleGlitch();}, 3000+Math.random()*8000);
}
// Lightning
function scheduleLightning(){
  setTimeout(()=>{doLightning(); scheduleLightning();}, 10000+Math.random()*22000);
}
// Distant atmospheric boom
function scheduleDistantBoom(){
  setTimeout(()=>{playDistantBoom(); scheduleDistantBoom();}, 18000+Math.random()*35000);
}
// Started from window.onload (CSS effects) and after initAudio (sound effects)

// Corrupt story text characters randomly
function corruptStoryText(){
  const el=document.getElementById('story-text');
  if(!el) return;
  const chars='!@#$%◈▓▒█◆◇◉⚡';
  const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null);
  const nodes=[]; let n;
  while(n=walker.nextNode()){if(n.textContent.trim().length>3) nodes.push(n);}
  if(!nodes.length) return;
  const node=nodes[Math.floor(Math.random()*nodes.length)];
  const orig=node.textContent;
  const idx=Math.floor(Math.random()*(orig.length-1));
  node.textContent=orig.substring(0,idx)+chars[Math.floor(Math.random()*chars.length)]+orig.substring(idx+1);
  setTimeout(()=>node.textContent=orig,90);
}
setInterval(corruptStoryText, 3200);

// ══════════════════════════════════════════════════
//  INTERCEPT POPUP
// ══════════════════════════════════════════════════
let interceptTimer=null;
function showIntercept(msg){
  const pop=document.getElementById('intercept-popup');
  document.getElementById('intercept-body').textContent=msg;
  const bar=document.getElementById('intercept-bar-fill');
  bar.style.animation='none'; void bar.offsetWidth;
  bar.style.animation='deplete 6s linear forwards';
  pop.classList.add('show');
  playIntercept();
  doGlitch();
  if(interceptTimer) clearTimeout(interceptTimer);
  interceptTimer=setTimeout(closeIntercept,6500);
}
function closeIntercept(){
  document.getElementById('intercept-popup').classList.remove('show');
}

// ══════════════════════════════════════════════════
//  TYPEWRITER
// ══════════════════════════════════════════════════
function typewrite(container,html,speed,onDone){
  container.innerHTML=html;
  const paras=container.querySelectorAll('p, em, .intercept');
  let done=0;
  if(!paras.length){if(onDone)onDone();return;}
  paras.forEach((p,pi)=>{
    const orig=p.innerHTML;
    const plain=p.innerText||p.textContent||'';
    p.textContent='';
    let idx=0;
    setTimeout(()=>{
      const iv=setInterval(()=>{
        idx+=4;
        if(idx>=plain.length){
          p.innerHTML=orig; clearInterval(iv); done++;
          if(done===paras.length&&onDone) onDone();
        } else {
          p.textContent=plain.substring(0,idx)+'▌';
          if(idx%16===0) playTypeKey();
        }
      },speed);
    },pi*220);
  });
}

// ══════════════════════════════════════════════════
//  SCENE PHOTO + CREDIT
// ══════════════════════════════════════════════════
function esc(t){ return String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
// Load the photos of the scenes the player can go to next, so they appear instantly
const preloaded=new Set();
function preloadNext(p){
  (p.choices||[]).forEach(c=>{
    const ph=PHOTOS[(STORY[c.target]||{}).img];
    if(ph&&ph.src&&!preloaded.has(ph.src)){ preloaded.add(ph.src); const im=new Image(); im.src=ph.src; }
  });
}
function sceneHero(p,zone){
  const ph=PHOTOS[p.img]||{};
  const img=ph.src?`<img src="${ph.src}" alt="${esc(ph.alt||'')}" decoding="async"${ph.lift?' class="lift"':''} onerror="this.remove()"${ph.pos?` style="object-position:${ph.pos}"`:''}>`:'';
  const credit=ph.by?`<figcaption class="photo-credit">Foto: ${ph.url?`<a href="${ph.url}" target="_blank" rel="noopener">${esc(ph.by)}</a>`:esc(ph.by)}${ph.license?' · '+esc(ph.license):''}</figcaption>`:'';
  const remaining=p.time==='00:00:00'?'NEDSLAG':`T − ${p.time}`;
  return `<figure class="scene-hero${p.ending?' is-ending end-'+p.ending:''}">
    <div class="img-wrap">${img}<div class="img-glitch"></div><div class="scan-line"></div></div>
    <div class="hero-overlay">
      <div class="hero-meta"><span class="hero-zone">SONE ${String(zone).padStart(2,'0')}</span><span class="hero-place">${esc(p.shortName||'')}</span><span class="hero-time">${remaining}</span></div>
      <h1 id="scene-title" data-text="${esc(p.title)}">${esc(p.title)}</h1>
    </div>
    ${credit}
  </figure>`;
}
