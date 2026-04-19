import { useEffect, useState } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';
import BlogRequestsTable from './BlogRequestsTable';
import Pagination from '../pagination/Pagination';
import { getURLParameter } from '../../utils/CommonUtil';
import { Flex, Table, Typography, Skeleton, Empty, Spin } from 'antd';

const { Text } = Typography;

export default function BlogRequests() {
    const [keyword, setKeyword] = useState('');
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [total, setTotal] = useState(0);
    const [blogRequests, setBlogRequests] = useState([]);
    const [dataReady, setDataReady] = useState(false);

    const fetchData = async (keyword, pageNo) => {
        const resp = await RequestUtil.get(`/api/blog-requests?keyword=${keyword}&page=${pageNo}`);

        const respBody = await resp.json();
        setDataReady(true);
        setPageSize(respBody.pageSize);
        setTotal(respBody.total);
        setBlogRequests(respBody.results);
    };

    useEffect(() => {
        let keyword = getURLParameter('keyword') || '';
        setKeyword(keyword);

        fetchData(keyword, pageNo);
    }, [pageNo]);

    const setCurrectPage = (pageNo) => {
        setPageNo(pageNo);

        document.getElementById('blog-requests').scrollIntoView();
    }

    if (!dataReady) {
        return <Spin />
    }

    if (null !== keyword && '' !== keyword && 0 === total) {
        return (
            <div id="blog-requests">
                <Flex vertical gap={12}>
                    <Empty
                        description="未找到相关的博客收录申请，试试更换关键词吧！"
                        style={{ marginTop: 40, marginBottom: 40 }}
                    />
                    <Pagination
                        pageNo={pageNo}
                        pageSize={pageSize}
                        total={total}
                        setCurrectPage={setCurrectPage} />
                </Flex>
            </div>
        );
    }

    return (
        <div id="blog-requests">
            <Flex vertical gap={12}>
                <BlogRequestsTable requests={blogRequests} />
                <Pagination
                    pageNo={pageNo}
                    pageSize={pageSize}
                    total={total}
                    setCurrectPage={setCurrectPage} />
            </Flex>
        </div>
    )
}