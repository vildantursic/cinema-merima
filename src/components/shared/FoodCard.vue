<template>
    <div>
        <el-card shadow="hover" class="food-card" :body-style="{ padding: '0px' }">
            <el-tag>{{returnSizeInText(item.size)}}</el-tag>
            <img :src="item.image" class="image">
            <div style="padding: 14px;">
                <h1>{{item.name}}</h1>
                <div class="bottom">
                    <div class="description"><span class="price">${{item.price}}</span></div>
                    <el-button v-on:click="onFoodSelect(item)">ADD</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        props: ['item'],
        methods: {
            onFoodSelect(item) {
                this.$emit('onFoodSelect', item)
            },
            returnSizeInText(size) {
                switch(size) {
                    case 'S':
                        return 'Small'
                    case 'M':
                        return 'Medium'
                    case 'L':
                        return 'Large'
                    default:
                        return 'No Size'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.food-card {
    cursor: pointer;

    .description {
        .price {
            font-size: 25px;
        }
        .size {
            font-size: 15px;
            color: #999;
        }
    }

    .bottom {
        margin-top: 13px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .image {
        width: 100%;
        display: block;
    }
}
</style>
