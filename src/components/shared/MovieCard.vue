<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <div class="image">
                <img :src="movie.image" alt="">
            </div>
            <div class="content">
                <div class="header">
                    <div class="name">
                        <h3>Theater: {{movie.theater.name}}</h3>
                        <h1>{{movie.name}}</h1>
                    </div>
                </div>
                <div class="description">{{movie.description}}</div>
                <div class="price"><h1>{{currency}}{{movie.price || 0}}</h1></div>
            </div>
        </div>
        <div>
            <el-button
                v-for="(time, i) in movie.times"
                :key="i"
                :disabled="!time.available"
                :type="time.available ? 'success' : 'danger'" @click="goToMovie(movie._id, time.time)">
                {{time.time}}
            </el-button>
        </div>
    </el-card>
</template>

<script>
    import moment from 'moment'

    export default {
        props: ['movie'],
        data() {
            return {
                currency: '$'
            }
        },
        methods: {
            formatDate() {
                return moment(this.hotel.date).format('L HH:mm')
            },
            goToMovie(id, time) {
                this.$router.push({ path: `/movie/${id}?time=${time}`});
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/styles/helpers';

    .box-card {
        margin-bottom: 20px;
        width: 100%;
    }

    .clearfix {
        display: flex;

        @media (max-width: 768px) {
            flex-direction: column;

            .image {
                width: unset !important;
                padding: 0;
            }
            .content {
                width: calc(100% - 40px) !important;
            }
        }

        .image {
            width: 50%;
            height: 300px;
            overflow: hidden;
            @extend .flex-it;
            
            img {
                width: 100%;
            }
        }
        .content {
            position: relative;
            width: calc(70% - 40px);
            padding: 0 20px;

            .header {
                @extend .flex-it;
                flex-direction: column;
                align-items: flex-start;

                .name {
                    display: flex;
                    flex-direction: column;

                    h1 {
                        margin: 5px 0;
                    }
                    h3 {
                        margin: 0;
                    }
                }
            }
            .description {

            }
            .price {
                position: absolute;
                right: 0;
                bottom: 0;
                display: flex;
                justify-content: flex-end;

                h1 {
                    margin: 0;
                }
            }
            .footer {
                @extend .flex-it;

            }
        }
    }
</style>

