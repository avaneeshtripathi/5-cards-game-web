export function getClassSet (classObject) {
    if(!underscore.isObject(classObject)) {
        return '';
    }
    return underscore.chain(classObject).map((flag, className) => {
        if(underscore.isString(className) && underscore.isBoolean(flag)) {
            return flag ? className : '';
        }
    }).compact().join(' ').value();
};
