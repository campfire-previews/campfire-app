import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {$getRoot, $getSelection} from 'lexical';
import {useEffect, useState, useRef} from 'react';
import React from 'react';
import './styles.css';
import ToolbarPlugin from './ToolbarPlugin';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const theme = {
  code: 'editor-code',
  heading: {
    h1: 'editor-heading-h1',
    h2: 'editor-heading-h2',
    h3: 'editor-heading-h3',
    h4: 'editor-heading-h4',
    h5: 'editor-heading-h5',
  },
  image: 'editor-image',
  link: 'editor-link',
  list: {
    listitem: 'editor-listitem',
    nested: {
      listitem: 'editor-nested-listitem',
    },
    ol: 'editor-list-ol',
    ul: 'editor-list-ul',
  },
  ltr: 'ltr',
  paragraph: 'editor-paragraph',
  placeholder: 'editor-placeholder',
  quote: 'editor-quote',
  rtl: 'rtl',
  text: {
    bold: 'editor-text-bold',
    code: 'editor-text-code',
    hashtag: 'editor-text-hashtag',
    italic: 'editor-text-italic',
    overflowed: 'editor-text-overflowed',
    strikethrough: 'editor-text-strikethrough',
    underline: 'editor-text-underline',
    underlineStrikethrough: 'editor-text-underlineStrikethrough',
  },
};


// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
// function onError(error){
//   console.error(error);
// }

function Editor( {onCreateComment}) {
  const [editorState, setEditorState] = useState();

  function handleChange(newEditorState) {
    const json = newEditorState.toJSON();
    setEditorState(JSON.stringify(json));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onCreateComment(editorState);
    // setNewComment("");
  };

  const initialConfig = {
    namespace: 'Campfire Conversation',
    theme,
    onError(error) { throw error },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input"/>}
            placeholder={<div className="editor-placeholder">Chat around the campfire...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />

          <OnChangePlugin onChange={handleChange}/>
          <Button label="Submit" onPress={handleSubmit} />
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSubmit}
          >
            Send
          </Button>
        </div>
      </div>
    </LexicalComposer>
  );
}

export default Editor;