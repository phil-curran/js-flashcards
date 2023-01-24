/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Segment } from "semantic-ui-react";
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
    number,
    category,
    question,
    answerText,
    answerCode,
    mdnLink,
    quizletLink,
  } = currentCard;
  const [showAnswer, setShowAnswer] = useState(false);
  const [code, setCode] = useState();
  const [buttonMessage, setButtonMessage] = useState("Show Answer");
  const [buttonIcon, setButtonIcon] = useState("unhide");
  const [buttonColor, setButtonColor] = useState("grey");

  const handleShowAnswer = () => {
    if (showAnswer) {
      setShowAnswer(false);
      setButtonMessage("Show Answer");
      setButtonIcon("unhide");
      setButtonColor("black");
    } else {
      setShowAnswer(true);
      setButtonMessage("Hide Answer");
      setButtonIcon("hide");
      setButtonColor("grey");
    }
  };

  /* can this be swapped for just regular createElement without dangerouslySetInnerHTML? */
  const renderHTML = (text) => {
    return React.createElement("p", {
      dangerouslySetInnerHTML: { __html: text },
    });
  };

  useEffect(() => {
    setCode(answerCode, [answerCode]);
  }, [answerCode]);

  return (
    <Segment key={number} stacked padded>
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

        <Grid.Row className="centered">
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
          {/* 
          // use this when you want to add code to the flashcards
          // code field: "[]" is the default value, once edited, change to ""
          {code !== "[]" && (
            <div>
              <Grid.Row>
                <h2>Code:</h2>
              </Grid.Row>
              <Grid.Row>
                <CodeBlock className="align-left" code={code} />
              </Grid.Row>
            </div>
          )} */}
          <Grid.Row className="cardFooter">
            <Grid.Column
              className="links"
              textAlign="left"
              floated="left"
              width={2}
            >
              <small>
                <a href={mdnLink} target="_blank" rel="noreferrer noopener">
                  MDN
                </a>{" "}
                |{" "}
                <a href={quizletLink} target="_blank" rel="noreferrer noopener">
                  Quizlet
                </a>{" "}
              </small>
            </Grid.Column>
            <Grid.Column
              className="buttons"
              textAlign="right"
              floated="right"
              width={2}
            >
              <Link to={`/${number}`}>
                <Button size="mini" icon="edit" color="yellow" />
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </Segment>
  );
};

export default Flashcard;
