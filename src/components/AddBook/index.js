import React, { useState } from "react";
import { graphql, compose } from "react-apollo";

import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../../queries";

function AddBook({ getAuthorsQuery, addBookMutation }) {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const displayAuthors = () => {
    if (getAuthorsQuery.loading) {
      return <option disabled>Loading authors...</option>;
    }
    return getAuthorsQuery.authors.map(author => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!name.length || !genre.length || !authorId.length) {
      return;
    }
    addBookMutation({
      variables: { name, genre, authorId },
      refetchQueries: [
        {
          query: getBooksQuery
        }
      ]
    });
  };

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          value={genre}
          onChange={e => setGenre(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Author:</label>
        <select value={authorId} onChange={e => setAuthorId(e.target.value)}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>

      <button>
        <span>+</span>
      </button>
    </form>
  );
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
