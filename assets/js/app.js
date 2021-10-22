// CONST GLOBALS
const debug = false;
const repetition = 2;
const numFrames = 128;

// VARIABLES GLOBALS
var ejecut = 0
var node = []
var end = 0
var items = document.querySelectorAll(".animation-transition")
var r = 0
var save = {}
var zx = 0
var countAudio = 0
var finish = true

document.body.onload = init

function NewFrame(canvas, count = 32) {
    let {
        width,
        height
    } = canvas;
    let ctx = canvas.getContext("2d");
    let originalData = ctx.getImageData(0, 0, width, height);
    let imageDatas = [...Array(count)].map((_, i) => ctx.createImageData(width, height))

    for (let x = 0; x < width; ++x)
        for (let y = 0; y < height; ++y) {
            for (let i = 0; i < repetition; ++i) {
                let dataIndex = Math.floor(count * (Math.random() + 2 * x / width) / 3);
                let pixelIndex = (y * width + x) * 4;
                for (let offset = 0; offset < 4; ++offset) 
                imageDatas[dataIndex].data[pixelIndex + offset] = originalData.data[pixelIndex + offset];
            }
        }
    return imageDatas.map(data => {
        let clone = canvas.cloneNode(true);
        clone.getContext("2d").putImageData(data, 0, 0);
        return clone;
    });
}

function RandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function createCanvas(ix) {
    let parent = items[node[ix]]
    html2canvas(parent).then(canvas => {
        let height = parent.offsetHeight
        let width = parent.offsetWidth
        let elemt = parent.querySelectorAll("*")

        parent.style.minWidth = `${width}px`
        parent.style.maxWidth = `${width}px`
        parent.style.minHeight = `${height}px`
        parent.style.maxHeight = `${height}px`
        parent.style.position = "relative"

        for (let i = 0; i < elemt.length; i++) {
            elemt[i].classList.add("none")
        }

        let frameArray = NewFrame(canvas, numFrames)
       
        let contentCanvas = document.createElement("div")

        contentCanvas.classList.add("disintegration-container")
        contentCanvas.classList.add("content-canvas")

        frameArray.forEach((frame, i) => {
            contentCanvas.appendChild(frame)
        })

        parent.appendChild(contentCanvas)
        contentCanvas.offsetLeft
        save[ix] = {
            parent,
            dom: contentCanvas
        }
        if (node.length == ix + 1) animation(save, 0)
    })
}

function animationImage(canvas, url, cb) {
    let ctx = canvas.getContext("2d")
    let img = new Image(10, 10)
    let count = 0
    let interval = null

    img.src = url

    img.onload = () => {
        canvas.width = 80
        canvas.height = 80
        interval = setInterval(() => {
            if (count < 48) {
                let left = count * 80
                canvas.style.background = "white"
                ctx.clearRect(0, 0, 80, 80)
                ctx.drawImage(img, left, 0, 80, 80, 0, 0, 80, 80)
                count += 1
            } else {
                clearInterval(interval)
                cb()
            }
        }, 50)

    }
}

function animation(datas, index) {
    let target = datas[index]
    let frames = target.dom.querySelectorAll("canvas")
    target.dom.scrollIntoView({
        block: 'center',
        behavior: 'smooth'
    });

    frames.forEach((frame, i) => {
        frame.style.transitionDelay = `${1.7 * i / frames.length}s`
        if (frames.length == i + 1) ejecut()
    })

    function ejecut() {
        setTimeout(() => {

            if (!debug) {
                countAudio += 1
                let audio = new Audio(`/mp3/thanos_dust_${index+1}.mp3`)
                audio.play()
                frames.forEach((frame, i) => {
                    let randomRadian = 2 * Math.PI * (Math.random() - 0.5)
                    frame.style.transform = `rotate(${15 * (Math.random() - 0.5)}deg) translate(${60 * Math.cos(randomRadian)}px, ${30 * Math.sin(randomRadian)}px) rotate(${15 * (Math.random() - 0.5)}deg)`;
                    frame.style.opacity = 0;

                    if (frames.length == i + 1) {
                        frame.addEventListener("transitionend", function (event) {
                            if (index + 1 < Object.keys(datas).length) animation(datas, index + 1)
                            else {
                                if (index + 1 == Object.keys(datas).length) {
                                    document.querySelector("header").scrollIntoView({
                                        block: 'start',
                                        behavior: 'smooth'
                                    });

                                    setTimeout(() => {
                                        let cantSearch = document.getElementById("cantSearch")
                                        let numAnt = +cantSearch.getAttribute("data")
                                        let c = RandomNumber(numAnt / 2, numAnt)
                                        animateValue(cantSearch, numAnt, c, 10)
                                    }, 1000)
                                }
                            }
                        })
                    }
                });
            } else {
                frames.forEach(frame => {
                    frame.style.animation = `debug-pulse 1s ease ${frame.style.transitionDelay} infinite alternate`;
                });
            }
        }, 1000)
    }
}

