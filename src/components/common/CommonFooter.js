import { Box } from '@radix-ui/themes'
import FooterBlock from './FooterBlock'
import SiteFooter from './SiteFooter'

export default function CommonFooter() {
    return (
        <Box>
            <FooterBlock />
            <SiteFooter />
        </Box>
    )
}