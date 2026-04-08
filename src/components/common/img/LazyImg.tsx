import { useEffect, useRef, useState } from 'react';

export default function LazyImg({ src, alt, style }) {
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
        <div
            ref={ref}
            style={{
                width: "100%",
                height: "100%",
                overflow: "hidden"
            }}
        >
            {visible ? (
                <img
                    src={src}
                    alt={alt}
                    style={{
                        ...style,
                        width: "100%",
                        height: "100%",
                        display: "block",
                        objectFit: style?.objectFit || "cover"
                    }}
                />
            ) : (
                <div style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#f0f0f0"
                }} />
            )}
        </div>
    )
}