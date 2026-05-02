import { Fragment } from "react";

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type LegalDoc = {
  title: string;
  updated: string;
  blocks: LegalBlock[];
};

const EMAIL = "harry@plynos.dev";

function renderText(text: string) {
  const parts = text.split("{email}");
  if (parts.length === 1) return text;
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 ? (
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      ) : null}
    </Fragment>
  ));
}

export function LegalContent({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return <h2 key={i}>{block.text}</h2>;
        }
        if (block.type === "ul") {
          return (
            <ul key={i}>
              {block.items.map((item, j) => (
                <li key={j}>{renderText(item)}</li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{renderText(block.text)}</p>;
      })}
    </>
  );
}
