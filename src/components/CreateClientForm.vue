<template>
  <form class="form" @submit.prevent="checkForm">
    <div class="form__section section section--main">
      <h2 class="section__title">Основная информация</h2>
      <MainFields v-bind:checkFields="checkFields" v-on:check-result="getCheckResult" />
    </div>
    <div class="form__section section section--address">
      <h2 class="section__title">Адрес</h2>
      <AddressFields v-bind:checkFields="checkFields" v-on:check-result="getCheckResult" />
    </div>
    <div class="form__section section section--document">
      <h2 class="section__title">Удостоверение личности</h2>
      <DocumentFields v-bind:checkFields="checkFields" v-on:check-result="getCheckResult" />
    </div>

    <button class="btn btn--submit" type="submit">Coxpaнить</button>
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
    formInvalid: false,
    validationResult: {
      MainFields: {
        checked: false,
        valid: null
      },
      AddressFields: {
        checked: false,
        valid: null
      },
      DocumentFields: {
        checked: false,
        valid: null
      }
    }
  }),

  methods: {
    checkForm() {
      this.checkFields = true;
    },

  // принимаем результат вылидации одного из блоков формы (Основная информация/ Адрес / Удостоверение личности)
    getCheckResult(result) {
      let component = result.component;
      let valid = result.valid;

      this.validationResult[component].checked = true;
      this.validationResult[component].valid = valid;

      if (this.checkFields) {
        let submitSuccess = true;
        let checkedAllFields = true;

        for (let component in this.validationResult) {
          if (!this.validationResult[component].checked) {
            checkedAllFields = false;
          }

          if (
            this.validationResult[component].checked &&
            !this.validationResult[component].valid
          ) {
            submitSuccess = false;
          }
        }

        if (checkedAllFields) {
          if (submitSuccess) {
            alert("Клиент создан успешно");
          } else {
            alert("Не все поля заполнены корректно");
          }
          this.checkFields = false;
          this.clearValidationResult();
        }
      }
    },

    clearValidationResult() {
      for (let component in this.validationResult) {
        this.validationResult[component].checked = false;
        this.validationResult[component].valid = null;
      }
    }
  }
};
</script>


<style lang="sass" >
@import "../styles/_variables.sass"

.form
  display: flex
  box-sizing: border-box
  flex-direction: column
  background-color: $surface-color
  text-align: left
  margin: 0 auto
  padding: 1.8rem 2.1rem
  border-radius: $form-radius

  &__section
    margin-bottom: 30px

.section--main
  margin-bottom: 24px

.section__title
  position: relative
  padding: 0
  margin: 0 0 30px
  color: $title-color

  &::after
    content: ''
    position: absolute
    left: 0
    top: 45px
    border-top: $title-underline
    width: 100%
    height: 0px

@media (min-width: 768px)
  .form
    width: 770px
    box-shadow: 0px 0px 6px 2px $shadow-color

  .section-title
    font-size: 26px

@media (max-width: 767px)
  .form
    margin: 0
    width: 100%

  .section-title
    font-size: 23px

@media (max-width: 539px)
  .form
    padding: 15px

.btn
  border: 0
  border-radius: 35px
  background-color: $primary-color
  font-weight: bold
  color: #fff

.btn--submit
  align-self: center
  padding: 12px 50px
  min-width: 100px

.btn--submit:hover
  filter: brightness(110%)

.btn--submit:active
  filter: brightness(90%)

.btn--submit:focus
  outline: 0

.btn--disable
  pointer-events: none
</style>