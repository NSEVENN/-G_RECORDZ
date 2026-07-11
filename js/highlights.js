import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
query,
orderBy,
serverTimestamp,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const modal=document.getElementById("uploadModal");
const openBtn=document.getElementById("openUpload");
const closeBtn=document.getElementById("closeUpload");
const uploadBtn=document.getElementById("uploadBtn");

const title=document.getElementById("highlightTitle");
const youtube=document.getElementById("highlightYoutube");
const description=document.getElementById("highlightDescription");

const grid=document.getElementById("highlight-grid");

const body=document.body;

const player=document.createElement("div");

player.className="video-modal";

player.innerHTML=`

<span class="close-video">&times;</span>

<iframe
allowfullscreen
allow="autoplay">
</iframe>

`;

body.appendChild(player);

const iframe=player.querySelector("iframe");

player.querySelector(".close-video").onclick=()=>{

player.style.display="none";

iframe.src="";

};

player.onclick=(e)=>{

if(e.target===player){

player.style.display="none";

iframe.src="";

}

};

openBtn.onclick=()=>{

modal.style.display="flex";

};

closeBtn.onclick=()=>{

modal.style.display="none";

};

window.onclick=(e)=>{

if(e.target===modal){

modal.style.display="none";

}

};

function getId(url){

const reg=/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&]+)/;

const match=url.match(reg);

return match?match[1]:null;

}

function createCard(id,data){

const id=getId(data.youtube);

const thumb=`https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

const card=document.createElement("div");

card.className="highlight-card";

card.innerHTML=`

<img src="${thumb}">

<div class="highlight-info">

<h3>${data.title}</h3>

<p>${data.description}</p>

<div class="highlight-meta">

<span>Community</span>

<span>▶ Play</span>

</div>

</div>

`;

card.onclick=()=>{

iframe.src=`https://www.youtube.com/embed/${id}?autoplay=1`;

player.style.display="flex";

};

grid.prepend(card);

}

async function loadHighlights(){

grid.innerHTML="";

const q=query(

collection(db,"highlights"),

orderBy("created","desc")

);

const snap=await getDocs(q);

snap.forEach(item=>{

createCard(item.id,item.data());

});

}

uploadBtn.onclick=async()=>{

if(

title.value===""||

youtube.value===""

){

alert("Fill all fields");

return;

}

await addDoc(

collection(db,"highlights"),

{

title:title.value,

youtube:youtube.value,

description:description.value,

created:serverTimestamp()

}

);

modal.style.display="none";

title.value="";

youtube.value="";

description.value="";

loadHighlights();

};

loadHighlights();
