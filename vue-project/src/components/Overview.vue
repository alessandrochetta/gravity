<script>
export default {
  data() {
    return {
    }
  },
  props: {
    planets: { type: Array, default: () => [] }
  }
}

</script>

<template>
  <div class="overview">
    <div class="overview__slot" v-for="planet in planets" :key="planet.id">
      {{ planet.velocity.x.toFixed(1) }} {{ planet.velocity.y.toFixed(1) }}
    </div>
  </div>
</template>

<style scoped>
.overview {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
