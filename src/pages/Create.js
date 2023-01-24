/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/client";
import {
  Container,
  Segment,
  Form,
  TextArea,
  Button,
  Grid,
} from "semantic-ui-react";
// Styles
import "semantic-ui-css/semantic.css";
import "../App.css";

const Create = () => {
  const navigate = useNavigate();

  const created = new Date();

  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [answerCode, setAnswerCode] = useState([]);
  const [mdnLink, setMdnLink] = useState("");
  const [quizletLink, setQuizletLink] = useState("");
  const [formError, setFormError] = useState(null);
  const [status, setStatus] = useState("");

  const form = document.getElementById("form");

  // SET
  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (
      !category ||
      !question ||
      !answerText ||
      !answerCode ||
      !mdnLink ||
      !quizletLink
    ) {
      setFormError("Please fill in all the fields correctly.");
      return;
    }
    const { data, error, status } = await supabase
      .from("flashcard_db")
      .insert([
        {
          // number: 999,
          category,
          question,
          answerText,
          answerCode,
          mdnLink,
          quizletLink,
          lastUpdated: created,
        },
      ])
      .select();
    if (error) {
      console.log(error);
      setFormError("Please fill in all the fields correctly.");
    } else {
      setStatus("Added new card.");
      setFormError(null);
      form.reset();
      navigate("/create");
    }
  };

  const handleCancel = () => {
    setCategory(null);
    setQuestion(null);
    setAnswerText(null);
    setAnswerCode(null);
    setMdnLink(null);
    setQuizletLink(null);
    form.reset();
  };

  return (
    <Container className="App">
      <Grid textAlign="center">
        <Grid.Row>
          <h2>Add a new card:</h2>
        </Grid.Row>
      </Grid>
      <Segment stacked padded className="answer">
        <Form id="form">
          <Form.Field>
            <Form.Input
              fluid
              label="Category:"
              defaultValue=""
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Form.TextArea
              label="Question:"
              defaultValue=""
              onChange={(e) => setQuestion(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Form.TextArea
              label="Answer:"
              defaultValue=""
              onChange={(e) => setAnswerText(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Form.TextArea
              label="Code Block:"
              defaultValue=""
              onChange={(e) => setAnswerCode(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              label="MDN Link:"
              defaultValue=""
              onChange={(e) => setMdnLink(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              label="Quizlet Link:"
              defaultValue=""
              onChange={(e) => setQuizletLink(e.target.value)}
            />
          </Form.Field>
          <Grid.Row className="centered">
            <Button color="red" onClick={handleCancel}>
              Cancel
            </Button>
            <Button color="green" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid.Row>
        </Form>
      </Segment>
      {formError && <p>Form Error: {formError}</p>}
      {status !== "" && <p>{status}</p>}
    </Container>
  );
};

export default Create;
