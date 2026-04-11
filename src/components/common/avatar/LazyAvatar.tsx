import React from 'react';
import { Avatar, Skeleton } from 'antd';
import { useEffect, useRef, useState } from 'react';

export default function LazyAvatar({ style, src, shape = 'circle', size = 28 }) {
    const [visible, setVisible] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
                observer.disconnect();
            }
        });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref}>
            {visible ? (
                <Avatar
                    style={style}
                    src={src}
                    shape={shape}
                    size={size}
                    onLoad={() => setLoaded(true)}
                />
            ) : (
                <div style={{ ...style, backgroundColor: '#f0f0f0', borderRadius: '50%' }} />
            )}
        </div>
    )
}