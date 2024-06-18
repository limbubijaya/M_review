const knex = require("../db");
const movie = "movie";

class MovieService  {
    static async searchMovies(query) {
        try {
            const movies = await knex('movie')
            .select("*")
            .whereRaw('LOWER(title) LIKE ?', '%'+query.toLowerCase()+'%');
            return this.normalDateForMany(movies);
        } catch (error) {
            console.error('Error searching movies:', error);
            throw error;
        }
    }

    static async movieList() {
        try {
            const movies = await knex('movie')
            .select("*");
            return this.normalDateForMany(movies);
        } catch (error) {
            console.error('Error fetching movies:', error);
            throw error;
        }
    }

    static async recentMovies() {
        try {
            const movies = await knex('movie')
            .select("*")
            .orderBy('release_date', 'desc')
            .limit(3);
            return this.normalDateForMany(movies);
        } catch (error) {
            console.error('Error fetching recent movies:', error);
            throw error;
        }
    }

    static async loadMovieInfo(id){
        try{
            const movie = await knex('movie')
            .select("*")
            .where('id', id)
            .first();
            return this.normalDate(movie);
        } catch (error){
            console.error('Error fetching movie:', error);
            throw error;
        }
    }

    static normalDate(movie){
        movie.release_date = movie.release_date.toLocaleDateString();
        return movie;
    }

    static normalDateForMany(movies){
        return movies.map((movie)=> this.normalDate(movie));
    }
}

module.exports = MovieService;