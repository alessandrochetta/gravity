<script>
import Overview from './components/Overview.vue'
import { Planet } from './lib/Planet'
import { getDefaultPlanets } from './resources/defaultPlanets'
import SpaceCanvas from './components/SpaceCanvas.vue'

export default {
  data() {
    return {
      planets: [],
      width: 1024,
      height: 800
    }
  },
  created() {
    this.width = window.innerWidth
    this.height = window.innerHeight
  },
  mounted() {
    this.planets = getDefaultPlanets({
      type: 'default',
      width: this.width,
      height: this.height
    })

    // setInterval(() => {
    //   this.planets.push(new Planet(
    //     {
    //       position: { x: (this.width / 2) + 100, y: (this.height / 2) - 100 },
    //       velocity: { x: 0, y: -2 },
    //       attr: { r: 5, color: '#7f8c8d', mass: 1 },
    //       state: 'running'
    //     }))
    // }, 4000)
  },
  components: {
    Overview,
    SpaceCanvas
  }
}
</script>

<template>
  <div>
    <SpaceCanvas :planets="planets" :width="width" :height="height" />
    <Overview :planets="planets" />
  </div>
</template>

<style scoped>
</style>
