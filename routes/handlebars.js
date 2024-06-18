const express = require("express");
const router = express.Router();
const LocalUser = require("../model/users");
const MovieService = require("../model/movie");
const ReviewService = require("../model/review");

router.use((req, res, next) => {
  if (req.cookies.username) {
    res.locals.username = req.cookies.username;
  }
  next();
});

router.get("/", async (req, res) => {
  const movies = await MovieService.recentMovies();
  res.render("home", { title: "Home Page", movies: movies});
});
router.get("/login", (req, res) => {
  res.render("login", { title: "Login Page" });
});
router.get("/signup", (req, res) => {
  res.render("signup", { title: "Signup Page" });
});
router.get("/search", async (req, res) => {
  const query = req.query.q || null;
  const movies = await MovieService.searchMovies(query);
  res.render("search", { title: "Search Page", movies: movies });
});
router.get("/movie", async (req, res) => {
  const movieList = await MovieService.movieList();
  res.render("movie", { title: "Movie Page", movieList: movieList });
});
router.get("/movieid/:id", async (req, res) => {
  const movieId = req.params.id || null;
  const movie = await MovieService.loadMovieInfo(movieId);
  const overallReviewResult = await ReviewService.overallReview(movieId);
  res.render("movieid", {
    title: movie.title,
    movie: movie,
    overallReview: overallReviewResult,
  });
});
router.get("/movieid/:id/review", async (req, res) => {
  const movieId = req.params.id || null;
  const username = req.cookies.username || null;
  let userEmail = null;
  if (username) {
    userEmail = await LocalUser.getEmail(username);
  }
  const movie = await MovieService.loadMovieInfo(movieId);
  const displayAllReview = await ReviewService.displayAllReview(
    movieId,
    userEmail
  );

  const havePosted =
    displayAllReview.length == 0
      ? false
      : displayAllReview[0].local_user_email === userEmail
      ? true
      : false;

  res.render("review", {
    title: movie.title,
    checkUserName: username,
    movieId: {id: movieId},
    movie: movie,
    displayAllReview: displayAllReview,
    havePosted: havePosted,
    userEmail: userEmail,
  });
});

router.post("/movieid/:id/reviews/postReview", async (req, res) => {
  try {
    const movieId = req.params.id || null;
    const comment = req.body.comment;
    const rating = req.body.rating;
    const userName = res.locals.username;
    const userEmail = await LocalUser.getEmail(userName);
    await ReviewService.postReview(userEmail, movieId, comment, rating);
    let redirectTo = `http://localhost:8080/movieid/${movieId}/review/`;
    res.redirect(redirectTo);
  } catch (error) {
    console.error("Error posting review:", error);
    res.status(500).send("Error posting review");
  }
});

router.post("/movieid/:id/reviews/deleteReview", async (req, res) => {
  try {
    const movieId = req.params.id || null;
    const userName = res.locals.username;
    const userEmail = await LocalUser.getEmail(userName);
    await ReviewService.deleteReview(movieId, userEmail);
    let redirectTo = `http://localhost:8080/movieid/${movieId}/review/`;
    res.redirect(redirectTo);
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).send("Error deleting review");
  }
});

router.get("/movieid/:id/review/editReview", async (req, res) => {
  const movieId = req.params.id || null;
  const username = req.cookies.username || null;
  let userEmail = null;
  if (username) {
    userEmail = await LocalUser.getEmail(username);
  }
  const movie = await MovieService.loadMovieInfo(movieId);
  const displayAllReview = await ReviewService.displayAllReview(
    movieId,
    userEmail
  );



  const havePosted =
    displayAllReview.length == 0
      ? false
      : displayAllReview[0].local_user_email === userEmail
      ? true
      : false;
  res.render("editReview", {
    title: "Edit Review Page",
    checkUserName: username,
    movie: movie,
    havePosted: havePosted,
  });
});

router.post("/movieid/:id/review/editReview/updateReview", async (req, res) => {
  try {
    const movieId = req.params.id || null;
    const comment = req.body.updateComment;
    const rating = req.body.updateRating;
    const userName = res.locals.username;
    const userEmail = await LocalUser.getEmail(userName);
    await ReviewService.updateReview(movieId, userEmail, comment, rating);
    let redirectTo = `http://localhost:8080/movieid/${movieId}/review/`;
    res.redirect(redirectTo);
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).send("Error updating review");
  }
});
module.exports = router;
