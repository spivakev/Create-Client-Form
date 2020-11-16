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

<style lang="sass">
@import "./styles/_variables.sass"

body
  background-color: $bg-color

#app
  font-family: $font-stack
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale

  text-align: center
  color: #2c3e50

input,
select
  border: $input-border
  border-radius: $input-radius
  padding: 10px 15px
  background-color: $surface-color
  color: $title-color

input,
select:not([multiple])
  max-height: $input-height

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button
  -webkit-appearance: none
  margin: 0

input[type="number"]
  -moz-appearance: textfield
  font-family: $font-stack

input[type="date"]
  box-sizing: border-box

input[type="date"],
input[type="number"]
  font-family: Arial, sans-serif

label
  color: $title-color
</style>
