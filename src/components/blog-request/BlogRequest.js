import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RequestUtil from '../../utils/APIRequestUtil';
import Meta from '../common/Meta';
import BlogRequestTable from './BlogRequestTable';
import { redirectTo } from '../../utils/CommonUtil';
import { NOT_FOUND_ADDRESS } from '../../utils/PageAddressUtil';

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
        const resp = await RequestUtil.get(`/api/blog-requests/${id}`);

        if (resp.status != 200) {
            redirectTo(NOT_FOUND_ADDRESS);
        } else {
            const respBody = await resp.json();
            setBlogRequest(respBody);
        }
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
                domainName={blogRequest.domainName}
                address={blogRequest.address}
                rssAddress={blogRequest.rssAddress}
                adminEmail={blogRequest.adminEmail}
                requestedAt={blogRequest.requestedAt}
                updatedAt={blogRequest.updatedAt}
                approved={blogRequest.approved}
                failed={blogRequest.failed}
                status={blogRequest.status}
                statusInfo={blogRequest.statusInfo}
                reason={blogRequest.reason} />
        </>
    )
}