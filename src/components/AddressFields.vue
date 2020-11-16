<template>
  <div class="address">
    <!------------ Индекс ------------------>
    <div
      class="field address__field address__field--index"
      :class="$v.cityIndex.$error ? 'field--invalid': ''"
    >
      <label>Индекс</label>
      <input
        type="number"
        maxlength="6"
        placeholder="192213"
        :class="$v.cityIndex.$error ? 'field__input--invalid': ''"
        v-model.number="cityIndex"
        dontSendSms
        @blur="$v.cityIndex.$touch()"
      />
      <p
        class="field__error"
        v-if="$v.cityIndex.$dirty &&!$v.cityIndex.integer"
      >Некорректное значение</p>
      <p
        class="field__error"
        v-if="$v.cityIndex.$dirty && (!$v.cityIndex.minLength || !$v.cityIndex.maxLength )"
      >Индекс должен содержать 6 цифр</p>
    </div>

    <!------------ Страна ------------------>
    <div
      class="field address__field address__field--country"
      :class="$v.country.$error ? 'field--invalid': ''"
    >
      <label>Страна</label>
      <input
        type="text"
        maxlength="50"
        value="Российская Федерация"
        :class="$v.country.$error ? 'field__input--invalid' :''"
        v-model.trim="country"
        @blur="$v.country.$touch()"
      />
      <p
        class="field__error"
        v-if="$v.country.$dirty && !$v.country.maxLength"
      >Максимальная длина - 50 символов</p>
    </div>

    <!------------ Область ------------------>
    <div
      class="field address__field address__field--region"
      :class="$v.region.$error ? 'field--invalid': ''"
    >
      <label>Область</label>
      <input
        type="text"
        maxlength="50"
        :class="$v.region.$error ? 'field__input--invalid' :''"
        v-model.trim="region"
        @blur="$v.region.$touch()"
      />
      <p
        class="field__error"
        v-if="$v.region.$dirty && !$v.region.maxLength"
      >Максимальная длина - 50 символов</p>
    </div>

    <!------------ Город ------------------>
    <div
      class="field address__field address__field--city"
      :class="$v.city.$error ? 'field--invalid': ''"
    >
      <label>Город</label>
      <input
        type="text"
        maxlength="50"
        :class="$v.city.$error ? 'field__input--invalid': ''"
        v-model.trim="city"
        @blur="$v.city.$touch()"
      />
      <p class="field__error" v-if="$v.city.$dirty && !$v.city.required">Поле не должно быть пустым</p>
      <p
        class="field__error"
        v-if="$v.city.$dirty && !$v.city.maxLength"
      >Максимальная длина - 50 символов</p>
    </div>

    <!------------ Улица ------------------>
    <div
      class="field address__field address__field--street"
      :class="$v.street.$error ? 'field--invalid': ''"
    >
      <label>Улица</label>
      <input
        type="text"
        maxlength="60"
        :class="$v.street.$error ? 'field__input--invalid': ''"
        v-model.trim="street"
        @blur="$v.street.$touch()"
      />
      <p
        class="field__error"
        v-if="$v.street.$dirty && !$v.street.maxLength"
      >Максимальная длина - 60 символов</p>
    </div>

    <!------------ Дом ------------------>
    <div
      class="field address__field address__field--house"
      :class="$v.houseNumber.$error ? 'field--invalid': ''"
    >
      <label>Дом (корпус, строение, литера)</label>
      <input
        type="text"
        maxlength="50"
        v-model.trim="houseNumber"
        :class="$v.houseNumber.$error ? 'field__input--invalid': ''"
        @blur="$v.houseNumber.$touch()"
      />
      <p
        class="field__error"
        v-if="$v.houseNumber.$dirty && !$v.houseNumber.maxLength"
      >Максимальная длина - 50 символов</p>
    </div>
  </div>
</template>


<script>
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  integer
} from "vuelidate/lib/validators";

export default {
  name: "AddressFields",
  mixins: [validationMixin],
  props: {
    checkFields: Boolean
  },
  data: () => ({
    cityIndex: null,
    country: "Россия",
    region: null,
    city: null,
    street: null,
    houseNumber: null
  }),

  watch: {
    checkFields: function() {
      if (this.checkFields) {
        this.$v.$touch();
        let valid = !this.$v.$error;
        this.$emit("check-result", "AddressFields", valid);
      }
    }
  },

  validations: {
    cityIndex: {
      integer,
      minLength: minLength(6),
      maxLength: maxLength(6)
      /*  length: val => {
        if (val) {
          return val.toString().length == 6;
        } else return false;
      }*/
    },
    country: {
      maxLength: maxLength(50)
    },
    region: {
      maxLength: maxLength(50)
    },
    city: {
      required,
      maxLength: maxLength(60)
    },
    street: {
      maxLength: maxLength(60)
    },
    houseNumber: {
      maxLength: maxLength(50)
    }
  }
};
</script>


<style lang="sass" scoped>
@import "../styles/_variables.sass"
@import "../styles/_field.sass"

.address
  display: grid
  grid-gap: 5px 1.8rem
  grid-template-columns: repeat(6, 1fr)
  grid-template-rows: repeat(3, 1fr)
  grid-template-areas: "a a a b b b" "c c c d d d" "e e e f f f"

.address__field--index
  grid-area: a

.address__field--country
  grid-area: b

.address__field--region
  grid-area: c

.address__field--city
  grid-area: d

.address__field--street
  grid-area: e

.address__field--house
  grid-area: f
</style>