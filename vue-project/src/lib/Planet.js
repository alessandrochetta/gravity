export class Planet {
    constructor({ position, velocity, attr, state, id, mass }) {
        this.position = position
        this.velocity = velocity
        this.attr = attr
        this.state = state
        this.id = id
        this.maxVelocity = 0
        this.scalarVelocity = 0
        this.mass = mass
    }

    draw(c) {
        c.fillStyle = this.attr.color
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.attr.r, 0, 2 * Math.PI);
        c.fill();
    }

    update({ g, c }) {

        this.velocity.y += g.y
        this.velocity.x += g.x
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        this.scalarVelocity = Math.sqrt(Math.pow(this.velocity.y, 2) + Math.pow(this.velocity.x, 2))

        if (this.scalarVelocity > this.maxVelocity) {
            this.maxVelocity = this.scalarVelocity
        }

        this.draw(c)
    }
}