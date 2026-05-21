import React, { useState, useEffect, useRef } from 'react';
import { Spin, Empty } from 'antd';
import { request } from '@utils/request';
import { getMomentsAddress } from '@utils/PageAddressUtil';

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
    const contentRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number | null>(null);
    const isPausedRef = useRef(false);

    const SCROLL_SPEED = 0.5;

    useEffect(() => {
        const fetchMoments = async () => {
            try {
                setLoading(true);
                const url = `/api/moments?page=1&size=10`;
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

    // 使用 scrollLeft 实现无限循环的核心逻辑
    useEffect(() => {
        if (list.length === 0 || !scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const content = contentRef.current;
        if (!content) return;

        // 获取单个图片的宽度（包括 gap）
        const getItemWidth = () => {
            const firstItem = content.children[0] as HTMLElement;
            if (!firstItem) return 130; // 120px + 8px gap
            const style = window.getComputedStyle(firstItem);
            const marginLeft = parseFloat(style.marginLeft) || 0;
            const marginRight = parseFloat(style.marginRight) || 0;
            return firstItem.offsetWidth + marginLeft + marginRight + 8; // 8px gap
        };

        // 复制内容到容器末尾，实现无限循环
        const setupInfiniteScroll = () => {
            // 清空之前添加的克隆
            const clones = content.querySelectorAll('.clone-item');
            clones.forEach(clone => clone.remove());

            // 克隆所有原始项并添加到末尾
            const originalItems = Array.from(content.children);
            originalItems.forEach((item, index) => {
                const clone = item.cloneNode(true) as HTMLElement;
                clone.classList.add('clone-item');
                // 移除克隆项上的事件监听器（通过重新绑定）
                const img = clone.querySelector('img');
                if (img) {
                    const newImg = img.cloneNode(true) as HTMLImageElement;
                    img.parentNode?.replaceChild(newImg, img);
                }
                content.appendChild(clone);
            });
        };

        setupInfiniteScroll();

        // 滚动动画
        const startAutoScroll = () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);

            const scrollStep = () => {
                if (!container || isPausedRef.current) {
                    animationRef.current = requestAnimationFrame(scrollStep);
                    return;
                }

                container.scrollLeft += SCROLL_SPEED;

                // 当滚动超过原始内容的宽度时，重置到对应的位置
                const originalWidth = getItemWidth() * list.length;
                if (container.scrollLeft >= originalWidth) {
                    container.scrollLeft = container.scrollLeft - originalWidth;
                }

                animationRef.current = requestAnimationFrame(scrollStep);
            };

            animationRef.current = requestAnimationFrame(scrollStep);
        };

        startAutoScroll();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [list]);

    const handlePause = () => {
        isPausedRef.current = true;
    };

    const handleResume = () => {
        isPausedRef.current = false;
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
                            overflowX: 'auto',
                            overflowY: 'hidden',
                            cursor: 'grab',
                            WebkitOverflowScrolling: 'touch',
                            scrollBehavior: 'auto',
                        }}
                        className="horizontal-scroll"
                        onMouseEnter={handlePause}
                        onMouseLeave={handleResume}
                        onTouchStart={handlePause}
                        onTouchEnd={handleResume}
                    >
                        <div
                            ref={contentRef}
                            style={{
                                display: 'flex',
                                gap: '8px',
                                width: 'fit-content',
                            }}
                        >
                            {list.map((item) => (
                                <div
                                    key={item.id}
                                    className="moment-image-wrapper"
                                    style={{
                                        position: 'relative',
                                        flexShrink: 0,
                                        width: '120px',
                                        height: '120px',
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
                                        onClick={() => window.open(getMomentsAddress())}
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
                    </div>
                )}
            </Spin>

            <style>{`
        .horizontal-scroll::-webkit-scrollbar {
          display: none;
        }
        .horizontal-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

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

        .moment-image-wrapper:hover .blog-name,
        .moment-image-wrapper:hover .image-description {
          opacity: 1;
        }
        
        @media (max-width: 768px) {
          .moment-image-wrapper:active .blog-name,
          .moment-image-wrapper:active .image-description {
            opacity: 1;
          }
        }
      `}</style>
        </div>
    );
};

export default MomentsGallery;