import { useEffect, useState } from 'react';
import AdminMenuHeader from '../AdminMenuHeader';
import MonthlySelectedCard from '../../monthly-selected/MonthlySelectedCard';
import RequestUtil from '../../../utils/APIRequestUtil';
import Pagination from '../../pagination/Pagination';
import AdminMenu from '../AdminMenu';
import { Box, Button, Flex, Heading, Grid } from '@radix-ui/themes';
import { ADMIN_POST_IMAGE_ADD_ADDRESS } from '../../../utils/PageAddressUtil';

export default function AdminMonthlySelected() {
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [total, setTotal] = useState(0);
    const [item, setItem] = useState({});
    const [dataReady, setDataReady] = useState(false);

    const fetchData = async (pageNo) => {
        const resp = await RequestUtil.get(`/api/monthly-selected?page=${pageNo}&includeCurrentMonth=true`);

        const respBody = await resp.json();
        setDataReady(true);
        setPageSize(respBody.pageSize);
        setTotal(respBody.total);
        setItem(respBody.results[0]);
    };

    useEffect(() => {
        fetchData(pageNo);
    }, [pageNo]);

    const setCurrectPage = (pageNo) => {
        setPageNo(pageNo);

        document.getElementById('monthly-selected-container').scrollIntoView();
    }

    const addPostImage = (link) => {
        const url = ADMIN_POST_IMAGE_ADD_ADDRESS + '?link=' + encodeURIComponent(link);
        window.open(url);
    };

    return (
        <>
            {
                dataReady ? <><AdminMenuHeader title='每月精选 - 管理页面' />
                    <AdminMenu />
                    <Box id="monthly-selected-container" mb="2">
                        <Box mb="2">
                            <Heading size="3" weight="bold">{item.yearMonthStr}</Heading>
                        </Box>

                        <Grid columns={{ initial: "1", md: "2" }} gap="3" width="auto">
                            {
                                item.postInfos.map(
                                    (postInfo, index) => (
                                        <Flex gap="2">
                                            <MonthlySelectedCard
                                                key={index}
                                                postInfo={postInfo} />

                                            <Button size="1" color="amber" onClick={() => addPostImage(postInfo.link)}>配图</Button>
                                        </Flex>
                                    ))
                            }
                        </Grid>
                    </Box>

                    <Pagination
                        pageNo={pageNo}
                        pageSize={pageSize}
                        total={total}
                        setCurrectPage={setCurrectPage} /></> : ''
            }
        </>
    )
}