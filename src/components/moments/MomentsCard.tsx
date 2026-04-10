import { Card, Flex, Typography, Image } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import MomentsCardFooter from './MomentsCardFooter';
import LazyImg from '../common/img/LazyImg';
import { getGoAddress } from '../../utils/PageAddressUtil';

const { Link } = Typography;

export default function MomentsCard({ moment }) {
    const goToAddress = getGoAddress(moment.blogInfo.address);

    return (
        <Card
            style={{
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}
            bodyStyle={{ padding: 0 }}
        >
            <Flex vertical gap={8}>
                {/* 图片区域 - 16:9 比例 */}
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        paddingBottom: '56.25%', // 9 / 16 = 0.5625
                        backgroundColor: '#f3f3f3',
                        overflow: 'hidden',
                    }}
                >
                    <Link
                        href={goToAddress}
                        target="_blank"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'block',
                        }}
                    >
                        <LazyImg
                            src={moment.imageURL}
                            alt={moment.description}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.3s ease-in-out',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        />
                    </Link>
                </div>

                {/* 内容区域 */}
                <Flex vertical gap={8} style={{ padding: '12px' }}>
                    <Link
                        href={goToAddress}
                        target="_blank"
                        strong
                        style={{
                            fontSize: 14,
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: '1.4'
                        }}
                    >
                        {moment.description}
                    </Link>

                    <MomentsCardFooter moment={moment} />
                </Flex>
            </Flex>
        </Card>
    );
}