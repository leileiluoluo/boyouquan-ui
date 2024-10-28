import { useEffect, useState } from 'react';
import { scrollToHash, clearHash } from '../../utils/ScrollUtil';
import PostCard from './PostCard';
import Pagination from '../pagination/Pagination';
import RequestUtil from '../../utils/RequestUtil';

export default function PostCardList({ sort, keyword, showPinned }) {
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [total, setTotal] = useState(0);
    const [posts, setPosts] = useState([]);

    const fetchData = async (sortType, keyword, page) => {
        const resp = await RequestUtil.get(`https://www.boyouquan.com/api/posts?sort=${sortType}&keyword=${keyword}&page=${page}`);

        setPageSize(resp.pageSize);
        setTotal(resp.total);
        setPosts(resp.results);
    };

    useEffect(() => {
        fetchData(sort, keyword, pageNo);

        scrollToHash();
    }, [sort, keyword, pageNo]);

    const setCurrectPage = (pageNo) => {
        setPageNo(pageNo);
        clearHash();
        document.getElementsByClassName('switch-sort-type')[0].scrollIntoView();
    }

    return (
        <>
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

            <Pagination
                pageNo={pageNo}
                pageSize={pageSize}
                total={total}
                setCurrectPage={setCurrectPage} />
        </>
    )
}