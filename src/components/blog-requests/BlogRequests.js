import { useEffect, useState } from 'react';
import RequestUtil from '../../utils/RequestUtil';
import BlogRequestsTable from './BlogRequestsTable';
import Pagination from '../pagination/Pagination';
import { getURLParameter } from '../../utils/CommonUtil';

export default function BlogRequests() {
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [total, setTotal] = useState(0);
    const [blogRequests, setBlogRequests] = useState([]);

    const fetchData = async (keyword, pageNo) => {
        const resp = await RequestUtil.get(`https://www.boyouquan.com/api/blog-requests?keyword=${keyword}&page=${pageNo}`);

        setPageSize(resp.pageSize);
        setTotal(resp.total);
        setBlogRequests(resp.results);
    };

    useEffect(() => {
        let keyword = getURLParameter('keyword') || '';

        fetchData(keyword, pageNo);
    }, [pageNo]);

    const setCurrectPage = (pageNo) => {
        setPageNo(pageNo);

        document.getElementsByClassName('blog-requests')[0].scrollIntoView();
    }

    return (
        <>
            <BlogRequestsTable requests={blogRequests} />
            <Pagination
                pageNo={pageNo}
                pageSize={pageSize}
                total={total}
                setCurrectPage={setCurrectPage} />
        </>
    )
}