export const calculateGravity = function (p1, p2) {
    if (!p1) {
        return { x: 0, y: 0 }
    }
    let p1Mass = p1.mass
    if (!p1Mass) { p1Mass = 0 }

    let p2Mass = p2.mass
    if (!p2Mass) { p2Mass = 0 }

    const distanceCoordinates = { x: p2.position.x - p1.position.x, y: p2.position.y - p1.position.y }
    let distance = Math.sqrt(Math.pow(distanceCoordinates.x, 2) + Math.pow(distanceCoordinates.y, 2))
   
    
    let force = p1Mass * p2Mass / (distance * distance)

    const xProjection = (distanceCoordinates.x / (Math.abs(distanceCoordinates.y) + Math.abs(distanceCoordinates.x)))
    const yProjection = (distanceCoordinates.y / (Math.abs(distanceCoordinates.x) + Math.abs(distanceCoordinates.y)))

    const projectedForce = {
        x: force * xProjection * -1,
        y: force * yProjection * -1
    }

    return projectedForce
}

const generateGradient = function (x0, y0, x1, y1, c) {
    const gradient = c.createLinearGradient(x0, y0, x1, y1);
    gradient.addColorStop(0, "black");
    gradient.addColorStop(0.25, "#101010");
    gradient.addColorStop(0.5, "#383838");
    gradient.addColorStop(0.75, "#101010");
    gradient.addColorStop(1, "black");
    return gradient
}

const drawHorizontalWarping = ({ c, massCenter, y, w }) => {

    const distanceFromMassCenter = Math.abs(massCenter.y - y)

    const side = massCenter.y - y > 0 ? -1 : 1
    let warping = 0
    if (distanceFromMassCenter > 0) {
        warping = 30 * (30 / distanceFromMassCenter)
    }

    if (distanceFromMassCenter > 100) {
        warping = 0
    }

    if (warping > 30) {
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

const drawVerticalWarping = ({ c, massCenter, x, h }) => {

    const distanceFromMassCenter = Math.abs(massCenter.x - x)

    const side = massCenter.x - x > 0 ? -1 : 1
    let warping = 0
    if (distanceFromMassCenter > 0) {
        warping = 30 * (30 / distanceFromMassCenter)
    }

    if (distanceFromMassCenter > 100) {
        warping = 0
    }

    if (warping > 30) {
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