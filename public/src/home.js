const { findAuthorById } = require("./books");

// Returns the number of books in the books array
function getTotalBooksCount(books) {
  return books.length;
}

// Returns the number of accounts in the accounts array
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

// Returns the number of books currently borrowed from the libary
function getBooksBorrowedCount(books) {
  return books.reduce((total, book) => {
    if (book.borrows && !book.borrows[0].returned) total++;
    return total;
  }, 0);
}

// Helper function that will return an array with the top elements on an array with 
// the highest count value
function getTopRanked(popularity, maximum){
  // Sort the popularities in descending order based on their count
  popularity.sort((first, second) => first.count > second.count ? -1 : 1);
  // Return an array of the highest-count elements, up the desired maximum
  return popularity.slice(0, maximum);
}

// Returns the most frequent five (or fewer) genres of all the books in the books array
function getMostCommonGenres(books) {
  // Initialize the array of genres with their popularity
  let popularity = [];
  // Go through each book, looking at its genre
  books.forEach(({ genre }) => {
    // Grab the counter for that genre
    let currentPopularity = popularity.find(({name}) => name === genre);
    // If we aren't tracking it yet, add it to the list
    if (!currentPopularity) {
      currentPopularity = { name: genre, count: 0};
      popularity.push(currentPopularity)
    }
    // Increase its count by 1
    currentPopularity.count++;
  });
  // Return the top 5 most common genres
  return getTopRanked(popularity, 5);
}

// Returns the top five (or fewer) books that have the most borrows
function getMostPopularBooks(books) {
  // Initialize the book popularities array
  let popularity = [];
  // Go through each book
  books.forEach(({ title, borrows }) => {
    // Store the book name and its number of borrows
    popularity.push({ name: title, count: borrows.length })
  });
  // Return the top 5 most popular books
  return getTopRanked(popularity, 5);
}

// Returns the top five (or fewer) authors whose books have been checked out the most
function getMostPopularAuthors(books, authors) {
  // Initialize the author popularities array
  let popularity = [];
  // Easy name to string conversion
  const nameAsString = ({first, last}) => `${first} ${last}`;
  // Go through each book
  books.forEach(({authorId, borrows }) => {
    // Retrieve the name of the author
    const authorName = nameAsString(findAuthorById(authors, authorId).name);
    // Grab the counter for that author
    let currentPopularity = popularity.find(({name}) => name === authorName);
    // If we aren't tracking them yet, add it to the list
    if (!currentPopularity){
      currentPopularity = { name: authorName, count: 0 };
      popularity.push(currentPopularity);
    }
    // Increase its count by 1
    currentPopularity.count += borrows.length;
  });
  // Return the top 5 most popular authors
  return getTopRanked(popularity, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
