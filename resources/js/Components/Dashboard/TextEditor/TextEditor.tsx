import { Link, RichTextEditor, getTaskListExtension } from '@mantine/tiptap';
import { useEditor, BubbleMenu, type Editor } from '@tiptap/react';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Placeholder from '@tiptap/extension-placeholder';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import TaskItem from '@tiptap/extension-task-item';
import TipTapTaskList from '@tiptap/extension-task-list';
import ts from 'highlight.js/lib/languages/typescript';
import { useUncontrolled } from '@mantine/hooks';
import { Input } from '@mantine/core';
import {
  type InputHTMLAttributes,
  type ComponentProps,
  useEffect,
} from 'react';

const lowlight = createLowlight();
// TODO: Add more languages
lowlight.register({ ts });

export interface TextEditorProps
  extends Omit<ComponentProps<typeof Input.Wrapper>, 'onChange'>,
    Pick<InputHTMLAttributes<HTMLInputElement>, 'placeholder' | 'disabled'> {
  error?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export function TextEditor({
  defaultValue,
  onChange,
  value,
  placeholder,
  disabled,
  ...rest
}: TextEditorProps) {
  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue,
    onChange,
  });

  const editor = useEditor({
    extensions: [
      Color,
      StarterKit.configure({ codeBlock: false }),
      getTaskListExtension(TipTapTaskList),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: 'test-item',
        },
      }),
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextStyle,
      CodeBlockLowlight.configure({ lowlight }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder }),
    ],
    onUpdate(props) {
      const text = props.editor.getText().trim();

      handleChange(text.length === 0 ? '' : props.editor.getHTML());
    },
    content: _value,
    editable: !disabled,
  });

  useEffect(() => {
    editor?.setEditable(!disabled);
  }, [disabled]);

  return (
    <Input.Wrapper {...rest}>
      <RichTextEditor
        withTypographyStyles={false}
        editor={editor}
        styles={
          rest.error
            ? {
                root: {
                  borderColor: 'var(--mantine-color-error)',
                  marginBottom: 'calc(var(--mantine-spacing-xs) / 2)',
                },
              }
            : undefined
        }
      >
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.ColorPicker
              colors={[
                '#25262b',
                '#868e96',
                '#fa5252',
                '#e64980',
                '#be4bdb',
                '#7950f2',
                '#4c6ef5',
                '#228be6',
                '#15aabf',
                '#12b886',
                '#40c057',
                '#82c91e',
                '#fab005',
                '#fd7e14',
              ]}
            />
            <RichTextEditor.UnsetColor />
            <RichTextEditor.Color color="#F03E3E" />
            <RichTextEditor.Color color="#7048E8" />
            <RichTextEditor.Color color="#1098AD" />
            <RichTextEditor.Color color="#37B24D" />
            <RichTextEditor.Color color="#F59F00" />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.TaskList />
            <RichTextEditor.TaskListLift />
            <RichTextEditor.TaskListSink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
            <RichTextEditor.CodeBlock />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
            <RichTextEditor.H5 />
            <RichTextEditor.H6 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
        <BubbleMenu editor={editor as Editor}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Link />
          </RichTextEditor.ControlsGroup>
        </BubbleMenu>
        <RichTextEditor.Content />
      </RichTextEditor>
    </Input.Wrapper>
  );
}

export default TextEditor;
