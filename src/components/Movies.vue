<template>
    <div class="main">
      <h1>Movies</h1>
      <div class="movies">
        <MovieCard v-for="(movie, i) in movies" :key="i"
            :movie="movie"
            @onGetReviews="getReviews($event)"
            @onSetFavourite="setFavourite($event)"/>
      </div>
    </div>
</template>

<script>
import Service from "@/services/Service";
import Notifications from "@/services/Notifications";
import MovieCard from "@/components/shared/MovieCard";

export default {
  name: "movies",
  components: {
    Service,
    Notifications,
    MovieCard
  },
  data() {
    return {
      loading: false,
      movies: []
    };
  },
  created() {
    this.getMovies()
  },
  // computed: {
  //   movies() {
  //     return this.$store.state.movies;
  //   }
  // },
  // watch: {
  //   movies() {}
  // },
  methods: {
    getMovies() {
      this.loading = true;
      Service.methods.get("movie").then(response => {
        this.$store.commit("setMovies", response.data);
        // Notifications.methods.emit('Error', response, 'error')
        this.loading = false;
        this.movies = response.data;
      });
    },
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/mixins';

.movies {
  @include grid-items(10px, 10px, 2, 2, 1);  
}
</style>
