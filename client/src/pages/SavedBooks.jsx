// ! Good to go

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { GET_ME } from "../utils/queries"; // Import the GET_ME query
import { REMOVE_BOOK } from "../utils/mutations"; // Import the REMOVE_BOOK mutation
import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";

const SavedBooks = () => {
  const [userData, setUserData] = useState({});

  // Execute the GET_ME query on component load
  const { loading, data } = useQuery(GET_ME);

  // Initialize the REMOVE_BOOK mutation
  const [removeBook] = useMutation(REMOVE_BOOK);

  // Update userData with the query data
  useEffect(() => {
    if (data) {
      setUserData(data.me);
    }
  }, [data]);

  // Create function to handle book deletion
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // Execute the REMOVE_BOOK mutation with the bookId
      await removeBook({ variables: { bookId: bookId } });

      // Update userData to reflect the removed book
      setUserData((userData) => ({
        ...userData,
        savedBooks: userData.savedBooks.filter(
          (book) => book.bookId !== bookId
        ),
      }));

      // Remove bookId from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // If data is still loading, display loading message
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border="dark">
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className="small">Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
