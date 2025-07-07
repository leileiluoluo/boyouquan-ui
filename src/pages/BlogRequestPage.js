import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import BlogRequest from '../components/blog-request/BlogRequest';
import { Box, Container } from '@radix-ui/themes';

export default function BlogRequestPage() {
    return (
        <>
            <CommonHeader />
            <main className="main">
                <Box>
                    <Container size="2">
                        <BlogRequest />
                    </Container>
                </Box>
            </main>
            <CommonFooter />
        </>
    )
}