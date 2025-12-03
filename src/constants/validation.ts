interface RegexPatterns {
    address: RegExp;
    password: {
        uppercase: RegExp;
        lowercase: RegExp;
        number: RegExp;
        specialChar: RegExp;
    };
}

export const REGEX: RegexPatterns = {
    address: /^[a-zA-Z0-9\\_\-\.]+$/,
    password: {
        uppercase: /[A-Z]/,
        lowercase: /[a-z]/,
        number: /\d/,
        specialChar: /[!@#$%^&*()_\-+=.,?<>]/
    }
};