import CommonHeader from '../../components/common/CommonHeader';
import CommonFooter from '../../components/common/CommonFooter';
import Meta from '../../components/common/Meta';
import AdminBlogRequests from '../../components/admin/AdminBlogRequests';
import { Box, Container } from '@radix-ui/themes';

const meta = {
    title: '博客审核 - 管理页面 - 博友圈 · 博客人的朋友圈！',
    keywords: '管理页面',
    description: '管理页面'
}

export default function AdminBlogRequestsPage() {
    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <Box>
                    <Container size="2">
                        <AdminBlogRequests />
                    </Container>
                </Box>
            </main>
            <CommonFooter />
        </>
    )
}