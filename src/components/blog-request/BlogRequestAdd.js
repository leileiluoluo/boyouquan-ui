import { useState } from 'react';
import BlogRequestAddForm from './BlogRequestAddForm';
import RequestUtil from '../../utils/RequestUtil';
import { redirectTo } from '../../utils/CommonUtil';
import { BLOG_REQUESTS_ADDRESS } from '../../utils/PageAddressUtil';

export default function BlogRequestAdd() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState({});

    const postData = async (formData) => {
        const resp = await RequestUtil.post('https://www.boyouquan.com/api/blog-requests',
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