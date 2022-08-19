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
      height: 800,
      selectedPlanet: undefined,
      selectedPlanetToEdit: undefined,
      selectedPlanetSnapshot: undefined
    }
  },
  created() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    // document.addEventListener("click", this.handleMousePosition);
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
  },
  methods: {
    handlePlanetSelection(selectedPlanet) {
      if (this.selectedPlanet) { return }
      this.selectedPlanetSnapshot = JSON.parse(JSON.stringify(selectedPlanet))
      selectedPlanet.state = 'paused'
      this.selectedPlanetToEdit = JSON.parse(JSON.stringify(selectedPlanet))
      selectedPlanet.velocity = { x: 0, y: 0 }
      this.selectedPlanet = selectedPlanet
    },
    handleSavePlanet() {
      this.selectedPlanet.velocity.x = +this.selectedPlanetToEdit.velocity.x
      this.selectedPlanet.velocity.y = +this.selectedPlanetToEdit.velocity.y
      this.selectedPlanet.state = 'running'
      this.selectedPlanet.attr = this.selectedPlanetToEdit.attr
      this.selectedPlanet.mass = this.selectedPlanetToEdit.mass
      this.selectedPlanet = undefined
      this.selectedPlanetToEdit = undefined
    },
    resetChanges() {
      this.selectedPlanet.velocity = this.selectedPlanetSnapshot.velocity
      this.selectedPlanet.position = this.selectedPlanetSnapshot.position
      this.selectedPlanet.attr = this.selectedPlanetSnapshot.attr
      this.selectedPlanet.mass = this.selectedPlanetSnapshot.mass
      this.selectedPlanet.state = 'running'
    },
    handleCancelEditing() {
      this.resetChanges()
      this.selectedPlanet = undefined
      this.selectedPlanetToEdit = undefined
    },
    handleNoGravity() {
      this.resetChanges()
      this.selectedPlanet.state = 'no-gravity'
      this.selectedPlanet = undefined
      this.selectedPlanetToEdit = undefined
    },
    handleNoVelocity() {
      this.resetChanges()
      this.selectedPlanet.velocity = { x: 0, y: 0 }
      this.selectedPlanet = undefined
      this.selectedPlanetToEdit = undefined
    },
    handleRemove() {
      this.planets = this.planets.filter(p => p.id != this.selectedPlanet.id)
      console.log(this.planets);
      this.selectedPlanet = undefined
      this.selectedPlanetToEdit = undefined
    },
    handleMousePosition(event) {
      if (this.selectedPlanet) {
        this.selectedPlanet.position = { x: event.clientX, y: event.clientY }
      }
    }
  }
}
</script>

<template>
  <div>
    <SpaceCanvas :planets="planets" :width="width" :height="height" @click="handleMousePosition" />

    <Overview :planets="planets" @select-planet="handlePlanetSelection" />

    <div class="planet-editor" v-if="selectedPlanetToEdit"
      :style="{ 'border-color': `${selectedPlanetToEdit.attr.color}33`, 'color': selectedPlanetToEdit.attr.color }">
      <div class="planet-editor__row">
        <div>Name: <input type="text" v-model="selectedPlanetToEdit.attr.name" /></div>
        <div>Color: <input type="text" v-model="selectedPlanetToEdit.attr.color" /></div>
      </div>
      <div class="planet-editor__row">
        <div>Mass: <input type="text" v-model="selectedPlanetToEdit.mass" /></div>
        <div>Radius: <input type="text" v-model="selectedPlanetToEdit.attr.r" /></div>
      </div>
      <div class="planet-editor__row">
        <div>vx: <input type="text" v-model="selectedPlanetToEdit.velocity.x" /></div>
        <div>vy: <input type="text" v-model="selectedPlanetToEdit.velocity.y" /></div>
      </div>
      <div class="planet-editor__row">
        <button
          :style="{ 'border': `solid 1px ${selectedPlanetToEdit.attr.color}33`, 'color': selectedPlanetToEdit.attr.color }"
          @click="handleNoGravity" class="button">NO GRAVITY</button>

        <button
          :style="{ 'border': `solid 1px ${selectedPlanetToEdit.attr.color}33`, 'color': selectedPlanetToEdit.attr.color }"
          @click="handleNoVelocity" class="button">NO VELOCITY</button>
      </div>
      <div class="planet-editor__row">
        <button
          :style="{ 'border': `solid 1px ${selectedPlanetToEdit.attr.color}33`, 'color': selectedPlanetToEdit.attr.color }"
          @click="handleCancelEditing" class="button">CANCEL</button>

        <button
          :style="{ 'border': `solid 1px ${selectedPlanetToEdit.attr.color}33`, 'color': selectedPlanetToEdit.attr.color }"
          @click="handleRemove" class="button">REMOVE</button>

        <button :style="{ 'background-color': selectedPlanetToEdit.attr.color }" @click="handleSavePlanet"
          class="button">SAVE</button>

      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.button {
  padding: 5px 10px;
  color: black;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  transition: 0.5s;
  cursor: pointer;
  background-color: transparent;
}

.planet-editor {
  position: absolute;
  top: 10px;
  right: 50%;
  transform: translateX(50%);
  min-width: 200px;
  margin: 5px;
  padding: 5px;
  border: 4px solid black;
  border-radius: 5px;
  transition: 0.5s;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__row {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: nowrap;
  }
}

input {
  background-color: #101010;
  border: none;
  color: inherit;
  background-image: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  padding: 5px;
  border-radius: 5px;
}

input:focus {
  outline: none;
}
</style>
