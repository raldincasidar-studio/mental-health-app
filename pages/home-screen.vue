<template>
<app-bar>

    <v-window :value="currentHomePage" height="100%" touchless>
      <v-window-item value="0"
      >
        
        <div class="container" v-if="userData.userType == 'Patient'">
            <div class="mb-4">
            <v-skeleton-loader type="image" v-if="posters.length < 1"></v-skeleton-loader>
            <v-card v-else background-color="grey-lighten-3">
                <v-carousel height="200" hide-delimiters cycle hide-arrows show-arrows-on-hover :show-arrows="false">
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
                    <v-card class="text-center pa-5 rounded-lg m-0 selections" elevation="0" @click="setHomePageSelector('2')" v-ripple="{ class: `primary--text` }">
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

        <div class="container" v-else>
            <div class="py-2">
                <h3>
                    Top Patients
                    <v-btn icon to="/messages">
                        <v-icon color="primary">mdi-arrow-right</v-icon>
                    </v-btn>
                </h3>
                <div class="d-flex mt-5 py-2" style="overflow-x: scroll">
                    <v-card class="py-3 px-3 rounded-lg elevation-4 margined" :class="{'gradient-violet': i === 0}" style="flex: 0 0 50%" dark v-for="(patient, i) in topPatientsList" :key="getChatInfo(patient).id || getChatInfo(patient).uid">
                        <v-btn icon large class="float-right">
                            <v-icon>mdi-account-arrow-left</v-icon>
                        </v-btn>
                        <div class="pa-3">
                            <v-avatar size="60" class="my-4 mt-5">
                                <v-img style="background-color: rgb(224, 224, 224)" :src="getChatInfo(patient).id || getChatInfo(patient).uid ? `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${getChatInfo(patient).id || getChatInfo(patient).uid}&mouth=cute,wideSmile,faceMask,kissHeart,lilSmile,plain,smileLol,smileTeeth&eyes=closed,cute,love,plain,shades,stars,wink,wink2` : `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAtEB5wrzxXEAAAAASUVORK5CYII=`"></v-img>
                            </v-avatar>
                            <h4 class="text--white">{{ getChatInfo(patient).first_name }} <br>{{ getChatInfo(patient).last_name }}</h4>
                            <v-btn :to="`/messages/${getChatInfo(patient).id || getChatInfo(patient).uid}`" pill elevation="0" color="white" class="mt-5" block large light rounded>
                                <v-icon left>mdi-facebook-messenger</v-icon>
                                Message
                            </v-btn>
                        </div>
                    </v-card>
                </div>
            </div>
        </div>
      </v-window-item>
      <v-window-item value="1" class="profile"
      >

        <v-img :src="`https://picsum.photos/seed/${userData.uid}/768/432`" lazy-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAtEB5wrzxXEAAAAASUVORK5CYII=" :aspect-ratio="16/9" class="rounded-lg"></v-img>
        <div class="text-center mt-n12">
            <v-avatar size="150" class="white--text" style="border: 5px solid">
                <v-img style="background-color: rgb(224, 224, 224)" :src="`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${userData.uid}&mouth=cute,wideSmile,faceMask,kissHeart,lilSmile,plain,smileLol,smileTeeth&eyes=closed,cute,love,plain,shades,stars,wink,wink2`"></v-img>
            </v-avatar>
            <h2 class="my-3 mb-0">{{ userData.first_name }} {{ userData.middle_name && `${userData.middle_name[0]}.` }} {{ userData.last_name }}</h2>
            <p class="text-center ma-0">
                <v-chip
                    class="ma-2 mb-5"
                    :color="userData.userType === 'Doctor' ? 'pink' : 'primary'"
                    text-color="white"
                    >
                    <v-icon left>
                        {{ userData.userType === 'Doctor' ? 'mdi-doctor' : 'mdi-account-heart' }}
                    </v-icon>
                    {{ userData.userType }}
                </v-chip>
            </p>
            <p class="grey--text text--darken-2">
                {{ userData.gender }} | {{ moment().diff(userData.date_of_birth, 'year') }} years old
            </p>
            <div class="text-center mb-12">
                <v-btn to="/messages" style="width: calc(100% - 100px - 16px)" elevation="0" color="primary" large class="rounded-lg mx-2">
                    <v-icon left>mdi-facebook-messenger</v-icon>
                    View Messages
                </v-btn>
                <v-btn large elevation="0" color="grey lighten-3" class="rounded-lg mx-2">
                    <v-icon>mdi-share-variant</v-icon>
                </v-btn>
            </div>
        </div>

        <div v-if="userData.userType === 'Patient'">
            
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
            <v-btn link to="/daily-diary" large block class="gradient-violet mb-10" depressed dark  v-if="canStartDailyDiary">
                <v-icon left>mdi-notebook</v-icon>
                Start Daily Diary
            </v-btn>

            
            <h1>Test History</h1>

            <test-history :test_results="test_results"></test-history>
        </div>

        <table v-else class="mt-n5 mb-12">
            <tbody>
                <tr>
                    <td>
                        <h2>
                            <v-icon color="yellow darken-2">mdi-star</v-icon>
                            <v-icon color="yellow darken-2">mdi-star</v-icon>
                            <v-icon color="yellow darken-2">mdi-star</v-icon>
                            <v-icon color="yellow darken-2">mdi-star</v-icon>
                            <v-icon color="yellow darken-2">mdi-star</v-icon>
                        </h2>
                        <h4>
                            3.5 Star Rating
                        </h4>
                    </td>
                    <td>
                        <h2>3</h2>
                        <h5>Patients</h5>
                    </td>
                </tr>
            </tbody>
        </table>

      </v-window-item>
      <v-window-item value="2"
      >
        <div class="container">
            <h3 class="mb-5">
                <v-icon color="red" size="30" class="mr-2">mdi-doctor</v-icon>
                <span v-if="userData.userType === 'Patient'">Top MentalAid Doctor</span>
                <span v-if="userData.userType === 'Doctor'">MentalAid Patients</span>
            </h3>
            
            <div class="text-center" v-if="doctorsList === 'EMPTY'">
                <v-img class="my-10 mt-12 mx-auto" max-width="250px" :src="require(`~/assets/img/doctors.svg`)"></v-img>
                <h4 class="grey--text">No Doctors available at the moment</h4>
                <p class="grey--text mt-4">Do you know someone?</p>
                <v-btn color="pink" text outlined class="mt-7">
                    <v-icon left>mdi-share-variant</v-icon>
                    Recommend MindfulAid
                </v-btn>
            </div>
            <div v-else-if="!doctorsList.length">
                <v-skeleton-loader type="list-item-avatar-three-line"></v-skeleton-loader>
                <v-skeleton-loader type="list-item-avatar-three-line"></v-skeleton-loader>
                <v-skeleton-loader type="list-item-avatar-three-line"></v-skeleton-loader>
                <v-skeleton-loader type="list-item-avatar-three-line"></v-skeleton-loader>
            </div>
            <v-list three-line v-else>
                <v-list-item
                    :key="i"
                    v-for="(doctor, i) in doctorsList"
                    link
                    :to="`/profile/${doctor.id}`"
                    class="rounded-lg"
                    >
                    <v-list-item-avatar size="60">
                        <v-img :src="`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${doctor.id}&mouth=cute,wideSmile,faceMask,kissHeart,lilSmile,plain,smileLol,smileTeeth&eyes=closed,cute,love,plain,shades,stars,wink,wink2`"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title class="primary--text" style="font-weight: bold; font-size: 18px;">{{ doctor.first_name }} {{ doctor.middle_name && `${doctor.middle_name[0]}.` }} {{ doctor.last_name }}</v-list-item-title>
                        <v-list-item-subtitle class="mt-2">
                            MentalAid 2 months Doctor<br>
                            <span  v-if="doctor.userType == 'Doctor'" class="ma-0">
                                <v-icon color="orange" size="23">mdi-star</v-icon>
                                <v-icon color="orange" size="23">mdi-star</v-icon>
                                <v-icon color="orange" size="23">mdi-star</v-icon>
                                <v-icon color="orange" size="23">mdi-star</v-icon>
                                <v-icon color="orange" size="23">mdi-star</v-icon>
                            </span>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </div>
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
    font-weight: bold;
}

