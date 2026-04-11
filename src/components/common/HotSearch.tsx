import React from 'react';
import { Typography } from 'antd';

const { Text, Link: AntLink } = Typography;

export default function HotSearch({ label, title, link }) {
  const style = { color: "rgb(203, 46, 88)" };

  return (
    <Text>
      <Text strong style={style}>{label}：</Text>
      <AntLink href={link}>{title}</AntLink>
    </Text>
  );
}