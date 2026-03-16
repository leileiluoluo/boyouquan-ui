import { Link, Strong, Text } from "@radix-ui/themes";

export default function HotSearch({ label, title, link }) {
  const style = { color: "rgb(203, 46, 88)" };

  return (
    <Text size="2">
      <Strong style={style}>{label}：</Strong>
      <Link href={link}>{title}</Link>
    </Text>
  );
}
