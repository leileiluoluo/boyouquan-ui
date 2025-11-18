import { useEffect, useState } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';
import MonthlySelectedCard from './MonthlySelectedCard';
import Pagination from '../pagination/Pagination';
import { Box, Flex, Skeleton, Text, Heading, Grid, Card } from '@radix-ui/themes';

function formatDateToChinese(dateStr) {
    const [year, month] = dateStr.split('/');
    const monthNum = parseInt(month, 10);
    return `${year} 年 ${monthNum} 月精选`;
}

function countHasImageUsingFilter(items) {
    return items.filter(item => item.hasImage).length;
}

export default function MonthlySelectedCardList() {
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [total, setTotal] = useState(0);
    const [imageCount, setImageCount] = useState(0);
    const [yearMonthStr, setYearMonthStr] = useState();
    const [postInfos, setPostInfos] = useState([]);
    const [dataReady, setDataReady] = useState(false);

    const fetchData = async (pageNo) => {
        const resp = await RequestUtil.get(`/api/monthly-selected?page=${pageNo}`);

        const respBody = await resp.json();
        setDataReady(true);
        setPageSize(respBody.pageSize);
        setTotal(respBody.total);
        setYearMonthStr(respBody.results[0].yearMonthStr);
        const postInfoList = respBody.results[0].postInfos;

        postInfoList.sort((a, b) => Number(b.hasImage) - Number(a.hasImage));

        setPostInfos(postInfoList);
        const showImageCount = countHasImageUsingFilter(postInfoList);
        if (showImageCount % 2 === 1 && showImageCount > 0) {
            setImageCount(showImageCount - 1);
        } else {
            setImageCount(showImageCount);
        }
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
            <Flex direction="column" gap="3">
                <Box id="monthly-selected-container">
                    <Box mb="2">
                        <Skeleton><Text>2025 年 8 月精选</Text></Skeleton>
                    </Box>
                    <Grid columns={{ initial: "1", md: "2" }} gap="3" width="auto">
                        {
                            Array.from({ length: 4 }).map((_, index) => (
                                <Card key={`part1-${index}`}>
                                    <Flex direction="column" gap="2">
                                        <Box>
                                            <Skeleton height="176px"></Skeleton>
                                        </Box>

                                        <Flex direction="column" gap="1">
                                            <Box>
                                                <Skeleton width="240px" height="20px" />
                                            </Box>
                                            <Box>
                                                <Skeleton width="100%" height="40px" />
                                            </Box>
                                            <Box>
                                                <Flex gap="1" align="center">
                                                    <Skeleton width="20px" height="20px" style={{ borderRadius: '50%' }} />
                                                    <Skeleton width="80px" height="20px" />
                                                    <Skeleton width="50px" height="20px" />
                                                    <Skeleton width="50px" height="20px" />
                                                    <Skeleton width="20px" height="20px" />
                                                </Flex>
                                            </Box>
                                        </Flex>
                                    </Flex>
                                </Card>
                            ))
                        }

                        {
                            Array.from({ length: 6 }).map((_, index) => (
                                <Card key={`part2-${index}`}>
                                    <Flex direction="column" gap="2">
                                        <Flex direction="column" gap="1">
                                            <Box>
                                                <Skeleton width="240px" height="20px" />
                                            </Box>
                                            <Box>
                                                <Skeleton width="100%" height="48px" />
                                            </Box>
                                            <Box>
                                                <Flex gap="1" align="center">
                                                    <Skeleton width="20px" height="20px" style={{ borderRadius: '50%' }} />
                                                    <Skeleton width="80px" height="20px" />
                                                    <Skeleton width="50px" height="20px" />
                                                    <Skeleton width="50px" height="20px" />
                                                    <Skeleton width="20px" height="20px" />
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
            </Flex>
        );
    }

    return (
        <Flex direction="column" gap="3">
            <Box id="monthly-selected-container">
                <Box mb="2">
                    <Heading size="3" weight="bold">{formatDateToChinese(yearMonthStr)}</Heading>
                </Box>

                <Grid columns={{ initial: "1", md: "2" }} gap="3" width="auto">
                    {
                        postInfos.map(
                            (postInfo, index) => (
                                <MonthlySelectedCard
                                    key={index}
                                    postInfo={postInfo}
                                    showImage={index < imageCount} />
                            ))
                    }
                </Grid>
            </Box>
            <Pagination
                pageNo={pageNo}
                pageSize={pageSize}
                total={total}
                setCurrectPage={setCurrectPage} />
        </Flex>
    )
}