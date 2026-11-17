'use strict';
// Scene rendering, choices, saving/loading and restarting.

// ══════════════════════════════════════════════════
//  RENDER ENGINE
// ══════════════════════════════════════════════════
let renderToken=0, busy=false;
function render(passageId){
  const token=++renderToken;
  busy=true;
  kbChoices=[];
  initAudio();
  playClick();
  playWhoosh();
  doScanBar();
  doShockwave();
  doVignette();

  setTimeout(()=>{
    if(token!==renderToken) return;
    const p=STORY[passageId];
    if(!p){ busy=false; return; }

    // Autosave: the state as it was when entering this scene
    if(p.ending) lsDel(SAVE_KEY);
    else saveGame(passageId);

    state.visited.add(passageId);
    updatePath(passageId);
    setCD(p.time);
    if(p.rad&&p.rad>0) applyStat('rad',p.rad,'STRÅLING');
    if(p.stats) applyStats(p.stats);
    if(p.items) p.items.forEach(id=>addItem(id));

    // Radiation reached 100 with no antidote left
    if(state.dying&&passageId!=='slutt_rad'){
      lsDel(SAVE_KEY);
      setTimeout(()=>render('slutt_rad'),400);
      return;
    }

    // Geiger ticker — intensity scales with radiation level
    stopGeiger();
    if(!p.ending){
      if(state.rad>=70) startGeiger(3);
      else if(state.rad>=40) startGeiger(2);
      else if(state.rad>=15) startGeiger(1);
    } else {
      stopHeartbeat();
      document.getElementById('game-wrap').classList.remove('hb-fast');
    }

    if(p.intercept) setTimeout(()=>showIntercept(p.intercept),2000);

    if(p.ending){
      setTimeout(()=>playEndSound(p.ending),700);
      if(p.ending==='bad'){doFlash('#ff1a1a','.5'); doShake();}
      if(p.ending==='good'){doFlash('#ffbe00','.35');}
      if(p.ending==='secret'){doFlash('#00e5ff','.4'); doGlitch(); doGlitch();}
      if(p.ending==='rad'){doFlash('#00ff88','.4');}
    }

    const con=document.getElementById('scene-container');
    con.className='fade-in'; void con.offsetWidth;

    // Zone entry overlay
    updateSceneCounter();
    showZoneEntry(p.title, p.shortName||'');

    // Check requires for choices (support item2)
    function choiceLocked(c){
      const r=c.requires; if(!r) return{locked:false};
      if(r.item&&!has(r.item)) return{locked:true,reason:`Krever: ${ITEMS[r.item]?.label||r.item}`};
      if(r.item2&&!has(r.item2)) return{locked:true,reason:`Krever: ${ITEMS[r.item2]?.label||r.item2}`};
      if(r.statMin) for(const[k,v] of Object.entries(r.statMin)){
        if(state[k]<v) return{locked:true,reason:`Krever ${k.toUpperCase()} ≥${v} (du har ${state[k]})`};
      }
      return{locked:false};
    }

    let choicesHtml='';
    const unlockedChoices=[];
    if(p.choices&&p.choices.length){
      p.choices.forEach((c,i)=>{
        const{locked,reason}=choiceLocked(c);
        const lc=locked?' locked':'';
        const oc=locked?' disabled':` onclick="handleChoice('${c.target}')"`;
        const badge=reason?`<span class="req-badge">🔒 ${reason}</span>`:'';
        const keyNum=locked?'·':`${i+1}`;
        choicesHtml+=`<button class="choice-btn${lc}"${oc} data-choice="${i}"><span class="key-hint">${keyNum}</span><span class="choice-text">${c.text}${badge}</span></button>`;
        if(!locked) unlockedChoices.push(i);
      });
    } else {
      choicesHtml=`<button class="restart-btn" onclick="startOver()">↺ &nbsp;START PÅ NYTT</button>`;
    }

    let endHtml='';
    if(p.ending){
      const col={bad:'#ff1a1a',good:'#ffbe00',solo:'#667788',secret:'#00e5ff',rad:'#00ff88'}[p.ending]||'#fff';
      const found=lsGet(ENDINGS_KEY,[]);
      const isNew=!found.includes(passageId);
      if(isNew){ found.push(passageId); lsSet(ENDINGS_KEY,found); setTimeout(()=>showToast('★ NY SLUTT LÅST OPP','good'),1800); }
      const list=ENDING_ORDER.map(id=>{
        const got=found.includes(id);
        const cls=id===passageId?'now':got?'got':'';
        return `<li class="${cls}">${got?'◆ '+STORY[id].endingLabel:'◇ ???'}</li>`;
      }).join('');
      endHtml=`<div class="ending-wrap">
        <div class="ending-title ${p.ending}">${p.endingLabel}</div>
        <div class="ending-sub" style="color:${col};opacity:.55;">${p.endingDesc}</div>
        <div class="endings-found">
          <div class="endings-found-label">SLUTTER FUNNET: ${found.filter(id=>ENDING_ORDER.includes(id)).length} / ${ENDING_ORDER.length}</div>
          <ul>${list}</ul>
        </div>
      </div>`;
    }

    con.innerHTML=`
      ${sceneHero(p,sceneCount)}
      <div id="story-text">${p.text}</div>
      ${endHtml}
      <div id="choices" class="waiting" style="opacity:0;transition:opacity .65s ease;">${choicesHtml}</div>
    `;

    preloadNext(p);
    typewrite(document.getElementById('story-text'),p.text,9,()=>{
      if(token!==renderToken) return;
      const choicesEl=document.getElementById('choices');
      if(!choicesEl) return;
      choicesEl.style.opacity='1';
      choicesEl.classList.remove('waiting');
      busy=false;
      // Key N presses the button labelled N (locked ones are skipped)
      setupKeyboard(Array.from(choicesEl.querySelectorAll('.choice-btn')));
    });
    // Every scene transition gets a scan bar sweep + whoosh
    doScanBar();
    playWhoosh();
    doGlitch();

    // Scene-specific SFX — fires after 250ms once scene is up
    const sfxMap={
      // ── EMP-scener — alt slutter ──────────────────────────────────────
      kontrollrom_eps:    ()=>{
        doEmp(); doScreenTear(8); doWhiteout(80,300);
        doChromaticBleed(400); doZoomPulse();
        doFlash('#00e5ff','.65'); playDeepRumble(1.4,0.24); playSubBoom(0.18);
      },
      stromsentralen_eps: ()=>{
        doEmp(); doScreenTear(10); doWhiteout(120,400); doMegaShake();
        doChromaticBleed(500); doNegative(80); doZoomPulse();
        doFlash('#ffffff','1.0'); playDeepRumble(1.8,0.26); playSubBoom(0.22);
        setTimeout(()=>doFlash('#00e5ff','.3'),400);
      },

      // ── Høy spenning — tension stinger ───────────────────────────────
      kontrollrom:      ()=>{
        playTension(); playAlarm(); playSubBoom(0.14);
        doFlash('#ff1a1a','.35'); doZoomPulse(); doChromaticBleed(200);
      },
      radiomasten:      ()=>{
        playTension(); playStaticBurst(0.11);
        doFlash('#ff0000','.28'); doChromaticBleed(180);
      },
      radiomasten_hard: ()=>{
        playTension(); playSiren(2,0.12); playDeepRumble(1.0,0.20); playSubBoom(0.16);
        doShake(); doFlash('#ff0000','.55'); doChromaticBleed(350); doZoomPulse();
        doScreenTear(5);
      },
      stromsentralen:   ()=>{
        playTension(); playAlarm(); playDeepRumble(1.2,0.22);
        doMegaShake(); doFlash('#ff1a1a','.45'); doChromaticBleed(300);
        doScreenTear(6); doZoomPulse(); playSubBoom(0.3);
      },
      server_uten_kort: ()=>{
        playTension(); playStaticBurst(0.13); playAlarm();
        doShake(); doChromaticBleed(200); doScreenTear(3);
      },
      sendestudio:      ()=>{
        playAlarm(); playStaticBurst(0.11);
        doFlash('#ff0000','.22'); doChromaticBleed(160);
      },

      // ── Radio-scener ──────────────────────────────────────────────────
      trikken: ()=>{
        setTimeout(playRadioChatter,600); setTimeout(playRadioChatter,1900);
        setTimeout(playRadioChatter,3200); setTimeout(()=>playStaticBurst(0.12),800);
        setTimeout(()=>doChromaticBleed(120),1200);
      },
      trikken_hvil: ()=>{ setTimeout(playRadioChatter,800); setTimeout(()=>playStaticBurst(0.1),1000); },
      havn_radio:   ()=>{
        setTimeout(playRadioChatter,300); setTimeout(playRadioChatter,1400);
        setTimeout(()=>doChromaticBleed(140),500);
      },
      hytten:       ()=>{ setTimeout(playRadioChatter,1000); setTimeout(()=>playStaticBurst(0.1),1500); },

      // ── Avsløringer og oppdagelser ────────────────────────────────────
      vanen_dypere:   ()=>{
        doGlitch(); setTimeout(doGlitch,120); doScreenTear(4);
        doChromaticBleed(280); playIntercept(); doZoomPulse();
        playStaticBurst(0.10);
      },
      bunker_nod:     ()=>{
        doGlitch(); setTimeout(doGlitch,100); doScreenTear(4);
        doChromaticBleed(320); playIntercept(); doRadHaze(.12);
        doZoomPulse(); playStaticBurst(0.2); playDeepRumble(0.8,0.22);
      },
      tunnelens_dyp:  ()=>{
        doFlash('#00e5ff','.28'); doScreenTear(5);
        doChromaticBleed(200); playSubBoom(0.22); doZoomPulse();
      },
      hacking_start:  ()=>{
        doGlitch(); setTimeout(doGlitch,100); setTimeout(doGlitch,240);
        playIntercept(); doScreenTear(5); doChromaticBleed(350);
        doZoomPulse(); playStaticBurst(0.12); doNegative(60);
      },
      ambassaden:     ()=>{
        doFlash('#ffffff','.18'); doChromaticBleed(140); playStaticBurst(0.12);
      },

      // ── Sluttscener — finaler ─────────────────────────────────────────
      slutt1: ()=>{
        doEmp(); doScreenTear(10); doMegaShake();
        doWhiteout(100,400); doChromaticBleed(500); doNegative(120);
        playDeepRumble(2.0,0.26); playSubBoom(0.24); playStaticBurst(0.16);
        doZoomPulse(); doPixelBreak(35); doScanBar();
      },
      slutt2: ()=>{
        doFlash('#ffbe00','.32'); doChromaticBleed(200); doZoomPulse();
        setTimeout(()=>{ doFlash('#ffffff','.22'); playSubBoom(0.28); },700);
        setTimeout(()=>{ doFlash('#ffbe00','.18'); doChromaticBleed(160); },1400);
        setTimeout(()=>{ doWhiteout(80,500); doFlash('#ffbe00','.12'); playResonance(220,2.0,0.11); },2100);
        setTimeout(()=>{ doScanBar(); doZoomPulse(); },2500);
      },
      slutt3: ()=>{
        doFlash('#334455','.4'); doChromaticBleed(250); playDeepRumble(1.0,0.22);
        setTimeout(()=>doFlash('#223344','.2'),600);
      },
      slutt_rad: ()=>{
        doRadHaze(.55); startGeiger(3); playDeepRumble(2.0,0.26);
        doScreenTear(6); doChromaticBleed(400); doNegative(80);
        doZoomPulse(); playIonScream(2.2, 0.18); doScanBar();
        setTimeout(()=>{ stopGeiger(); doFlash('#00ff88','.25'); doWhiteout(60,300); },3200);
      },
      slutt_hemmelig: ()=>{
        doScreenTear(6); doChromaticBleed(600); doNegative(100);
        [80,200,380,600,880,1200].forEach(d=>setTimeout(doGlitch,d));
        setTimeout(()=>{ doFlash('#00e5ff','.5'); doZoomPulse(); playStaticBurst(0.28); },350);
        setTimeout(()=>{ doFlash('#00e5ff','.28'); doWhiteout(60,250); },900);
        setTimeout(()=>{ doPixelBreak(30); doChromaticBleed(300); doScanBar(); },1400);
      },
    };
    if(sfxMap[passageId]) setTimeout(()=>{ try{ sfxMap[passageId](); }catch(e){} }, 250);
  }, 160);
}

