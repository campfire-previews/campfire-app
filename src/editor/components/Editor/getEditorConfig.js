import theme from "./theme";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { TableNode, TableCellNode, TableRowNode } from "@lexical/table";
import { ListNode, ListItemNode } from "@lexical/list";
import { ImageNode } from "../../customNodes/ImageNode";
import { $createParagraphNode, $createTextNode, $getRoot } from "lexical";

function onError(error) {
  console.log(error);
  console.error(error);
}

function setEditorState(str) {
  return function() {
    const paragraph = $createParagraphNode();
    const text = $createTextNode(str);
    paragraph.append(text);
    $getRoot().append(paragraph);
    $getRoot().selectEnd();
  }
}

const initialConfig = {
  namespace: "CampfireConversation",
  theme,
  onError,
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
    ImageNode,
  ],
};

export function getEditorConfig(hasReplayId, url) {
  if (hasReplayId) {
    const str = `\nCheck out my session replay [here](${url}).\n`;
    const replayConfig = {
      ...initialConfig,
      editorState: setEditorState(str),
    };

    return replayConfig;
  } else {
    return initialConfig;
  }
}