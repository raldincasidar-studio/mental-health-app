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
                <v-col cols="12" class="px-0" v-show="currentEmotion">
                    <v-btn large block color="primary">Start Daily Log</v-btn>
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
        <h1>Tab 2</h1>
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
    margin: 50px 0;
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
import { collection, getDocs, getFirestore, orderBy, query } from '@firebase/firestore';

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

    methods: {
        ...mapMutations('permaData', ['setNavbarConfig', 'setHomePageSelector']),

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
            dailyQuotes: '',

            currentEmotion: '',

            tab: '0',

            posters: [],

            tests: [],

            emoticons: [
                {
                    name: 'Happy',
                    icon: 'mdi-emoticon-happy',
                },
                {
                    name: 'Sad',
                    icon: 'mdi-emoticon-sad',
                },
                {
                    name: 'Crying',
                    icon: 'mdi-emoticon-cry',
                },
                {
                    name: 'Cool',
                    icon: 'mdi-emoticon-cool',
                },
                {
                    name: 'Excited',
                    icon: 'mdi-emoticon-excited',
                },
                {
                    name: 'Sick',
                    icon: 'mdi-emoticon-sick',
                },
            ],
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
            this.tests.push(doc.data());
        });
       }).catch(error => {
        console.error(error);
       })

    }
}
</script>