class Planet {
    constructor({ position, velocity, attr }) {
        this.position = position
        this.velocity = velocity
        this.attr = attr
    }

    draw(c) {
        c.fillStyle = this.attr.color
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.attr.r, 0, 2 * Math.PI);
        c.fill();
    }

    update({ g, c }) {
        this.draw(c)
        this.velocity.y += g.y/this.attr.mass
        this.velocity.x += g.x/this.attr.mass
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
    }
}