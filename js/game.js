'use strict';
// Game state, countdown, stats, items, toasts and the route tracker.

// ══════════════════════════════════════════════════
//  GAME STATE
// ══════════════════════════════════════════════════
// (state declared early above — drawStatic reads state.rad before this section)

function resetState(){
  state={frykt:20,mot:50,kunnskap:10,rad:0,inventory:[],path:[],visited:new Set()};
  radMilestones=new Set();
  cdMilestones=new Set();
  stopGeiger();
  stopHeartbeat();
  hbRunning=false;
  heartbeatMode=0;
  document.body.classList.remove('rad-warm','rad-high','rad-crit','cd-s3','cd-s4');
  document.getElementById('cd-wrap').classList.remove('s1','s2','s3','s4');
  cdEl.classList.remove('s1','s2','s3','s4');
  const sv=document.getElementById('static-canvas'); if(sv) sv.style.opacity='0.03';
  document.getElementById('inv-bar').innerHTML='';
  document.getElementById('path-nodes').innerHTML='';
  sceneCount=0;
  document.getElementById('scene-counter').textContent='SONE —';
  ['frykt','mot','kunnskap','rad'].forEach(k=>{
    const v={frykt:20,mot:50,kunnskap:10,rad:0}[k];
    document.getElementById('bar-'+k).style.width=v+'%';
    document.getElementById('val-'+k).textContent=v;
  });
  document.getElementById('rad-bar').style.width='0%';
  document.getElementById('danger-bar').style.width='0%';
}

// ══════════════════════════════════════════════════
//  COUNTDOWN
// ══════════════════════════════════════════════════
// (cdSecs and cdIv declared early above — before canvas code)
const cdEl=document.getElementById('cd');
const dangerBar=document.getElementById('danger-bar');
const radBar=document.getElementById('rad-bar');

function setCD(t){
  const[h,m,s]=t.split(':').map(Number); cdSecs=h*3600+m*60+s;
  if(cdIv) clearInterval(cdIv); updateCD();
  if(cdSecs>0) cdIv=setInterval(()=>{if(cdSecs>0){cdSecs--;updateCD();}else clearInterval(cdIv);},1000);
}
function updateCD(){
  const h=Math.floor(cdSecs/3600),m=Math.floor((cdSecs%3600)/60),s=cdSecs%60;
  cdEl.textContent=`${p2(h)}:${p2(m)}:${p2(s)}`;
  dangerBar.style.width=Math.min(100,(1-cdSecs/86400)*100)+'%';

  // 5-stage system based on time remaining
  const wrap=document.getElementById('cd-wrap');
  cdEl.classList.remove('s1','s2','s3','s4');
  wrap.classList.remove('s1','s2','s3','s4');
  document.body.classList.remove('cd-s3','cd-s4');
  if(cdSecs<600){          // < 10 min
    cdEl.classList.add('s4'); wrap.classList.add('s4');
    document.body.classList.add('cd-s4');
  } else if(cdSecs<3600){  // < 1h
    cdEl.classList.add('s3'); wrap.classList.add('s3');
    document.body.classList.add('cd-s3');
  } else if(cdSecs<10800){ // < 3h
    cdEl.classList.add('s2'); wrap.classList.add('s2');
  } else if(cdSecs<36000){ // < 10h
    cdEl.classList.add('s1'); wrap.classList.add('s1');
  }

  // Per-second tick bounce on the digit element
  cdEl.classList.remove('tick');
  void cdEl.offsetWidth;
  cdEl.classList.add('tick');

  // Per-second sounds at critical stages
  if(cdSecs<600 && cdSecs>0) playSecondTick();
  else if(cdSecs<3600 && cdSecs%60===0) playSecondTick(true);

  // Milestone events — fire once each (not at 00:00, which is an ending screen)
  if(cdSecs>0){
  if(cdSecs<36000&&!cdMilestones.has(36000)){
    cdMilestones.add(36000); playCountdownMilestone('amber');
  }
  if(cdSecs<3600&&!cdMilestones.has(3600)){
    cdMilestones.add(3600); playCountdownMilestone('warn');
    doFlash('#ffbe00','.18');
  }
  if(cdSecs<600&&!cdMilestones.has(600)){
    cdMilestones.add(600); playCountdownMilestone('crit');
    doFlash('#ff0000','.35'); doScanBar();
    showToast('☠ UNDER 10 MINUTTER IGJEN','warn');
  }
  }

  // Heartbeat mode management
  document.getElementById('game-wrap').classList.remove('hb-fast');
  if(cdSecs<600&&cdSecs>0) document.getElementById('game-wrap').classList.add('hb-fast');
  const newMode=cdSecs===0?0:cdSecs<600?2:cdSecs<3600?1:0;
  if(newMode!==heartbeatMode){
    heartbeatMode=newMode;
    if(newMode===0) stopHeartbeat();
    else startHeartbeat(newMode===2);
  }
}
function p2(n){return String(n).padStart(2,'0');}