function init() {
    let gauntlet = document.getElementById("gauntlet")
    let cantSearch = document.getElementById("cantSearch")
    let seconds = document.getElementById("seconds")
    let click = true
    let c = RandomNumber(20000000, 95000000)
    let s = Math.random().toFixed(2)
    cantSearch.setAttribute("data", c)
    cantSearch.innerText = comas("" + c)
    seconds.innerText = s

    gauntlet.onclick = () => {
        if (!finish) return
        finish = false
        if (!click) {
            click = true
            let canvas = document.createElement("canvas")
            let audio = new Audio("/mp3/thanos_reverse_sound.mp3")
            canvas.style.position = "absolute"
            canvas.style.cursor = "pointer"
            gauntlet.appendChild(canvas)
            audio.play()
            animationImage(canvas, "/images/thanos_time.png", res => {
                let animationTransition = document.querySelectorAll("animation-transition")

                for (let i = 0; i < animationTransition.length; i++) animationTransition[i].classList.add("reset")
                Object.keys(save).forEach((key, i) => {
                    save[key].parent.removeChild(save[key].dom)
                    let headerMain = document.getElementById("headerMain")
                    let cantSearch = document.getElementById("cantSearch")
                    let numAnt = +cantSearch.innerText.replace(/,/ig, "")
                    let c = +cantSearch.getAttribute("data")
                    animateValue(cantSearch, numAnt, c, 10, true)
                    headerMain.style.color = "#006621"

                    setTimeout(() => {
                         headerMain.style.color = "rgba(119, 119, 119, 0.63)"
                    }, 600)

                    if ((i + 1) == Object.keys(save).length) {
                        let items = document.querySelectorAll(".none")

                        for (let i = 0; i < items.length; i++) items[i].classList.add("animation-in")
                    }
                })
            })
            return
        }

        for (let i = 0; i < 6; i++) {
            let num = RandomNumber(0, items.length - 1)
            if (node.indexOf(num) == -1) node.push(num)
            else i -= 1
        }

        click = false
        let canvas = document.createElement("canvas")
        let audio = new Audio("/mp3/thanos_snap_sound.mp3")
        canvas.style.position = "absolute"
        canvas.style.cursor = "pointer"
        gauntlet.appendChild(canvas)
        audio.play()
        animationImage(canvas, "/images/thanos_snap.png", res => {
            gauntlet.removeChild(canvas)
            for (let i = 0; i < node.length; i++) createCanvas(i)
        })

    }
}

function animateValue(selector, start, end, duration, type = false) {
    let range = end - start
    let current = start
    let increment = !type ? -100000 : 100000
    let stepTime = Math.abs(Math.floor(duration / range))

    let timer = setInterval(function () {
        if ((start - end) - 2000000 > current) increment = !type ? -100000 : 100000
        current += increment
        selector.innerHTML = `${comas(""+current)}`

        if (current <= end && !type) {
            clearInterval(timer)
            finish = true
        }else if(current >= end && type){
            clearInterval(timer)
            finish = true
        }

    }, stepTime);

    return timer;
}

function random() {
    return Math.random() * 200, Math.random() * 200, Math.random() * 200, Math.random() * 200
}

function comas(num) {
    return num.replace(/.(?=(?:.{3})+$)/g, '$&,').replace(',.', '.');
}