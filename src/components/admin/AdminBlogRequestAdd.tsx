import React from 'react';
import { useEffect, useState } from 'react';
import BlogRequestAddForm from '../blog-request/BlogRequestAddForm';
import { getCookie } from '../../utils/CookieUtil';
import { redirectTo } from '../../utils/CommonUtil';
import { ADMIN_BLOG_REQUESTS_ADDRESS, ADMIN_LOGIN_ADDRESS } from '../../utils/PageAddressUtil';
import RequestUtil from '../../utils/APIRequestUtil';
import AdminMenuHeader from './AdminMenuHeader';
import AdminMenu from './AdminMenu';
import { FormError } from '../../types';

export default function AdminBlogRequestAdd(): React.JSX.Element {
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [error, setError] = useState<FormError>({});

    const permissionCheck = async (): Promise<void> => {
        const username = getCookie('username');
        const sessionId = getCookie('sessionId');
        
        if (!username || !sessionId) {
            redirectTo(ADMIN_LOGIN_ADDRESS);
            return;
        }

        const permissionCheckResp = await RequestUtil.get(`/api/admin/permission-check`, {
            'username': username,
            'sessionId': sessionId,
        });

        if (typeof permissionCheckResp === 'string' || permissionCheckResp.status !== 200) {
            redirectTo(ADMIN_LOGIN_ADDRESS);
        }
    };

    const postData = async (formDataParam: Record<string, string>): Promise<void> => {
        const username = getCookie('username');
        const sessionId = getCookie('sessionId');
        
        if (!username || !sessionId) {
            redirectTo(ADMIN_LOGIN_ADDRESS);
            return;
        }

        const resp = await RequestUtil.post('/api/admin/blog-requests', JSON.stringify(formDataParam), {
            'Content-Type': 'application/json',
            'username': username,
            'sessionId': sessionId
        });

        if (typeof resp === 'string' || resp.status !== 201) {
            if (typeof resp !== 'string') {
                const respBody = await resp.json();
                setError(respBody as FormError);
            }
        } else {
            redirectTo(ADMIN_BLOG_REQUESTS_ADDRESS);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
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

    useEffect(() => {
        permissionCheck();
    }, []);

    return (
        <>
            <AdminMenuHeader title='提交博客 - 管理页面' />
            <AdminMenu />
            <BlogRequestAddForm
                formData={formData}
                error={error}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isAdminPage='true' />
        </>
    )
}