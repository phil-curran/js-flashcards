# Js Flashcards

#### By: Phil Curran

## Technologies Used

- HTML5
- CSS3
- Semantic UI Component Library
- Javascript
- React, React Router, React Hooks
- Supabase
- Highlight.js

## Description

I wanted to create a full CRUD app using a database I'd not used before. I chose Supabase because it's a Postgres database with a REST API. I also wanted to use React Hooks, so I created a flashcard app that allows users to create, read, update, and delete flashcards. Flashcard data comes from MDN Web Docs and will continue to expand.

## Features

- Conditional show & hide of components
- Full CRUD functionality
- Responsive design
- Styled code blocks using Highlight.js
- Button to copy example code for each flashcard
- Link to relevant MDN documentation for each flashcard
- Ever-expanding set of questions and answers

## Setup/Installation Requirements

- Clone the repo: `git clone https://github.com/phil-curran/js-flashcards`
- Install components: `cd js-flashcards && npm install`
- Create a Supabase account and create a new database
- Upload the 'flashcards_db.csv' file to a new table in your database instance
- Create a `.env` file in the root directory and add your Supabase URL and API key
- Start the app: `npm start`

## Screenshots

#### Main Card View

![ Home View](/imgs/card.png "Home View")

#### Card Detail View

![ Card Detail View](/imgs/answer.png "Card Detail View")

## Known Bugs

- _No Known Issues_

## Future Features

- Add search page for better inventory of questions
- Add a filter function to main page to focus on specific topics

## Contact

Please contact me if you have issues, questions, or ideas:

- pecurran@outlook.com

## License

MIT

Copyright (c) 2023 Phil Curran
