import { useState } from 'react';
import BlogRequestAddForm from '../blog-request/BlogRequestAddForm';
import { getCookie } from '../../utils/CookieUtil';
import { redirectTo } from '../../utils/CommonUtil';
import { ADMIN_BLOG_REQUESTS_ADDRESS } from '../../utils/PageAddressUtil';
import RequestUtil from '../../utils/RequestUtil';
import AdminMenuHeader from './AdminMenuHeader';
import AdminMenu from './AdminMenu';

export default function AdminBlogRequestAdd() {
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState({});

    const postData = async (formData) => {
        const resp = await RequestUtil.post('https://www.boyouquan.com/api/admin/blog-requests/add', JSON.stringify(formData), {
            'Content-Type': 'application/json',
            'sessionId': getCookie('sessionId')
        });

        const respBody = await resp.json();

        if (respBody.status == 'error') {
            setErrorMessage(respBody.message);
        } else {
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
        <>
            <AdminMenuHeader title='提交博客 - 管理页面' />
            <AdminMenu />
            <BlogRequestAddForm
                formData={formData}
                errorMessage={errorMessage}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isAdminPage='true' />
        </>
    )
}