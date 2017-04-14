<template>
  <section class="time">
    <span v-if="desc">{{ desc }}</span>
    <span v-if="hour > 0">{{ hour }}h</span>
    <span v-if="minute > 0">{{ minute }}min</span>
    <span>{{ second }}s</span>
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
    },
    props: ['desc']
  }
</script>

<style scope>
  span {
    display: inline-block;
    height: 30px;
    line-height: 30px;
  }
</style>
