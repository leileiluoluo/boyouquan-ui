import React, { useState, useEffect, useRef } from 'react';
import { Spin, Empty } from 'antd';
import { request } from '@utils/request';
import { getGoAddress } from '@utils/PageAddressUtil';

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
    const shouldScrollRef = useRef(true); // 改用 shouldScroll，不再区分 hover/touch

    const SCROLL_SPEED = 0.5; // 加快到 1px/帧，移动端更明显

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
            if (shouldScrollRef.current) {
                container.scrollLeft += SCROLL_SPEED;
                // 循环滚动
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

    // 鼠标（PC）和触摸（手机）共用暂停逻辑
    const handlePause = () => {
        shouldScrollRef.current = false;
    };
    const handleResume = () => {
        shouldScrollRef.current = true;
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
                            paddingBottom: '4px', // 减小内边距，避免高度计算问题
                            cursor: 'grab',
                            WebkitOverflowScrolling: 'touch', // 移动端平滑滚动
                        }}
                        className="horizontal-scroll"
                        onMouseEnter={handlePause}
                        onMouseLeave={handleResume}
                        onTouchStart={handlePause}
                        onTouchEnd={handleResume}
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
                                    onClick={() => window.open(getGoAddress(item.blogInfo.address), '_blank')}
                                    onMouseEnter={(e) =>
                                        (e.currentTarget.style.transform = 'scale(1.02)')
                                    }
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.transform = 'scale(1)')
                                    }
                                />
                                <div className="blog-name">{`${item.blogInfo.name}的随拍`}</div>
                                <div className="image-description">{item.description}</div>
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
          background: rgba(243, 238, 238, 0.85);
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
          background: rgba(243, 238, 238, 0.85);
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

        /* 悬浮/触摸时显示信息 */
        .moment-image-wrapper:hover .blog-name,
        .moment-image-wrapper:hover .image-description {
          opacity: 1;
        }
        /* 移动端使用 touch 时，通过父容器状态来显示描述（可选） */
        .moment-image-wrapper:active .blog-name,
        .moment-image-wrapper:active .image-description {
          opacity: 1;
        }
      `}</style>
        </div>
    );
};

export default MomentsGallery;