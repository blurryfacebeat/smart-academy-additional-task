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
  var setProbability = function setProbability(el) {
    var passengers = +el.getAttribute('data-passengers');
    var probability = '';

    if (passengers >= 30) {
      probability = '100%';
    } else if (passengers >= 25) {
      probability = '75%';
    } else if (passengers >= 15) {
      probability = '50%';
    } else if (passengers >= 10) {
      probability = '25%';
    } else {
      probability = 'Мало пассажиров для вылета';
    }

    el.innerHTML = probability;
  };

  var $info_results = document.querySelectorAll('.info-result');
  var $fligth_probability = document.querySelector('.fligth-probability');
  var fligthsResult = JSON.parse(localStorage.getItem('searchResult'));
  $info_results[0].innerHTML = fligthsResult.from;
  $info_results[1].innerHTML = fligthsResult.to;
  $info_results[2].innerHTML = fligthsResult.there;
  $info_results[3].innerHTML = fligthsResult.back;
  $info_results[4].innerHTML = fligthsResult.count;
  setProbability($fligth_probability);
} catch (error) {} // Работаю со страницей выбора сидения


try {
  var takeClear = function takeClear() {
    $seats.forEach(function (el) {
      el.classList.remove('seats__item_take');
    });
  };

  var $seats_wrapper = document.querySelector('.seats__wrapper');
  var $seats = document.querySelectorAll('.seats__item');
  $seats_wrapper.addEventListener('click', function (e) {
    var target = e.target;

    if (target.classList.contains('seats__item') && !target.classList.contains('seats__item_block') && !target.classList.contains('seats__item_busy')) {
      takeClear();
      target.classList.toggle('seats__item_take');
    }
  });
} catch (error) {}