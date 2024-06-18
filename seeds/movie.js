/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('review').del()
  await knex('movie').del()
  await knex('movie').insert([
    {
      title: 'Godzilla x Kong: The New Empire',
      description: 'Two ancient titans, Godzilla and Kong, clash in an epic battle as humans unravel their intertwined origins and connection to Skull Island\'s mysteries.',
      director: 'Adam Wingard',
      writers: 'Adam Wingard, Simon Barrett, Terry Rossio',
      youtube_link: 'https://www.youtube.com/embed/qqrpMRDuPfc?si=XDJbTU9c5cmMNggK',
      image_link: 'http://localhost:8080/assets/img/godzillaPoster.jpg',
      release_date: new Date('2024-03-28')
    },
    {
      title: 'Venom',
      description: 'A failed reporter is bonded to an alien entity, one of many symbiotes who have invaded Earth. But the being takes a liking to Earth and decides to protect it.',
      director: 'Ruben Fleischer',
      writers: 'Jeff Pinkner, Scott Rosenberg, Kelly Marcel',
      youtube_link: 'https://www.youtube.com/embed/u9Mv98Gr5pY?si=peI1jgsU61grEVoG',
      image_link: 'http://localhost:8080/assets/img/venomPoster.jpg',
      release_date: new Date('2023-10-04')
    },
    {
      title: 'Avatar: The Way of Water',
      description: 'The Sully family - Jake, Neytiri, and their children - face new threats to their home on the exoplanetary moon Pandora.',
      director: 'James Cameron',
      writers: 'James Cameron, Josh Friedman, Shane Salerno',
      youtube_link: 'https://www.youtube.com/embed/d9MyW72ELq0?si=vWdDxmo2aT_4w7rL',
      image_link: 'http://localhost:8080/assets/img/avatar2Poster.jpg',
      release_date: new Date('2022-12-16')
    },
    {
      title: 'Shazam! Fury of the Gods',
      description: 'The Shazam family must get back together to stop the Daughters of Atlas, who are trying to take over the world.',
      director: 'David F. Sandberg',
      writers: 'Henry Gayden, Chris Morgan',
      youtube_link: 'https://www.youtube.com/embed/Zi88i4CpHe4?si=xldZNsISJ3bXPRY7',
      image_link: 'http://localhost:8080/assets/img/shazam2Poster.jpg',
      release_date: new Date('2023-12-21')
    },
    {
      title: 'The Flash',
      description: 'Barry Allen uses his super speed to change the past, but his attempt to save his family creates a world where General Zod has returned, and there are no superheroes to stop him. Barry must race against time to restore the timeline while facing off with an alternate version of his greatest enemy, the Reverse Flash.',
      director: 'Andy Muschietti',
      writers: 'Christina Hodson',
      youtube_link: 'https://www.youtube.com/embed/hebWYacbdvc?si=jpIUw7KPqHxWTEGz',
      image_link: 'http://localhost:8080/assets/img/theFlashPoster.jpg',
      release_date: new Date('2023-06-16')
    },
    {
      title: 'Oppenheimer',
      description: 'A biopic about J. Robert Oppenheimer and his role in the development of the atomic bomb.',
      director: 'Christopher Nolan',
      writers: 'Christopher Nolan',
      youtube_link: 'https://www.youtube.com/embed/uYPbbksJxIg?si=vOe3tH9Oh661WmWF',
      image_link: 'http://localhost:8080/assets/img/oppenheimer.jpg',
      release_date: new Date('2023-07-21')
    },
    {
      title: 'Dune: Part Two',
      description: 'Paul Atreides leads nomadic tribes in a rebellion against the ruthless Harkonnen dynasty that rules over the desert planet Arrakis.',
      director: 'Denis Villeneuve',
      writers: 'Jon Spaihts, Denis Villeneuve, Eric Roth',
      youtube_link: 'https://www.youtube.com/embed/Way9Dexny3w?si=pdr7-ffsH2qqZC91',
      image_link: 'http://localhost:8080/assets/img/dune2Poster.jpg',
      release_date: new Date('2023-11-03')
    },
    {
      title: 'Wonka',
      description: 'A prequel to the events of Charlie and the Chocolate Factory, focused on a young Willy Wonka and his adventures prior to opening his famous chocolate factory.',
      director: 'Paul King',
      writers: 'Simon Rich',
      youtube_link: 'https://www.youtube.com/embed/otNh9bTjXWg?si=NS2jmatYlJikT7QW',
      image_link: 'http://localhost:8080/assets/img/wonka.jpg',
      release_date: new Date('2023-12-15')
    },
    {
      title: 'John Wick: Chapter 4',
      description: 'John Wick uncovers a path to defeating the High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.',
      director: 'Chad Stahelski',
      writers: 'Shay Hatten, Michael Finch',
      youtube_link: 'https://www.youtube.com/embed/qEVUtrk8_B4?si=ogeHEpHOmOHoitC-',
      image_link: 'http://localhost:8080/assets/img/johnwick4.jpg',
      release_date: new Date('2023-03-24')
    }
  ]);
};
