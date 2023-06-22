<template>
<app-bar>

    <v-window :value="currentHomePage" height="100%" :swipeable="false">
      <v-window-item value="0"
      >
        
        <div class="container">
            <div class="mb-4">
            <v-skeleton-loader type="image" v-if="posters.length < 1"></v-skeleton-loader>
            <v-card v-else background-color="grey-lighten-3">
                <v-carousel height="200" hide-delimiters cycle hide-arrows show-arrows-on-hover :show-arrows="false">
                    <v-carousel-item>
                        <iframe src="http://www.youtube.com/embed/54sDdNa9vek?autoplay=0&modestbranding=1&rel=0&fs=0&color=white&controls=0&disablekb=1" style="width: 100%" height="200" title="A YouTube video" frameborder="0"></iframe>
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
                    <v-card class="text-center pa-5 rounded-lg m-0 selections" link to="/tests" elevation="0" v-ripple="{ class: `primary--text` }">
                        <v-icon size="60" color="primary">mdi-note-edit-outline</v-icon>
                        <h5 class="mt-2">Test Yourself</h5>
                    </v-card>
                </v-col>
                <v-col cols="4" class="pa-0 m-0">
                    <v-card class="text-center pa-5 rounded-lg m-0 selections" elevation="0" @click="setHomePageSelector('1')" v-ripple="{ class: `primary--text` }">
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
                <v-col cols="12" class="px-5" v-if="canStartDailyDiary">
                    <v-btn link to="/daily-diary" x-large block class="gradient-violet" depressed dark>
                        <v-icon left>mdi-notebook</v-icon>
                        Start Daily Diary
                    </v-btn>
                </v-col>
                <v-col cols="12" class="px-5">
                    <v-btn @click="testingNotif()" x-large block class="gradient-violet" depressed dark>
                        <v-icon left>mdi-bell</v-icon>
                        START DEBUG NOTIFICATION
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
                <v-window-item>
                    <v-sheet width="100%" height="300" light class="d-flex flex-column justify-center align-center">
                        <v-icon size="60" color="primary">mdi-note-edit-outline</v-icon>
                        <h2 class="grey--text text--darken-2 ma-5" style="font-weight: lighter">View All Tests</h2>
                        <v-btn color="primary" large to="/tests" outlined>
                            View All
                        </v-btn>
                    </v-sheet>
                </v-window-item>
            </v-window>
        </div>
      </v-window-item>
      <v-window-item value="1"
      >

        <div class="calendar-container">
            <v-date-picker
                v-model="picker"
                color="primary"
                full-width
                no-title
                :events="getDiariesDate"
                :event-color="colorDate"
                @change="viewRant"
            ></v-date-picker>
        </div>

        
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
            :to="`/results/${result.id}`"
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

.gradient-violet {
    background: #4776E6;  /* fallback for old browsers */
    background: -webkit-linear-gradient(270deg, #4776e6, #4776e6);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(270deg, #4776e6, #4776e6);
    background-size: 400% 400%;

    -webkit-animation: MovingGradient 3s ease infinite;
    -moz-animation: MovingGradient 3s ease infinite;
    animation: MovingGradient 3s ease infinite;
}

@-webkit-keyframes MovingGradient {
    0%{background-position:0% 50%}
    50%{background-position:100% 51%}
    100%{background-position:0% 50%}
}
@-moz-keyframes MovingGradient {
    0%{background-position:0% 50%}
    50%{background-position:100% 51%}
    100%{background-position:0% 50%}
}
@keyframes MovingGradient {
    0%{background-position:0% 50%}
    50%{background-position:100% 51%}
    100%{background-position:0% 50%}
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
import { collection, getDocs, getFirestore, limit, orderBy, query, where } from '@firebase/firestore';
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
        getDiariesDate() {
            return [...new Set( this.diaries.map(diary => {
                return moment(diary.date_added?.toDate()).format('YYYY-MM-DD')
            }) )]
        }
    },

    watch: {
        currentHomePage(newPage, oldPage) {

            if (newPage == "1") {
                // alert('History Page triggered');

                this.initHistoryPage();
            }

            if (newPage == "0") {
                this.initHomePage();
            }

        }
    },

    methods: {
        ...mapMutations('permaData', ['setNavbarConfig', 'setHomePageSelector']),

        testingNotif() {
            cordova.plugins.notification.local.schedule({
                id: 1,
                title: "My First Notification",
                message: "Grabe ba",
                firstAt: new Date(), // firstAt and at properties must be an IETF-compliant RFC 2822 timestamp
                every: "minute", // this also could be minutes i.e. 25 (int)
            });
        },

        viewRant(date) {

            const [rant_id] = this.diaries.filter(diary => moment(diary.date_added?.toDate()).format('YYYY-MM-DD') === date).map(diary => {
                return diary.id;
            }).slice(0,1);

            console.log('Rant: ', date, rant_id)

            if (rant_id) this.$router.push(`/mood/${rant_id}`);
            


        },

        colorDate(date) {
            
            return this.diaries.filter(diary => moment(diary.date_added?.toDate()).format('YYYY-MM-DD') === date).map(diary => {
                return diary.color;
            }).slice(0,1);

        },

        initHomePage() {
            getDocs(query(collection(db, 'diary'), where('date_added', '>=', new Date(moment().format('YYYY-MM-DD'))), where('by', '==', this.userData.uid))).then(results => {
                console.log(results.size);
                if (results.size < 1) {
                    this.canStartDailyDiary = true;
                }
            });
        },

        initHistoryPage() {

            this.test_results = [];
            this.diaries = [];

            getDocs(query(collection(db, 'test_results'), orderBy('date_added', 'desc'), where('by', '==', this.userData.uid))).then(results => {
                results.forEach(doc => {
                    this.test_results.push({id: doc.id, ...doc.data()});
                });


                if (results.size < 1) {
                    this.test_results = "EMPTY";
                }
            }).catch(error => {
                console.error(error);
                this.test_results = "EMPTY";
            })

            // DIARIES FETCH
            getDocs(query(collection(db, 'diary'), orderBy('date_added', 'asc'), where('by', '==', this.userData.uid))).then(results => {
                results.forEach(doc => {
                    this.diaries.push({id: doc.id, ...doc.data()});
                });
            }).catch(error => {
                console.error(error);
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

            canStartDailyDiary: false,

            tests: [],

            test_results: [],

            picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),

            diaries: ['2023-06-06']
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

       getDocs(query(collection(db, 'tests'), orderBy('date_added', 'desc'), limit(3))).then(results => {
        results.forEach(doc => {
            this.tests.push({id: doc.id, ...doc.data()});
        });
       }).catch(error => {
        console.error(error);
       })

       this.initHomePage();
       this.initHistoryPage();

    }
}
</script>