import { useEffect, useState } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';
import MonthlySelectedCard from './MonthlySelectedCard';
import Pagination from '../pagination/Pagination';
import { Box, Flex, Skeleton, Text, Heading, Grid, Card } from '@radix-ui/themes';

function countHasImageUsingFilter(items) {
    return items.filter(item => item.hasImage === true).length;
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
        setPostInfos(respBody.results[0].postInfos);

        respBody.results[0].postInfos.sort((a, b) => {
            if (null !== a.imageURL && null === b.imageURL) {
                return -1;
            } else {
                return 0;
            }
        });

        let showImageCount = countHasImageUsingFilter(respBody.results[0].postInfos);
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
            <>
                <Box id="monthly-selected-container">
                    <Box mb="2">
                        <Skeleton><Text>2025/08</Text></Skeleton>
                    </Box>
                    <Grid columns={{ initial: "1", md: "2" }} gap="3" width="auto">
                        {
                            Array.from({ length: 4 }).map((_, index) => (
                                <Card key={index}>
                                    <Flex direction="column" gap="2">
                                        <Box>
                                            <Skeleton height="180px"></Skeleton>
                                        </Box>

                                        <Flex direction="column" gap="1">
                                            <Box>
                                                <Skeleton width="240px" height="20px" />
                                            </Box>
                                            <Box>
                                                <Skeleton width="100%" height="48px" />
                                            </Box>
                                            <Box>
                                                <Flex gap="1" align="center">
                                                    <Skeleton width="20px" height="20px" />
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
                                <Card key={index}>
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
                                                    <Skeleton width="20px" height="20px" />
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
            </>
        );
    }

    return (
        <>
            <Box id="monthly-selected-container">
                <Box mb="2">
                    <Heading size="3" weight="bold">{yearMonthStr}</Heading>
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
        </>
    )
}