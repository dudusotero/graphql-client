import React, { useState } from "react";
import { graphql } from "react-apollo";

import { getBooksQuery } from "../../queries";
import BookDetails from "../BookDetails";

function BookList(props) {
  const [selected, setSelected] = useState(null);

  const displayBooks = () => {
    const { data } = props;
    if (data.loading) {
      return <div>Loading books...</div>;
    } else if (data.books.length) {
      return data.books.map(book => (
        <li key={book.id} onClick={() => setSelected(book.id)}>
          {book.name}
        </li>
      ));
    }
    return <div>Nothing to show :(</div>;
  };

  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
      <BookDetails bookId={selected} />
    </div>
  );
}

export default graphql(getBooksQuery)(BookList);
