<template>
  <!-------------- ФИО --------------->
  <div class="main-fields">
    <label for="last-name">Фамилия</label>
    <input
      type="text"
      maxlength="50"
      :class="$v.lastName.$error ? 'is-invalid': ''"
      name="last-name"
      id="last-name"
      v-model.trim="lastName"
      @blur="$v.lastName.$touch()"
    />
    <p class="error" v-if="$v.lastName.$dirty && !$v.lastName.required">Поле не должно быть пустым</p>
    <p
      class="error"
      v-if="$v.lastName.$dirty && !$v.lastName.maxLength"
    >Максимальная длина - 50 символов</p>
    <p
      class="error"
      v-if="$v.lastName.$dirty &&  $v.lastName.required && !$v.lastName.onlyValidSymbols"
    >Поле может содержать только буквы и следующие знаки: {{ validSymbols }}</p>
    <br />

    <label for="first-name">Имя</label>
    <input
      type="text"
      maxlength="50"
      :class="$v.firstName.$error ? 'is-invalid': ''"
      name="first-name"
      id="first-name"
      v-model.trim="firstName"
      @blur="$v.firstName.$touch()"
    />

    <p class="error" v-if="$v.firstName.$dirty && !$v.firstName.required">Поле не должно быть пустым</p>
    <p
      class="error"
      v-if="$v.firstName.$dirty && !$v.firstName.maxLength"
    >Максимальная длина - 50 символов</p>
    <p
      class="error"
      v-if="$v.firstName.$dirty &&  $v.firstName.required && !$v.firstName.onlyValidSymbols"
    >Поле может содержать только буквы и следующие знаки: {{ validSymbols }}</p>
    <br />

    <label for="middle-name">Отчество</label>
    <input
      type="text"
      maxlength="50"
      :class="$v.middleName.$error ? 'is-invalid': ''"
      name="middle-name"
      id="middle-name"
      v-model.trim="middleName"
      @blur="$v.middleName.$touch()"
    />
    <p
      class="error"
      v-if="$v.middleName.$dirty && !$v.middleName.maxLength"
    >Максимальная длина - 50 символов</p>
    <p
      class="error"
      v-if="$v.middleName.$dirty && !$v.middleName.onlyValidSymbols"
    >Поле может содержать только буквы и следующие знаки: {{ validSymbols }}</p>
    <br />

    <!---------  Дата рождения -------->

    <label class="birthDate">Дата рождения</label>

    <input
      type="date"
      :class="$v.birthDate$error ? 'is-invalid': ''"
      v-model="birthDate"
      @blur="$v.birthDate.$touch()"
    />
    <p class="error" v-if="$v.birthDate.$dirty && !$v.birthDate.required">Поле не должно быть пустым</p>
    <p
      class="error"
      v-if="$v.birthDate.$dirty && $v.birthDate.required && !$v.birthDate.isCorrectDate"
    >Выход за допустимый диапазон</p>

    <br />

    <!------ Номер телефона ---------->

    <label for="phone">Номер телефона</label>
    <input
      type="tel"
      placeholder="79998887766"
      maxlength="11"
      :class="$v.phone.$error ? 'is-invalid': ''"
      name="phone"
      id="phone"
      v-model="phone"
      @blur="$v.phone.$touch()"
    />
    <p class="error" v-if="$v.phone.$dirty && !$v.phone.required">Поле не должно быть пустым</p>
    <p
      class="error"
      v-if="$v.phone.$dirty && !$v.phone.phoneValid"
    >Номер телефона должен начинаться с 7 и содержать только цифры</p>
    <br />

    <!---------- Пол ----------------->
    <label>
      Пол
      <br />
      <div class="gender-wrapper">
        <label for="not-selected">
          <input
            type="radio"
            id="not-selected"
            name="gender"
            value="not-selected"
            v-model="gender"
            @blur="$v.gender.$touch()"
          />
          Не указан
        </label>

        <label for="male">
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            v-model="gender"
            @blur="$v.gender.$touch()"
          />
          Мужской
        </label>

        <label for="female">
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            v-model="gender"
            @blur="$v.gender.$touch()"
          />
          Женский
        </label>
      </div>
    </label>
    <br />

    <!-------- Группа клиентов -------->
    <label for="client-group">Группа клиентов</label>
    <select
      :class="$v.clientGroupSelected.$error ? 'is-invalid': ''"
      name="client-group"
      id="client-group"
      multiple
      v-model="clientGroupSelected"
      @blur="$v.clientGroupSelected.$touch()"
    >
      <option
        v-for="(group, index) in clientGroups"
        :value="group.value"
        :key="index"
      >{{group.label}}</option>
    </select>
    <p
      class="error"
      v-if="$v.clientGroupSelected.$dirty && !$v.clientGroupSelected.required"
    >Выберите группу, к которой относится клиент</p>
    <br />

    <!-------- Лечащий врач ------------------>

    <label for="doctor">Лечащий врач</label>
    <select name="doctor" id="doctor" v-model="doctorSelected" @blur="$v.doctorSelected.$touch()">
      <option disabled value>Выберите врача</option>
      <option v-for="(doctor, index) in doctors" :value="doctor.value" :key="index">{{doctor.label}}</option>
    </select>
    <br />

    <!-------- Не отправлять SMS --------------->

    <label for="dont-send-sms">
      <input type="checkbox" name="dont-send-sms" id="dont-send-sms" v-model="dontSendSms" />
      Не отправлять СМС
    </label>
    <br />
  </div>
