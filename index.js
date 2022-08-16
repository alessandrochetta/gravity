const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 567

c.fillRect(0, 0, canvas.width, canvas.height)


const satellites = [
    new Planet(
        {
            position: { x: (canvas.width / 2) + 100, y: (canvas.height / 2) - 100 },
            velocity: { x: 0, y: -2 },
            attr: { r: 5, color: '#7f8c8d', mass: 1 }
        }),
    new Planet(
        {
            position: { x: (canvas.width / 2) + 100, y: (canvas.height / 2) + 100 },
            velocity: { x: 0, y: -2 },
            attr: { r: 5, color: '#7f8c8d', mass: 1 }
        }),
    new Planet(
        {
            position: { x: (canvas.width / 2) + 100, y: (canvas.height / 2) + 100 },
            velocity: { x: 0, y: -2 },
            attr: { r: 5, color: '#7f8c8d', mass: 1 }
        }),
    new Planet(
        {
            position: { x: (canvas.width / 2) - 80, y: (canvas.height / 2) },
            velocity: { x: 0, y: 3 },
            attr: { r: 2.5, color: '#8e44ad', mass: 1 }
        }),
    new Planet(
        {
            position: { x: (canvas.width / 2) - 330, y: (canvas.height / 2) },
            velocity: { x: 0, y: 1.4 },
            attr: { r: 10, color: '#873600', mass: 1 }
        })
]

const fixedPlanet = new Planet(
    {
        position: { x: canvas.width / 2, y: canvas.height / 2 },
        velocity: { x: 0, y: 0 },
        attr: { r: 20, color: '#bdc3c7', mass: 1000 }
    })

const drawVerticalWarping = ({ c, warping, x, y, h }) => {
    c.beginPath();
    c.moveTo(x, 0);
    c.bezierCurveTo(x, 0, x, 0, x, y - warping * 2);

    c.bezierCurveTo(x, y - warping, x - warping, y - warping, x - warping, y);
    c.bezierCurveTo(x - warping, y + warping, x, y + warping, x, y + warping * 2);

    c.bezierCurveTo(x, h, x, h, x, h);
    const verticalGradient = generateGradient(0, 0, 0, h, c) 
    c.strokeStyle = verticalGradient;
    c.stroke();
}

const drawGrid = ({ c, canvas, massCenter }) => {
    const h = canvas.height
    const w = canvas.width
    const x = massCenter.x
    const y = massCenter.y
    const warping = 50

    drawVerticalWarping({ c, warping, x, y, h })
}

function animate() {
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    drawGrid({ c, canvas, massCenter: fixedPlanet.position })

    fixedPlanet.update({ g: { x: 0, y: 0 }, c })

    for (const satellite of satellites) {
        const gravity = calculateGravity(fixedPlanet, satellite)
        satellite.update({ g: gravity, c })
    }
    window.requestAnimationFrame(animate)
}

animate()