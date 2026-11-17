'use strict';
// All sound: generated live with the Web Audio API, no audio files.

// ══════════════════════════════════════════════════
//  AUDIO ENGINE
// ══════════════════════════════════════════════════
let audioCtx=null, masterGain=null;

function initAudio(){
  if(audioCtx){
    if(audioCtx.state==='suspended') audioCtx.resume().then(()=>{ if(!droneStarted) startDrone(); });
    return;
  }
  try{
    audioCtx=new(window.AudioContext||window.webkitAudioContext)();
    masterGain=audioCtx.createGain(); masterGain.gain.value=prefs.muted?0:0.26;
    masterGain.connect(audioCtx.destination);
    // Resume async — start drone once context is actually running
    const go=()=>{ if(!droneStarted) startDrone(); };
    if(audioCtx.state==='suspended') audioCtx.resume().then(go); else go();
  }catch(e){ audioCtx=null; }
}

// ── Heartbeat state — declared early: resetState and updateCD reference these ──
let hbIv=null, heartbeatMode=0, hbRunning=false;

// ── Pre-boot timer list — declared early: inline onclick fires before script end ──
let preBootTimers=[];

// ── Phone countdown — declared early: skipPreBoot references phoneCdIv ──
let phoneCdSecs=86400, phoneCdIv=null;

// ── Game state — declared early: drawStatic() reads state.rad before state section ──
let state={frykt:20,mot:50,kunnskap:10,rad:0,inventory:[],path:[],visited:new Set()};

// ── Rad/cd milestones — declared early: resetState() assigns these before their section ──
let radMilestones=new Set(), cdMilestones=new Set();

// ── Boot screen vars — declared early: skipBoot/typeBoot called via inline onclick ──
let bIdx=0, cIdx=0, bootIv=null;

// ── Pre-boot text constants — declared early: startPreBoot uses these ──
const ALERT_TITLE_TXT='KRISEVARSEL — NORSK METEOROLOGISK INSTITUTT';
const ALERT_BODY_TXT='Solstorm kategori X99 bekreftet av 14 internasjonale observatorier. Estimert treffpunkt: 24 timer. Dødelig strålingsdose garantert i åpent terreng.\n\nFjellbunkeren ved Gaustablikk er åpen. Kapasitet: 50 000. Evakuer UMIDDELBART.';

let droneStarted=false;

// Guard: returns true only if audio is actually ready to play
function audioReady(){ return audioCtx&&audioCtx.state==='running'; }

// Resume on ANY user interaction
['click','keydown','touchstart'].forEach(ev=>
  document.addEventListener(ev, ()=>{ if(audioCtx&&audioCtx.state==='suspended') audioCtx.resume(); }, {passive:true})
);

function startDrone(){
  if(droneStarted||!audioCtx) return;
  droneStarted=true;
  const osc1=audioCtx.createOscillator(), osc2=audioCtx.createOscillator();
  const g=audioCtx.createGain(), lp=audioCtx.createBiquadFilter();
  g.gain.setValueAtTime(0,audioCtx.currentTime);
  g.gain.linearRampToValueAtTime(0.065,audioCtx.currentTime+4);
  lp.type='lowpass'; lp.frequency.value=180;
  osc1.type='sawtooth'; osc1.frequency.value=38;
  osc2.type='triangle'; osc2.frequency.value=52;
  osc1.connect(g); osc2.connect(g); g.connect(lp); lp.connect(masterGain);
  const lfo=audioCtx.createOscillator(), lg=audioCtx.createGain();
  lfo.frequency.value=0.07; lg.gain.value=9;
  lfo.connect(lg); lg.connect(osc1.frequency);
  osc1.start(); osc2.start(); lfo.start();
}

function playClick(){
  if(!audioReady())return;
  // Primary transient
  const o=audioCtx.createOscillator(), g=audioCtx.createGain();
  o.type='square'; o.frequency.value=820;
  o.frequency.setValueAtTime(820,audioCtx.currentTime);
  o.frequency.exponentialRampToValueAtTime(420,audioCtx.currentTime+0.05);
  g.gain.setValueAtTime(0.12,audioCtx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.07);
  o.connect(g); g.connect(masterGain); o.start(); o.stop(audioCtx.currentTime+0.07);
  // Metallic resonance
  const o2=audioCtx.createOscillator(), g2=audioCtx.createGain();
  o2.type='sine'; o2.frequency.value=3200;
  g2.gain.setValueAtTime(0.03,audioCtx.currentTime);
  g2.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.04);
  o2.connect(g2); g2.connect(masterGain); o2.start(); o2.stop(audioCtx.currentTime+0.04);
}

