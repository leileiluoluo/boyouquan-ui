import React from 'react';
import {
  Layout, Card, Avatar, Typography, Tag, Divider, Button,
  Space, Row, Col, Statistic, Image
} from 'antd';
import {
  LikeOutlined, StarOutlined, ShareAltOutlined,
  EyeOutlined, CalendarOutlined, UserOutlined
} from '@ant-design/icons';
import 'antd/dist/reset.css';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const TestPage = () => {
  const blogData = {
    author: {
      name: '前端架构师',
      avatar: 'https://picsum.photos/seed/avatar/120/120',
      desc: '专注前端开发、架构设计与技术分享',
      fans: 1258,
      articles: 86,
      likes: 5268
    },
    article: {
      title: '深入理解 React 状态管理与性能优化最佳实践',
      cover: 'https://picsum.photos/seed/blogcover/1200/400',
      date: '2025-01-15',
      views: 12580,
      tags: ['React', '前端架构', '性能优化', '状态管理'],
      content: `
React 作为目前最流行的前端框架之一，状态管理是其核心灵魂。在大型项目中，合理的状态管理方案不仅能提升开发效率，更能直接决定应用的性能表现。

本文将从基础的 useState/useReducer 出发，深入剖析 Redux、Zustand、Jotai 等主流状态库的适用场景，并结合实际项目案例，讲解如何避免不必要的重渲染、实现组件精准更新，让你的 React 应用达到极致性能。

## 一、React 状态设计原则
1. 单一数据源：优先提升状态层级，避免状态冗余
2. 状态扁平化：减少嵌套数据结构，提升读写性能
3. 不可变数据：遵循 React 数据不可变原则，保证状态可预测

## 二、性能优化核心手段
- 使用 memo、useMemo、useCallback 缓存组件与计算值
- 状态分片：将大状态拆分为独立小状态，减少渲染范围
- 虚拟列表：处理长列表渲染，降低 DOM 节点压力
- 懒加载与代码分割：按需加载资源，提升首屏速度

真正的高性能应用，不是靠优化技巧堆砌，而是源于合理的架构设计与状态规划。掌握这些核心思想，无论面对多复杂的项目，都能轻松应对。
      `
    }
  };

  return (
    <Content style={{ width: '100%', margin: '30px auto', padding: '0 16px' }}>
        <Row gutter={32}>
          {/* 左侧个人信息 */}
          <Col xs={24} md={6}>
            <Card 
              bordered={false} 
              style={{ 
                borderRadius: 12, 
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                position: 'sticky',
                top: 30
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <Avatar 
                  size={100} 
                  src={blogData.author.avatar}
                  style={{ border: '4px solid #e6f7ff' }}
                />
                <Title level={4} style={{ marginTop: 12, marginBottom: 4 }}>
                  {blogData.author.name}
                </Title>
                <Paragraph type="secondary" style={{ fontSize: 13 }}>
                  {blogData.author.desc}
                </Paragraph>
              </div>

              <Divider style={{ margin: '12px 0' }} />

              <Row gutter={16} style={{ textAlign: 'center', marginBottom: 16 }}>
                <Col span={8}>
                  <Statistic title="文章" value={blogData.author.articles} />
                </Col>
                <Col span={8}>
                  <Statistic title="粉丝" value={blogData.author.fans} />
                </Col>
                <Col span={8}>
                  <Statistic title="获赞" value={blogData.author.likes} />
                </Col>
              </Row>

              <Button type="primary" block size="large" style={{ borderRadius: 6 }}>
                关注作者
              </Button>
            </Card>
          </Col>

          {/* 右侧文章 */}
          <Col xs={24} md={18}>
            
          </Col>
        </Row>
      </Content>
  );
};

export default TestPage;