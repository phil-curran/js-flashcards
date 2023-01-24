import React, { useState, useEffect } from "react";
import { Container, Grid, Button, Popup } from "semantic-ui-react";

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
  let [order, setOrder] = useState("random");

  const numberOfCards = 800;

  useEffect(() => {
    const fetchCards = async () => {
      const { data, error } = await supabase.from("flashcard_db").select();
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
    let temp = flashcards.filter((card) => card.number !== currentCard.number);
    setFlashcards(temp);
  };

  // event handlers
  const handleSkipButton = () => {
    if (gotItCount < numberOfCards) {
      setSkipCount((skipCount += 1));
      setCurrentCard(flashcards[getRandomNumber()]);
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

  const handleButtonToggle = () => {
    if (order === "random") {
      setOrder("sequential");
    } else {
      setOrder("random");
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
      <Grid textAlign="center" columns={1}>
        <Grid.Row>
          <Grid.Column>
            <Button.Group className="buttonOrder">
              <Popup
                position="left center"
                content="Random Order"
                trigger={
                  <Button
                    className="random"
                    color="green"
                    content="? &rArr; ?"
                    onClick={() => setOrder("random")}
                  />
                }
              />
              <Button.Or />
              <Popup
                content="Sequential Order"
                position="right center"
                trigger={
                  <Button
                    className="random"
                    color="grey"
                    content="1 &rArr; 2"
                    onClick={() => setOrder("random")}
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
