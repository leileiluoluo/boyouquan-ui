type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';
type Headers = Record<string, string> | undefined;

const request = async (
    url: string,
    method: HttpMethod,
    data: string | null,
    headers: Headers
): Promise<Response | string> => {
    try {
        const finalURL = process.env.BOYOUQUAN_API_ADDRESS + url;

        let response: Response | null = null;
        if ('GET' === method) {
            response = await fetch(finalURL, {
                headers: headers
            });
        } else {
            if (null == data) {
                response = await fetch(finalURL, {
                    method: method,
                    headers: headers
                });
            } else {
                response = await fetch(finalURL, {
                    method: method,
                    headers: headers,
                    body: data
                });
            }
        }

        if (null != response && !response.ok) {
            console.error('request error: ' + finalURL);
        }
        return response || '';
    } catch (error) {
        console.error(error);
        return '';
    }
};

const RequestUtil = {
    get: (url: string, headers?: Headers): Promise<Response | string> => {
        return request(url, 'GET', null, headers);
    },
    post: (url: string, data: string, headers?: Headers): Promise<Response | string> => {
        return request(url, 'POST', data, headers);
    },
    patch: (url: string, data: string, headers?: Headers): Promise<Response | string> => {
        return request(url, 'PATCH', data, headers);
    },
    delete: (url: string, data: string, headers?: Headers): Promise<Response | string> => {
        return request(url, 'DELETE', data, headers);
    }
};

export default RequestUtil;

