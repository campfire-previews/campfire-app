import { TRANSFORMERS } from "@lexical/markdown";
import { ImageNode, $isImageNode, $createImageNode } from "../customNodes/ImageNode";

export const IMAGE = {
  dependencies:[ImageNode],
  export: (node, exportChildren, exportFormat) => {
    if (!$isImageNode(node)) {
      return null;
    }

    return `![${node.getAltText()}](${node.getSrc()})`;
  },
  importRegExp: /!(?:\[([^[]*)\])(?:\(([^(]+)\))/,
  regExp: /!(?:\[([^[]*)\])(?:\(([^(]+)\))$/,
  replace: (textNode, match) => {
    const [, altText, src] = match;
    const imageNode = $createImageNode(src, altText, 800);
    textNode.replace(imageNode);
  },
  trigger: ')',
  type: 'text-match',
};

const CUSTOM_TRANSFORMERS = [
  IMAGE,
  ...TRANSFORMERS
]

export default CUSTOM_TRANSFORMERS;