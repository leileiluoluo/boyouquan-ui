import { Suspense, lazy } from 'react';
import { Flex, Box, Link, Container, Text } from '@radix-ui/themes';

const FooterStatistic = lazy(() => import('./FooterStatistic'));
const SpecialThanks = lazy(() => import('./special-thanks/SpecialThanks'));

export default function FooterBlock({ isHome }) {
    return (
        <Box mt="4">
            <Container size="2">
                <Flex direction="column" gap="4" justify="center" align="center">
                    <Box>
                        <Suspense>
                            <FooterStatistic />
                        </Suspense>
                    </Box>
                    <Box id="special-thanks">
                        <Suspense>
                            <SpecialThanks isHome={isHome} />
                        </Suspense>
                    </Box>
                    <Box>
                        <Text size="2">特别声明：包含政治、色情、赌博与暴力等违规内容的博客，一经发现，将被永久移出收录名单！举报违规博客，请「<Link href="mailto:contact@boyouquan.com?subject=违规内容举报&amp;body=收录页面：%0d%0a违规内容：%0d%0a">联系站长</Link>」！</Text>
                    </Box>
                </Flex>
            </Container>
        </Box>
    )
}