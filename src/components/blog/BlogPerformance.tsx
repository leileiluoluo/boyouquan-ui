import React from 'react';
import { theme, Card, Flex, Typography, Progress, Tooltip } from 'antd';
import { getYearsTillNow, getYear } from '../../utils/DateUtil';
import { TrophyOutlined } from '@ant-design/icons';

const { Title, Text, Link } = Typography;
const { useToken } = theme;

export default function BlogPerformance({ domainName, collectedAt }) {
  const { token } = useToken();

  const joinedYear = getYear(collectedAt);
  const years = getYearsTillNow(collectedAt);
  const percent = Math.min((years / 10) * 100, 100);
  const certLink = `/certificates/${domainName}`;

  // 直接使用固定金色（最稳妥，不依赖 token）
  const goldColor = '#faad14';
  const progressColor = 'linear-gradient(to right, #faad14, #ffcb45)';

  const handleOpenCertificate = () => {
    window.open(
      certLink,
      '博友圈',
      'height=800,width=960,top=0,right=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no'
    );
  };

  return (
    <Card hoverable>
      <Flex vertical gap={12}>
        {/* 标题 + 图标 */}
        <Flex align="center" gap={8}>
          <TrophyOutlined style={{ color: goldColor, fontSize: 16 }} />
          <Title level={5} style={{ margin: 0, fontSize: 16 }}>
            博客履约进度
          </Title>
        </Flex>

        {/* 点击区域 + 进度条 */}
        <Tooltip title="点击查看履约证书">
          <div
            onClick={handleOpenCertificate}
            style={{
              cursor: 'pointer',
              width: '100%',
            }}
          >
            {/* 年份标尺 */}
            <Flex justify="space-between" style={{ marginBottom: 8 }}>
              <Text type="secondary" style={{ fontSize: 13 }}>
                入驻 {joinedYear}
              </Text>
              <Text type="secondary" style={{ fontSize: 13 }}>
                目标 {joinedYear + 10}
              </Text>
            </Flex>

            {/* 渐变进度条 */}
            <Progress
              percent={percent}
              strokeColor={progressColor}
              showInfo={false}
              strokeLinecap="round"
              size="small"
            />

            {/* 等级展示 */}
            <Flex align="center" gap={8} style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 13, color: token.colorTextSecondary }}>
                已稳定运行
                <Text style={{ fontWeight: 600 }}> {years} 年</Text>
              </Text>

              {/* <Link
                style={{
                  background: goldColor,
                  color: '#fff',
                  padding: '2px 8px',
                  borderRadius: 4,
                  fontSize: 12,
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                LEVEL {years}
              </Link> */}
            </Flex>
          </div>
        </Tooltip>
      </Flex>
    </Card>
  );
}