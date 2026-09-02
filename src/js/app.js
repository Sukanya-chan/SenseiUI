const out = document.getElementById("terminalOutput");
const input = document.getElementById("terminalInput");

function append(text) {
  out.textContent += text;
  out.scrollTop = out.scrollHeight;
}

function fmtBytes(n) {
  if (!n) return "0 B/s";
  const u = ["B/s","KB/s","MB/s","GB/s"];
  let i=0; let v=n;
  while(v>=1024 && i<u.length-1){v/=1024;i++;}
  return `${v.toFixed(v>=10?0:1)} ${u[i]}`;
}
function fmtTime(sec) {
  const d=Math.floor(sec/86400); sec%=86400;
  const h=Math.floor(sec/3600); sec%=3600;
  const m=Math.floor(sec/60); const s=Math.floor(sec%60);
  return `${d}d ${String(h).padStart(2,"0")}h ${String(m).padStart(2,"0")}m ${String(s).padStart(2,"0")}s`;
}
function setBar(id, val){document.getElementById(id).style.width=`${Math.min(100,Math.max(0,val))}%`;}

async function updateSystem(){
  try{
    const x=await window.sensei.system.info();
    cpu.textContent=x.cpu.toFixed(1)+"%"; memory.textContent=x.memory.toFixed(1)+"%"; disk.textContent=x.disk.toFixed(1)+"%";
    setBar("cpuBar",x.cpu);setBar("memoryBar",x.memory);setBar("diskBar",x.disk);
    hostname.textContent=x.hostname; distro.textContent=x.distro; kernel.textContent=x.kernel; gpu.textContent=x.gpu; uptime.textContent=fmtTime(x.uptime);
    rx.textContent=fmtBytes(x.networkRx);tx.textContent=fmtBytes(x.networkTx);
    battery.textContent=x.battery===null?"N/A":`${x.battery}%`;
    charging.textContent=x.battery===null?"":(x.batteryCharging?"CHARGING":"");
    const g=document.getElementById("graph"); const v=Math.min(100,(x.networkRx+x.networkTx)/1024/1024*8);
    const bar=document.createElement("i");bar.style.height=`${Math.max(4,v)}%`;g.appendChild(bar);if(g.children.length>28)g.removeChild(g.firstChild);
  }catch(e){console.error(e)}
}
function clock(){document.getElementById("clock").textContent=new Date().toLocaleTimeString();}
setInterval(updateSystem,1500);setInterval(clock,1000);updateSystem();clock();

document.getElementById("min").onclick=()=>window.sensei.window.minimize();
document.getElementById("max").onclick=()=>window.sensei.window.maximize();
document.getElementById("close").onclick=()=>window.sensei.window.close();

window.sensei.terminal.onData(append);
window.sensei.terminal.onExit(()=>append("\n[SenseiAI] shell exited.\n"));
window.sensei.terminal.start();
append("SENSEIAI // TERMINAL READY\nType Linux commands normally.\n\n$ ");

input.addEventListener("keydown",e=>{
  if(e.key==="Enter"){
    window.sensei.terminal.input(input.value+"\r");
    input.value="";
  } else if(e.key==="Backspace"){
    window.sensei.terminal.input("\x7f");
  } else if(e.ctrlKey && e.key.toLowerCase()==="c"){
    window.sensei.terminal.input("\x03"); input.value="";
  } else if(e.key.length===1 && !e.ctrlKey && !e.metaKey){
    window.sensei.terminal.input(e.key);
  }
});
document.addEventListener("click",()=>input.focus());

document.querySelectorAll(".quick").forEach(b=>b.onclick=()=>{
  window.sensei.terminal.input(b.dataset.cmd+"\r");
  input.focus();
});

document.getElementById("aiSend").onclick=()=>{
  const q=document.getElementById("aiInput").value.trim();
  const o=document.getElementById("aiOutput");
  if(!q)return;
  const lower=q.toLowerCase();
  let answer="I can currently act as a local UI assistant. Connect the optional Python/Ollama backend for full AI reasoning.";
  if(lower.includes("explain")) answer="Command analysis mode: paste a command and SenseiAI can explain syntax, purpose, permissions, and risk.";
  if(lower.includes("network")||lower.includes("dns")) answer="Network diagnostic suggestion: check ip addr, ip route, resolvectl status, then test connectivity with ping.";
  if(lower.includes("linux")) answer="Linux assistance mode: use the terminal for execution; SenseiAI should request confirmation before destructive or privileged operations.";
  o.textContent=answer;
};