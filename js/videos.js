const videos = [

{
title: "$G RECORDZ //     $G DEMENTOR",
description: "Official Video",
youtube: "https://youtu.be/VuVZ9FIOs9Y?si=s2ru6fwUqAtTW05s"
},

{
title: "$G RECORDZ // $WAGONOMETRY",
description: "Official Video",
youtube: "https://www.youtube.com/watch?v=8fANce66T5w"
},

{
title: "$G RECORDZ //     GOLDIN REAL DEAL",
description: "Official Video",
youtube: "https://www.youtube.com/watch?v=G52EqXEuAu0&t=213s"
},

{
title: "$G RECORDZ //    BANDZ COMING 2",
description: "Official Video",
youtube: "https://www.youtube.com/watch?v=nR65b8FSpNQ"
},

];

const grid = document.getElementById("video-grid");

function getYoutubeId(url){

    const regExp=/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/;

    const match=url.match(regExp);

    return match?match[1]:"";

}

function createCard(video){

    const id=getYoutubeId(video.youtube);

    const image=`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

    return `

<div class="video-card hidden">

<a href="${video.youtube}" target="_blank">

<img src="${image}" loading="lazy">

<div class="play"></div>

<div class="video-info">

<h3>${video.title}</h3>

<p>${video.description}</p>

</div>

</a>

</div>

`;

}

grid.innerHTML = videos.map(createCard).join("");
