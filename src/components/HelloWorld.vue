<template>
  <div class="hello container text-center">
    <h3 class="fs-1 fs-md-3 fs-lg-5 mb-3">{{ msg }}</h3>
    <router-link to="/firebase" class="btn btn-primary text-white">
      Visit Firebase Component
    </router-link>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
