import { Box, Tooltip, Link, Avatar } from '@radix-ui/themes';
import { getBlogAddress, getGravatarImageFullURL } from '../../utils/PageAddressUtil';

export default function PopularBlog({ name, domainName, blogAdminLargeImageURL }) {
    return (
        <Box>
            <Tooltip content={name}>
                <Link href={getBlogAddress(domainName)}>
                    <Avatar
                        size="2"
                        radius="full"
                        src={getGravatarImageFullURL(blogAdminLargeImageURL)}
                    />
                </Link>
            </Tooltip>
        </Box>
    )
}