// ══════════════════════════════════════════════════
//  STATS & ITEMS
// ══════════════════════════════════════════════════
function applyStat(k,d,label){
  if(!(k in state)) return;
  state[k]=Math.max(0,Math.min(100,state[k]+d));
  const bar=document.getElementById('bar-'+k);
  const val=document.getElementById('val-'+k);
  if(bar) bar.style.width=state[k]+'%';
  if(val) val.textContent=state[k];
  if(k==='rad') radBar.style.width=state.rad+'%';
  if(k==='rad') updateRadAmbience();
  if(label) showToast(`${d>0?'+':''}${d} ${label}`, d>0&&k!=='frykt'&&k!=='rad'?'good':'stat');
  if(k==='rad'&&d>0) checkRadMilestone(state.rad);

  // Floating number
  const colors={frykt:'#ff4444',mot:'#00ff88',kunnskap:'#00e5ff',rad:'#ff8800'};
  const isGood=d>0&&k!=='frykt'&&k!=='rad';
  const sign=d>0?'+':'';
  spawnStatFloat(bar, `${sign}${d} ${label||k.toUpperCase()}`, isGood?'#00ff88':'#ff4444');

  // Edge damage / healing flash
  doEdgeDamage(isGood);

  // Impact label for big swings
  if(Math.abs(d)>=25){
    const impColors={frykt:'#ff1a1a',mot:'#00ff88',kunnskap:'#00e5ff',rad:'#ff8800'};
    showImpact(`${sign}${d} ${label||k.toUpperCase()}`, impColors[k]||'#ff1a1a');
    if(!isGood) doMegaShake();
  }

  // Update threat level HUD
  updateThreatLevel();

  // RADIATION DEATH — the antidote (serum) saves you once
  if(k==='rad'&&state.rad>=100&&!state.dying){
    if(has('serum')){
      removeItem('serum');
      state.rad=70;
      if(bar) bar.style.width='70%';
      if(val) val.textContent='70';
      radBar.style.width='70%';
      updateRadAmbience(); updateThreatLevel();
      setTimeout(()=>showToast('💉 MOTGIFT BRUKT — STRÅLING SENKET TIL 70','good'),600);
    } else {
      state.dying=true;
    }
  }
}
function applyStats(obj){
  if(!obj) return;
  Object.entries(obj).forEach(([k,{d,label}])=>applyStat(k,d,label));
}

const ITEMS={
  minnepenn:    {label:'💾 MINNEPENN'},
  adgangskort:  {label:'🪪 VIP-KORT'},
  gasmaske:     {label:'😷 GASMASKE'},
  radiokode:    {label:'📡 RADIOKODE'},
  bunkerkart:   {label:'🗺 BUNKERKART'},
  serum:        {label:'💉 MOTGIFT'},
  sprengkap:    {label:'💥 SPRENGKAPSEL'},
  hacktool:     {label:'🖥 HACK-TOOL'},
  presseID:     {label:'📰 PRESSE-ID'},
  ubatkode:     {label:'⚓ UBÅTKODE'},
};

function addItem(id){
  if(state.inventory.includes(id)) return;
  state.inventory.push(id);
  const bar=document.getElementById('inv-bar');
  const el=document.createElement('div'); el.className='inv-item'; el.dataset.id=id;
  el.textContent=ITEMS[id]?.label||id; bar.appendChild(el);
  showToast('FANT: '+(ITEMS[id]?.label||id),'item');
  playItemGet();
}
function has(id){return state.inventory.includes(id);}
function removeItem(id){
  state.inventory=state.inventory.filter(x=>x!==id);
  const el=document.querySelector(`#inv-bar .inv-item[data-id="${id}"]`);
  if(el) el.remove();
}
function drawInventory(){
  const bar=document.getElementById('inv-bar'); bar.innerHTML='';
  state.inventory.forEach(id=>{
    const el=document.createElement('div'); el.className='inv-item'; el.dataset.id=id;
    el.textContent=ITEMS[id]?.label||id; bar.appendChild(el);
  });
}

// ══════════════════════════════════════════════════
//  TOAST
// ══════════════════════════════════════════════════
function showToast(msg,type='info'){
  const t=document.getElementById('toast');
  const el=document.createElement('div'); el.className='toast-item '+type;
  el.textContent=msg; t.appendChild(el);
  setTimeout(()=>{el.style.transition='opacity .5s';el.style.opacity='0';setTimeout(()=>el.remove(),500);},3500);
}

// ══════════════════════════════════════════════════
//  PATH
// ══════════════════════════════════════════════════
function updatePath(id){
  state.path.push(id);
  drawPath();
}
function drawPath(){
  const wrap=document.getElementById('path-nodes');
  wrap.innerHTML=state.path.map((p,i)=>{
    const lbl=STORY[p]?.shortName||p;
    const cur=i===state.path.length-1;
    return`${i>0?'<span class="path-arrow">→</span>':''}<span class="path-node${cur?' current':''}">${lbl}</span>`;
  }).join('');
}
