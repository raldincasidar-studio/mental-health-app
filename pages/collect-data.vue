<template>

<app-bar>
    <div class="container text-center">

        <img src="@/assets/img/app-icon.png" class="mt-10 mb-2" alt="App Icon">
        <h2 class="text-primary mb-5">
            {{ !needToSignup && !needToLogin ? 'Welcome' : '' }}
            {{ needToLogin ? 'Login' : '' }}
            {{ needToSignup ? 'Sign Up' : '' }}
            to MindfulAid
        </h2>
        <p class="label mb-10" v-if="needToSignup || needToLogin">
            <v-icon>mdi-email</v-icon> 
            {{ this.email }}
            <v-btn icon large class="mr-n7" @click="cancel()" :disabled="isLoading" v-if="needToSignup || needToLogin"><v-icon color="red">mdi-close</v-icon></v-btn>
        </p>

        <div class="d-flex gap-2 userType my-10" v-if="needToSignup">
            <v-card style="flex: 1" class="text-center pa-3 py-10 mr-4 border-3-transparent rounded-lg hidden-border" :class="{'selected': userType == 'Patient'}" @click="userType = 'Patient'">
                <v-icon :color="userType == 'Patient' ? 'primary' : 'grey lighten-1'" size="60">mdi-account</v-icon>
                <h4>I'm a Patient</h4>
            </v-card>
            <v-card style="flex: 1" class="text-center pa-3 py-10 border-3-transparent rounded-lg hidden-border" :class="{'selected': userType == 'Doctor'}" @click="userType = 'Doctor'">
                <v-icon :color="userType == 'Guardian' ? 'primary' : 'grey lighten-1'" size="60">mdi-doctor</v-icon>
                <h4>I'm a professional</h4>
            </v-card>
        </div>

        <v-text-field v-model="email" v-if="!needToSignup && !needToLogin" label="Email" append-icon="mdi-email" filled large class="my-1"></v-text-field>
        <v-text-field v-if="needToSignup" v-model="first_name" label="First Name" filled large class="my-1"></v-text-field>
        <v-text-field v-if="needToSignup" v-model="middle_name" label="Initial Name" filled large class="my-1"></v-text-field>
        <v-text-field v-if="needToSignup" v-model="last_name" label="Last Name" filled large class="my-1"></v-text-field>
        <v-text-field v-if="needToSignup" v-model="date_of_birth" type="date" label="Date of Birth" filled large class="my-1"></v-text-field>
        <v-select :items="['Male', 'Female', 'Prefer not to say']" v-if="needToSignup" v-model="gender" label="Gender" filled large class="my-1"></v-select>
        <v-text-field v-if="needToSignup" v-model="address" label="Address" filled large class="my-1"></v-text-field>
        <v-text-field v-if="needToSignup" v-model="phone_number" label="Phone Number" prefix="+63" filled large class="my-1" maxlength="10"></v-text-field>
        <v-text-field v-if="needToSignup || needToLogin" v-model="password" label="Password" append-icon="mdi-lock" type="password" filled large class="my-1"></v-text-field>
        <v-text-field v-if="needToSignup" v-model="confirm_password" label="Confirm Password" append-icon="mdi-lock" type="password" filled large class="my-1"></v-text-field>

        <v-alert :type="/^(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{6,}$/.test(password) && password == confirm_password ? 'success' : 'error'" class="text-left" text v-if="needToSignup">
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

        <v-btn color="primary" :disabled="isLoading" :loading="isLoading" v-if="!needToSignup && !needToLogin" @click="checkEmail()" block x-large class="mt-10" append-icon="mdi-vuetify">
            Continue
            <v-icon
            
                right
                dark
                size="25"
            >
                mdi-arrow-right
            </v-icon>
        </v-btn>
        <v-btn color="primary" :disabled="isLoading" :loading="isLoading" v-if="needToLogin" @click="login()" block x-large class="mt-10" append-icon="mdi-vuetify">
            Sign In
            <v-icon
                right
                dark
                size="25"
            >
                mdi-account
            </v-icon>
        </v-btn>
        <v-btn color="primary" :disabled="isLoading" :loading="isLoading" v-if="needToSignup" @click="signup()" block x-large class="mt-10" append-icon="mdi-vuetify">
            Create Account
            <v-icon
                right
                dark
                size="25"
            >
                mdi-account-plus
            </v-icon>
        </v-btn>
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
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const db = getFirestore(app);
const auth = getAuth();

