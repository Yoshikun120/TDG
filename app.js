// TDG Community frontend.
// The public directory works immediately. Real Admin authentication requires Supabase Auth + RLS.
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

const $ = s => document.querySelector(s);
const fallbackLogo = "assets/tdg-logo.jpg";
const demo = [
  {id:"a1",name:"TDG Admin",instagram:"@tdg",is_admin:true,photo:fallbackLogo},
  {id:"m1",name:"สมาชิก TDG",instagram:"@tdg_member",is_admin:false,photo:fallbackLogo},
  {id:"m2",name:"สมาชิกใหม่",instagram:"@tdg_new",is_admin:false,photo:fallbackLogo}
];
let people = [...demo];

function esc(v){
  return String(v ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
}
function instagramUrl(v){
  return "https://instagram.com/" + encodeURIComponent(String(v).replace(/^@/,""));
}
function render(){
  const card = x => `
    <div class="card">
      <img class="avatar" src="${esc(x.photo || fallbackLogo)}" alt="">
      <div class="info">
        <div class="name">${esc(x.name)}</div>
        <div class="ig">${esc(x.instagram || "")}</div>
      </div>
      ${x.instagram ? `<a class="contact" target="_blank" rel="noopener" href="${instagramUrl(x.instagram)}">ติดต่อ</a>` : ""}
    </div>`;
  $("#admins").innerHTML = people.filter(x=>x.is_admin).map(card).join("") || `<div class="empty">ยังไม่มี Admin</div>`;
  $("#members").innerHTML = people.filter(x=>!x.is_admin).map(card).join("") || `<div class="empty">ยังไม่มีสมาชิก</div>`;
  $("#manageMembers").innerHTML = people.filter(x=>!x.is_admin).map(x =>
    `<div class="row"><span>${esc(x.name)}</span><button class="danger" data-del="${esc(x.id)}">ลบ</button></div>`).join("");
  $("#manageAdmins").innerHTML = people.filter(x=>x.is_admin).map(x =>
    `<div class="row"><span>${esc(x.name)}</span><span class="muted">Admin</span></div>`).join("");
}

$("#enter").onclick = async () => {
  $("#home").classList.remove("active");
  $("#directory").classList.add("active");
  try { await $("#audio").play(); $("#musicBtn").classList.add("on"); } catch {}
};
$("#back").onclick = () => {
  $("#directory").classList.remove("active");
  $("#home").classList.add("active");
};
$("#musicBtn").onclick = async () => {
  const a = $("#audio");
  if(a.paused){ try { await a.play(); $("#musicBtn").classList.add("on"); } catch {} }
  else { a.pause(); $("#musicBtn").classList.remove("on"); }
};
$("#loginOpen").onclick = () => $("#login").classList.remove("hidden");
$("#loginClose").onclick = () => $("#login").classList.add("hidden");
$("#dashClose").onclick = () => $("#dash").classList.add("hidden");
$("#logout").onclick = () => $("#dash").classList.add("hidden");

// Simple Admin login for this demo version.
// Username: admin
// Password: 1234
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "1234";

$("#loginForm").onsubmit = async e => {
  e.preventDefault();
  const username = $("#email").value.trim();
  const password = $("#password").value;

  if(username === ADMIN_USERNAME && password === ADMIN_PASSWORD){
    $("#login").classList.add("hidden");
    $("#dash").classList.remove("hidden");
    $("#loginMsg").textContent = "";
    render();
  } else {
    $("#loginMsg").textContent = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
  }
};

document.querySelectorAll(".tabs button").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".tab").forEach(x=>x.classList.add("hidden"));
    $("#" + btn.dataset.tab).classList.remove("hidden");
  };
});

document.addEventListener("click", e => {
  const id = e.target.dataset.del;
  if(id){
    people = people.filter(x => x.id !== id);
    render();
  }
});

$("#addMember").onsubmit = e => {
  e.preventDefault();
  people.push({
    id:"m"+Date.now(),
    name:$("#mName").value.trim(),
    instagram:$("#mIg").value.trim(),
    is_admin:false,
    photo:fallbackLogo
  });
  e.target.reset();
  render();
};

render();
