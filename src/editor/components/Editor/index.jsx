import React, { useContext, useRef } from "react";
import { useParams, useLocation } from "react-router";
import { SessionReplayContext } from "../../../components/FeedbackInterface";
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
import { getEditorConfig } from "./getEditorConfig";
import { Button } from "@mui/material";
import CUSTOM_TRANSFORMERS from "../../customPlugins/ImageTransformer";
import "../../styles/styles.css";

function Editor({ onCreateComment }) {
  const pathname = useLocation().pathname;
  const sessionReplayContext = useContext(SessionReplayContext);
  const replayId = sessionReplayContext.sessionReplayId;

  const editorRef = useRef(null);

  const handleSubmit = async () => {
    let markdown;

    editorRef.current.getEditorState().read(() => {
      markdown = $convertToMarkdownString(CUSTOM_TRANSFORMERS);
    });

    await onCreateComment(markdown);
    sessionReplayContext.setSessionReplayId(null);
    editorRef.current.update(() => $getRoot().clear());
  };

  const generateURL = () => {
    const USER_DOMAIN = import.meta.env.VITE_USER_DOMAIN;
    // const BASE = `https://feedback-interface.${USER_DOMAIN}`;
    const BASE = `http://localhost:8080`;
    const replayPath = `${pathname}/session-replay/${replayId}`;
    return `${BASE}${replayPath}`;
  };

  return (
    <div id="editor-wrapper">
      <LexicalComposer initialConfig={getEditorConfig(replayId, generateURL())}>
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
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              bgcolor: `#363f54`,
              boxShadow: 0,
              "&:hover": {
                backgroundColor: "#E2554f",
                color: "#fff",
                boxShadow: 0,
              },
              fontWeight: "bold",
              textTransform: "lowercase",
              ml: 3.75,
              mt: "10px",
            }}
          >
            Submit
          </Button>
        </div>
      </LexicalComposer>
    </div>
  );
}

export default Editor;
