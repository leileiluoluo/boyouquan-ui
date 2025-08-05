import { Box } from '@radix-ui/themes'
import FooterBlock from './FooterBlock'
import SiteFooter from './SiteFooter'

export default function CommonFooter({ isHome }) {
    return (
        <Box>
            <FooterBlock isHome={isHome}/>
            <SiteFooter />
        </Box>
    )
}