import React, { useEffect, useState } from 'react';
import DeleteBtn from '../../components/Delete';
import Jumbotron from "../../components/Jumbotron";
import API from '../../utils/API';
import { Col, Row, Container } from '../../components/Grid';
import { Booklist, BookListItem } from '../../components/BookList';
import { Input, TextArea, FormBtn } from '../../components/Form';

function Books() {

    const [books, setBooks] = useState([])
    const [formObject, setFormObject] = useState({
        title: '',
        author: '',
        synopsis: ''
    })


    useEffect(() => {
        loadBooks()
    }, [])


    function loadBooks() {
        API.getBooks()
            .then(res =>
                setBooks(res.data)
            )
            .catch(error => console.log(error));
    };


    function deleteBook(id) {
        API.deleteBook(id)
            .then(res => loadBooks())
            .catch(error => console.log(error));
    }


    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    }



    function handleFormSubmit(event) {
        event.preventDefault();
        if (formObject.title && formObject.author) {
            API.saveBook({
                title: formObject.title,
                author: formObject.author,
                synopsis: formObject.synopsis
            })
                .then(() => setFormObject({
                    title: '',
                    author: '',
                    synopsis: ''
                }))
                .then(() => loadBooks())
                .catch(error => console.log(error));
        }
    };

    return (
        <Container fluid>
            <Row>
                <Col size="md-6">
                    <Jumbotron>
                        <h1>What Books Should I Read?</h1>
                    </Jumbotron>
                    <form>
                        <Input
                            onChange={handleInputChange}
                            name="title"
                            placeholder="Title (required)"
                            value={formObject.title}
                        />
                        <Input
                            onChange={handleInputChange}
                            name="author"
                            placeholder="Author (required)"
                            value={formObject.author}
                        />
                        <TextArea
                            onChange={handleInputChange}
                            name="synopsis"
                            placeholder="Synopsis (Optional)"
                            value={formObject.synopsis}
                        />
                        <FormBtn
                            disabled={!(formObject.author && formObject.title)}
                            onClick={handleFormSubmit}
                        >
                            Submit Book
              </FormBtn>
                    </form>
                </Col>
                <Col size="md-6 sm-12">
                    <Jumbotron>
                        <h1>Book List</h1>
                    </Jumbotron>
                    {books.length ? (
                        <Booklist>
                            {books.map(book => {
                                return (
                                    <BookListItem key={book._id}>
                                        <a href={"/books/" + book._id}>
                                            <strong>
                                                {book.title} by {book.author}
                                            </strong>
                                        </a>
                                        <DeleteBtn onClick={() => deleteBook(book._id)} />
                                    </BookListItem>
                                );
                            })}
                        </Booklist>
                    ) : (
                        <h3>Sorry there are no Results to Display</h3>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default Books;