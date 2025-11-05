export function stringToSixDigitNumber(str: string): string {
    // 简单哈希函数
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0; // 转为 32 位整数
    }
    // 保证正数
    hash = Math.abs(hash);
    // 取 6 位
    const number = hash % 1000000;
    // 补零
    return number.toString().padStart(6, '0');
}

