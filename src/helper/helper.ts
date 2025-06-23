import * as bcrypt from 'bcrypt';

export function encrypt(data: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(data, salt);
}

export function compareHash(data1: string, data2: string) {
    return bcrypt.compareSync(data1, data2)
}

export function randString(length: number) {
    let result = '';
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charLength = char.length;
    let counter = 0;
    while (counter < length) {
        result += char.charAt(Math.floor(Math.random() * charLength));
        counter += 1;
    }
    return result;
}