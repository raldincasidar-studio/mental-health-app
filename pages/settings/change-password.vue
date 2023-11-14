<template>
    <app-bar>
        <div class="container text-center">
            <h4 class="text-primary mb-8 grey--text">
                <v-icon size="60" class=" grey--text">mdi-form-textbox-password</v-icon> <br>
                Password
            </h4>
            <p class="label mb-10" v-if="needToSignup || needToLogin">
                <v-icon>mdi-email</v-icon> 
                {{ this.email }}
                <v-btn icon large class="mr-n7" @click="cancel()" :disabled="isLoading" v-if="needToSignup || needToLogin"><v-icon color="red">mdi-close</v-icon></v-btn>
            </p>

            <div class="d-flex gap-2 userType my-10" v-if="page == 'signup'">
                <v-card style="flex: 1" class="text-center pa-3 py-10 mr-4 border-3-transparent rounded-lg hidden-border" :class="{'selected': userType == 'Patient'}" @click="userType = 'Patient'">
                    <v-icon :color="userType == 'Patient' ? 'primary' : 'grey lighten-1'" size="60">mdi-account</v-icon>
                    <h4>I'm a Patient</h4>
                </v-card>
                <v-card style="flex: 1" class="text-center pa-3 py-10 border-3-transparent rounded-lg hidden-border" :class="{'selected': userType == 'Doctor'}" @click="userType = 'Doctor'">
                    <v-icon :color="userType == 'Guardian' ? 'primary' : 'grey lighten-1'" size="60">mdi-doctor</v-icon>
                    <h4>I'm a professional</h4>
                </v-card>
            </div>

            <!-- <v-text-field v-model="email" readonly label="Email" persistent-hint hint="Your email address can not be changed" append-icon="mdi-email" filled large class="my-1"></v-text-field>
            <v-text-field v-model="first_name" label="First Name" filled large class="my-1"></v-text-field>
            <v-text-field v-model="middle_name" label="Initial Name" filled large class="my-1"></v-text-field>
            <v-text-field v-model="last_name" label="Last Name" filled large class="my-1"></v-text-field>
            <v-select v-model="suffix" label="Suffix (Optional)" :items="['', 'Jr', 'Sr', 'II', 'III', 'IV', 'V']" filled large class="my-1"></v-select>
            <v-text-field v-model="date_of_birth" type="date" label="Date of Birth" filled large class="my-1"></v-text-field>
            <v-select :items="['Male', 'Female', 'Prefer not to say']" v-model="gender" label="Gender" filled large class="my-1"></v-select>
            <v-text-field v-model="address" label="Address" filled large class="my-1"></v-text-field>
            <v-text-field v-model="phone_number" label="Phone Number" prefix="+63" filled large class="my-1" maxlength="10"></v-text-field> -->
            <v-text-field v-model="password" label="Password" append-icon="mdi-lock" type="password" filled large class="my-1"></v-text-field>
            <v-text-field v-model="confirm_password" label="Confirm Password" append-icon="mdi-lock" type="password" filled large class="my-1"></v-text-field>

            <v-alert :type="/^(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{6,}$/.test(password) && password == confirm_password ? 'success' : 'error'" class="text-left" text v-if="password !== ''">
                Password must contain atleast: <br>
                <span :class="{'red--text': ! /.*[a-z].*/.test(password), 'green--text': /.*[a-z].*/.test(password)}"><v-icon :class="{'red--text': ! /.*[a-z].*/.test(password), 'green--text': /.*[a-z].*/.test(password)}" class="mr-1">mdi-{{ /.*[a-z].*/.test(password) ? 'check' : 'close' }}</v-icon>1 small character</span> <br>
                <span :class="{'red--text': ! /.*[A-Z].*/.test(password), 'green--text': /.*[A-Z].*/.test(password)}"><v-icon :class="{'red--text': ! /.*[A-Z].*/.test(password), 'green--text': /.*[A-Z].*/.test(password)}" class="mr-1">mdi-{{ /.*[A-Z].*/.test(password) ? 'check' : 'close' }}</v-icon>1 big character</span> <br>
                <span :class="{'red--text': ! /.*[^a-zA-Z0-9].*/.test(password), 'green--text': /.*[^a-zA-Z0-9].*/.test(password)}"><v-icon :class="{'red--text': ! /.*[^a-zA-Z0-9].*/.test(password), 'green--text': /.*[^a-zA-Z0-9].*/.test(password)}" class="mr-1">mdi-{{ /.*[^a-zA-Z0-9].*/.test(password) ? 'check' : 'close' }}</v-icon>1 special character</span> <br>
                <span :class="{'red--text': ! /.{6,}/.test(password), 'green--text': /.{6,}/.test(password)}"><v-icon :class="{'red--text': ! /.{6,}/.test(password), 'green--text': /.{6,}/.test(password)}" class="mr-1">mdi-{{ /.{6,}/.test(password) ? 'check' : 'close' }}</v-icon>6 characters</span> <br>
                <span :class="{'red--text': password != confirm_password, 'green--text':password == confirm_password}"><v-icon :class="{'red--text': password != confirm_password, 'green--text':password == confirm_password}" class="mr-1">mdi-{{password == confirm_password ? 'check' : 'close' }}</v-icon>Password match</span> <br>
            </v-alert>

            <v-alert
                type="error"
                v-if="errorCode"
            >{{ errorCode }}</v-alert>
            <v-btn color="primary" :disabled="isLoading" :loading="isLoading" @click="signup()" block x-large class="mt-10" append-icon="mdi-vuetify">
                Change password
                <v-icon
                    right
                    dark
                    size="25"
                >
                    mdi-content-save
                </v-icon>
            </v-btn>
            <!-- <p class="my-6 grey--text" v-if="page == 'login'">Don't have an account? <a @click="page = 'signup'" href="#!" style="font-weight: bold;">Sign Up</a></p>
            <p class="my-6 grey--text" v-if="page == 'signup'">Already have an account? <a @click="page = 'login'" href="#!" style="font-weight: bold;">Login</a></p> -->
            <!-- <v-btn color="transparent" elevation="0" :disabled="isLoading" v-if="needToSignup || needToLogin" @click="cancel()" block large class="mt-2">
                Cancel
            </v-btn> -->
            </div>
    </app-bar>
