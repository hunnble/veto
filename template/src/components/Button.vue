<template>
  <time>{{ time }}</time>
  <button :click="handleClickBtn">about</button>
</template>

<script>
  export default {
    data () {
      return {
        time: new Date()
      }
    },
    methods: {
      updateTime () {
        this.time = new Date()
      }
    }
  }
</script>