function playAlarm(){
  if(!audioReady())return;
  [880,1200,880,1200].forEach((f,i)=>{
    const o=audioCtx.createOscillator(), g=audioCtx.createGain();
    const lp=audioCtx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=2200;
    const t=audioCtx.currentTime+i*0.15;
    o.type='square'; o.frequency.value=f;
    g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(0.22,t+0.02);
    g.gain.setValueAtTime(0.22,t+0.1); g.gain.exponentialRampToValueAtTime(0.001,t+0.14);
    o.connect(lp); lp.connect(g); g.connect(masterGain); o.start(t); o.stop(t+0.16);
  });
}

function playGlitch(){
  if(!audioReady())return;
  const flavor=Math.random();
  if(flavor<0.33){
    // Digital corruption burst — bandpass noise
    const sz=Math.floor(audioCtx.sampleRate*0.05);
    const buf=audioCtx.createBuffer(1,sz,audioCtx.sampleRate);
    const d=buf.getChannelData(0);
    for(let i=0;i<sz;i++) d[i]=(Math.random()*2-1)*0.3;
    const s=audioCtx.createBufferSource(), g=audioCtx.createGain();
    const f=audioCtx.createBiquadFilter(); f.type='bandpass'; f.frequency.value=2600+Math.random()*800; f.Q.value=5;
    g.gain.setValueAtTime(0.2,audioCtx.currentTime); g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.05);
    s.buffer=buf; s.connect(f); f.connect(g); g.connect(masterGain); s.start();
  } else if(flavor<0.66){
    // Bit-crush crunch — square wave stutter
    [1,2,3].forEach(i=>{
      const o=audioCtx.createOscillator(), g=audioCtx.createGain();
      const t=audioCtx.currentTime+i*0.018;
      o.type='square'; o.frequency.value=220+Math.random()*1800;
      g.gain.setValueAtTime(0.08,t); g.gain.exponentialRampToValueAtTime(0.001,t+0.015);
      o.connect(g); g.connect(masterGain); o.start(t); o.stop(t+0.018);
    });
  } else {
    // Frequency sweep — pitch-shift zap
    const o=audioCtx.createOscillator(), g=audioCtx.createGain();
    o.type='sawtooth';
    o.frequency.setValueAtTime(3200,audioCtx.currentTime);
    o.frequency.exponentialRampToValueAtTime(180,audioCtx.currentTime+0.08);
    g.gain.setValueAtTime(0.09,audioCtx.currentTime); g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.08);
    o.connect(g); g.connect(masterGain); o.start(); o.stop(audioCtx.currentTime+0.09);
  }
}

function playEmp(){
  if(!audioReady())return;
  const sz=audioCtx.sampleRate*0.25, buf=audioCtx.createBuffer(1,sz,audioCtx.sampleRate);
  const d=buf.getChannelData(0);
  for(let i=0;i<sz;i++) d[i]=(Math.random()*2-1)*Math.exp(-i/(sz*0.3))*0.5;
  const s=audioCtx.createBufferSource(), g=audioCtx.createGain(), f=audioCtx.createBiquadFilter();
  f.type='highpass'; f.frequency.value=200; g.gain.value=0.26;
  s.buffer=buf; s.connect(f); f.connect(g); g.connect(masterGain); s.start();
}

