<template>
  <div id="app">
    <CreateClientForm />
  </div>
</template>

<script>
import CreateClientForm from "@/components/CreateClientForm";
export default {
  name: "App",
  components: {
    CreateClientForm
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
