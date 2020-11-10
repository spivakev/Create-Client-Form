<template>
  <form @submit.prevent="checkForm">
    <div class="container">
      <label for="last-name">Фамилия</label>
      <input
        type="text"
        :class="$v.form.lastName.$error ? 'is-invalid': ''"
        name="last-name"
        id="last-name"
        v-model.trim="form.lastName"
      />
      <p
        class="error"
        v-if="$v.form.lastName.$dirty && !$v.form.lastName.required"
      >Поле не должно быть пустым</p>
      <p
        class="error"
        v-if="$v.form.lastName.$dirty && !$v.form.lastName.maxLength"
      >Максимальная длина - 50 символов</p>
      <br />

      <label for="first-name">Имя</label>
      <input
        type="text"
        :class="$v.form.firstName.$error ? 'is-invalid': ''"
        name="first-name"
        id="first-name"
        v-model.trim="form.firstName"
      />

      <p
        class="error"
        v-if="$v.form.firstName.$dirty && !$v.form.firstName.required"
      >Поле не должно быть пустым</p>
      <p
        class="error"
        v-if="$v.form.firstName.$dirty && !$v.form.firstName.maxLength"
      >Максимальная длина - 50 символов</p>
      <br />

      <label for="middle-name">Отчество</label>
      <input
        type="text"
        :class="$v.form.middleName.$error ? 'is-invalid': ''"
        name="middle-name"
        id="middle-name"
        v-model.trim="form.middleName"
      />
      <p
        class="error"
        v-if="$v.form.middleName.$dirty && !$v.form.middleName.maxLength"
      >Максимальная длина - 50 символов</p>
      <br />

      <label class="birth">
        Дата рождения
        <br />
        <label>
          День
          <input
            class="birth__day"
            :class="$v.form.birthDay.$error && $v.form.birthMonth.between && $v.form.birthYear.between  ? 'is-invalid': ''"
            type="text"
            name="birth-day"
            id="birth-day"
            v-model.number="form.birthDay"
          />
        </label>

        <label>
          Месяц
          <input
            class="birth__month"
            :class="$v.form.birthMonth.$error ? 'is-invalid': ''"
            type="text"
            name="birth-month"
            id="birth-month"
            v-model.number="form.birthMonth"
          />
        </label>

        <label>
          Год
          <input
            class="birth__year"
            :class="$v.form.birthYear.$error ? 'is-invalid': ''"
            type="text"
            name="birth-year"
            id="birth-year"
            v-model.number="form.birthYear"
          />
        </label>
        <p
          class="error"
          v-if="$v.form.birthDay.$dirty && $v.form.birthMonth.$dirty && $v.form.birthYear.$dirty && !$v.form.birthDay.validDayNumber && $v.form.birthMonth.between"
        >Количество дней в указанном месяце {{ monthLength }}</p>

        <p
          class="error"
          v-if="$v.form.birthDay.$dirty && $v.form.birthMonth.$dirty && $v.form.birthYear.$dirty && !$v.form.birthDay.minValue"
        >Значение поля "День" не должно быть меньше 1</p>

        <p
          class="error"
          v-if="$v.form.birthDay.$dirty && $v.form.birthMonth.$dirty && $v.form.birthYear.$dirty && !$v.form.birthMonth.between"
        >Значение поля "Месяц" должно быть в интервале от 1 до 12</p>

        <p
          class="error"
          v-if="$v.form.birthDay.$dirty && $v.form.birthMonth.$dirty && $v.form.birthYear.$dirty && !$v.form.birthYear.between"
        >Значение поля "Год" должно быть в интервале от 1900 до 2020</p>

        <p
          class="error"
          v-if="$v.form.birthDay.$dirty && $v.form.birthMonth.$dirty && $v.form.birthYear.$dirty && !($v.form.birthDay.required || $v.form.birthMonth.required || $v.form.birthYear.required )"
        >Поле не должно быть пустым</p>
        <br />

        <br />
      </label>
      <br />

      <label for="phone">Номер телефона</label>
      <input
        type="tel"
        :class="$v.form.phone.$error ? 'is-invalid': ''"
        name="phone"
        id="phone"
        v-model="form.phone"
      />
      <p
        class="error"
        v-if="$v.form.phone.$dirty && !$v.form.phone.required"
      >Поле не должно быть пустым</p>
      <p
        class="error"
        v-if="$v.form.phone.$dirty && !$v.form.phone.phoneValid"
      >Номер телефона должен начинаться с 7 и содержать только цифры</p>
      <br />

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
              v-model="form.gender"
            />
            Не указан
          </label>

          <label for="male">
            <input type="radio" id="male" name="gender" value="male" v-model="form.gender" />
            Мужской
          </label>

          <label for="female">
            <input type="radio" id="female" name="gender" value="female" v-model="form.gender" />
            Женский
          </label>
        </div>
      </label>
      <br />

      <label for="client-group">Группа клиентов</label>
      <select
        :class="$v.form.clientGroupSelected.$error ? 'is-invalid': ''"
        name="client-group"
        id="client-group"
        multiple
        v-model="form.clientGroupSelected"
      >
        <option
          v-for="(group, index) in clientGroups"
          :value="group.value"
          :key="index"
        >{{group.label}}</option>
      </select>
      <p
        class="error"
        v-if="$v.form.clientGroupSelected.$dirty && !$v.form.clientGroupSelected.required"
      >Выберите группу, к которой относится клиент</p>
      <br />

      <label for="doctor">Лечащий врач</label>
      <select name="doctor" id="doctor" v-model="form.doctorSelected">
        <option disabled value>Выберите врача</option>
        <option
          v-for="(doctor, index) in doctors"
          :value="doctor.value"
          :key="index"
        >{{doctor.label}}</option>
      </select>
      <br />

      <label for="dont-send-sms">
        <input type="checkbox" name="dont-send-sms" id="dont-send-sms" v-model="form.dontSendSms" />
        Не отправлять СМС
      </label>
      <br />
      <button class="btn" type="submit">Coxpaнить</button>
    </div>
  </form>
