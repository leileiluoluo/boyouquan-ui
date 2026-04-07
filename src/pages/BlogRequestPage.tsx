import { Box, Container } from '@radix-ui/themes';

import { CommonHeader, CommonFooter } from '@components/common';
import BlogRequest from '@components/blog-request/BlogRequest';

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