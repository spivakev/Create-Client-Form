<template>
  <form class="form" @submit.prevent="checkForm">
    <div class="form__section section">
      <!-------------- ФИО --------------->
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

      <!---------  Дата рождения -------->

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
     
      </label>
      <br />

      <!------ Номер телефона ---------->

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

      <!-------- Группа клиентов -------->
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

      <!-------- Лечащий врач ------------------>

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

      <!-------- Не отправлять SMS --------------->

      <label for="dont-send-sms">
        <input type="checkbox" name="dont-send-sms" id="dont-send-sms" v-model="form.dontSendSms" />
        Не отправлять СМС
      </label>
      <br />
    </div>

    <!------------ Адрес ------------------>
    <br />
    <div class="form__section section">
      <label>Индекс</label>
      <input
        type="number"
        :class="$v.form.cityIndex.$error ? 'is-invalid': ''"
        v-model.number="form.cityIndex"
      />
      <p
        class="error"
        v-if="$v.form.clientGroupSelected.$dirty && !$v.form.cityIndex.integer"
      >Некорректное значение</p>
      <p
        class="error"
        v-if="$v.form.clientGroupSelected.$dirty && (!$v.form.cityIndex.minlength || !$v.form.cityIndex.maxlength)"
      >Индекс должен содержать 6 цифр</p>
      <br />

      <label>Страна</label>
      <input
        type="text"
        :class="$v.form.country.$error ? 'is-invalid' :''"
        v-model="form.country"
      />
      <p
        class="error"
        v-if="$v.form.country.$dirty && !$v.form.country.maxlength"
      >Максимальная длина - 50 символов</p>
      <br />

      <label>Область</label>
      <input
        type="text"
        :class="$v.form.region.$error ? 'is-invalid' :''"
        v-model="form.region"
      />
      <p
        class="error"
        v-if="$v.form.region.$dirty && !$v.form.region.maxlength"
      >Максимальная длина - 50 символов</p>
      <br />

      <label>Город</label>
      <input type="text" :class="$v.form.city.$error ? 'is-invalid': ''" v-model="form.city" />
      <p
        class="error"
        v-if="$v.form.city.$dirty && !$v.form.city.required"
      >Поле не должно быть пустым</p>
      <p
        class="error"
        v-if="$v.form.city.$dirty && !$v.form.city.maxlength"
      >Максимальная длина - 50 символов</p>
      <br />

      <label>Улица</label>
      <input type="text" :class="$v.form.street.$error ? 'is-invalid': ''" v-model="form.street" />
      <p
        class="error"
        v-if="$v.form.street.$dirty && !$v.form.street.maxlength"
      >Максимальная длина - 60 символов</p>
      <br />
 
      <label>Дом</label>
      <input type="number" v-model="form.houseNumber" />
      <p
        class="error"
        v-if="$v.form.houseNumber.$dirty && !$v.form.houseNumber.maxlength"
      >Максимальная длина - 10 символов</p>
      <br />
    </div>

    <!------------- Паспортные данные ------------------>
   <br />
  
    <div class="form__section section">
      <label>Тип документа</label>
      <select :class="$v.form.documentType.$error ? 'is-invalid': ''" v-model="form.documentType">
        <option
          v-for="(type, index) in documentTypes"
          :value="type.value"
          :key="index"
        >{{type.label}}</option>
      </select>
      <p
        class="error"
        v-if="$v.form.documentType.$dirty && !$v.form.documentType.required"
      >Поле не должно быть пустым</p>
      <br />

      <label>Серия</label>
      <input
        type="text"
        :class="$v.form.documentSeries.$error ? 'is-invalid': ''"
        v-model="form.documentSeries"
      />
      <p
        class="error"
        v-if="$v.form.documentSeries.$dirty && (!$v.form.documentSeries.minLength || !$v.form.documentSeries.maxLength)"
      >Поле должно содержать от 4 до 7 символов</p>
      <br />

      <label>Номер</label>
      <input
        type="number"
        :class="$v.form.documentNumber.$error ? 'is-invalid': ''"
        v-model.number="form.documentNumber"
      />
      <p
        class="error"
        v-if="$v.form.documentNumber.$dirty && (!$v.form.documentNumber.minLength || !$v.form.documentNumber.maxLength)"
      >Поле должно содержать 6 символов</p>
      <br />
     
      <label>Кем выдан</label>
      <input type="text" :class="$v.form.documentNumber.$error ? 'is-invalid': ''" v-model="form.issuedBy" />
      <br />

      <label>Дата выдачи</label>
      <input
        type="date"
        :class="$v.form.issueDate.$error ? 'is-invalid': ''"
        v-model="form.issueDate"
      />
      <p
        class="error"
        v-if="$v.form.issueDate.$dirty && !$v.form.issueDate.required"
      >Поле не должно быть пустым</p>
      <p
        class="error"
        v-if="$v.form.issueDate.$dirty && $v.form.issueDate.required && (!$v.form.issueDate.minValue || !$v.form.issueDate.maхValue)"
      >Выход за допустимый диапазон</p>
      <br />
    </div>
    <button class="btn" type="submit">Coxpaнить</button>
  </form>
</template>



<script>
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  between,
  minValue,
  maxValue,
  integer
} from "vuelidate/lib/validators";

const isPhone = value => /^((7)+([0-9]){10})/.test(value); // проверяем, что номер начинается с 7, содержит только цифры (всего 11)

let monthLengthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //количество дней для каждого месяца в году (по умолчанию - не високосном)

const validDayNumber = function() {
  let day = this.form.birthDay;
  let month = this.form.birthMonth;
  let year = this.form.birthYear;

  // если год високосный, то в феврале 29 дней
  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
    this.isLeapYear = true; //високосный
    monthLengthArr[1] = 29;
  } else {
    this.isLeapYear = false; //не високосный
  }

  this.monthLength = monthLengthArr[month - 1]; //количество дней в месяце, который ввел пользователь

  return /*day > 0 && */ day <= this.monthLength;
};

export default {
  name: "CreateClientForm",
  mixins: [validationMixin],
  data: () => ({
    // информация, введенная пользователем
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
      dontSendSms: false,

      cityIndex: null,
      country: null,
      region: null,
      city: null,
      street: null,
      houseNumber: null,

      documentType: null,
      documentSeries: null,
      documentNumber: null,
      issuedBy: null,
      issueDate: null
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
    ],

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
        between: between(1900, 2020)
      },
      phone: {
        required,
        phoneValid: isPhone
      },
      clientGroupSelected: {
        required
      },
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
        //доработать валидацию
        minLength: minLength(4),
        maxLength: maxLength(7)
      },
      documentNumber: {
        integer,
        minLength: minLength(6),
        maxLength: maxLength(6)
      },
      issuedBy: {
        maxLength: maxLength(70)
      },
      issueDate: {
        required,
        minValue: minValue(new Date(1990, 0, 1)),
        maxValue: maxValue(new Date())
      }
    }
  },
  methods: {
    checkForm() {
      this.$v.form.$touch();
      if (this.$v.form.$error) {
        console.log("Form is invalid!");
        return;
      } else console.log("Submit happend!");
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