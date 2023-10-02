<template>
    <app-bar>
        <v-window v-model="page" touchless>
            <v-window-item value="0">
                <v-skeleton-loader type="image, article" class="pa-3" v-if="!info.name"></v-skeleton-loader>
                <div class="pa-3 start-test" v-else>
                    <v-responsive :aspect-ratio="3/2" class="test-image" :style="`background-image: url('${info.image}')`"></v-responsive>
                    <h3>{{ info.name }} Test</h3>
                    <p class="subtext">{{ info.questions?.length }} Questions</p>
                    <p>{{ info.description }}</p>
                    <v-btn block color="primary" large class="mt-10 mb-3" @click="page='1'">
                        Start Test
                        <v-icon right>mdi-arrow-right</v-icon>
                    </v-btn>
                </div>
            </v-window-item>
            <v-window-item :value="String(i+1)" v-for="(question, i) in questions" :key="i">
                <div class="d-flex justify-space-between content-header">
                    <v-btn icon large color="blue" @click="page = String(i)"><v-icon>mdi-chevron-left</v-icon></v-btn>
                    <div class="content">
                        <h3>{{ info.name }} Test</h3>
                        <p>{{ i+1 }}/{{ info.questions?.length }} Questions</p>
                    </div>
                    <v-btn icon large color="blue" :disabled="question.answer === null" @click="page = String(i+2)"><v-icon>mdi-chevron-right</v-icon></v-btn>
                </div>
                <div class="content pa-3">
                    <h2>{{ question.content }} (0 - Never, 5 - Always)</h2>
                    <div class="buttons">
                        <v-btn @click="questions[i].answer = 0; page = String(i+2)" block large depressed :outlined="question.answer != 0" class="my-3" color="primary">0 - Never</v-btn>
                        <v-btn @click="questions[i].answer = 1; page = String(i+2)" block large depressed :outlined="question.answer != 1" class="my-3" color="primary">1 - Very Seldom</v-btn>
                        <v-btn @click="questions[i].answer = 2; page = String(i+2)" block large depressed :outlined="question.answer != 2" class="my-3" color="primary">2 - Sometimes</v-btn>
                        <v-btn @click="questions[i].answer = 3; page = String(i+2)" block large depressed :outlined="question.answer != 3" class="my-3" color="primary">3 - Neutral</v-btn>
                        <v-btn @click="questions[i].answer = 4; page = String(i+2)" block large depressed :outlined="question.answer != 4" class="my-3" color="primary">4 - Very Often</v-btn>
                        <v-btn @click="questions[i].answer = 5; page = String(i+2)" block large depressed :outlined="question.answer != 5" class="my-3" color="primary">5 - Always</v-btn>
                    </div>
                </div>
            </v-window-item>
            <v-window-item :value="String(questions.length + 1)">
                <div class="pa-3 end-test">
                    <v-responsive :aspect-ratio="3/2" class="test-image d-flex align-center px-5" :style="{border: `2px solid ${scoreToColor(test_score_percentage)}`}">
                        <h5 :style="{color: scoreToColor(test_score_percentage)}">Test Result</h5>
                        <h4 v-if="test_score_percentage <= 25">
                            Low
                        </h4>
                        <h4 v-else-if="test_score_percentage <= 50">
                            Mild
                        </h4>
                        <h4 v-else-if="test_score_percentage <= 75">
                            Moderate
                        </h4>
                        <h4 v-else-if="test_score_percentage <= 100">
                            High
                        </h4>
                    </v-responsive>
                    <h3 class="text-center mt-10">
                        You have a 
                        <span v-if="test_score_percentage <= 25">
                            low probability
                        </span>
                        <span v-else-if="test_score_percentage <= 50">
                            mild probability
                        </span>
                        <span v-else-if="test_score_percentage <= 75">
                            moderate probability
                        </span>
                        <span v-else-if="test_score_percentage <= 100">
                            high probability
                        </span>
                        of {{ info.name }}!
                    </h3>
                    <p class="mt-10 text-justify">
                        <span v-if="test_score_percentage <= 25">
                            If your score falls within this range, it indicates a low probability of having the it. This means that based on your responses, the symptoms associated with it are less likely to be present.<br>
                        </span>
                        <span v-else-if="test_score_percentage <= 50">
                            If your score falls within this range, it suggests a mild probability of the it. This means that there might be some indications of it, but further evaluation is needed to have a clearer understanding of your condition.<br>
                        </span>
                        <span v-else-if="test_score_percentage <= 75">
                            Falling within this range means that there is a moderate probability of having the it. Your score is relatively higher, indicating a notable presence of symptoms associated with it. It's important to consult with a healthcare professional like me to discuss the results in more detail and explore potential treatment options.<br>
                        </span>
                        <span v-else-if="test_score_percentage <= 100">
                            If your score falls within this range, it indicates a high probability of the it. Your score is significantly higher, suggesting a strong likelihood of the presence of symptoms associated with it. In this case, it is crucial to seek immediate attention from a healthcare professional like me. We will conduct a more comprehensive evaluation and determine the most appropriate intervention for your situation.
                        </span>
                        <span v-else>
                            {{ info.description }}
                        </span>
                    </p>
                    <v-btn block color="primary" x-large class="mt-10 mb-2" to="/home-screen">
                        <v-icon left>mdi-doctor</v-icon>
                        Consult a Professional
                    </v-btn>
                    <v-btn block text x-large class="mb-3" @click="$router.replace('/tests')">
                        <v-icon left>mdi-refresh</v-icon>
                        Take Another Test
                    </v-btn>
                </div>
            </v-window-item>
        </v-window>
    </app-bar>
