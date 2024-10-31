import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RequestUtil from '../../utils/RequestUtil';
import Meta from '../common/Meta';
import BlogRequestTable from './BlogRequestTable';

const getMeta = (name, description) => {
    return {
        title: `博客「${name}」审核详情 - 博友圈 · 博客人的朋友圈！`,
        keywords: name,
        description: description
    }
}

export default function BlogRequest() {
    const [blogRequest, setBlogRequest] = useState({});

    const { id } = useParams();

    const fetchData = async (id) => {
        const resp = await RequestUtil.get(`https://www.boyouquan.com/api/blog-requests/${id}`);
        setBlogRequest(resp);
    };

    useEffect(() => {
        fetchData(id);
    }, [id]);

    return (
        <>
            <Meta meta={getMeta(blogRequest.name, blogRequest.description)} />
            <BlogRequestTable
                name={blogRequest.name}
                description={blogRequest.description}
                rssAddress={blogRequest.rssAddress}
                adminEmail={blogRequest.adminEmail}
                requestedAt={blogRequest.requestedAt}
                statusInfo={blogRequest.statusInfo} />
        </>
    )
}