import { Suspense, lazy } from 'react';
import { Flex, Box, Link } from '@radix-ui/themes';
import SpecialThanks from './special-thanks/SpecialThanks';

const FooterStatistic = lazy(() => import('./FooterStatistic'));

export default function FooterBlock() {
    return (
        <footer className="footer-block">
            <Suspense>
                <FooterStatistic />
            </Suspense>
            <Flex justify="center">
            <Box>
                <Link href="/planet-shuttle">「博友圈 · 星球穿梭」</Link>
            </Box>
            </Flex>
            <SpecialThanks />
            <div className="footer-contact">
                特别声明：包含政治、色情、赌博与暴力等违规内容的博客，一经发现，将被永久移出收录名单！举报违规博客，请「<a href="mailto:contact@boyouquan.com?subject=违规内容举报&amp;body=收录页面：%0d%0a违规内容：%0d%0a">联系站长</a>」。
            </div>
        </footer>
    )
}