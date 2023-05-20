<template>
    <app-bar>
        <div class="container">
            <h1 class="mb-10">Are you a Patient or a Guardian?</h1>

            <v-card class="text-center pa-3 py-10 my-5 border-3-transparent rounded-lg hidden-border" :class="{'selected': userType == 'Patient'}" @click="userType = 'Patient'">
                <v-icon :color="userType == 'Patient' ? 'primary' : 'grey lighten-1'" size="100">mdi-account</v-icon>
                <h4>I'm a Patient</h4>
            </v-card>
            <v-card class="text-center pa-3 py-10 my-5 border-3-transparent rounded-lg hidden-border" :class="{'selected': userType == 'Guardian'}" @click="userType = 'Guardian'">
                <v-icon :color="userType == 'Guardian' ? 'primary' : 'grey lighten-1'" size="100">mdi-account-multiple</v-icon>
                <h4>I'm a Guardian</h4>
            </v-card>
            <v-card class="text-center pa-3 py-10 my-5 border-3-transparent rounded-lg hidden-border" :class="{'selected': userType == 'Doctor'}" @click="userType = 'Doctor'">
                <v-icon :color="userType == 'Guardian' ? 'primary' : 'grey lighten-1'" size="100">mdi-doctor</v-icon>
                <h4>I'm a Doctor</h4>
            </v-card>
            <v-btn color="primary" :disabled="!userType" block x-large append-icon="mdi-vuetify" class="mt-10" @click="proceed()">
                NEXT
                <v-icon
                    right
                    dark
                    size="25"
                >
                    mdi-arrow-right
                </v-icon>
            </v-btn>
        </div>
    </app-bar>
</template>

<style scoped lang="scss">
h1 {
    text-align: center;
    font-size: 25px;
    color: #222222;
}

.hidden-border {
    border: 3px solid transparent;
    transition: border .2s linear;
}

.selected {
    border: 3px solid #45B3E0;
}
</style>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
    
    data() {
        return {

            userType: '',

        }
    },

    mounted() {
        this.setNavbarConfig({
            title: 'Get Started',
            goBack: true,
            plain: false,
        })
    },

    methods: {
        ...mapMutations('permaData', ['setuserTypeSelected', 'setNavbarConfig']),
        proceed() {

            this.setuserTypeSelected(this.userType);

            this.$router.replace('/collect-data');

        }
    }

    
}
</script>