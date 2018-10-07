<template>
    <div class="main">
        <div class="nav">
          <h1>Food</h1>
          <div class="cart">
            <el-popover
              placement="right"
              width="600"
              trigger="click">
              <div class="cart">
                <el-table :data="orderedFood" max-height="350">
                  <el-table-column property="name" label="Name"></el-table-column>
                  <el-table-column property="price" label="Price"></el-table-column>
                  <el-table-column property="size" label="Size"></el-table-column>
                  <el-table-column property="amount" label="Amount"></el-table-column>
                  <el-table-column label="Operations">
                    <template slot-scope="scope">
                      <el-button @click.native.prevent="removeItem(scope.$index, orderedFood)" type="text" size="small">Remove</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="footer">
                  <div class="total">
                    <h4>Total: {{currency}}{{totalPrice}}</h4>
                  </div>
                  <div class="action-buttons">
                    <el-button slot="reference" @click="clearOrder" type="danger" :disabled="orderedFood.length === 0">Clear</el-button>
                    <el-button slot="reference" @click="dialogVisible = true" type="success" :disabled="orderedFood.length === 0">Buy</el-button>
                  </div>
                </div>
              </div>

              <el-button slot="reference">Cart - {{orderedFood.length}}</el-button>
            </el-popover>

            <el-dialog
              title="Confirm Order"
              :visible.sync="dialogVisible"
              width="30%">
              <span>Are your sure you want to confirm order?</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">No</el-button>
                <el-button type="primary" @click="confirmOrder()">Yes</el-button>
              </span>
            </el-dialog>
          </div>
        </div>
        <div>
          <el-row :gutter="12">
            <el-col :span="8" v-for="(item, i) in food" :key="i">
              <FoodCard :item="item" @onFoodSelect="setFoodInCart($event)"/>
            </el-col>
          </el-row>
        </div>
    </div>
</template>

<script>
import Service from "@/services/Service";
import FoodCard from "@/components/shared/FoodCard";
import Notifications from '@/services/Notifications'

export default {
  name: "food",
  components: {
    Service,
    FoodCard,
    Notifications
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      food: [],
      orderedFood: [],
      totalPrice: 0,
      currency: '$'
    };
  },
  created() {
    this.getFood();
  },
  methods: {
    getFood() {
      this.loading = true;
      Service.methods.get("food").then(response => {
        this.loading = false;
        this.food = response.data;
      });
    },
    setFoodInCart(item) {
      if (this.orderedFood.find(el => el === item)) {
        this.orderedFood.push({ ...item, amount: this.orderedFood.find(el => el === item).amount + 1 });
      } else {
        this.orderedFood.push({ ...item, amount: 1 });
      }
      this.totalPrice = 0;
      this.orderedFood.forEach(el => this.totalPrice += el.price);
    },
    removeItem(index, rows) {
      rows.splice(index, 1);
      this.totalPrice = 0;
      this.orderedFood.forEach(el => this.totalPrice += el.price);
    },
    confirmOrder() {
      Notifications.methods.emit('Success', 'Successfully bought food', 'success')
      this.$store.commit('setBill', this.orderedFood);
      this.$router.push({ path: `/bill`});
    },
    clearOrder() {
      this.orderedFood = [];
    }
  }
};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cart {
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 10px;
  }
}
</style>
