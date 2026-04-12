import React from 'react';
import { useEffect, useState } from 'react';
import { Flex, Card, Skeleton, Typography, Empty } from 'antd';
import { scrollToHash, clearHash } from '../../utils/ScrollUtil';
import PostCard from './PostCard';
import Pagination from '../pagination/Pagination';
import RequestUtil from '../../utils/APIRequestUtil';

const { Text } = Typography;

export default function PostCardList({ sort, keyword, showPinned }) {
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [total, setTotal] = useState(0);
    const [posts, setPosts] = useState([]);
    const [dataReady, setDataReady] = useState(false);

    const fetchData = async (sortType, keyword, pageNo) => {
        const resp = await RequestUtil.get(`/api/posts?sort=${sortType}&keyword=${keyword}&page=${pageNo}`);

        const respBody = await resp.json();
        setDataReady(true);
        setPageSize(respBody.pageSize);
        setTotal(respBody.total);
        setPosts(respBody.results);

        scrollToHash();
    };

    useEffect(() => {
        fetchData(sort, keyword, pageNo);
    }, [sort, keyword, pageNo]);

    const setCurrectPage = (pageNo) => {
        setPageNo(pageNo);
        clearHash();
        document.getElementById('switch-sort-type').scrollIntoView();
    }

    if (!dataReady) {
        return (
            <Flex vertical gap={12}>
                <Flex vertical gap={8}>
                    {Array.from({ length: 10 }).map((_, i) => (
                        <Card key={i} style={{ width: '100%' }}>
                            <Flex vertical gap={4}>
                                <Skeleton.Input active size="small" style={{ width: 240 }} />
                                <Skeleton.Input active size="default" style={{ width: '100%' }} />
                                <Flex gap={4} align="center">
                                    <Skeleton.Avatar active size="small" />
                                    <Skeleton.Input active size="small" style={{ width: 80 }} />
                                    <Skeleton.Input active size="small" style={{ width: 50 }} />
                                    <Skeleton.Input active size="small" style={{ width: 50 }} />
                                    <Skeleton.Button active size="small" shape="circle" />
                                </Flex>
                            </Flex>
                        </Card>
                    ))}
                </Flex>

                <Pagination
                    pageNo={pageNo}
                    pageSize={pageSize}
                    total={total}
                    setCurrectPage={setCurrectPage} />
            </Flex>
        );
    }

    if (null !== keyword && '' !== keyword && 0 === total) {
        return (
            <Flex vertical>
                <Empty
                    description="未找到相关文章，试试更换关键词吧！"
                    style={{ marginTop: 40, marginBottom: 40 }}
                />
                <Pagination
                    pageNo={pageNo}
                    pageSize={pageSize}
                    total={total}
                    setCurrectPage={setCurrectPage} />
            </Flex>
        );
    }

    return (
        <Flex vertical gap={12}>
            <Flex vertical gap={8}>
                {posts.map(
                    (post, index) => (
                        <Card key={index} style={{ width: '100%' }}>
                            <PostCard
                                key={index}
                                showPinned={showPinned}
                                pinned={post.pinned}
                                blogDomainName={post.blogDomainName}
                                blogName={post.blogName}
                                blogStatusOk={post.blogStatusOk}
                                blogAdminMediumImageURL={post.blogAdminMediumImageURL}
                                link={post.link}
                                title={post.title}
                                description={post.description}
                                publishedAt={post.publishedAt}
                                linkAccessCount={post.linkAccessCount} />
                        </Card>
                    )
                )}
            </Flex>

            <Pagination
                pageNo={pageNo}
                pageSize={pageSize}
                total={total}
                setCurrectPage={setCurrectPage} />
        </Flex>
    )
}