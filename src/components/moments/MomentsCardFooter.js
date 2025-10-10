import { Box, Flex, Avatar, Text, Link, Image } from '@radix-ui/themes';
import { getBlogAddress } from '../../utils/PageAddressUtil';
import { formatDateStr } from '../../utils/DateUtil';
import { HeartFilledIcon } from '@radix-ui/react-icons';
import RequestUtil from '../../utils/APIRequestUtil';
import { useState } from 'react';
import LazyAvatar from '../common/avatar/LazyAvatar';

export default function MomentsCardFooter({ moment }) {
    const [error, setError] = useState();
    const [animate, setAnimate] = useState(false);
    const [likeCount, setLikeCount] = useState(() => moment.likeCount);
    const [liked, setLiked] = useState(false);
    const blogURL = getBlogAddress(moment.blogDomainName);
    const createdAtFormatted = formatDateStr(moment.createdAt);

    const addLikes = async (id) => {
        const data = { type: 'MOMENTS', entityId: id };
        const resp = await RequestUtil.post('/api/likes', JSON.stringify(data), {
            'Content-Type': 'application/json'
        });

        if (resp.status != 201) {
            const respBody = await resp.json();
            setError(respBody);
        }
    };

    const handleIconClick = (id) => {
        if (!liked) {
            setLiked(true);
            setLikeCount(likeCount + 1);
            addLikes(id);

            setAnimate(true);
            setTimeout(() => setAnimate(false), 300);
        }
    };

    return (
        <Flex gap="1" align="center">
            <Box>
                <Link href={blogURL}>
                    <Flex align="center">
                        <LazyAvatar
                            style={{ width: 20, height: 20 }}
                            src={moment.blogInfo.blogAdminMediumImageURL}
                            radius="full"
                        />
                    </Flex>
                </Link>
            </Box>
            <Box>
                <Link size="2" href={blogURL} style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>{moment.blogInfo.name}</Link>
            </Box>
            <Box>
                <Text> · </Text>
            </Box>
            <Box>
                <Text size="2" color="gray" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {createdAtFormatted}
                </Text>
            </Box>
            <Box>
                <Text> · </Text>
            </Box>
            <Box>
                <Flex align="center" gap="1">
                    <style>
                        {`
                        @keyframes like-animation {
                            0% { transform: scale(1); opacity: 1; }
                            50% { transform: scale(1.8); opacity: 0.8; }
                            100% { transform: scale(1); opacity: 1; }
                        }
                        .animate-like {
                            animation: like-animation 0.5s ease-in-out;
                        }
                        `}
                    </style>
                    <HeartFilledIcon className={animate ? 'animate-like' : ''} style={{ color: 'rgb(203, 46, 88)' }} onClick={() => handleIconClick(moment.id)} disabled={liked} />
                    <Text size="2" color="gray" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}>
                        {likeCount}
                    </Text>
                </Flex>
            </Box>
        </Flex>
    )
}