'use strict';
// Start screen, cinematic intro and boot sequence.

// ══════════════════════════════════════════════════
//  BOOT — with PRE-BOOT delay
// ══════════════════════════════════════════════════
const BOOT_LINES=[
  '',
  'INITIERER NØDPROTOKOLL v8.1.4...',
  'LASTER HARDWARE-ABSTRAKSJONSMODUL... [OK]',
  'SJEKKER MINNEINTEGRITET........................ [OK]',
  'AUTENTISERER NODE-SERTIFIKATER... [FEILET]',
  'OVERSTYRER AUTENTISERING VIA NØDPROTOKOLL... [OK]',
  'SIKKERHETSNIVÅ: RØDT — HØYESTE BEREDSKAP',
  '',
  '> SOLSTORM X99 — BEKREFTET AV 14 OBSERVATORIER',
  '> SOLSTORM OVERDREVET MED FAKTOR 10 — BEKREFTET AV INTERN KILDE',
  '> FJELLBUNKER — FAKTISK FORMÅL: KONTROLLSONERING',
  '> PROSJEKT SOLNEDGANG — STATUS: AKTIV — FASE 2 IGANGSATT',
  '> 8 VESTLIGE REGJERINGER INVOLVERT',
  '> BEFOLKNINGSESTIMATER: 2.3 MILLIONER SUBJEKTER UNDER INNLÅSING',
  '',
  'ADVARSEL: DETTE SYSTEMET ER AKTIVT OVERVÅKET',
  'ADVARSEL: DIN POSISJON KAN ALLEREDE VÆRE KJENT',
  'ADVARSEL: ALLE VALG LOGGES',
  '',
  'LASTER HISTORIEDATABASE...',
  '[██░░░░░░░░░░░░░░░░░░░░░░]  8%',
  '[████░░░░░░░░░░░░░░░░░░░░]  16%',
  '[████████░░░░░░░░░░░░░░░░]  33%',
  '[████████████░░░░░░░░░░░░]  50%',
  '[████████████████░░░░░░░░]  67%',
  '[████████████████████░░░░]  83%',
  '[████████████████████████]  100%',
  '',
  '◈ ALLE VALG HAR KONSEKVENSER.',
  '◈ DET FINNES 5 SLUTTER — EN ER HEMMELIG.',
  '◈ STATS OG INVENTAR ÅPNER OG LUKKER VEIER.',
  '◈ STRÅLING ≥ 100 = DØD.',
  '',
  'STARTER SOLSTORMEN...',
  '',
];

// (bIdx, cIdx, bootIv declared early above)
const bootTxtEl=document.getElementById('boot-text');

function typeBoot(){
  if(bIdx>=BOOT_LINES.length){finishBoot();return;}
  const line=BOOT_LINES[bIdx];
  if(cIdx<=line.length){
    const prev=BOOT_LINES.slice(0,bIdx).join('\n');
    bootTxtEl.textContent=prev+(bIdx>0?'\n':'')+line.substring(0,cIdx);
    if(cIdx>0&&cIdx%3===0) playTypeKey();
    cIdx++;
    const spd=line.startsWith('[')? 8 : line.startsWith('>')? 14 : 22;
    bootIv=setTimeout(typeBoot,spd);
  } else {
    bIdx++;cIdx=0;
    bootIv=setTimeout(typeBoot, BOOT_LINES[bIdx-1]===''?60:100);
  }
}

function finishBoot(){
  setTimeout(()=>{
    document.getElementById('boot').classList.remove('active');
    document.getElementById('boot').classList.add('hidden');
    const gw=document.getElementById('game-wrap');
    gw.style.display=''; gw.style.opacity='0';
    gw.style.transition='opacity .6s ease';
    setTimeout(()=>gw.style.opacity='1', 50);
    window.scrollTo({top:0,behavior:'instant'});
    render('start');
  },800);
}

function skipBoot(){
  if(bootIv) clearTimeout(bootIv);
  document.getElementById('boot').classList.remove('active');
  document.getElementById('boot').classList.add('hidden');
  const gw=document.getElementById('game-wrap');
  gw.style.display=''; gw.style.opacity='0';
  gw.style.transition='opacity .4s ease';
  setTimeout(()=>gw.style.opacity='1',30);
  window.scrollTo({top:0,behavior:'instant'});
  render('start');
}

