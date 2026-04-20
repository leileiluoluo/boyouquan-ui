import React from 'react';
import { Layout, Typography, Space, Divider, Button, Dropdown, Menu, Tooltip } from 'antd';
import { Rss, Github, Cloud } from 'lucide-react';

const { Content } = Layout;
const { Text, Link } = Typography;

// 下拉菜单内容
const rssMenu = (
  <Menu>
    <Menu.Item>
      <Link href="https://www.boyouquan.com/feed.xml" target="_blank">推荐文章 RSS 订阅</Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <Link href="https://www.boyouquan.com/feed.xml?sort=latest" target="_blank">最新文章 RSS 订阅</Link>
    </Menu.Item>
  </Menu>
);

const githubMenu = (
  <Menu>
    <Menu.Item>
      <Link href="https://github.com/leileiluoluo/boyouquan-ui" target="_blank">前端代码 GitHub</Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <Link href="https://github.com/leileiluoluo/boyouquan-api" target="_blank">后端代码 GitHub</Link>
    </Menu.Item>
  </Menu>
);

export default function SiteFooter() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
      <div style={{ marginTop: 24 }}>
        
        {/* 顶部链接横向滚动区域 */}
        <div style={{ whiteSpace: 'nowrap', overflowX: 'auto' }}>
          <Space align="center" justify="center" size="small">
            <Link strong href="/sponsor">赞助本站</Link>
            <Divider type="vertical" />
            <Link strong href="/release-notes">发布历史</Link>
            <Divider type="vertical" />
            <Link strong href="/about">关于本站</Link>
            <Divider type="vertical" />
            <Link strong href="/annual-reports">年度报告</Link>
            <Divider type="vertical" />
            <Link strong href="/similar-sites">同类网站</Link>
          </Space>
        </div>

        <Divider style={{ margin: '12px 0' }} />

        {/* 图标按钮区域 */}
        <div style={{ marginTop: 8 }}>
          <Space align="center" justify="center" size="small">
            
            {/* RSS 按钮 */}
            <Dropdown overlay={rssMenu} trigger={['click']}>
              <Button shape="circle" type="text" style={{ padding: 4 }}>
                <Tooltip title="本站文章 RSS 订阅">
                  <Rss width={14} height={14} />
                </Tooltip>
              </Button>
            </Dropdown>

            <Divider type="vertical" />
            
            {/* GitHub 按钮 */}
            <Dropdown overlay={githubMenu} trigger={['click']}>
              <Button shape="circle" type="text" style={{ padding: 4 }}>
                <Tooltip title="本站代码 GitHub 开源">
                  <Github width={14} height={14} />
                </Tooltip>
              </Button>
            </Dropdown>

            <Divider type="vertical" />
            
            {/* 腾讯云按钮 */}
            <Link href="https://curl.qcloud.com/okTsvSrj" target="_blank">
              <Button shape="circle" type="text" style={{ padding: 4 }}>
                <Tooltip title="本站使用腾讯云服务">
                  <Cloud width={14} height={14} />
                </Tooltip>
              </Button>
            </Link>
          </Space>
        </div>

        {/* 版权信息 */}
        <div style={{ marginTop: 16, marginBottom: 8, textAlign: 'center' }}>
          <div style={{ marginBottom: 8 }}>
            <Link href="/planet-shuttle" target="_blank">
              <img
                src="/assets/images/sites/logo/planet-shuttle.svg"
                alt="星球穿梭"
                style={{ height: 24 }}
              />
            </Link>
          </div>

          <div style={{ marginBottom: 8 }}>
            <Text type="secondary">将一个个散落在各处的孤岛连接成一片广袤无垠的新大陆！</Text>
          </div>

          <Space direction="vertical" align="center" size="small">
            <Link href="https://beian.miit.gov.cn/">辽ICP备2022012085号-2</Link>
            <Text type="secondary">
              Copyright © 2023-2026 <Link href="https://www.boyouquan.com/home">博友圈</Link>
            </Text>
          </Space>
        </div>
      </div>
    </div>
  );
}