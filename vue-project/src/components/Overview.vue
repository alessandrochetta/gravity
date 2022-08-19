<script>
export default {
  data() {
    return {
    }
  },
  props: {
    planets: { type: Array, default: () => [] }
  },
  methods: {
    calculateVelocityPercentage(planet) {
      if (planet.maxVelocity === 0) { return '0%' }
      return planet.scalarVelocity / planet.maxVelocity * 100 + '%'
    }
  }
}

</script>

<template>
  <div class="overview">
    <div class="overview__slot" v-for="planet in planets" :key="planet.id" @click="$emit('select-planet', planet)"
      :style="{ 'border-color': planet.attr.color, 'color': planet.attr.color }">
      <div class="overview__slot-background"
        :style="{ 'background-color': `${planet.attr.color}33`, 'width': calculateVelocityPercentage(planet) }"></div>
      <div v-if="planet.attr.name" class="overview__slot-row">
        <div class="overview__slot-name">
          {{ planet.attr.name }}
        </div>
      </div>
      <div class="overview__slot-row">
        <div>x: {{ planet.position.x.toFixed(1) }} </div>
        <div>y: {{ planet.position.y.toFixed(1) }}</div>
      </div>
      <div class="overview__slot-row">
        <div>vx: {{ planet.velocity.x.toFixed(1) }} </div>
        <div>vy: {{ planet.velocity.y.toFixed(1) }}</div>
      </div>
      <div class="overview__slot-row">
        <div>|v|: {{ planet.scalarVelocity.toFixed(1) }} </div>
        <div>mass: {{ planet.mass }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.overview {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;

  &__slot {
    position: relative;
    cursor: pointer;
    min-width: 200px;
    padding: 5px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    overflow: hidden;
  }

  &__slot-background {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  &__slot-row {
    display: flex;
    justify-content: space-evenly;

    &>div {
      min-width: 60px;
    }
  }

  &__slot-name {
    font-weight: 900;
    text-align: center;
  }
}
</style>
