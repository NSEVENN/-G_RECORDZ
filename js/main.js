window.addEventListener("load", () => {

    document.body.classList.add("loaded");

    setTimeout(() => {

        const loader = document.getElementById("loader");

        if (loader) {

            loader.remove();

        }

    }, 1000);

});


const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", e => {

        e.preventDefault();

        const target = document.querySelector(link.getAttribute("href"));

        if (!target) return;

        window.scrollTo({

            top: target.offsetTop - 80,

            behavior: "smooth"

        });

    });

});


const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: .15

});

function observeElements(){

    document.querySelectorAll(".hidden").forEach(el => {

        observer.observe(el);

    });

}

setTimeout(observeElements, 100);


const hero = document.querySelector(".hero");

window.addEventListener("mousemove", e => {

    const x = (e.clientX / window.innerWidth - .5) * 12;

    const y = (e.clientY / window.innerHeight - .5) * 12;

    hero.style.transform = `translate(${x}px,${y}px)`;

});


document.addEventListener("mouseover", e => {

    const card = e.target.closest(".video-card");

    if (!card) return;

    card.style.zIndex = 5;

});

document.addEventListener("mouseout", e => {

    const card = e.target.closest(".video-card");

    if (!card) return;

    card.style.zIndex = 1;

});


const subtitle = document.querySelector(".hero span");

const texts = [

"LAMAR",

"NSEVENN",

"STAGE",

];

let index = 0;

setInterval(() => {

    index++;

    if(index >= texts.length){

        index = 0;

    }

    subtitle.style.opacity = 0;

    setTimeout(() => {

        subtitle.innerText = texts[index];

        subtitle.style.opacity = 1;

    },250);

},4000);
