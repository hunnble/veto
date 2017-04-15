<template>
  <section>
    <h4>author: {{ author }}</h4>
    <h4>season: {{ season }}</h4>
  </section>
</template>

<script>
  import axios from 'axios';
  export default {
    created() {
      this.fetch('/api/info')
    },
    data() {
      return {
        author: 'no one',
        season: 'summer'
      }
    },
    methods: {
      fetch(url) {
        axios({ url })
          .then((res) => {
            if (res.status !== 200) {
              throw new Error(res.statusText);
            }
            this.author = res.data.author;
            this.season = res.data.season;
          })
          .catch(err => console.log(err));
      }
    }
  }
</script>