</template>


<script>
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength
  //  minValue,
  //  maxValue
} from "vuelidate/lib/validators";

const isPhone = value => /^((7)+([0-9]){10})/.test(value); // проверяем, что номер начинается с 7, содержит только цифры (всего 11)

const validSymbols = value => {
  if (value) {
    console.log("Содержит недопустимые символы");
    return !/[\^,<#%&*:<>?/{|}+_%;"$!±§@~0-9]+/.test(value);
  } else return true;
};

export default {
  name: "MainFields",
  mixins: [validationMixin],
  props: {
    checkFields: Boolean
  },
  data: () => ({
    // информация, введенная пользователем

    lastName: null,
    firstName: null,
    middleName: null,
    birthDate: null,
    phone: null,
    gender: "not-selected",
    clientGroupSelected: [],
    doctorSelected: null,
    dontSendSms: false,

    validSymbols: "-,',`",

    clientGroups: [
      {
        label: "VIP",
        value: "vip"
      },
      {
        label: "Проблемные",
        value: "difficult-client"
      },
      {
        label: "ОМС",
        value: "oms"
      }
    ],

    doctors: [
      {
        label: "Иванов",
        value: "ivanov"
      },
      {
        label: "Захаров",
        value: "zakharov"
      },
      {
        label: "Чернышева",
        value: "chernysheva"
      }
    ]
  }),

  watch: {
    checkFields: function() {
      if (this.checkFields) {
        this.$v.$touch();
        let valid = !this.$v.$error;
        this.$emit("check-result", "MainFields", valid);
      }
    }
  },

  validations: {
    lastName: {
      required,
      maxLength: maxLength(50),
      onlyValidSymbols: validSymbols
    },
    firstName: {
      required,
      maxLength: maxLength(50),
      onlyValidSymbols: validSymbols
    },
    middleName: {
      maxLength: maxLength(50),
      onlyValidSymbols: validSymbols
    },
    birthDate: {
      required,
      isCorrectDate: inputDate => {
        let date = new Date(inputDate);
        return date > new Date(1900, 0, 1) && date < new Date();
      }
    },
    phone: {
      required,
      phoneValid: isPhone
    },
    clientGroupSelected: {
      required
    }
  }
};
</script>


<style scoped>
.main-fields {
  display: flex;
  flex-direction: column;
  text-align: left;
}
</style>