// ══════════════════════════════════════════════════
//  PRE-BOOT HELPERS
// ══════════════════════════════════════════════════
// (ALERT_TITLE_TXT, ALERT_BODY_TXT declared early above)
function pbT(fn,ms){preBootTimers.push(setTimeout(fn,ms));}
function clearPBT(){preBootTimers.forEach(clearTimeout);}

function skipPreBoot(){
  clearPBT(); clearInterval(phoneCdIv);
  document.getElementById('pre-boot').classList.add('gone');
  document.getElementById('boot').classList.add('active');
  setTimeout(typeBoot,200);
}

function startPhoneCd(){
  const el=document.getElementById('phone-cd');
  phoneCdIv=setInterval(()=>{
    if(phoneCdSecs<=0){clearInterval(phoneCdIv);return;}
    phoneCdSecs--;
    const h=Math.floor(phoneCdSecs/3600),m=Math.floor((phoneCdSecs%3600)/60),s=phoneCdSecs%60;
    el.textContent=p2(h)+':'+p2(m)+':'+p2(s);
  },1000);
}
function typeAlertText(el,txt,spd,done){
  let i=0;
  const iv=setInterval(()=>{
    i+=2; el.textContent=txt.substring(0,i);
    if(i>=txt.length){clearInterval(iv);if(done)done();}
  },spd);
}
// Schedule random distant booms during gameplay — started from beginExperience()

// ══════════════════════════════════════════════════
//  ENTRY: click-to-start gate → pre-boot sequence
// ══════════════════════════════════════════════════
window.onload=()=>{
  scheduleGlitch();
  scheduleLightning();
  // scheduleDistantBoom started after audio init in beginExperience()
};

function setupGate(){
  refreshSettingsUI();
  const found=lsGet(ENDINGS_KEY,[]).filter(id=>ENDING_ORDER.includes(id));
  if(found.length){
    const el=document.getElementById('sg-endings');
    if(el) el.textContent=`${found.length}/${ENDING_ORDER.length} SLUTTER FUNNET`;
  }
  const sv=loadSave();
  if(sv){
    document.getElementById('sg-continue-row').style.display='';
    const n=String((sv.path||[]).length+1).padStart(2,'0');
    document.getElementById('sg-continue').textContent=`▶ FORTSETT — SONE ${n}: ${STORY[sv.scene].shortName||STORY[sv.scene].title}`;
  }
  const gate=document.getElementById('start-gate');
  if(gate) gate.focus({preventScroll:true});
}
document.addEventListener('keydown',e=>{
  const gate=document.getElementById('start-gate');
  if(!gate||e.target!==gate) return;
  if(e.key==='Enter'||e.key===' '){ e.preventDefault(); beginExperience(); }
});
setupGate();

function beginExperience(){
  const gate=document.getElementById('start-gate');
  if(!gate) return;
  if(gate.dataset.started) return;
  gate.dataset.started='1';
  gate.style.transition='opacity .3s';
  gate.style.opacity='0';
  setTimeout(()=>gate.remove(), 350);

  initAudio();
  scheduleDistantBoom();
  scheduleRadioChatter();
  startPreBoot();
}

