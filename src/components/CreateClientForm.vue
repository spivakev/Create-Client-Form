<template>
  <form class="form" @submit.prevent="checkForm">
    <div class="form__section section">
      <MainFields v-bind:checkFields="checkFields" v-on:check-result="getCheckResult" />
    </div>
    <div class="form__section section">
      <AddressFields v-bind:checkFields="checkFields" v-on:check-result="getCheckResult" />
    </div>
    <div class="form__section section">
      <PassportFields v-bind:checkFields="checkFields" v-on:check-result="getCheckResult" />
    </div>
    <button class="btn" type="submit">Coxpaнить</button>
  </form>
</template>



<script>
import MainFields from "@/components/MainFields";
import AddressFields from "@/components/AddressFields";
import PassportFields from "@/components/PassportFields";

export default {
  name: "CreateClientForm",
  components: {
    MainFields,
    AddressFields,
    PassportFields
  },
  data: () => ({
    checkFields: false,
    validationResult: {
      MainFields: undefined,
      AddressFields: undefined,
      PassportFields: undefined
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
    },

    clearValidationResult() {
      this.validationResult[MainFields] = undefined;
    }
  }
};
</script>


<style>
.form {
  width: 700px;
  margin: 0 auto;
}

.form__section {
  display: flex;
  flex-direction: column;
  text-align: left;

  border: 1.5px solid #767676;
  border-radius: 5px;
  padding: 10px 20px;
}

.section {
  margin-bottom: 30px;
}

/* TODO: Переименовать стили ниже */
.gender-wrapper label {
  margin-right: 10px;
}

.btn {
  padding: 5px 10px;
  width: 100px;
}

.is-invalid {
  border: 1px solid red;
  border-radius: 3px;
}

.error {
  margin: 0;
  padding: 5px 0;
  font-size: 13px;
  color: red;
}

.birth__day,
.birth__month,
.birth__year {
  margin-left: 5px;
}

.birth__day,
.birth__month {
  margin-right: 15px;
  max-width: 20px;
}

.birth__year {
  max-width: 40px;
}
</style>