function playEndSound(type){
  if(!audioReady())return;
  if(type==='bad'){
    [220,196,174,146].forEach((f,i)=>{
      const o=audioCtx.createOscillator(), g=audioCtx.createGain();
      const t=audioCtx.currentTime+i*0.5; o.type='sawtooth'; o.frequency.value=f;
      g.gain.setValueAtTime(0.14,t); g.gain.exponentialRampToValueAtTime(0.001,t+0.44);
      o.connect(g); g.connect(masterGain); o.start(t); o.stop(t+0.5);
    });
  }else if(type==='good'){
    [440,554,660,880,1100].forEach((f,i)=>{
      const o=audioCtx.createOscillator(), g=audioCtx.createGain();
      const t=audioCtx.currentTime+i*0.28; o.type='triangle'; o.frequency.value=f;
      g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(0.18,t+0.12);
      g.gain.exponentialRampToValueAtTime(0.001,t+0.75);
      o.connect(g); g.connect(masterGain); o.start(t); o.stop(t+0.8);
    });
  }else if(type==='secret'){
    [262,330,392,494,523,659,784,988,1047,1319].forEach((f,i)=>{
      const o=audioCtx.createOscillator(), g=audioCtx.createGain();
      const t=audioCtx.currentTime+i*0.15; o.type='sine'; o.frequency.value=f;
      g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(0.14,t+0.08);
      g.gain.exponentialRampToValueAtTime(0.001,t+0.45);
      o.connect(g); g.connect(masterGain); o.start(t); o.stop(t+0.5);
    });
  }else if(type==='rad'){
    [80,60,40].forEach((f,i)=>{
      const o=audioCtx.createOscillator(), g=audioCtx.createGain();
      const t=audioCtx.currentTime+i*0.7; o.type='sawtooth'; o.frequency.value=f;
      g.gain.setValueAtTime(0.2,t); g.gain.linearRampToValueAtTime(0,t+0.65);
      o.connect(g); g.connect(masterGain); o.start(t); o.stop(t+0.7);
    });
  }
}

function playBuzzer(){
  if(!audioReady())return;
  [0,0.38,0.76].forEach(t=>{
    const o=audioCtx.createOscillator(),g=audioCtx.createGain();
    o.type='square'; o.frequency.value=870;
    const st=audioCtx.currentTime+t;
    g.gain.setValueAtTime(0,st); g.gain.linearRampToValueAtTime(0.16,st+0.025);
    g.gain.setValueAtTime(0.16,st+0.22); g.gain.linearRampToValueAtTime(0,st+0.28);
    o.connect(g); g.connect(masterGain); o.start(st); o.stop(st+0.3);
  });
}
function playEbsTone(){
  if(!audioReady())return;
  [853,960].forEach(freq=>{
    const o=audioCtx.createOscillator(),g=audioCtx.createGain();
    o.type='sine'; o.frequency.value=freq;
    g.gain.setValueAtTime(0,audioCtx.currentTime);
    g.gain.linearRampToValueAtTime(0.14,audioCtx.currentTime+0.1);
    g.gain.setValueAtTime(0.14,audioCtx.currentTime+3.5);
    g.gain.linearRampToValueAtTime(0,audioCtx.currentTime+4);
    o.connect(g); g.connect(masterGain); o.start(); o.stop(audioCtx.currentTime+4.1);
  });
}

// ── SIREN: stiger og faller, repetering ────────────
function playSiren(reps=2,vol=0.20){
  if(!audioReady())return;
  for(let i=0;i<reps;i++){
    const o=audioCtx.createOscillator(), g=audioCtx.createGain();
    const t=audioCtx.currentTime+i*1.1;
    o.type='sawtooth';
    o.frequency.setValueAtTime(440,t);
    o.frequency.linearRampToValueAtTime(880,t+0.45);
    o.frequency.linearRampToValueAtTime(440,t+0.9);
    g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(vol,t+0.05);
    g.gain.setValueAtTime(vol,t+0.85); g.gain.linearRampToValueAtTime(0,t+1.0);
    const lp=audioCtx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=1200;
    o.connect(lp); lp.connect(g); g.connect(masterGain); o.start(t); o.stop(t+1.05);
  }
}

// ── STATIC CRACKLE: TV-statisk lyd ─────────────────
function playStaticCrackle(dur=0.8,vol=0.20){
  if(!audioReady())return;
  const sz=Math.floor(audioCtx.sampleRate*dur);
  const buf=audioCtx.createBuffer(1,sz,audioCtx.sampleRate);
  const d=buf.getChannelData(0);
  for(let i=0;i<sz;i++) d[i]=(Math.random()*2-1)*(1-i/sz)*0.9;
  const s=audioCtx.createBufferSource(), g=audioCtx.createGain();
  const hp=audioCtx.createBiquadFilter(); hp.type='highpass'; hp.frequency.value=1800;
  g.gain.value=vol; s.buffer=buf;
  s.connect(hp); hp.connect(g); g.connect(masterGain); s.start();
}

