<template>
  <div id="home-page">
    <v-snackbar id="Alert" v-model="alert" top :color="alertType" :timeout="alertTimeout">
      {{this.alertText}}
      <v-btn text @click="alert = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-row>
      <v-col align="center">
        <img alt="Vue logo" src="../assets/logo.png" style="height:100%" />
      </v-col>
    </v-row>
    <h1>Poem Search</h1>
    <v-form @submit.prevent="computeSearch()">
      <v-row>
        <v-col cols="3">
          <v-select
            v-model="catSelect"
            :items="categories"
            :menu-props="{ maxHeight: '400' }"
            label="Category"
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="query" label="Search" clear-icon="true"></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-btn text icon left bottom type="submit">
            <v-icon>search</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-data-table
      v-model="filtered"
      :expanded.sync="expanded"
      :items-per-page="15"
      :headers="headers"
      :items="doc"
      item-key="title"
      class="elevation-5"
    >
      <template v-slot:item.notes="{ item }">
        <v-btn v-if="item.notes!==null" text icon @click="handleClick(item)">
          <v-icon>mdi-dots-horizontal</v-icon>
        </v-btn>
      </template>
      <template v-slot:item.title="{ item }">
        <div @click="copyText2(item.title)">
          <p>{{item.title}}</p>
        </div>
      </template>
      <template v-slot:item.content="{ item }">
        <div @click="copyText2(item.content)">
          <p>{{item.content}}</p>
        </div>
      </template>
      <template v-slot:item.poet="{ item }">
        <div @click="copyText2(item.poet)">
          <p>{{item.poet}}</p>
        </div>
      </template>
      <template v-slot:item.url="{ item }">
        <div @click="copyText2(item.url)">
          <p>{{item.url}}</p>
        </div>
      </template>
      <template v-slot:item.ip="{ item }">
        <div @click="copyText2(item.ip)">
          <p>{{item.ip}}</p>
        </div>
      </template>
      <template v-slot:item.email="{ item }">
        <div @click="copyText2(item.email)">
          <p>{{item.email}}</p>
        </div>
      </template>
      <template v-slot:expanded-item="{ item }">
        <td :colspan="12">
          <div @click="copyText2(item.notes)">
            <p>{{item.notes}}</p>
          </div>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import lunr from "lunr";
import _ from "lodash";

