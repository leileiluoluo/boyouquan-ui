import React from 'react';
import { theme, Flex, Typography, Avatar, Space, Tooltip, Card } from 'antd';
import {
  ClockCircleOutlined,
  EyeOutlined,
  ShareAltOutlined,
  UserOutlined
} from '@ant-design/icons';
import { getAbstractAddress, getBlogAddress, getGoAddress } from '../../utils/PageAddressUtil';
import LazyImg from '../common/img/LazyImg';
import { formatDateStr } from '@utils/DateUtil';

const { Title, Link, Paragraph, Text: AntText } = Typography;
const { useToken } = theme;

export default function MonthlySelectedCard({ postInfo, showImage }) {
  const { token } = useToken();
  const blogURL = getBlogAddress(postInfo.blogDomainName);
  const linkURL = getGoAddress(postInfo.link);
  const abstractURL = getAbstractAddress(postInfo.link);
  const publishedAtFormatted = formatDateStr(postInfo.publishedAt, true);

  // ==============================================
  // hasImage = true → 展示大图卡片（自动用 imageURL）
  // ==============================================
  if (showImage && postInfo.hasImage && postInfo.imageURL) {
    return (
      <Card
        hoverable
        style={{ borderRadius: 16, overflow: 'hidden' }}
        cover={
          <div style={{ height: 240, overflow: 'hidden' }}>
            <LazyImg
              src={postInfo.imageURL}
              alt={postInfo.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        }
      >
        <Flex vertical gap={12}>
          <Link href={linkURL} target="_blank">
            <Title level={5} style={{ margin: 0, fontWeight: 600 }} ellipsis>
              {postInfo.title}
            </Title>
          </Link>

          <Paragraph
            ellipsis={{ rows: 2 }}
            style={{ color: token.colorTextSecondary, margin: 0, minHeight: 44 }}
          >
            {postInfo.description}
          </Paragraph>

          <Flex justify="space-between" align="center" wrap="wrap" gap={8}>
            <Flex align="center" gap={10}>
              <Avatar size={24} src={postInfo.blogAdminMediumImageURL} icon={<UserOutlined />} />
              <AntText style={{ fontSize: 13, fontWeight: 500 }}>{postInfo.blogName}</AntText>
            </Flex>

            <Flex gap={16}>
              <Tooltip title="发布时间">
                <Space size={4} align="center" style={{ fontSize: 12 }}>
                  <ClockCircleOutlined />
                  {publishedAtFormatted}
                </Space>
              </Tooltip>

              <Tooltip title="阅读量">
                <Space size={4} align="center" style={{ fontSize: 12 }}>
                  <EyeOutlined />
                  {postInfo.linkAccessCount}
                </Space>
              </Tooltip>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    );
  }

  // ==============================================
  // 无图文章 → 展示精致小卡片
  // ==============================================
  return (
    <Card
      hoverable
      style={{ borderRadius: 12, borderWidth: 1 }}
      bodyStyle={{ padding: '16px 20px' }}
    >
      <Flex vertical gap={12}>
        <Link href={linkURL} target="_blank">
          <Title level={5} style={{ margin: 0, fontWeight: 600 }} ellipsis>
            {postInfo.title}
          </Title>
        </Link>

        <Paragraph
          ellipsis={{ rows: 2 }}
          style={{ color: token.colorTextSecondary, margin: 0, minHeight: 44 }}
        >
          {postInfo.description}
        </Paragraph>

        <Flex justify="space-between" align="center" wrap="wrap" gap={8}>
          <Flex align="center" gap={10}>
            <Avatar size={24} src={postInfo.blogAdminMediumImageURL} icon={<UserOutlined />} />
            <AntText style={{ fontSize: 13, fontWeight: 500 }}>{postInfo.blogName}</AntText>
          </Flex>

          <Flex gap={16}>
            <Tooltip title="发布时间">
              <Space size={4} align="center" style={{ fontSize: 12 }}>
                <ClockCircleOutlined />
                {publishedAtFormatted}
              </Space>
            </Tooltip>

            <Tooltip title="阅读量">
              <Space size={4} align="center" style={{ fontSize: 12 }}>
                <EyeOutlined />
                {postInfo.linkAccessCount}
              </Space>
            </Tooltip>

            <Link href={abstractURL}>
              <ShareAltOutlined style={{ fontSize: 14 }} />
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}