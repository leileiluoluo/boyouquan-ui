import { useState } from 'react';
import BlogRequestAddForm from './BlogRequestAddForm';
import RequestUtil from '../../utils/RequestUtil';

export default function BlogRequestAdd() {
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState({});

    const postData = async (formData) => {
        const resp = await RequestUtil.post('https://www.boyouquan.com/api/blog-requests',
            JSON.stringify(formData),
            { 'Content-Type': 'application/json' }
        );

        if (resp.status == 'error') {
            setErrorMessage(resp.message);
        } else {
            setTimeout(function () {
                window.location.href = '/blog-requests';
            }, 3 * 1000);
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
            errorMessage={errorMessage}
            handleChange={handleChange}
            handleSubmit={handleSubmit} />
    )
}