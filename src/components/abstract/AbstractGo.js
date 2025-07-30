import { Box, Link } from '@radix-ui/themes';
import { getGoAddress } from '../../utils/PageAddressUtil';

export default function AbstractGo({ link }) {
    const gotoLink = getGoAddress(link);
    return (
        <Box mt="2" mb="2">
            <Link href={gotoLink} size="2">
                [阅读原文]
            </Link>
        </Box>
    )
}