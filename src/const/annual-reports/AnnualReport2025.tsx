import { Typography, Space } from 'antd';

const { Title, Paragraph, Text } = Typography;

const META_2025 = {
  title: '2025 年度报告 - 博友圈 · 博客人的朋友圈！',
  keywords: '博友圈, 年度报告, 2025',
  description: '博友圈网站 2025 年度报告。'
};

const REPORT_INFO_2025 = {
  title: '2025 年度报告',
  content: (
    <>
      <Paragraph>
        时光荏苒，岁月如梭，转眼已是岁末时分。回首即将过去的 2025 年，博友圈感恩有您一路相伴！
      </Paragraph>

      {/* 一、博友圈这一年 */}
      <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
        一、博友圈这一年
      </Title>

      <Paragraph>
        2025 这一年，博友圈推出了「<a href="/moments" target="_blank">随手一拍</a>」、「<a href="/link-graphs" target="_blank">连接系数</a>」和「<a href="/certificates/leileiluoluo.com" target="_blank">履约证书</a>」三大功能，获得了博友们的广泛关注和喜爱；
      </Paragraph>
      <Paragraph>
        2025 这一年，博友圈共收录了 <Text strong>284</Text> 个博客，其中 <Text strong>265</Text> 个为自行提交，<Text strong>19</Text> 个为后台收录；
      </Paragraph>
      <Paragraph>
        2025 这一年，博友们共发布了 <Text strong>21258</Text> 篇文章，其中 <Text strong>857</Text> 篇被加入到了首页推荐，<Text strong>152</Text> 篇被置顶过；
      </Paragraph>
      <Paragraph>
        2025 这一年，博友们共发布了 <Text strong>33</Text> 个随拍，收获 <Text strong>86</Text> 个喜欢；
      </Paragraph>
      <Paragraph>
        2025 这一年，共有 <Text strong>94</Text> 个博友发起过「<a href="/planet-shuttle" target="_blank">星球穿梭</a>」，共给大家带去 <Text strong>2454</Text> 个 IP 访问；
      </Paragraph>
      <Paragraph>
        2025 这一年，博友圈共收到 <Text strong>750.92</Text> 元的赞助，在此衷心感谢您的支持与帮助，这些资金已<a href="/sponsor" target="_blank"><Text strong>全数</Text></a>用在了云资源的续费上！
      </Paragraph>
      <Paragraph>
        2025 这一年，博友圈共给大家带去了 <Text strong>42532</Text> 个 IP 访问，这些 IP 来自于全国各地，分布如下（颜色愈深访问愈多）：
      </Paragraph>

      <div style={{ textAlign: 'center', margin: '16px 0' }}>
        <img
          width={480}
          style={{ border: '1px solid #e8e8e8' }}
          src="/assets/images/sites/annual_reports/2025/access-map.png"
          alt="访问地图"
        />
      </div>

      <Paragraph>访问博友圈最多的三个的省份或直辖市为：</Paragraph>
      <ul style={{ paddingLeft: 20 }}>
        <li>广东</li>
        <li>江苏</li>
        <li>北京</li>
      </ul>

      {/* 二、全站之最 */}
      <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
        二、全站之最
      </Title>

      <ul style={{ paddingLeft: 20 }}>
        <li>
          加入博友圈最早的博客为「<a href="https://www.boyouquan.com/blogs/yinji.org" target="_blank">印记</a>」，加入时间为 <Text strong>2023</Text> 年 <Text strong>7</Text> 月；
        </li>
        <li>
          友链指向最多的博客为「<a href="https://www.boyouquan.com/blogs/xyzbz.cn" target="_blank">网友小宋</a>」，共 <Text strong>102</Text> 个博客的友链指向了该博客；
        </li>
        <li>
          域名年龄最长的博客为「<a href="https://www.boyouquan.com/blogs/bkm.net" target="_blank">八九的日记</a>」，域名年龄为 <Text strong>30</Text> 岁。
        </li>
      </ul>

      {/* 三、年度之最 */}
      <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
        三、年度之最
      </Title>

      <ul style={{ paddingLeft: 20 }}>
        <li>
          2025 这一年，发布文章最多的博客为「<a href="https://www.boyouquan.com/blogs/acevs.com" target="_blank">acevs</a>」，共发布 <Text strong>360</Text> 篇文章；
        </li>
        <li>
          2025 这一年，获得访问最多的博客为「<a href="https://www.boyouquan.com/blogs/rushihu.com" target="_blank">如是乎 · 生活百味随笔</a>」，共获得 <Text strong>2657</Text> 个 IP 访问；
        </li>
        <li>
          2025 这一年，文章被置顶最多的博客为「<a href="https://www.boyouquan.com/blogs/yayu.net" target="_blank">雅余</a>」，共有 <Text strong>13</Text> 篇文章被置顶过；
        </li>
        <li>
          2025 这一年，文章被推荐最多的博客为「<a href="https://www.boyouquan.com/blogs/www.chenrui.com" target="_blank">陈锐同学</a>」，共有 <Text strong>56</Text> 篇文章被推荐；
        </li>
        <li>
          2025 这一年，星球穿梭发起最多的博客为「<a href="https://www.boyouquan.com/blogs/www.52txr.cn" target="_blank">陶小桃Blog</a>」，共发起 <Text strong>256</Text> 次星球穿梭；
        </li>
        <li>
          2025 这一年，连接系数被探索最多的目的博客为「<a href="https://www.boyouquan.com/blogs/blog.zhheo.com" target="_blank">张洪Heo</a>」，共被探索 <Text strong>30</Text> 次。
        </li>
      </ul>

      <Paragraph style={{ marginTop: 16 }}>
        「将一个个散落在各处的孤岛连接成一片广袤无垠的新大陆」是我们不变的初心。博友们，让我们一起携手谱写新的 2026 年！
      </Paragraph>
    </>
  ),
  publishedAt: '2025年12月23日'
};

export { META_2025, REPORT_INFO_2025 };