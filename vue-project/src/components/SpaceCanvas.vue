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
      this.animate()
    }
  },
  methods: {
    animate() {
      this.c.fillStyle = 'black'
      this.c.fillRect(0, 0, this.width, this.height)

      for (const satellite of this.planets) {
        if (satellite.state !== 'running') {
          continue
        }

        if (satellite.attr.isFixed) {
          satellite.update({ g: { x: 0, y: 0 }, c: this.c })
        } else {
          const gravity = calculateGravity(this.fixedPlanet, satellite)
          satellite.update({ g: gravity, c: this.c })
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
