import { EditorContent, useEditor } from '@tiptap/react';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Underline } from '@tiptap/extension-underline';
import { Link } from '@tiptap/extension-link';
import { StarterKit } from '@tiptap/starter-kit';
import classes from './comment.module.css';
import { useFocusWithin } from '@mantine/hooks';
import clsx from 'clsx';
import { forwardRef, useImperativeHandle } from 'react';

interface CommentEditorProps {
  defaultContent?: any;
  onUpdate?: any;
  editable: boolean;
  placeholder?: string;
  autofocus?: boolean;
}

const CommentEditor = forwardRef(({ defaultContent, onUpdate, editable, placeholder, autofocus }: CommentEditorProps,
                                  ref) => {
  const { ref: focusRef, focused } = useFocusWithin();

  const commentEditor = useEditor({
    extensions: [
      StarterKit.configure({
        gapcursor: false,
        dropcursor: false,
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Reply...',
      }),
      Underline,
      Link,
    ],
    onUpdate({ editor }) {
      if (onUpdate) onUpdate(editor.getJSON());
    },
    content: defaultContent,
    editable,
    autofocus: (autofocus && 'end') || false,
  });

  useImperativeHandle(ref, () => ({
    clearContent: () => {
      commentEditor.commands.clearContent();
    },
  }));

  return (
    <div ref={focusRef} className={classes.commentEditor}>
      <EditorContent editor={commentEditor}
                     className={clsx(classes.ProseMirror, { [classes.focused]: focused })}
      />
    </div>
  );
});

export default CommentEditor;
