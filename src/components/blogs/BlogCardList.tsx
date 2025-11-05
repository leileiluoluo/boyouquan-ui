import React from 'react';
import { useEffect, useState } from 'react';
import Pagination from '../pagination/Pagination';
import RequestUtil from '../../utils/APIRequestUtil';
import BlogCard from './BlogCard';
import { getURLParameter } from '../../utils/CommonUtil';
import { Box, Grid, Flex, Card, Skeleton, Text } from '@radix-ui/themes';

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
            <Box className='blogs-container'>
                <Flex direction="column">
                    <Grid columns={{ initial: "1", md: "2" }} gap="3" width="auto">
                        {
                            Array.from({ length: 10 }).map((_, index) => (
                                <Box key={index}>
                                    <Card style={{ padding: 'var(--space-4)' }}>
                                        <Flex direction="column" gap="1">
                                            <Box mt="2">
                                                <Flex gap="2" align="center">
                                                    <Box>
                                                        <Skeleton width="36px" height="36px" style={{ borderRadius: '50%' }} />
                                                    </Box>
                                                    <Box>
                                                        <Flex direction="column" gap="2">
                                                            <Skeleton width="88px" height="16px" />
                                                            <Flex gap="1" align="center">
                                                                <Skeleton width="72px" height="12px" />
                                                                <Skeleton width="12px" height="12px" />
                                                            </Flex>
                                                        </Flex>
                                                    </Box>
                                                </Flex>
                                            </Box>
                                            <Box p="1" radius="large" mt="2"
                                                style={{
                                                    backgroundColor: 'rgb(245, 245, 245)'
                                                }}>
                                                <Skeleton>
                                                    <Text size="2">Lorem ipsum dolor sit amet</Text>
                                                </Skeleton>
                                            </Box>
                                            <Box mt="2">
                                                <Flex gap="2" justify="between">
                                                    <Box>
                                                        <Flex direction="column" gap="1">
                                                            <Skeleton width="62px" height="14px" />
                                                            <Skeleton width="62px" height="14px" />
                                                        </Flex>
                                                    </Box>
                                                    <Box>
                                                        <Flex direction="column" gap="1">
                                                            <Skeleton width="62px" height="14px" />
                                                            <Skeleton width="62px" height="14px" />
                                                        </Flex>
                                                    </Box>
                                                    <Box>
                                                        <Flex direction="column" gap="1">
                                                            <Skeleton width="62px" height="14px" />
                                                            <Skeleton width="62px" height="14px" />
                                                        </Flex>
                                                    </Box>

                                                    <Box>
                                                        <Flex direction="column" gap="1">
                                                            <Skeleton width="62px" height="14px" />
                                                            <Skeleton width="62px" height="14px" />
                                                        </Flex>
                                                    </Box>
                                                </Flex>
                                            </Box>
                                            <Box mt="2">
                                                <Flex direction="column" gap="1">
                                                    <Skeleton width="62px" height="14px" />
                                                    <Flex direction="column" gap="2">
                                                        <Flex gap="2">
                                                            <Skeleton width="20%" height="14px" />
                                                            <Skeleton width="80%" height="14px" />
                                                        </Flex>
                                                        <Flex gap="2">
                                                            <Skeleton width="20%" height="14px" />
                                                            <Skeleton width="80%" height="14px" />
                                                        </Flex>
                                                        <Flex gap="2">
                                                            <Skeleton width="20%" height="14px" />
                                                            <Skeleton width="80%" height="14px" />
                                                        </Flex>
                                                    </Flex>
                                                </Flex>
                                            </Box>
                                            <Box mt="2" mb="1">
                                                <Flex justify="between">
                                                    <Box>
                                                        <Flex align="center" gap="1">
                                                            <Skeleton width="12px" height="12px" style={{ borderRadius: '50%' }} />
                                                            <Skeleton width="40px" height="12px" />
                                                        </Flex>
                                                    </Box>
                                                    <Box>
                                                        <Flex align="center" gap="1">
                                                            <Skeleton width="12px" height="12px" style={{ borderRadius: '50%' }} />
                                                            <Skeleton width="40px" height="12px" />
                                                        </Flex>
                                                    </Box>
                                                </Flex>
                                            </Box>
                                        </Flex>
                                    </Card>
                                </Box>
                            ))
                        }
                    </Grid>
                </Flex>

                <Box mt="3">
                    <Pagination
                        pageNo={pageNo}
                        pageSize={pageSize}
                        total={total}
                        setCurrectPage={setCurrectPage} />
                </Box>
            </Box>
        );
    }

    if (null !== keyword && '' !== keyword && 0 === total) {
        return (
            <Box className='blogs-container'>
                <Box mt="5" mb="5" width="100%" height="100px" align="center">
                    <Text size="2">
                        未找到相关博客，试试更换关键词吧！
                    </Text>
                </Box>

                <Box mt="3">
                    <Pagination
                        pageNo={pageNo}
                        pageSize={pageSize}
                        total={total}
                        setCurrectPage={setCurrectPage} />
                </Box>
            </Box>
        );
    }

    return (
        <Box className='blogs-container'>
            <Flex direction="column">
                <Grid columns={{ initial: "1", md: "2" }} gap="3" width="auto">
                    {
                        blogs.map(
                            (blog, index) => (
                                <Box key={index}>
                                    <BlogCard
                                        key={index}
                                        blog={blog}
                                        posts={blog.posts}
                                        publishedAtHighlight={publishedAtHighlight}
                                        accessCountHighlight={accessCountHighlight}
                                        createTimeHighlight={createTimeHighlight} />
                                </Box>
                            ))
                    }
                </Grid>
            </Flex>

            <Box mt="3">
                <Pagination
                    pageNo={pageNo}
                    pageSize={pageSize}
                    total={total}
                    setCurrectPage={setCurrectPage} />
            </Box>
        </Box>
    )
}