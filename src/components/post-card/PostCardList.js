import { useEffect, useState } from 'react';
import { scrollToHash, clearHash } from '../../utils/ScrollUtil';
import PostCard from './PostCard';
import Pagination from '../pagination/Pagination';
import RequestUtil from '../../utils/APIRequestUtil';
import { Box, Flex, Card, Skeleton } from '@radix-ui/themes';

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
            <Box>
                <Flex direction="column" gap="3">
                    <Box>
                        <Flex direction="column" gap="2">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Card>
                                    <Flex direction="column" gap="1">
                                        <Box>
                                            <Skeleton width="240px" height="20px" />
                                        </Box>
                                        <Box>
                                            <Skeleton width="100%" height="48px" />
                                        </Box>
                                        <Box>
                                            <Flex gap="1" align="center">
                                                <Skeleton width="20px" height="20px" />
                                                <Skeleton width="80px" height="20px" />
                                                <Skeleton width="50px" height="20px" />
                                                <Skeleton width="50px" height="20px" />
                                                <Skeleton width="20px" height="20px" />
                                            </Flex>
                                        </Box>
                                    </Flex>
                                </Card>
                            ))}
                        </Flex>
                    </Box>

                    <Box>
                        <Pagination
                            pageNo={pageNo}
                            pageSize={pageSize}
                            total={total}
                            setCurrectPage={setCurrectPage} />
                    </Box>
                </Flex>
            </Box >
        );
    }

    return (
        <Box>
            <Flex direction="column" gap="3">
                <Box>
                    <Flex direction="column" gap="2">
                        {posts.map(
                            (post, index) => (
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
                            )
                        )}
                    </Flex>
                </Box>

                <Box>
                    <Pagination
                        pageNo={pageNo}
                        pageSize={pageSize}
                        total={total}
                        setCurrectPage={setCurrectPage} />
                </Box>
            </Flex>
        </Box >
    )
}