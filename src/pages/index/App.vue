<template>
  <section class="example-wrapper">
    <div class="example-img"></div>
    <h2>Veto</h2>
    <timer></timer>
  </section>
</template>

<script>
  import '~styles/base';
  import Timer from '~components/Timer';
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
