import React from 'react';
import { Box, Link, Text } from '@radix-ui/themes';
import { getGoAddress } from '../../utils/PageAddressUtil';

interface AbstractTitleProps {
    isSharingPage?: string;
    title: string;
    link: string;
}

export default function AbstractTitle({ isSharingPage, title, link }: AbstractTitleProps): React.JSX.Element {
    const gotoLink = getGoAddress(link);
    return (
        <Box>
            {isSharingPage ?
                <Text size="3" weight="bold">发现一篇有趣的文章：「<Link href={gotoLink}>{title}</Link>」</Text> :
                <Text size="3" weight="bold">文章摘要：「<Link href={gotoLink}>{title}</Link>」</Text>
            }
        </Box>
    )
}