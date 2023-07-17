<template>
    <app-bar>
        <div class="chat-block">
            
            <div v-if="chats.length === 0" class="say-hello">
                <img src="/wave.gif" width="100">
                <p class="my-5">Say Hello!</p>
            </div>

            <div v-for="(chat, i) in chats" :key="chat.id" class="chatcont">
                <div class="timestamp text-center text-overline grey--text" v-if="getSecondsPast( chats[i-1]?.date?.toDate(), chat.date?.toDate() ) > 240">
                    {{ moment(chat.date?.toDate()).format("h:mm A") }}
                </div>
                
                <div class="chat" :class="{'my-chat' : chat.sentBy === userData.uid, 'her-chat' : chat.sentBy !== userData.uid, 'stick-chat-top': getSecondsPast( chats[i-1]?.date?.toDate(), chat.date?.toDate() ) < 60 && chats[i-1]?.sentBy === chat?.sentBy, 'stick-chat-bottom': getSecondsPast( chats[i+1]?.date?.toDate(), chat.date?.toDate() ) < 60 && chats[i+1]?.sentBy === chat?.sentBy}">
                    <div class="profile" v-if="chat.sentBy !== userData.uid" :class="{'hide-profile':  ( getSecondsPast( chats[i+1]?.date?.toDate(), chat.date?.toDate() ) < 60 && chats[i+1]?.sentBy === chat?.sentBy ) }">
                        <v-avatar class="mr-3" size="30" @click="$router.push(`/profile/${chat.sentBy}`)">
                            <v-img :src="user.id ? `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user.id}&mouth=cute,wideSmile,faceMask,kissHeart,lilSmile,plain,smileLol,smileTeeth&eyes=closed,cute,love,plain,shades,stars,wink,wink2` : `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAtEB5wrzxXEAAAAASUVORK5CYII=`"></v-img>
                        </v-avatar>
                    </div>
                    <div class="chatcontent" :class="{'primary white--text' : chat.sentBy === userData.uid, 'grey lighten-2 black--text' : chat.sentBy !== userData.uid, 'file': ['file', 'test_result', 'request_permission'].includes(chat.type)}">
                        <div @click="chat.type === 'test_result' ? $router.push(`/results/${chat.content.id}`) : ''" class="text-center my-4" style="width: 100%" v-if="['file', 'test_result', 'request_permission'].includes(chat.type)">
                            <v-btn :to="`/results/${chat.content.id}`" fab depressed :color="chat.sentBy === userData.uid ? `primary darken-1` : `grey lighten-1`" class="mb-3" size="40" v-ripple="false">
                                <v-icon color="white">
                                    {{ chat.type === 'test_result' ? `mdi-link-variant` : 'mdi-shield-link-variant' }}
                                </v-icon>
                            </v-btn>
                            <div v-if="chat.type === 'test_result'">
                                <h3 class="my-1" style="font-weight: lighter">{{ chat.content.test_name }} Test Result</h3>
                                <h5 class="my-1" style="font-weight: bold">{{ chat.content.first_name }} {{ chat.content.middle_name ? chat.content.middle_name[0] + '.' : '' }} {{ chat.content.last_name }}</h5>
                                <v-chip :color="chat.sentBy === userData.uid ? `primary darken-1` : `grey lighten-1`">{{ chat.content.result_percentage}}% Result</v-chip>
                            </div>
                            <div v-if="chat.type === 'request_permission'">
                                <h3 class="my-1" style="font-weight: lighter">Request Access to {{ chat.sentBy !== userData.uid ? 'your' : user.first_name+"'s" }} Data</h3>
                                <h5 class="my-1" style="font-weight: normal">{{ chat.sentBy === userData.uid ? 'You' : user.first_name }} requested to see {{ chat.sentBy !== userData.uid ? 'your' : user.first_name+"'s" }} test results data.</h5>
                                <div v-if="chat.sentBy !== userData.uid">
                                    <v-divider class="my-3 mt-5"></v-divider>
                                    <v-btn @click="grantPermission(chat.content.doctorInfo)" :color="chat.sentBy === userData.uid ? `white` : `black`" outlined>Grant Access</v-btn>
                                </div>
                            </div>
                        </div>
                        <span v-if="chat.type === 'text'">{{ chat.content }}</span>
                    </div>
                    <!-- <v-img class="image-chat" max-height="400" src="https://support.gameclub.ph/hc/article_attachments/9194507330329/mceclip1.png" lazy-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAtEB5wrzxXEAAAAASUVORK5CYII="></v-img> -->
                </div>
            </div>
            
            <transition name="fade">
                <v-btn class="scroll-to-bottom" fab small @click="scrollToBottom()" v-show="showScrollDown">
                    <v-icon>mdi-arrow-down</v-icon>
                </v-btn>
            </transition>

            <!-- INPUT CONTAINER -->
            <div class="input-container white pa-3 d-flex align-items-center" style="position: fixed; bottom:0; right: 0; left: 0; z-index: 9999">
                <v-text-field outlined dense type="text" hide-details @click="checkScrollToBottom()" ref="inputbox" class="rounded-pill" v-model="messageContent" label="Your message here ..."></v-text-field>
                <v-btn @click="sendMessage()" :disabled="messageContent.length < 1" icon color="primary" class="ml-1">
                    <v-icon>mdi-arrow-up-bold</v-icon>
                </v-btn>
            </div>
        </div>
    </app-bar>
