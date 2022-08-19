<script>
import { calculateGravity } from '../lib/helpers'

export default {
  data() {
    return {
      c: undefined,
      fixedPlanet: undefined,
      animationFrameId: undefined
    }
  },
  props: {
    width: { type: Number, default: 1024 },
    height: { type: Number, default: 800 },
    planets: { type: Array, default: () => [] }
  },
  watch: {
    planets() {
      const canvas = document.querySelector('canvas')
      this.c = canvas.getContext('2d')
      canvas.width = this.width
      canvas.height = this.height

      this.c.fillRect(0, 0, this.width, this.height)

      this.fixedPlanet = this.planets.find(p => p.attr.isFixed)

      cancelAnimationFrame(this.animationFrameId)
      try {
        this.animate()
      } catch (error) {
        console.log('error in animation loop');
      }
    }
  },
  methods: {
    animate() {
      this.c.fillStyle = 'black'
      this.c.fillRect(0, 0, this.width, this.height)

      for (const planet of this.planets) {
        let gravity = { x: 0, y: 0 }

        if (planet.attr.isFixed) {
          planet.update({ g: gravity, c: this.c })
        } else {

          if (planet.state == 'no-gravity' || planet.state == 'paused') {
            gravity = { x: 0, y: 0 }
          } else {
            gravity = calculateGravity(this.fixedPlanet, planet)
          }

          planet.update({ g: gravity, c: this.c })
        }
      }
      
      this.animationFrameId = window.requestAnimationFrame(this.animate)
    }
  }
}

</script>

<template>
  <canvas></canvas>
</template>

<style scoped>
</style>
