const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

c.fillRect(0, 0, canvas.width, canvas.height)

let gridIndex = 0

const satellites = [
    new Planet(
        {
            position: { x: (canvas.width / 2) + 100, y: (canvas.height / 2) - 100 },
            velocity: { x: 0, y: -2 },
            attr: { r: 5, color: '#7f8c8d', mass: 1 },
            state: 'running'
        }),
    new Planet(
        {
            position: { x: (canvas.width / 2) + 100, y: (canvas.height / 2) + 100 },
            velocity: { x: 0, y: -2 },
            attr: { r: 5, color: '#7f8c8d', mass: 1 },
            state: 'running'
        }),
    new Planet(
        {
            position: { x: (canvas.width / 2) + 100, y: (canvas.height / 2) + 100 },
            velocity: { x: 0, y: -2 },
            attr: { r: 5, color: '#7f8c8d', mass: 1 },
            state: 'running'
        }),
    new Planet(
        {
            position: { x: (canvas.width / 2) - 80, y: (canvas.height / 2) },
            velocity: { x: 0, y: 3 },
            attr: { r: 2.5, color: '#8e44ad', mass: 1 },
            state: 'running'
        }),
    new Planet(
        {
            position: { x: (canvas.width / 2) - 330, y: (canvas.height / 2) },
            velocity: { x: 0, y: 1.4 },
            attr: { r: 10, color: '#873600', mass: 1 },
            state: 'running'
        })
]

const fixedPlanet = new Planet(
    {
        position: { x: canvas.width / 2, y: canvas.height / 2 },
        velocity: { x: 0, y: 0 },
        attr: { r: 20, color: '#bdc3c7', mass: 1000 }
    })

    function updateDOM() {
        const planetsList = document.querySelector('.planets-list')
        planetsList.innerHTML = ''
        for (const satellite of satellites) {
            const planetContainer = document.createElement('div')
            planetContainer.classList.add('planet-container')
            planetContainer.addEventListener('click', () => alert('ciao'))
            planetContainer.innerHTML = `Planet ${satellite.attr.color}`
            planetsList.append(planetContainer)
        }
    }

function animate() {
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    fixedPlanet.update({ g: { x: 0, y: 0 }, c })

    for (const satellite of satellites) {
        if (satellite.state !== 'running') {
            continue
        }

        const gravity = calculateGravity(fixedPlanet, satellite)
        satellite.update({ g: gravity, c })
    }
    window.requestAnimationFrame(animate)
}

animate()