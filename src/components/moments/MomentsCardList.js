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

    const fetchData = async (pageNo) => {
        const resp = await RequestUtil.get(`/api/moments?page=${pageNo}`);

        const respBody = await resp.json();
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

    return (
        <>
            <Box id="moments-container">
                <Box mb="2">
                    <Heading size="3" weight="bold">最近发布</Heading>
                </Box>

                <Grid columns={{ initial: "1", md: "2" }} gap="3" width="auto">
                    {
                        moments.map(
                            (moment, index) => (
                                <MomentsCard
                                    key={index}
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