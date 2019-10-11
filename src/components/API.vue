<template>
  <div id="home-page">
    <v-row>
      <v-col align="center">
        <img alt="Vue logo" src="../assets/logo.png" style="height:100%" />
      </v-col>
    </v-row>
    <h1>Crypto Currencies</h1>
    <v-text-field v-model="search" label="Search" append-icon="search" clear-icon="true"></v-text-field>

    <v-snackbar id="csvSaved" v-model="alert" top :color="alertType" :timeout="alertTimeout">
      {{this.alertText}}
      <v-btn text @click="alert = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-skeleton-loader
      v-if="loading"
      ref="skeleton"
      :boilerplate="false"
      type="table"
      :tile="false"
      class="mx-auto"
    ></v-skeleton-loader>
    <v-data-table
      v-if="!loading"
      show-select
      v-model="filtered"
      show-expand
      single-expand
      :expanded.sync="expanded"
      :search="search"
      :items-per-page="15"
      :headers="headers"
      :items="apiRes"
      item-key="rank"
      class="elevation-1"
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:item.logo_url="{ item }">
        <v-img :src="item.logo_url" height="30" width="30"></v-img>
      </template>
      <template v-slot:expanded-item="{ item }">
        <td :colspan="12">
          <br />
          <v-card class="mx-auto" :elevation="24">
            <v-card-text>
              <v-col cols="12">
                <v-data-table
                  hide-default-footer
                  :headers="subheaders"
                  :items="[item]"
                  item-key="name"
                  class="elevation-1"
                ></v-data-table>
              </v-col>
            </v-card-text>
          </v-card>
          <br />
          <v-card class="mx-auto" :elevation="24">
            <v-card-title>Edit Data</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="onSubmit">
                <v-container>
                  <v-row>
                    <v-col cols="4">
                      <v-text-field id="currency" v-model="item.currency" label="Currency" required></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        id="coinname"
                        v-model="item.name"
                        name="input-10-1"
                        label="Coin Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field id="price" v-model="item.price" name="input-10-1" label="Price"></v-text-field>
                    </v-col>
                  </v-row>
                  <!-- <v-btn id="button-register" color="primary" text type="submit">Submit</v-btn> -->
                </v-container>
              </v-form>
            </v-card-text>
          </v-card>
          <br />
        </td>
      </template>
    </v-data-table>
    <v-btn v-if="!loading" @click="saveData2()">Export Selected: CSV</v-btn>
    <v-btn v-if="!loading" @click="openDialog()">Set Export Location</v-btn>
    <v-btn v-if="!loading" @click="exportToLocation()">Export to Location</v-btn>
  </div>
</template>

<script>
import axios from "axios";
import fs from "fs";
import os from "os";
import fastcsv from "fast-csv";
import path from "path";

