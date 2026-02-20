import { FC} from "react";

interface DictionaryLinkProps {
  word: string;
  className?: string;
}

const DictionaryLink: FC<DictionaryLinkProps> = (props) => (
  <a
    href={`https://verbum.by/?q=${encodeURIComponent(props.word)}`}
    className={props.className}
    target="_blank"
    rel="noopener noreferrer"
  >
    {props.word}
  </a>
);

DictionaryLink.displayName = "DictionaryLink";

export default DictionaryLink;
