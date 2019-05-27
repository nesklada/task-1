"use strict";

const config = {
    validation: {
        error: {
            selectorForWrapper: 'has-error',
            selectorForMessage: 'error-text',
        },
    },
}

function resetValidationError(formWrapper) {
    formWrapper.querySelectorAll('.form-group').forEach(fieldEl => {
        fieldEl.classList.remove('has-error')

        fieldEl.querySelectorAll('.error-text').forEach(errorEl => {
            errorEl.parentNode.removeChild(errorEl);
        }) 
    });
}

function validateField(fieldWrapper, val){

    if(val == "") {
        fieldWrapper.innerHTML += `<span class="${config.validation.error.selectorForMessage}">
                                        Required!
                                    </span>`;
    }

    if (isNaN(val)) {
        fieldWrapper.innerHTML +=  `<span class="${config.validation.error.selectorForMessage}">
                                        Only digits
                                    </span>`;
    }

    if(isNaN(val) || val == "") {
        fieldWrapper.classList.add(config.validation.error.selectorForWrapper);
        return false;
    }

}

function isValidForm(form) {
    let error = form.querySelectorAll('.form-group.' + config.validation.error.selectorForWrapper);
    
    if(error.length > 0) {
        return false
    }

    return true
}

document.querySelector('.js_sum').addEventListener('click', function(e) {
    e.preventDefault();

    let $self = this;
    let form = $self.closest('form');
    let fields = form.querySelectorAll('.form-control');

    resetValidationError(form);

    let result = 0;
    let arrElements = [];
    let elemOutput = document.querySelector('.js_sum-output');

    for(let i = 0, fieldsLength = fields.length; i < fieldsLength; i++) {
        let val = fields[i].value;
        let formGroup = fields[i].closest('.form-group');
        
        val = +val;
        
        if(validateField(formGroup, val) == false) {
            continue;
        }

        arrElements.push(val);
        result += +val;
    }

    if(!isValidForm(form)){
        elemOutput.innerHTML = '';
        return
    }

    arrElements.push(result);

    let stringResult = "";

    for(let i = 0; i < arrElements.length; i++) {
        let operator = "+";

        if(i == 0) {
            operator = "";
        }

        if( i == (arrElements.length - 1)) {
            operator = "=";
        }

        if( +arrElements[i] < 0 && i > 0 && i != (arrElements.length - 1)) {
            operator = "";
        }

        stringResult += operator + arrElements[i];
    }

    elemOutput.innerHTML = "Вывод: "+ stringResult;
});