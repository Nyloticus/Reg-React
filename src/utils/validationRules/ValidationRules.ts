export const validationRules = {
    email: new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
    mobile: new RegExp(/^(\+(?=2))?2?01(?![3-4])[0-5]{1}[0-9]{8}$/),
    telephoneMinMax: new RegExp(/^[0-9\b]{8,}$/),
    numbersOnly: new RegExp(/^[0-9\b]+$/),
    decimals: new RegExp(/^\d{0,8}(\.\d{1,10000000000000})?$/),
    decimalsWithSeparator: new RegExp(/^(\d+|\d{1,3}(,\d{3})*)(\.\d+)?$/),
    nationalId: new RegExp(/^[0-9]{10}$/),
    password: new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/
    ),
    noSpecialChars: /*new RegExp(/^[a-zA-Z0-9\u0600-\u06FF\s]+$/)*/ new RegExp(
        /^[\p{L}\d\s_:.,#+\-@()]+$/u
    ),
    allSpaces: new RegExp(/^\s+$/),
    // positive numbers only
    positive: new RegExp(/^[0-9]\d*$/),
    // max characters 250 characters
    max250: new RegExp(/^.{0,250}$/),
    // decimal with min 0 and max 100
    fees: new RegExp(/^(\d{1,2}(\.\d{1,2})?|100)$/),
};
