"use strict";

// Получаю данные из формы и обрабатываю их в JSON
try {
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
  });
} catch (error) {} // Добавляю маску к логину и регистрации


try {
  var setMask = function setMask(event) {
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
  };

  var $reg_phone_field = document.querySelector('.reg-phone');
  var $reg_passport = document.getElementById('doc-num');
  $reg_phone_field.addEventListener('input', setMask);
  $reg_phone_field.addEventListener('focus', setMask);
  $reg_phone_field.addEventListener('blur', setMask);
  $reg_passport.addEventListener('input', setMask);
  $reg_passport.addEventListener('focus', setMask);
  $reg_passport.addEventListener('blur', setMask);
} catch (error) {} // Работаю со страницей поиска


try {
  var $info_results = document.querySelectorAll('.info-result');
  var fligthsResult = JSON.parse(localStorage.getItem('searchResult'));
  $info_results[0].innerHTML = fligthsResult.from;
  $info_results[1].innerHTML = fligthsResult.to;
  $info_results[2].innerHTML = fligthsResult.there;
  $info_results[3].innerHTML = fligthsResult.back;
  $info_results[4].innerHTML = fligthsResult.count;
} catch (error) {}