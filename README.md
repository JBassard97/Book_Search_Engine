# Book_Search_Engine
## Table of Contents
- [Title](#title)
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
## Description
This repository contains the code for a MERN stack application, that has been converted from originally using a RESTful API to a GraphQL API. It uses ApolloServer to handle client queries and mutations, and JSON Web Tokens to manage authentication. Book_Search_Engine allows users to create accounts, search books, add them to a collection, and can delete them just as quickly.
## Installation
To see the live site in action, visit the link under `Usage.` To run this project locally, you'll need to have MongoDB Compass and NodeJS installed and follow these steps:
## Usage

Link to project: https://book-search-engine-xfbs.onrender.com/

After running the final script "npm run develop" or when you visit the site with the live link, you'll be greeted by the homepage, which lets you search books from the Google Books API immediately. When you've entered your search, the page will fill with results and the number of results will be displayed at the top. With each result, you can press the `Save this Book!` button, and it will be added to your book collection. You cannot use this button unless you're logged in, so go ahead and create an account! Going into the `See Your Books` navigation in the header, you're presented with all of the books you've saved, and the number of how many displayed at the top. Every book you've saved comes complete with the title, author(s), and a description. You can press the `Delete this Book!` button to erase it from your collection and carry on! If you're running this locally, don't forget to enter `Ctrl + C` in your terminal to end the server once you're finished.
## Screenshots
