const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth - 100
canvas.height = window.innerHeight - 100

// Make a square for Mario
const mario = {
    x: 50,
    y: 350,
    width: 50,
    height: 50,
    draw(){
        ctx.fillStyle = 'green'
        ctx.fillRect (this.x, this.y, this.width, this.height)
    }
}
// mario.draw()

// Make a square for hurdle

class Obstacles {
    constructor(){
        this.x = 750
        this.y = 350
        this.width = 50
        this.height = 50
    }
    draw(){
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
const hurdle = new Obstacles()
// hurdle.draw()

// Make the Obastacle move



let timer = 0
// make hurdles array and drawing many hurdles using forEach method
const hurdles = []

function movingHurdle(){
    requestAnimationFrame(movingHurdle)
    // more hurdles
    timer++
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (timer% 240 === 0){
        let hurdle = new Obstacles()
        hurdles.push(hurdle)
        console.log(hurdles)
    }
    hurdles.forEach((hurdle)=>{
        hurdle.x --
        hurdle.draw()
    })
    mario.draw()
}
movingHurdle()
