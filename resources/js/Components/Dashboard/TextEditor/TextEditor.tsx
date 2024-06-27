import { Link, RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Placeholder from '@tiptap/extension-placeholder';
import { Input } from '@mantine/core';
import { type UseFormReturnType } from '@mantine/form';
import {
  type InputHTMLAttributes,
  type ComponentProps,
  type Dispatch,
  type SetStateAction,
} from 'react';

export interface TextEditorProps<T>
  extends Omit<ComponentProps<typeof Input.Wrapper>, 'form'>,
    Pick<
      InputHTMLAttributes<HTMLInputElement>,
      'placeholder' | 'disabled' | 'name'
    > {
  form: UseFormReturnType<T>;
  setValue: Dispatch<SetStateAction<string>>;
}

export function TextEditor<T>({
  placeholder,
  form,
  disabled,
  name,
  setValue,
  ...rest
}: TextEditorProps<T>) {
  const { defaultValue, ...input_props } = form.getInputProps(name as string);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder }),
    ],
    onUpdate(props) {
      setValue(props.editor.getHTML());
    },
    content: defaultValue,
    editable: !disabled,
  });

  return (
    <Input.Wrapper key={form.key(name as string)} {...input_props} {...rest}>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
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
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
    </Input.Wrapper>
  );
}

export default TextEditor;
