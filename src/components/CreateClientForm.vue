<template>
  <form class="form" @submit.prevent="checkForm">
    <div class="form__section section section--main">
      <h2 class="section__title">Основная информация</h2>
      <MainFields v-bind:checkFields="checkFields" v-on:check-result="getCheckResult" />
    </div>
    <div class="form__section section">
      <h2 class="section__title">Адрес</h2>
      <AddressFields v-bind:checkFields="checkFields" v-on:check-result="getCheckResult" />
    </div>
    <div class="form__section section">
      <h2 class="section__title">Удостоверение личности</h2>
      <DocumentFields v-bind:checkFields="checkFields" v-on:check-result="getCheckResult" />
    </div>
    <button class="form__submit" type="submit">Coxpaнить</button>
  </form>
</template>



<script>
import MainFields from "@/components/MainFields";
import AddressFields from "@/components/AddressFields";
import DocumentFields from "@/components/DocumentFields";

export default {
  name: "CreateClientForm",
  components: {
    MainFields,
    AddressFields,
    DocumentFields
  },
  data: () => ({
    checkFields: false,
    validationResult: {
      MainFields: undefined,
      AddressFields: undefined,
      DocumentFields: undefined
    }
  }),

  methods: {
    checkForm() {
      this.checkFields = true;
    },

    getCheckResult(component, valid) {
      this.validationResult[component] = valid;

      if (this.checkFields && this.validationResult[component]) {
        console.log(`Все поля компонента ${component} валидны`);
      } else if (this.checkFields && !this.validationResult[component]) {
        console.log(`В компоненте ${component} есть невалидные поля`);
      }

      // this.checkFields = false;
      // this.clearValidationResult();
      // ДОДЕЛАТЬ!!!! ВЫВОДИТЬ СООБЩЕНИЕ, ЕСЛИ ЗАРЕГИСТРИРОВАН УСПЕШНО !!!!
    },

    clearValidationResult() {
      this.validationResult[MainFields] = undefined;
    }
  }
};
</script>


<style lang="sass" >
@import "../styles/_variables.sass"

.form
  margin: 0 auto
  width: 700px
  padding: 1.8rem 2.1rem
  border-radius: $form-radius
  background-color: $surface-color
  box-shadow: 0px 0px 6px 2px $shadow-color
  text-align: left

  &__section
    margin-bottom: 30px

.section--main
  margin-bottom: 0

.section__title
  position: relative
  margin: 0 0 30px
  padding: 0
  color: $title-color
  font-size: 1.6rem

  &::after
    content: ''
    position: absolute
    top: 45px
    left: 0
    border-top: $title-underline
    width: 100%
    height: 0px

.form__submit
  padding: 10px 20px
  min-width: 100px
  background-color: $primary-color
  font-weight: bold
  color: #fff
  border: 0
  border-radius: 35px
</style>