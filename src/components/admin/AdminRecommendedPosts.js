import { useEffect, useState } from 'react';
import { getCookie } from '../../utils/CookieUtil';
import AdminMenu from './AdminMenu';
import AdminRecommendedPostsTable from './recommended-posts/AdminRecommendedPostsTable';
import Pagination from '../pagination/Pagination';
import RequestUtil from '../../utils/RequestUtil';
import { redirectTo } from '../../utils/CommonUtil';
import { ADMIN_LOGIN_ADDRESS } from '../../utils/PageAddressUtil';
import AdminMenuHeader from './AdminMenuHeader';

export default function AdminRecommendedPosts() {
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [total, setTotal] = useState(0);
    const [posts, setPosts] = useState([]);

    const fetchData = async (page) => {
        const resp = await RequestUtil.get(`https://www.boyouquan.com/api/admin/recommended-posts?page=${page}`, {
            'sessionId': getCookie('sessionId')
        });

        const respBody = await resp.json();

        if (respBody.status == 'error') {
            redirectTo(ADMIN_LOGIN_ADDRESS);
        } else {
            setPageSize(respBody.result.pageSize);
            setTotal(respBody.result.total);
            setPosts(respBody.result.results);
        }
    };

    useEffect(() => {
        fetchData(pageNo);
    }, [pageNo]);

    const setCurrectPage = (pageNo) => {
        setPageNo(pageNo);

        document.getElementsByClassName('blog-requests')[0].scrollIntoView();
    }

    return (
        <>
            <AdminMenuHeader title='推荐文章管理 - 管理页面' />
            <AdminMenu />
            <AdminRecommendedPostsTable posts={posts} />
            <Pagination
                pageNo={pageNo}
                pageSize={pageSize}
                total={total}
                setCurrectPage={setCurrectPage} />
        </>
    )
}