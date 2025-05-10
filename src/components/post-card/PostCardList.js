import { useEffect, useState } from 'react';
import { scrollToHash, clearHash } from '../../utils/ScrollUtil';
import PostCard from './PostCard';
import Pagination from '../pagination/Pagination';
import RequestUtil from '../../utils/APIRequestUtil';
import { Box, Flex } from '@radix-ui/themes';

export default function PostCardList({ sort, keyword, showPinned }) {
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [total, setTotal] = useState(0);
    const [posts, setPosts] = useState([]);

    const fetchData = async (sortType, keyword, pageNo) => {
        const resp = await RequestUtil.get(`/api/posts?sort=${sortType}&keyword=${keyword}&page=${pageNo}`);

        const respBody = await resp.json();
        setPageSize(respBody.pageSize);
        setTotal(respBody.total);
        setPosts(respBody.results);
    };

    useEffect(() => {
        fetchData(sort, keyword, pageNo);

        scrollToHash();
    }, [sort, keyword, pageNo]);

    const setCurrectPage = (pageNo) => {
        setPageNo(pageNo);
        clearHash();
        document.getElementById('switch-sort-type').scrollIntoView();
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