function startPreBoot(){

  // ══ FASE 0: Signalkapring — verden slutter å gi mening ══════════

  pbT(()=>{
    const pl=document.getElementById('prelude');
    pl.classList.add('show');
    // Første lyd: ionosfærisk hvin starter med en gang
    playIonScream(3.2, 0.20);
    playDeepRumble(2.2,0.24);
    doScreenTear(10);
    doScanBar();
    // Progressbar
    let pw=0; const biv=setInterval(()=>{
      pw+=1.8; document.getElementById('prelude-bar-fill').style.width=Math.min(100,pw)+'%';
      if(pw>=100) clearInterval(biv);
    },40);
    // Datalinjer som vises
    const lines=[
      'INITIALISERER KRYPTERT TILKOBLING...',
      'NODE: 185.220.101.47 → 10.0.0.1 → OSLO-KNS',
      'AUTENTISERING: BYPASS VIA NØDPROTOKOLL',
      'PROSJEKT SOLNEDGANG — TILGANG BEKREFTET',
      'LASTER HISTORIEDATABASE...',
    ];
    const linesEl=document.getElementById('prelude-lines');
    let li=0;
    function nextLine(){
      if(li>=lines.length) return;
      linesEl.textContent=lines[li++];
      playTypeKey();
      setTimeout(nextLine, 360+Math.random()*160);
    }
    setTimeout(nextLine, 300);
  },100);

  // Chromatic bleed + EBS starter
  pbT(()=>{ doChromaticBleed(200); playStaticBurst(0.18); },380);
  pbT(()=>{ playEbsTone(); doScanBar(); },500);

  // Logo og subtittel vises
  pbT(()=>{
    document.getElementById('prelude-logo').classList.add('show');
    document.getElementById('prelude-sub').classList.add('show');
    playMetalStress();
    doChromaticBleed(180);
  },800);

  // Første sub boom + scan flicker
  pbT(()=>{ playSubBoom(0.18); doScanFlicker(4); },1200);
  pbT(()=>{ doScreenTear(4); playStaticBurst(0.22); doChromaticBleed(120); },1650);

  // Negative flash + resonanse
  pbT(()=>{ doNegative(75); playResonance(110,1.4,0.13); playSubBoom(0.28); },2100);

  // ══ STOR GLITCH-STORM #1 ════════════════════════════════════════
  pbT(()=>{
    playEbsTone();
    doFlash('#ff0000','.22');
    doScreenTear(12);
    doScanBar();
    doChromaticBleed(300);
    playStaticBurst(0.28);
    // 6 glitcher staggered
    doGlitch();
    setTimeout(doGlitch,55); setTimeout(doGlitch,120);
    setTimeout(doGlitch,195); setTimeout(doGlitch,280); setTimeout(doGlitch,390);
    const pl=document.getElementById('prelude');
    if(fxOff()) return;
    let f=0; const iv=setInterval(()=>{
      pl.style.opacity=f%2===0?'0.04':'1';
      pl.style.transform=f%2===0?`skewX(${(Math.random()-.5)*8}deg) translateX(${(Math.random()-.5)*36}px) scaleY(${0.93+Math.random()*.14})`:'none';
      pl.style.filter=f%2===0?`hue-rotate(${Math.random()*180}deg) saturate(3)`:'none';
      f++; if(f>14){clearInterval(iv); pl.style.opacity='1'; pl.style.transform='none'; pl.style.filter='none';}
    },45);
  },2800);

  pbT(()=>{ playDeepRumble(1.6,0.26); doZoomPulse(); doScanBar(); },3200);
  pbT(()=>{ doScreenTear(7); playSiren(1,0.16); doChromaticBleed(200); doNegative(60); },3600);
  pbT(()=>{ playMetalStress(); doPixelBreak(22); },4000);

  // ══ FASE 1: PRE-KOLLAPS — MAKSIMAL KAOS ═════════════════════════
  pbT(()=>{
    doMegaShake();
    doEmp(); playDeepRumble(1.8,0.26);
    doScreenTear(14); doZoomPulse();
    doChromaticBleed(400); doNegative(100);
    doScanBar(); doScanFlicker(6);
    playStaticBurst(0.15); playMetalStress();
    doFlash('#ff1a1a','.42');
    doGlitch(); setTimeout(doGlitch,60); setTimeout(doGlitch,130);
    setTimeout(doGlitch,220); setTimeout(doGlitch,340); setTimeout(doGlitch,480);
    setTimeout(doGlitch,650);
  },4200);

  // Pixel dissolution
  pbT(()=>{ doPixelBreak(45); doChromaticBleed(180); playSubBoom(0.20); },4480);

  // ══ HVITBLENDING + EKSPLOSJON ════════════════════════════════════
  pbT(()=>{
    doWhiteout(180, 500);
    playExplosion(0.24); playIonScream(1.8, 0.18);
    doShake(); doScanBar();
    doFlash('#ffffff','1.0');
  },4700);

  pbT(()=>{ doScanBar(); playSubBoom(0.17); doScreenTear(7); doPixelBreak(18); },5000);
  pbT(()=>{ doFlash('#ff0000','.35'); playStaticCrackle(0.2,0.13); doChromaticBleed(160); },5100);
  pbT(()=>{ doScanFlicker(4); doNegative(55); doZoomPulse(); },5380);

  // ══ FASE 2: Telefonen glir inn ═══════════════════════════════════
  pbT(()=>{
    const ph=document.getElementById('phone');
    ph.style.pointerEvents='none';
    ph.classList.add('visible');
    playWhoosh(); doScanBar();
    setTimeout(()=>document.getElementById('phone-time').classList.add('show'),400);
    setTimeout(()=>document.getElementById('phone-date').classList.add('show'),700);
  },5800);

  pbT(()=>{ doScreenTear(4); playMetalStress(); doChromaticBleed(140); },6150);
  pbT(()=>{ doScanBar(); playStaticBurst(0.18); },6550);
  pbT(()=>{ playDeepRumble(0.9,0.18); doNegative(50); },6950);

  // ══ FASE 3: VIBRASJON + NØDVARSELLYD ═════════════════════════════
  pbT(()=>{
    playBuzzer();
    const ph=document.getElementById('phone');
    ph.classList.add('vibrate');
    doMegaShake();
    document.getElementById('prelude-center').style.background='rgba(40,0,0,.55)';
    doScreenTear(9); doNegative(65); doChromaticBleed(280);
    doFlash('#ff0000','.4');
    playSubBoom(0.16); playStaticBurst(0.12);
  },7200);

  pbT(()=>{ doScanBar(); playStaticBurst(0.22); doScanFlicker(3); },7500);

  // ══ FASE 4: Varselskjerm tennes ══════════════════════════════════
  pbT(()=>{
    document.getElementById('phone').classList.remove('vibrate');
    document.getElementById('alert-screen').classList.add('show');
    startPhoneCd();
    playStaticBurst(0.2);
    typeAlertText(
      document.getElementById('alert-title'),
      ALERT_TITLE_TXT,40,
      ()=>{ typeAlertText(document.getElementById('alert-body'),ALERT_BODY_TXT,18,null); }
    );
  },7700);

  pbT(()=>{ playMetalStress(); doScreenTear(3); doChromaticBleed(120); },8500);
  pbT(()=>{ playStaticBurst(0.2); doScanBar(); doNegative(45); },9500);
  pbT(()=>{ playDeepRumble(1.2,0.20); doPixelBreak(14); },10200);
  pbT(()=>{ doScreenTear(5); doChromaticBleed(180); playMetalStress(); },10800);

  // ══ FASE 5: BUZZ RUNDE #2 — HARDERE ═════════════════════════════
  pbT(()=>{
    playBuzzer(); playDeepRumble(1.4,0.22);
    doShake(); doFlash('#ff0000','.38');
    doScreenTear(6); doScanBar();
    doGlitch(); setTimeout(doGlitch,80); setTimeout(doGlitch,180); setTimeout(doGlitch,300);
    doChromaticBleed(220); doZoomPulse();
    playStaticBurst(0.14);
  },11500);

  pbT(()=>{ playIonScream(1.4, 0.16); doNegative(80); doChromaticBleed(160); },12000);
  pbT(()=>{ doScanBar(); playStaticBurst(0.11); doScanFlicker(3); doPixelBreak(16); },12500);

  // ══ FASE 6: BUZZ RUNDE #3 — KRITISK ═════════════════════════════
  pbT(()=>{
    playBuzzer();
    document.getElementById('prelude-center').style.background='rgba(70,0,0,.75)';
    doFlash('#cc0000','.5');
    playSiren(2, 0.14); playResonance(82, 2.2, 0.14);
    doScanBar(); doZoomPulse();
    doMegaShake(); doScreenTear(8);
    doChromaticBleed(350); doNegative(90);
    playSubBoom(0.20);
  },13000);

  pbT(()=>{ playDeepRumble(1.6,0.26); doScreenTear(7); doScanBar(); },13500);
  pbT(()=>{ playMetalStress(); doPixelBreak(25); doNegative(60); },14000);
  pbT(()=>{ doScanFlicker(5); doChromaticBleed(200); doZoomPulse(); },14400);

  // ══ FASE 7: ABSOLUTT KAOS — OPPBYGGING TIL FINALE ════════════════
  pbT(()=>{
    playBuzzer(); playExplosion(0.26); playDeepRumble(1.2,0.28);
    doMegaShake(); doEmp(); doZoomPulse();
    doWhiteout(60, 250);
    doChromaticBleed(500); doNegative(110);
    doScreenTear(16); doPixelBreak(55); doScanBar();
    // 10 glitcher spread over 800ms
    [0,55,120,195,285,390,510,650,790,960].forEach(d=>setTimeout(doGlitch,d));
    doFlash('#ff1a1a','0.7');
    playStaticBurst(0.17); playMetalStress(); playIonScream(1.2, 0.16);
  },14700);

  pbT(()=>{ doScanBar(); doScanFlicker(5); playSubBoom(0.22); doChromaticBleed(220); },15200);
  pbT(()=>{ doWhiteout(180,320); doChromaticBleed(280); playStaticBurst(0.15); },15500);
  pbT(()=>{ doScreenTear(9); playMetalStress(); doNegative(70); },16000);
  pbT(()=>{ doScanFlicker(4); doZoomPulse(); doChromaticBleed(180); },16350);

  // ══ FASE 8: TELEFON SPRENGES — OVERGANG TIL TERMINAL ════════════
  pbT(()=>{
    clearInterval(phoneCdIv);
    const ph=document.getElementById('phone');
    ph.style.transition='opacity .15s,transform .15s';
    ph.style.opacity='0'; ph.style.transform='scale(1.28) rotate(-4deg)';

    // MEGA finale SFX
    doWhiteout(280, 600);
    doEmp(); doMegaShake(); doZoomPulse();
    playExplosion(0.28); playIonScream(2.0, 0.20); playDeepRumble(2.0,0.30);
    playSubBoom(0.26); playStaticBurst(0.18); playStaticCrackle(0.5,0.16);

    // VFX bombardement
    doFlash('#ff2200','1.0');
    doScreenTear(18); doPixelBreak(70);
    doChromaticBleed(550); doNegative(140);
    doScanBar(); setTimeout(doScanBar,180); setTimeout(doScanBar,360);
    doScanFlicker(8);
    [0,60,140,260,400,580,800].forEach(d=>setTimeout(doGlitch,d));

    pbT(()=>{
      document.getElementById('pre-boot').classList.add('gone');
      document.getElementById('boot').classList.add('active');
      setTimeout(typeBoot,300);
    },600);
  },16700);
}

