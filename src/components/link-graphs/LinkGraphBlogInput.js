import { Box, DataList, Flex, TextField, Card, ScrollArea, Text } from '@radix-ui/themes';

export default function LinkGraphBlogInput({ type, placeholder, value, setValue, suggestions, setSuggestions, handleInputChange, handleSelectSuggestion }) {
    return (
        <Flex width="100%" direction="column" gap="1">
            <Box>
                <TextField.Root
                    style={{ fontSize: '12px' }}
                    value={value}
                    onChange={e => handleInputChange(type, e.target.value, setValue, setSuggestions)}
                    placeholder={placeholder}
                />
            </Box>

            <Box position="fixed" zIndex="10" minWidth="200px" maxWidth="300px" mt="6">
                {
                    suggestions.length > 0 && (
                        <Card>
                            <ScrollArea type="always" scrollbars="vertical" style={{ height: '100px', overflowY: 'auto' }}>
                                <DataList.Root>
                                    {
                                        suggestions.map((suggestion, index) => (
                                            <DataList.Item
                                                key={index}
                                                onClick={() => handleSelectSuggestion(suggestion.value, setValue, setSuggestions)}>
                                                <DataList.Value>
                                                    <Flex justify="end" gap="2">
                                                        <Text size="1" color="blue">{suggestion.blogName}</Text>
                                                        <Text size="1" color="amber">{suggestion.value}</Text>
                                                    </Flex>
                                                </DataList.Value>
                                            </DataList.Item>
                                        ))
                                    }
                                </DataList.Root>
                            </ScrollArea>
                        </Card>
                    )
                }
            </Box>
        </Flex>
    );
}
