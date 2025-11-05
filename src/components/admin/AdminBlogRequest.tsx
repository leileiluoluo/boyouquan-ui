import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Meta from '../common/Meta';
import AdminMenuHeader from './AdminMenuHeader';
import AdminBlogRequestTable from './AdminBlogRequestTable';
import RequestUtil from '../../utils/APIRequestUtil';
import AdminMenu from './AdminMenu';
import { ADMIN_LOGIN_ADDRESS } from '../../utils/PageAddressUtil';
import { getCookie } from '../../utils/CookieUtil';
import { redirectTo } from '../../utils/CommonUtil';
import { BlogRequestInfo } from '../../types';

interface MetaData {
    title: string;
    keywords: string;
    description: string;
}

const getMeta = (name: string, description: string): MetaData => {
    return {
        title: `博客「${name}」审核详情 - 博友圈 · 博客人的朋友圈！`,
        keywords: name,
        description: description
    };
};

export default function AdminBlogRequest(): React.JSX.Element {
    const [blogRequest, setBlogRequest] = useState<BlogRequestInfo>({ 
        name: '',
        description: '',
        domain: '',
        posts: []
    });

    const { id } = useParams<{ id: string }>();

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

    const fetchData = async (idParam: string | undefined): Promise<void> => {
        if (!idParam) return;
        
        const resp = await RequestUtil.get(`/api/blog-requests/${idParam}`);

        if (typeof resp === 'string') {
            return;
        }

        const respBody = await resp.json();
        setBlogRequest(respBody as BlogRequestInfo);
    };

    useEffect(() => {
        permissionCheck();
        fetchData(id);
    }, [id]);

    return (
        <>
            <Meta meta={getMeta(blogRequest.name, blogRequest.description)} />
            <AdminMenuHeader title={`博客「${blogRequest.name}」审核详情`} />
            <AdminMenu />
            <AdminBlogRequestTable blogRequest={blogRequest} />
        </>
    )
}