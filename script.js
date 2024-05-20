$(document).ready(() => {
    //----------------------------------Variables----------------------------------------//
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    const customRadio = document.querySelectorAll('.custom-radio');
    const checkedIcon = document.querySelectorAll('.radio-checked');
    const sections = document.querySelectorAll('.form-section');
    const submit = document.querySelector('button[type="submit"]');
    const checkbox = sections[5].querySelector('input[type="checkbox"]');
    const customCheckbox = sections[5].querySelector('.custom-checkbox');
    const successMessage = document.querySelector('.success-message');

    //-----------------------------------Functions----------------------------------------//

    const nameFieldCheck = () => {
        const nameInputFields = document.querySelector('.name-flex').querySelectorAll('input[type="text"]');
        const errors = document.querySelector('.name-flex').querySelectorAll('.error');
        let isValid = true;

        nameInputFields.forEach((field, index) => {
            if (field.value === '') {
                errors[index].style.display = 'block';
                isValid = false;
            } else {
                errors[index].style.display = 'none';
            }
        });

        return isValid;
    }

    const validateEmail = () => {
        const emailField = sections[2].querySelector('input[type="email"]');
        const error = sections[2].querySelector('.error');
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        const test = re.test(String(emailField.value).toLowerCase());

        test? error.style.display = 'none' : error.style.display = 'block';

        return test;
    }

    const radioBtnCheck = () => {
        const radioBtns = document.querySelectorAll('input[type="radio"]');
        const radioError = sections[3].querySelector('.error');
        let isChecked = false;

        for (const radioButton of radioBtns) {
            if (radioButton.checked) {
                isChecked = true;
                break; 
            }
        }
    
        if (!isChecked) {
            radioError.style.display = 'block';
        } else {
            radioError.style.display = 'none';
        }
       
        return isChecked;
    }

    const textAreaCheck = () => {
        const textArea = sections[4].querySelector('textarea');
        const error = sections[4].querySelector('.error');

        if (textArea.value === '') {
            error.style.display = 'block';
            return false;
        } else {
            error.style.display = 'none';
            return true;
        }
    };

    const toggleCheckbox = () => {
        const checkedIcon = sections[5].querySelector('.checkbox-checked');

        if (checkbox.checked) {
            checkbox.checked = false;
            checkedIcon.classList.remove('active');
        } else {
            checkbox.checked = true;
            checkedIcon.classList.add('active');
        }
    }

    const checkBox = () => {
        const error = sections[5].querySelector('.error');
        const checkedIcon = sections[5].querySelector('.checkbox-checked');

        if (checkbox.checked) {
            error.style.display = 'none';
            checkedIcon.classList.add('active');
            return true;
        } else {
            error.style.display = 'block';
            checkedIcon.classList.remove('active');
            return false;
        }
    }

    const checkAll = () => {
        const nameValid = nameFieldCheck();
        const emailValid = validateEmail();
        const radioValid = radioBtnCheck();
        const textAreaValid = textAreaCheck();
        const checkboxValid = checkBox();

        return nameValid && emailValid && radioValid && textAreaValid && checkboxValid;
    }

    //----------------------------------------Event Listeners----------------------------------------//
    radioButtons.forEach((button, i) => {
        button.addEventListener('click', () => {
            checkedIcon.forEach(icon => {
                icon.classList.remove('active');
            })         
            checkedIcon[i].classList.toggle('active');
        })
    })

    customRadio.forEach((button, i) => {
        button.addEventListener('click', () => {
            checkedIcon.forEach(icon => {
                icon.classList.remove('active');
            })         
            checkedIcon[i].classList.toggle('active');
            radioButtons[i].checked = true;
        })
    })

    submit.addEventListener('click', (e) => {
        e.preventDefault();
        const allValid = checkAll();
        if (allValid) {
            successMessage.style.transform = 'translateX(-50%) translateY(0)';
            successMessage.style.opacity = '1';
            setTimeout(() => {
                successMessage.style.transform = 'translateX(-50%) translateY(-100%)';
                successMessage.style.opacity = '0';
            }, 2000)
        } else {
            successMessage.style.display = 'none';
        }
    })

    customCheckbox.addEventListener('click', toggleCheckbox)
    checkbox.addEventListener('change', checkBox)
});

