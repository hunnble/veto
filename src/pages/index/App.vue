<template>
  <section>
    <h2>Hello {{ name }}</h2>
    <timer></timer>
  </section>
</template>

<script>
  import Timer from '../../components/Timer';
  export default {
    components: {
      Timer
    },
    data() {
      return {
        name: 'veto'
      }
    }
  }
</script>

<style scope>
  div {
    color: #451235;
  }
</style>
