/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../config/client";
import { Container, Segment, Form, Button } from "semantic-ui-react";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [answerCode, setAnswerCode] = useState("");
  const [mdnLink, setMdnLink] = useState("");
  const [quizletLink, setQuizletLink] = useState("");
  const [formError, setFormError] = useState(null);

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
      .from("flashcards")
      .update({
        id,
        category,
        question,
        answerText,
        answerCode,
        mdnLink,
        quizletLink,
      })
      .eq("id", id);
    console.log("Data: ", data);
    console.log("Error: ", error);
    console.log("Status: ", status);
    if (error) {
      setFormError("Please fill in all the fields correctly.");
    } else {
      setFormError(null);
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchCards = async () => {
      const { data, error } = await supabase
        .from("flashcards")
        .select()
        .eq("id", id)
        .single();
      if (error) {
        navigate("/", { replace: true });
      } else {
        setCategory(data.category);
        setQuestion(data.question);
        setAnswerText(data.answerText);
        setAnswerCode(data.answerCode);
        setMdnLink(data.mdnLink);
        setQuizletLink(data.quizletLink);
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
    navigate("/");
  };

  console.log("category", category);
  // console.log("question", question);
  // console.log("answerText", answerText);
  // console.log("answerCode", answerCode);
  // console.log("mdnLink", mdnLink);
  // console.log("quizletLink", quizletLink);

  return (
    <Container>
      <Segment stacked padded className="answer">
        <Form>
          <Form.Group widths="equal">
            <Form.Input fluid label="Number" defaultValue={id} />
            <Form.Input
              fluid
              label="category"
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
          <Form.TextArea
            label="Code Block:"
            defaultValue={answerCode}
            onChange={(e) => setAnswerCode(e.target.value)}
          />
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
          <div>
            <Button color="red" onClick={handleCancel}>
              Cancel
            </Button>
            <Button color="green" onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </Form>
      </Segment>
    </Container>
  );
};

export default Update;
