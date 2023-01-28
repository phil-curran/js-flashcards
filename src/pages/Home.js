import React, { useState, useEffect } from "react";
import { Container, Grid, Button, Popup } from "semantic-ui-react";

// Styles
import "semantic-ui-css/semantic.css";
import "../App.css";

// db config
import supabase from "../config/client";

// Components
import Flashcard from "../components/Flashcard/Flashcard";
import FinishCard from "../components/FinishCard/FinishCard";

const Home = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  let [skipCount, setSkipCount] = useState(0);
  let [gotItCount, setGotItCount] = useState(0);
  let [order, setOrder] = useState("random");
  let [cardNumber, setCardNumber] = useState(0);

  const numberOfCards = 801;

  useEffect(() => {
    const fetchCards = async () => {
      const { data, error } = await supabase.from("flashcard_db").select();
      if (error) {
        setErrorMessage(error.message);
        console.log("Error: ", error.message);
        setFlashcards(null);
      } else if (data) {
        setFlashcards(data);
        setCurrentCard(data[0]);
      }
    };
    fetchCards();
  }, [errorMessage]);

  // handle math
  const getRandomNumber = () => {
    return Math.floor(Math.random() * flashcards.length);
  };

  // filter out current card
  const filterData = () => {
    let temp = flashcards.filter((card) => card.number !== currentCard.number);
    setFlashcards(temp);
  };

  // event handlers
  const handleSkipButton = () => {
    if (gotItCount < numberOfCards) {
      setSkipCount((skipCount += 1));
      if (order === "random") {
        setCurrentCard(flashcards[getRandomNumber()]);
      } else if (order === "sequential") {
        setCardNumber((cardNumber += 1));
        setCurrentCard(flashcards[cardNumber]);
      }
    }
    console.log("Flashcards: ", flashcards.length);
  };

  const handleGotItButton = () => {
    if (flashcards.length > 0) {
      setGotItCount((gotItCount += 1));
      filterData();
      if (order === "random") {
        setCurrentCard(flashcards[getRandomNumber()]);
      } else if (order === "sequential") {
        setCardNumber((cardNumber += 1));
        setCurrentCard(flashcards[cardNumber]);
      }
    }
  };

  return (
    <Container className="App">
      <Grid textAlign="center" columns={5} divided>
        <Grid.Row>
          <Grid.Column>Card Number: {currentCard.number}</Grid.Column>
          <Grid.Column>Cards Left: {flashcards.length}</Grid.Column>
          <Grid.Column>Skip Count: {skipCount}</Grid.Column>
          <Grid.Column>Got It Count: {gotItCount}</Grid.Column>
          <Grid.Column>
            Complete: {Math.floor((gotItCount / numberOfCards) * 100)} %
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {flashcards.length > 700 ? (
        <Flashcard
          key={currentCard.number}
          skipCount={skipCount}
          gotItCount={gotItCount}
          currentCard={currentCard}
          handleSkipButton={handleSkipButton}
          handleGotItButton={handleGotItButton}
        />
      ) : (
        <FinishCard />
      )}

      <Grid textAlign="center" columns={1}>
        <Grid.Row>
          <Grid.Column>
            <Button.Group className="buttonOrder">
              <Popup
                position="bottom right"
                content="Random Order"
                offset={[-10, 10]}
                trigger={
                  <Button
                    className="random"
                    color={order === "random" ? "green" : "grey"}
                    content="?"
                    onClick={() => setOrder("random")}
                  />
                }
              />
              <Button.Or />
              <Popup
                content="Sequential Order"
                position="bottom left"
                offset={[10, 10]}
                trigger={
                  <Button
                    color={order === "sequential" ? "green" : "grey"}
                    content="&rArr;"
                    onClick={() => setOrder("sequential")}
                  />
                }
              />
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Home;
