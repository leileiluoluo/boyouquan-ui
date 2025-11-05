import React from 'react';
import { useEffect, useState } from 'react';
import AdminMenu from './AdminMenu';
import AdminRecommendedPostsTable from './recommended-posts/AdminRecommendedPostsTable';
import Pagination from '../pagination/Pagination';
import RequestUtil from '../../utils/APIRequestUtil';
import { redirectTo } from '../../utils/CommonUtil';
import { ADMIN_LOGIN_ADDRESS } from '../../utils/PageAddressUtil';
import AdminMenuHeader from './AdminMenuHeader';
import { Box } from '@radix-ui/themes';
import { getCookie } from '../../utils/CookieUtil';
import { Post } from '../../types';

export default function AdminRecommendedPosts(): React.JSX.Element {
    const [pageNo, setPageNo] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [posts, setPosts] = useState<Post[]>([]);

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
        const resp = await RequestUtil.get(`/api/posts?sort=recommended&page=${pageNoParam}`);

        if (typeof resp === 'string' || resp.status !== 200) {
            redirectTo(ADMIN_LOGIN_ADDRESS);
        } else {
            const respBody = await resp.json();
            setPageSize(respBody.pageSize);
            setTotal(respBody.total);
            setPosts(respBody.results);
        }
    };

    useEffect(() => {
        permissionCheck();
        fetchData(pageNo);
    }, [pageNo]);

    const setCurrectPage = (pageNoParam: number): void => {
        setPageNo(pageNoParam);

        const element = document.getElementById('recommended-posts');
        if (element) {
            element.scrollIntoView();
        }
    };

    return (
        <>
            <AdminMenuHeader title='推荐文章管理 - 管理页面' />
            <AdminMenu />
            <AdminRecommendedPostsTable posts={posts} />
            <Box mt="2">
                <Pagination
                    pageNo={pageNo}
                    pageSize={pageSize}
                    total={total}
                    setCurrectPage={setCurrectPage} />
            </Box>
        </>
    )
}