// ── EXPLOSION: lav boom for dramatiske øyeblikk ─────
function playExplosion(vol=0.26){
  if(!audioReady())return;
  const sz=Math.floor(audioCtx.sampleRate*1.2);
  const buf=audioCtx.createBuffer(1,sz,audioCtx.sampleRate);
  const d=buf.getChannelData(0);
  for(let i=0;i<sz;i++) d[i]=(Math.random()*2-1)*Math.exp(-i/(sz*0.18));
  const s=audioCtx.createBufferSource(), g=audioCtx.createGain();
  const lp=audioCtx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=280;
  g.gain.value=vol; s.buffer=buf;
  s.connect(lp); lp.connect(g); g.connect(masterGain); s.start();
}

// ── HOVER: mykt pip på valgknapper ─────────────────
function playHover(){
  if(!audioReady())return;
  const o=audioCtx.createOscillator(), g=audioCtx.createGain();
  o.type='sine'; o.frequency.value=620;
  g.gain.setValueAtTime(0.07,audioCtx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.06);
  o.connect(g); g.connect(masterGain); o.start(); o.stop(audioCtx.currentTime+0.07);
}

// ── INTERCEPT: scanline pip ─────────────────────────
function playIntercept(){
  if(!audioReady())return;
  [1400,1100,900,1400].forEach((f,i)=>{
    const o=audioCtx.createOscillator(), g=audioCtx.createGain();
    const t=audioCtx.currentTime+i*0.09;
    o.type='square'; o.frequency.value=f;
    g.gain.setValueAtTime(0.13,t); g.gain.exponentialRampToValueAtTime(0.001,t+0.07);
    o.connect(g); g.connect(masterGain); o.start(t); o.stop(t+0.08);
  });
}

// ── GEIGER: tikkende strålingsdetektor ─────────────
let geigerIv=null;
function startGeiger(intensity=1){
  if(!audioReady())return;
  if(geigerIv) clearInterval(geigerIv);
  const minMs=intensity>2?80:intensity>1?180:380;
  const maxMs=intensity>2?250:intensity>1?600:1400;
  function tick(){
    if(!audioReady())return;
    const o=audioCtx.createOscillator(), g=audioCtx.createGain();
    o.type='square'; o.frequency.value=2200+Math.random()*800;
    g.gain.setValueAtTime(0.07,audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.018);
    o.connect(g); g.connect(masterGain); o.start(); o.stop(audioCtx.currentTime+0.02);
    geigerIv=setTimeout(tick, minMs+Math.random()*(maxMs-minMs));
  }
  tick();
}
function stopGeiger(){ if(geigerIv){clearTimeout(geigerIv); geigerIv=null;} }

// ── WHOOSH: sceneskift svupp ────────────────────────
function playWhoosh(){
  if(!audioReady())return;
  // Air whoosh — shaped noise
  const sz=Math.floor(audioCtx.sampleRate*0.35);
  const buf=audioCtx.createBuffer(1,sz,audioCtx.sampleRate);
  const d=buf.getChannelData(0);
  for(let i=0;i<sz;i++) d[i]=(Math.random()*2-1)*(i/sz)*(1-i/sz)*4;
  const s=audioCtx.createBufferSource(), g=audioCtx.createGain();
  const bp=audioCtx.createBiquadFilter(); bp.type='bandpass'; bp.frequency.value=700; bp.Q.value=0.7;
  g.gain.value=0.14; s.buffer=buf;
  s.connect(bp); bp.connect(g); g.connect(masterGain); s.start();
  // Sub bass thump
  const ob=audioCtx.createOscillator(), gb=audioCtx.createGain();
  const lp=audioCtx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=90;
  ob.type='sine'; ob.frequency.setValueAtTime(65,audioCtx.currentTime);
  ob.frequency.exponentialRampToValueAtTime(30,audioCtx.currentTime+0.22);
  gb.gain.setValueAtTime(0.09,audioCtx.currentTime); gb.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.25);
  ob.connect(lp); lp.connect(gb); gb.connect(masterGain); ob.start(); ob.stop(audioCtx.currentTime+0.26);
}

