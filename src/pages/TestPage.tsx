import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Space, Skeleton, Avatar } from 'antd';
import {
  GlobalOutlined,
  FileTextOutlined,
  EyeOutlined,
  CalendarOutlined,  // 修复：正确图标
} from '@ant-design/icons';

const { Text, Paragraph } = Typography;

interface BlogItem {
  name: string;
  domain: string;
  description: string;
  postCount: number;
  accessCount: number;
  latestPublishedAt: string;
  collectedAt: string;
  latestPosts: { date: string; title: string }[];
  statusOk: boolean;
  avatar: string;
}

// 样例数据
const blogList: BlogItem[] = [
  {
    name: '拾光杂货铺',
    domain: 'blog.example.com',
    description: '以文字记录生活，以代码丈量世界，热爱开源、热爱生活、热爱自由。',
    postCount: 128,
    accessCount: 9652,
    latestPublishedAt: '2026-04-12',
    collectedAt: '2025-06-10',
    latestPosts: [],
    statusOk: true,
    avatar: 'https://picsum.photos/seed/blog1/200/200'
  },
  {
    name: '星途技术笔记',
    domain: 'tech.starpath.cn',
    description: '专注前端架构、云原生、效率工具分享，做有深度的技术内容。',
    postCount: 206,
    accessCount: 18690,
    latestPublishedAt: '2026-04-14',
    collectedAt: '2025-05-20',
    latestPosts: [],
    statusOk: true,
    avatar: 'https://picsum.photos/seed/blog2/200/200'
  },
  {
    name: '远山生活集',
    domain: 'life.yuanshan.me',
    description: '生活随笔、旅行游记、读书感悟，慢下来，感受生活本身。',
    postCount: 95,
    accessCount: 6240,
    latestPublishedAt: '2026-04-10',
    collectedAt: '2025-07-02',
    latestPosts: [],
    statusOk: true,
    avatar: 'https://picsum.photos/seed/blog3/200/200'
  },
  {
    name: '云起开发日志',
    domain: 'dev.cloudrise.top',
    description: '全栈开发日常、踩坑记录、技术复盘，持续学习，持续进步。',
    postCount: 167,
    accessCount: 12360,
    latestPublishedAt: '2026-04-15',
    collectedAt: '2025-04-15',
    latestPosts: [],
    statusOk: true,
    avatar: 'https://picsum.photos/seed/blog4/200/200'
  }
];

const BlogCard: React.FC<{ item: BlogItem }> = ({ item }) => {
  return (
    <Card
      hoverable
      bordered={false}
      style={{
        borderRadius: 20,
        background: '#ffffff',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        height: '100%'
      }}
      bodyStyle={{ padding: 32 }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.06)';
      }}
    >
      {/* 头部：头像 + 名称 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
        <Avatar
          size={70}
          src={item.avatar}
          style={{
            borderRadius: 16,
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)'
          }}
        />
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: '#1e293b',
              marginBottom: 6
            }}
          >
            {item.name}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748b', fontSize: 14 }}>
            <GlobalOutlined />
            <span>{item.domain}</span>
          </div>
        </div>
      </div>

      {/* 描述 */}
      <Paragraph
        style={{
          fontSize: 15,
          color: '#475569',
          lineHeight: 1.8,
          marginBottom: 28
        }}
      >
        {item.description}
      </Paragraph>

      {/* 统计信息 */}
      <Row gutter={[16, 16]} align="middle">
        <Col xs={8}>
          <Space direction="vertical" size={4} align="center" style={{ width: '100%' }}>
            <Text style={{ fontSize: 12, color: '#94a3b8' }}>文章总数</Text>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <FileTextOutlined style={{ color: '#3b82f6' }} />
              <Text style={{ fontSize: 18, fontWeight: 600, color: '#0f172a' }}>
                {item.postCount}
              </Text>
            </div>
          </Space>
        </Col>
        <Col xs={8}>
          <Space direction="vertical" size={4} align="center" style={{ width: '100%' }}>
            <Text style={{ fontSize: 12, color: '#94a3b8' }}>累计访问</Text>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <EyeOutlined style={{ color: '#10b981' }} />
              <Text style={{ fontSize: 18, fontWeight: 600, color: '#0f172a' }}>
                {item.accessCount.toLocaleString()}
              </Text>
            </div>
          </Space>
        </Col>
        <Col xs={8}>
          <Space direction="vertical" size={4} align="center" style={{ width: '100%' }}>
            <Text style={{ fontSize: 12, color: '#94a3b8' }}>最近更新</Text>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <CalendarOutlined style={{ color: '#f59e0b' }} />
              <Text style={{ fontSize: 15, fontWeight: 500, color: '#0f172a' }}>
                {item.latestPublishedAt}
              </Text>
            </div>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

const BlogListPage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{ background: '#f8fafc', minHeight: '100vh', padding: 40 }}>
        <Row gutter={[32, 32]}>
          {[1, 2, 3, 4].map((key) => (
            <Col xs={24} md={12} key={key}>
              <Skeleton
                active
                avatar={{ size: 70, shape: 'square' }}
                paragraph={{ rows: 4 }}
                style={{ borderRadius: 20, padding: 32 }}
              />
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: 40 }}>
      <Row gutter={[32, 32]}>
        {blogList.map((item, index) => (
          <Col xs={24} md={12} key={index}>
            <BlogCard item={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BlogListPage;