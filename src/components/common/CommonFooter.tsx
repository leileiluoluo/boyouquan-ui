import React from 'react';
import { Box } from '@radix-ui/themes'
import FooterBlock from './FooterBlock'
import SiteFooter from './SiteFooter'

interface CommonFooterProps {
    isHome?: string | boolean;
}

export default function CommonFooter({ isHome }: CommonFooterProps): React.JSX.Element {
    return (
        <Box>
            <FooterBlock isHome={isHome}/>
            <SiteFooter />
        </Box>
    )
}