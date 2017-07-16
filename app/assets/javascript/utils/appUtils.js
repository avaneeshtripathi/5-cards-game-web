const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function dateFormatter (date) {
    let newDate = new Date(date);
    return monthList[newDate.getMonth()] + ' ' + newDate.getDate() + ', ' + newDate.getFullYear();
};
