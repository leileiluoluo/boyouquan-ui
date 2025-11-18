import { useEffect, useState } from 'react';
import { getCookie } from '../../utils/CookieUtil';
import SearchBox from '../common/SearchBox';
import { getURLParameter, redirectTo } from '../../utils/CommonUtil';
import BlogRequestsTable from '../blog-requests/BlogRequestsTable';
import AdminMenu from './AdminMenu';
import Pagination from '../pagination/Pagination';
import { ADMIN_LOGIN_ADDRESS } from '../../utils/PageAddressUtil';
import RequestUtil from '../../utils/APIRequestUtil';
import AdminMenuHeader from './AdminMenuHeader';
import { Flex, Box } from '@radix-ui/themes';

export default function AdminBlogRequests() {
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [total, setTotal] = useState(0);
    const [blogRequests, setBlogRequests] = useState([]);

    const fetchData = async (keyword: string, pageNo: number): Promise<void> => {
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
        } else {
            const resp = await RequestUtil.get(`/api/blog-requests?keyword=${keyword}&page=${pageNo}&onlySelfSubmitted=false`);

            if (typeof resp === 'string') {
                return;
            }

            const respBody = await resp.json();
            setPageSize(respBody.pageSize);
            setTotal(respBody.total);
            setBlogRequests(respBody.results);
        }
    };

    useEffect(() => {
        let keyword = getURLParameter('keyword') || '';

        fetchData(keyword, pageNo);
    }, [pageNo]);

    const setCurrectPage = (pageNo: number): void => {
        setPageNo(pageNo);

        const element = document.getElementById('blog-requests');
        if (element) {
            element.scrollIntoView();
        }
    };

    return (
        <>
            <AdminMenuHeader title='博客审核 - 管理页面' />
            <AdminMenu />
            <Box mt="2">
                <SearchBox placeholder='搜索已提交的博客 ↵' gotoPage='/admin/blog-requests' />
            </Box>
            <Box mt="2" id="blog-requests">
                <Flex direction="column" gap="3">
                    <BlogRequestsTable adminPage='true' requests={blogRequests} />
                    <Pagination
                        pageNo={pageNo}
                        pageSize={pageSize}
                        total={total}
                        setCurrectPage={setCurrectPage} />
                </Flex>
            </Box>
        </>
    )
}