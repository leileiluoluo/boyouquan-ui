const request = async (url, method, headers) => {
    try {
        if ('GET' === method) {
            const response = await fetch(url, {
                headers: headers
            });
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
    get: (url, headers) => {
        return request(url, 'GET', headers);
    }
}

export default RequestUtil;