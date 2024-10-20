const moment = require('moment');

export default function formatDateStr(dateStr, useUnifiedFarmat) {
    useUnifiedFarmat = useUnifiedFarmat || false;

    const date = moment(dateStr, 'YYYY-MM-DD HH:mm:ss')
    if (useUnifiedFarmat) {
        return date.format('YYYY/MM/DD');
    }

    const past = date.unix();

    const halfAHour = 30 * 60;
    const oneHour = 60 * 60;
    const oneDay = 24 * oneHour;
    const tenDay = 10 * oneDay;

    const now = moment().unix();
    const timeDiff = now - past;
    if (timeDiff < halfAHour) {
        return '刚刚';
    } else if (timeDiff < oneHour) {
        return '半小时前';
    } else if (timeDiff < oneDay) {
        const hours = timeDiff / oneHour | 0;
        return hours + '小时前';
    } else if (timeDiff < tenDay) {
        const days = timeDiff / oneDay | 0;
        return days + '天前';
    }
    return date.format('YYYY/MM/DD');
}