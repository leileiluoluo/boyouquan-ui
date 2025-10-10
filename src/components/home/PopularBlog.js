import { Box, Tooltip, Link } from '@radix-ui/themes';
import { getBlogAddress, getGravatarImageFullURL } from '../../utils/PageAddressUtil';
import LazyAvatar from '../common/avatar/LazyAvatar';

export default function PopularBlog({ name, domainName, blogAdminLargeImageURL }) {
    return (
        <Box>
            <Tooltip content={name}>
                <Link href={getBlogAddress(domainName)}>
                    <LazyAvatar
                        style={{ width: 28, height: 28 }}
                        src={getGravatarImageFullURL(blogAdminLargeImageURL)}
                        radius="full"
                    />
                </Link>
            </Tooltip>
        </Box>
    )
}