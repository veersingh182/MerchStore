// import React, { useState } from 'react';
// import Items from '../items';

// const Search = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     // Perform search operation and update searchResults state
//     const results = performSearch(searchQuery);
//     setSearchResults(results);
//   };

//   const handleInputChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const performSearch = (query) => {
//     // Perform the search operation based on the query
//     // Here, we filter the items by their name containing the query string
//     const filteredItems = Object.values(Items)
//       .flatMap((itemCategory) => itemCategory)
//       .filter((item) =>
//         item.name.toLowerCase().includes(query.toLowerCase())
//       );
//     return filteredItems;
//   };

//   return (
//     <form className="d-flex m-auto" onSubmit={handleFormSubmit}>
//       <input
//         className="form-control me-2"
//         type="search"
//         placeholder="search any product..."
//         aria-label="Search"
//         value={searchQuery}
//         onChange={handleInputChange}
//       />
//       <button className="btn btn-outline-success" type="submit">
//         <i className="bi bi-search"></i>
//       </button>
//       {/* Render search results */}
//       {searchResults.length > 0 && (
//         <ul className="list-inline">
//           {searchResults.map((item) => (
//             <li key={item.id} className="list-inline-item">{item.name}</li>
//           ))}
//         </ul>
//       )}
//     </form>
//   );
// };

// export default Search;
