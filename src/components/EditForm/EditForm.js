/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from "react";
import { Segment, Form } from "semantic-ui-react";
import "../styles/CodeBlock.css";
import "../styles/Flashcard.css";
// Semantic UI Components
import { Button } from "semantic-ui-react";

const EditForm = ({ currentCard }) => {
  const {
    id,
    category,
    question,
    answerText,
    answerCode,
    mdnLink,
    quizletLink,
    timesSkipped,
    timesEdited,
    lastUpdated,
  } = currentCard;
  const [cardNumber, setNumber] = useState(id);
  const [cardCategory, setCategory] = useState(category);
  const [cardQuestion, setQuestion] = useState(question);
  const [cardAnswerText, setAnswerText] = useState(answerText);
  const [cardAnswerCode, setAnswerCode] = useState(answerCode);
  const [cardMdnLink, setMdnLink] = useState(mdnLink);
  const [cardQuizletLink, setQuizletLink] = useState(quizletLink);
  const [cardTimesSkipped, setTimesSkipped] = useState(timesSkipped);
  const [cardTimesEdited, setTimesEdited] = useState(timesEdited);
  const [cardLastUpdated, setLastUpdated] = useState(lastUpdated);

  // const handleDelete = () => {
  //   console.log("handleDelete from Flashcard.js");
  // };

  return (
    <Segment stacked padded className="answer">
      <Form>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Number"
            defaultValue={cardNumber}
            onChange={(e) => setNumber(e.target.value)}
          />
          <Form.Input
            fluid
            label="Category"
            defaultValue={cardCategory}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>
        <Form.Field>
          <Form.TextArea
            label="Question:"
            defaultValue={cardQuestion}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Form.TextArea
            label="Answer:"
            defaultValue={cardAnswerText}
            onChange={(e) => setAnswerText(e.target.value)}
          />
        </Form.Field>
        <Form.TextArea
          label="Code Block:"
          defaultValue={cardAnswerCode}
          onChange={(e) => setAnswerCode(e.target.value)}
        />
        <Form.Field>
          <Form.Input
            label="MDN Link:"
            defaultValue={cardMdnLink}
            onChange={(e) => setMdnLink(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            label="Quizlet Link:"
            defaultValue={cardQuizletLink}
            onChange={(e) => setQuizletLink(e.target.value)}
          />
        </Form.Field>
        <div>
          <Button color="red">Cancel</Button>
          <Button color="green">Save</Button>
        </div>
      </Form>
    </Segment>
  );
};

export default EditForm;
