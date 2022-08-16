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

const drawGrid = ({ c, canvas }) => {
    const x = canvas.width
    const y = canvas.height
    const warping = 50

    c.beginPath();
    c.moveTo(x / 2, 0);
    c.bezierCurveTo(x / 2, y / 2 - warping, x / 2 - warping, y / 2 - warping, x / 2 - warping, y / 2);
    c.bezierCurveTo(x / 2 - warping, y / 2 + warping, x / 2, y / 2 + warping, x / 2, y);
    c.lineTo(x / 2, y);
    var grad = c.createLinearGradient(0, 0, 0, y);
    grad.addColorStop(0, "black");
    grad.addColorStop(0.25, "#101010");
    grad.addColorStop(0.5, "#383838");
    grad.addColorStop(0.75, "#101010");
    grad.addColorStop(1, "black");


    c.strokeStyle = grad;
    c.stroke();
}

function animate() {
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    drawGrid({ c, canvas })

    fixedPlanet.update({ g: { x: 0, y: 0 }, c })

    for (const satellite of satellites) {
        const gravity = calculateGravity(fixedPlanet, satellite)
        satellite.update({ g: gravity, c })
    }
    window.requestAnimationFrame(animate)
}

animate()