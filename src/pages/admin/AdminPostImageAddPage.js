import CommonHeader from '../../components/common/CommonHeader';
import CommonFooter from '../../components/common/CommonFooter';
import Meta from '../../components/common/Meta';
import { Box, Container } from '@radix-ui/themes';
import AdminPostImageAdd from '../../components/admin/AdminPostImageAdd';

const meta = {
    title: '文章配图 - 管理页面 - 博友圈 · 博客人的朋友圈！',
    keywords: '管理页面',
    description: '管理页面'
}

export default function AdminPostImageAddPage() {
    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <Box>
                    <Container size="2">
                        <AdminPostImageAdd />
                    </Container>
                </Box>
            </main>
            <CommonFooter />
        </>
    )
}