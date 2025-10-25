import { useEffect, useState } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';
import BlogRequestsTable from './BlogRequestsTable';
import Pagination from '../pagination/Pagination';
import { getURLParameter } from '../../utils/CommonUtil';
import { Box, Skeleton, Table, Text } from '@radix-ui/themes';

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
        return (
            <Box>
                <Box id="blog-requests">
                    <Table.Root variant="surface">
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeaderCell><Skeleton width="30%" /></Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell><Skeleton width="30%" /></Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell><Skeleton width="30%" /></Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell><Skeleton width="30%" /></Table.ColumnHeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                Array.from({ length: 10 }).map((_, index) => (
                                    <Table.Row key={index}>
                                        <Table.RowHeaderCell>
                                            <Skeleton maxWidth="100%" height="14px" />
                                        </Table.RowHeaderCell>
                                        <Table.Cell><Skeleton maxWidth="100%" height="14px" /></Table.Cell>
                                        <Table.Cell><Skeleton maxWidth="80%" height="14px" /></Table.Cell>
                                        <Table.Cell>
                                            <Skeleton maxWidth="40%" height="14px" />
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            }
                        </Table.Body>
                    </Table.Root>
                </Box>
                <Pagination
                    pageNo={pageNo}
                    pageSize={pageSize}
                    total={total}
                    setCurrectPage={setCurrectPage} />
            </Box>
        );
    }

    if (null !== keyword && '' !== keyword && 0 === total) {
        return (
            <Box>
                <Box mt="5" mb="5" width="100%" height="100px" align="center">
                    <Text size="2">
                        未找到相关的博客收录申请，试试更换关键词吧！
                    </Text>
                </Box>

                <Pagination
                    pageNo={pageNo}
                    pageSize={pageSize}
                    total={total}
                    setCurrectPage={setCurrectPage} />
            </Box>
        );
    }

    return (
        <Box>
            <BlogRequestsTable requests={blogRequests} />
            <Pagination
                pageNo={pageNo}
                pageSize={pageSize}
                total={total}
                setCurrectPage={setCurrectPage} />
        </Box>
    )
}