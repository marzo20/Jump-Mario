const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth - 100
canvas.height = window.innerHeight - 100

// Make a square for Mario
const Mario = {
    x: 50,
    y: 350,
    width: 50,
    height: 50,
    draw(){
        ctx.fillStyle = 'green'
        ctx.fillRect (this.x, this.y, this.width, this.height)
    }
}
Mario.draw()

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
hurdle.draw()
