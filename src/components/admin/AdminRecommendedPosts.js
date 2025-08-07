import { useEffect, useState } from 'react';
import AdminMenu from './AdminMenu';
import AdminRecommendedPostsTable from './recommended-posts/AdminRecommendedPostsTable';
import Pagination from '../pagination/Pagination';
import RequestUtil from '../../utils/APIRequestUtil';
import { redirectTo } from '../../utils/CommonUtil';
import { ADMIN_LOGIN_ADDRESS } from '../../utils/PageAddressUtil';
import AdminMenuHeader from './AdminMenuHeader';
import { Box } from '@radix-ui/themes';

export default function AdminRecommendedPosts() {
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [total, setTotal] = useState(0);
    const [posts, setPosts] = useState([]);

    const fetchData = async (pageNo) => {
        const resp = await RequestUtil.get(`/api/posts?sort=recommended&page=${pageNo}`);

        if (resp.status != 200) {
            redirectTo(ADMIN_LOGIN_ADDRESS);
        } else {
            const respBody = await resp.json();
            setPageSize(respBody.pageSize);
            setTotal(respBody.total);
            setPosts(respBody.results);
        }
    };

    useEffect(() => {
        fetchData(pageNo);
    }, [pageNo]);

    const setCurrectPage = (pageNo) => {
        setPageNo(pageNo);

        document.getElementById('recommended-posts').scrollIntoView();
    }

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