</template>

<style scoped lang="scss">

    img {
        width: 90px;
    }

    h2 {
        font-size: 22px;
        color: #222222;
    }

    .userType {
        .hidden-border {
            border: 3px solid transparent;
            transition: border .2s linear;
        }

        .selected {
            border: 3px solid #45B3E0;
        }
    }
</style>

<script>
import { mapMutations, mapState } from 'vuex';
import { app } from '@/server/firebase';
import { getFirestore, setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, updatePassword } from "firebase/auth";
import moment from 'moment';

const db = getFirestore(app);
const auth = getAuth();

export default {
    

    data() {
        return {
            email: '',
            first_name: '',
            middle_name: '',
            last_name: '',
            suffix: '',
            userType: '',
            date_of_birth: '',
            gender: '',
            address: '',
            phone_number: '',
            password: '',
            confirm_password: '',
            needToSignup: false,
            needToLogin: false,
            isLoading: false,
            errorCode: '',
            page: 'login',
            moment: moment,
        }
    },

    computed: {
        ...mapState('permaData', ['userData', 'homePageSelector']),
        currentHomePage: {
            get: function() {
                return this.homePageSelector;
            },
            set: function(value) {
                return this.setHomePageSelector(value)
            }
        },
    },
    methods: {
        ...mapMutations('permaData', ['setNavbarConfig', 'setHomePageSelector', 'setUserData']),

        
        async signup() {

            this.isLoading = true;
            this.errorCode = '';


            if (! /^(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{6,}$/.test(this.password)) {
                this.errorCode = 'Please check for errors'
                this.isLoading = false;
                return;
            }

            if (this.password != this.confirm_password) {
                this.errorCode = 'Please check for errors'
                this.isLoading = false;
                return;
            }

            // if (!this.date_of_birth) {
            //     this.errorCode = 'Birthdate is required!'
            //     this.isLoading = false;
            //     return;
            // }

            // const age = this.moment().diff(this.moment(this.moment(this.date_of_birth)), 'years');
            // if (age < 16) {
            //     this.errorCode = 'You must be 16 years old to use this app!'
            //     this.isLoading = false;
            //     return;
            // }

            try {
                await updatePassword(auth.currentUser, this.password);
            } catch (error) {
                console.log(error);
                this.errorCode = error.code;
                this.isLoading = false;
                return;
            }

            this.isLoading = false;

            this.$router.push('/settings');


        },
    },
    mounted() {
        this.setNavbarConfig({
            title: `Change Password`,
            goBack: true,
            hideBottomNav: true,
            plain: true,
        });
    },
}
</script>