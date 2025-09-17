import CommonHeader from '../../components/common/CommonHeader';
import CommonFooter from '../../components/common/CommonFooter';
import Meta from '../../components/common/Meta';
import { Box, Container } from '@radix-ui/themes';
import AdminMonthlySelected from '../../components/admin/monthly-selected/AdminMonthlySelected';

const meta = {
    title: '每月精选 - 管理页面 - 博友圈 · 博客人的朋友圈！',
    keywords: '管理页面',
    description: '管理页面'
}

export default function AdminMonthlySelectedPage() {
    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <Box>
                    <Container size="2">
                        <AdminMonthlySelected />
                    </Container>
                </Box>
            </main>
            <CommonFooter />
        </>
    )
}