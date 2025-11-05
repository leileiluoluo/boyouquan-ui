import React from 'react';
import { Fragment, Suspense, useEffect, useState, lazy } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';
import Meta from '../common/Meta';
import BlogDetailMain from './BlogDetailMain';
import BlogDetailSummary from './BlogDetailSummary';
import { redirectTo } from '../../utils/CommonUtil';
import { NOT_FOUND_ADDRESS } from '../../utils/PageAddressUtil';
import { Flex } from '@radix-ui/themes';

const BlogPerformance = lazy(() => import('./BlogPerformance'));
const BlogCharts = lazy(() => import('./BlogCharts'));
const FriendBlogs = lazy(() => import('./FriendBlogs'));
const RandomBlogs = lazy(() => import('./RandomBlogs'));
const BlogPosts = lazy(() => import('./BlogPosts'));

interface MetaData {
    title: string;
    keywords: string;
    description: string;
}

interface BlogDetailData {
    name?: string;
    description?: string;
    [key: string]: any;
}

const getMeta = (name: string | undefined, description: string | undefined): MetaData => {
    return {
        title: `${name || ''} - 博友圈 · 博客人的朋友圈！`,
        keywords: name || '',
        description: description || ''
    };
};

interface BlogDetailProps {
    domain: string;
}

export default function BlogDetail({ domain }: BlogDetailProps): React.JSX.Element {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [blogDetail, setBlogDetail] = useState<BlogDetailData>({});

    const fetchData = async (domainParam: string): Promise<void> => {
        const resp = await RequestUtil.get(`/api/blogs?domainName=${domainParam}`);

        if (typeof resp === 'string' || resp.status !== 200) {
            redirectTo(NOT_FOUND_ADDRESS);
            return;
        }
        
        const respBody = await resp.json();
        setBlogDetail(respBody as BlogDetailData);
        setLoaded(true);
    };

    useEffect(() => {
        fetchData(domain);
    }, [domain]);

    return (
        <>
            {loaded ?
                <Fragment>
                    <Meta meta={getMeta(blogDetail.name, blogDetail.description)} />
                    <Flex gap="2" direction="column">
                        <BlogDetailMain
                            name={blogDetail.name}
                            domainName={blogDetail.domainName}
                            address={blogDetail.address}
                            description={blogDetail.description}
                            statusOk={blogDetail.statusOk}
                            submittedInfo={blogDetail.submittedInfo}
                            submittedInfoTip={blogDetail.submittedInfoTip}
                            statusUnOkInfo={blogDetail.statusUnOkInfo}
                            blogAdminLargeImageURL={blogDetail.blogAdminLargeImageURL}
                            domainNameRegisteredAt={blogDetail.domainNameRegisteredAt}
                            blogServerLocation={blogDetail.blogServerLocation} />
                        <BlogDetailSummary
                            postCount={blogDetail.postCount}
                            accessCount={blogDetail.accessCount}
                            latestPublishedAt={blogDetail.latestPublishedAt}
                            collectedAt={blogDetail.collectedAt} />
                        <Suspense>
                            <BlogPerformance domainName={domain} collectedAt={blogDetail.collectedAt} />
                            <BlogCharts domain={domain} />
                            <BlogPosts domain={domain} rssAddress={blogDetail.rssAddress} blogStatusOk={blogDetail.statusOk} />
                            <FriendBlogs domain={domain} />
                            <RandomBlogs domain={domain} />
                        </Suspense>
                    </Flex>
                </Fragment> : ''
            }
        </>
    )
}