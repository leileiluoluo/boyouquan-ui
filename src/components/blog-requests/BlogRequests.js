import { useEffect, useState } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';
import BlogRequestsTable from './BlogRequestsTable';
import Pagination from '../pagination/Pagination';
import { getURLParameter } from '../../utils/CommonUtil';

export default function BlogRequests() {
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [total, setTotal] = useState(0);
    const [blogRequests, setBlogRequests] = useState([]);

    const fetchData = async (keyword, pageNo) => {
        const resp = await RequestUtil.get(`/api/blog-requests?keyword=${keyword}&page=${pageNo}`);

        const respBody = await resp.json();
        setPageSize(respBody.pageSize);
        setTotal(respBody.total);
        setBlogRequests(respBody.results);
    };

    useEffect(() => {
        let keyword = getURLParameter('keyword') || '';

        fetchData(keyword, pageNo);
    }, [pageNo]);

    const setCurrectPage = (pageNo) => {
        setPageNo(pageNo);

        document.getElementById('blog-requests').scrollIntoView();
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