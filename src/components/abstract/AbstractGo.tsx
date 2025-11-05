import React from 'react';
import { Box, Link } from '@radix-ui/themes';
import { getGoAddress } from '../../utils/PageAddressUtil';

interface AbstractGoProps {
    link: string;
}

export default function AbstractGo({ link }: AbstractGoProps): React.JSX.Element {
    const gotoLink = getGoAddress(link);
    return (
        <Box>
            <Link href={gotoLink} size="2" weight="bold">
                [阅读原文]
            </Link>
        </Box>
    )
}