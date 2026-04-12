import ArticleCard from './TestCard';

const Page = () => {
  return (
    <div>
      <ArticleCard
        user={{
          nickname: '瓦匠',
          performance: '履约 0 年',
          views: 1465,
        }}
        article={{
          title: '武汉三日游',
          content: '清明假期一晃而过...',
          publishTime: '4 天前',
          readInfo: '30 阅读 · 1 分钟',
        }}
      />

      {/* 想加多少个就加多少个 */}
      <ArticleCard
        user={{
          nickname: '张三',
          performance: '履约 2 年',
          views: 5200,
        }}
        article={{
          title: '北京旅行攻略',
          content: '北京真的太大了...',
          publishTime: '1 天前',
          readInfo: '120 阅读 · 3 分钟',
        }}
      />
    </div>
  );
};

export default Page;