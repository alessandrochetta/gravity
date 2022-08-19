const calculateGravity = function (p1, p2) {
    const distanceCoordinates = { x: p2.position.x - p1.position.x, y: p2.position.y - p1.position.y }
    let distance = Math.sqrt(Math.pow(distanceCoordinates.x, 2) + Math.pow(distanceCoordinates.y, 2))

    const force = p1.mass * p2.mass / (distance * distance)

    xProjection = (distanceCoordinates.x / (Math.abs(distanceCoordinates.y) + Math.abs(distanceCoordinates.x)))
    yProjection = (distanceCoordinates.y / (Math.abs(distanceCoordinates.x) + Math.abs(distanceCoordinates.y)))

    const projectedForce = {
        x: force * xProjection * -1,
        y: force * yProjection * -1
    }

    return projectedForce
}