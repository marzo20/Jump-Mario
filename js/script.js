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
        this.x = 1200
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



let timer = -2
// make hurdles array
const hurdles = []
let jumpTimer = 0
function movingHurdle(){
    requestAnimationFrame(movingHurdle)
    // more hurdles
    timer++
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (timer% 250 === 0){
        let hurdle = new Obstacles()
        hurdles.push(hurdle)
        console.log(hurdles)
    }
    // drawing many hurdles using forEach method and hurdles array
    hurdles.forEach((hurdle)=>{
        hurdle.x --
        hurdle.draw()
    })
    
// if space bar pressed, mario jumps
    if(jumping == true){
        mario.y--
        jumpTimer++
        console.log('spacebar clicked')
        console.log(jumpTimer)
    }
    // mario coming down 
    if(jumpTimer> 105){
        jumping = false
        if(mario.y <350){
            mario.y++
            if(mario.y ==350){
                jumpTimer = 0
            }
        }    
    }
    // if(jumping == false){
    //     if(mario.y <350){
    //         mario.y++
    //         jumpTimer = 0
    //     }
    // }
    
   

    mario.draw()
}


// // make Mario jump
let jumping = false
document.addEventListener('keyup', (event) => {
    if(event.code === 'Space') {
        jumping = true
        console.log('space pressed')
    }
})
movingHurdle()
