import { useState } from 'react';
import BlogRequestAddForm from './BlogRequestAddForm';
import RequestUtil from '../../utils/APIRequestUtil';
import { getURLParameter, redirectTo } from '../../utils/CommonUtil';
import { BLOG_REQUESTS_ADDRESS, BLOG_REQUEST_ADD_EMAIL_VERIFICATION_ADDRESS } from '../../utils/PageAddressUtil';
import { isEmailValid } from '../../utils/EmailUtil';

export default function BlogRequestAdd() {
    const adminEmail = getURLParameter('adminEmail');
    const emailVerificationCode = getURLParameter('emailVerificationCode');
    if (null === adminEmail
        || null === emailVerificationCode
        || !isEmailValid(adminEmail)) {
        redirectTo(BLOG_REQUEST_ADD_EMAIL_VERIFICATION_ADDRESS);
        return;
    }

    const [formData, setFormData] = useState({
        'adminEmail': adminEmail,
        'emailVerificationCode': emailVerificationCode
    });
    const [error, setError] = useState({});

    const postData = async (formData) => {
        const resp = await RequestUtil.post('/api/blog-requests',
            JSON.stringify(formData),
            { 'Content-Type': 'application/json' }
        );

        if (resp.status != 201) {
            const respBody = await resp.json();
            setError(respBody);
        } else {
            redirectTo(BLOG_REQUESTS_ADDRESS, 3);
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
        <BlogRequestAddForm
            formData={formData}
            error={error}
            handleChange={handleChange}
            handleSubmit={handleSubmit} />
    )
}