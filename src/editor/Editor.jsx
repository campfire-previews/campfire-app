import React from "react";
import { useState, useRef } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
// import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
// import ImagesPlugin from "../CustomPlugins/ImagePlugin";
import { EditorRefPlugin } from "@lexical/react/LexicalEditorRefPlugin";
import ToolbarPlugin from './ToolbarPlugin';
import editorConfig from './editorConfig';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { $convertToMarkdownString, TRANSFORMERS } from '@lexical/markdown';
import { $getRoot } from "lexical";

import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import './styles.css';

function Editor({ onCreateComment }) {
  const editorRef = useRef(null);

  // onChange
  // =========
  // Function accepts the editor state as an argument using the 
  // OnChangePlugin component. The editor state can then be read
  // or updated. In this case we are getting the RootNode and then
  // getting all the text content of the entire editor.

  function onChange(editorState) {
    editorState.read(() => {
      const markdown = $convertToMarkdownString(TRANSFORMERS);
      console.log(markdown);
    });
  }

  const handleSubmit = async () => {
    let markdown;
    
    editorRef.current.getEditorState().read(() => {
      markdown = $convertToMarkdownString(TRANSFORMERS);
    })
    
    await onCreateComment(markdown);
    editorRef.current.update(() => $getRoot().clear());
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<div className="editor-placeholder">Chat around the campfire...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <OnChangePlugin onChange={onChange} />
          <Button label="Save" />
          <ListPlugin />
          <LinkPlugin />
          {/* <ImagesPlugin captionsEnabled={false} /> */}
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <EditorRefPlugin editorRef={editorRef} />
        </div>
        <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSubmit}>
            Submit
          </Button>
      </div>
    </LexicalComposer>
  )
}

export default Editor