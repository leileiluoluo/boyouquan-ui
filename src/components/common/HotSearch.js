import { Link, Strong, Text } from "@radix-ui/themes";

export default function HotSearch() {
    const style = { color: 'rgb(203, 46, 88)' };

    return (
        <Text size="2">
            <Strong style={style}>大家在找啥：</Strong><Link href="/annual-reports/2024#annual-blogs">2024 年度博客</Link>
        </Text>
    )
}