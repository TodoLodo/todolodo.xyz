let tl = document.getElementById("tl");
let tl_svgs = document.getElementsByClassName("tl-svg")
let _name = document.getElementById("name");
let curr = document.getElementById("curriculum");
let static_w = document.getElementById("static-wrapper");
let static = document.getElementById("scrolled");
let space = document.getElementById("space");
let graphic = document.getElementById("graphic");
let illust = document.getElementById("illust");
let web = document.getElementById("web");
let extra = document.getElementById("extra");
var B, Y;
let mRotateY = 0;
let mRotateX = 0;

pageHeightChange();
//console.log(static_w.clientHeight/window.innerHeight) debug
scrollbarHeightChange();

// TL
for (_svg of tl_svgs) {
    //console.log(_svg.firstElementChild);
    let _path = _svg.firstElementChild

    let length = _path.getTotalLength();

    _path.style.strokeDasharray = length;
    _path.style.strokeDashoffset = length; 
}
window.addEventListener("deviceorientation", function (event) {
    let dB, dY;

    if (B === null || B === undefined) {
        B = event.beta;
    }
    if (Y === null || Y === undefined) {
        Y = event.gamma;
    }

    
    if (-10 <= mRotateX <= 10) {
        dB = event.beta - B;
        mRotateX = -dB/6;
    }
    if (-10 <= mRotateY <= 10) {
        dY = event.gamma - Y;
        mRotateY = dY/5;
    }

    tl.style.transform = `rotateX(${mRotateX}deg) rotateY(${mRotateY}deg) translate(-50%, -50%)`;

    //console.log(`β: ${event.beta}, γ: ${event.gamma}`);
});

// Real Name
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
let clientValue = params.client;

let xhr = new XMLHttpRequest();
xhr.open("POST", "/auth");

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    //console.log(xhr.status);
    if (xhr.status === 200) {
        console.log(xhr.responseText);
        document.getElementById('realname').innerText = xhr.responseText;
    }
    else {
        console.log(xhr.status);
    }
  }};

let data = new FormData();
data.append('client', clientValue);
xhr.send(data);


window.addEventListener("resize", function (e) {
    pageHeightChange();
    scrollbarHeightChange();
});

