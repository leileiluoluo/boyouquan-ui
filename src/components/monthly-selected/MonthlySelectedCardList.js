import { useEffect, useState } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';
import MonthlySelectedCard from './MonthlySelectedCard';
import Pagination from '../pagination/Pagination';
import { Box, Flex, Skeleton, Table, Text } from '@radix-ui/themes';

export default function MonthlySelectedCardList() {
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [total, setTotal] = useState(0);
    const [items, setItems] = useState([]);
    const [dataReady, setDataReady] = useState(false);

    const fetchData = async (pageNo) => {
        const resp = await RequestUtil.get(`/api/monthly-selected?page=${pageNo}`);

        const respBody = await resp.json();
        setDataReady(true);
        setPageSize(respBody.pageSize);
        setTotal(respBody.total);
        setItems(respBody.results);
    };

    useEffect(() => {
        fetchData(pageNo);
    }, [pageNo]);

    const setCurrectPage = (pageNo) => {
        setPageNo(pageNo);

        document.getElementById('monthly-selected-container').scrollIntoView();
    }

    if (!dataReady) {
        return (
            <>
                <Box id="monthly-selected-container">
                    <Flex direction="column" gap="2">
                        <Box>
                            <Skeleton><Text>2025/08</Text></Skeleton>
                        </Box>
                        <Box>
                            <Table.Root variant="surface">
                                <Table.Header>
                                    <Table.Row>
                                        <Table.ColumnHeaderCell>博客名称</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>文章标题</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>发布时间</Table.ColumnHeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {
                                        Array.from({ length: 10 }).map((_, index) => (
                                            <Table.Row key={index}>
                                                <Table.RowHeaderCell><Skeleton width="100px" height="14px" /></Table.RowHeaderCell>
                                                <Table.Cell><Skeleton width="220px" height="14px" /></Table.Cell>
                                                <Table.Cell><Skeleton width="80px" height="14px" /></Table.Cell>
                                            </Table.Row>
                                        ))
                                    }
                                </Table.Body>
                            </Table.Root>
                        </Box>
                    </Flex>
                </Box>
                <Pagination
                    pageNo={pageNo}
                    pageSize={pageSize}
                    total={total}
                    setCurrectPage={setCurrectPage} />
            </>
        );
    }

    return (
        <>
            <Box id="monthly-selected-container">
                {
                    items.map(
                        (item, index) => (
                            <MonthlySelectedCard
                                key={index}
                                yearMonthStr={item.yearMonthStr}
                                postInfos={item.postInfos} />
                        ))
                }
            </Box>
            <Pagination
                pageNo={pageNo}
                pageSize={pageSize}
                total={total}
                setCurrectPage={setCurrectPage} />
        </>
    )
}