</template>

<style scoped lang="scss">

.start-test, .end-test {
    h3 {
        font-size: 20px;
        margin: 20px 0;
        margin-bottom: 5px;
    }

    .subtext {
        font-size: 14px;
        opacity: 0.7;
    }

    p {
        font-size: 16px;
        opacity: 0.8;
        line-height: 33px;
    }

    .test-image {
        background-color: gray;
        border-radius: 10px;
        background-position: center center;
        background-size: cover;
    }
}

.end-test {

    .test-image  {
        background-color: transparent;

        
        h4 {
            text-align: center;
            font-size: 40px;
            margin: 15px 0;
        }

        h5 {
            text-align: center;
            font-size: 17px;
        }
    }
}
.content-header {
    text-align: center;
    h3 {
        font-size: 20px;
        text-align: center
    }

    p {
        font-size: 14px;
        opacity: 0.7;
        text-align: center
    }
}

.content {
    h2 {
        margin-bottom: 40px;
        font-weight: normal;
        opacity: 0.9;
        font-size: 20px;
        line-height: 37px;
    }
}
</style>

<script>
import { addDoc, collection, doc, getDoc, getFirestore, serverTimestamp, setDoc } from '@firebase/firestore';
import { mapMutations, mapState } from 'vuex';
import { app } from '@/server/firebase';

const db = getFirestore(app);

export default {

    methods: {
        ...mapMutations('permaData', ['setNavbarConfig']),

        scoreToColor(score) {


            if (score <= 25) {
                return '#4CAF50';
            }
            if (score <= 50) {
                return '#FBC02D';
            }
            if (score <= 75) {
                return '#FF9800'
            }
            if (score <= 100) {
                return '#F44336';
            }

        },
    },

    data() {
        return {
            page: '0',

            questions: [],
            info: {},
        }
    },

    computed: {
        ...mapState('permaData', ['userData']),
        test_score() {
            return this.questions.reduce( (sum, question) => {
                return sum = sum + question.answer;
            }, 0);
        },
        
        test_score_percentage() {
            return Math.round( (this.test_score/(this.questions.length * 5)) * 100 );
        }
    },

    watch: {
        page(newPage, oldPage) {

            if (newPage == String(this.questions.length + 1)) {

                console.log('Saving data!');

                const data = {
                    by: this.userData.uid,
                    first_name: this.userData.first_name,
                    middle_name: this.userData.middle_name,
                    last_name: this.userData.last_name,
                    test_id: this.info.id,
                    test_name: this.info.name,
                    test_description: this.info.description,
                    result: this.test_score,
                    result_percentage: this.test_score_percentage,
                    total_items: this.questions.length,
                    answers: this.questions,
                    date_added: serverTimestamp()
                }

                addDoc(collection(db, "test_results"), data);


                console.log('SAVED DATA: ', data);

            }

        }
    },

    mounted() {
        this.setNavbarConfig({
            title: `Loading ...`,
            goBack: true,
            plain: true,
            hideBottomNav: true
        });

        const test_id = this.$route.params.id;

        const docRef = doc(db, "tests", test_id);
        getDoc(docRef).then(docSnap => {
            if (docSnap.exists()) {
                const questions = docSnap.data().questions;

                this.info = {id: docSnap.id, ...docSnap.data()};

                this.setNavbarConfig({
                    title: `${this.info.name} Test`,
                    goBack: true,
                    plain: true,
                    hideBottomNav: true
                });

                questions.forEach(question => {
                    this.questions.push({
                        content: question,
                        answer: null
                    })
                });
            } else {
                // docSnap.data() will be undefined in this case
                console.log('🔴 NO DATA');
                this.$router.replace('/home-screen');
            }
        })
    }
}
</script>