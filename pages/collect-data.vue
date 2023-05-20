<template>

<app-bar>
    <div class="container text-center">

        <img src="@/assets/img/app-icon.png" class="mt-10 mb-2" alt="App Icon">
        <h2 class="text-primary mb-5">
            {{ !needToSignup && !needToLogin ? 'Welcome' : '' }}
            {{ needToLogin ? 'Login' : '' }}
            {{ needToSignup ? 'Sign Up' : '' }}
            to MindBloom
        </h2>
        <p class="label mb-10" v-if="needToSignup || needToLogin">
            <v-icon>mdi-email</v-icon> 
            {{ this.email }}
            <v-btn icon large class="mr-n7" @click="cancel()" :disabled="isLoading" v-if="needToSignup || needToLogin"><v-icon color="red">mdi-close</v-icon></v-btn>
        </p>

        <v-text-field v-model="email" v-if="!needToSignup && !needToLogin" label="Email" append-icon="mdi-email" filled large class="my-1"></v-text-field>
        <v-text-field v-if="needToSignup" v-model="first_name" label="First Name" filled large class="my-1"></v-text-field>
        <v-text-field v-if="needToSignup" v-model="middle_name" label="Middle Name" filled large class="my-1"></v-text-field>
        <v-text-field v-if="needToSignup" v-model="last_name" label="Last Name" filled large class="my-1"></v-text-field>
        <v-text-field v-if="needToSignup" v-model="date_of_birth" type="date" label="Date of Birth" filled large class="my-1"></v-text-field>
        <v-select :items="['Male', 'Female']" v-if="needToSignup" v-model="gender" label="Gender" filled large class="my-1"></v-select>
        <v-text-field v-if="needToSignup" v-model="address" label="Address" filled large class="my-1"></v-text-field>
        <v-text-field v-if="needToSignup" v-model="phone_number" label="Phone Number" prefix="+63" filled large class="my-1"></v-text-field>
        <v-text-field v-if="needToSignup || needToLogin" v-model="password" label="Password" append-icon="mdi-lock" type="password" filled large class="my-1"></v-text-field>

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
</style>

<script>
import { mapMutations, mapState } from 'vuex';
import { app } from '@/server/firebase';
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";
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
            date_of_birth: '',
            gender: '',
            address: '',
            phone_number: '',
            password: '',
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

            // SUCCESSFUL SIGNUP, GET USER DATA
            const userData = await getDoc(doc(db, "user", user.uid));

            this.setUserData(userData.data());

            this.isLoading = false;

            this.$router.push('/home-screen');

        },
        async signup() {

            this.isLoading = true;
            this.errorCode = '';

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
                    userType: this.userTypeSelected,
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