<template>
    <div>
        <div class="container">
            <div class="box">
                <span class="el color-3"></span>
                <span class="el color-2"></span>
                <span class="el"></span>
                <span class="el"></span>
                <span class="el color-1"></span>
                <span class="el color-3"></span>
                <span class="el color-2"></span>
                <span class="el"></span>
                <span class="el color-1"></span>
            </div>
        </div>
        <div class="main">
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="10">
                    <router-link to="/food">
                        <el-card shadow="hover" class="home-card">
                            <div class="image-box">
                                <img src="images/food.jpg" alt="">
                            </div>
                            <h1>Food</h1>
                            <div class="color-bottom"></div>    
                        </el-card>
                    </router-link>
                </el-col>
                <el-col :span="10">
                    <router-link to="/movies">
                        <el-card shadow="hover" class="home-card">
                            <div class="image-box">
                                <img src="images/movies.jpg" alt="">
                            </div>
                            <h1>Movies</h1>
                            <div class="color-bottom"></div>                
                        </el-card>
                    </router-link>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>

export default {
  name: "home"
};
</script>

<style lang="scss" scoped>
.home-card {
    position: relative;
    height: 400px;

    .image-box {
        height: 250px;
        width: 100%;
        overflow: hidden;

        img {
            width: 100%;
        }
    }

    .color-bottom {
        position: absolute;
        width: 100%;
        height: 30px;
        background-image: linear-gradient(-45deg, hsla(62, 100%, 50%, .8), hsla(322, 100%, 50%, .8));
        animation: hue 10s infinite alternate;
    }
}

.container {
  height: 100vh;
  width: 100%;
  z-index: -1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  opacity: 0.4;
  
  .box {
    width: 100%;
    height: 100vh;
    transform: skewY(-20deg);
    display: grid;
    grid-template-columns: auto auto auto;
    
    .el {
    }
  }
}

.shade {
  box-shadow: 10px 10px 10px lightgrey;
}

.color-1 {
  background: linear-gradient(to right, transparent, #00BCD4);
}
.color-2 {
  background: linear-gradient(to left, transparent, #00BCD4);
}
.color-3 {
  background: #00BCD4;
}

@keyframes hue {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}
</style>
