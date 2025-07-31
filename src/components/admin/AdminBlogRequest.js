import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Meta from '../common/Meta';
import AdminMenuHeader from './AdminMenuHeader';
import AdminBlogRequestTable from './AdminBlogRequestTable';
import RequestUtil from '../../utils/APIRequestUtil';
import AdminMenu from './AdminMenu';

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
        const resp = await RequestUtil.get(`/api/blog-requests/${id}`);

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