export default {
  name: "home-page",
  data() {
    return {
      expanded: [],
      isActive: false,
      filtered: [],
      loading: true,
      alert: false,
      alertType: "",
      alertText: "",
      alertTimeout: null,
      search: "",
      headers: [
        {
          text: "",
          align: "center",
          filterable: false,
          sortable: false,
          value: "logo_url"
        },
        { text: "Rank", value: "rank" },
        { text: "Currency", value: "currency" },
        { text: "Name", value: "name" },
        { text: "Price (GBP)", filterable: false, value: "price" }
      ],
      subheaders: [
        {
          text: "Supply",
          filterable: false,
          sortable: false,
          value: "circulating_supply"
        },
        {
          text: "Max Supply",
          filterable: false,
          sortable: false,
          value: "max_supply"
        },
        {
          text: "Highest Price (GPB)",
          filterable: false,
          sortable: false,
          // width: "1%",
          value: "high"
        },
        {
          text: "Date",
          filterable: false,
          sortable: false,
          value: "high_timestamp"
        }
      ],
      apiRes: [],
      folderPath: ""
    };
  },
  mounted() {
    const { app } = require("electron").remote;
    this.folderPath = app.getPath("documents");
    this.getData();
    this.interval = setInterval(() => {
      this.getData();
    }, 12000000);
  },
  methods: {
    alertSuccess() {
      this.alertType = "success";
      this.alert = true;
      this.alertTimeout = 5000;
    },
    alertError() {
      this.alertType = "error";
      this.alert = true;
      this.alertTimeout = 10000;
    },
    alertWarning() {
      this.alertType = "warning";
      this.alert = true;
      this.alertTimeout = 5000;
    },
    getData() {
      axios
        .get(
          "https://api.nomics.com/v1/currencies/ticker?key=c297794788956c8e2886cddc3b3a2d46&ids=BTC,DARK,XBT,ZEC,DASH,ETC,USDT,BTCH,BCH,BCASH,ETH,LTC,LBC,XRP&interval=1h,30d&convert=GBP"
          // "https://api.nomics.com/v1/currencies/ticker?key=c297794788956c8e2886cddc3b3a2d46&interval=1h,30d&convert=GBP"
        )
        .then(res => {
          this.apiRes = res.data;
          this.loading = false;
        });
    },
    exportToLocation() {
      const { dialog } = require("electron").remote;
      const options = {
        title: "Set Defult Export Location",
        defaultPath: this.folderPath,
        buttonLabel: "Select",
        properties: ["openDirectory"]
      };
      dialog.showOpenDialog(null, options).then(res => {
        if (!res.canceled) {
          this.folderPath = res.filePaths[0];
          this.alertSuccess();
          this.alertText = "Export Location Saved";
          this.saveData2();
        } else {
          this.alertWarning();
          this.alertText = "Canceled";
        }
      });
    },
    async openDialog() {
      const { dialog } = require("electron").remote;
      const options = {
        title: "Set Defult Export Location",
        defaultPath: this.folderPath,
        buttonLabel: "Select",
        properties: ["openDirectory"]
      };
      dialog.showOpenDialog(null, options).then(res => {
        if (!res.canceled) {
          this.folderPath = res.filePaths[0];
          this.alertSuccess();
          this.alertText = "Export Location Saved";
        } else {
          this.alertWarning();
          this.alertText = "Canceled";
        }
      });
    },
    async saveData2() {
      let filename = this.dFormat() + " crypto data.csv";
      let data = [];
      if (this.filtered.length !== 0) {
        data = this.filtered;
      } else {
        data = this.apiRes;
      }
      // const ws = fs.createWriteStream(filename);
      // fastcsv
      // .write(this.apiRes, { headers: true })
      // .pipe(ws)
      fastcsv
        .writeToPath(path.resolve(this.folderPath, filename), data, {
          headers: true
        })
        .on("error", err => {
          this.alertError();
          this.alertText = "CSV Not Created! " + '"' + err + '"';
        })
        .on("finish", () => {
          this.alertSuccess();
          this.alertText = filename + " created successfully";
        });
    },
    saveData() {
      let filename = this.dFormat() + " crypto data.csv";
      let save = new Promise(resolve => {
        let output = [];
        let header = [
          '"logo_url"',
          '"rank"',
          '"currency"',
          '"name"',
          '"price"',
          '"circulating_supply"',
          '"max_supply"',
          '"high"',
          '"high_timestamp"'
        ];
        output.push(header.join());

        if (this.filtered.length !== 0) {
          this.filtered.forEach(d => {
            const row = [];
            row.push(`"${d.logo_url}"`);
            row.push(`"${d.rank}"`);
            row.push(`"${d.currency}"`);
            row.push(`"${d.name}"`);
            row.push(`"${d.price}"`);
            row.push(`"${d.circulating_supply}"`);
            row.push(`"${d.max_supply}"`);
            row.push(`"${d.high}"`);
            row.push(`"${d.high_timestamp}"`);
            output.push(row.join());
          });
        } else {
          this.apiRes.forEach(d => {
            const row = [];
            row.push(`"${d.logo_url}"`);
            row.push(`"${d.rank}"`);
            row.push(`"${d.currency}"`);
            row.push(`"${d.name}"`);
            row.push(`"${d.price}"`);
            row.push(`"${d.circulating_supply}"`);
            row.push(`"${d.max_supply}"`);
            row.push(`"${d.high}"`);
            row.push(`"${d.high_timestamp}"`);
            output.push(row.join());
          });
        }
        fs.writeFileSync(filename, output.join(os.EOL));
        resolve(true);
      });
      save
        .then(() => {
          this.alertSuccess();
          this.alertText = filename + " created successfully";
        })
        .catch(err => {
          this.alertError();
          this.alertText = "csv not created!" + err;
        });
    },
    dFormat() {
      var date = new Date();
      var yyyy = date.getFullYear();
      var dd = date.getDate();
      var mm = date.getMonth() + 1;

      if (dd < 10) dd = "0" + dd;

      if (mm < 10) mm = "0" + mm;

      var cur_day = yyyy + "-" + mm + "-" + dd;

      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();

      if (hours < 10) hours = "0" + hours;

      if (minutes < 10) minutes = "0" + minutes;

      if (seconds < 10) seconds = "0" + seconds;

      return cur_day + " " + hours + "h" + minutes + "m" + seconds + "s";
    }
  }
};
</script>

<style scoped>
</style>