// ── TYPEKEY: tastetrykk-klikk ──────────────────────
function playTypeKey(){
  if(!audioReady())return;
  const o=audioCtx.createOscillator(), g=audioCtx.createGain();
  o.type='square'; o.frequency.value=1800+Math.random()*400;
  g.gain.setValueAtTime(0.04,audioCtx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.025);
  o.connect(g); g.connect(masterGain); o.start(); o.stop(audioCtx.currentTime+0.03);
}

// ── ITEM PICKUP: positiv pling ──────────────────────
function playItemGet(){
  if(!audioReady())return;
  [523,659,784,1047].forEach((f,i)=>{
    const o=audioCtx.createOscillator(), g=audioCtx.createGain();
    const t=audioCtx.currentTime+i*0.1; o.type='triangle'; o.frequency.value=f;
    g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(0.16,t+0.04);
    g.gain.exponentialRampToValueAtTime(0.001,t+0.22);
    o.connect(g); g.connect(masterGain); o.start(t); o.stop(t+0.25);
  });
}

// ── HEARTBEAT: ekte lub-dub for høy fare ────────────
function startHeartbeat(fast=false){
  if(hbIv) clearTimeout(hbIv);
  hbRunning=true;
  const bpm=fast?128:70;
  function beat(){
    if(!hbRunning||!audioReady()){hbIv=null;return;}
    try{
      // Lub
      const o1=audioCtx.createOscillator(),g1=audioCtx.createGain();
      const lp1=audioCtx.createBiquadFilter(); lp1.type='lowpass'; lp1.frequency.value=110;
      o1.type='sine'; o1.frequency.value=60;
      g1.gain.setValueAtTime(0.2,audioCtx.currentTime);
      g1.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.13);
      o1.connect(lp1); lp1.connect(g1); g1.connect(masterGain); o1.start(); o1.stop(audioCtx.currentTime+0.14);
      // Dub
      const o2=audioCtx.createOscillator(),g2=audioCtx.createGain();
      const lp2=audioCtx.createBiquadFilter(); lp2.type='lowpass'; lp2.frequency.value=100;
      o2.type='sine'; o2.frequency.value=48;
      const t2=audioCtx.currentTime+0.2;
      g2.gain.setValueAtTime(0.13,t2); g2.gain.exponentialRampToValueAtTime(0.001,t2+0.1);
      o2.connect(lp2); lp2.connect(g2); g2.connect(masterGain); o2.start(t2); o2.stop(t2+0.11);
    }catch(e){}
    if(hbRunning) hbIv=setTimeout(beat,60000/bpm);
  }
  beat();
}
function stopHeartbeat(){
  hbRunning=false;
  if(hbIv){clearTimeout(hbIv);hbIv=null;}
  heartbeatMode=0;
}

// ── TENSION STINGER: stigende dissonant akkord ──────
function playTension(){
  if(!audioReady())return;
  try{
  [218,231].forEach(f=>{
    const o=audioCtx.createOscillator(),g=audioCtx.createGain();
    const lp=audioCtx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=850;
    o.type='sawtooth';
    o.frequency.setValueAtTime(f,audioCtx.currentTime);
    o.frequency.linearRampToValueAtTime(f*1.9,audioCtx.currentTime+1.8);
    g.gain.setValueAtTime(0,audioCtx.currentTime);
    g.gain.linearRampToValueAtTime(0.13,audioCtx.currentTime+0.3);
    g.gain.setValueAtTime(0.13,audioCtx.currentTime+1.4);
    g.gain.linearRampToValueAtTime(0,audioCtx.currentTime+2.0);
    o.connect(lp); lp.connect(g); g.connect(masterGain);
    o.start(); o.stop(audioCtx.currentTime+2.1);
  });
  }catch(e){}
}

