import { useState } from 'react';
import { setCookie } from '../../utils/CookieUtil';
import LoginForm from './LoginForm';
import RequestUtil from '../../utils/RequestUtil';
import { ADMIN_BLOG_REQUESTS_ADDRESS } from '../../utils/PageAddressUtil';
import { redirectTo } from '../../utils/CommonUtil';

export default function Login() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState({});

    const postData = async (formData) => {
        const resp = await RequestUtil.post('https://www.boyouquan.com/api/admin/login',
            JSON.stringify(formData),
            { 'Content-Type': 'application/json' }
        );

        const respBody = await resp.json();
        if (resp.status != 200) {
            setError(respBody);
        } else {
            setCookie('username', respBody.username);
            setCookie('sessionId', respBody.sessionId);

            redirectTo(ADMIN_BLOG_REQUESTS_ADDRESS, 3);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        postData(formData);
    };

    return (
        <LoginForm
            formData={formData}
            error={error}
            handleChange={handleChange}
            handleSubmit={handleSubmit} />
    )
}