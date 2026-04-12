import React, { useEffect, useState } from 'react';
import { Flex, Card } from 'antd';
import { scrollToHash, clearHash } from '../../utils/ScrollUtil';
import PostCard from './PostCard';
import Pagination from '../pagination/Pagination';
import RequestUtil from '../../utils/APIRequestUtil';
import SinglePostCard from './SinglePostCard';

interface PostCardListProps {
    sort: string,
    keyword: string,
    showPinned: boolean
}

const PostCardList: React.FC<PostCardListProps> = ({ sort, keyword, showPinned }: PostCardListProps) => {
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

    return (
        <Flex vertical gap={12}>
            <Flex vertical gap={8}>
                {posts.map(
                    (post, index) => (
                        <SinglePostCard post={post}/>
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