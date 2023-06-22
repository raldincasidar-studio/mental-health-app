<template>
    <app-bar>
        
        <h2 class="text-center grey--text text--darken-2">What's your mood?</h2>

        <div class="d-flex ma-3 scrolling">
            <v-card v-for="(mood, i) in moods" :key="i" class="rounded-pill outlined pa-4 py-7 text-center" elevation="0" v-ripple>
                <v-icon size="60" color="primary" class="mb-3">{{ mood.icon }}</v-icon>
                <h5 class="grey--text">{{ mood.mood }}</h5>
            </v-card>
        </div>

        <v-textarea outlined class="ma-4" placeholder="Tell me about your day ...">

        </v-textarea>
    </app-bar>
</template>

<style scoped lang="scss">

.scrolling {
    overflow: scroll;
}

</style>

<script>
import { mapMutations } from 'vuex';

export default {

    data() {
        return {

            moods: [
                { mood: 'Happy', icon: 'mdi-emoticon-happy' },
                { mood: 'Sad', icon: 'mdi-emoticon-sad' },
                { mood: 'Angry', icon: 'mdi-emoticon-angry' },
                { mood: 'Excited', icon: 'mdi-emoticon-excited' },
                { mood: 'Relaxed', icon: 'mdi-emoticon-neutral' },
                { mood: 'Confused', icon: 'mdi-emoticon-confused' },
                { mood: 'Love', icon: 'mdi-heart' },
                { mood: 'Laughing', icon: 'mdi-emoticon-lol' },
                { mood: 'Crying', icon: 'mdi-emoticon-cry' },
            ]

        }
    },

    methods: {
        ...mapMutations('permaData', ['setNavbarConfig', 'setHomePageSelector']),
    },

    mounted() {
        this.setNavbarConfig({
            title: `Start Daily Diary`,
            goBack: true,
            plain: true,
            hideBottomNav: true
        });
    }

}
</script>