import { useState } from 'react';
import { setCookie } from '../../utils/CookieUtil';
import LoginForm from './LoginForm';
import RequestUtil from '../../utils/RequestUtil';
import { ADMIN_BLOG_REQUEST_ADDRESS } from '../../utils/PageAddressUtil';
import { redirectTo } from '../../utils/CommonUtil';

export default function Login() {
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState({});

    const postData = async (formData) => {
        const resp = await RequestUtil.post('https://www.boyouquan.com/api/admin/login',
            JSON.stringify(formData),
            { 'Content-Type': 'application/json' }
        );

        if (resp.status == 'error') {
            setErrorMessage(resp.message);
        } else {
            setCookie("sessionId", resp.result);

            redirectTo(ADMIN_BLOG_REQUEST_ADDRESS, 3);
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
            errorMessage={errorMessage}
            handleChange={handleChange}
            handleSubmit={handleSubmit} />
    )
}