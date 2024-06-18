const knex = require("../db");
const review = "review";

class ReviewService {
  static async overallReview(id) {
    try {
      const overallReview = await knex("review")
        .select("*")
        .where("movie_id", id);
      const totalRating = overallReview.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      const averageRating =
      overallReview.length > 0 ? Number((totalRating / overallReview.length).toFixed(1)) : 0;
      return averageRating;
    } catch (error) {
      console.error("Error searching reviews:", error);
      throw error;
    }
  }

  static async displayAllReview(id, userEmail) {
    try {
      const displayAllReview = await knex("review")
        .select("*")
        .where("movie_id", id);

      if (displayAllReview.length == 0) {
        return [];
      }

      if (userEmail == null) {
        return this.normalDateForManyReview(displayAllReview);
      } else if (!this.havePosted(id, userEmail)) {
        return this.normalDateForManyReview(displayAllReview);
      }

      return this.filterWithCurrentUser(displayAllReview, userEmail);
    } catch (error) {
      console.error("Error searching reviews:", error);
      throw error;
    }
  }

  static filterWithCurrentUser(displayAllReview, userEmail) {
    let filteredReviews = displayAllReview;
    let userIndex = 0;
    for (let i = 0; i < filteredReviews.length; i++) {
      if (filteredReviews[i].local_user_email == userEmail) {
        userIndex = i;
        break;
      }
    }

    const temp = filteredReviews[0];
    filteredReviews[0] = filteredReviews[userIndex];
    filteredReviews[userIndex] = temp;

    return this.normalDateForManyReview(filteredReviews);
  }

  static async havePosted(id, userEmail) {
    try {
      const havePosted = await knex("review")
        .where({ local_user_email: userEmail, movie_id: id })
        .first();
      return havePosted ? true : false;
    } catch (error) {
      console.error("Error searching reviews:", error);
      throw error;
    }
  }

  static async postReview(email, movieId, comment, rating) {
    try {
      await knex("review").insert({
        local_user_email: email,
        movie_id: movieId,
        comment: comment,
        rating: rating,
      });
    } catch (error) {
      console.error("Error posting review:", error);
      throw error;
    }
  }

  static async updateReview(id, userEmail, comment, rating){
    try{
      await knex("review")
      .where({ local_user_email: userEmail, movie_id: id })
      .update({comment: comment, rating: rating});
    } catch (error) {
      console.error("Error updating review:", error);
      throw error;
    }
  }

  static async deleteReview(id, userEmail){
    try{
      await knex("review")
      .where({ local_user_email: userEmail, movie_id: id })
      .del();
    } catch (error) {
      console.error("Error deleting review:", error);
      throw error;
    }
  }

  static normalDate(review) {
    review.updated_at = review.updated_at.toLocaleDateString();
    return review;
  }

  static normalDateForManyReview(displayAllReview) {
    return displayAllReview.map((review) => this.normalDate(review));
  }
}

module.exports = ReviewService;
