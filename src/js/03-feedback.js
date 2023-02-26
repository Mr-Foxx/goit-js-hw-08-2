import throttle from 'lodash.throttle';
// створюю ссилки на всю форму
const form = document.querySelector('.feedback-form');

//  імя ключа та обєкт для зберігання
const KEY = 'feedback-form-state';
let formData = {};

// вішаємо слухачів подій інпут та субміт на форму
form.addEventListener('input', throttle(onInputForm, 500));
form.addEventListener('submit', onFormSubmit);

onFormUpdate();
// функція збирає значення з обх полів та відправляє в локалсторедж
function onInputForm(evt) {
  formData[evt.target.name] = evt.target.value;
  const formDataJson = JSON.stringify(formData);
  localStorage.setItem(KEY, formDataJson);
}
// функція видаляє ключ з локалсторедж та очищує поля після відправлення
function onFormSubmit(evt) {
  evt.preventDefault();
  console.log('formData:', formData);
  form.reset();
  localStorage.removeItem(KEY);
  formData = {};
}
// функція розпасує ключ з локалсторедж. Яякщо є збережені дані заповнює ними поля, в іншому випадку поля повинні бути порожніми
function onFormUpdate() {
  let dataJson = localStorage.getItem(KEY);

  if (dataJson === null) {
    return;
  }

  if (dataJson) {
    dataJson = JSON.parse(dataJson);
    Object.entries(dataJson).forEach(([name, value]) => {
      form.elements[name].value = value;
    });
  }
}
