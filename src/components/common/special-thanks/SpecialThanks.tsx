import { theme, Card, Flex, Typography, Tooltip, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import specialThanks from '../../../json/specialThanks.json';
import { useState, useEffect, useRef } from 'react';

const { Title } = Typography;
const { useToken } = theme;

interface SpecialThanksProps {
    isHome: boolean;
}

// 懒加载 Avatar 组件
const LazyAvatar = ({ src, icon, size, shape, style, ...rest }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = avatarRef.current;
    if (!el) return;

    // 监听元素是否进入视口
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // 进入视口才加载图片
            observer.unobserve(el); // 加载后取消监听
          }
        });
      },
      { threshold: 0.01 } // 只要露出一点点就触发
    );

    observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <Avatar
      ref={avatarRef}
      size={size}
      shape={shape}
      // 只有可见时才赋值 src，真正懒加载
      src={isVisible ? src : undefined}
      icon={icon}
      style={style}
      {...rest}
    />
  );
};

export default function SpecialThanks({ isHome }: SpecialThanksProps) {
    if (!isHome) return null;

    const { token } = useToken();

    return (
        <Card style={{ marginTop: 20 }}>
            <Flex vertical align="center" gap={16}>
                <Title
                    level={5}
                    style={{
                        margin: 0,
                        color: token.colorText,
                    }}
                >
                    特别赞助
                </Title>

                <Flex wrap="wrap" gap={10} justify="center" align="center">
                    {specialThanks.map((item) => (
                        <Tooltip key={item.name} title={`${item.name}`} styles={{ root: { fontSize: 12 } }}>
                            <a
                                href={item.link || 'javascript:;'}
                                rel="noopener noreferrer"
                                style={{ display: 'inline-block' }}
                            >
                                {/* 替换成懒加载 Avatar */}
                                <LazyAvatar
                                    size={26}
                                    shape="circle"
                                    src={item.avatar}
                                    icon={<UserOutlined />}
                                    style={{
                                        border: '1px solid #e5e7eb',
                                        transition: 'all 0.2s',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.08)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                />
                            </a>
                        </Tooltip>
                    ))}

                    {/* 更优雅的 + 号 */}
                    <a
                        href="/sponsor"
                        rel="noopener noreferrer"
                        style={{ display: 'inline-block' }}
                    >
                        <Avatar
                            size={26}
                            shape="circle"
                            style={{
                                backgroundColor: '#f9fafb',
                                color: '#6b7280',
                                border: '1px dashed #d1d5db',
                            }}
                        >
                            +
                        </Avatar>
                    </a>
                </Flex>
            </Flex>
        </Card>
    );
}