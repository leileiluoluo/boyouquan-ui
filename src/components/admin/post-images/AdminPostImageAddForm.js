import { Card, Box, Button, Flex, Text, TextField, Heading, TextArea, Link, Radio, Grid } from '@radix-ui/themes';
import { Form } from '@radix-ui/react-form';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';

const inputFontSizeStyle = { fontSize: '12px' };

export default function AdminPostImageAddForm({ postInfo, postImages, formData, error, handleChange, handleSubmit, isAdminPage }) {
    return (
        <>
            {
                isAdminPage ? '' : <Heading size="3" weight="bold">
                    文章配图
                </Heading>
            }
            <Card>
                <Form onSubmit={handleSubmit}>
                    <Flex direction="column" gap="2">
                        <Box>
                            <Flex gap="2" align="center">
                                <Text size="2">文章标题 *</Text>
                                <Text size="2" color="red">{error.code ? error.message : ''}</Text>
                            </Flex>

                            <Box mt="2">
                                <TextField.Root style={inputFontSizeStyle} value={postInfo.title} readOnly />
                            </Box>
                        </Box>

                        <Box>
                            <Flex gap="2" align="center">
                                <Text size="2">可选图片 *</Text>
                            </Flex>

                            <Grid columns={{ initial: "1", md: "2" }} gap="3" width="auto">
                                {
                                    postImages.map(
                                        (imageURL, index) => (
                                            <Flex grap="2" key={index}>
                                                <AspectRatio.Root
                                                    ratio={16 / 9}
                                                    style={{
                                                        flexShrink: 0,
                                                        backgroundColor: "#f3f3f3",
                                                        borderRadius: "4px",
                                                        overflow: "hidden",
                                                    }}>
                                                    <img
                                                        src={imageURL}
                                                        style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                                </AspectRatio.Root>

                                                <Radio name="imageURL" value={imageURL} onChange={handleChange} />
                                            </Flex>
                                        ))
                                }
                            </Grid>
                        </Box>

                        <Box>
                            <Flex gap="2" align="center">
                                <Text size="2">自定义图片地址 *</Text>
                            </Flex>

                            <Box mt="2">
                                <TextField.Root style={inputFontSizeStyle} name="customImageURL" value={formData.customImageURL} onChange={handleChange} />
                            </Box>
                        </Box>

                        <Box mt="2">
                            <Button type="submit" style={{ fontSize: '12px' }}>提交</Button>
                        </Box>
                    </Flex>
                </Form>
            </Card>
        </>
    )
}