export default {

    data() {
        return {
            email: '',
            first_name: '',
            middle_name: '',
            last_name: '',
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
        }
    },

    mounted() {
        this.setNavbarConfig({
            title: 'Sign In',
            goBack: true,
            plain: false,
            hideBottomNav: true,
        })
    },

    computed: {
        ...mapState('permaData', ['userTypeSelected'])
    },

    methods: {
        ...mapMutations('permaData', ['setNavbarConfig', 'setUserData']),
        async login() {

            this.isLoading = true;
            this.errorCode = '';

            let request;

            try {
                request = await signInWithEmailAndPassword(auth, this.email, this.password)
            } catch (error) {
                console.log(error);
                this.errorCode = error.code;
                this.isLoading = false;
                return;
            }

            const user = request.user;

            // Add the notificationId
            await updateDoc(doc(db, "user", user.uid), {
                notificationId: window.notificationRegistrationId || 'NONE'
            })

            // SUCCESSFUL SIGNUP, GET USER DATA
            const userData = await getDoc(doc(db, "user", user.uid));

            this.setUserData(userData.data());

            this.isLoading = false;

            this.$router.push('/home-screen');

        },
        async signup() {

            this.isLoading = true;
            this.errorCode = '';


            if (! /^(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{6,}$/.test(this.password)) {
                this.errorCode = 'Please check for errors'
                this.isLoading = true;
                return;
            }

            if (this.password != this.confirm_password) {
                this.errorCode = 'Please check for errors'
                this.isLoading = true;
                return;
            }


            let signup;

            try {
                signup = await createUserWithEmailAndPassword(auth, this.email, this.password);
            } catch (error) {
                console.log(error);
                this.errorCode = error.code;
                this.isLoading = false;
                return;
            }

            console.log(signup);

            const user = signup.user;

            try {
                await setDoc(doc(db, "user", user.uid), {
                    uid: user.uid,
                    email: this.email,
                    first_name: this.first_name,
                    middle_name: this.middle_name,
                    last_name: this.last_name,
                    date_of_birth: this.date_of_birth,
                    gender: this.gender,
                    address: this.address,
                    phone_number: this.phone_number,
                    userType: this.userType,
                    
                    // Add the notificationId
                    notificationId: window.notificationRegistrationId || 'NONE'
                });
            } catch (error) {
                console.log(error);
                this.errorCode = error.code;
                this.isLoading = false;
                return;
            }

            // SUCCESSFUL SIGNUP, GET USER DATA
            const userData = await getDoc(doc(db, "user", user.uid));

            this.setUserData(userData.data());

            this.isLoading = false;

            this.$router.push('/home-screen');


        },
        cancel() {
            this.email = '';
            this.name = '';
            this.date_of_birth = '';
            this.gender = '';
            this.address = '';
            this.phone_number = '';
            this.password = '';
            this.needToSignup = false;
            this.needToLogin = false;
            this.errorCode = '';
        },
        async checkEmail() {
            
            this.isLoading = true;
            this.errorCode = '';


            if (! /^[\w\.-]+@gmail\.com$/.test(this.email)) {
                this.errorCode = 'Only Gmail (@gmail.com) is allowed';
                this.isLoading = false;
                return;
            }

            let signIn;

            try {
                
                signIn = await signInWithEmailAndPassword(auth, this.email, ' ');
            } catch (error) {
                console.log(error.code);

                if (error.code === "auth/user-not-found") {
                    this.needToSignup = true;
                }
                else if (error.code === "auth/wrong-password"){
                    this.needToLogin = true;
                } else {
                    this.errorCode = error.code;
                }
            }

            this.isLoading = false;

        },
    }
}
</script>