function handleChoice(target){
  if(busy) return;
  busy=true;
  window.scrollTo({top:0,behavior:'instant'});
  render(target);
}

function saveGame(sceneId){
  lsSet(SAVE_KEY,{
    scene:sceneId,
    stats:{frykt:state.frykt,mot:state.mot,kunnskap:state.kunnskap,rad:state.rad},
    inventory:state.inventory.slice(),
    path:state.path.slice(),
    visited:Array.from(state.visited),
    radMilestones:Array.from(radMilestones),
  });
}
function loadSave(){
  const sv=lsGet(SAVE_KEY,null);
  if(!sv||!STORY[sv.scene]||STORY[sv.scene].ending) return null;
  return sv;
}
function resumeGame(){
  const sv=loadSave();
  if(!sv){ beginExperience(); return; }
  const gate=document.getElementById('start-gate');
  if(gate) gate.remove();
  initAudio();
  scheduleDistantBoom();
  scheduleRadioChatter();
  document.getElementById('pre-boot').classList.add('gone');
  const boot=document.getElementById('boot');
  boot.classList.remove('active'); boot.classList.add('hidden');
  const gw=document.getElementById('game-wrap');
  gw.style.display=''; gw.style.opacity='1';
  resetState();
  Object.entries(sv.stats||{}).forEach(([k,v])=>{
    if(!(k in state)) return;
    state[k]=Math.max(0,Math.min(100,Number(v)||0));
    const bar=document.getElementById('bar-'+k), val=document.getElementById('val-'+k);
    if(bar) bar.style.width=state[k]+'%';
    if(val) val.textContent=state[k];
  });
  radBar.style.width=state.rad+'%';
  state.inventory=(sv.inventory||[]).filter(id=>ITEMS[id]);
  state.path=(sv.path||[]).filter(id=>STORY[id]);
  state.visited=new Set(sv.visited||[]);
  radMilestones=new Set(sv.radMilestones||[]);
  sceneCount=state.path.length;
  drawInventory(); drawPath(); updateRadAmbience(); updateThreatLevel();
  window.scrollTo({top:0,behavior:'instant'});
  render(sv.scene);
}

