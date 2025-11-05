import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RequestUtil from '../../utils/APIRequestUtil';
import Meta from '../common/Meta';
import BlogRequestTable from './BlogRequestTable';
import { redirectTo } from '../../utils/CommonUtil';
import { NOT_FOUND_ADDRESS } from '../../utils/PageAddressUtil';
import { BlogRequestInfo } from '../../types';

interface MetaData {
    title: string;
    keywords: string;
    description: string;
}

const getMeta = (name: string | undefined, description: string | undefined): MetaData => {
    return {
        title: `博客「${name || ''}」审核详情 - 博友圈 · 博客人的朋友圈！`,
        keywords: name || '',
        description: description || ''
    };
};

interface BlogRequestData extends BlogRequestInfo {
    domainName?: string;
    address?: string;
    adminEmail?: string;
    requestedAt?: string;
    updatedAt?: string;
    approved?: boolean;
    failed?: boolean;
    statusInfo?: string;
    reason?: string;
}

export default function BlogRequest(): React.JSX.Element {
    const [blogRequest, setBlogRequest] = useState<BlogRequestData>({
        name: '',
        description: '',
        domain: '',
        email: '',
        posts: []
    });

    const { id } = useParams<{ id: string }>();

    const fetchData = async (idParam: string | undefined): Promise<void> => {
        if (!idParam) {
            redirectTo(NOT_FOUND_ADDRESS);
            return;
        }

        const resp = await RequestUtil.get(`/api/blog-requests/${idParam}`);

        if (typeof resp === 'string' || resp.status !== 200) {
            redirectTo(NOT_FOUND_ADDRESS);
        } else {
            const respBody = await resp.json();
            setBlogRequest(respBody as BlogRequestData);
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