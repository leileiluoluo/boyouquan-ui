import React from 'react';
import { useEffect, useState } from 'react';
import { getCookie } from '../../utils/CookieUtil';
import { getURLParameter, redirectTo } from '../../utils/CommonUtil';
import RequestUtil from '../../utils/APIRequestUtil';
import AdminMenuHeader from './AdminMenuHeader';
import AdminMenu from './AdminMenu';
import AdminPostImageAddForm from './post-images/AdminPostImageAddForm';
import { ADMIN_LOGIN_ADDRESS, ADMIN_MONTHLY_SELECTED_ADDRESS } from '../../utils/PageAddressUtil';
import { FormError } from '../../types';

export default function AdminPostImageAdd(): React.JSX.Element {
    const link = getURLParameter('link') || '';

    const [postInfo, setPostInfo] = useState<Record<string, any>>({});
    const [postImages, setPostImages] = useState<any[]>([]);
    const [formData, setFormData] = useState<Record<string, string>>({ link: link });
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

        const resp = await RequestUtil.post('/api/admin/post-images', JSON.stringify(formDataParam), {
            'Content-Type': 'application/json',
            'username': username,
            'sessionId': sessionId
        });

        if (typeof resp === 'string' || resp.status !== 204) {
            if (typeof resp !== 'string') {
                const respBody = await resp.json();
                setError(respBody as FormError);
            }
        } else {
            redirectTo(ADMIN_MONTHLY_SELECTED_ADDRESS);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        let imageURL = formData['imageURL'];
        const customImageURL = formData['customImageURL'];
        if (customImageURL !== undefined) {
            imageURL = customImageURL;
        }

        if (imageURL === undefined) {
            setError({ code: 'image_not_selected', message: '您未选择任何图片，也未提供自定义图片地址！' });
            return;
        }

        const updatedFormData = { ...formData, imageURL: imageURL };
        postData(updatedFormData);
    };

    const fetchData = async (linkParam: string): Promise<void> => {
        if (!linkParam) return;
        
        const linkEncoded = encodeURIComponent(linkParam);
        const resp = await RequestUtil.get(`/api/posts/by-link?link=${linkEncoded}`);

        if (typeof resp === 'string') {
            return;
        }

        const respBody = await resp.json();
        if (resp.status === 200) {
            setPostInfo(respBody);
        }

        const resp2 = await RequestUtil.get(`/api/post-images/raw-images/by-link?link=${linkEncoded}`);
        if (typeof resp2 === 'string') {
            return;
        }

        const respBody2 = await resp2.json();
        if (resp2.status === 200) {
            setPostImages(respBody2);
        }
    };

    useEffect(() => {
        permissionCheck();
        fetchData(link);
    }, [link]);

    return (
        <>
            <AdminMenuHeader title='文章配图 - 管理页面' />
            <AdminMenu />
            <AdminPostImageAddForm
                postInfo={postInfo}
                postImages={postImages}
                formData={formData}
                error={error}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isAdminPage='true' />
        </>
    )
}