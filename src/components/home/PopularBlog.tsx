import { Tooltip, Flex } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import { getBlogAddress, getGravatarImageFullURL, MOMENTS_ADDRESS } from '../../utils/PageAddressUtil';
import LazyAvatar from '../common/avatar/LazyAvatar';

export default function PopularBlog({ type, name, domainName, blogAdminLargeImageURL }) {
    let href = getBlogAddress(domainName);
    if (type === 'moment') {
        href = MOMENTS_ADDRESS;
    }

    return (
        <Flex>
            <Tooltip title={name}>
                <a 
                    href={href} 
                    style={{ position: 'relative', display: 'inline-block' }}
                >
                    <LazyAvatar
                        style={{ width: 28, height: 28 }}
                        src={getGravatarImageFullURL(blogAdminLargeImageURL)}
                        shape="circle"
                    />

                    {
                        type === 'moment' && (
                            <CameraOutlined
                                style={{
                                    position: 'absolute',
                                    top: '-4px',
                                    right: '-4px',
                                    backgroundColor: 'white',
                                    borderRadius: '10%',
                                    padding: '0px',
                                    fontSize: '12px',
                                    width: '12px',
                                    height: '12px'
                                }}
                            />
                        )
                    }
                </a>
            </Tooltip>
        </Flex>
    );
}