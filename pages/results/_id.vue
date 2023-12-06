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
                    <v-img :src="`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${result.by}&mouth=cute,wideSmile,faceMask,kissHeart,lilSmile,plain,smileLol,smileTeeth&eyes=closed,cute,love,plain,shades,stars,wink,wink2`"></v-img>
                </v-avatar>
                <h3 class="my-5 mb-2">{{ result.first_name }} {{ result.last_name }}</h3>
                <p class="mb-5" style="line-height: 30px">
                    {{ moment(result.date_added?.toDate()).format('MMMM DD, YYYY hh:ss A') }}
                </p>

                <div class="my-3">
                    <v-btn large elevation="0" color="primary">
                        Save
                    </v-btn>
                    <v-dialog v-model="share_dialog">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn large outlined color="grey" v-bind="attrs" v-on="on">
                                <v-icon>mdi-share</v-icon>
                            </v-btn>
                        </template>
                        <v-card class="pa-4">
                            <h4 class="grey--text" style="font-weight: lighter">Share to: </h4>
                            <v-divider class="my-4"></v-divider>
                            <v-list-item v-for="(chat, i) in chatList" :key="chat.id">
                                <v-list-item-avatar>
                                    <v-img :src="`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${getChatInfo(chat).id || getChatInfo(chat).uid}&mouth=cute,wideSmile,faceMask,kissHeart,lilSmile,plain,smileLol,smileTeeth&eyes=closed,cute,love,plain,shades,stars,wink,wink2`" lazy-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAtEB5wrzxXEAAAAASUVORK5CYII="></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    {{ getChatInfo(chat).first_name }} {{ getChatInfo(chat).middle_name && `${getChatInfo(chat).middle_name[0]}.` }} {{ getChatInfo(chat).last_name }}
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn icon color="primary" @click="forwardTestResult(chat)">
                                        <v-icon>mdi-share</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-card>
                    </v-dialog>
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
                                <h2>{{result.result}}</h2>
                                <h5>Result</h5>
                            </td>
                            <td>
                                <h2 :class="`${scoreToColor(result.result_percentage)}--text`" v-if="result.result <= 4">
                                    Minimal
                                </h2>
                                <h2 :class="`${scoreToColor(result.result_percentage)}--text`" v-else-if="result.result <= 9">
                                    Mild
                                </h2>
                                <h2 :class="`${scoreToColor(result.result_percentage)}--text`" v-else-if="result.result <= 14">
                                    Moderate
                                </h2>
                                <h2 :class="`${scoreToColor(result.result_percentage)}--text`" v-else-if="result.result > 14">
                                    Severe
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
import { doc, getDoc, addDoc, getFirestore, getDocs, query, where, orderBy, collection, serverTimestamp, setDoc, updateDoc } from '@firebase/firestore';
import { mapMutations, mapState } from 'vuex';
import { app } from '@/server/firebase';
import moment  from 'moment';

const db = getFirestore(app);

export default {
    
    data() {
        return {
            result: {},
            moment: moment,
            share_dialog: false,
            chatList: [],
        }
    },

    methods: {
        ...mapMutations('permaData', ['setNavbarConfig']),

        forwardTestResult(user) {

            const postData = {
                type: 'test_result', 
                content: this.result,
                date: serverTimestamp(),
                sentBy: this.userData.uid,
                for: this.getChatInfo(user).uid || this.getChatInfo(user).id,
            }

            // Get the user id of both
            const userIds = [this.userData.uid, (this.getChatInfo(user).uid || this.getChatInfo(user).id)].sort().join('-');



            const messageId = doc(db, "messages", userIds);

            getDoc(messageId).then( docSnap => {
                if (docSnap.exists()) {
                    // Update document data
                    updateDoc(messageId, {
                        participants: [this.userData.uid, (this.getChatInfo(user).uid || this.getChatInfo(user).id)],
                        participantsInfo: [this.userData, this.getChatInfo(user)],
                        latestMessage: postData,
                        date: postData.date,
                        seenBy: [this.userData.uid],
                    })
                } else {
                    // docSnap.data() will be undefined in this case
                    // Update document data
                    setDoc(messageId, {
                        participants: [this.userData.uid, (this.getChatInfo(user).uid || this.getChatInfo(user).id)],
                        participantsInfo: [this.userData, this.getChatInfo(user)],
                        latestMessage: postData,
                        date: postData.date,
                        seenBy: [this.userData.uid],
                    })
                }
            } )

            // Step 2: Access the subcollection
            const subcollectionRef = collection(messageId, "messages");

            // Step 3: Add a new document to the subcollection using the addDoc function
            const docRef = addDoc(subcollectionRef, postData);
            // console.log("New post added with ID: ", docRef.id);

            this.share_dialog = false;

            this.$swal.fire({
                toast: true,
                position: 'bottom',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: 'success',
                title: `Successfuly sent to ${this.getChatInfo(user).first_name}`,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            });

            window.parent.sendNotif(this.getChatInfo(user).notificationId, `${this.getChatInfo(user).first_name} ${this.getChatInfo(user).middle_name && this.getChatInfo(user).middle_name[0] + `.`} ${this.getChatInfo(user).last_name}`, `${this.getChatInfo(user).first_name} sent you a message`);

        },

        scoreToDescription(score) {

            const scoreDescriptions = {
                '0': 'Not at all',
                '1': 'Several days',
                '2': 'More than half the days',
                '3': 'Nearly every day',
            }

            return scoreDescriptions[score];

        },

        getChatInfo(chat) {

            return chat.participantsInfo.filter(user => user.uid !== this.userData.uid && user.id !== this.userData.uid )[0];
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

        
        // Get all chatlists
        getDocs(query(collection(db, "messages"), where('participants', "array-contains", this.userData.uid), orderBy('date', 'desc'))).then(result => {
        
            console.log(this.chatList);

            const chats = [];

            for (const key in result.docs) {
                if (Object.hasOwnProperty.call(result.docs, key)) {
                    const doc = result.docs[key];
                    chats.push({id: doc.id, ...doc.data()});

                    console.log(this.chatList);
                }
            }

            this.chatList = chats;

        })

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