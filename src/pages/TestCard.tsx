import React from 'react';
import {
  Card, Avatar, Typography, Space, Flex, theme,
} from 'antd';
import {
  UserOutlined, ClockCircleOutlined, EyeOutlined,
  ShareAltOutlined, MoreOutlined, StarOutlined,
} from '@ant-design/icons';
import { PCOnly, MobileOnly } from '@components/common/Responsive';

const { Title, Paragraph, Text } = Typography;

// ====================== 类型定义 ======================
export interface ArticleCardProps {
  // 用户信息
  user: {
    nickname: string;
    avatar?: string;
    performance: string;
    views: number;
  };
  // 文章信息
  article: {
    title: string;
    content: string;
    publishTime: string;
    readInfo: string;
  };
  // 可选样式
  style?: React.CSSProperties;
}

// ====================== 通用卡片组件 ======================
const ArticleCard: React.FC<ArticleCardProps> = ({ user, article, style }) => {
  const { token } = theme.useToken();

  return (
    <Card
      style={{
        maxWidth: 1100,
        margin: '20px auto',
        border: 'none',
        backgroundColor: 'transparent',
        ...style,
      }}
      bordered={false}
    >
      <Flex align="start">

        {/* PC 端左侧用户栏 */}
        <PCOnly>
          <Flex vertical align="center" gap={12} style={{ minWidth: 100, marginRight: 20 }}>
            <Avatar size={80} icon={<UserOutlined />} src={user.avatar} />
            <Text style={{ fontSize: 16, fontWeight: 500, color: token.colorPrimary }}>
              {user.nickname}
            </Text>
            <Space size={4}>
              <StarOutlined style={{ color: '#faad14' }} />
              <Text type="secondary">{user.performance}</Text>
            </Space>
            <Space size={4}>
              <EyeOutlined />
              <Text type="secondary">{user.views}</Text>
            </Space>
          </Flex>
        </PCOnly>

        {/* 右侧内容区 */}
        <Flex vertical flex={1} style={{ position: 'relative' }}>
          <div
            style={{
              padding: '20px 24px',
              border: `1px solid ${token.colorBorder}`,
              borderRadius: 12,
              backgroundColor: token.colorBgContainer,
            }}
          >
            {/* 手机端标题 + 小头像 */}
            <MobileOnly>
              <Flex align="center" gap={8} style={{ marginBottom: 16 }}>
                <Avatar size={32} icon={<UserOutlined />} src={user.avatar} />
                <Title level={5} style={{ margin: 0, color: token.colorPrimary, fontSize: 20 }}>
                  {article.title}
                </Title>
              </Flex>
            </MobileOnly>

            {/* PC 端标题 */}
            <PCOnly>
              <Title level={5} style={{ margin: 0, color: token.colorPrimary, fontSize: 20, marginBottom: 16 }}>
                {article.title}
              </Title>
            </PCOnly>

            {/* 内容 */}
            <Paragraph style={{ lineHeight: 1.7, marginBottom: 16 }}>
              {article.content}
            </Paragraph>

            {/* ====================== 底部信息：永远一行 ====================== */}
            <Flex
              justify="space-between"
              align="center"
              style={{
                flexWrap: 'nowrap',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              <Space size={12} style={{ flexShrink: 0 }}>
                <Space size={4}>
                  <ClockCircleOutlined />
                  <Text type="secondary">{article.publishTime}</Text>
                </Space>
                <Text type="secondary">{article.readInfo}</Text>
              </Space>

              <Space size={16} style={{ flexShrink: 0 }}>
                <ShareAltOutlined />
                <MoreOutlined />
              </Space>
            </Flex>
          </div>

          {/* PC 端尖角 */}
          <PCOnly>
            <div style={{ position: 'absolute', top: 40, left: -10, width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderRight: `10px solid ${token.colorBorder}` }} />
            <div style={{ position: 'absolute', top: 40, left: -9, width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderRight: `10px solid ${token.colorBgContainer}` }} />
          </PCOnly>
        </Flex>
      </Flex>
    </Card>
  );
};

export default ArticleCard;