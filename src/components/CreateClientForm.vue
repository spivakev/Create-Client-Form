<template>
  <form>
    <div class="container">
      <label for="last-name">Фамилия</label>
      <input type="text" name="last-name" id="last-name" required />
      <br />

      <label for="first-name">Имя</label>
      <input type="text" name="first-name" id="first-name" required />
      <br />

      <label for="middle-name">Отчество</label>
      <input type="text" name="middle-name" id="middle-name" />
      <br />

      <label for="birthdate">Дата рождения</label>
      <input type="datetime" name="birthdate" id="birthdate" required />
      <br />

      <label for="phone">Телефон</label>
      <input type="tel" name="phone" id="phone" required />
      <br />

      <div class="gender-wrapper">
        <label for="not-selected">
          <input type="radio" id="not-selected" name="gender" value="not-selected" />
          Не указан
        </label>

        <label for="male">
          <input type="radio" id="male" name="gender" value="male" />
          Мужской
        </label>

        <label for="male">
          <input type="radio" id="female" name="gender" value="female" />
          Женский
        </label>
      </div>
      <br />

      <label for="client-group">Группа клиентов</label>
      <select name="client-group" id="client-group" v-model="selected" multiple required>
        <option disabled value>Выберите группу клиентов</option>
        <option value="vip">VIP</option>
        <option value="difficult-client">Проблемный клиент</option>
        <option value="oms">ОМС</option>
      </select>
      <br />

      <label for="doctor">Лечащий врач</label>
      <select name="doctor" id="doctor" v-model="selected">
        <option disabled value>Выберите врача</option>
        <option value="ivanov">Иванов</option>
        <option value="zakharov">Захаров</option>
        <option value="chernysheva">Чернышева</option>
      </select>
      <br />

      <label for="dont-send-sms">
        <input type="checkbox" name="dont-send-sms" id="dont-send-sms" v-model="checked" />
        Не отправлять СМС
      </label>
      <br />
      <button class="btn" type="submit">Coxpaнить</button>
    </div>
  </form>
</template>



<script>
export default {};
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
input[type="datetime"],
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
</style>