</template>

<style lang="scss" scoped>



.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}



.chat-block {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    padding-bottom: 65px;

    .scroll-to-bottom {
        position: fixed;
        z-index: 999999;
        left: 50%;
        transform: translateX(-50%);
        bottom: 85px;
    }

    .chatcont {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .profile.hide-profile {
        opacity: 0;
        pointer-events: none;
    }

    .say-hello {
        width: 100%;
        padding: 50px 20px;
        text-align: center;
    }

    .chat {
        max-width: 75%;
        display: flex;
        flex-direction: row;
        margin: 8px 0 ;
        align-items: flex-end;

        .image-chat {
            border-radius: 22px;
            border: 1px solid #e0e0e0;
            transition: all .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

            &:active {
                opacity: 0.7;
                transform: scale(0.95);
            }
        }

        .preview-image {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 9999999;
            background-color: rgb(176, 176, 176);
            background-size: contain;
            background-position: center center;
            padding: 10px;
            display: flex;
            justify-content: flex-end;
            align-items: flex-start;
        }

        &.my-chat {
            align-self: flex-end;
        }

        .chatcontent {
            border-radius: 22px;
            padding: 12px 12px;
            font-size: 15px;
            color: white;
            transition: all .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

            &:active {
                opacity: 0.7;
                transform: scale(0.95);
            }
        }

        &.her-chat.stick-chat-top {
            margin-top: 1px;
            .chatcontent {
                border-top-left-radius: 10px;
            }
        }
        &.her-chat.stick-chat-bottom {
            margin-bottom: 1px;
            .chatcontent {
                border-bottom-left-radius: 10px;
            }
        }

        &.my-chat.stick-chat-top {
            margin-top: 1px;
            .chatcontent {
                border-top-right-radius: 10px;
            }
        }
        &.my-chat.stick-chat-bottom {
            margin-bottom: 1px;
            .chatcontent {
                border-bottom-right-radius: 10px;
            }
        }
    }
}

</style>

<script>
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, getFirestore, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { mapMutations, mapState } from 'vuex';
import { app } from '@/server/firebase';
import moment from 'moment';

const db = getFirestore(app);

export default {
    data() {
        return {
            user: {},
            messageContent: '',
            chats: [],
            moment: moment,
            interval: 0,
            showScrollDown: false,
            firstLoad: true,
            querySnapshot: null,
        }
    },
    mounted() {
        this.setNavbarConfig({
            title: `Loading ...`,
            goBack: true,
            plain: true,
            hideBottomNav: true
        });

        // Fetch User Info
        const docRef = doc(db, "user", this.$route.params.id);
        getDoc(docRef).then(docSnap => {
            if (docSnap.exists()) {
                this.user = {id: docSnap.id, ...docSnap.data()};

                this.setNavbarConfig({
                    title: `${this.user.first_name} ${this.user.middle_name && this.user.middle_name[0] + `.`} ${this.user.last_name}`,
                    goBack: true,
                    plain: true,
                    hideBottomNav: true
                });

                this.initMessages();
            } else {
                // docSnap.data() will be undefined in this case
                console.log('🔴 NO DATA');
                this.$router.replace('/home-screen');
            }
        })
    },

    beforeDestroy() {
        clearInterval(this.interval);
        this.querySnapshot();
        console.log('CLEARED INTERVALL!!!');
    },

    computed: {
        ...mapState('permaData', ['userData']),
    },

    methods: {

        async grantPermission(doctor) {
            
            if (!confirm(`${doctor.first_name} will have all the access to your test results. Please make sure you trust this doctor before granting access to your data.`)) return;


            await updateDoc(doc(db, "user", this.userData.uid), {
                allowAccess: arrayUnion(doctor.uid)
            })

            this.$swal.fire({
                toast: true,
                position: 'center',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: 'success',
                title: `${doctor.first_name} have granted access to data`,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', this.$swal.stopTimer)
                    toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                }
            });
        },

        getSecondsPast(datePast, dateThisChat) {

            return Math.abs( moment(dateThisChat).diff(datePast, "seconds") );

        },

        ...mapMutations('permaData', ['setNavbarConfig', 'setHomePageSelector']),

        scrollToBottom() {
            
            this.$vuetify.goTo(document.body.scrollHeight)
        },
        
        async initMessages() {

            // Get the user id of both
            const userIds = [this.userData.uid, this.user.id].sort().join('-');

            const messageId = doc(db, "messages", userIds);

            // Step 2: Access the subcollection
            const subcollectionRef = query(collection(messageId, "messages"), orderBy('date', 'desc'), limit(20));

            this.querySnapshot = onSnapshot(subcollectionRef, (querySnapshot) => {
                const postChats = [];
    
                for (const key in querySnapshot.docs.reverse()) {
                    if (Object.hasOwnProperty.call(querySnapshot.docs.reverse(), key)) {
                        const doc = querySnapshot.docs.reverse()[key];
                        
                        const postData = doc.data();
                        postChats.push({ id: doc.id, ...postData });
                    }
                }
    
                this.chats = postChats;

                
                if (this.firstLoad) {
                    setTimeout(() => {
                        this.$vuetify.goTo(999999999999999);
                        console.log('FIRST LOAD 9999');
                        this.firstLoad = false;
                    }, 500);
                }
                else {
                    this.checkScrollToBottom();
                }

                

                updateDoc(messageId, {
                    seenBy: arrayUnion(this.userData.uid),
                })
                
    
                console.log(this.chats)
            });

            setTimeout(() => {
                this.interval = setInterval(() => {
                    this.checkScrollToBottom();
                }, 1500);
            }, 500);
        },

        async scrollToBottom() {

            const scrollHeight = document.body.scrollHeight;
            console.log(scrollHeight)

            this.$vuetify.goTo(scrollHeight + 999);

        },

        async checkScrollToBottom() {
            const scrollTop = window.top.scrollY + screen.height;

            const scrollHeight = document.body.scrollHeight;

            const scrollDiff = scrollHeight - scrollTop;

            const scrollOffsetSetting = 50;

            if (scrollDiff <= scrollOffsetSetting) {
                this.scrollToBottom();
                this.showScrollDown = false;
            }
            else {
                this.showScrollDown = true;
            }

            console.log(this.interval);

        },

        async sendMessage() {
            this.$refs.inputbox.focus();

            const postData = {
                type: 'text', 
                content: this.messageContent,
                date: serverTimestamp(),
                sentBy: this.userData.uid,
                for: this.user.id,
            }


            this.messageContent = '';

            // Get the user id of both
            const userIds = [this.userData.uid, this.user.id].sort().join('-');

            

            const messageId = doc(db, "messages", userIds);

            getDoc(messageId).then( docSnap => {
                if (docSnap.exists()) {
                    // Update document data
                    updateDoc(messageId, {
                        participants: [this.userData.uid, this.user.id],
                        participantsInfo: [this.userData, this.user],
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
            } )

            // Step 2: Access the subcollection
            const subcollectionRef = collection(messageId, "messages");

            // Step 3: Add a new document to the subcollection using the addDoc function
            const docRef = addDoc(subcollectionRef, postData);
            // console.log("New post added with ID: ", docRef.id);

            window.parent.sendNotif(this.user.notificationId, `${this.user.first_name} ${this.user.middle_name && this.user.middle_name[0] + `.`} ${this.user.last_name}:`, postData.content);
           
        },
    },
}
</script>