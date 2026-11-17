'use strict';
// Background canvases (solar corona, particles, static) and the custom cursor.

// ══════════════════════════════════════════════════
//  SOLAR CORONA CANVAS
// ══════════════════════════════════════════════════
const sc=document.getElementById('solar-canvas');
const sctx=sc.getContext('2d');
let SW=0,SH=0;
function rsz(){SW=sc.width=window.innerWidth; SH=sc.height=window.innerHeight;}
rsz(); window.addEventListener('resize',rsz);
// ── Countdown state — declared early: canvas code reads cdSecs before COUNTDOWN section ──
let cdSecs=0, cdIv=null;

let ct=0;
function drawCorona(){
  sctx.clearRect(0,0,SW,SH); ct+=0.0035;
  // Urgency factor: 0=normal, 1=critical — scales corona with time remaining
  const urgency=cdSecs>0 ? Math.max(0,Math.min(1,1-cdSecs/86400)) : 0;
  const baseSpeed=0.0035+urgency*0.009;
  const pulseAmp=70+urgency*120;
  const coreBright=0.04+urgency*0.09;
  const cx=SW*0.87, cy=-SH*0.08;
  const pulse=(Math.sin(ct*(1.4+urgency*1.8))+1)*0.5;
  const r=Math.min(SW,SH)*(0.52+urgency*0.18)+pulse*pulseAmp;
  const g=sctx.createRadialGradient(cx,cy,0,cx,cy,r*1.5);
  g.addColorStop(0,`rgba(255,90,0,${coreBright})`);
  g.addColorStop(0.35,`rgba(255,35,0,${coreBright*0.5})`);
  g.addColorStop(0.75,`rgba(255,0,0,${coreBright*0.18})`);
  g.addColorStop(1,'transparent');
  sctx.fillStyle=g; sctx.fillRect(0,0,SW,SH);
  const numSpikes=14+Math.floor(urgency*8);
  for(let i=0;i<numSpikes;i++){
    const a=(i/numSpikes)*Math.PI*2+ct*(0.18+urgency*0.22);
    const len=r*(0.55+Math.sin(ct*(2.2+urgency*1.4)+i)*0.32);
    const sp=0.055+Math.sin(ct+i*1.5)*0.028+urgency*0.022;
    sctx.save(); sctx.translate(cx,cy); sctx.rotate(a);
    const rg=sctx.createLinearGradient(0,0,len,0);
    rg.addColorStop(0,`rgba(255,70,0,${0.045+urgency*0.06})`); rg.addColorStop(1,'transparent');
    sctx.beginPath(); sctx.moveTo(0,0);
    sctx.lineTo(len,len*sp); sctx.lineTo(len,-len*sp); sctx.closePath();
    sctx.fillStyle=rg; sctx.fill(); sctx.restore();
  }
  ct+=urgency*0.002; // extra tick when urgent
  requestAnimationFrame(drawCorona);
}
drawCorona();

