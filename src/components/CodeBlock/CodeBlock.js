/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect } from "react";
import { Icon, Popup, Grid } from "semantic-ui-react";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import "./style.css";

const CodeBlock = ({ code }) => {
  let codeArray = code.split(" | ");

  const CopyButton = () => {
    return (
      <div
        className="copyIcon"
        onClick={() => {
          navigator.clipboard.writeText(codeArray[0]);
        }}
      >
        <Popup
          position="right center"
          offset={[0, 20]}
          content="Copy Code"
          trigger={<Icon name="copy outline" size="large" />}
        />
      </div>
    );
  };

  useEffect(() => {
    hljs.configure({
      languages: ["javascript"],
      ignoreUnescapedHTML: true,
    });
    hljs.registerLanguage("javascript", javascript);
    hljs.highlightAll();
  }, []);

  return (
    <>
      <Grid.Row>
        <h2>Code:</h2>
      </Grid.Row>

      <Grid.Row>
        <pre className="codeFormat">
          <code className="javascript">
            {codeArray.map((line, index) => {
              return <span key={index}>{line}</span>;
            })}
          </code>
        </pre>
        <CopyButton />
      </Grid.Row>
    </>
  );
};

export default CodeBlock;
