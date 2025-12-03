import {REGEX} from "@/constants/validation.js";
import {PASSWORD_RULES} from "@/constants/rules";

type validationResponseType = string | null;

export const validateName = (name:string | null): validationResponseType  => {
    if(!name) return 'Name is required';
    if(name.length < 2) return 'Name must be at least 2 characters'
    return null
};

export const validateSurname = (surname:string | null):validationResponseType  => {
    if(!surname) return 'Surname is required';
    if(surname.length < 2) return 'surname must be at least 2 characters'
    return null
}

export const validateBirthDate = (birthDate: string | null): validationResponseType => {
    if (!birthDate) return 'Birth date is required';

    const birth = new Date(birthDate);
    const today = new Date();

    // check if date is invalid
    if (isNaN(birth.getTime())) return 'Invalid date format';

    // calculate age
    const age = today.getFullYear() - birth.getFullYear();
    const hasBirthdayPassed =
        today.getMonth() > birth.getMonth() ||
        (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
    const finalAge = hasBirthdayPassed ? age : age - 1;

    if (finalAge < 18 || finalAge > 80)
        return 'You must be older than 18 and younger than 80';

    return null;
};


export const validateAddress = (address:string | null):validationResponseType => {
    if(!address) return 'Your address is required';
    // if(!REGEX.address.test(address)) {
    //     return 'Address is invalid';
    // }
    return null
}

export const validateEmail = (email:string | null):validationResponseType => !email ?  "Email is required" : null

export const validatePassword = (password:string | null):validationResponseType => {
    if(!password) return 'Password is required';
    for(const rule of PASSWORD_RULES) {
        if(!rule.regex.test(password)) return rule.message
    }
    return null
}