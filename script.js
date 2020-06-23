const signupForm = document.querySelector('#signup-form');

signupForm.setAttribute('novalidate', true);

signupForm.addEventListener('submit', (e) => {
    const inputFields = document.querySelectorAll('.form-control-input');
    
    let hasErrors = false;

    for(field of inputFields){
        const validityState = getValidityState(field);

        if(!validityState.valid){
            hasErrors = true;
            showError(field, validityState.error);
        }else{
            hideError(field);
        }
    }

    if(hasErrors){
        e.preventDefault();
        return;
    }

    console.log('Form submitted');
})

signupForm.addEventListener('blur', (e) => {

    const validityState = getValidityState(e.target);

    if(!validityState.valid){
        showError(e.target, validityState.error);
        return;
    }

    hideError(e.target);

}, true);

function hideError(field){
    const fieldId = field.getAttribute('id');
    const errorElem = document.querySelector(`#error-${fieldId}`);
    
    if(errorElem){
        errorElem.remove();
    }

    field.classList.remove('invalid');
    field.classList.add('valid');
   
}

function getValidityState(field){
    const validity = field.validity;

    if(validity.valid){
        return {
            valid: true,
            error: null
        }
    }

    const fieldName = field.getAttribute('title');

    if(validity.valueMissing){
        return{
            valid: false,
            error: `${fieldName} cannot be empty`
        }
    }

    if(validity.typeMismatch){
        return{
            valid: false,
            error: `Looks like this is not an ${fieldName.toLowerCase()}`
        }
    }

}

function showError(field, errorMsg){
    const fieldId = field.getAttribute('id');

    let errorElem = document.querySelector(`#error-${fieldId}`);

    if(!errorElem){
        errorElem = document.createElement('strong');
        errorElem.setAttribute('id', `error-${fieldId}`);
        errorElem.classList.add('error-message');
        errorElem.innerHTML = errorMsg;

        field.parentElement.append(errorElem);
        field.classList.add('invalid');
        field.classList.remove('valid');
    }else{
        errorElem.innerHTML = errorMsg;
    }
}