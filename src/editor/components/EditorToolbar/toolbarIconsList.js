import FormatBoldOutlinedIcon from "@mui/icons-material/FormatBoldOutlined";
import FormatItalicOutlinedIcon from "@mui/icons-material/FormatItalicOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import FormatHeader1 from "mdi-material-ui/FormatHeader1";
import FormatHeader2 from "mdi-material-ui/FormatHeader2";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatText from "mdi-material-ui/FormatText";
import CodeIcon from "@mui/icons-material/Code";
import ImageIcon from "@mui/icons-material/Image";

export const eventTypes = {
  paragraph: "paragraph",
  h1: "h1",
  h2: "h2",
  ul: "ul",
  ol: "ol",
  quote: "quote",
  formatCode: "formatCode",
  formatBold: "formatBold",
  formatItalic: "formatItalic",
  formatInsertLink: "formatInsertLink",
  insertImage: "insertImage",
};

const iconSx = {
  color: "#272f3f",
}

const pluginsList = [
  {
    id: 1,
    Icon: FormatText,
    event: eventTypes.paragraph,
    iconSx,
  },
  {
    id: 2,
    Icon: FormatHeader1,
    event: eventTypes.h1,
    iconSx,
  },
  {
    id: 3,
    Icon: FormatHeader2,
    event: eventTypes.h2,
    iconSx,
  },
  {
    id: 4,
    Icon: FormatListBulletedIcon,
    event: eventTypes.ul,
    iconSx,
  },

  {
    id: 5,
    Icon: FormatListNumberedIcon,
    event: eventTypes.ol,
    iconSx,
  },
  {
    id: 6,
    Icon: FormatQuoteIcon,
    event: eventTypes.quote,
    iconSx,
  },
  {
    id: 7,
    Icon: CodeIcon,
    event: eventTypes.formatCode,
    iconSx,
  },
  {
    id: 8,
    Icon: FormatBoldOutlinedIcon,
    event: eventTypes.formatBold,
    iconSx,
  },
  {
    id: 9,
    Icon: FormatItalicOutlinedIcon,
    event: eventTypes.formatItalic,
    iconSx,
  },
  {
    id: 10,
    Icon: ImageIcon,
    event: eventTypes.insertImage,
    iconSx,
  },
  {
    id: 11,
    Icon: InsertLinkOutlinedIcon,
    event: eventTypes.formatInsertLink,
    iconSx,
  },
];

export default pluginsList;
