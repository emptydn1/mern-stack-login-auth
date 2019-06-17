const validator = require('validator');

module.exports = function validateLogin(data) {
    let errors = {}

    // confirm login field 
    if (validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    }
    if (!validator.isEmail(data.email)) {
        errors.email = "email is invalid";
    }

    // confirm password field 
    if (validator.isEmpty(data.password)) {
        errors.password = "password is required";
    }
    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "password is invalid, it must between 6 and 30 characters";
    }

    return {
        errors,
        isVal: Object.keys(errors).length === 0
    };
}