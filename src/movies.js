// Function "getAllDirectors"
// Returns a new array with all directors, no duplicates
function getAllDirectors(movies) {
  // Using Set to remove duplicates
  return [...new Set(movies.map(movie => movie.director))];
}

// Function "howManyMovies"
// Returns the number of drama movies directed by Steven Spielberg
function howManyMovies(movies) {
  if (!movies.length) return 0;
  return movies.filter(
    movie => movie.director === 'Steven Spielberg' && movie.genre.includes('Drama')
  ).length;
}

// Function "scoresAverage"
// Returns the average score of all movies, rounded to 2 decimal places
function scoresAverage(movies) {
  if (movies.length === 0) return 0;
  const totalScore = movies.reduce((sum, movie) => {
    return sum + (movie.score || 0);
  }, 0);
  return parseFloat((totalScore / movies.length).toFixed(2));
}

// Function "dramaMoviesScore"
// Returns the average score of all drama movies, rounded to 2 decimal places
function dramaMoviesScore(movies) {
  const dramaMovies = movies.filter(movie => movie.genre.includes('Drama'));
  if (!dramaMovies.length) return 0;
  return scoresAverage(dramaMovies);
}

// Function "orderByYear"
// Returns a new array of movies sorted by year and title alphabetically
function orderByYear(movies) {
  // Creating a new array to avoid mutating the original one
  return [...movies].sort((a, b) => {
    if (a.year === b.year) {
      return a.title.localeCompare(b.title);
    }
    return a.year - b.year;
  });
}

// Function "orderAlphabetically"
// Returns an array of the first 20 movie titles in alphabetical order
function orderAlphabetically(movies) {
  return movies
    .map(movie => movie.title)
    .sort((a, b) => a.localeCompare(b))
    .slice(0, 20);
}

// Function "turnHoursToMinutes"
// Converts the duration of movies from hours to minutes
function turnHoursToMinutes(movies) {
  return movies.map(movie => {
    const duration = movie.duration;
    let minutes = 0;
    
    if (duration.includes('h')) {
      minutes += parseInt(duration.split('h')[0]) * 60;
    }
    if (duration.includes('min')) {
      minutes += parseInt(duration.split(' ')[1].replace('min', ''));
    }

    return {
      ...movie,
      duration: minutes,
    };
  });
}

// Function "bestYearAvg"
// Returns the year with the highest average score
function bestYearAvg(movies) {
  if (movies.length === 0) return null;

  const yearScores = {};

  movies.forEach(movie => {
    if (!yearScores[movie.year]) {
      yearScores[movie.year] = [];
    }
    yearScores[movie.year].push(movie.score || 0);
  });

  let bestYear = null;
  let bestAverage = 0;

  for (let year in yearScores) {
    const average = yearScores[year].reduce((sum, score) => sum + score, 0) / yearScores[year].length;
    if (average > bestAverage) {
      bestAverage = average;
      bestYear = year;
    } else if (average === bestAverage) {
      bestYear = Math.min(bestYear, year);
    }
  }
  
  return `The best year was ${bestYear} with an average score of ${bestAverage}`;
}