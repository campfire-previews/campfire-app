import theme from "./theme";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { TableNode, TableCellNode, TableRowNode } from "@lexical/table";
import { ListNode, ListItemNode } from "@lexical/list";
// import { ImageNode } from "../components/CustomNodes/ImageNode";

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

function onError(error) {
  console.error(error);
}

export const editorConfig = {
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
    // ImageNode,
  ],
};

export default editorConfig;