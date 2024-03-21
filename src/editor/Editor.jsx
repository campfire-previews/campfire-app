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
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { TRANSFORMERS } from '@lexical/markdown';


import { CodeNode } from '@lexical/code';
import { LinkNode } from '@lexical/link';
import { ListNode, ListItemNode } from '@lexical/list';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';

import ToolbarPlugin from './ToolbarPlugin';
import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import './styles.css';
import { $getRoot } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

// Plugins
// =======
// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.

function Editor({ onCreateComment }) {
  const editorRef = useRef(null);

  // intialConfig
  // ============
  // Configuration object for the LexicalComposer component which is
  // an instance of an "editor".

  // A property not listed is editorState which lets you set the intial
  // state of the editor with proper JSON (shouldn't be just an empty string)

  // Nodes extend the nodes that may occur in the editor by passing in
  // an array of possible nodes. Three exposed are ElementNode, TextNode,
  // and DecoratorNode. There is also always one RootNode per editor.

  // Catch any errors that occur during Lexical updates and log them
  // or throw them as needed. If you don't throw them, Lexical will
  // try to recover gracefully without losing user data.

  const initialConfig = {
    namespace: "Campfire Conversation 2",
    nodes: [
      HorizontalRuleNode,
      CodeNode,
      LinkNode,
      ListNode,
      ListItemNode,
      HeadingNode,
      QuoteNode,
    ],
    onError: (error) => {
      throw error;
    },
  };

  // onChange
  // =========
  // Function accepts the editor state as an argument using the 
  // OnChangePlugin component. The editor state can then be read
  // or updated. In this case we are getting the RootNode and then
  // getting all the text content of the entire editor.

  function onChange(editorState) {
    editorState.read(() => {
      const text = $getRoot().getTextContent();
      console.log(text);
    });
  }

  const handleSubmit = async () => {
    let text;
    editorRef.current.getEditorState().read(() => {
      text = $getRoot().getTextContent();
    })
    
    await onCreateComment(text);
    
    editorRef.current.update(() => {
      $getRoot().clear();
      console.log(editorRef.current.getEditorState());
    })
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<div>Chat around the campfire...</div>}
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