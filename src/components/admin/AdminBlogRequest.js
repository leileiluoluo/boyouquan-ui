import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCookie } from '../../utils/CookieUtil';
import Meta from '../common/Meta';
import AdminMenuHeader from './AdminMenuHeader';
import AdminBlogRequestTable from './AdminBlogRequestTable';
import RequestUtil from '../../utils/RequestUtil';
import AdminMenu from './AdminMenu';
import { ADMIN_LOGIN_ADDRESS } from '../../utils/PageAddressUtil';
import { redirectTo } from '../../utils/CommonUtil';

const getMeta = (name, description) => {
    return {
        title: `博客「${name}」审核详情 - 博友圈 · 博客人的朋友圈！`,
        keywords: name,
        description: description
    }
}

export default function AdminBlogRequest() {
    const [blogRequest, setBlogRequest] = useState({ 'posts': [] });

    const { id } = useParams();

    const fetchData = async (id) => {
        const resp = await RequestUtil.get(`https://www.boyouquan.com/api/blog-requests/${id}`);

        const respBody = await resp.json();

        setBlogRequest(respBody);
    };

    useEffect(() => {
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