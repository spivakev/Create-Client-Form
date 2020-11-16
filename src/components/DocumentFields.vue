<template>
  <div class="document">
    <!------------ Тип документа ------------------>
    <div
      class="field document__field document__field--type"
      :class="$v.docType.$error ? 'field--invalid': ''"
    >
      <label>Тип документа</label>
      <select
        :class="$v.docType.$error ? 'field__input--invalid': ''"
        v-model="docType"
        @blur="$v.docType.$touch()"
      >
        <option
          v-for="(docType, index) in docTypes"
          :value="docType.value"
          :key="index"
        >{{docType.label}}</option>
      </select>
      <p
        class="field__error"
        v-if="$v.docType.$dirty && !$v.docType.required"
      >Укажите тип документа, удостоверяющего личность</p>
    </div>

    <!------------ Серия ------------------>
    <div
      class="field document__field document__field--series"
      :class="$v.docType.$error ? 'field--invalid': ''"
    >
      <label>Серия</label>
      <input
        type="text"
        maxlength="13"
        :class="$v.series.$error ? 'field__input--invalid': ''"
        v-model="series"
        @blur="$v.series.$touch()"
      />
      <p
        class="field__error"
        v-if="$v.series.$dirty && (!$v.series.minLength)"
      >Поле должно содержать хотя бы 4 символа</p>
      <p
        class="field__error"
        v-if="$v.series.$dirty &&  ($v.series.minLength) && !$v.series.validSeries"
      >Значение должно соответствовать формату: "{{seriesFormats[docType]}}"</p>
    </div>

    <!------------ Номер ------------------>
    <div
      class="field document__field document__field--number"
      :class="$v.docType.$error ? 'field--invalid': ''"
    >
      <label>Номер</label>
      <input
        type="number"
        maxlength="6"
        :class="$v.number.$error ? 'field__input--invalid': ''"
        v-model.number="number"
        @blur="$v.number.$touch()"
      />

      <p
        class="field__error"
        v-if="$v.number.$dirty && !$v.number.validNumber"
      >Поле должно содержать ровно 6 цифр</p>
    </div>

    <!------------ Кем выдан ------------------>
    <div
      class="field document__field document__field--issued-by"
      :class="$v.docType.$error ? 'field--invalid': ''"
    >
      <label>Кем выдан</label>
      <input
        type="text"
        maxlength="200"
        :class="$v.number.$error ? 'field__input--invalid': ''"
        v-model="issuedBy"
        @blur="$v.issuedBy.$touch()"
      />
      <p
        class="field__error"
        v-if="$v.issuedBy.$dirty && !$v.issuedBy.maxLength"
      >Максимальная длина - 200 символов</p>
    </div>

    <!------------ Дата выдачи ------------------>
    <div
      class="field document__field document__field--issue-date"
      :class="$v.docType.$error ? 'field--invalid': ''"
    >
      <label>Дата выдачи</label>
      <input
        type="date"
        :class="$v.issueDate.$error ? 'field__input--invalid': ''"
        v-model="issueDate"
        @blur="$v.issueDate.$touch()"
      />
      <p
        class="field__error"
        v-if="$v.issueDate.$dirty && !$v.issueDate.required"
      >Укажите дату выдачи документа</p>
      <p
        class="field__error"
        v-if="$v.issueDate.$dirty && $v.issueDate.required && !$v.issueDate.isCorrectDate"
      >Выход за допустимый диапазон</p>
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

//проверка серии свидетельства о рождении
const isBirthSertificateSeries = val =>
  /^[IVXLCDM]{1,10}[-][А-Я]{2}$/.test(val); //или {0, 10}?

//проверка серии паспорта / водительского удостоверения
const isSeries = val => /^[0-9]{4}$/.test(val);

const isDocumentNumber = val => (val ? /^[0-9]{6}$/.test(val) : true); //Проверка номера документа. Проверяем только если значение введено

const isDocumentSeries = function(val) {
  if (val) {
    let docType = this.docType;

    if (docType == "birthСertificate") {
      return isBirthSertificateSeries(val);
    } else {
      return isSeries(val);
    }
  } else return true; // не валидируем, если значение не введено
};

export default {
  name: "DocumentFields",
  mixins: [validationMixin],
  props: {
    checkFields: Boolean
  },
  data: () => ({
    docType: "passport",
    series: null,
    number: null,
    issuedBy: null,
    issueDate: null,

    seriesFormats: {
      passport: "4444",
      driversLicense: "4444",
      birthСertificate: "III-АМ"
    },

    docTypes: [
      {
        label: "Паспорт",
        value: "passport"
      },
      {
        label: "Свидетельство о рождении",
        value: "birthСertificate"
      },
      {
        label: "Вод. удостоверение",
        value: "driversLicense"
      }
    ]
  }),

  watch: {
    checkFields: function() {
      if (this.checkFields) {
        this.$v.$touch();
        let valid = !this.$v.$error;
        this.$emit("check-result", "DocumentFields", valid);
      }
    }
  },

  validations: {
    docType: {
      required
    },
    series: {
      minLength: minLength(4),
      // maxLength: maxLength(13),
      validSeries: isDocumentSeries
    },
    number: {
      integer,
      minLength: minLength(6),
      maxLength: maxLength(6),
      validNumber: isDocumentNumber
    },
    issuedBy: {
      maxLength: maxLength(200)
    },
    issueDate: {
      required,
      isCorrectDate: inputDate => {
        let date = new Date(inputDate);
        return date > new Date(1900, 0, 1) && date < new Date();
      }
    }
  }
};
</script>


<style lang="sass" scoped>
@import "../styles/_variables.sass"
@import "../styles/_field.sass"

.document
  display: grid
  grid-gap: 5px 1.8rem
  grid-template-columns: repeat(3, 1fr)
  grid-template-rows: repeat(2, 1fr)
  grid-template-areas: "a b c" "d d e"

.document__field--docType
  grid-area: a

.document__field--series
  grid-area: b

.document__field--number
  grid-area: c

.document__field--issued-by
  grid-area: d

.document__field--issue-date
  grid-area: e

  & input
    width: 100%
</style>