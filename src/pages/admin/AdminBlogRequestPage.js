import CommonHeader from '../../components/common/CommonHeader';
import CommonFooter from '../../components/common/CommonFooter';
import AdminBlogRequest from '../../components/admin/AdminBlogRequest';
import { Box, Container } from '@radix-ui/themes';

export default function AdminBlogRequestPage() {
    return (
        <>
            <CommonHeader />
            <main className="main">
                <Box>
                    <Container size="2">
                        <AdminBlogRequest />
                    </Container>
                </Box>
            </main>
            <CommonFooter />
        </>
    )
}