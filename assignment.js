const movies = [
    {"title": "Inception", "year": 2010, "rating": 8.8, "genre": ["Action", "Sci-Fi"], "director": "Christopher Nolan"},
    {"title": "The Dark Knight", "year": 2008, "rating": 9.0, "genre": ["Action", "Crime", "Drama"], "director": "Christopher Nolan"},
    {"title": "Pulp Fiction", "year": 1994, "rating": 8.9, "genre": ["Crime", "Drama"], "director": "Quentin Tarantino"},
    {"title": "The Matrix", "year": 1999, "rating": 8.7, "genre": ["Action", "Sci-Fi"], "director": "Lana Wachowski, Lilly Wachowski"},
    {"title": "Fight Club", "year": 1999, "rating": 8.8, "genre": ["Drama"], "director": "David Fincher"}
  ];
  
  const movieTitles = movies.map(movie => movie.title);
  console.log("Movie titles:", movieTitles);
  
  const highRatedMovies = movies.filter(movie => movie.rating > 8.5);
  console.log("Movies with rating > 8.5:", highRatedMovies);
  
  const moviesByRatingDesc = [...movies].sort((a, b) => b.rating - a.rating);
  console.log("Movies sorted by rating (descending):", moviesByRatingDesc);
  
  const moviesAfter2000 = movies.filter(movie => movie.year > 2000);
  console.log("Movies released after 2000:", moviesAfter2000);
  
  const moviesByYearAsc = [...movies].sort((a, b) => a.year - b.year);
  console.log("Movies sorted by year (ascending):", moviesByYearAsc);
  
  const genreCounts = movies.reduce((counts, movie) => {
    movie.genre.forEach(genre => {
      counts[genre] = (counts[genre] || 0) + 1;
    });
    return counts;
  }, {});
  console.log("Genre counts:", genreCounts);
  
  const allRatingsAbove7 = movies.every(movie => movie.rating > 7);
  console.log("All movies have rating > 7:", allRatingsAbove7);
  
  const averageRating = movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length;
  console.log("Average rating of all movies:", averageRating.toFixed(2));
  
  const titleAndRating = movies.map(movie => ({ title: movie.title, rating: movie.rating }));
  console.log("Title and rating objects:", titleAndRating);
  
  const hasSciFiMovie = movies.some(movie => movie.genre.includes("Sci-Fi"));
  console.log("Has at least one Sci-Fi movie:", hasSciFiMovie);
  
  const hasTarantinoMovie = movies.some(movie => movie.director.includes("Quentin Tarantino"));
  console.log("Has at least one Tarantino movie:", hasTarantinoMovie);
  
  const allAfter1990 = movies.every(movie => movie.year > 1990);
  console.log("All movies released after 1990:", allAfter1990);
  
  const nolanHighRatedTitles = movies
    .filter(movie => movie.director.includes("Christopher Nolan") && movie.rating > 8.5)
    .sort((a, b) => b.rating - a.rating)
    .map(movie => movie.title);
  console.log("Nolan's high-rated movies:", nolanHighRatedTitles);
  
  const dramaMoviesBefore2000 = movies.filter(movie => 
    movie.year < 2000 && movie.genre.includes("Drama")
  );
  const avgRatingDramaBefore2000 = dramaMoviesBefore2000.length > 0 
    ? dramaMoviesBefore2000.reduce((sum, movie) => sum + movie.rating, 0) / dramaMoviesBefore2000.length
    : 0;
  console.log("Average rating of Drama movies before 2000:", avgRatingDramaBefore2000.toFixed(2));
  
  const highRatedTitlesByYear = movies
    .filter(movie => movie.rating > 8.5)
    .sort((a, b) => a.year - b.year)
    .map(movie => movie.title);
  console.log("High-rated movie titles sorted by year:", highRatedTitlesByYear);
  
  const genresHighRated = movies
    .filter(movie => movie.rating > 8.8)
    .reduce((genres, movie) => {
      movie.genre.forEach(genre => {
        if (!genres.includes(genre)) {
          genres.push(genre);
        }
      });
      return genres;
    }, []);
  console.log("Number of genres in movies with rating > 8.8:", genresHighRated.length);
  console.log("Genres in movies with rating > 8.8:", genresHighRated);
  
  const hasRatingAbove9 = movies.some(movie => movie.rating > 9);
  console.log("Has at least one movie with rating > 9:", hasRatingAbove9);
  
  const nolanMovies = movies.filter(movie => movie.director.includes("Christopher Nolan"));
  const allNolanHighRated = nolanMovies.every(movie => movie.rating > 8.5);
  console.log("All Christopher Nolan movies have rating > 8.5:", allNolanHighRated);