</template>



<script>
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  between,
  minValue
} from "vuelidate/lib/validators";

const isPhone = value => /^((7)+([0-9]){10})/.test(value);
let monthLengthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const validDayNumber = function() {
  let day = this.form.birthDay;
  let month = this.form.birthMonth;
  let year = this.form.birthYear;

  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
    this.isLeapYear = true;
    monthLengthArr[1] = 29;
  } else {
    this.isLeapYear = false;
  }

  this.monthLength = monthLengthArr[month - 1];
  console.log("День", day);
  console.log("Месяц", month);
  console.log("Год", year);
  console.log("Дней в месяце", this.monthLength);

  console.log("Високосный", this.isLeapYear);

  console.log("Валидатор вернет : ", day > 0 && day <= this.monthLength);

  return /*day > 0 && */ day <= this.monthLength;
};

export default {
  mixins: [validationMixin],
  data: () => ({
    form: {
      lastName: null,
      firstName: null,
      middleName: null,
      birthDay: null,
      birthMonth: null,
      birthYear: null,
      phone: null,
      gender: "not-selected",
      clientGroupSelected: [],
      doctorSelected: null,
      dontSendSms: false
    },

    isLeapYear: false,
    monthLength: null,

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
  validations: {
    form: {
      lastName: {
        required,
        maxLength: maxLength(50)
      },
      firstName: {
        required,
        maxLength: maxLength(50)
      },
      middleName: {
        maxLength: maxLength(50)
      },
      birthDay: {
        required,
        minValue: minValue(1),
        //maxLength: maxLength(2),
        validDayNumber
      },
      birthMonth: {
        required,
        //maxLength: maxLength(2),
        between: between(1, 12)
      },
      birthYear: {
        required,
        //maxLength: maxLength(4),
        between: between(1900, 2020)
      },
      phone: {
        required,
        phoneValid: isPhone
      },
      clientGroupSelected: {
        required
      }
    }
  },

  methods: {
    checkForm() {
      this.$v.form.$touch();
      if (this.$v.form.$error) {
        console.log("Invalid!");
        return;
      } else console.log("Submit happend!");
    }
  }
};
</script>


<style scoped>
form {
  width: 700px;
  margin: 0 auto;
}

.container {
  display: flex;
  flex-direction: column;
  text-align: left;
}

input[type="text"],
input[type="tel"],
select {
  padding: 5px 10px;
}

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