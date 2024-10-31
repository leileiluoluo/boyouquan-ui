const request = async (url, method, data, headers) => {
    try {
        let response = null;
        if ('GET' === method) {
            response = await fetch(url, {
                headers: headers
            });
        } else {
            response = await fetch(url, {
                headers: headers,
                body: data
            });
        }

        if (null != response && !response.ok) {
            console.error('request error: ' + response.body);
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
    return '';
}

const RequestUtil = {
    get: (url, headers) => {
        return request(url, 'GET', null, headers);
    },
    post: (url, data, headers) => {
        return request(url, 'POST', data, headers);
    }
}

export default RequestUtil;