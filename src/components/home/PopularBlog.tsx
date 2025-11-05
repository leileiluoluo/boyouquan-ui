import React from 'react';
import { Box, Tooltip, Link } from '@radix-ui/themes';
import { getBlogAddress, getGravatarImageFullURL, MOMENTS_ADDRESS } from '../../utils/PageAddressUtil';
import LazyAvatar from '../common/avatar/LazyAvatar';
import { CameraIcon } from '@radix-ui/react-icons';

export default function PopularBlog({ type, name, domainName, blogAdminLargeImageURL }) {
    let href = getBlogAddress(domainName);
    if (type === 'moment') {
        href = MOMENTS_ADDRESS;
    }

    return (
        <Box>
            <Tooltip content={name}>
                <Link href={href} style={{ position: 'relative', display: 'inline-block' }}>
                    <LazyAvatar
                        style={{ width: 28, height: 28 }}
                        src={getGravatarImageFullURL(blogAdminLargeImageURL)}
                        radius="full"
                    />

                    {
                        type === 'moment' && <CameraIcon
                            style={{
                                position: 'absolute',
                                top: '-4px',
                                right: '-4px',
                                backgroundColor: 'white',
                                borderRadius: '10%',
                                padding: '0px',
                                width: '12px',
                                height: '12px'
                            }}
                        />
                    }
                </Link>
            </Tooltip>
        </Box>
    );
}
