import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import sponsors from '../../json/sponsor.json';

const DISPLAY_COUNT = 3;
const RUN_DURATION = 2;

export default function SponsorMotion() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1 < sponsors.length ? prev + 1 : prev));
        }, RUN_DURATION * 1000);
        return () => clearInterval(timer);
    }, []);

    const visibleSponsors = sponsors.slice(
        Math.max(0, currentIndex - DISPLAY_COUNT + 1),
        currentIndex + 1
    );

    const timelineWidth = 400;
    const step = timelineWidth / (DISPLAY_COUNT - 1);

    return (
        <div
            style={{
                position: "relative",
                width: 420,
                height: 126, // 收窄高度
                overflow: "hidden",
                padding: 10
            }}
        >
            {/* 时间线 */}
            <div
                style={{
                    position: "absolute",
                    top: 40,
                    left: 0,
                    width: timelineWidth,
                    height: 4,
                    background: "#ddd",
                    borderRadius: 2,
                }}
            />

            {/* 时间刻度和时间文字 */}
            {visibleSponsors.map((sponsor, i) => {
                const isCurrent = i === visibleSponsors.length - 1;
                return (
                    <div
                        key={sponsor.blogName + i}
                        style={{
                            position: "absolute",
                            top: 14,
                            left: 50 + timelineWidth - i * step - 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                fontSize: 12,
                                color: isCurrent ? "#5a090bff" : "#555",
                                fontWeight: isCurrent ? "bold" : "normal",
                                whiteSpace: "nowrap",
                                textAlign: "center",
                                marginBottom: 2,
                            }}
                        >
                            {sponsor.sponsoredAt}
                        </div>
                        <div
                            style={{
                                width: 2,
                                height: 12,
                                background: isCurrent ? "#5a090bff" : "#333",
                            }}
                        />
                    </div>
                );
            })}

            {/* 跑者 */}
            {visibleSponsors.map((sponsor, i) => {
                const isFinished = i < visibleSponsors.length - 1;
                return (
                    <motion.div
                        key={sponsor.blogName}
                        initial={{ x: 50 + timelineWidth - i * step }}
                        animate={{ x: 50 + timelineWidth - i * step }}
                        transition={{ duration: RUN_DURATION, ease: "linear" }}
                        style={{
                            position: "absolute",
                            top: 50, // 人和旗帜在时间线下方
                            fontSize: 30,
                            color: isFinished ? "#888" : "#000",
                            filter: isFinished ? "grayscale(100%)" : "none",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <div style={{ position: "relative" }}>
                            🏃‍♂️
                            {!isFinished && (
                                <span
                                    style={{
                                        position: "absolute",
                                        top: -12, // 调整到手中位置
                                        left: 4,
                                        fontSize: 20,
                                    }}
                                >
                                    🚩
                                </span>
                            )}
                        </div>
                        <div style={{ fontSize: 12, fontWeight: "bold", textAlign: "center", marginTop: 2 }}>
                            <a href={sponsor.link} style={{ color: isFinished ? "#888" : "#000", textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">{sponsor.blogName}</a>
                            <br />
                            <span style={{ fontSize: 12, color: "#555", fontWeight: "normal" }}>{sponsor.sponsoredMoney}</span>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
