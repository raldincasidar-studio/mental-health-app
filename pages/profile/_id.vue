<template>
    <app-bar>
        <div class="profile">
            <v-img :src="user.id ? `https://picsum.photos/seed/${user.id}/768/432` : ''" lazy-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAtEB5wrzxXEAAAAASUVORK5CYII=" :aspect-ratio="16/9" class="rounded-lg"></v-img>
            <div class="text-center mt-n12">
                <v-avatar size="150" class="white--text" style="border: 5px solid">
                    <v-img style="background-color: rgb(224, 224, 224)" :src="user.id ? `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user.id}&mouth=cute,wideSmile,faceMask,kissHeart,lilSmile,plain,smileLol,smileTeeth&eyes=closed,cute,love,plain,shades,stars,wink,wink2` : `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAtEB5wrzxXEAAAAASUVORK5CYII=`"></v-img>
                </v-avatar>
                <div v-if="!user.id">
                    <v-skeleton-loader class="my-3 d-flex justify-center" type="heading"></v-skeleton-loader>
                    <v-skeleton-loader class="my-3" type="text"></v-skeleton-loader>
                    <v-skeleton-loader class="my-3 d-flex justify-center" type="actions"></v-skeleton-loader>
                </div>
                <div v-else>
                    <h2 class="my-3 mb-0">{{ user.first_name }} {{ user.middle_name && `${user.middle_name[0]}.` }} {{ user.last_name }}</h2>
                    <p class="text-center ma-0">
                        <v-chip
                            class="ma-2 mb-5"
                            :color="user.userType === 'Doctor' ? 'pink' : 'primary'"
                            text-color="white"
                            >
                            <v-icon left>
                                {{ user.userType === 'Doctor' ? 'mdi-doctor' : 'mdi-account-heart' }}
                            </v-icon>
                            {{ user.userType == 'Patient' ? 'Student' : 'Professional' }}
                        </v-chip>
                    </p>
                    <p class="grey--text text--darken-2">
                        {{ user.gender }} | {{ moment().diff(user.date_of_birth, 'year') }} years old
                    </p>
                    <div class="text-center mb-12">
                        <v-btn link :to="`/messages/${user.id}`" style="width: calc(100% - 16px)" elevation="0" color="primary" large class="rounded-lg mx-2">
                            <v-icon left>mdi-facebook-messenger</v-icon>
                            Message
                        </v-btn>
                    </div>

                    <div v-if="user.userType === 'Patient'">
                        
                        <div class="calendar-container">
                            <v-date-picker
                                color="primary"
                                full-width
                                no-title
                                :events="getDiariesDate"
                                :event-color="colorDate"
                            ></v-date-picker>
                        </div>

                        
                        <h1>Test History</h1>

                        <div class="request-access text-center my-12 px-3" v-if="!user?.allowAccess?.includes(this.userData.uid)">
                            <v-icon size="70" class="my-2">mdi-shield-lock</v-icon>
                            <h3 class="my-2">Access is locked!</h3>
                            <p class="my-2 grey--text">Send request access to {{ user.first_name }} to access the test results</p>
                            <v-btn outlined class="mt-5" @click="sendRequestAccess()" :disabled="requestAccessLoading" :loading="requestAccessLoading">Request Access</v-btn>
                        </div>
                        <test-history v-else :test_results="test_results" :me="user.first_name"></test-history>
                    </div>

                    <table v-else class="mt-n5 mb-12" style="table-layout: fixed; width: 100%">
                        <tbody>
                            <tr>
                                <td style="width: 100%; max-width: 70%;">
                                    <h2 style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis">{{ user.address }}</h2>
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
                </div>

            </div>
        </div>
    </app-bar>
</template>

<style lang="scss" scoped>
.profile {
        h1 {
        font-size: 18px;
        text-align: center;
        margin: 20px 0;
        margin-bottom: 20px;
        font-weight: bold;
    }

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
import { collection, getDocs, getDoc, getFirestore, setDoc, limit, orderBy, query, updateDoc, where, doc, serverTimestamp, addDoc } from '@firebase/firestore';
import { mapMutations, mapState } from 'vuex';
import { app } from '@/server/firebase';
import moment  from 'moment';

const db = getFirestore(app);

export default {

    methods: {
        ...mapMutations('permaData', ['setNavbarConfig']),


        async sendRequestAccess() {

            this.requestAccessLoading = true;

            const postData = {
                type: 'request_permission', 
                content: {
                    doctorInfo: this.userData
                },
                date: serverTimestamp(),
                sentBy: this.userData.uid,
                for: this.user.id,
            }

            // Get the user id of both
            const userIds = [this.userData.uid,  this.user.id].sort().join('-');



            const messageId = doc(db, "messages", userIds);

            const docSnap = await getDoc(messageId)

            if (docSnap.exists()) {
                // Update document data
                updateDoc(messageId, {
                    participants: [this.userData.uid,  this.user.id],
                    participantsInfo: [this.userData,  this.user],
                    latestMessage: postData,
                    date: postData.date,
                    seenBy: [this.userData.uid],
                })
            } else {
                // docSnap.data() will be undefined in this case
                // Update document data
                setDoc(messageId, {
                    participants: [this.userData.uid, this.user.id],
                    participantsInfo: [this.userData, this.user],
                    latestMessage: postData,
                    date: postData.date,
                    seenBy: [this.userData.uid],
                })
            }

            // Step 2: Access the subcollection
            const subcollectionRef = collection(messageId, "messages");

            // Step 3: Add a new document to the subcollection using the addDoc function
            const docRef = await addDoc(subcollectionRef, postData);
            // console.log("New post added with ID: ", docRef.id);

            this.requestAccessLoading = false;

            this.$swal.fire({
                toast: true,
                position: 'bottom',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: 'success',
                title: `Successfuly sent to ${ this.user.first_name}`,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', this.$swal.stopTimer)
                    toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                }
            });


            window.parent.sendNotif(this.user.notificationId, `${this.user.first_name} ${this.user.middle_name && this.user.middle_name[0] + `.`} ${this.user.last_name}:`, `${this.user.first_name} requested access to your test results`);
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
    },
    computed: {
        ...mapState('permaData', ['userData']),

        getDiariesDate() {
            return [...new Set( this.diaries.map(diary => {
                return moment(diary.date_added?.toDate()).format('YYYY-MM-DD')
            }) )]
        }
    },
    data() {
        return {
            moment: moment,
            user: {},
            diaries: [],
            test_results: [],
            requestAccessLoading: false,
        }
    },
    mounted() {
        this.setNavbarConfig({
            title: `Loading ...`,
            goBack: true,
            plain: true,
            hideBottomNav: true
        });


        const docRef = doc(db, "user", this.$route.params.id);
        getDoc(docRef).then(docSnap => {
            if (docSnap.exists()) {
                this.user = {id: docSnap.id, ...docSnap.data()};

                this.setNavbarConfig({
                    title: `${this.user.first_name}'s Profile'`,
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
        
        // FETCH TEST RESULTS
        getDocs(query(collection(db, 'test_results'), orderBy('date_added', 'desc'), where('by', '==', this.$route.params.id))).then(results => {
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


        // FETCH DIARIES
        getDocs(query(collection(db, 'diary'), orderBy('date_added', 'asc'), where('by', '==', this.$route.params.id))).then(results => {
            results.forEach(doc => {
                this.diaries.push({id: doc.id, ...doc.data()});
            });
        }).catch(error => {
            console.error(error);
        })
    }
}
</script>