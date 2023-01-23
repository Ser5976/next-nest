import { ContentState, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { FC, useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { RiErrorWarningLine } from 'react-icons/ri';
import styles from './TextEditor.module.css';
import { TextEditorProps } from './TextEditor.props';

const TextEditor: FC<TextEditorProps> = ({
  placeholder,
  onChange,
  error,
  value,
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (!isUpdated) {
      const defaultValue = value ? value : '';
      const blocksFromHtml = htmlToDraft(defaultValue);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHtml.contentBlocks,
        blocksFromHtml.entityMap
      );
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, [value, isUpdated]);

  const onEditorStateChange = (editorState: EditorState) => {
    setIsUpdated(true);
    setEditorState(editorState);

    return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>{placeholder}</div>

      <Editor
        toolbarClassName={styles.toolbar}
        editorClassName={styles.editor}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        spellCheck
        toolbar={{
          options: ['inline', 'blockType', 'list'],
          inline: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ['bold', 'italic', 'underline', 'strikethrough'],
          },
          blockType: {
            inDropdown: false,
            options: [],
          },
          list: {
            inDrodown: false,
            options: ['unordered', 'ordered'],
          },
        }}
      />

      {error && (
        <>
          <RiErrorWarningLine className={styles.errorIcon} />
          <span className={styles.errorMessage}>{error.message}</span>
        </>
      )}
    </div>
  );
};

export default TextEditor;
