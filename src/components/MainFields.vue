<template>
  <!-------------- Фамилия --------------->
  <div class="main">
    <div class="field main__field main__field--last-name">
      <label for="last-name">Фамилия</label>
      <input
        type="text"
        tabindex="1"
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
    <div class="field main__field main__field--first-name">
      <label for="first-name">Имя</label>
      <input
        type="text"
        tabindex="2"
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
    <div class="field main__field main__field--middle-name">
      <label for="middle-name">Отчество</label>
      <input
        type="text"
        tabindex="3"
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

    <div class="field main__field main__field--birthdate birthdate">
      <label class="birthDate">Дата рождения</label>
      <input
        type="date"
        tabindex="4"
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
    <div class="field main__field main__field--phone">
      <label for="phone">Номер телефона</label>
      <input
        type="tel"
        tabindex="8"
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
              tabindex="5"
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
              tabindex="6"
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
              tabindex="7"
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
    <div class="field main__field main__field--client-group">
      <label for="client-group">Группа клиентов</label>
      <select
        :class="$v.clientGroupSelected.$error ? 'field__input--invalid': ''"
        tabindex="10"
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
      <select
        tabindex="11"
        name="doctor"
        id="doctor"
        v-model="doctorSelected"
        @blur="$v.doctorSelected.$touch()"
      >
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
        <input
          type="checkbox"
          tabindex="9"
          name="dont-send-sms"
          id="dont-send-sms"
          v-model="dontSendSms"
        />
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

        let result = {
          component: "MainFields",
          valid: !this.$v.$error
        };

        this.$emit("check-result", result);
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

@media (min-width: 768px)
  .main
    grid-gap: 0 1.8rem
    grid-template-columns: repeat(6, 1fr)
    grid-template-rows: repeat(9, 42px)
    grid-template-areas: "a a b b c c" "a a b b c c" "d d e e e e"  "d d e e e e" "f f g g g g" "f f g g g g" "h h h i i i" "h h h . . ."  "h h h . . ."

  .gender-wrapper
    padding: 10px 0

  .gender-wrapper label
    margin-right: 10px

  .main__field--last-name
    order: 1
    grid-area: a

  .main__field--sms
    justify-content: center
    & label
      padding: 7px 0 0

.main__field--first-name
  grid-area: b

.main__field--middle-name
  grid-area: c

.main__field--birthdate
  grid-area: d

.birthdate__input
  width: 100%

.main__field--gender
  grid-area: e

.main__field--client-group
  grid-area: h

.main__field--sms
  grid-area: g

.main__field--phone
  grid-area: f

.main__field--doctor
  grid-area: i

@media (min-width: 540px) and (max-width: 767px)
  .main
    grid-gap: 0 1.6rem
    grid-template-columns: repeat(2, 1fr)
    grid-template-rows: repeat(10, 37px)
    grid-template-areas: "a b" "a b" "c d" "c d" "e f" "e f" "e g"  "h i" "h i" "h ."

  .main__field--gender
    & label
      display: block

  .main__field--sms
    & label
      padding: 3px 0 0

@media (max-width: 539px)
  .main
    grid-row-gap: 10px
    grid-template-areas: "a" "b" "c" "d" "e" "f" "g" "h" "h" "i"

  .gender-wrapper
    display: flex
    flex-direction: row
    justify-content: flex-start
    align-items: center

    & label
      margin-right: 10px

  .main__field--gender
    align-self: center

  .main__field--sms
    justify-content: center

    & label
      padding: 0

@media (max-width: 345px)
  .gender-wrapper

    & label
      margin-right: 0px
</style>