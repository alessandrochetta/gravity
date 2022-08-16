const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 567

c.fillRect(0, 0, canvas.width, canvas.height)

let gridIndex = 0

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

const drawVerticalWarping = ({ c, massCenter, x, h }) => {

    const distanceFromMassCenter = Math.abs(massCenter.x - x)

    const side = massCenter.x - x > 0 ? -1 : 1
    let warping = 0
    if (distanceFromMassCenter > 0) {
        warping = 30 * (30 / distanceFromMassCenter)
    }

    if(distanceFromMassCenter > 100) {
        warping = 0
    }

    if(warping > 30) {
        warping = 30
    }

    c.beginPath();
    c.moveTo(x, 0);
    c.bezierCurveTo(x, 0, x, 0, x, massCenter.y - warping * 2);

    c.bezierCurveTo(x, massCenter.y - warping, x + warping * side, massCenter.y - warping, x + warping * side, massCenter.y);
    c.bezierCurveTo(x + warping * side, massCenter.y + warping, x, massCenter.y + warping, x, massCenter.y + warping * 2);

    c.bezierCurveTo(x, h, x, h, x, h);
    const verticalGradient = generateGradient(0, 0, 0, h, c)
    c.strokeStyle = verticalGradient;
    c.stroke();
}

const drawHorizontalWarping = ({ c, massCenter, y, w }) => {

    const distanceFromMassCenter = Math.abs(massCenter.y - y)

    const side = massCenter.y - y > 0 ? -1 : 1
    let warping = 0
    if (distanceFromMassCenter > 0) {
        warping = 30 * (30 / distanceFromMassCenter)
    }

    if(distanceFromMassCenter > 100) {
        warping = 0
    }

    if(warping > 30) {
        warping = 30
    }

    c.beginPath();
    c.moveTo(0, y);
    c.bezierCurveTo(0, y, 0, y, massCenter.x - warping * 2, y);

    c.bezierCurveTo(massCenter.x - warping, y, massCenter.x - warping, y + warping * side, massCenter.x, y + warping * side);
    c.bezierCurveTo(massCenter.x + warping, y + warping * side, massCenter.x + warping, y, massCenter.x + warping * 2, y);

    c.bezierCurveTo(w, y, w, y, w, y);

    // Add opacity 
    const verticalGradient = generateGradient(0, 0, w, 0, c)
    c.strokeStyle = verticalGradient;
    c.stroke();
}

const drawGrid = ({ c, canvas, massCenter }) => {
    const h = canvas.height
    const w = canvas.width
    const x = massCenter.x
    const y = massCenter.y

    const spacing = 100

    for (let i = gridIndex; i < w; i += spacing) {
        drawVerticalWarping({ c, massCenter, x: i, h })
    }

    for (let i = gridIndex; i < w; i += spacing) {
        drawHorizontalWarping({ c, massCenter, y: i, w })
    }

    gridIndex += 0.5
    if (gridIndex > spacing) { gridIndex = 0 }
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