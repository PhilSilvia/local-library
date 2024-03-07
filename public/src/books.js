// Returns the author that matches a specified id
function findAuthorById(authors, id) {
  return authors.find((author) => id === author.id);
}

// Returns the book that matches a specified id
function findBookById(books, id) {
  return books.find((book) => id === book.id);
}

// Returns an array with two arrays of books: the first is the currently borrowed books, while the second is the rest of the books
function partitionBooksByBorrowedStatus(books) {
  const borrowedBooks = books.filter((book) => !book.borrows[0].returned);
  const inStockBooks = books.filter((book) => book.borrows[0].returned);
  return [borrowedBooks, inStockBooks];
}

// Helper function that finds the current return status for the book and account id
function getBorrowStatus(id, book){
  // Find the borrower from the list
  const borrower = book.borrows.find((borrower) => borrower.id === id);
  // Return its returned status
  return borrower.returned;
}

// Returns an array of ten or fewer accounts that have borrowed the given book
function getBorrowersForBook(book, accounts) {
  // Create our list of borrowers
  let borrowers = book.borrows.reduce((total, borrower) => {
    // Grab the matching account for the current borrower
    const thisAccount = accounts.find((account) => account.id === borrower.id);
    // If we haven't found 10 yet and we haven't included this account
    if (total.length < 10 && !total.includes(thisAccount)){
      // Add it to our list
      total.push(thisAccount);
    }
    // Return the modified list
    return total;
  }, []);
  // Add the return status to each borrower entry
  borrowers.map((account) => {
    account.returned = getBorrowStatus(account.id, book);
  });
  // Return the list
  return borrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
