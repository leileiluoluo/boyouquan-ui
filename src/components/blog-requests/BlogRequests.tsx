import { useEffect, useState } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';
import BlogRequestsTable from './BlogRequestsTable';
import Pagination from '../pagination/Pagination';
import { getURLParameter } from '../../utils/CommonUtil';
import { Flex, Empty, Spin } from 'antd';

export default function BlogRequests() {
    const statuses = getURLParameter('statuses') || '';
    
    // 从 URL 读取 keyword 和 page 参数
    const getKeywordFromURL = () => {
        return getURLParameter('keyword') || '';
    };
    
    const getPageFromURL = () => {
        const params = new URLSearchParams(window.location.search);
        const page = params.get('page');
        return page ? parseInt(page) : 1;
    };

    const [keyword, setKeyword] = useState(getKeywordFromURL);
    const [pageNo, setPageNo] = useState(getPageFromURL);
    const [pageSize, setPageSize] = useState(0);
    const [total, setTotal] = useState(0);
    const [blogRequests, setBlogRequests] = useState([]);
    const [dataReady, setDataReady] = useState(false);

    const fetchData = async (keywordValue, pageNoValue) => {
        setDataReady(false);
        const resp = await RequestUtil.get(`/api/blog-requests?statuses=${statuses}&keyword=${keywordValue}&page=${pageNoValue}`);

        const respBody = await resp.json();
        setDataReady(true);
        setPageSize(respBody.pageSize);
        setTotal(respBody.total);
        setBlogRequests(respBody.results);
    };

    useEffect(() => {
        fetchData(keyword, pageNo);
    }, [keyword, pageNo]);

    const setCurrectPage = (newPageNo) => {
        if (newPageNo === pageNo) return;
        
        // 更新 URL
        const url = new URL(window.location.href);
        if (newPageNo > 1) {
            url.searchParams.set('page', newPageNo.toString());
        } else {
            url.searchParams.delete('page');
        }
        // 保持 keyword 参数
        if (keyword) {
            url.searchParams.set('keyword', keyword);
        }
        window.history.pushState({}, '', url.toString());
        
        // 更新页码（会触发 useEffect 重新请求数据）
        setPageNo(newPageNo);
        
        document.getElementById('blog-requests')?.scrollIntoView();
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