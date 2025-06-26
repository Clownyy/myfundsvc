export function getCurrentMonth(offset: number = 0) {
    const date = new Date();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = date.getMonth() + offset;
    return monthNames[month];
}

export function extractNumber(str: string) {
    return str.replace(/[^0-9]/g, '');
}