// ── RADIO CHATTER: AM-filtrert støy som ligner stemme ──
function playRadioChatter(){
  if(!audioReady())return;
  try{
  const dur=0.45+Math.random()*0.7;
  const sz=Math.floor(audioCtx.sampleRate*dur);
  const buf=audioCtx.createBuffer(1,sz,audioCtx.sampleRate);
  const d=buf.getChannelData(0);
  for(let i=0;i<sz;i++){
    const env=Math.sin(i/sz*Math.PI);
    const am=0.5+0.5*Math.sin(i/audioCtx.sampleRate*160*Math.PI*2);
    d[i]=(Math.random()*2-1)*env*am;
  }
  const s=audioCtx.createBufferSource();
  const bp=audioCtx.createBiquadFilter(); bp.type='bandpass'; bp.frequency.value=1050; bp.Q.value=2.8;
  const hp=audioCtx.createBiquadFilter(); hp.type='highpass'; hp.frequency.value=550;
  const g=audioCtx.createGain(); g.gain.value=0.09;
  s.buffer=buf; s.connect(bp); bp.connect(hp); hp.connect(g); g.connect(masterGain); s.start();
  }catch(e){}
}

// ── RAD PULSE: lav tung puls ved strålings-milepæler ──
function playRadPulse(){
  if(!audioReady())return;
  [52,42,35].forEach((f,i)=>{
    const o=audioCtx.createOscillator(),g=audioCtx.createGain();
    const lp=audioCtx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=150;
    const t=audioCtx.currentTime+i*0.6;
    o.type='sine'; o.frequency.value=f;
    g.gain.setValueAtTime(0.20,t); g.gain.exponentialRampToValueAtTime(0.001,t+0.55);
    o.connect(lp); lp.connect(g); g.connect(masterGain); o.start(t); o.stop(t+0.6);
  });
}

// Random ambient radio chatter — started from beginExperience()
function scheduleRadioChatter(){
  setTimeout(()=>{
    playRadioChatter();
    if(Math.random()>.45) setTimeout(playRadioChatter, 900+Math.random()*600);
    scheduleRadioChatter();
  }, 40000+Math.random()*55000);
}


// ── SECOND TICK: metronomisk tikk i kritisk fase ────
function playSecondTick(soft=false){
  if(!audioReady())return;
  const o=audioCtx.createOscillator(), g=audioCtx.createGain();
  o.type='sine'; o.frequency.value=soft?640:1100;
  const vol=soft?0.028:0.055;
  g.gain.setValueAtTime(vol,audioCtx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.045);
  o.connect(g); g.connect(masterGain); o.start(); o.stop(audioCtx.currentTime+0.05);
}

// ── COUNTDOWN MILESTONE: dramatisk overgangs-stinger ──
function playCountdownMilestone(level='amber'){
  if(!audioReady())return;
  if(level==='amber'){
    // Soft descending chime
    [523,440,349].forEach((f,i)=>{
      const o=audioCtx.createOscillator(), g=audioCtx.createGain();
      const t=audioCtx.currentTime+i*0.28; o.type='triangle'; o.frequency.value=f;
      g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(0.09,t+0.04);
      g.gain.exponentialRampToValueAtTime(0.001,t+0.4);
      o.connect(g); g.connect(masterGain); o.start(t); o.stop(t+0.42);
    });
  } else if(level==='warn'){
    // Sharp two-tone alert
    [330,495,330,495].forEach((f,i)=>{
      const o=audioCtx.createOscillator(), g=audioCtx.createGain();
      const lp=audioCtx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=1800;
      const t=audioCtx.currentTime+i*0.16; o.type='square'; o.frequency.value=f;
      g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(0.12,t+0.02);
      g.gain.exponentialRampToValueAtTime(0.001,t+0.14);
      o.connect(lp); lp.connect(g); g.connect(masterGain); o.start(t); o.stop(t+0.15);
    });
  } else {
    // Critical — rising screech then bass slam
    const o=audioCtx.createOscillator(), g=audioCtx.createGain();
    o.type='sawtooth';
    o.frequency.setValueAtTime(110,audioCtx.currentTime);
    o.frequency.exponentialRampToValueAtTime(2200,audioCtx.currentTime+0.35);
    g.gain.setValueAtTime(0,audioCtx.currentTime); g.gain.linearRampToValueAtTime(0.18,audioCtx.currentTime+0.12);
    g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.38);
    o.connect(g); g.connect(masterGain); o.start(); o.stop(audioCtx.currentTime+0.4);
    // Bass slam
    const ob=audioCtx.createOscillator(), gb=audioCtx.createGain();
    const lp=audioCtx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=120;
    ob.type='sine'; ob.frequency.setValueAtTime(80,audioCtx.currentTime+0.3);
    ob.frequency.exponentialRampToValueAtTime(30,audioCtx.currentTime+0.9);
    gb.gain.setValueAtTime(0,audioCtx.currentTime+0.3); gb.gain.linearRampToValueAtTime(0.35,audioCtx.currentTime+0.38);
    gb.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.95);
    ob.connect(lp); lp.connect(gb); gb.connect(masterGain); ob.start(audioCtx.currentTime+0.3); ob.stop(audioCtx.currentTime+1.0);
  }
}

