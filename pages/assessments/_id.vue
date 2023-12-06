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
                    <v-img :src="`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${result.from_userdata.uid}&mouth=cute,wideSmile,faceMask,kissHeart,lilSmile,plain,smileLol,smileTeeth&eyes=closed,cute,love,plain,shades,stars,wink,wink2`"></v-img>
                </v-avatar>
                <v-icon color="primary" size="30" class="ma-2">mdi-file-sign</v-icon>
                <v-avatar size="70">
                    <v-img :src="`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${result.for_userdata.uid}&mouth=cute,wideSmile,faceMask,kissHeart,lilSmile,plain,smileLol,smileTeeth&eyes=closed,cute,love,plain,shades,stars,wink,wink2`"></v-img>
                </v-avatar>
                <h3 class="my-5 mb-2">{{ result.from_userdata.first_name }} {{ result.from_userdata.last_name }}</h3>
                <p class="mb-5" style="line-height: 30px">
                    Assessment note for: <nuxt-link :to="`/profile/${result.for}`">@{{ result.for_userdata.first_name }} {{ result.for_userdata.last_name }}</nuxt-link>  
                    {{ moment(result.date?.toDate()).format('MMMM DD, YYYY hh:ss A') }}
                </p>

                <vue-html2pdf ref="html2Pdf" :enable-download="true" :paginate-elements-by-height="1400" :filename="`Assessment note of ${result.for_userdata.last_name} (${moment(result.date?.toDate()).format('MMMM DD, YYYY')}) - MindfulAid`" :show-layout="false" :float-layout="true">
                    <section slot="pdf-content" style="">
                        <div class="bg-white pa-4" style="background-color: white; padding: 30px">
                            <p style="text-align:center"><span style="font-size:9px"><img alt="" src="/app-icon.png" style="height:83px; width:80px" /></span></p>

                            <p style="text-align:center"><span style="font-size:18px"><strong>MindfulAid</strong></span><br />
                            <span style="font-size:16px"><strong>Assessment Note for {{ result.for_userdata.first_name }} {{ result.for_userdata.middle_name }} {{ result.for_userdata.last_name }}</strong></span><br />
                            <span style="font-size:16px"><strong>Date Assessed: {{ moment(result.date?.toDate()).format('MMMM DD, YYYY hh:ss A') }}</strong></span><br />
                            &nbsp;</p>

                            <p style="text-align:center"><span style="font-size:16px"><strong>Professional Assessor: {{ result.from_userdata.first_name }} {{ result.from_userdata.middle_name }} {{ result.from_userdata.last_name }}<br />
                            Student Assessed: {{ result.for_userdata.first_name }} {{ result.for_userdata.middle_name }} {{ result.for_userdata.last_name }}</strong></span></p>

                            <hr />
                            <p><strong><span style="font-size:20px">Assessment Note:</span></strong></p>

                            <p><strong><span style="font-size:16px">{{ result.assessment }}</span></strong></p>

                            <hr />
                            <p style="text-align:center">&nbsp;</p>

                            <p style="text-align:center">&nbsp;</p>

                            <p style="text-align:center">Generated at {{ moment().format('MMMM-DD-YYYY hh:mm a') }} by <a href="https://mindfulaid.vercel.app/">@<strong>MindfulAid</strong></a></p>

                        </div>
                    </section>
                </vue-html2pdf>

                <div class="my-3">
                    <v-btn large elevation="0" color="primary" @click="generateReport()">
                        Save
                    </v-btn>
                </div>

                <v-divider class="my-5"></v-divider>

                <div class="ma-3">
                    <h3>{{ result.test_name }}</h3>
                    <p class="my-3">{{ result.test_description }}</p>
                </div>

                <v-divider class="my-5"></v-divider>

                <h4 class="my-5">Assessment Note:</h4>

                <p style="font-size: 20px" class="grey--text text--darken-2">{{ result.assessment }}</p>
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

        generateReport () {
            this.$refs.html2Pdf.generatePdf()
        },

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

        const docRef = doc(db, "assessments", this.$route.params.id);
        getDoc(docRef).then(docSnap => {
            if (docSnap.exists()) {
                const questions = docSnap.data().questions;

                this.result = {id: docSnap.id, ...docSnap.data()};

                this.setNavbarConfig({
                    title: `${this.result.from_userdata.first_name} assessment for ${this.result.for_userdata.first_name}`,
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