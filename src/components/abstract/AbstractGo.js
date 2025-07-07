import { Link } from '@radix-ui/themes';
import { getGoAddress } from '../../utils/PageAddressUtil';

export default function AbstractGo({ link }) {
    const gotoLink = getGoAddress(link);
    return (
        <Link href={gotoLink} size="2" mt="2" mb="3">
            [阅读原文]
        </Link>
    )
}