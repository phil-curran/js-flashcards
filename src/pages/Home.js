import React, { useState, useEffect } from "react";
import { Container, Grid } from "semantic-ui-react";

// Styles
import "semantic-ui-css/semantic.css";
import "../App.css";

// db config
import supabase from "../config/client";

// Components
import Flashcard from "../components/Flashcard/Flashcard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  let [skipCount, setSkipCount] = useState(0);
  let [gotItCount, setGotItCount] = useState(0);

  const numberOfCards = 4;

  useEffect(() => {
    const fetchCards = async () => {
      const { data, error } = await supabase.from("flashcards").select();
      if (error) {
        setFetchError("Could not fetch data");
        setFlashcards(null);
      } else if (data) {
        setFlashcards(data);
        setCurrentCard(data[0]);
        setFetchError(null);
      }
    };
    fetchCards();
  }, [fetchError]);

  // handle math
  const getRandomNumber = () => {
    return Math.floor(Math.random() * flashcards.length);
  };

  const filterData = () => {
    let temp = flashcards.filter((card) => card.id !== currentCard.id);
    setFlashcards(temp);
  };

  // event handlers
  const handleSkipButton = () => {
    if (gotItCount < numberOfCards) {
      setSkipCount((skipCount += 1));
      setCurrentCard(flashcards[getRandomNumber()]);
    } else {
    }
  };

  const handleGotItButton = () => {
    if (flashcards.length > 0) {
      setGotItCount((gotItCount += 1));
      filterData();
      setCurrentCard(flashcards[getRandomNumber()]);
    } else {
      console.log("No more cards left to SOLVE");
    }
  };

  return (
    <Container className="App">
      <Grid textAlign="center" columns={5} divided>
        <Grid.Row>
          <Grid.Column>Card Number: {currentCard.id}</Grid.Column>
          <Grid.Column>Cards Left: {flashcards.length}</Grid.Column>
          <Grid.Column>Skip Count: {skipCount}</Grid.Column>
          <Grid.Column>Got It Count: {gotItCount}</Grid.Column>
          <Grid.Column>
            % Complete: {(gotItCount / numberOfCards) * 100}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Flashcard
        key={currentCard.number}
        skipCount={skipCount}
        gotItCount={gotItCount}
        currentCard={currentCard}
        handleSkipButton={handleSkipButton}
        handleGotItButton={handleGotItButton}
      />
      {/* <EditForm key={currentCard.number} currentCard={currentCard} /> */}
    </Container>
  );
};

export default Home;