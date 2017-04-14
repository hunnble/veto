<template>
  <section class="time">
    <span>{{ hour < 10 ? '0' : '' }}{{ hour }}</span>:
    <span>{{ minute < 10 ? '0' : '' }}{{ minute }}</span>:
    <span>{{ second < 10 ? '0' : '' }}{{ second }}</span>
  </section>
</template>

<script>
  export default {
    created() {
      setInterval(this.updateTime, 1000);
    },
    data() {
      return {
        hour: 0,
        minute: 0,
        second: 0
      }
    },
    methods: {
      updateTime() {
        this.second += 1;
        if (this.second === 60) {
          this.minute += 1;
          this.second = 0;
          if (this.minute === 60) {
            this.hour += 1;
            this.minute = 0;
          }
        }
      }
    }
  }
</script>

<style>
  .time {
    font-size: 30px;
  }
</style>