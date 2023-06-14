<template>
    <app-bar>
        <div class="text-center my-5">
            <div v-if="!result.id">
                <v-skeleton-loader class="align-center justify-center d-flex my-7" type="avatar"></v-skeleton-loader>
                <v-skeleton-loader class="align-center justify-center d-flex my-7" type="heading"></v-skeleton-loader>
                <v-skeleton-loader class="align-center justify-center d-flex my-7" type="paragraph"></v-skeleton-loader>
                <v-skeleton-loader class="align-center justify-center d-flex my-7" type="button"></v-skeleton-loader>
            </div>
            <div v-else>
                
                <v-avatar size="70">
                    <v-img :src="`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${userData.uid}&mouth=cute,wideSmile,faceMask,kissHeart,lilSmile,plain,smileLol,smileTeeth&eyes=closed,cute,love,plain,shades,stars,wink,wink2`"></v-img>
                </v-avatar>
                <h3 class="my-5 mb-2">{{ result.first_name }} {{ result.last_name }}</h3>
                <p class="mb-5" style="line-height: 30px">
                    {{ moment(result.date_added?.toDate()).format('MMMM DD, YYYY hh:ss A') }}
                </p>

                <div class="my-3">
                    <v-btn large elevation="0" color="primary">
                        Save
                    </v-btn>
                    <v-btn large outlined color="grey">
                        <v-icon>mdi-share</v-icon>
                    </v-btn>
                </div>

                <v-divider class="my-5"></v-divider>

                <div class="ma-3">
                    <h3>{{ result.test_name }}</h3>
                    <p class="my-3">{{ result.test_description }}</p>
                </div>

                <table>
                    <tbody>
                        <tr>
                            <td>
                                <h2>{{result.result_percentage}}%</h2>
                                <h5>Result</h5>
                            </td>
                            <td>
                                <h2 :class="`${scoreToColor(result.result_percentage)}--text`" v-if="result.result_percentage <= 25">
                                    Low
                                </h2>
                                <h2 :class="`${scoreToColor(result.result_percentage)}--text`" v-else-if="result.result_percentage <= 50">
                                    Mild
                                </h2>
                                <h2 :class="`${scoreToColor(result.result_percentage)}--text`" v-else-if="result.result_percentage <= 75">
                                    Moderate
                                </h2>
                                <h2 :class="`${scoreToColor(result.result_percentage)}--text`" v-else-if="result.result_percentage <= 100">
                                    High
                                </h2>
                                <h5>Interpretation</h5>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <v-divider class="my-5"></v-divider>

                <h4 class="my-5">Test Prompts ({{ result.answers?.length }} items)</h4>

                <v-list
                    subheader
                    two-line
                    class="text-left"
                >

                    <v-list-item 
                        v-for="(question, i) in result.answers"
                        :key="i"
                    >
                        <v-list-item-avatar>
                            <v-avatar color="primary" dark>
                                <span class="white--text">{{ i + 1 }}</span>
                            </v-avatar>
                        </v-list-item-avatar>

                        <v-list-item-content>
                        <v-list-item-title style="overflow: visible;text-wrap: wrap;">{{ question.content }}</v-list-item-title>

                        <v-list-item-subtitle style="font-weight: bold; margin-top: 10px"> {{ question.answer }} - {{ scoreToDescription(question.answer) }}</v-list-item-subtitle>
                        </v-list-item-content>

                    </v-list-item>
                </v-list>
            </div>
        </div>
    </app-bar>
</template>

<style lang="scss" scoped>
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
</style>

<script>
import { doc, getDoc, getFirestore } from '@firebase/firestore';
import { mapMutations, mapState } from 'vuex';
import { app } from '@/server/firebase';
import moment  from 'moment';

const db = getFirestore(app);

export default {
    
    data() {
        return {
            result: {},
            moment: moment,
        }
    },

    methods: {
        ...mapMutations('permaData', ['setNavbarConfig']),

        scoreToDescription(score) {

            const scoreDescriptions = {
                '0': 'Never',
                '1': 'Very Seldom',
                '2': 'Sometimes',
                '3': 'Neutral',
                '4': 'Very Often',
                '5': 'Always',
            }

            return scoreDescriptions[score];

        },

        scoreToColor(score) {


            if (score <= 25) {
                return 'green';
            }
            if (score <= 50) {
                return 'yellow';
            }
            if (score <= 75) {
                return 'orange'
            }
            if (score <= 100) {
                return 'red';
            }

        },
    },

    computed: {
        ...mapState('permaData', ['userData']),
    },

    mounted() {
        this.setNavbarConfig({
            title: `Loading ...`,
            goBack: true,
            plain: true,
            hideBottomNav: true
        });

        const docRef = doc(db, "test_results", this.$route.params.id);
        getDoc(docRef).then(docSnap => {
            if (docSnap.exists()) {
                const questions = docSnap.data().questions;

                this.result = {id: docSnap.id, ...docSnap.data()};

                this.setNavbarConfig({
                    title: `${this.result.test_name} Test Result`,
                    goBack: true,
                    plain: true,
                    hideBottomNav: true
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