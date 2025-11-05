import React from 'react';
import { Avatar } from '@radix-ui/themes';
import { useEffect, useRef, useState } from 'react';

export default function LazyAvatar({ style, src, radius }) {
    const [visible, setVisible] = useState(false);
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
                    radius={radius}
                />
            ) : (
                <Avatar
                    style={style}
                    radius={radius} />
            )}
        </div>
    )
}