<template>
    <app-bar>
        <div class="chat-block">
            
            <div class="chat my-chat">
                <!-- <div class="chatcontent primary">
                    Hello! Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae sint maxime ipsum ratione ipsam odio sed hic, quae ut fugit magni dolorum? Quos totam consequatur cumque. Corporis maxime aliquam nostrum pariatur illum cupiditate nobis adipisci reiciendis voluptatum sequi quo recusandae, culpa aspernatur reprehenderit nemo repellat perspiciatis aperiam tempore animi quia!
                </div> -->
                <v-img class="image-chat" max-height="400" src="https://support.gameclub.ph/hc/article_attachments/9194507330329/mceclip1.png" lazy-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAtEB5wrzxXEAAAAASUVORK5CYII="></v-img>
            </div>
            <div class="chat my-chat">
                <div class="chatcontent primary">
                    Hello! Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae sint maxime ipsum ratione ipsam odio sed hic, quae ut fugit magni dolorum? Quos totam consequatur cumque. Corporis maxime aliquam nostrum pariatur illum cupiditate nobis adipisci reiciendis voluptatum sequi quo recusandae, culpa aspernatur reprehenderit nemo repellat perspiciatis aperiam tempore animi quia!
                </div>
                <!-- <v-img class="image-chat" max-height="400" src="https://support.gameclub.ph/hc/article_attachments/9194507330329/mceclip1.png" lazy-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAtEB5wrzxXEAAAAASUVORK5CYII="></v-img> -->
            </div>
            
            <div class="timestamp text-center text-overline grey--text">
                5:13 AM
            </div>
            <div class="chat her-chat">
                <div class="profile">
                    <v-avatar class="mr-3" style="opacity: 0; pointer-events: none">
                        <v-img :src="user.id ? `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user.id}&mouth=cute,wideSmile,faceMask,kissHeart,lilSmile,plain,smileLol,smileTeeth&eyes=closed,cute,love,plain,shades,stars,wink,wink2` : `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAtEB5wrzxXEAAAAASUVORK5CYII=`"></v-img>
                    </v-avatar>
                </div>
                <div class="chatcontent grey lighten-2 black--text">
                    Hello! i missed you po
                </div>
            </div>
            <div class="chat her-chat">
                <div class="profile">
                    <v-avatar class="mr-3">
                        <v-img :src="user.id ? `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user.id}&mouth=cute,wideSmile,faceMask,kissHeart,lilSmile,plain,smileLol,smileTeeth&eyes=closed,cute,love,plain,shades,stars,wink,wink2` : `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAtEB5wrzxXEAAAAASUVORK5CYII=`"></v-img>
                    </v-avatar>
                </div>
                <!-- <div class="chatcontent grey lighten-2 black--text">
                    Hello! potangina mo ka
                </div> -->
                <v-img class="image-chat" max-height="400" src="https://support.gameclub.ph/hc/article_attachments/9194507330329/mceclip1.png" lazy-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAtEB5wrzxXEAAAAASUVORK5CYII="></v-img>

            </div>
            <div class="timestamp text-center text-overline grey--text">
                5:13 AM
            </div>
            <div class="chat her-chat">
                <div class="profile">
                    <v-avatar class="mr-3">
                        <v-img :src="user.id ? `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user.id}&mouth=cute,wideSmile,faceMask,kissHeart,lilSmile,plain,smileLol,smileTeeth&eyes=closed,cute,love,plain,shades,stars,wink,wink2` : `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAtEB5wrzxXEAAAAASUVORK5CYII=`"></v-img>
                    </v-avatar>
                </div>
                <!-- <div class="chatcontent grey lighten-2 black--text">
                    Hello! potangina mo ka
                </div> -->
                <!-- FILE -->
                <div class="chatcontent file grey lighten-2 black--text">
                    <v-list class="pa-0 transparent">
                        <v-list-item class="pa-0 transparent">
                            <v-list-item-avatar>
                                <v-icon
                                    class="grey lighten-1"
                                    dark
                                >
                                    mdi-file-download
                                </v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>Oten.png</v-list-item-title>
                                <v-list-item-subtitle>1.57 MB</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </div>
                <!-- <v-img class="image-chat" max-height="400" src="https://support.gameclub.ph/hc/article_attachments/9194507330329/mceclip1.png" lazy-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAtEB5wrzxXEAAAAASUVORK5CYII="></v-img> -->

            </div>

            <div class="chat my-chat">
                <!-- <div class="chatcontent primary">
                    Hello! Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae sint maxime ipsum ratione ipsam odio sed hic, quae ut fugit magni dolorum? Quos totam consequatur cumque. Corporis maxime aliquam nostrum pariatur illum cupiditate nobis adipisci reiciendis voluptatum sequi quo recusandae, culpa aspernatur reprehenderit nemo repellat perspiciatis aperiam tempore animi quia!
                </div> -->
                <v-img class="image-chat" max-height="400" src="https://support.gameclub.ph/hc/article_attachments/9194507330329/mceclip1.png" lazy-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAtEB5wrzxXEAAAAASUVORK5CYII="></v-img>
            </div>
            <div class="chat my-chat">
                <div class="chatcontent file primary white--text">
                    <v-list class="pa-0 transparent">
                        <v-list-item class="pa-0 transparent">
                            <v-list-item-avatar>
                                <v-icon
                                    class="primary darken-1"
                                    dark
                                >
                                    mdi-file-download
                                </v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title class="white--text">Oten.png</v-list-item-title>
                                <v-list-item-subtitle class="primary--text text--lighten-2">1.57 MB</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </div>
                <!-- <v-img class="image-chat" max-height="400" src="https://support.gameclub.ph/hc/article_attachments/9194507330329/mceclip1.png" lazy-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAtEB5wrzxXEAAAAASUVORK5CYII="></v-img> -->
            </div>

            <div class="input-container white pa-3 d-flex align-items-center" style="position: fixed; bottom:0; right: 0; left: 0; z-index: 9999">
                <v-btn icon color="primary" class="mr-1">
                    <v-icon>mdi-file-upload</v-icon>
                </v-btn>
                <v-text-field outlined dense hide-details class="rounded-pill" label="Your message here ..."></v-text-field>
                <v-btn icon color="primary" class="ml-1">
                    <v-icon>mdi-arrow-up-bold</v-icon>
                </v-btn>
            </div>
        </div>
    </app-bar>
</template>

<style lang="scss" scoped>

.chat-block {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    padding-bottom: 65px;

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
    }
}

</style>

<script>
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { mapMutations, mapState } from 'vuex';
import { app } from '@/server/firebase';

const db = getFirestore(app);

export default {
    data() {
        return {
            user: {},
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
            } else {
                // docSnap.data() will be undefined in this case
                console.log('🔴 NO DATA');
                this.$router.replace('/home-screen');
            }
        })
    },

    computed: {
        ...mapState('permaData', ['userData']),
    },

    methods: {
        ...mapMutations('permaData', ['setNavbarConfig', 'setHomePageSelector']),
    },
}
</script>