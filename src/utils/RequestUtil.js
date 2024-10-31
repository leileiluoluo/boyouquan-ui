const request = async (url, method, data, headers) => {
    try {
        let response = null;
        if ('GET' === method) {
            response = await fetch(url, {
                headers: headers
            });
        } else {
            if (null == data) {
                response = await fetch(url, {
                    method: method,
                    headers: headers
                });
            } else {
                response = await fetch(url, {
                    method: method,
                    headers: headers,
                    body: data
                });
            }
        }

        if (null != response && !response.ok) {
            console.error('request error: ' + url);
        }
        return response;
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
    },
    patch: (url, data, headers) => {
        return request(url, 'PATCH', data, headers);
    },
    delete: (url, data, headers) => {
        return request(url, 'DELETE', data, headers);
    }
}

export default RequestUtil;