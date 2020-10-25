"use strict";

// Получаю данные из формы и обрабатываю их в JSON
var $search_form = document.querySelector('.search-form__app');
var $search_inputs = document.querySelectorAll('.search-form__app input');
var searchResult = {
  from: '',
  to: '',
  there: '',
  back: '',
  count: ''
};
$search_form.addEventListener('submit', function (e) {
  searchResult.from = $search_inputs[0].value;
  searchResult.to = $search_inputs[1].value;
  searchResult.there = $search_inputs[2].value;
  searchResult.back = $search_inputs[3].value;
  searchResult.count = $search_inputs[4].value;
  delete localStorage.searchResult;
  localStorage.setItem('searchResult', JSON.stringify(searchResult));
}); // Добавляю маску к логину и регистрации

var $reg_phone_field = document.querySelector('.reg-phone');
$reg_phone_field.addEventListener('click', setMask);

function setMask(event) {
  var matrix = this.getAttribute('data-mask');
  matrix = matrix.replace(/9/g, '_');
  var i = 0;
  var def = matrix.replace(/\D/g, "");
  var val = this.value.replace(/\D/g, "");

  if (def.length >= val.length) {
    val = def;
  }

  this.value = matrix.replace(/./g, function (a) {
    return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
  });

  if (event.type == "blur") {
    if (this.value.length === 2) {
      this.value = "";
    }
  }
}