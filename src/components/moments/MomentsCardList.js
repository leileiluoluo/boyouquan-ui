import { useEffect, useState } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';
import Pagination from '../pagination/Pagination';
import { Box, Flex, Skeleton, Text, Heading, Grid, Card } from '@radix-ui/themes';
import MomentsCard from './MomentsCard';

export default function MomentsCardList() {
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [total, setTotal] = useState(0);
    const [moments, setMoments] = useState([]);
    const [dataReady, setDataReady] = useState(false);

    const fetchData = async (pageNo) => {
        const resp = await RequestUtil.get(`/api/moments?page=${pageNo}`);

        const respBody = await resp.json();
        setDataReady(true);
        setPageSize(respBody.pageSize);
        setTotal(respBody.total);
        setMoments(respBody.results);
    };

    useEffect(() => {
        fetchData(pageNo);
    }, [pageNo]);

    const setCurrectPage = (pageNo) => {
        setPageNo(pageNo);

        document.getElementById('moments-container').scrollIntoView();
    }

    if (!dataReady) {
        return (
            <>
                <Box id="moments-container">
                    <Box mb="2">
                        <Heading size="3" weight="bold">最新随拍</Heading>
                    </Box>
                    <Grid columns={{ initial: "1", md: "2" }} gap="3" width="auto">
                        {
                            Array.from({ length: 10 }).map((_, index) => (
                                <Card key={index}>
                                    <Flex direction="column" gap="2">
                                        <Box>
                                            <Skeleton height="176px"></Skeleton>
                                        </Box>

                                        <Flex direction="column" gap="1">
                                            <Box>
                                                <Skeleton width="240px" height="20px" />
                                            </Box>
                                            <Box>
                                                <Flex gap="1" align="center">
                                                    <Skeleton width="20px" height="20px" style={{ borderRadius: '50%' }} />
                                                    <Skeleton width="80px" height="20px" />
                                                    <Skeleton width="50px" height="20px" />
                                                    <Skeleton width="40px" height="20px" />
                                                </Flex>
                                            </Box>
                                        </Flex>
                                    </Flex>
                                </Card>
                            ))
                        }
                    </Grid>
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
            <Box id="moments-container">
                <Box mb="2">
                    <Heading size="3" weight="bold">最新随拍</Heading>
                </Box>

                <Grid columns={{ initial: "1", md: "2" }} gap="3" width="auto">
                    {
                        moments.map(
                            (moment, index) => (
                                <MomentsCard
                                    key={moment.id}
                                    moment={moment} />
                            ))
                    }
                </Grid>
            </Box>
            <Pagination
                pageNo={pageNo}
                pageSize={pageSize}
                total={total}
                setCurrectPage={setCurrectPage} />
        </>
    )
}