// ══════════════════════════════════════════════════
//  PARTICLE SYSTEM
// ══════════════════════════════════════════════════
const pc=document.getElementById('particle-canvas');
const pctx=pc.getContext('2d');
let PW=0,PH=0,parts=[];
function rpz(){PW=pc.width=window.innerWidth; PH=pc.height=window.innerHeight;}
rpz(); window.addEventListener('resize',rpz);
function mkP(urgency=0){
  const t=['solar','ash','spark','streak'][Math.floor(Math.random()*4)];
  const speedScale=1+urgency*1.8;
  return{t,x:Math.random()*PW,y:Math.random()*PH,
    vx:(Math.random()-.35)*(t==='spark'?2.2:t==='streak'?3.5:.7)*speedScale,
    vy:-(Math.random()*(t==='solar'?.7:t==='streak'?.3:1.2)+.15)*speedScale,
    r:t==='streak'?Math.random()*.8+.2:t==='spark'?Math.random()*1.2+.2:Math.random()*2.4+.4,
    a:Math.random()*.8+.1,life:Math.random()*240+55,age:0,
    hue:t==='solar'?(Math.random()<.5?0:25):t==='ash'?0:t==='streak'?15:55,
    sat:t==='ash'?0:100,lit:t==='ash'?38:58};
}
for(let i=0;i<340;i++) parts.push(mkP());
function drawParts(){
  pctx.clearRect(0,0,PW,PH);
  const urgency=cdSecs>0 ? Math.max(0,Math.min(1,1-cdSecs/86400)) : 0;
  // Spawn bonus particles at high urgency
  while(parts.length<340+Math.floor(urgency*160)) parts.push(mkP(urgency));
  while(parts.length>340+Math.floor(urgency*160)) parts.pop();
  parts.forEach((p,i)=>{
    p.x+=p.vx; p.y+=p.vy; p.age++;
    if(p.t==='spark'){p.vx*=.97;p.vy+=.06;}
    if(p.t==='streak'){p.vx*=.94;p.vy+=.02;}
    const ratio=p.age/p.life;
    const alpha=p.a*(1-ratio)*(ratio<.1?ratio*10:1);
    if(p.t==='streak'){
      pctx.beginPath();
      pctx.moveTo(p.x,p.y); pctx.lineTo(p.x-p.vx*8,p.y-p.vy*8);
      pctx.strokeStyle=`hsla(${p.hue},${p.sat}%,${p.lit}%,${alpha})`;
      pctx.lineWidth=p.r; pctx.stroke();
    }else{
      pctx.beginPath(); pctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      pctx.fillStyle=`hsla(${p.hue},${p.sat}%,${p.lit}%,${alpha})`;
      pctx.fill();
    }
    if(p.age>=p.life) parts[i]=mkP(urgency);
  });
  requestAnimationFrame(drawParts);
}
drawParts();

// ══════════════════════════════════════════════════
//  STATIC NOISE CANVAS  (low-res, scaled up — much cheaper)
// ══════════════════════════════════════════════════
const stc=document.getElementById('static-canvas');
const stctx=stc.getContext('2d');
stc.style.imageRendering='pixelated';
function rsStatic(){stc.width=Math.ceil(window.innerWidth/4); stc.height=Math.ceil(window.innerHeight/4);}
rsStatic(); window.addEventListener('resize',rsStatic);
function drawStatic(){
  const w=stc.width, h=stc.height;
  const id=stctx.createImageData(w,h);
  const d=id.data;
  // Tint based on rad level: red base, shifts to green at high rad
  const radFrac=Math.min(1,state.rad/100);
  const rCh=Math.round(255*(1-radFrac*0.6));
  const gCh=Math.round(50+radFrac*180);
  const bCh=Math.round(50*(1-radFrac));
  for(let i=0;i<d.length;i+=4){
    const v=Math.random()<0.5?255:0;
    d[i]=rCh; d[i+1]=gCh; d[i+2]=bCh; d[i+3]=v*0.55;
  }
  stctx.putImageData(id,0,0);
  setTimeout(()=>requestAnimationFrame(drawStatic), 110);
}
drawStatic();

// ══════════════════════════════════════════════════
//  CURSOR
// ══════════════════════════════════════════════════
const curEl=document.getElementById('cursor');
const trailEl=document.getElementById('cursor-trail');
document.addEventListener('mousemove',e=>{
  curEl.style.left=e.clientX+'px'; curEl.style.top=e.clientY+'px';
  setTimeout(()=>{trailEl.style.left=e.clientX+'px'; trailEl.style.top=e.clientY+'px';},80);
});
document.addEventListener('mousedown',()=>curEl.style.transform='translate(-50%,-50%) scale(.65)');
document.addEventListener('mouseup',()=>curEl.style.transform='translate(-50%,-50%) scale(1)');