// ── THUNDER: romling etter lyn ───────────────────────
function playThunder(){
  if(!audioReady())return;
  const dur=1.8+Math.random()*1.4;
  const sz=Math.floor(audioCtx.sampleRate*dur);
  const buf=audioCtx.createBuffer(1,sz,audioCtx.sampleRate);
  const d=buf.getChannelData(0);
  // Shaped noise — initial crack then rumble decay
  for(let i=0;i<sz;i++){
    const t=i/sz;
    const env=t<0.05 ? t/0.05 : Math.exp(-(t-0.05)*3.5);
    d[i]=(Math.random()*2-1)*env;
  }
  const s=audioCtx.createBufferSource(), g=audioCtx.createGain();
  const lp=audioCtx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=260;
  const lp2=audioCtx.createBiquadFilter(); lp2.type='lowpass'; lp2.frequency.value=180;
  g.gain.value=0.28;
  s.buffer=buf; s.connect(lp); lp.connect(lp2); lp2.connect(g); g.connect(masterGain); s.start();
}


function playDistantBoom(){
  if(!audioReady())return;
  const o=audioCtx.createOscillator(), g=audioCtx.createGain();
  o.type='sine'; o.frequency.value=55;
  const t=audioCtx.currentTime;
  g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(0.13,t+0.3);
  g.gain.setValueAtTime(0.13,t+0.6); g.gain.exponentialRampToValueAtTime(0.001,t+2.2);
  o.connect(g); g.connect(masterGain); o.start(t); o.stop(t+2.5);
}

// ── ION SCREAM: ionosfærisk stigende hvin ──────────
function playIonScream(dur=2.8,vol=0.22){
  if(!audioReady())return;
  try{
  const o=audioCtx.createOscillator(), g=audioCtx.createGain();
  const dist=audioCtx.createWaveShaper();
  const curve=new Float32Array(256);
  for(let i=0;i<256;i++){const x=i*2/255-1; curve[i]=x<0?-Math.pow(-x,.6):Math.pow(x,.6)*1.3;}
  dist.curve=curve;
  o.type='sawtooth';
  o.frequency.setValueAtTime(65,audioCtx.currentTime);
  o.frequency.exponentialRampToValueAtTime(3800,audioCtx.currentTime+dur*0.82);
  o.frequency.setValueAtTime(3800,audioCtx.currentTime+dur*0.82);
  o.frequency.exponentialRampToValueAtTime(180,audioCtx.currentTime+dur);
  g.gain.setValueAtTime(0,audioCtx.currentTime);
  g.gain.linearRampToValueAtTime(vol,audioCtx.currentTime+0.18);
  g.gain.setValueAtTime(vol,audioCtx.currentTime+dur*0.75);
  g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+dur+0.1);
  const lp=audioCtx.createBiquadFilter(); lp.type='bandpass'; lp.frequency.value=900; lp.Q.value=1.2;
  o.connect(dist); dist.connect(lp); lp.connect(g); g.connect(masterGain);
  o.start(); o.stop(audioCtx.currentTime+dur+0.15);
  }catch(e){}
}

