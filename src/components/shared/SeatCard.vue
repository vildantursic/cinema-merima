<template>
    <div class="seat" :class="[seat.booked ? 'booked' : '']" @click="onSetSeat(seat.seat)">
        <h4 class="number">{{+seat.seat + 1}}</h4>
        <img :src="[!seat.available ? 'images/not-available.png' : 'images/available.png']"/>
    </div>
</template>

<script>
    export default {
        props: ['seat'],
        data() {
            return {
            }
        },
        methods: {
            onSetSeat(seat) {
                this.$emit('onSetSeat', seat)
            }
        }
    }
</script>

<style lang="scss" scoped>
.seat {
    position: relative;
    display: flex;
    width: 40px !important;
    height: 40px;
    align-items: center;
    justify-content: center;
    background: none;
    border: solid 3px transparent;
    margin: 10px;

    .number {
        position: absolute;
        padding: 0;
        margin: 0;
    }
}
.booked {
    border: solid 3px red !important;
}
</style>
