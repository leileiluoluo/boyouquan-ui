import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import BlogDetail from '../components/blog/BlogDetail';
import { Box, Container, Flex } from '@radix-ui/themes';

export default function BlogPage() {
    return (
        <>
            <CommonHeader />
            <main className="main">
                <Box>
                    <Container size="2">
                        <Flex direction="column" gap="4">
                            <BlogDetail />
                        </Flex>
                    </Container>
                </Box>
            </main>
            <CommonFooter />
        </>
    )
}