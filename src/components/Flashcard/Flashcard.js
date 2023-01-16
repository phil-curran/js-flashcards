/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Segment } from "semantic-ui-react";
// import "../styles/CodeBlock.css";
import "./style.css";

// Components
import CodeBlock from "../CodeBlock/CodeBlock";

// Semantic UI Components
import { Button, Icon } from "semantic-ui-react";

const Flashcard = ({
  skipCount,
  gotItCount,
  currentCard,
  handleSkipButton,
  handleGotItButton,
}) => {
  const {
    id,
    category,
    question,
    answerText,
    answerCode,
    mdnLink,
    quizletLink,
  } = currentCard;
  const [showAnswer, setShowAnswer] = useState(false);
  const [code, setCode] = useState([]);
  const [buttonMessage, setButtonMessage] = useState("Show Answer");
  const [buttonIcon, setButtonIcon] = useState("unhide");
  const [buttonColor, setButtonColor] = useState("grey");

  const handleShowAnswer = () => {
    if (showAnswer) {
      setShowAnswer(false);
      setButtonMessage("Show Answer");
      setButtonIcon("unhide");
      setButtonColor("grey");
    } else {
      setShowAnswer(true);
      setButtonMessage("Hide Answer");
      setButtonIcon("hide");
      setButtonColor("black");
    }
  };

  const handleDelete = () => {
    console.log("handleDelete from Flashcard.js");
  };

  const renderHTML = (text) => {
    return React.createElement("p", {
      dangerouslySetInnerHTML: { __html: text },
    });
  };

  useEffect(() => {
    setCode(answerCode, [answerCode]);
  }, [answerCode]);

  return (
    <Segment key={id} stacked padded className="answer">
      <Grid>
        <Grid.Row>
          <h1 className="centered">{category}</h1>
        </Grid.Row>

        <Grid.Row className="centered">
          <Button
            color="yellow"
            animated="fade"
            onClick={() => handleSkipButton()}
          >
            <Button.Content visible>
              {" "}
              <Icon name="sync" />
              Skip it
            </Button.Content>
            <Button.Content hidden>Skipped: {skipCount}</Button.Content>
          </Button>
          <Button
            color="green"
            animated="fade"
            onClick={() => handleGotItButton()}
          >
            <Button.Content visible>
              {" "}
              <Icon name="check" />
              Got it!
            </Button.Content>
            <Button.Content hidden>Got It: {gotItCount}</Button.Content>
          </Button>
        </Grid.Row>

        <Grid.Row>
          <h2>Question:</h2>
        </Grid.Row>

        <Grid.Row>{renderHTML(question)}</Grid.Row>

        <Grid.Row>
          <Button color={buttonColor} onClick={() => handleShowAnswer()}>
            <Icon name={buttonIcon} />
            {buttonMessage}
          </Button>
        </Grid.Row>
      </Grid>

      {showAnswer && (
        <Grid className="answerBlock">
          <Grid.Row>
            <h2>Answer:</h2>
          </Grid.Row>
          <Grid.Row>{renderHTML(answerText)}</Grid.Row>
          <Grid.Row>
            <h2>Code:</h2>
          </Grid.Row>
          <Grid.Row>
            <CodeBlock className="align-left" code={code} />
          </Grid.Row>
          <Grid.Row>
            <p>
              <a href={mdnLink} target="_blank" rel="noreferrer noopener">
                MDN
              </a>{" "}
              |{" "}
              <a href={quizletLink} target="_blank" rel="noreferrer noopener">
                Quizlet
              </a>{" "}
            </p>
            <Link to={`/${id}`}>
              <i className="material-icons">edit</i>
            </Link>
          </Grid.Row>
        </Grid>
      )}
    </Segment>
  );
};

export default Flashcard;
