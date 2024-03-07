// Returns the account that matches the given id
function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

// Returns the accounts after being sorted alphabetically by last name
function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() < accountB.name.last.toLowerCase() ? -1 : 1);
  return accounts;
}

// Returns how many times the given account has borrowed any book
function getTotalNumberOfBorrows({ id } , books) {
  let total = 0;
  // Go through each book in books
  books.forEach((book) => {
  // For each time the id appears in the book's borrowed list
    book.borrows.forEach((borrow) => {
      // Add to a counter
      if (borrow.id === id) total++;
    });
  });
  // Return the total counter
  return total;
}

// Helper function that checks if the book is currently borrowed by the specified user
function isBookBorrowedByUser(id, book){
  return book.borrows[0].id === id && !book.borrows[0].returned;
}

// Returns an array of all of the books, including their author, borrowed by the given account
function getBooksPossessedByAccount( { id }, books, authors) {
  // Initialize our list of borrowed books
  let borrowedBooks = [];
  // Go through each book
  books.forEach((book) => {
    // If this book is currently borrowed by the user...
    if (isBookBorrowedByUser(id, book)) {
      // Grab the author for the book
      const author = authors.find((thisAuthor) => thisAuthor.id === book.authorId);
      // And add the book with the author included to our list of borrowed books
      borrowedBooks.push({...book, author});
    }
  });
  // Return the list of borrowed books
  return borrowedBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
