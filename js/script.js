const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')


canvas.width = window.innerWidth-50
canvas.height = window.innerHeight
const mario1 = new Image()
mario1.src = './images/Mario_jumping_.png'
const bg = new Image()
bg.src = './images/645984.jpeg'
const main = new Image()


function Background(){
    this.x = 0, this.y = 0, this.width = canvas.width, this.height = canvas.height
    this.render = function (){
        ctx.drawImage(bg, this.x--,-800)
        if(this.x <= -3000){
            this.x = 0
        }
    }
}
const background = new Background()
// Make a square for Mario
const mario = {
    x: 75,
    y: 550,
    width: 50,
    height: 50,
    draw(){
        ctx.fillStyle = 'green'
        // ctx.fillRect (this.x, this.y, this.width, this.height)
        ctx.drawImage(mario1, this.x-50, this.y-75)
    }
}
// mario.draw()

// Make a square for hurdle
const img1 = new Image()
const img2 = new Image()
img1.src = './images/GreenShell1.png'
img2.src= './images/tripple.png'
class Obstacles {
    constructor(){
        this.x = 1400
        this.y = 550
        this.width = 47
        this.height = 47
    }
    draw(){
        ctx.fillStyle = 'red'
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(img1, this.x-25, this.y)
    }
}class Obstacles2{
    constructor(){
        this.x = 1400
        this.y = 550
        this.width = 47
        this.height = 47
    }
    draw(){
        ctx.fillStyle = 'red'
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(img2, this.x-25, this.y)
    }
}
const hurdle = new Obstacles()
const shell = new Obstacles()
// hurdle.draw()

// Make the Obastacle move



let timer = -2
// make hurdles array
const hurdles = []
const shells = []
let jumpTimer = 0
var animation
let counting = 1
// make hurdles move towards mario using animation
function movingHurdle(){
    animation = requestAnimationFrame(movingHurdle)
    // more hurdles
    timer++
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    background.render()
    if (timer% 139 === 0){
        let hurdle = new Obstacles()
        hurdles.push(hurdle)
    }
    // drawing many hurdles using forEach method and hurdles array
    hurdles.forEach((hurdle)=>{
        hurdle.x -=4
        hurdle.draw()
    
       
    })
    if (timer % 370 === 0){
        let shell = new Obstacles2()
        shells.push(shell)
    }
    shells.forEach((shell) => {
        shell.x -=4
        shell.draw()
    })
    // check if mario hit each hurdles
    hurdles.forEach((hurdle, i, o) => {
        if (hurdle.x <-5){
            o.splice(i, 1)
            // counting passed hurdles for record
          const status = document.querySelector('#status')
          
        //   const countHurdles = counting++
          status.innerText = ''
          status.innerText = `score: ${counting++}`
           
            

        }
        
        hurdle.draw()
        collision(mario, hurdle)
    })
    shells.forEach((shell, i, o) => {
        if (shell.x <-5){
            o.splice(i, 1)
            // counting passed hurdles for record
          const status = document.querySelector('#status')
          
        //   const countHurdles = counting++
          status.innerText = ''
          status.innerText = `score: ${counting+=4}`
           
            

        }
        
        shell.draw()
        hitDetect(mario, shell)
    })
// if space bar pressed, mario jumps
    if(jumping == true){
        mario.y-=4
        jumpTimer+=2
        // console.log('spacebar clicked')
        // console.log(jumpTimer)
    }
    // mario coming down 
    if(jumpTimer> 117){
        jumping = false
        
        if(mario.y <550){
            mario.y+=4
            if(mario.y ==550){
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
        const press = document.querySelector('#press')
        // if mario hits hurdle, animation stop
        // ctx.clearRect(0, 0, canvas.width, canvas.height)
        cancelAnimationFrame(animation)
        press.innerText = ''
        press.innerText = 'Press ESC to restart'
        ctx.font = "30px Comic Sans MS"
        ctx.fillStyle = "red"
        ctx.textAlign = "center"
        ctx.fillText("Game Over", canvas.width/2, 200)
    
    }
}
function hitDetect(mario, shell){
    const xAxis1 = shell.x - (mario.x + mario.width)
    const yAxis1 = shell.y - (mario.y + mario.height)
    if(xAxis1 < 0 && yAxis1 < 0){
        cancelAnimationFrame(animation)
        press.innerText = ''
        press.innerText = 'Press ESC to restart'
        ctx.font = "30px Comic Sans MS"
        ctx.fillStyle = "red"
        ctx.textAlign = "center"
        ctx.fillText("Game Over", canvas.width/2, 200)
        

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
let gameOn = false
document.addEventListener('keyup', (event) => {
    if(event.code === 'Enter'){
        const status = document.querySelector('#status')
        gameOn = true
        press.innerText = 'Press Space to Jump'
        status.innerText = 'Start!'
        movingHurdle()
    }
}, {once: true})
document.addEventListener('keyup', (event) => {
    if(event.code === 'Escape'){
        document.location.reload(true)
        
    }
})
    
document.addEventListener('keyup', (event) => {
    if(event.code === 'Space') {
        jumping = true
        press.innerText = ''
    }
})
ctx.font = "30px Comic Sans MS"

ctx.textAlign = "center"
ctx.fillStyle = 'white'
ctx.fillText("Press Enter to Start", canvas.width/2, 650)
function whiteText (){
    if(gameOn == false){
    ctx.fillText("Press Enter to Start", canvas.width/2, 650)
    console.log('white')
    }
}
function clearText (){
    
    if(gameOn == false){
        ctx.clearRect(0,0,canvas.width,canvas.height)
    }
}

setInterval(whiteText, 2000)
setInterval(clearText, 1500)



// function gameLoop () {
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     detectCollision()
//     if(mario.pass = true){
//         mario.draw()
//         hurdle.draw()
//     }

// }
// gameLoop()