/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../config/client";
import { Container, Segment, Form, Button } from "semantic-ui-react";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(1);
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
        category,
      })
      .eq("id", id);
    // .match("id", id);
    console.log("data", data);
    console.log("error", error);
    console.log("status", status);
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
        <form onSubmit={handleSubmit}>
          <label htmlFor="id">ID:</label>
          <input type="text" id="id" name="id" defaultValue={id} />

          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          {/* <label for="fname">First name:</label><br>
          <input type="text" id="id" name="id" defaultValue={id} /><br />

          <label for="fname">First name:</label><br>
          <input type="text" id="id" name="id" defaultValue={id} /><br />

          <label for="fname">First name:</label><br />
          <input type="text" id="id" name="id" defaultValue={id} /><br /> */}
          <button type="submit">Submit</button>
        </form>
      </Segment>
    </Container>
  );
};

export default Update;
