// @components/common/LazyAvatar.tsx
import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarProps } from 'antd';

// 继承 Antd Avatar 所有属性，完全兼容
const LazyAvatar: React.FC<AvatarProps> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = avatarRef.current;
    if (!el) return;

    // 监听进入视口才加载
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(el); // 只触发一次
          }
        });
      },
      { threshold: 0 } // 刚进入视口就触发
    );

    observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  // 核心：不可见时不传递 src，彻底不发请求
  const finalProps = {
    ...props,
    src: isVisible ? props.src : undefined,
  };

  return <Avatar ref={avatarRef} {...finalProps} />;
};

export default LazyAvatar;