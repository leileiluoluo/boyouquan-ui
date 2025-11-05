import React from 'react';
import { useState } from 'react';
import { setCookie } from '../../utils/CookieUtil';
import LoginForm from './LoginForm';
import RequestUtil from '../../utils/APIRequestUtil';
import { ADMIN_BLOG_REQUESTS_ADDRESS } from '../../utils/PageAddressUtil';
import { redirectTo } from '../../utils/CommonUtil';
import { LoginResponse, FormError } from '../../types';

export default function Login(): React.JSX.Element {
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [error, setError] = useState<FormError>({});

    const postData = async (formDataParam: Record<string, string>): Promise<void> => {
        const resp = await RequestUtil.post('/api/admin/login',
            JSON.stringify(formDataParam),
            { 'Content-Type': 'application/json' }
        );

        if (typeof resp === 'string') {
            return;
        }

        const respBody = await resp.json();
        if (resp.status !== 200) {
            setError(respBody as FormError);
        } else {
            const loginResp = respBody as LoginResponse;
            setCookie('username', loginResp.username);
            setCookie('sessionId', loginResp.sessionId);

            redirectTo(ADMIN_BLOG_REQUESTS_ADDRESS, 3);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
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