<template>
    <app-bar>
        
        <h1 class="text-center grey--text text--darken-2 mt-10">How are you {{userData.first_name}}?</h1>
        <div class="status-bar d-flex align-center justify-center">
            <v-chip
                class="ma-2"
                color="white"
                text-color="grey darken-1"
                >
                <v-icon left>
                    mdi-calendar-blank
                </v-icon>
                {{ moment().format('MMMM DD, YYYY') }}
            </v-chip>
        </div>

        <Transition>
            <div class="icon-container ma-2 d-flex flex-wrap justify-center" v-if="!moodSelected.mood">
                <v-card class="pa-3 py-5 rounded-pill ma-2 text-center overflow-hidden" :style="{color: mood.color}" @click="moodSelected = mood" :class="{'mood-selected': moodSelected.mood === mood.mood}" elevation="0" v-for="(mood, i) in moods" :key="i">
                    <v-icon :color="moodSelected.mood === mood.mood ? mood.color : 'grey'" size="60">{{ mood.icon }}</v-icon>
                    <h5 class="grey--text mt-2">{{ mood.mood }}</h5>
                </v-card>
            </div>
            <div class="ma-2 text-center" v-else>
                    <v-chip
                        class="ma-2 my-5"
                        :color="moodSelected.color"
                        text-color="white"
                        close
                        :disabled="isLoading"
                        @click:close="moodSelected = {}"
                    >
                    <v-icon left size="30">
                        {{ moodSelected.icon }}
                    </v-icon>
                    Feeling {{ moodSelected.mood }}
                </v-chip>
                <v-textarea 
                    :disabled="isLoading"
                    v-model="description"
                    :prepend-inner-icon="moodSelected.icon"
                    outlined
                    :color="moodSelected.color"
                    :placeholder="`Tell me the reason why  you're ${moodSelected?.mood.toLowerCase()}`"
                    height="250"
                ></v-textarea>

                <v-btn block large @click="saveDiary()" :loading="isLoading" :disabled="isLoading || description.length < 1" :color="moodSelected.color || 'primary'">Save Diary!</v-btn>
            </div>
        </Transition>
    </app-bar>
</template>

<style lang="scss">

h1 {
    font-weight: lighter;
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
import { serverTimestamp, addDoc, collection, updateDoc, doc, getFirestore } from 'firebase/firestore' 
import { app } from '@/server/firebase';

const db = getFirestore(app);


export default {

    data() {
        return {
            isLoading: false,
            moment: moment,
            moodSelected: {},
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
            title: `Current Mood`,
            goBack: true,
            plain: true,
            hideBottomNav: true
        });
    }

}
</script>