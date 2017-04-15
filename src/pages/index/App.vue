<template>
  <section class="example-wrapper">
    <div class="example-img"></div>
    <h2>Veto</h2>
    <a href="/about">about</a>
    <timer desc="+"></timer>
    <info></info>
  </section>
</template>

<script>
  import '~styles/base';
  import Timer from '~components/Timer';
  import Info from '~components/Info';
  export default {
    components: {
      Timer,
      Info
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
