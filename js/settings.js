'use strict';
// Settings (sound, calm effects) and browser storage for saves and endings.

// ══════════════════════════════════════════════════
//  SETTINGS + SAVE DATA (stored in this browser only)
// ══════════════════════════════════════════════════
const SAVE_KEY='solstormen.save.v1', ENDINGS_KEY='solstormen.endings.v1', PREFS_KEY='solstormen.prefs.v1';
const ENDING_ORDER=['slutt1','slutt2','slutt3','slutt_rad','slutt_hemmelig'];
function lsGet(k,fallback){ try{ const v=localStorage.getItem(k); return v?JSON.parse(v):fallback; }catch(e){ return fallback; } }
function lsSet(k,v){ try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){} }
function lsDel(k){ try{ localStorage.removeItem(k); }catch(e){} }
let systemReduced=false;
try{ systemReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){}
const prefs=Object.assign({reducedFX:systemReduced,muted:false},lsGet(PREFS_KEY,{}));
function fxOff(){ return prefs.reducedFX; }
function refreshSettingsUI(){
  document.body.classList.toggle('reduced-fx',prefs.reducedFX);
  const set=(id,txt,off)=>{ const el=document.getElementById(id); if(el){ el.textContent=txt; el.classList.toggle('off',off); } };
  set('btn-sound',prefs.muted?'LYD AV':'LYD PÅ',prefs.muted);
  set('sg-sound',prefs.muted?'LYD: AV':'LYD: PÅ',prefs.muted);
  set('btn-fx',prefs.reducedFX?'FX ROLIGE':'FX FULLE',prefs.reducedFX);
  set('sg-fx',prefs.reducedFX?'EFFEKTER: ROLIGE':'EFFEKTER: FULLE',prefs.reducedFX);
}
function toggleMute(){
  prefs.muted=!prefs.muted; lsSet(PREFS_KEY,prefs);
  applyVolume(); refreshSettingsUI();
}
function toggleFX(){
  prefs.reducedFX=!prefs.reducedFX; lsSet(PREFS_KEY,prefs);
  refreshSettingsUI();
}
function applyVolume(){
  if(masterGain&&audioCtx) masterGain.gain.setTargetAtTime(prefs.muted?0:0.26,audioCtx.currentTime,0.05);
}
