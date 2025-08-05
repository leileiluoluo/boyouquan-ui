import { Box, Link } from '@radix-ui/themes';
import { getGoAddress } from '../../utils/PageAddressUtil';

export default function AbstractGo({ link }) {
    const gotoLink = getGoAddress(link);
    return (
        <Box>
            <Link href={gotoLink} size="2" weight="bold">
                [阅读原文]
            </Link>
        </Box>
    )
}