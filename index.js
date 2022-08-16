const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 567

c.fillRect(0, 0, canvas.width, canvas.height)

const planet1 = new Planet(
    {
        position: { x: canvas.width / 2, y: canvas.height / 2 },
        velocity: { x: 0, y: 0 },
        attr: { r: 20, color: '#bdc3c7', mass: 1000 }
    })

const planet2 = new Planet(
    {
        position: { x: (canvas.width / 2) + 100, y: (canvas.height / 2) - 100 },
        velocity: { x: 0, y: -2 },
        attr: { r: 5, color: '#7f8c8d', mass: 1 }
    })

const planet3 = new Planet(
    {
        position: { x: (canvas.width / 2) + 100, y: (canvas.height / 2) + 100 },
        velocity: { x: 0, y: -2 },
        attr: { r: 5, color: '#7f8c8d', mass: 1 }
    })

const planet4 = new Planet(
    {
        position: { x: (canvas.width / 2) - 80, y: (canvas.height / 2) },
        velocity: { x: 0, y: 3 },
        attr: { r: 2.5, color: '#8e44ad', mass: 1 }
    })


const planet5 = new Planet(
    {
        position: { x: (canvas.width / 2) - 330, y: (canvas.height / 2) },
        velocity: { x: 0, y: 1.4 },
        attr: { r: 10, color: '#873600', mass: 1 }
    })

function animate() {
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    const g12 = calculateGravity(planet1, planet2)
    const g13 = calculateGravity(planet1, planet3)
    const g14 = calculateGravity(planet1, planet4)
    const g15 = calculateGravity(planet1, planet5)
    planet1.update({ g: { x: 0, y: 0 } })
    planet2.update({ g: g12 })
    planet3.update({ g: g13 })
    planet4.update({ g: g14 })
    planet5.update({ g: g15 })
    window.requestAnimationFrame(animate)
}

animate()