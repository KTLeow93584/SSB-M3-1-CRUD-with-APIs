import { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { fetchPosts, createPost, deletePost, updatePost } from "./api.jsx";

function App() {
  const [posts, setPosts] = useState([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  useEffect(onFetchPosts, []);

  // Debug
  //console.log("[On Render] Posts", posts);

  function onFetchPosts() {
    fetchPosts(
      // On Successful Callback
      (posts) => setPosts(posts),
      () => setPosts([])
    );
  }

  function onCreatePost(event) {
    event.preventDefault();
    createPost(
      // Data Object.
      {
        title: title,
        author: author,
        content: content
      },
      // On Successful Callback.
      onFetchPosts,
      // On Failed/Error Callback.
      null,
      // On After API Line Callback - Synchronous, happens before results from server are yielded.
      () => {
        setTitle("");
        setAuthor("");
        setContent("");
      }
    );
  }

  function onDeletePost(id) {
    deletePost(
      // ID
      id,
      // On Successful Callback.
      onFetchPosts
    );
  }

  function onUpdatePost(id, post) {
    updatePost(
      // ID
      id,
      // Data Object.
      {
        title: post.title,
        author: post.author,
        content: post.content
      },
      // On Successful Callback.
      onFetchPosts
    );
  }

  return (
    <Container fluid className="mt-3" style={{ width: "100vw" }}>
      {/* --------------------------- */}
      {/* Header */}
      <Row className="w-100 mb-3">
        <Col className="col-12 d-flex justify-content-center">
          <h1>Post Creation Mock App</h1>
        </Col>
      </Row>
      {/* --------------------------- */}
      {/* Body - Form (Post Creation) */}
      <Row className="w-100">
        <Form className="w-100 d-flex flex-column align-items-center" onSubmit={onCreatePost}>
          <Col className="col-lg-7 col-md-9 col-12 d-flex justify-content-center">
            <Form.Control type="text" placeholder="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)} />
          </Col>

          <br />

          <Col className="col-lg-7 col-md-9 col-12 d-flex justify-content-center">
            <Form.Control type="text" placeholder="Author"
              value={author}
              onChange={(event) => setAuthor(event.target.value)} />
          </Col>

          <br />

          <Col className="col-lg-7 col-md-9 col-12 d-flex justify-content-center">
            <Form.Control placeholder="Content"
              as="textarea"
              rows={3}
              value={content}
              onChange={(event) => setContent(event.target.value)} />
          </Col>

          <br />

          <Col className="col-lg-7 col-md-9 col-12 d-flex justify-content-center">
            <Button variant="primary mb-3" type="submit">
              Create Post
            </Button>
          </Col>
        </Form>
      </Row>
      {/* --------------------------- */}
      <hr />
      <Row className="w-100 mb-3">
        <Col className="col-12 d-flex justify-content-center">
          <h2>Post List</h2>
        </Col>
      </Row>
      {/* --------------------------- */}
      {/* Body - Form (Post Modification/Deletion) */}
      {
        posts.length > 0 ? (
          <Row className="w-100">
            {
              posts.map((post, index) => (
                <PostComponent key={`post-${post.id}`}
                  iterIndex={index}
                  post={post}
                  onPostChangedCallback={(postObj, index) => {
                    // Debug
                    //console.log("Before", posts[index]);

                    const updatedPosts = [...posts];

                    // Title Adjustment
                    if (postObj.title !== null)
                      updatedPosts[index].title = postObj.title;

                    // Author Adjustment
                    if (postObj.author !== null)
                      updatedPosts[index].author = postObj.author;

                    // Content Adjustment
                    if (postObj.content !== null)
                      updatedPosts[index].content = postObj.content;

                    // Debug
                    //console.log("After", updatedPosts[index]);

                    setPosts(updatedPosts);
                  }}
                  onUpdatePost={onUpdatePost}
                  onDeletePost={onDeletePost} />
              ))
            }
          </Row>
        ) : (
          <Row className="w-100">
            <Col className="col-12 d-flex justify-content-center">
              <h5>No Posts at the moment...</h5>
            </Col>
          </Row>
        )
      }
      {/* --------------------------- */}
      <hr />
      {/* --------------------------- */}
    </Container>
  )
}

function PostComponent({ iterIndex, post, onPostChangedCallback, onUpdatePost, onDeletePost }) {
  return (
    <Col className="col-md-4 col-sm-6 col-12">
      <Card>
        <Card.Header>
          <Form.Control type="text" placeholder="Title"
            value={post.title}
            onChange={(event) => onPostChangedCallback({ title: event.target.value, author: null, content: null }, iterIndex)} />
        </Card.Header>
        <Card.Body>
          <Card.Text className="mt-0 mx-0 mb-3 p-0">Author: </Card.Text>
          <Form.Control type="text" placeholder="Author"
            className="mb-3"
            value={post.author}
            onChange={(event) => onPostChangedCallback({ title: null, author: event.target.value, content: null }, iterIndex)} />

          <Form.Control placeholder="Content"
            as="textarea" rows={3}
            value={post.content}
            onChange={(event) => onPostChangedCallback({ title: null, author: null, content: event.target.value }, iterIndex)} />
          <hr />
          <div className="d-flex justify-content-evenly">
            <Button variant="danger" onClick={() => onUpdatePost(post.id, post)}> Update Post</Button>
            <Button variant="danger" onClick={() => onDeletePost(post.id)}> Delete Post</Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default App;
