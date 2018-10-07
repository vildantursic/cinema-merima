<template>
    <div class="main">
      <div v-if="movie.times.length !== 0" v-loading="loading"> 
        <h1>{{movie.name}} - {{$route.query.time}}</h1>
        <div
          v-if="movie.times.filter(item => item.time === $route.query.time).length !== 0"
          class="rows"
          v-for="(row, i) in movie.times.filter(item => item.time === $route.query.time)[0].space"
          :key="i">
            {{row.row}}
          <div class="seats">
            <SeatCard
              v-for="(seat, j) in row.seats" :key="j" :seat="seat"
              @onSetSeat="setSeat($event, row.row)"/>
          </div>
        </div>
        <div class="screen">
          <p>SCREEN</p>
          <div class="display"></div>
        </div>
        <div class="confirmation">
          <el-button :disabled="booked.length === 0" type="success" icon="el-icon-check" circle @click="dialogVisible = true"></el-button>
          <el-button :disabled="booked.length === 0" type="danger" icon="el-icon-close" circle @click="clearBooking"></el-button>
          <el-button :disabled="bill.length === 0" type="primary" icon="el-icon-document" circle @click="getBill"></el-button>

          <el-dialog
            title="Buy Tickets"
            :visible.sync="dialogVisible"
            width="30%">
            <span>Are your sure you want to buy tickets?</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">No</el-button>
              <el-button type="primary" @click="buyTickets()">Yes</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
    </div>
</template>

<script>
import Service from '@/services/Service'
import SeatCard from '@/components/shared/SeatCard'
import Notifications from '@/services/Notifications'
import { find } from 'lodash';

export default {
  name: 'movie',
  components: {
    Service,
    SeatCard,
    Notifications
  },
  data() {
    return {
      loading: false,
      movie: {
        times: []
      },
      booked: [],
      bill: [],
      dialogVisible: false
    }
  },
  created() {
      this.getMovie()
  },
  methods: {
    getMovie() {
      Service.methods
              .get(`movie/${this.$route.params.id}`)
              .then(response => {
                response.data.times.filter(item => item.time === this.$route.query.time)[0].space.map((r) => {
                  r.seats.map((s) => {
                    s.booked = false;
                    return s;
                  })
                  return r;
                })
                return response.data;
              })
              .then((response) => {
                this.movie = response;
              });
    },
    setSeat(seat, row) {
      this.movie.times.filter(item => item.time === this.$route.query.time)[0].space.map((r) => {
        if (r.row == row) {
          r.seats.map((s) => {
            if (s.seat == seat && s.available) {
              s.booked = !s.booked;

              const bookEl = find(this.booked, { 'row': row, 'seat': seat })
              if (bookEl) {
                this.booked.splice(this.booked.indexOf(bookEl), 1);
              } else {
                this.booked.push({
                  row: row,
                  seat: seat
                })
              }
            }
            return s;
          })
          return r;
        }
      })
    },
    buyTickets() {
      this.loading = true;
      this.dialogVisible = false;
      Service.methods
        .put(`movie/${this.movie._id}`, {
          seats: this.booked,
          time: this.$route.query.time
        })
      this.booked.forEach(el => {
        this.bill.push({
          name: 'Ticket',
          price: this.movie.price,
          seat: el
        })
      })
      this.booked = [];
      setTimeout(() => {
        this.getMovie();
        this.loading = false;
        Notifications.methods.emit('Success', 'Successfully bought tickets', 'success')
      }, 2000)
    },
    clearBooking() {
      this.booked.forEach(el => {
        this.movie.times.filter(item => item.time === this.$route.query.time)[0].space.map(r => {
          if (r.row == el.row) {
            r.seats.map(s => {
              if (s.seat == el.seat) {
                s.booked = false;
              }
              return s;
            })
            return r;
          }
        })
      })
      this.booked = [];
    },
    getBill() {
      this.$store.commit('setBill', this.bill);
      this.$router.push({ path: `/bill`});
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/mixins';

.rows {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .seats {
    display: flex;
    width: 100%;
    @include grid-items(5px, 5px, 8, 8, 8);
    align-content: center;
    justify-content: center;
  }
}
.screen {
  margin: 150px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .display {
    width: 70%;
    height: 5px;
    background: gray;
  }
}
.confirmation {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
</style>
