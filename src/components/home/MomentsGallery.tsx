import React, { useState, useEffect, useRef } from 'react';
import { Spin, Empty } from 'antd';
import { request } from '@utils/request';

interface BlogInfo {
    name: string;
    blogAdminMediumImageURL: string;
    address: string;
}

interface MomentItem {
    id: number;
    description: string;
    imageURL: string;
    createdAt: string;
    likeCount: number;
    blogInfo: BlogInfo;
}

interface MomentsRes {
    pageNo: number;
    pageSize: number;
    results: MomentItem[];
    total: number;
}

const MomentsGallery: React.FC = () => {
    const [list, setList] = useState<MomentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number | null>(null);
    const isHoveringRef = useRef(false);
    const SCROLL_SPEED = 0.5;

    useEffect(() => {
        const fetchMoments = async () => {
            try {
                setLoading(true);
                const url = `/api/moments?page=1&size=6`;
                const data: MomentsRes = await request(url);
                setList(data.results || []);
            } catch (err) {
                console.error('随手一拍数据请求失败', err);
            } finally {
                setLoading(false);
            }
        };
        fetchMoments();
    }, []);

    const startAutoScroll = () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        const container = scrollContainerRef.current;
        if (!container) return;

        const scrollStep = () => {
            if (!container) return;
            if (!isHoveringRef.current) {
                container.scrollLeft += SCROLL_SPEED;
                if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
                    container.scrollLeft = 0;
                }
            }
            animationRef.current = requestAnimationFrame(scrollStep);
        };
        animationRef.current = requestAnimationFrame(scrollStep);
    };

    const stopAutoScroll = () => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }
    };

    useEffect(() => {
        if (list.length === 0) return;
        startAutoScroll();
        return () => stopAutoScroll();
    }, [list]);

    const handleMouseEnter = () => {
        isHoveringRef.current = true;
    };
    const handleMouseLeave = () => {
        isHoveringRef.current = false;
    };

    return (
        <div style={{ margin: '8px 0 2px 0' }}>
            <Spin spinning={loading}>
                {list.length === 0 ? (
                    <Empty description="暂无随手一拍内容" />
                ) : (
                    <div
                        ref={scrollContainerRef}
                        style={{
                            display: 'flex',
                            overflowX: 'auto',
                            gap: '12px',
                            paddingBottom: '8px',
                            cursor: 'grab',
                        }}
                        className="horizontal-scroll"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {list.map((item) => (
                            <div
                                key={item.id}
                                className="moment-image-wrapper"
                                style={{
                                    position: 'relative',
                                    flexShrink: 0,
                                    width: '160px',
                                    height: '160px',
                                }}
                            >
                                <img
                                    src={item.imageURL}
                                    alt={item.description}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s ease',
                                        display: 'block',
                                    }}
                                    onClick={() => window.open(item.blogInfo.address, '_blank')}
                                    onMouseEnter={(e) =>
                                        (e.currentTarget.style.transform = 'scale(1.02)')
                                    }
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.transform = 'scale(1)')
                                    }
                                />
                                {/* 顶部显示博客名 */}
                                <div className="blog-name">
                                    {`${item.blogInfo.name}的随拍`}
                                </div>
                                {/* 底部显示描述 */}
                                <div className="image-description">
                                    {item.description}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Spin>

            <style>{`
        /* 隐藏滚动条 */
        .horizontal-scroll::-webkit-scrollbar {
          display: none;
        }
        .horizontal-scroll {
          scrollbar-width: none;
        }

        /* 顶部博客名悬浮层 */
        .moment-image-wrapper .blog-name {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(243, 238, 238, 0.65);
          color: #1f1e1e;
          font-size: 12px;
          font-weight: 500;
          padding: 6px 8px;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          border-radius: 8px 8px 0 0;
          backdrop-filter: blur(4px);
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
        }

        /* 底部描述悬浮层 */
        .moment-image-wrapper .image-description {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(243, 238, 238, 0.65);
          color: #1f1e1e;
          font-size: 12px;
          padding: 6px 8px;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          border-radius: 0 0 8px 8px;
          backdrop-filter: blur(4px);
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
        }

        /* 悬浮时同时显示顶部博客名和底部描述 */
        .moment-image-wrapper:hover .blog-name,
        .moment-image-wrapper:hover .image-description {
          opacity: 1;
        }
      `}</style>
        </div>
    );
};

export default MomentsGallery;