import { useEffect, useState } from 'react';
import Pagination from '../pagination/Pagination';
import RequestUtil from '../../utils/APIRequestUtil';
import BlogCard from './BlogCard';
import { getURLParameter } from '../../utils/CommonUtil';
import { Box, Grid, DecorativeBox, Flex } from '@radix-ui/themes';

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

        document.getElementById('switch-sort-type').scrollIntoView();
    }

    return (
        <Box className='blogs-container'>
            <Flex direction="column">
                <Grid columns="2" gap="3">
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