window.addEventListener("scroll", (event) => {
    var scrollRatio = this.scrollY/(main.clientHeight-window.innerHeight);
    console.log(scrollRatio);
    /*
    
    Space (0 - 0.3)

    */

    // Space
    // Land section | TL {1/5} [0 - 0.07]
    // outro
    if (scrollRatio <= 0.07) {
        for (i of tl.children) {
            i.style.opacity = 1 - (scrollRatio/0.07);
        }
        tl.style.display = "block";
        tl.style.visibility = "visible";
    }
    else if (scrollRatio > 0.07) {
        tl.style.display = "none";
        tl.style.visibility = "hidden";
    }

    // Name section {2/5} [0.05 - 0.22]
    if (scrollRatio >= 0.05 && scrollRatio <= 0.22) {
        _name.style.display = "block";
        _name.style.visibility = "visible";
    }
    else {
        _name.style.display = "none";
        _name.style.visibility = "hidden";
        _name.style.opacity = 0;
    }
    // intro [0.06 - 0.12]
    if (scrollRatio >= 0.05 && scrollRatio <= 0.12) {
        _name.style.opacity = (scrollRatio-.05)/.07;
        _name.style.transform = `translate(-50%, -${150-100*((scrollRatio-.05)/.07)}%) rotateX(${90-90*((scrollRatio-.05)/.07)}deg)`
    }
    // outro (0.12 - 0.22]
    else if (scrollRatio > 0.15) {
        _name.style.top = `${50-70*((scrollRatio-0.15)/.07)}vh`
        _name.style.opacity = 1 - (scrollRatio-0.15)/.07;
    }

    // Curriculum Vitae {2/5} [0.16 - 0.30]
    if (scrollRatio >= 0.16 && scrollRatio <= 0.30) {
        curr.style.display = "block";
        curr.style.visibility = "visible";
    }
    else {
        curr.style.display = "none";
        curr.style.visibility = "hidden";
        curr.style.opacity = 0;
    }
    // intro [0.16 - 0.24]
    if (scrollRatio >= 0.16 && scrollRatio <= 0.24) {
        curr.style.opacity = (scrollRatio-.16)/.08;
        curr.style.transform = `translate(-50%, ${100-150*((scrollRatio-.16)/.08)}%)`
    }
    // outro (0.24 - 0.30]
    else if (scrollRatio > 0.24)
    {
        curr.style.opacity = 1 - (scrollRatio-.24)/.06;
    }

    //Headings
    //Graphic [0.31 - 0.41]
    if (scrollRatio >= 0.30 && scrollRatio <= 0.41) {
        graphic.style.display = "block";
        graphic.style.visibility = "visible";
    }
    else {
        graphic.style.display = "none";
        graphic.style.visibility = "hidden";
    }
    // intro [0.31 - 0.35]
    if (scrollRatio >= 0.3 && scrollRatio <= 0.35) {
        graphic.style.opacity = (scrollRatio-.30)/.05;
        graphic.style.transform = `translate(-50%, -${150-100*((scrollRatio-.31)/.05)}%) rotateX(${90-90*((scrollRatio-.31)/.05)}deg)`;
    }
    // outro (0.35 - 0.41]
    if (scrollRatio > 0.355) {
        graphic.style.opacity = 1-(scrollRatio-.35)/.05;
    }

    //Illustrate [0.465 - 0.565]
    if (scrollRatio >= 0.465 && scrollRatio <= 0.565) {
        illust.style.display = "block";
        illust.style.visibility = "visible";
    }
    else {
        illust.style.display = "none";
        illust.style.visibility = "hidden";
    }
    // intro [0.465 - 0.515]
    if (scrollRatio >= 0.465 && scrollRatio <= 0.515) {
        illust.style.opacity = (scrollRatio-.465)/.05;
        illust.style.transform = `translate(-50%, -${150-100*((scrollRatio-.465)/.05)}%) rotateX(${90-90*((scrollRatio-.465)/.05)}deg)`;
    }
    // outro (0.515 - 0.565]
    if (scrollRatio > 0.515) {
        illust.style.opacity = 1-(scrollRatio-.515)/.05;
    }

    //Web [0.6 - 0.7]
    if (scrollRatio >= 0.6 && scrollRatio <= 0.7) {
        web.style.display = "block";
        web.style.visibility = "visible";
    }
    else {
        web.style.display = "none";
        web.style.visibility = "hidden";
    }
    // intro [0.6 - 0.65]
    if (scrollRatio >= 0.6 && scrollRatio <= 0.65) {
        web.style.opacity = (scrollRatio-.6)/.05;
        web.style.transform = `translate(-50%, -${150-100*((scrollRatio-.6)/.05)}%) rotateX(${90-90*((scrollRatio-.6)/.05)}deg)`;
    }
    // outro (0.65 - 0.7]
    if (scrollRatio > 0.65) {
        web.style.opacity = 1-(scrollRatio-.65)/.05;
    }

    //Extra [0.78 - 0.88]
    if (scrollRatio >= 0.78 && scrollRatio <= 0.88) {
        extra.style.display = "block";
        extra.style.visibility = "visible";
    }
    else {
        extra.style.display = "none";
        extra.style.visibility = "hidden";
    }
    // intro [0.78 - 0.83]
    if (scrollRatio >= 0.78 && scrollRatio <= 0.83) {
        extra.style.opacity = (scrollRatio-.78)/.05;
        extra.style.transform = `translate(-50%, -${150-100*((scrollRatio-.78)/.05)}%) rotateX(${90-90*((scrollRatio-.78)/.05)}deg)`;
    }
    // outro (0.83 - 0.88]
    if (scrollRatio > 0.83) {
        extra.style.opacity = 1-(scrollRatio-.83)/.05;
    }

});



tl.addEventListener("mouseover", function(e) {
    let elem = tl;
    let xc = e.clientX;
    let yc = e.clientY;
    let rect = elem.getBoundingClientRect();
    let width = rect.width;
    let height = rect.height;
    let xm = width/2;
    let ym = height/2;
    let rotateY = -(xc-rect.left-xm)*20/width;
    let rotateX = (yc-rect.top-ym)*20/height;
    elem.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate(-50%, -50%)`;
});

tl.addEventListener("mouseleave", function(e) {
    let elem = tl;
    elem.style.transform = `rotateX(0deg) rotateY(0deg) translate(-50%, -50%)`;
    elem.style.transitionDuration = '1s';
});

tl.addEventListener("click", function(e) {
    if (tl.classList.contains("alternate-colors")) {
        tl.classList.remove("alternate-colors");
    }
    else {
        tl.classList.add("alternate-colors");
    }
});

function pageHeightChange() {
    static_w.style.height = `calc(3rem + ${static.clientHeight}px)`;
    space.style.height = `${static_w.clientHeight*6/13.25}px`
    //console.log(static_w.clientHeight/window.innerHeight)
    main.style.height = `${static_w.clientHeight+space.clientHeight}px`;
}