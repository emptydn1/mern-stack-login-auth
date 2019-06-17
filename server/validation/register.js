const validator = require('validator');

module.exports = function validateRegister(data) {
    let errors = {}

    // confirm login field 
    if (validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    }
    if (!validator.isEmail(data.email)) {
        errors.email = "email is invalid";
    }

    // confirm login field 
    if (validator.isEmpty(data.login)) {
        errors.login = "login is required";
    }
    if (!validator.isLength(data.login, { min: 6, max: 30 })) {
        errors.login = "login is invalid, it must between 6 and 30 characters";
    }

    // confirm password field 
    if (validator.isEmpty(data.password)) {
        errors.password = "password is required";
    }
    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "password is invalid, it must between 6 and 30 characters";
    }

    // confirm password2 field 
    if (validator.isEmpty(data.password2)) {
        errors.password2 = "confirm password is required";
    }

    // check the password and password2 is same or not
    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = "confirm password is wrong";
    }

    //isVal check keys of errors
    return {
        errors,
        isVal: Object.keys(errors).length === 0
    };
}