// Audio resumed on any interaction (see top of audio engine)

// Live clock on the start gate
// Live clock on gate
(function(){
  const el=document.getElementById('sg-time-display');
  if(!el) return;
  function tick(){ const n=new Date(); el.textContent=[n.getHours(),n.getMinutes(),n.getSeconds()].map(v=>String(v).padStart(2,'0')).join(':'); }
  tick(); setInterval(tick,1000);
})();

// ══════════════════════════════════════════════════
//  PHOTO CREDITS DIALOG
// ══════════════════════════════════════════════════
function showCredits(){
  const list=document.getElementById('credits-list');
  const seen=new Set();
  list.innerHTML=Object.values(PHOTOS).filter(ph=>{
    if(!ph.by||seen.has(ph.src)) return false; seen.add(ph.src); return true;
  }).map(ph=>`<li><span class="cr-what">${esc(ph.alt||'')}</span><span class="cr-who">${ph.url?`<a href="${ph.url}" target="_blank" rel="noopener">${esc(ph.by)}</a>`:esc(ph.by)} · ${esc(ph.license||'')}</span></li>`).join('')
    || '<li>Ingen kreditter registrert.</li>';
  const dlg=document.getElementById('credits');
  dlg.hidden=false;
  dlg.querySelector('button').focus();
}
function hideCredits(){
  document.getElementById('credits').hidden=true;
  const gate=document.getElementById('start-gate'); if(gate) gate.focus({preventScroll:true});
}
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&!document.getElementById('credits').hidden) hideCredits();
});
