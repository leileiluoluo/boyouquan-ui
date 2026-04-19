import React from 'react';
import { useState } from 'react';
import BlogRequestAddForm from './BlogRequestAddForm';
import RequestUtil from '../../utils/APIRequestUtil';
import { getURLParameter, redirectTo } from '../../utils/CommonUtil';
import { BLOG_REQUESTS_ADDRESS, BLOG_REQUEST_ADD_EMAIL_VERIFICATION_ADDRESS } from '../../utils/PageAddressUtil';
import { isEmailValid } from '../../utils/EmailUtil';
import { FormError } from '../../types';

export default function BlogRequestAdd(): React.JSX.Element {
    const adminEmail = getURLParameter('adminEmail');
    const emailVerificationCode = getURLParameter('emailVerificationCode');
    if (null === adminEmail
        || null === emailVerificationCode
        || !isEmailValid(adminEmail)) {
        redirectTo(BLOG_REQUEST_ADD_EMAIL_VERIFICATION_ADDRESS);
        return <></>;
    }

    const [formData, setFormData] = useState<Record<string, string>>({
        'adminEmail': adminEmail,
        'emailVerificationCode': emailVerificationCode,
        'promise': ''
    });
    const [error, setError] = useState<FormError>({});

    const postData = async (formDataParam: Record<string, any>): Promise<void> => {
        const resp = await RequestUtil.post('/api/blog-requests',
            JSON.stringify(formDataParam),
            { 'Content-Type': 'application/json' }
        );

        if (typeof resp === 'string' || resp.status !== 201) {
            if (typeof resp !== 'string') {
                const respBody = await resp.json();
                setError(respBody as FormError);
            }
        } else {
            redirectTo(BLOG_REQUESTS_ADDRESS, 3);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // ✅ 正确写法（AntD Form onFinish 传递的是表单值，无需 preventDefault）
    const handleSubmit = (values: Record<string, string>): void => {
        const promise = values.promise || formData.promise;

        if (!promise) {
            setError({ code: 'promise_not_selected', message: '您未做出个人承诺' });
            return;
        }

        // 用最新的表单值提交
        postData({ ...formData, ...values });
    };

    return (
        <BlogRequestAddForm
            formData={formData}
            error={error}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isAdminPage={false} />
    );
}