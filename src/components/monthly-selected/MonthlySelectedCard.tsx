import React from 'react';
import { Card, Flex, Image, Typography } from 'antd';
import PostCard from '../post-card/PostCard';
import { getAbstractAddress, getGoAddress } from '../../utils/PageAddressUtil';
import LazyImg from '../common/img/LazyImg';

const { Link } = Typography;

export default function MonthlySelectedCard({ postInfo, showImage }) {
    const linkURL = getGoAddress(postInfo.link);
    const abstractURL = getAbstractAddress(postInfo.link);

    return (
        <Card style={{ width: '100%' }}>
            <Flex vertical gap={8}>
                {postInfo.hasImage && showImage && (
                    <div
                        style={{
                            flexShrink: 0,
                            backgroundColor: "#f3f3f3",
                            borderRadius: "4px",
                            overflow: "hidden",
                            aspectRatio: "16 / 9",
                        }}
                    >
                        <Link 
                            target="_blank" 
                            href={postInfo.blogStatusOk ? linkURL : abstractURL}
                        >
                            <LazyImg
                                src={postInfo.imageURL}
                                alt={postInfo.title}
                                style={{ 
                                    width: "100%", 
                                    height: "100%", 
                                    objectFit: "cover", 
                                    animation: "autoClear 1s ease-in-out forwards", 
                                    transform: "scale(1.1)", 
                                    filter: "blur(2px)" 
                                }} 
                            />
                        </Link>
                    </div>
                )}

                <PostCard
                    blogDomainName={postInfo.blogDomainName}
                    blogName={postInfo.blogName}
                    blogStatusOk={postInfo.blogStatusOk}
                    blogAdminMediumImageURL={postInfo.blogAdminMediumImageURL}
                    link={postInfo.link}
                    title={postInfo.title}
                    description={postInfo.description}
                    publishedAt={postInfo.publishedAt}
                    linkAccessCount={postInfo.linkAccessCount} />
            </Flex>
        </Card>
    );
}