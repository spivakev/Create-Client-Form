<template>
  <div class="passport">
    <!------------ Тип документа ------------------>
    <label>Тип документа</label>
    <select
      :class="$v.documentType.$error ? 'is-invalid': ''"
      v-model="documentType"
      @blur="$v.documentType.$touch()"
    >
      <option v-for="(type, index) in documentTypes" :value="type.value" :key="index">{{type.label}}</option>
    </select>
    <p
      class="error"
      v-if="$v.documentType.$dirty && !$v.documentType.required"
    >Укажите тип документа, удостоверяющего личность</p>
    <br />

    <!------------ Серия ------------------>
    <label>Серия</label>
    <input
      type="text"
      maxlength="13"
      :class="$v.documentSeries.$error ? 'is-invalid': ''"
      v-model="documentSeries"
      @blur="$v.documentSeries.$touch()"
    />
    <p
      class="error"
      v-if="$v.documentSeries.$dirty && (!$v.documentSeries.minLength)"
    >Поле должно содержать хотя бы 4 символа</p>
    <p
      class="error"
      v-if="$v.documentSeries.$dirty &&  ($v.documentSeries.minLength) && !$v.documentSeries.validSeries"
    >Значение должно соответствовать формату: "{{seriesFormats[documentType]}}"</p>
    <br />

    <!------------ Номер ------------------>
    <label>Номер</label>
    <input
      type="number"
      maxlength="6"
      :class="$v.documentNumber.$error ? 'is-invalid': ''"
      v-model.number="documentNumber"
      @blur="$v.documentNumber.$touch()"
    />

    <p
      class="error"
      v-if="$v.documentNumber.$dirty && !$v.documentNumber.validNumber"
    >Поле должно содержать ровно 6 цифр</p>
    <br />

    <!------------ Кем выдан ------------------>
    <label>Кем выдан</label>
    <input
      type="text"
      maxlength="200"
      :class="$v.documentNumber.$error ? 'is-invalid': ''"
      v-model="issuedBy"
      @blur="$v.issuedBy.$touch()"
    />
    <p
      class="error"
      v-if="$v.issuedBy.$dirty && !$v.issuedBy.maxLength"
    >Максимальная длина - 200 символов</p>
    <br />

    <!------------ Дата выдачи ------------------>
    <label>Дата выдачи</label>
    <input
      type="date"
      :class="$v.issueDate.$error ? 'is-invalid': ''"
      v-model="issueDate"
      @blur="$v.issueDate.$touch()"
    />
    <p
      class="error"
      v-if="$v.issueDate.$dirty && !$v.issueDate.required"
    >Укажите дату выдачи документа</p>
    <p
      class="error"
      v-if="$v.issueDate.$dirty && $v.issueDate.required && !$v.issueDate.isCorrectDate"
    >Выход за допустимый диапазон</p>
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

//проверка серии свидетельства о рождении
const isBirthSertificateSeries = val => /^[IVXLCDM]{1,10}[-][А-Я]{2}$/.test(val); //или {0, 10}?

//проверка серии паспорта / водительского удостоверения
const isSeries = val => /^[0-9]{4}$/.test(val);

const isDocumentNumber = val => (val ? /^[0-9]{6}$/.test(val) : true); //Проверка номера документа. Проверяем только если значение введено

const isDocumentSeries = function(val) {
  if (val) {
    let type = this.documentType;

    if (type == "birthСertificate") {
      return isBirthSertificateSeries(val);
    } else {
      return isSeries(val);
    }
  } else return true; // не валидируем, если значение не введено
};

export default {
  name: "PassportFields",
  mixins: [validationMixin],
  props: {
    checkFields: Boolean
  },
  data: () => ({
    documentType: "passport",
    documentSeries: null,
    documentNumber: null,
    issuedBy: null,
    issueDate: null,

    seriesFormats: {
      passport: "4444",
      driversLicense: "4444",
      birthСertificate: "III-АМ"
    },

    documentTypes: [
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
        this.$emit("check-result", "PassportFields", valid);
      }
    }
  },

  validations: {
    cityIndex: {
      integer,
      minLength: minLength(6),
      maxLength: maxLength(6)
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
      maxLength: maxLength(10)
    },
    documentType: {
      required
    },
    documentSeries: {
      minLength: minLength(4),
      // maxLength: maxLength(13),
      validSeries: isDocumentSeries
    },
    documentNumber: {
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


<style scoped>
.passport {
  display: flex;
  flex-direction: column;
  text-align: left;
}
</style>