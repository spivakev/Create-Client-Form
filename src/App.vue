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

/*
input, select {
  border: 1px solid#a5a5a5;
  border-radius: 3px;
}
*/

input[type="text"],
input[type="tel"],
input[type="date"],
input[type="number"],
select {
  padding: 5px 10px;
}
</style>
