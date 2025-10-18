import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

import sponsors from '../../json/sponsor.json';

const DISPLAY_COUNT = 3;
const RUN_DURATION = 2;

export default function SponsorMotion() {
    const firstItem = {
        blogName: '站长',
        link: 'https://leileiluoluo.com/',
        sponsoredAt: '2023/07/01',
        sponsoredMoney: '网站启动',
    };

    // add one more item
    const newSponsors = [firstItem, ...sponsors];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1 < newSponsors.length ? prev + 1 : prev));
        }, RUN_DURATION * 1000);
        return () => clearInterval(timer);
    }, []);

    const visibleSponsors = newSponsors.slice(
        Math.max(0, currentIndex - DISPLAY_COUNT + 1),
        currentIndex + 1
    );

    const timelineWidth = 400;
    const step = timelineWidth / (DISPLAY_COUNT - 1); // px per step

    // 用来控制时间轴纹理位置
    const controls = useAnimation();

    // 当 currentIndex 变化时，让背景纹理在 RUN_DURATION 内向右推进 step 像素
    useEffect(() => {
        // 计算目标偏移（向右流动 => backgroundPositionX 正值增长）
        const targetPx = `${currentIndex * step}px`;
        controls.start({
            backgroundPositionX: targetPx,
            transition: {
                duration: RUN_DURATION,
                ease: 'linear',
            },
        });
    }, [currentIndex, controls, step]);

    return (
        <div
            style={{
                position: 'relative',
                width: 420,
                height: 126,
                overflow: 'hidden',
                padding: 10,
            }}
        >
            {/* 时间线：加动态纹理（纹理向右移动） */}
            <motion.div
                animate={controls}
                initial={{ backgroundPositionX: '0px' }}
                style={{
                    position: 'absolute',
                    top: 40,
                    left: 0,
                    width: timelineWidth,
                    height: 6,
                    borderRadius: 3,
                    // 纹理：短条纹并重复（横向），backgroundPositionX 会控制它左右移动
                    backgroundImage:
                        'repeating-linear-gradient(90deg, #d6d6d6 0px, #d6d6d6 8px, #eaeaea 8px, #eaeaea 16px)',
                    backgroundSize: '200px 6px',
                }}
            />

            {/* 时间刻度和时间文字 */}
            {visibleSponsors.map((sponsor, i) => {
                const isCurrent = i === visibleSponsors.length - 1;
                return (
                    <div
                        key={sponsor.blogName + i}
                        style={{
                            position: 'absolute',
                            top: 14,
                            left: 50 + timelineWidth - i * step - 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            style={{
                                fontSize: 12,
                                color: isCurrent ? '#5a090bff' : '#555',
                                fontWeight: isCurrent ? 'bold' : 'normal',
                                whiteSpace: 'nowrap',
                                textAlign: 'center',
                                marginBottom: 2,
                            }}
                        >
                            {sponsor.sponsoredAt}
                        </div>
                        <div
                            style={{
                                width: 2,
                                height: 12,
                                background: isCurrent ? '#5a090bff' : '#333',
                            }}
                        />
                    </div>
                );
            })}

            {/* 跑者 */}
            {visibleSponsors.map((sponsor, i) => {
                const isFinished = i < visibleSponsors.length - 1;
                const baseX = 50 + timelineWidth - i * step;

                // 已完成的人做微弱“向后走/摆动”效果（步调与 RUN_DURATION 一致）
                const finishedAnimate = {
                    x: [baseX, baseX - 6, baseX], // 向左退一点再回到原位
                    // 小幅垂直摆动也能让动作更自然
                    y: [0, -3, 0],
                };

                // 当前（正在“跑”的）人做轻微上下跳（跑步感）
                const currentAnimate = {
                    y: [0, -8, 0],
                };

                return (
                    <motion.div
                        key={sponsor.blogName}
                        initial={{ x: baseX }}
                        animate={isFinished ? finishedAnimate : currentAnimate}
                        transition={
                            isFinished
                                ? {
                                    duration: RUN_DURATION,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }
                                : {
                                    duration: 0.6,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }
                        }
                        style={{
                            position: 'absolute',
                            top: 50, // 人和旗帜在时间线下方
                            fontSize: 30,
                            color: isFinished ? '#888' : '#000',
                            filter: isFinished ? 'grayscale(100%)' : 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <div style={{ position: 'relative' }}>
                            {/* 跑者 emoji */}
                            <div style={{ lineHeight: 1 }}>{'🏃‍♂️'}</div>

                            {/* 只有当前持旗者显示旗帜（保持原逻辑） */}
                            {!isFinished && (
                                <span
                                    style={{
                                        position: 'absolute',
                                        top: -16, // 调整到手中位置
                                        left: 5, // 手的位置偏右一点以对齐 emoji
                                        fontSize: 20,
                                    }}
                                >
                                    🚩
                                </span>
                            )}
                        </div>
                        <div style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginTop: 2 }}>
                            <a href={sponsor.link} style={{ color: isFinished ? '#888' : '#000', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">{sponsor.blogName}</a>
                            <br />
                            <span style={{ fontSize: 12, color: "#555", fontWeight: "normal" }}>{sponsor.sponsoredMoney}</span>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
