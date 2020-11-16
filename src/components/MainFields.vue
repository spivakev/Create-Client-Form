<template>
  <!-------------- Фамилия --------------->
  <div class="main">
    <div
      class="field main__field main__field--last-name"
      :class="$v.lastName.$error ? 'field--invalid': ''"
    >
      <label for="last-name">Фамилия</label>
      <input
        type="text"
        maxlength="50"
        :class="$v.lastName.$error ? 'field__input--invalid': ''"
        name="last-name"
        id="last-name"
        v-model.trim="lastName"
        @blur="$v.lastName.$touch()"
      />
      <p
        class="field__error"
        v-if="$v.lastName.$dirty && !$v.lastName.required"
      >Поле не должно быть пустым</p>
      <p
        class="field__error"
        v-if="$v.lastName.$dirty && !$v.lastName.maxLength"
      >Максимальная длина - 50 символов</p>
      <p
        class="field__error"
        v-if="$v.lastName.$dirty &&  $v.lastName.required && !$v.lastName.onlyValidSymbols"
      >Поле содержит недопустимые символы</p>
    </div>

    <!-------------- Имя --------------->
    <div
      class="field main__field main__field--first-name"
      :class="$v.firstName.$error ? 'field--invalid': ''"
    >
      <label for="first-name">Имя</label>
      <input
        type="text"
        maxlength="50"
        :class="$v.firstName.$error ? 'field__input--invalid': ''"
        name="first-name"
        id="first-name"
        v-model.trim="firstName"
        @blur="$v.firstName.$touch()"
      />
      <p
        class="field__error"
        v-if="$v.firstName.$dirty && !$v.firstName.required"
      >Поле не должно быть пустым</p>
      <p
        class="field__error"
        v-if="$v.firstName.$dirty && !$v.firstName.maxLength"
      >Максимальная длина - 50 символов</p>
      <p
        class="field__error"
        v-if="$v.firstName.$dirty &&  $v.firstName.required && !$v.firstName.onlyValidSymbols"
      >Поле содержит недопустимые символы</p>
    </div>

    <!-------------- Отчество --------------->
    <div
      class="field main__field main__field--middle-name"
      :class="$v.middleName.$error ? 'field--invalid': ''"
    >
      <label for="middle-name">Отчество</label>
      <input
        type="text"
        maxlength="50"
        :class="$v.middleName.$error ? 'field__input--invalid': ''"
        name="middle-name"
        id="middle-name"
        v-model.trim="middleName"
        @blur="$v.middleName.$touch()"
      />
      <p
        class="field__error"
        v-if="$v.middleName.$dirty && !$v.middleName.maxLength"
      >Максимальная длина - 50 символов</p>
      <p
        class="field__error"
        v-if="$v.middleName.$dirty && !$v.middleName.onlyValidSymbols"
      >Поле содержит недопустимые символы</p>
    </div>

    <!---------  Дата рождения -------->

    <div
      class="field main__field main__field--birthdate birthdate"
      :class="$v.birthDate.$error ? 'field--invalid': ''"
    >
      <label class="birthDate">Дата рождения</label>
      <input
        type="date"
        class="birthdate__input"
        :class="$v.birthDate.$error ? 'field__input--invalid': ''"
        v-model="birthDate"
        @blur="$v.birthDate.$touch()"
      />
      <p
        class="field__error"
        v-if="$v.birthDate.$dirty && !$v.birthDate.required"
      >Поле не должно быть пустым</p>
      <p
        class="field__error"
        v-if="$v.birthDate.$dirty && $v.birthDate.required && !$v.birthDate.isCorrectDate"
      >Выход за допустимый диапазон</p>
    </div>

    <!------ Номер телефона ---------->
    <div
      class="field main__field main__field--phone"
      :class="$v.phone.$error ? 'field--invalid': ''"
    >
      <label for="phone">Номер телефона</label>
      <input
        type="tel"
        placeholder="79998887766"
        maxlength="11"
        :class="$v.phone.$error ? 'field__input--invalid': ''"
        name="phone"
        id="phone"
        v-model="phone"
        @blur="$v.phone.$touch()"
      />
      <p
        class="field__error"
        v-if="$v.phone.$dirty && !$v.phone.required"
      >Поле не должно быть пустым</p>
      <p
        class="field__error"
        v-if="$v.phone.$dirty && $v.phone.required && !$v.phone.phoneValid"
      >Телефон не соответствует формату</p>
    </div>

    <!---------- Пол ----------------->
    <div class="field main__field main__field--gender">
      <label>
        Пол
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
    </div>

    <!-------- Группа клиентов -------->
    <div
      class="field main__field main__field--client-group"
      :class="$v.clientGroupSelected.$error ? 'field--invalid': ''"
    >
      <label for="client-group">Группа клиентов</label>
      <select
        :class="$v.clientGroupSelected.$error ? 'field__input--invalid': ''"
        name="client-group"
        id="client-group"
        size="3"
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
        class="field__error"
        v-if="$v.clientGroupSelected.$dirty && !$v.clientGroupSelected.required"
      >Выберите группу, к которой относится клиент</p>
    </div>
    <!-------- Лечащий врач ------------------>
    <div class="field main__field main__field--doctor">
      <label for="doctor">Лечащий врач</label>
      <select name="doctor" id="doctor" v-model="doctorSelected" @blur="$v.doctorSelected.$touch()">
        <option disabled value>Выберите врача</option>
        <option
          v-for="(doctor, index) in doctors"
          :value="doctor.value"
          :key="index"
        >{{doctor.label}}</option>
      </select>
    </div>
    <!-------- Не отправлять SMS --------------->
    <div class="field main__field main__field--sms">
      <label for="dont-send-sms">
        <input type="checkbox" name="dont-send-sms" id="dont-send-sms" v-model="dontSendSms" />
        Не отправлять СМС
      </label>
    </div>
  </div>
</template>


<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";

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


<style lang="sass" scoped>
@import "../styles/_variables.sass"
@import "../styles/_field.sass"

.main
  display: grid
  grid-gap: 0px 1.8rem
  grid-template-columns: repeat(6, 1fr)
  grid-template-rows: repeat(5, 85px)
  grid-template-areas: "a a b b c c" "d d e e e e" "f f g g g g" "h h h i i i" "h h h . . ."
  text-align: left

.main__field > label
  margin-bottom: 0.2rem

.main__field--last-name
  order: 1
  grid-area: a

.main__field--first-name
  order: 2
  grid-area: b

.main__field--middle-name
  order: 3
  grid-area: c

.main__field--birthdate
  order: 4
  grid-area: d

.birthdate__input
  width: 100%

.main__field--gender
  order: 5
  grid-area: e

.main__field--client-group
  order: 8
  grid-area: h

.main__field--sms
  order: 7
  grid-area: g
  justify-content: center

  & label
    padding: 27px 0 0

.main__field--phone
  order: 6
  grid-area: f

.main__field--doctor
  order: 9
  grid-area: i

.gender-wrapper
  padding: 10px 0

.gender-wrapper label
  margin-right: 10px
</style>