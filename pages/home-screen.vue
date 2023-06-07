<template>
<app-bar>

    <v-window :value="currentHomePage" height="100%">
      <v-window-item value="0"
      >
        
        <div class="container">
            <div class="mb-4">
            <v-skeleton-loader type="image" v-if="posters.length < 1"></v-skeleton-loader>
            <v-card v-else background-color="grey-lighten-3">
                <v-carousel height="200" hide-delimiters cycle hide-arrows show-arrows-on-hover :show-arrows="false">
                    <v-carousel-item>
                        <iframe src="http://www.youtube.com/embed/54sDdNa9vek?autoplay=1&modestbranding=1&rel=0&fs=0&color=white&controls=0&disablekb=1" style="width: 100%" height="200" title="A YouTube video" frameborder="0"></iframe>
                    </v-carousel-item>
                    <v-carousel-item
                        v-for="(poster, i) in posters"
                        :key="i"
                        :src="poster"
                    ></v-carousel-item>
                </v-carousel>
            </v-card>
            </div>

            <h1>How it works</h1>

            <v-row class="d-flex align-center">
                <v-col cols="4" class="pa-0 m-0">
                    <v-card class="text-center pa-5 rounded-lg m-0 selections" elevation="0" v-ripple="{ class: `primary--text` }">
                        <v-icon size="60" color="primary">mdi-note-edit-outline</v-icon>
                        <h5 class="mt-2">Test Yourself</h5>
                    </v-card>
                </v-col>
                <v-col cols="4" class="pa-0 m-0">
                    <v-card class="text-center pa-5 rounded-lg m-0 selections" elevation="0" v-ripple="{ class: `primary--text` }">
                        <v-icon size="60" color="primary">mdi-file-chart</v-icon>
                        <h5 class="mt-2">Get Report</h5>
                    </v-card>
                </v-col>
                <v-col cols="4" class="pa-0 m-0">
                    <v-card class="text-center pa-5 rounded-lg m-0 selections" elevation="0" v-ripple="{ class: `primary--text` }">
                        <v-icon size="60" color="primary">mdi-doctor</v-icon>
                        <h5 class="mt-2">Find Doctors</h5>
                    </v-card>
                </v-col>
                <v-col cols="12" class="px-5">
                    <v-btn large block flat color="primary" depressed outlined>
                        <v-icon left>mdi-notebook</v-icon>
                        Start Daily Diary
                    </v-btn>
                </v-col>
            </v-row>



            <h1 class="text-left">Popular Tests</h1>

            <v-skeleton-loader type="image, article" v-if="tests.length < 1"></v-skeleton-loader>
            <v-window class="card-slider" show-arrows dark v-else>
                <v-window-item v-for="(test, i) in tests" :key="test.id">
                    <v-card
                        light
                        class="ma-2"
                    >
                        <v-img
                        class="white--text align-end"
                        height="200px"
                        :src="test.image"
                        >
                    </v-img>
                    
                        <v-card-title>{{ test.name }} </v-card-title>
                        <v-card-subtitle class="pb-0">
                        {{ tests.type || 'Desease' }}
                        </v-card-subtitle>

                        <v-card-text class="text--primary">
                            {{ test.description }}
                        </v-card-text>

                        <v-card-actions>
                        <v-btn
                            color="primary"
                            elevation="0"
                            block
                            :to="`/tests/${test.id}`"
                        >
                            Take the Test
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-window-item>
            </v-window>
        </div>
      </v-window-item>
      <v-window-item value="1"
      >
        <h1>Test History</h1>

        

        <div v-if="test_results == 'EMPTY'" class="text-center">
            <v-icon class="ma-10" size="60">mdi-file-document-outline</v-icon>
            <h2 style="font-weight: normal">You have no Tests yet</h2>
            <v-btn color="primary" class="mt-10" text large>
                <v-icon left>mdi-plus</v-icon>
                Take Test
            </v-btn>
        </div>
        <div v-else-if="!test_results.length">
            <v-skeleton-loader type="list-item-avatar-three-line"></v-skeleton-loader>
            <v-skeleton-loader type="list-item-avatar-three-line"></v-skeleton-loader>
        </div>
        <v-list-item
            v-else
            v-for="result in test_results"
            :key="result.title"
            link
            href="#!"
        >
            <v-list-item-avatar>
            <v-icon
                class="primary"
                dark
            >mdi-file-document-outline</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
            <v-list-item-title>{{ result.test_name }} Test</v-list-item-title>

            <v-list-item-subtitle>{{ result.result_percentage }}% Possibility · {{ moment(result.date_added.toDate()).fromNow() }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
            <v-btn icon>
                <v-icon color="grey lighten-1">mdi-file-download</v-icon>
            </v-btn>
            </v-list-item-action>
        </v-list-item>
      </v-window-item>
      <v-window-item value="2"
      >
        <h1>Tab 3</h1>
      </v-window-item>
    </v-window>
</app-bar>
</template>

<style scoped lang="scss">
h1 {
    font-size: 18px;
    text-align: center;
    margin: 20px 0;
    margin-bottom: 20px;
}

.selections {
    border: 3px solid transparent;
    transition: border .2s linear;

    &.selected {
        border-color:#45B3E0;
    }
}

.featured-article {
    h2 {
        font-size: 18px;
        margin: 10px 0;
    }

    h6 {
        font-weight: normal;
        font-size: 14px;
        opacity: 0.8;
    }
}
</style>

<script>
import { mapMutations, mapState } from 'vuex';
import { app } from '@/server/firebase';
import { collection, getDocs, getFirestore, orderBy, query, where } from '@firebase/firestore';
import moment from 'moment';

const db = getFirestore(app);

export default {

    computed: {
        ...mapState('permaData', ['userData', 'homePageSelector']),
        currentHomePage: {
            get: function() {
                return this.homePageSelector;
            },
            set: function(value) {
                return this.setHomePageSelector(value)
            }
        },
    },

    watch: {
        currentHomePage(newPage, oldPage) {

            if (newPage == "1") {
                // alert('History Page triggered');

                this.initHistoryPage();
            }

        }
    },

    methods: {
        ...mapMutations('permaData', ['setNavbarConfig', 'setHomePageSelector']),

        initHistoryPage() {

            this.test_results = [];

            getDocs(query(collection(db, 'test_results'), orderBy('date_added', 'desc'), where('by', '==', this.userData.uid))).then(results => {
                results.forEach(doc => {
                    this.test_results.push({id: doc.id, ...doc.data()});
                });

                console.log(results.size);

                if (results.size < 1) {
                    this.test_results = "EMPTY";
                }
            }).catch(error => {
                console.error(error);
                this.test_results = "EMPTY";
            })

        },

        async newQuote() {
            this.dailyQuotes = '';

            this.$axios.get('https://api.quotable.io/quotes/random?tags=life', {
                headers: {
                    Authorization: 'Bearer dindin23'
                }
            }).then(data => {
                    console.log(data.data)
                    this.dailyQuotes = data.data[0];
            }).catch(error => {
                this.dailyQuotes = {
                    content: error.message,
                    author: 'Error'
                }
            })
        }
    },

    data() {
        return {
            moment: moment,

            dailyQuotes: '',

            currentEmotion: '',

            tab: '0',

            posters: [],

            tests: [],

            test_results: [],
        }
    },
    
    mounted() {


        this.setNavbarConfig({
            title: `Welcome, ${this.userData.first_name}!`,
            goBack: false,
            plain: true,
        });

        this.setHomePageSelector("0");

       getDocs(query(collection(db, 'posters'), orderBy('date_added', 'desc'))).then(results => {
        results.forEach(doc => {
            this.posters.push(doc.data().img);
        });
       }).catch(error => {
        console.error(error);
       })

       getDocs(query(collection(db, 'tests'), orderBy('date_added', 'desc'))).then(results => {
        results.forEach(doc => {
            this.tests.push({id: doc.id, ...doc.data()});
        });
       }).catch(error => {
        console.error(error);
       })

       this.initHistoryPage();

    }
}
</script>