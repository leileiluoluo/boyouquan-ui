import React, { useEffect, useState } from 'react';
import { Empty, Flex, Spin } from 'antd';
import { scrollToHash, clearHash } from '../../utils/ScrollUtil';
import PostCard from './PostCard';
import Pagination from '../pagination/Pagination';
import { getPosts } from '@services/postService';
import { PostData, PostDataList, PostDataListParams } from '@types/post';

interface PostCardListProps {
    sort: string,
    keyword: string,
    showPinned: boolean
}

const PostCardList: React.FC<PostCardListProps> = ({ sort, keyword, showPinned }: PostCardListProps) => {
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [total, setTotal] = useState(0);
    const [posts, setPosts] = useState<PostData[]>([]);
    const [dataReady, setDataReady] = useState(false);

    const fetchData = async (params: PostDataListParams) => {
        const resp: PostDataList = await getPosts(params);

        setDataReady(true);
        setPageSize(resp.pageSize);
        setTotal(resp.total);
        setPosts(resp.results);

        scrollToHash();
    };

    useEffect(() => {
        const params: PostDataListParams = { sortType: sort, keyword, pageNo };
        fetchData(params);
    }, [sort, keyword, pageNo]);

    const setCurrectPage = (pageNo) => {
        setPageNo(pageNo);
        clearHash();
        document.getElementById('switch-sort-type').scrollIntoView();
    }

    if (!dataReady) {
        return <Spin />
    }

    if (null !== keyword && '' !== keyword && 0 === total) {
        return (
            <Flex vertical gap={12}>
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
                        <PostCard key={index} showPinned={showPinned} post={post} descriptionRows={2} />
                    )
                )}
            </Flex>

            <Pagination
                pageNo={pageNo}
                pageSize={pageSize}
                total={total}
                setCurrectPage={setCurrectPage} />
        </Flex>
    );
};

export default PostCardList;