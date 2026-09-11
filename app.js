/*
  TDG secure-ready frontend.
  Set SUPABASE_URL and SUPABASE_ANON_KEY below after creating your project.
  The database must enforce admin-only writes with RLS; never put a service_role key in this file.
*/
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

const $=s=>document.querySelector(s);
const demo=[
 {id:"a1",name:"TDG Admin",instagram:"@tdg",is_admin:true,photo:"assets/tdg-logo.jpg"},
 {id:"m1",name:"สมาชิก TDG",instagram:"@tdg_member",is_admin:false,photo:"assets/tdg-logo.jpg"},
 {id:"m2",name:"สมาชิกใหม่",instagram:"@tdg_new",is_admin:false,photo:"assets/tdg-logo.jpg"}];
let people=demo.slice();

function render(){
 const card=x=>`<div class="card"><img class="avatar" src="${x.photo||"assets/tdg-logo.jpg"}"><div class="info"><div class="name">${esc(x.name)}</div><div class="ig">${esc(x.instagram||"")}</div></div>${x.instagram?`<a class="contact" target="_blank" href="https://instagram.com/${encodeURIComponent(x.instagram.replace("@",""))}">ติดต่อ</a>`:""}</div>`;
 $("#admins").innerHTML=people.filter(x=>x.is_admin).map(card).join("")||"<p>ยังไม่มี Admin</p>";
 $("#members").innerHTML=people.filter(x=>!x.is_admin).map(card).join("")||"<p>ยังไม่มีสมาชิก</p>";
 $("#manageMembers").innerHTML=people.filter(x=>!x.is_admin).map(x=>`<div class="row"><span>${esc(x.name)}</span><button class="danger" style="width:auto" data-del="${x.id}">ลบ</button></div>`).join("");
 $("#manageAdmins").innerHTML=people.filter(x=>x.is_admin).map(x=>`<div class="row"><span>${esc(x.name)}</span><span>Admin</span></div>`).join("");
}
function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}

$("#enter").onclick=async()=>{ $("#home").classList.remove("active");$("#directory").classList.add("active");try{await $("#audio").play();$("#musicBtn").classList.add("on")}catch{}};
$("#back").onclick=()=>{$("#directory").classList.remove("active");$("#home").classList.add("active")};
$("#musicBtn").onclick=async()=>{let a=$("#audio");if(a.paused){try{await a.play();$("#musicBtn").classList.add("on")}catch{}}else{a.pause();$("#musicBtn").classList.remove("on")}};
$("#loginOpen").onclick=()=>$("#login").classList.remove("hidden");
$("#loginClose").onclick=()=>$("#login").classList.add("hidden");
$("#dashClose").onclick=()=>$("#dash").classList.add("hidden");
$("#loginForm").onsubmit=async e=>{
 e.preventDefault();
 // Secure production flow: Supabase Auth signInWithPassword + an RLS-protected admin role check.
 if(SUPABASE_URL.startsWith("YOUR_")){$("#loginMsg").textContent="ต้องเชื่อม Supabase ก่อนจึงจะเปิด Login จริงได้";return}
 $("#loginMsg").textContent="โครงสร้าง Login พร้อมเชื่อม Supabase Auth แล้ว";
};
$("#logout").onclick=()=>$("#dash").classList.add("hidden");
document.addEventListener("click",e=>{if(e.target.dataset.del){people=people.filter(x=>x.id!==e.target.dataset.del);render()}});
render();
