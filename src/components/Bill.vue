<template>
    <div class="main">
        <el-row class="bill">
            <el-col :span="24" class="center">
                <h4 class="m-0">"MY CINEMA" d.o.o.</h4>
                <h4 class="m-0">Moja Adresa br. 1</h4>
                <h4 class="m-0">71000 Sarajevo</h4>
            </el-col>
            <el-col>
                <div class="split-bill"></div>
            </el-col>
            <el-col>
                <p>JIB: 472389573478473284</p>
                <p>PIB: 000000000000000000</p>
                <p>IBMF: AF404821</p>
            </el-col>
            <el-col>
                <div class="split-bill"></div>                
            </el-col>
            <el-col>
                <h2 class="center">Fiskalni Racun</h2>
                <p>BF: 21251</p>
                <p>{{new Date()}}</p>
            </el-col>
            <el-col>
                <div class="split-bill"></div>                
            </el-col>
            <el-col :span="24">
                <!-- <el-table :data="$store.state.bill" :fit="true">
                  <el-table-column property="name" label="Name"></el-table-column>
                  <el-table-column property="price" label="Price"></el-table-column>
                  <el-table-column property="size" label="Size"></el-table-column>
                  <el-table-column property="amount" label="Amount"></el-table-column>
                </el-table> -->
                <table width="100%">
                    <!-- <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Size</th>
                            <th>Amount</th>
                        </tr>
                    </thead> -->
                    <tbody>
                        <tr v-for="(el, i) in $store.state.bill" :key="i">
                            <td class="split"><span>{{el.name}}</span><span>{{el.price}}</span></td>
                        </tr>
                    </tbody>
                </table>
            </el-col>
            <el-col>
                <div class="split-bill"></div>                
            </el-col>
            <el-col :span="24">
                <p class="split"><span>VA: 0,00$</span></p>
                <p class="split"><span>OSN A:</span><span>{{total}}</span></p>
                <p class="split"><span>PDV A:</span><span>0</span></p>
                <p class="split"><span>PDV:</span><span>0</span></p>

                <h4 class="split"><span>TOTAL:</span><span>{{total}}</span></h4>
            </el-col>
            <el-col :span="24">
                <el-button ref="print" type="primary" @click="printBill()">PRINT</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>

export default {
  name: "bill",
  data() {
      return {
          total: 0
      }
  },
  created() {
      this.getTotal();
  },
  methods: {
      printBill() {
        let header = document.getElementsByTagName('header')[0];
        header.style.display = 'none'
        this.$refs.print.$el.style.display = 'none'
        window.print();
        header.style.display = 'block'
        this.$refs.print.$el.style.display = 'block'        
      },
      getTotal() {
          this.$store.state.bill.forEach(el => {
              this.total += el.price
          })
      }
  }
};
</script>

<style lang="scss" scoped>
.bill {
    width: 350px;
    border: solid 1px black;
    padding: 15px;
}
.center {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.m-0 {
    margin: 0;
}
.split {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.split-bill {
    width: 100%;
    height: 1px;
    border-bottom: 1px dashed black;
    margin: 3px 0;
}
</style>
