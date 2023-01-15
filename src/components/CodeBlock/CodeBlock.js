import React from "react";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";

import "./style.css";

const CodeBlock = ({ code }) => {
  hljs.registerLanguage("javascript", javascript);

  // TODO:
  // - fix code block to minimize breaks between lines
  // - fix code block to use hljs correctly
  const renderCode = (input, index) => {
    let css = "language-javascript";
    if (input.includes("/")) {
      css += " commentLine";
      return React.createElement("code", { key: index, className: css }, input);
    } else if (input === "") {
      return React.createElement("p", { key: index });
    } else {
      return React.createElement("p", { key: index }, input);
    }
  };

  return (
    <div
      className="codeBlock"
      onClick={() => {
        navigator.clipboard.writeText(code[0]);
      }}
    >
      <ul>
        {code.map((line, index) => {
          return <li key={index}>{renderCode(line)}</li>;
        })}
      </ul>
    </div>
  );
};

export default CodeBlock;