function startOver(){
  resetState();
  stopGeiger();
  window.scrollTo({top:0,behavior:'instant'});
  render('start');
}

// Hover sounds on choice buttons via event delegation
document.addEventListener('mouseover', e=>{
  const btn=e.target.closest('.choice-btn:not(.locked)');
  if(btn && e.relatedTarget && !btn.contains(e.relatedTarget)) playHover();
});

// Alarm on radiation milestones
// (radMilestones/cdMilestones declared early above)
function checkRadMilestone(v){
  const milestones=[
    {at:25, msg:'⚠ STRÅLINGSNIVÅ FARLIG', haze:.18},
    {at:50, msg:'☢ KRITISK STRÅLING', haze:.26},
    {at:75, msg:'☢ EKSPONERING AKUTT DØDELIG', haze:.36},
    {at:90, msg:'☠ TERMINAL DOSE NÅDD', haze:.48},
  ];
  milestones.forEach(({at,msg,haze})=>{
    if(v>=at&&!radMilestones.has(at)){
      radMilestones.add(at);
      playAlarm();
      playRadPulse();
      doFlash('#ff4400','.35');
      doRadHaze(haze);
      doScanBar();
      showToast(msg,'warn');
      if(v>=75) startGeiger(v>=90?3:2);
    }
  });
}
