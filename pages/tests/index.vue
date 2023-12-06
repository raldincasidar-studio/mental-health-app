<template>
    <app-bar>

            <v-skeleton-loader type="image, article" v-for="i in 2" :key="i" v-if="tests.length < 1" class="ma-2 my-10"></v-skeleton-loader>

            <v-card
                v-else
                v-for="(test, i) in tests" :key="test.id"
                light
                class="ma-2 my-10"
            >
                <v-img
                class="white--text align-end"
                height="200px"
                :src="test.image"
                >
            </v-img>
            
                <v-card-title>{{ test.name }} </v-card-title>
                <v-card-subtitle class="pb-0">
                {{ tests.type || 'Desease' }}
                </v-card-subtitle>

                <v-card-text class="text--primary">
                    {{ test.description }}
                </v-card-text>

                <v-card-actions>
                <v-btn
                    color="primary"
                    elevation="0"
                    block
                    :to="`/tests/${test.id}`"
                >
                    Take the Test
                </v-btn>
                </v-card-actions>
            </v-card>
    </app-bar>
</template>

<script>
import { collection, getDocs, getFirestore, initializeFirestore, orderBy, query } from '@firebase/firestore';
import { app } from '@/server/firebase';
import { mapMutations } from 'vuex';

const db = getFirestore(app);

export default {

    data() {
        return {
            tests: [],
        }
    },

    methods: {
        ...mapMutations('permaData', ['setNavbarConfig', 'setHomePageSelector']),
    },

    mounted() {

        this.setNavbarConfig({
            title: `Mental Health Tests`,
            goBack: true,
            plain: true,
            hideBottomNav: true
        });

        getDocs(query(collection(db, 'tests'), orderBy('date_added', 'desc'))).then(results => {
        results.forEach(doc => {
            this.tests.push({id: doc.id, ...doc.data()});
        });
        }).catch(error => {
            console.error(error);
        })
    }

}
</script>