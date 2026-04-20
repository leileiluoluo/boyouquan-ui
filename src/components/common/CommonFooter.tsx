import React from 'react';
import FooterBlock from './FooterBlock';
import SiteFooter from './SiteFooter';

interface CommonFooterProps {
    isHome?: string | boolean;
}

export default function CommonFooter({ isHome }: CommonFooterProps): React.JSX.Element {
    return (
        <div>
            <FooterBlock isHome={isHome} />
            <SiteFooter />
        </div>
    );
}