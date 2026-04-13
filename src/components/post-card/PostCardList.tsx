import React, { useEffect, useState } from 'react';
import { Flex } from 'antd';
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

    return (
        <Flex vertical gap={12}>
            <Flex vertical gap={8}>
                {posts.map(
                    (post, index) => (
                        <PostCard showPinned={showPinned} post={post} />
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