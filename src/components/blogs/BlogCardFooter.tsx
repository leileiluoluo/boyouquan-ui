import React from 'react';
import { Box, Flex, Text, Tooltip } from '@radix-ui/themes';

export default function BlogCardFooter({ statusOk, submittedInfo, submittedInfoTip }) {
    const backgroundColor = statusOk ? 'rgb(13, 203, 13)' : 'red';
    return (
        <Box>
            <Flex justify="between">
                <Box>
                    <Tooltip content={statusOk ? '该博客运行状态良好' : '该博客目前无法访问'}>
                        <Flex align="center">
                            <Box style={{
                                display: 'inline-block',
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: backgroundColor
                            }}></Box>
                            <Text size="1" ml="1" color="gray" style={{ userSelect: 'none' }}>{statusOk ? '运行良好' : '无法访问'}</Text>
                        </Flex>
                    </Tooltip>
                </Box>
                <Box>
                    <Tooltip content={submittedInfoTip}>
                        <Flex align="center">
                            <Box>
                                <img style={{
                                    userSelect: 'none',
                                    width: '14px',
                                    display: 'block'
                                }} src="/assets/images/sites/blog_detail/info-icon.png" />
                            </Box>
                            <Text size="1" color="gray" style={{ userSelect: 'none', marginLeft: '2px' }}>{submittedInfo}</Text>
                        </Flex>
                    </Tooltip>
                </Box>
            </Flex>
        </Box>
    )
}