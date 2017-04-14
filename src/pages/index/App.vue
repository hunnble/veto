<template>
  <section class="example-wrapper">
    <div class="example-img"></div>
    <h2>Veto</h2>
    <a href="/about">about</a>
    <timer desc="+"></timer>
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

<style scope>
  h2, section {
    font-weight: 300;
  }
</style>
