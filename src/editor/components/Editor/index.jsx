import React, { useContext, useRef } from "react";
import { SessionReplayIdContext } from "../../../components/FeedbackInterface";
import { $getRoot } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { EditorRefPlugin } from "@lexical/react/LexicalEditorRefPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { $convertToMarkdownString } from "@lexical/markdown";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import ImagePlugin from "../../customPlugins/ImagePlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import EditorToolbar from "../EditorToolbar";
import editorConfig from "./editorConfig";
import { Button } from "@mui/material";
import CUSTOM_TRANSFORMERS from "../../customPlugins/ImageTransformer";
import "../../styles/styles.css";

function Editor({ onCreateComment }) {
  const editorRef = useRef(null);
  const sessionReplayId = useContext(SessionReplayIdContext);
  
  const handleSubmit = async () => {
    let markdown;

    editorRef.current.getEditorState().read(() => {
      markdown = $convertToMarkdownString(CUSTOM_TRANSFORMERS);
    });

    await onCreateComment(markdown);
    editorRef.current.update(() => $getRoot().clear());
  };

  return (
    <div id="editor-wrapper">
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
          <EditorToolbar />
          <div className="editor-inner">
            <RichTextPlugin
              ErrorBoundary={LexicalErrorBoundary}
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={
                <div className="editor-placeholder">
                  Chat around the campfire...
                </div>
              }
            />
            <HistoryPlugin />
            <MarkdownShortcutPlugin transformers={CUSTOM_TRANSFORMERS} />
            <EditorRefPlugin editorRef={editorRef} />
            <ImagePlugin captionsEnabled={false} />
            <ListPlugin />
            <LinkPlugin />
          </div>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </LexicalComposer>
    </div>
  );
}

export default Editor;
