const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')


canvas.width = window.innerWidth - 100
canvas.height = window.innerHeight - 100
const mario1 = new Image()
mario1.src = 'images/Mario_jumping_.png'
const bg = new Image()
bg.src = 'images/running-track-bg.png'
function Background(){
    this.x = 0, this.y = 0, this.width = canvas.width, this.height = canvas.height
    this.render = function (){
        ctx.drawImage(bg, this.x--,0)
        if(this.x <= -499){
            this.x = 0
        }
    }
}
const background = new Background()
// Make a square for Mario
const mario = {
    x: 50,
    y: 350,
    width: 50,
    height: 50,
    draw(){
        ctx.fillStyle = 'green'
        // ctx.fillRect (this.x, this.y, this.width, this.height)
        ctx.drawImage(mario1, this.x, this.y)
    }
}
// mario.draw()

// Make a square for hurdle
const img1 = new Image()
img1.src = 'images/hurdle_mario.jpeg'
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
        ctx.drawImage(img1, this.x, this.y)
    }
}
const hurdle = new Obstacles()
// hurdle.draw()

// Make the Obastacle move



let timer = -2
// make hurdles array
const hurdles = []
let jumpTimer = 0
var anmation
let counting = 1
// make hurdles move towards mario using animation
function movingHurdle(){
    animation = requestAnimationFrame(movingHurdle)
    // more hurdles
    timer++
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    background.render()
    if (timer% 180 === 0){
        let hurdle = new Obstacles()
        hurdles.push(hurdle)
          
    }
    // drawing many hurdles using forEach method and hurdles array
    hurdles.forEach((hurdle)=>{
        hurdle.x -=5
        hurdle.draw()
       
    })
    // check if mario hit each hurdles
    hurdles.forEach((hurdle, i, o) => {
        if (hurdle.x <0){
            o.splice(i, 1)
            // counting passed hurdles for record
          const status = document.querySelector('#status')
          
        //   const countHurdles = counting++
          status.innerText = ''
          status.innerText = counting++
           
            

        }
        collision(mario, hurdle)
        hurdle.draw()
    })
    
// if space bar pressed, mario jumps
    if(jumping == true){
        mario.y-=3
        jumpTimer++
        // console.log('spacebar clicked')
        // console.log(jumpTimer)
    }
    // mario coming down 
    if(jumpTimer> 70){
        jumping = false
        if(mario.y <350){
            mario.y+=3
            if(mario.y ==350){
                jumpTimer = 0
            }
        }    
    }
    // another syntax
    // if(jumping == false){
    //     if(mario.y <350){
    //         mario.y++
    //         jumpTimer = 0
    //     }
    // }
    

    mario.draw()
}
// detect collision
function collision(mario, hurdle){
    const xAxis = hurdle.x - (mario.x + mario.width)
    const yAxis = hurdle.y - (mario.y + mario.height)
    if( xAxis < 0 && yAxis < 0){
        // if mario hits hurdle, animation stop
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        cancelAnimationFrame(animation)
    }
}
// not working...
// function detectCollision (){
//     const hurdleLeft = mario.x + mario.width >= hurdle.x
//     const hurdleRight = mario.x <= hurdle.x + hurdle.width
//     const hurdleTop = mario.y + mario.height >= hurdle.y
//     const hurdleBottom = mario.y <= hurdle.y + hurdle.height
//     if( mario.x + mario.width >= hurdle.x &&
//         // right
//         mario.x <= hurdle.x + hurdle.width &&
//         // top
//         mario.y + mario.height >= hurdle.y &&
//         // bottom
//         mario.y <= hurdle.y + hurdle.height){
//         console.log('mario hit the hurdle')
//         mario.pass = false
//     }
// }

// // make Mario jump
let jumping = false

    
document.addEventListener('keyup', (event) => {
    if(event.code === 'Space') {
        jumping = true
     
    }
})
movingHurdle()

// function gameLoop () {
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     detectCollision()
//     if(mario.pass = true){
//         mario.draw()
//         hurdle.draw()
//     }

// }
// gameLoop()