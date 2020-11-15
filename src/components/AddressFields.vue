<template>
  <div class="address">
    <!------------ Индекс ------------------>
    <label>Индекс</label>
    <input
      type="number"
      maxlength="6"
      placeholder="192213"
      :class="$v.cityIndex.$error ? 'is-invalid': ''"
      v-model.number="cityIndex"
      dontSendSms
      @blur="$v.cityIndex.$touch()"
    />
    <p class="error" v-if="$v.cityIndex.$dirty &&!$v.cityIndex.integer">Некорректное значение</p>
    <p
      class="error"
      v-if="$v.cityIndex.$dirty && (!$v.cityIndex.minLength || !$v.cityIndex.maxLength )"
    >Индекс должен содержать 6 цифр</p>
    <br />

    <!------------ Страна ------------------>
    <label>Страна</label>
    <input
      type="text"
      maxlength="50"
      value="Российская Федерация"
      :class="$v.country.$error ? 'is-invalid' :''"
      v-model.trim="country"
      @blur="$v.country.$touch()"
    />
    <p
      class="error"
      v-if="$v.country.$dirty && !$v.country.maxLength"
    >Максимальная длина - 50 символов</p>
    <br />

    <!------------ Область ------------------>
    <label>Область</label>
    <input
      type="text"
      maxlength="50"
      :class="$v.region.$error ? 'is-invalid' :''"
      v-model.trim="region"
      @blur="$v.region.$touch()"
    />
    <p
      class="error"
      v-if="$v.region.$dirty && !$v.region.maxLength"
    >Максимальная длина - 50 символов</p>
    <br />

    <!------------ Город ------------------>
    <label>Город</label>
    <input
      type="text"
      maxlength="50"
      :class="$v.city.$error ? 'is-invalid': ''"
      v-model.trim="city"
      @blur="$v.city.$touch()"
    />
    <p class="error" v-if="$v.city.$dirty && !$v.city.required">Поле не должно быть пустым</p>
    <p class="error" v-if="$v.city.$dirty && !$v.city.maxLength">Максимальная длина - 50 символов</p>
    <br />

    <!------------ Улица ------------------>

    <label>Улица</label>
    <input
      type="text"
      maxlength="50"
      :class="$v.street.$error ? 'is-invalid': ''"
      v-model.trim="street"
      @blur="$v.street.$touch()"
    />
    <p
      class="error"
      v-if="$v.street.$dirty && !$v.street.maxLength"
    >Максимальная длина - 60 символов</p>
    <br />

    <!------------ Дом ------------------>

    <label>Дом (корпус, строение, литера)</label>
    <input
      type="text"
      maxlength="50"
      v-model.trim="houseNumber"
      :class="$v.houseNumber.$error ? 'is-invalid': ''"
      @blur="$v.houseNumber.$touch()"
    />
    <p
      class="error"
      v-if="$v.houseNumber.$dirty && !$v.houseNumber.maxLength"
    >Максимальная длина - 50 символов</p>
    <br />
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


<style scoped>
.address {
  display: flex;
  flex-direction: column;
  text-align: left;
}
</style>