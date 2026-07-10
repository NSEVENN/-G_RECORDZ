const canvas = document.getElementById("storm");
const ctx = canvas.getContext("2d");

function resize(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resize();

window.addEventListener("resize",resize);

const clouds=[];
const bolts=[];
const flashes=[];

/* =========================
        CLOUDS
========================= */

class Cloud{

    constructor(){

        this.x=Math.random()*canvas.width;
        this.y=Math.random()*canvas.height*0.45;

        this.w=220+Math.random()*260;
        this.h=60+Math.random()*70;

        this.speed=.08+Math.random()*.12;

        this.alpha=.02+Math.random()*.04;

    }

    draw(){

        this.x+=this.speed;

        if(this.x>canvas.width+this.w){

            this.x=-this.w;

        }

        const g=ctx.createRadialGradient(

            this.x,
            this.y,
            10,

            this.x,
            this.y,
            this.w

        );

        g.addColorStop(0,`rgba(255,255,255,${this.alpha})`);
        g.addColorStop(1,"rgba(255,255,255,0)");

        ctx.fillStyle=g;

        ctx.beginPath();

        ctx.ellipse(
            this.x,
            this.y,
            this.w,
            this.h,
            0,
            0,
            Math.PI*2
        );

        ctx.fill();

    }

}

for(let i=0;i<15;i++){

    clouds.push(new Cloud());

}

/* =========================
        FLASH
========================= */

class Flash{

    constructor(){

        this.alpha=.42;

    }

    draw(){

        this.alpha*=0.92;

        ctx.fillStyle=`rgba(255,255,255,${this.alpha})`;

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

    }

}

/* =========================
        LIGHTNING
========================= */

class Lightning{

    constructor(){

        this.points=[];

        let x=Math.random()*canvas.width;

        let y=-20;

        this.points.push({x,y});

        while(y<canvas.height*0.82){

            x+=(Math.random()-.5)*55;

            y+=18+Math.random()*18;

            this.points.push({x,y});

            if(Math.random()>.80){

                this.points.push({

                    x:x+(Math.random()-.5)*100,

                    y:y+30

                });

            }

        }

        this.life=0;

    }

    draw(){

        ctx.save();

        ctx.shadowBlur=20;
        ctx.shadowColor="#ffffff";

        ctx.strokeStyle="rgba(255,255,255,.95)";
        ctx.lineWidth=2;

        ctx.beginPath();

        ctx.moveTo(
            this.points[0].x,
            this.points[0].y
        );

        this.points.forEach(point=>{

            ctx.lineTo(
                point.x,
                point.y
            );

        });

        ctx.stroke();

        ctx.strokeStyle="rgba(255,255,255,.15)";
        ctx.lineWidth=7;

        ctx.stroke();

        ctx.restore();

        this.life++;

    }

}

/* =========================
        STARS
========================= */

const stars=[];

for(let i=0;i<120;i++){

    stars.push({

        x:Math.random()*canvas.width,

        y:Math.random()*canvas.height*.55,

        r:Math.random()*1.6,

        a:Math.random()

    });

}

/* =========================
        DRAW
========================= */

function drawStars(){

    stars.forEach(s=>{

        s.a+=0.01;

        ctx.fillStyle=`rgba(255,255,255,${
            .15+Math.sin(s.a)*.15
        })`;

        ctx.beginPath();

        ctx.arc(
            s.x,
            s.y,
            s.r,
            0,
            Math.PI*2
        );

        ctx.fill();

    });

}

function animate(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    drawStars();

    clouds.forEach(c=>c.draw());

    if(Math.random()>.992){

        bolts.push(new Lightning());

        flashes.push(new Flash());

    }

    if(Math.random()>.998){

        bolts.push(new Lightning());

    }

    flashes.forEach((f,i)=>{

        f.draw();

        if(f.alpha<.01){

            flashes.splice(i,1);

        }

    });

    bolts.forEach((b,i)=>{

        b.draw();

        if(b.life>8){

            bolts.splice(i,1);

        }

    });

    requestAnimationFrame(animate);

}

animate();