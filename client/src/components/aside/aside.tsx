import { Box, ScrollArea, Text } from '@mantine/core';
import CommentList from '@/features/comment/components/comment-list';
import { useAtom } from 'jotai';
import { asideStateAtom } from '@/components/navbar/atoms/sidebar-atom';
import React from 'react';

export default function Aside() {
  const [{ tab }] = useAtom(asideStateAtom);

  let title;
  let component;

  switch (tab) {
    case 'comments':
      component = <CommentList />;
      title = 'Comments';
      break;
    default:
      component = null;
      title = null;
  }


  return (
    <Box p="md">
      {component && (
        <>
          <Text mb="md" fw={500}>{title}</Text>

          <ScrollArea style={{ height: '85vh' }} scrollbarSize={5} type="scroll">
            <div style={{ paddingBottom: '200px' }}>
              {component}
            </div>
          </ScrollArea>
        </>
      )}
    </Box>
  );
}