.selections {
    border: 3px solid transparent;
    transition: border .2s linear;

    &.selected {
        border-color:#45B3E0;
    }
}

.margined{
    margin: 0 15px;

    &:nth-child(1) {
        margin-left: 0;
    }
}

.gradient-violet {
    background: #4776E6;  /* fallback for old browsers */
    background: -webkit-linear-gradient(270deg, #4776e6, #45B3E0);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(270deg, #4776e6, #45B3E0);
    background-size: 400% 400%;

    -webkit-animation: MovingGradient 3s ease infinite;
    -moz-animation: MovingGradient 3s ease infinite;
    animation: MovingGradient 3s ease infinite;
}

.gradient-pink {
    background: #ff0f7b;  /* fallback for old browsers */
    background: -webkit-linear-gradient(270deg, #ff0f7b, #f89b29);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(270deg, #ff0f7b, #f89b29);
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

.profile {
    .cover-photo {
        padding: 10px;
        height: 200px;
        background-color: rgb(228, 228, 228);
        border-radius: 20px;
    }

    table {
        text-align: center;
        // border: 1px solid red;
        margin: auto;

        td {
            padding: 20px 30px;
            text-align: center;
        }

        td:not(:last-child) {
            border-right: 1px solid rgb(205, 205, 205);
        }
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
                this.initHomePage();
            }

            if (newPage == "0") {
                this.initHomePage();
            }

            if (newPage == "2") {
                this.initMedicalPage()
            }

        }
    },

    methods: {
        ...mapMutations('permaData', ['setNavbarConfig', 'setHomePageSelector']),

        getChatInfo(chat) {

            return chat.participantsInfo.filter(user => user.uid !== this.userData.uid && user.id !== this.userData.uid )[0];
        },

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

        initMedicalPage() {
            this.doctorsList = [];

            getDocs(query(collection(db, 'user'), where('userType', '==', this.userData.userType == 'Doctor' ? 'Patient' : 'Doctor'))).then(results => {
                results.forEach(doc => {
                    this.doctorsList.push({id: doc.id, ...doc.data()});
                });


                if (results.size < 1) {
                    this.doctorsList = "EMPTY";
                }
            });
        },

        initHomePage() {
            this.canStartDailyDiary = false;

            getDocs(query(collection(db, 'diary'), where('date_added', '>=', new Date(moment().format('YYYY-MM-DD'))), where('by', '==', this.userData.uid))).then(results => {
                console.log(results.size);
                if (results.size < 1) {
                    this.canStartDailyDiary = true;
                }
            });

            if (this.userData.userType === 'Doctor') {

                this.topPatientsList = [];

                getDocs( query(collection(db, "messages"), where('participants', "array-contains", this.userData.uid), orderBy('date', 'desc'), limit(5)) ).then(results => {
                results.forEach(doc => {
                    this.topPatientsList.push({id: doc.id, ...doc.data()});
                });


                if (results.size < 1) {
                    this.topPatientsList = "EMPTY";
                }
            });

            }
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

            diaries: ['2023-06-06'],

            doctorsList: [],

            topPatientsList: [],
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