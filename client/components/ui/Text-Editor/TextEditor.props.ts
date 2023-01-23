import { FieldError } from 'react-hook-form';
import { EditorProps } from 'draft-js';

export interface TextEditorProps extends Omit<EditorProps, 'editorState'> {
  placeholder: string;
  error?: FieldError | undefined;
  onChange: (...event: any[]) => void;
  value: string;
}