export default {
  name: "search",
  data() {
    return {
      icon: "mdi-arrow-down-drop-circle-outline",
      catSelect: "Any",
      expanded: [],
      isActive: false,
      filtered: [],
      loading: true,
      saved: false,
      error: false,
      savedText: "",
      categories: ["Any", "Title", "Content", "Poet", "URL", "IP", "Email"],
      headers: [
        { text: "notes", filterable: false, sortable: false, value: "notes" },
        {
          text: "Title",
          filterable: true,
          sortable: true,
          value: "title",
          align: "start"
        },
        {
          text: "Content",
          filterable: true,
          sortable: true,
          value: "content",
          align: "start"
        },
        {
          text: "Poet",
          filterable: true,
          sortable: true,
          value: "poet",
          align: "start"
        },
        {
          text: "URL",
          filterable: true,
          sortable: true,
          value: "url",
          align: "start"
        },
        {
          text: "IP",
          filterable: true,
          sortable: true,
          value: "ip",
          align: "start"
        },
        {
          text: "Email",
          filterable: true,
          sortable: true,
          value: "email",
          align: "start"
        }
      ],
      poems: [
        {
          title: "A Fickle Woman",
          content:
            "Her nature is the sea's, that smiles to-night\nA radiant maiden in the moon's soft light;\nThe unsuspecting seaman sets his sails,\nForgetful of the fury of her gales;\nTo-morrow, mad with storms, the ocean roars,\nAnd o'er his hapless wreck the flood she pours!",
          url: "https://www.poemist.com/eugene-field/a-fickle-woman",
          poet: "Eugene Field",
          ip: "192.168.1.0",
          email: "admin@mail.info",
          notes: "something"
        },
        {
          title: "The Chaplet",
          content:
            "A little girl through field and wood\nWent plucking flowerets here and there,\nWhen suddenly beside her stood\nA lady wondrous fair!\n\nThe lovely lady smiled, and laid\nA wreath upon the maiden's brow;\n'Wear it, 'twill blossom soon,' she said,\n'Although 'tis leafless now.'\n\nThe little maiden older grew\nAnd wandered forth of moonlight eves,\nAnd sighed and loved as maids will do;\nWhen, lo! her wreath bore leaves.\n\nThen was our maid a wife, and hung\nUpon a joyful bridegroom's bosom;\nWhen from the garland's leaves there sprung\nFair store of blossom.\n\nAnd presently a baby fair\nUpon her gentle breast she reared;\nWhen midst the wreath that bound her hair\nRich golden fruit appeared.\n\nBut when her love lay cold in death,\nSunk in the black and silent tomb,\nAll sere and withered was the wreath\nThat wont so bright to bloom.\n\nYet still the withered wreath she wore;\nShe wore it at her dying hour;\nWhen, to the wondrous garland bore\nBoth leaf, and fruit, and flower!",
          url: "https://www.poemist.com/william-makepe-thackeray/the-chaplet",
          poet: "William Makepe Thackeray",
          ip: "235.53.1.0",
          email: "Jerry@guru.com",
          notes: null
        },
        {
          title: "Written by Himself",
          content:
            "I was born in minutes in a roadside kitchen a skillet\nwhispering my name. I was born to rainwater and lye;\nI was born across the river where I\nwas borrowed with clothespins, a harrow tooth,\nbroadsides sewn in my shoes. I returned, though\nit please you, through no fault of my own,\npockets filled with coffee grounds and eggshells.\nI was born still and superstitious; I bore an unexpected burden.\nI gave birth, I gave blessing, I gave rise to suspicion.\nI was born abandoned outdoors in the heat-shaped air,\nair drifting like spirits and old windows.\nI was born a fraction and a cipher and a ledger entry;\nI was an index of first lines when I was born.\nI was born waist-deep stubborn in the water crying\n                              ain't I a woman and a brother I was born\nto this hall of mirrors, this horror story I was\nborn with a prologue of references, pursued\nby mosquitoes and thieves, I was born passing\noff the problem of the twentieth century: I was born.\nI read minds before I could read fishes and loaves;\nI walked a piece of the way alone before I was born.",
          url: "https://www.poemist.com/gregory-pardlo/written-by-himself",
          poet: "Gregory Pardlo",
          ip: "23.432.53.0",
          email: "Bob@gmail.com",
          notes: null
        },
        {
          title: "Sonnet Xxviii: Weak Is The Sophistry",
          content:
            "Weak is the sophistry, and vain the art\nThat whispers patience to the mind's despair!\nThat bids reflection bathe the wounds of care,\nWhile Hope, with pleasing phantoms, soothes their smart.\nFor mem'ry still, reluctant to depart\nFrom the dear spot, once rich in prospects fair,\nBids the fond soul enamour'd there,\nAnd its least charm is grateful to the heart!\nHe never lov'd, who could not muse and sigh,\nSpangling the sacred turf with frequent tears,\nWhere the small rivulet, that ripples by,\nRecalls the scenes of past and happier years,\nWhen, on its banks he watch'd the speaking eye,\nAnd one sweet smile o'erpaid an age of fears!",
          url:
            "https://www.poemist.com/mary-darby-robinson/sonnet-xxviii-weak-is-the-sophistry",
          poet: "Mary Darby Robinson",
          ip: "643.234.35.0",
          email: "harry@guru.co.uk",
          notes: "something"
        },
        {
          title: "Memory and Hope",
          content:
            "I rebehold you, O belov\u00e9d Dead\nAbout these doors and windows gather\u00e9d;\nWith hands held out your own I seem to seize,\nAs water to the eye shows mirrored faces\nThat lean to meet our own in fond embraces\nTill on love-kindled lips our kisses freeze.\n\nO! Thou who madest memory, must it be\nFor nought at all?... Nay, we must render Thee,\nWhen life is over in one stream to pour\nWhat hath gone past and what is beyond knowing,\nThe two halves of our life together flowing,\nThis saying 'Never,' and that 'For evermore.'\n\nShall not this bygone Eden that we knew\nIn our Eternal Life have shape and hue?\nFor where Time is not shall not all Time be?\nIn that calm breast whereto our souls are cleaving\nShall we not find our loved ones beyond grieving\nAbout the hearth-stone of Eternity?\n\n translated by Wilfrid Thorley",
          url: "https://www.poemist.com/alphonse-de-lamartine/memory-and-hope",
          poet: "Alphonse de Lamartine",
          ip: "255.255.255.0",
          email: "thing@1.net",
          notes: null
        },
        {
          title: "To The Queen At Oxford",
          content:
            "Great Lady! That thus quite against our use, \nWe speak your welcome by an English Muse, \nAnd in a vulgar tongue our zeales contrive, \nIs to confess your large prerogative, \nWho have the pow'rful freedom to dispense \nWith our strict Rules, or Customes difference. \nTis fit when such a Star deigns to appeare \nAnd shine within the Academick Spheare, \nThat ev'ry Colledge grac't by your resort, \nShould onely speak the language of your Court; \nAs if Apollo's learned Quire, but You \nNo other Queen of the Ascendent knew. \nLet those that list invoke the Delphian name, \nTo light their verse, and quench their doting flame; \nIn Helicon it were High Treason now, \nDid any to a feign'd Minerva bow; \nWhen You are present, whose chast vertues stain \nThe vaunted glories of her Maiden brain. \nI would not flatter. May that dyet feed \nDeform'd and vicious soules: they onely need \nSuch physick, who grown sick of their decayes, \nAre onely cur'd with surfets of false praise; \nLike those, who fall'n from Youth or Beauties grace, \nLay colours on which more bely the face. \nBe You still what You are; a glorious Theme \nFor Truth to crown. So when that Diademe \nWhich circles Your fair brow drops off, and time \nShall lift You to that pitch our prayers climbe; \nPosterity will plat a nobler wreath, \nTo crown Your fame and memory in death. \nThis is sad truth and plain, which I might fear \nWould scarce prove welcome to a Princes ear; \nAnd hardly may you think that Writer wise \nWho preaches there where he should poetize; \nYet where so rich a bank of goodness is, \nTriumphs and Feasts admit such thoughts as this; \nNor will your vertue from her Client turn, \nAlthough he bring his tribute in an urn. \nEnough of this: who knowes not when to end \nNeeds must by tedious diligence offend. \n'Tis not a Poets office to advance \nThe precious value of allegiance. \nAnd least of all the rest do I affect \nTo word my duty in this dialect. \nMy service lies a better way, whose tone \nIs spirited by full devotion. \nThus whil'st I mention You, Your Royal Mate, \nAnd Those which your blest line perpetuate, \nI shall such votes of happiness reherse, \nWhose softest accents will out-tongue my verse.",
          url: "https://www.poemist.com/henry-king/to-the-queen-at-oxford",
          poet: "Henry King",
          ip: "0.0.0.0",
          email: "thing@2.com",
          notes: "something"
        },
        {
          title: "The Famous Victory Of Saarbrucken",
          content:
            "At centre, the Emperor, blue-yellow, in apotheosis,\nGallops off, ramrod straight, on his fine gee-gee,\nVery happy \u2013 since everything he sees is rosy, \nFierce as Zeus, and as gentle as a Daddy is: \n\nThe brave Infantrymen taking a nap, in vain, \nUnder the gilded drums and scarlet cannon,\nRise politely. One puts his tunic back on,\nAnd, turns to the Chief, stunned by the big name!\n\nOn the right, another, leaning on his rifle butt,\nFeeling the hair rise at the back of his neck,\nShouts: \u2018Vive L\u2019Empereur!!\u201d \u2013 his neighbour\u2019s mute\u2026\n\nA shako rises, like a black sun\u2026\u2013 In the midst\nThe last, a simpleton in red and blue, lying on his gut\nGets up, and, \u2013 showing his arse \u2013 asks: \u201cOn what?\u201d",
          url:
            "https://www.poemist.com/arthur-rimbaud/the-famous-victory-of-saarbrucken",
          poet: "Arthur Rimbaud",
          ip: "174.243.1.5",
          email: "matt@live.chruch",
          notes: null
        },
        {
          title: "Hos Gud, f\u00f8r Verdens Grund blev lagt",
          content:
            "Hos Gud, f\u00f8r Verdens Grund blev lagt,\nI Lys og Herlighed og Magt\nHan Tiden giennemskued,\nHan Verden saae, f\u00f8r den blev f\u00f8d,\nHan saae dens Fald, han saae dens N\u00f8d,\nOg D\u00f8den, som os trued.\nStore, dybe Frelser-Naade!\n   Retf\u00e6rds Gaade\n   Er udgrundet,\nFrelsens Vei er seet, er fundet!\nDet er fuldendt: fra Jordens N\u00f8d,\nFra Tr\u00e6ngsel, Armod, Kors og D\u00f8d,\nGaaer Herren til Guds \u00c6re!\nDen Haand, som trued Storm og Hav, \nDen Haand, som spr\u00e6ngde Verdens Grav,\nSkal Himmel-Spiret b\u00e6re!\nSalig, Frelser, Du opstiger,\n   Jorden viger,\n   Himlen blinker,\nHerlighedens Krone vinker! \nAlt Skyens Glands omstraaler Dig,\nDu end velsigner Jorderig,\nOg m\u00e6gtig Arm udbreder! \nBebudet har du os Din Aand, \nNaar ved din Faders h\u00f8ire Haand\nDig Engles H\u00e6r tilbeder!\nHerre! stig Du til din Throne! \n   Salig tone\n   Fugle-Stemmer:\nJesus Christus os ei glemmer!",
          url:
            "https://www.poemist.com/nicolaj-freder-grundtvig/hos-gud-for-verdens-grund-blev-lagt",
          poet: "Nicolaj Freder Grundtvig",
          ip: "192.100.1.0",
          email: "mrT@here.london",
          notes: null
        },
        {
          title: "Death And The Lady",
          content:
            "TURN in, my lord, she said ;\n     As it were the Father of Sin\n   I have hated the Father of the Dead,\n     The slayer of my kin ;\n   By the Father of the Living led,\n     Turn in, my lord, turn in.\n\n   We were foes of old ; thy touch was cold,\n     But mine is warm as life ;\n   I have struggled and made thee loose thy hold,\n   I have turned aside the knife.\n Despair itself in me was bold,\n   I have striven, and won the strife.\n\n But that which conquered thee and rose\n   Again to earth descends ;\n For the last time we have come to blows.\n   And the long combat ends.\n The worst and secretest of foes,\n   Be now my friend of friends.",
          url:
            "https://www.poemist.com/mary-elizabeth-coleridge/death-and-the-lady",
          poet: "Mary Elizabeth Coleridge",
          ip: "192.168.3.0",
          email: "pinky@brain.co",
          notes: "something"
        },
        {
          title: "Christmas",
          content:
            "At Christmas time with snow on the ground\n And the outdoor lights glistening all around\n With lights twinkling from the Christmas tree\n Making a beautiful sight, for all to see.\n\n Trees with angels and tinsel balls too\n And popcorn stringers that's made by you\n Cherished ornaments that will never be forgot\n That over the years, the children have bought.\n\n Presents will soon be around the tree\n Making us guess what each will be\n The oh's and ah's the children will shout\n Hoping it's a gift they just couldn't live without.\n\n The lights will be lit on the tree and glow\n With the star on top letting us all know\n That Christmas is a time of love and sharing\n Of peace and good will with caring\n\n The turkey and trimmings will then soon appear\n Then we sit down together and bless all that are dear.\n Our grace giving thanks to God will be said\n With a hope that all God's children will also be fed.",
          url: "https://www.poemist.com/vena-humphrey/christmas%20hi",
          poet: "Vena Humphrey",
          ip: "192.168.1.6",
          email: "admin@guru.com",
          notes: null
        }
      ],
      idx: null,
      query: "",
      results: [],
      documents: [],
      doc: [],
      alert: false,
      alertText: null,
      alertType: null,
      alertTimeout: 0
    };
  },
  mounted() {
    this.index();
    this.computeSearch();
  },
  computed: {},

  methods: {
    copyText(containerid) {
      var range = document.createRange();
      // console.log(range);
      range.selectNode(document.getElementById(containerid));
      // console.log(range);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      // console.log(window);
      // console.log(window.getSelection());
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
    },
    copyText2(text) {
      var textArea = document.createElement("textarea");
      textArea.style.position = "fixed";
      textArea.style.top = 0;
      textArea.style.left = 0;
      textArea.style.width = "2em";
      textArea.style.height = "2em";
      textArea.style.padding = 0;
      textArea.style.border = "none";
      textArea.style.outline = "none";
      textArea.style.boxShadow = "none";
      textArea.style.background = "transparent";
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();

      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        this.alert = false;
        this.alert = true;
        if (msg === "successful") {
          this.alertType = "cyan darken-2";
          this.alertText = "Copied!";
          this.alertTimeout = 1000;
        } else {
          this.alertType = "error";
          this.alertText = "Failed to copy text";
          this.alertTimeout = 10000;
        }
      } catch (err) {
        this.alert = true;
        this.alertType = "error";
        this.alertText = "failed to copy text: " + err;
        this.alertTimeout = 10000;
      }

      document.body.removeChild(textArea);
    },

    handleClick(item) {
      // let index = this.expanded.findIndex(x => x.title === item.title);
      let index = _.findIndex(this.expanded, item);
      if (index === -1) {
        this.expanded.push(item);
      } else {
        this.expanded.splice(index, 1);
      }
    },
    index() {
      // lunr.tokenizer.separator = /\s+/; // white space only
      let documents = this.poems.reduce(function(memo, doc) {
        memo[doc.title] = doc;
        return memo;
      }, {});
      let poems = this.poems;
      let idx = lunr(function() {
        this.tokenizer.separator = /[\s]+/;
        this.ref("title");
        this.field("title");
        this.field("content");
        this.field("poet");
        this.field("url");
        this.field("ip");
        this.field("email");
        // this.metadataWhitelist = ["position"];
        poems.forEach(function(doc) {
          this.add(doc);
        }, this);
      });
      this.idx = idx;
      this.documents = documents;
    },
    computeSearch() {
      let search = "";
      if (this.query.trim() !== "") {
        search = " " + this.query;
        search =
          " " +
          search
            .toLowerCase()
            .replace(/\\/g, "")
            .replace(/:/g, "\\:")
            .replace(/-/g, "\\-")
            .replace(/,/g, "")
            .replace(/;/g, "")
            .replace(/!/g, "")
            .replace(/'/g, "")
            // .replace(/\./g, "")
            .replace(/\?/g, "")
            .replace(/"/g, "")
            .replace(/ a /g, " ")
            .replace(/ i /g, " ")
            .replace(/ o /g, " ")
            .replace(/ you /g, " ")
            .replace(/ the /g, " ")
            .replace(/ is /g, " ")
            .replace(/ her /g, " ")
            .replace(/ that /g, " ")
            .replace(/ his /g, " ")
            .replace(/ she /g, " ")
            .replace(/ so /g, " ")
            .replace(/ at /g, " ")
            .replace(/ it /g, " ")
            .replace(/ as /g, " ")
            .replace(/ to /g, " ")
            .replace(/ on /g, " ")
            .replace(/ and /g, " ")
            .replace(/ of /g, " ")
            .replace(/ with /g, " ")
            .replace(/ there /g, " ")
            .replace(/ then /g, " ")
            .replace(/ in /g, " ")
            .replace(/ but /g, " ")
            .replace(/ when /g, " ")
            .replace(/ was /g, " ")
            .replace(/ went /g, " ")
            .replace(/ here /g, " ")
            .replace(/ tis /g, " ")
            .replace(/ siad /g, " ")
            .replace(/ well /g, " ")
            .replace(/ will /g, " ")
            .replace(/ do /g, " ")
            .replace(/ from /g, " ")
            .replace(/ all /g, " ")
            .replace(/ our /g, " ")
            .replace(/ yet /g, " ")
            .replace(/ said /g, " ")
            .trim() +
          " ";
        if (this.catSelect !== "Any" && this.catSelect !== null) {
          search = search
            .replace(/[\s]+/g, "~1 +" + this.catSelect.toLowerCase() + ":")
            .trim();
          search = search.substr(3).slice(0, -2);
        } else {
          search = search.replace(/[\s]+/g, "~1 +").trim();
          search = search.substr(3).slice(0, -2);
        }
      }
      // console.log(search);
      this.results = this.idx.search(search);
      this.doc = [];
      for (let i = 0; i < this.results.length; i++) {
        this.doc.push(this.documents[this.results[i].ref]);
      }
    }
  }
};
</script>

<style scoped>
</style>