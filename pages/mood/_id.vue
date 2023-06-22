<template>
    <app-bar>
        
        <div class="skeletons" v-if="!info.mood">
            <v-skeleton-loader type="avatar" class="d-flex justify-center my-2 mt-10"></v-skeleton-loader>
            <v-skeleton-loader type="text" class="d-flex justify-center my-2"></v-skeleton-loader>
            <v-skeleton-loader type="heading" class="d-flex justify-center my-2"></v-skeleton-loader>
            <v-skeleton-loader type="text" class="my-2 mb-0 mt-10"></v-skeleton-loader>
            <v-skeleton-loader type="text"></v-skeleton-loader>
            <v-skeleton-loader type="text"></v-skeleton-loader>
            <v-skeleton-loader type="sentences" class=""></v-skeleton-loader>
        </div>
        <div v-else>
            
            <p class="text-center mb-0 mt-10">
                <v-icon size="70" :color="info.color">{{ info.icon }}</v-icon>
            </p>
            <h1 class="text-center grey--text text--darken-2 mt-2">{{info.userData?.first_name}}'s Feeling {{ info.mood }}</h1>
            <div class="status-bar d-flex align-center justify-center">
                <v-chip
                    class="ma-2"
                    color="white"
                    text-color="grey darken-1"
                    >
                    <v-icon left>
                        mdi-calendar-blank
                    </v-icon>
                    {{ moment(info.date_added.toDate()).format('MMMM DD, YYYY hh:mm A') }}
                </v-chip>
            </div>
            
            <style>
                :root {
                    --emoteColor: {{ info.color }}
                }
            </style>
            <div class="ma-2 notebook-stype ma-2" :data-color="info.color">
                {{ info.text }}
            </div>
        </div>
    </app-bar>
</template>

<style lang="scss">

h1 {
    font-weight: lighter;
}

.notebook-stype {
    font-size: 19px;
    font-family: 'Times New Roman', Times, serif;
    line-height: 40px;
    text-align: justify;
}

.notebook-stype:first-letter {
    font-size: 80px;
    color: var(--emoteColor); 
    initial-letter: 2;
}

.mood-selected {
    outline: 2px solid;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>

<script>
import { mapMutations, mapState } from 'vuex';
import moment from 'moment';
import { serverTimestamp, addDoc, collection, updateDoc, doc, getFirestore, getDoc } from 'firebase/firestore' 
import { app } from '@/server/firebase';

const db = getFirestore(app);


export default {

    data() {
        return {
            isLoading: false,
            moment: moment,
            moodSelected: {},
            info: {},
            description: '',
            moods: [
                { mood: 'Happy', icon: 'mdi-emoticon-happy', color: '#FFC300' },
                { mood: 'Sad', icon: 'mdi-emoticon-sad', color: '#4D79A6' },
                { mood: 'Angry', icon: 'mdi-emoticon-angry', color: '#FF5750' },
                { mood: 'Excited', icon: 'mdi-emoticon-excited', color: '#FF99B4' },
                { mood: 'Relaxed', icon: 'mdi-emoticon-neutral', color: '#77DD77' },
                { mood: 'Confused', icon: 'mdi-emoticon-confused', color: '#9BC1BC' },
                { mood: 'Love', icon: 'mdi-heart', color: '#FF91A4' },
                { mood: 'Laughing', icon: 'mdi-emoticon-lol', color: '#FFB3A7' },
                { mood: 'Crying', icon: 'mdi-emoticon-cry', color: '#87CEEB' },
            ]

        }
    },

    computed: {
        ...mapState('permaData', ['userData']),
    },

    watch: {
        moodSelected(newValue, oldValue) {
            console.log(newValue.color);
            window.document.querySelector('.v-application').style.backgroundColor = newValue.color + ' !important'
        },
    },

    methods: {
        ...mapMutations('permaData', ['setNavbarConfig', 'setHomePageSelector']),

        async saveDiary() {

            this.isLoading = true;

            const data = { 
                mood: this.moodSelected.mood,
                color: this.moodSelected.color,
                icon: this.moodSelected.icon,
                text: this.description,
                date_added: serverTimestamp(),
                by: this.userData.uid,
                userData: this.userData,
            }

            const docRef = await addDoc(collection(db, "diary"), data);
            await updateDoc(doc(db, "user", this.userData.uid), {
                lastDiaryUpdated: data.date_added
            });


            console.log('Save submitted data: ', data);

            this.isLoading = false;

            this.$swal.fire({
                toast: true,
                position: 'bottom',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: 'success',
                title: 'Great Job!',
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            });

            this.$router.replace('/home-screen');

        },
    },

    destroyed() {
        window.document.querySelector('.v-application').style.backgroundColor = '#fff';
    },



    mounted() {
        this.setNavbarConfig({
            title: `Loading ...`,
            goBack: true,
            plain: true,
            hideBottomNav: true
        });

        const docRef = doc(db, "diary", this.$route.params.id);
        getDoc(docRef).then(docSnap => {
            if (docSnap.exists()) {
                const questions = docSnap.data().questions;

                this.info = {id: docSnap.id, ...docSnap.data()};

                this.setNavbarConfig({
                    title: `${moment(this.info.date_added.toDate()).format('MMM Do YY')} ${this.info.userData.first_name}'s Diary`,
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