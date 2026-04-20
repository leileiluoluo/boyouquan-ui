import React from 'react';
import { Suspense, lazy } from 'react';
import { Typography, Space } from 'antd';

const { Text, Link } = Typography;

// 懒加载组件保持不变
const FooterStatistic = lazy(() => import('./FooterStatistic'));
const SpecialThanks = lazy(() => import('./special-thanks/SpecialThanks'));

export default function FooterBlock({ isHome }) {
    return (
        <div style={{ marginTop: 24 }}>
            {/* 对应 Container size="2" */}
            <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 16px' }}>
                <Space
                    direction="vertical"
                    size="large"
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <div>
                        <Suspense>
                            <FooterStatistic />
                        </Suspense>
                    </div>

                    <div id="special-thanks">
                        <Suspense>
                            <SpecialThanks isHome={isHome} />
                        </Suspense>
                    </div>

                    <div>
                        <Text type="secondary">
                            特别声明：包含政治、色情、赌博与暴力等违规内容的博客，一经发现，将被永久移出收录名单！举报违规博客，请「
                            <Link href="mailto:support@boyouquan.com?subject=违规内容举报&amp;body=收录页面：%0d%0a违规内容：%0d%0a">
                                联系站长
                            </Link>
                            」！
                        </Text>
                    </div>
                </Space>
            </div>
        </div>
    );
}