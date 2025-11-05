import React from 'react';
import { useEffect, useState } from 'react';
import AdminMenuHeader from '../AdminMenuHeader';
import MonthlySelectedCard from '../../monthly-selected/MonthlySelectedCard';
import RequestUtil from '../../../utils/APIRequestUtil';
import Pagination from '../../pagination/Pagination';
import AdminMenu from '../AdminMenu';
import { Box, Button, Flex, Heading, Grid } from '@radix-ui/themes';
import { ADMIN_LOGIN_ADDRESS, ADMIN_POST_IMAGE_ADD_ADDRESS } from '../../../utils/PageAddressUtil';
import { getCookie } from '../../../utils/CookieUtil';
import { redirectTo } from '../../../utils/CommonUtil';

interface MonthlySelectedItem {
    yearMonthStr?: string;
    postInfos?: Array<{
        link: string;
        [key: string]: any;
    }>;
    [key: string]: any;
}

export default function AdminMonthlySelected(): React.JSX.Element {
    const [pageNo, setPageNo] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [item, setItem] = useState<MonthlySelectedItem>({});
    const [dataReady, setDataReady] = useState<boolean>(false);

    const permissionCheck = async (): Promise<void> => {
        const username = getCookie('username');
        const sessionId = getCookie('sessionId');
        
        if (!username || !sessionId) {
            redirectTo(ADMIN_LOGIN_ADDRESS);
            return;
        }

        const permissionCheckResp = await RequestUtil.get(`/api/admin/permission-check`, {
            'username': username,
            'sessionId': sessionId,
        });

        if (typeof permissionCheckResp === 'string' || permissionCheckResp.status !== 200) {
            redirectTo(ADMIN_LOGIN_ADDRESS);
        }
    };

    const fetchData = async (pageNoParam: number): Promise<void> => {
        const username = getCookie('username');
        const sessionId = getCookie('sessionId');
        
        if (!username || !sessionId) {
            redirectTo(ADMIN_LOGIN_ADDRESS);
            return;
        }

        const permissionCheckResp = await RequestUtil.get(`/api/admin/permission-check`, {
            'username': username,
            'sessionId': sessionId,
        });

        if (typeof permissionCheckResp === 'string' || permissionCheckResp.status !== 200) {
            redirectTo(ADMIN_LOGIN_ADDRESS);
            return;
        }

        const resp = await RequestUtil.get(`/api/monthly-selected?page=${pageNoParam}&includeCurrentMonth=true`);

        if (typeof resp === 'string') {
            return;
        }

        const respBody = await resp.json();
        setDataReady(true);
        setPageSize(respBody.pageSize);
        setTotal(respBody.total);
        setItem(respBody.results[0]);
    };

    useEffect(() => {
        permissionCheck();
        fetchData(pageNo);
    }, [pageNo]);

    const setCurrectPage = (pageNoParam: number): void => {
        setPageNo(pageNoParam);

        const element = document.getElementById('monthly-selected-container');
        if (element) {
            element.scrollIntoView();
        }
    };

    const addPostImage = (link: string): void => {
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
                                (item.postInfos || []).map(
                                    (postInfo, index) => (
                                        <Flex gap="2" key={index}>
                                            <MonthlySelectedCard
                                                postInfo={postInfo}
                                                showImage="true" />

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