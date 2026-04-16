import React from 'react';
import { useEffect, useState } from 'react';
import { Flex, Row, Col, Card, Skeleton, Typography, Empty, Spin } from 'antd';
import Pagination from '../pagination/Pagination';
import RequestUtil from '../../utils/APIRequestUtil';
import BlogCard from './BlogCard';
import { getURLParameter } from '../../utils/CommonUtil';

const { Text } = Typography;

const getSortAndKeywordAndHighligts = () => {
    let sort = getURLParameter('sort') || 'collect_time';
    let keyword = getURLParameter('keyword') || '';

    let publishedAtHighlight = false;
    let accessCountHighlight = false;
    let createTimeHighlight = false;

    if ('collect_time' === sort) {
        publishedAtHighlight = true;
    } else if ('access_count' === sort) {
        accessCountHighlight = true;
    } else {
        createTimeHighlight = true;
    }

    return { sort, keyword, publishedAtHighlight, accessCountHighlight, createTimeHighlight };
}

export default function BlogCardList() {
    const { sort, keyword, publishedAtHighlight, accessCountHighlight, createTimeHighlight } = getSortAndKeywordAndHighligts();

    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [total, setTotal] = useState(0);
    const [blogs, setBlogs] = useState([]);
    const [dataReady, setDataReady] = useState(false);

    const fetchData = async (sortType, keyword, pageNo) => {
        const resp = await RequestUtil.get(`/api/blogs?sort=${sortType}&keyword=${keyword}&page=${pageNo}`);

        const respBody = await resp.json();
        setDataReady(true);
        setPageSize(respBody.pageSize);
        setTotal(respBody.total);
        setBlogs(respBody.results);
    };

    useEffect(() => {
        fetchData(sort, keyword, pageNo);
    }, [sort, keyword, pageNo]);

    const setCurrectPage = (pageNo) => {
        setPageNo(pageNo);
        document.getElementById('switch-sort-type').scrollIntoView();
    }

    if (!dataReady) {
        return (
            <Spin />
        );
    }

    if (null !== keyword && '' !== keyword && 0 === total) {
        return (
            <div className='blogs-container'>
                <Flex vertical gap={12}>
                    <Empty
                        description="未找到相关博客，试试更换关键词吧！"
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
        <div className='blogs-container'>
            <Flex vertical gap={12}>
                <Row gutter={[12, 12]}>
                    {blogs.map((blog, index) => (
                        <Col xs={24} md={12} key={index}>
                            <BlogCard
                                blog={blog}
                                posts={blog.posts}
                                publishedAtHighlight={publishedAtHighlight}
                                accessCountHighlight={accessCountHighlight}
                                createTimeHighlight={createTimeHighlight} />
                        </Col>
                    ))}
                </Row>

                <Pagination
                    pageNo={pageNo}
                    pageSize={pageSize}
                    total={total}
                    setCurrectPage={setCurrectPage} />
            </Flex>
        </div>
    );
}