// Получаю данные из формы и обрабатываю их в JSON
try {
    const $search_form = document.querySelector('.search-form__app');
    const $search_inputs = document.querySelectorAll('.search-form__app input');
    const searchResult = {
        from: '',
        to: '',
        there: '',
        back: '',
        count: ''
    };

    $search_form.addEventListener('submit', function(e) {
        searchResult.from = $search_inputs[0].value;
        searchResult.to = $search_inputs[1].value;
        searchResult.there = $search_inputs[2].value;
        searchResult.back = $search_inputs[3].value;
        searchResult.count = $search_inputs[4].value;

        delete localStorage.searchResult;
        localStorage.setItem('searchResult', JSON.stringify(searchResult));
    });
} catch (error) {
    
}

// Добавляю маску к логину и регистрации
try {
    const $reg_phone_field = document.querySelector('.reg-phone');
    const $reg_passport = document.getElementById('doc-num');
    $reg_phone_field.addEventListener('input', setMask);
    $reg_phone_field.addEventListener('focus', setMask);
    $reg_phone_field.addEventListener('blur', setMask);
    $reg_passport.addEventListener('input', setMask);
    $reg_passport.addEventListener('focus', setMask);
    $reg_passport.addEventListener('blur', setMask);

    function setMask(event) {
        let matrix = this.getAttribute('data-mask');
        matrix = matrix.replace(/9/g, '_');
        let i = 0;
        let def = matrix.replace(/\D/g, "");
        let val = this.value.replace(/\D/g, "");

        if (def.length >= val.length) {
            val = def;
        }
        
        this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
        });

        if (event.type == "blur") {
            if (this.value.length === 2) {
                this.value = "";
            }
        }
}
} catch (error) {

}

// Работаю со страницей поиска
try {
    const $info_results = document.querySelectorAll('.info-result');
    const $fligth_probability = document.querySelector('.fligth-probability');
    const fligthsResult = JSON.parse(localStorage.getItem('searchResult'));
    $info_results[0].innerHTML = fligthsResult.from;
    $info_results[1].innerHTML = fligthsResult.to;
    $info_results[2].innerHTML = fligthsResult.there;
    $info_results[3].innerHTML = fligthsResult.back;
    $info_results[4].innerHTML = fligthsResult.count;

    setProbability($fligth_probability);

    function setProbability(el) {
        const passengers = +el.getAttribute('data-passengers');
        let probability = '';
        if (passengers >= 30) {
            probability = '100%';
        } else if (passengers >= 25) {
            probability = '75%';
        } else if (passengers >= 15) {
            probability = '50%';
        } else if (passengers >= 10) {
            probability = '25%'
        } else {
            probability = 'Мало пассажиров для вылета';
        }
        el.innerHTML = probability;
    }
} catch (error) {

}

// Работаю со страницей выбора сидения
try {
    const $seats_wrapper = document.querySelector('.seats__wrapper');
    const $seats = document.querySelectorAll('.seats__item');

    $seats_wrapper.addEventListener('click', e => {
        const target = e.target;
        
        if (target.classList.contains('seats__item') && !target.classList.contains('seats__item_block') && !target.classList.contains('seats__item_busy')) {
            takeClear();
            target.classList.toggle('seats__item_take');
        }
    });

    function takeClear() {
        $seats.forEach(el => {
            el.classList.remove('seats__item_take');
        });
    }
} catch (error) {
    
}