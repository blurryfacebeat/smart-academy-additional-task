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
    const fligthsResult = JSON.parse(localStorage.getItem('searchResult'));
    $info_results[0].innerHTML = fligthsResult.from;
    $info_results[1].innerHTML = fligthsResult.to;
    $info_results[2].innerHTML = fligthsResult.there;
    $info_results[3].innerHTML = fligthsResult.back;
    $info_results[4].innerHTML = fligthsResult.count;
} catch (error) {

}