// ── DEEP RUMBLE: jordskjelvende lav-frekvensstøy ───
function playDeepRumble(dur=1.4,vol=0.22){
  if(!audioReady())return;
  try{
  const sz=Math.floor(audioCtx.sampleRate*dur);
  const buf=audioCtx.createBuffer(1,sz,audioCtx.sampleRate);
  const d=buf.getChannelData(0);
  for(let i=0;i<sz;i++){
    const t=i/sz;
    const env=t<0.08?t/0.08:Math.exp(-(t-0.08)*2.2);
    d[i]=(Math.random()*2-1)*env;
  }
  const s=audioCtx.createBufferSource(), g=audioCtx.createGain();
  const lp=audioCtx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=95;
  const lp2=audioCtx.createBiquadFilter(); lp2.type='lowpass'; lp2.frequency.value=65;
  g.gain.value=vol; s.buffer=buf;
  s.connect(lp); lp.connect(lp2); lp2.connect(g); g.connect(masterGain); s.start();
  }catch(e){}
}

// ── METAL STRESS: infrastruktur som knaker ─────────
function playMetalStress(){
  if(!audioReady())return;
  try{
  const freqs=[180,243,187,260,155];
  freqs.forEach((f,i)=>{
    const o=audioCtx.createOscillator(), g=audioCtx.createGain();
    const mod=audioCtx.createOscillator(), modG=audioCtx.createGain();
    const t=audioCtx.currentTime+i*0.06;
    o.type='sawtooth'; o.frequency.value=f;
    mod.type='sine'; mod.frequency.value=3.5+Math.random()*4;
    modG.gain.value=f*0.28;
    mod.connect(modG); modG.connect(o.frequency);
    g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(0.10,t+0.04);
    g.gain.exponentialRampToValueAtTime(0.001,t+0.32+Math.random()*0.2);
    const bp=audioCtx.createBiquadFilter(); bp.type='bandpass'; bp.frequency.value=f*1.8; bp.Q.value=4;
    o.connect(bp); bp.connect(g); g.connect(masterGain);
    o.start(t); o.stop(t+0.55); mod.start(t); mod.stop(t+0.55);
  });
  }catch(e){}
}

// ── STATIC BURST: skarp bred støysmell ─────────────
function playStaticBurst(vol=0.18){
  if(!audioReady())return;
  try{
  const sz=Math.floor(audioCtx.sampleRate*0.12);
  const buf=audioCtx.createBuffer(1,sz,audioCtx.sampleRate);
  const d=buf.getChannelData(0);
  for(let i=0;i<sz;i++) d[i]=(Math.random()*2-1)*Math.exp(-i/(sz*0.25));
  const s=audioCtx.createBufferSource(), g=audioCtx.createGain();
  const hp=audioCtx.createBiquadFilter(); hp.type='highpass'; hp.frequency.value=2200;
  g.gain.value=vol; s.buffer=buf;
  s.connect(hp); hp.connect(g); g.connect(masterGain); s.start();
  }catch(e){}
}

// ── SUB BOOM: enkelt massivt sub-slag ──────────────
function playSubBoom(vol=0.22){
  if(!audioReady())return;
  try{
  const o=audioCtx.createOscillator(), g=audioCtx.createGain();
  const lp=audioCtx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=75;
  o.type='sine'; o.frequency.setValueAtTime(88,audioCtx.currentTime);
  o.frequency.exponentialRampToValueAtTime(22,audioCtx.currentTime+0.55);
  g.gain.setValueAtTime(0,audioCtx.currentTime);
  g.gain.linearRampToValueAtTime(vol,audioCtx.currentTime+0.03);
  g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.7);
  o.connect(lp); lp.connect(g); g.connect(masterGain); o.start(); o.stop(audioCtx.currentTime+0.75);
  }catch(e){}
}

// ── RESONANCE: svevende resonant bølge ─────────────
function playResonance(freq=220,dur=1.8,vol=0.16){
  if(!audioReady())return;
  try{
  [freq, freq*1.498, freq*1.999].forEach((f,i)=>{
    const o=audioCtx.createOscillator(), g=audioCtx.createGain();
    const t=audioCtx.currentTime+i*0.08;
    o.type='sine'; o.frequency.value=f;
    g.gain.setValueAtTime(0,t);
    g.gain.linearRampToValueAtTime(vol/(i+1),t+dur*0.25);
    g.gain.setValueAtTime(vol/(i+1),t+dur*0.6);
    g.gain.exponentialRampToValueAtTime(0.001,t+dur);
    o.connect(g); g.connect(masterGain); o.start(t); o.stop(t+dur+0.1);
  });
  }catch(e){}
}
