const request = async (url, method) => {
    try {
        if ('GET' === method) {
            const response = await fetch(url);
            if (!response.ok) {
                console.error('request error: ' + response.body);
            }
            return response.json();
        }
    } catch (error) {
        console.error(error);
    }
    return '';
}

const RequestUtil = {
    get: (url) => {
        return request(url, 'GET');
    }
}

export default RequestUtil;