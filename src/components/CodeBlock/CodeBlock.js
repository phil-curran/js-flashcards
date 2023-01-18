import React from "react";
import { Icon } from "semantic-ui-react";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import "../../../node_modules/highlight.js/styles/atom-one-dark.css";

import "./style.css";

const CodeBlock = ({ code }) => {
  hljs.registerLanguage("javascript", javascript);
  hljs.highlightAll();

  let codeArray = code.split(" | ");

  // TODO:
  // - fix code block to minimize breaks between lines
  // - fix code block to use hljs correctly

  return (
    <div className="codeBlock">
      <div
        className="copyIcon"
        onClick={() => {
          navigator.clipboard.writeText(codeArray[0]);
        }}
      >
        <Icon name="copy outline" size="large" />
      </div>
      <div>
        {codeArray.map((line, index) => {
          return (
            <pre key={index}>
              <code className="language-javascript">{line}</code>
            </pre>
          );
        })}
      </div>
    </div>
  );
};

export default CodeBlock;
