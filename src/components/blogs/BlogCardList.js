import { useEffect, useState } from 'react';
import Pagination from '../pagination/Pagination';
import RequestUtil from '../../utils/APIRequestUtil';
import BlogCard from './BlogCard';
import { getURLParameter } from '../../utils/CommonUtil';

const getSortAndKeywordAndHighligts = () => {
    let sort = getURLParameter('sort') || 'collect_time';
    let keyword = getURLParameter('keyword') || '';
    let publishedAtHighlight = false;
    let accessCountHighlight = false;

    if ('collect_time' === sort) {
        publishedAtHighlight = true;
    } else {
        accessCountHighlight = true;
    }

    return { sort, keyword, publishedAtHighlight, accessCountHighlight };
}

export default function BlogCardList() {
    const { sort, keyword, publishedAtHighlight, accessCountHighlight } = getSortAndKeywordAndHighligts();

    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [total, setTotal] = useState(0);
    const [blogs, setBlogs] = useState([]);

    const fetchData = async (sortType, keyword, pageNo) => {
        const resp = await RequestUtil.get(`/api/blogs?sort=${sortType}&keyword=${keyword}&page=${pageNo}`);

        const respBody = await resp.json();
        setPageSize(respBody.pageSize);
        setTotal(respBody.total);
        setBlogs(respBody.results);
    };

    useEffect(() => {
        fetchData(sort, keyword, pageNo);
    }, [sort, keyword, pageNo]);

    const setCurrectPage = (pageNo) => {
        setPageNo(pageNo);

        document.getElementsByClassName('switch-sort-type')[0].scrollIntoView();
    }

    return (
        <>
            <div className="blog-container">
                {
                    blogs.map(
                        (blog, index) => (
                            <BlogCard
                                key={index}
                                blog={blog}
                                posts={blog.posts}
                                publishedAtHighlight={publishedAtHighlight}
                                accessCountHighlight={accessCountHighlight} />
                        ))
                }
            </div>
            <Pagination
                pageNo={pageNo}
                pageSize={pageSize}
                total={total}
                setCurrectPage={setCurrectPage} />
        </>
    )
}