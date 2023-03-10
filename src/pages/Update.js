/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const update = new Date();

  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [answerCode, setAnswerCode] = useState([]);
  const [mdnLink, setMdnLink] = useState("");
  const [quizletLink, setQuizletLink] = useState("");
  const [timesSkipped, setTimesSkipped] = useState(null);
  const [timesEdited, setTimesEdited] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [formError, setFormError] = useState(null);

  // SET
  const handleSubmit = async (e) => {
    e.preventDefault();
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
      .update({
        category,
        question,
        answerText,
        answerCode,
        mdnLink,
        quizletLink,
        timesSkipped,
        timesEdited,
        lastUpdated: update,
      })
      .eq("number", id);
    if (error) {
      console.log(error);
      setFormError("Please fill in all the fields correctly.");
    } else {
      setFormError(null);
      navigate("/");
    }
  };

  // GET
  useEffect(() => {
    const fetchCards = async () => {
      const { data, error, status } = await supabase
        .from("flashcard_db")
        .select()
        .eq("number", id)
        .single();
      if (error) {
        console.log("Error: ", error.message);
        console.log("Status: ", status);
        navigate("/", { replace: true });
      } else {
        setCategory(data.category);
        setQuestion(data.question);
        setAnswerText(data.answerText);
        setAnswerCode(data.answerCode);
        setMdnLink(data.mdnLink);
        setQuizletLink(data.quizletLink);
        setTimesSkipped((data.timesSkipped += 1));
        setTimesEdited((data.timesEdited += 1));
        setLastUpdated(data.lastUpdated);
      }
    };
    fetchCards();
  }, [id, navigate]);

  const handleCancel = () => {
    setCategory(null);
    setQuestion(null);
    setAnswerText(null);
    setAnswerCode(null);
    setMdnLink(null);
    setQuizletLink(null);
    setTimesSkipped(null);
    setTimesEdited(null);
    setLastUpdated(null);
    navigate("/");
  };

  return (
    <Container className="App">
      <Grid textAlign="center" columns={4} divided>
        <Grid.Row>
          <Grid.Column>Card Number: {id}</Grid.Column>
          <Grid.Column>Times Skipped: {timesSkipped}</Grid.Column>
          <Grid.Column>Times Edited: {timesEdited}</Grid.Column>
          <Grid.Column>Last Updated: {lastUpdated}</Grid.Column>
        </Grid.Row>
      </Grid>
      <Segment stacked padded className="answer">
        <Form>
          <Form.Group widths="equal">
            <Form.Input fluid label="Number:" defaultValue={id} />
            <Form.Input
              fluid
              label="Category:"
              defaultValue={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
          <Form.Field>
            <Form.TextArea
              label="Question:"
              defaultValue={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Form.TextArea
              label="Answer:"
              defaultValue={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Form.TextArea
              label="Code Block:"
              defaultValue={answerCode}
              onChange={(e) => setAnswerCode(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              label="MDN Link:"
              defaultValue={mdnLink}
              onChange={(e) => setMdnLink(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              label="Quizlet Link:"
              defaultValue={quizletLink}
              onChange={(e) => setQuizletLink(e.target.value)}
            />
          </Form.Field>
          <Grid.Row className="centered">
            <Button color="red" onClick={handleCancel}>
              Cancel
            </Button>
            <Button color="green" onClick={handleSubmit}>
              Save
            </Button>
          </Grid.Row>
        </Form>
      </Segment>
    </Container>
  );
};

export default Update;
