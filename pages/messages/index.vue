<template>
    <app-bar>
        <v-list-item three-line link :to="`/messages/${getChatInfo(chat).id || getChatInfo(chat).uid}`" v-for="(chat, i) in chatList" :key="chat.id">
            <v-list-item-avatar>
                <v-img :src="`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${getChatInfo(chat).id || getChatInfo(chat).uid}&mouth=cute,wideSmile,faceMask,kissHeart,lilSmile,plain,smileLol,smileTeeth&eyes=closed,cute,love,plain,shades,stars,wink,wink2`" lazy-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAtEB5wrzxXEAAAAASUVORK5CYII="></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title :class="{'bold-text': !chat.seenBy?.includes(userData.uid)}">{{ getChatInfo(chat).first_name }} {{ getChatInfo(chat).middle_name && `${getChatInfo(chat).middle_name[0]}.` }} {{ getChatInfo(chat).last_name }}</v-list-item-title>
                <v-list-item-subtitle class="mt-n4" :class="{'bold-text': !chat.seenBy?.includes(userData.uid)}">
                {{ chat.latestMessage.sentBy === userData.uid ? 'You:' : '' }} {{ chat.latestMessage.type === "text" ? chat.latestMessage.content : `${chat.latestMessage.sentBy !== userData.uid ? getChatInfo(chat).first_name : ''} sent a message` }}
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </app-bar>
</template>

<style lang="scss" scoped>

.bold-text {
    font-weight: bold;
}

</style>

<script>
import { collection, getDocs, orderBy, query, where, getFirestore, onSnapshot } from 'firebase/firestore';
import { mapMutations, mapState } from 'vuex';
import { app } from '@/server/firebase';
import moment from 'moment';

const db = getFirestore(app);

export default {

    data() {
        return {
            chatList: [],
            snapshot: null,
        }
    },

    computed: {
        ...mapState('permaData', ['userData']),
    },

    
    methods: {
        ...mapMutations('permaData', ['setNavbarConfig']),

        getChatInfo(chat) {

            return chat.participantsInfo.filter(user => user.uid !== this.userData.uid && user.id !== this.userData.uid )[0];
        },
    },

    beforeDestroy() {
        this.snapshot();
    },

    mounted() {
        this.setNavbarConfig({
            title: `Messages`,
            goBack: true,
            plain: true,
            hideBottomNav: true
        });

        
        
        // Get all chatlists
        this.snapshot = onSnapshot(query(collection(db, "messages"), where('participants', "array-contains", this.userData.uid), orderBy('date', 'desc')), result => {
        
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
    }
}
</script>