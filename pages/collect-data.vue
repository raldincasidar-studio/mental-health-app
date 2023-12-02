<template>

<app-bar>
    <div class="container text-center">

        <img src="@/assets/img/app-icon.png" class="mt-10 mb-2" alt="App Icon">
        <h2 class="text-primary mb-5">
            {{ page == 'login' ? 'Login' : 'Sign Up' }}
            to MindfulAid
        </h2>
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

        <v-text-field v-model="email" label="Email" append-icon="mdi-email" filled large class="my-1"></v-text-field>
        <v-text-field v-if="page == 'signup'" v-model="first_name" label="First Name" filled large class="my-1"></v-text-field>
        <v-text-field v-if="page == 'signup'" v-model="middle_name" label="Initial Name (Optional)" filled large class="my-1"></v-text-field>
        <v-text-field v-if="page == 'signup'" v-model="last_name" label="Last Name" filled large class="my-1"></v-text-field>
        <v-select v-if="page == 'signup'" v-model="suffix" label="Suffix (Optional)" :items="['', 'Jr', 'Sr', 'II', 'III', 'IV', 'V']" filled large class="my-1"></v-select>
        <v-text-field v-if="page == 'signup'" v-model="date_of_birth" type="date" label="Date of Birth" filled large class="my-1"></v-text-field>
        <v-select :items="['Male', 'Female', 'Prefer not to say']" v-if="page == 'signup'" v-model="gender" label="Gender" filled large class="my-1"></v-select>
        <!-- <v-text-field v-if="page == 'signup'" v-model="address" label="Address" filled large class="my-1"></v-text-field> -->
        <v-select v-if="page == 'signup'" v-model="province" :items="provinces_list" item-text="name" item-value="name" @change="fetchCities()" label="Province" filled large class="my-1"></v-select>
        <v-select v-if="page == 'signup'" v-model="city" :items="cities_list" :disabled="!cities_list.length" item-text="name" @change="fetchBrgys()" item-value="name" label="City/Municipality" filled large class="my-1"></v-select>
        <v-select v-if="page == 'signup'" v-model="brgy" :items="barangay_list" item-text="name" item-value="name" :disabled="!barangay_list.length" label="Barangay" filled large class="my-1"></v-select>
        <v-text-field v-if="page == 'signup'" v-model="street" :disabled="!brgy" label="Street" filled large class="my-1"></v-text-field>
        <v-text-field v-if="page == 'signup'" v-model="house_no" :disabled="!brgy" label="House Number (Optional)" filled large class="my-1"></v-text-field>
        <v-text-field type="number" v-if="page == 'signup'" v-model="phone_number" label="Phone Number" prefix="+63" filled large class="my-1" maxlength="10"></v-text-field>
        <v-text-field v-model="password" label="Password" append-icon="mdi-lock" type="password" filled large class="my-1"></v-text-field>
        <v-text-field v-if="page == 'signup'" v-model="confirm_password" label="Confirm Password" append-icon="mdi-lock" type="password" filled large class="my-1"></v-text-field>
        <v-file-input v-if="page == 'signup' && userType == 'Doctor'" accept="*" v-model="credentials" ref="credential" class="my-1" filled large counter prepend-icon="mdi-file-sign" show-size truncate-length="25" label="Upload Professional Credentials"></v-file-input>

        <v-alert :type="/^(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{6,}$/.test(password) && password == confirm_password ? 'success' : 'error'" class="text-left" text v-if="page == 'signup'">
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
        <v-btn color="primary" :disabled="isLoading" :loading="isLoading" v-if="page == 'login'" @click="login()" block x-large class="mt-10" append-icon="mdi-vuetify">
            Sign In
            <v-icon
                right
                dark
                size="25"
            >
                mdi-account
            </v-icon>
        </v-btn>
        <v-btn color="primary" :disabled="isLoading" :loading="isLoading" v-if="page == 'signup'" @click="signup()" block x-large class="mt-10" append-icon="mdi-vuetify">
            Create Account
            <v-icon
                right
                dark
                size="25"
            >
                mdi-account-plus
            </v-icon>
        </v-btn>
        <p class="my-6 grey--text" v-if="page == 'login'">Don't have an account? <a @click="page = 'signup'" href="#!" style="font-weight: bold;">Sign Up</a></p>
        <p class="my-6 grey--text" v-if="page == 'signup'">Already have an account? <a @click="page = 'login'" href="#!" style="font-weight: bold;">Login</a></p>
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
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import moment from 'moment';

const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);

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
            province: '',
            city: '',
            brgy: '',
            street: '',
            house_no: '',
            phone_number: '',
            password: '',
            confirm_password: '',
            needToSignup: false,
            needToLogin: false,
            isLoading: false,
            errorCode: '',
            page: 'login',
            moment: moment,

            provinces_list: [],
            cities_list: [],
            barangay_list: [],

            credentials: null,
        }
    },

    mounted() {
        this.setNavbarConfig({
            title: 'Sign In',
            goBack: true,
            plain: false,
            hideBottomNav: true,
        })


        fetch('https://psgc.gitlab.io/api/provinces/').then(data => data.json()).then(data => {
            this.provinces_list = data.sort((a, b) => {
                const nameA = a.name.toLowerCase(); // Convert names to lowercase for case-insensitive sorting
                const nameB = b.name.toLowerCase();
                
                if (nameA < nameB) {
                    return -1; // If nameA should come before nameB, return a negative value
                }
                if (nameA > nameB) {
                    return 1; // If nameA should come after nameB, return a positive value
                }
                return 0; // If the names are equal
            });;
            console.log(data);
        })
    },

    computed: {
        ...mapState('permaData', ['userTypeSelected'])
    },

    methods: {
        ...mapMutations('permaData', ['setNavbarConfig', 'setUserData']),

        async fetchCities() {
            
            const provinceCode = ( this.provinces_list.filter(province => province.name === this.province) )[0] ;
            
            console.log('fetch cities province code: ', provinceCode.code);

            this.cities_list = [];
            fetch(`https://psgc.gitlab.io/api/provinces/${provinceCode.code}/cities-municipalities/`).then(data => data.json()).then(data => {
                this.cities_list = data.sort((a, b) => {
                    const nameA = a.name.toLowerCase(); // Convert names to lowercase for case-insensitive sorting
                    const nameB = b.name.toLowerCase();
                    
                    if (nameA < nameB) {
                        return -1; // If nameA should come before nameB, return a negative value
                    }
                    if (nameA > nameB) {
                        return 1; // If nameA should come after nameB, return a positive value
                    }
                    return 0; // If the names are equal
                });;
                console.log(data);
            })

        },

        async fetchBrgys() {
            
            const provinceCode = ( this.cities_list.filter(province => province.name === this.city) )[0] ;
            
            console.log('fetch barangay city code: ', provinceCode.code);

            this.barangay_list = [];
            fetch(`https://psgc.gitlab.io/api/cities-municipalities/${provinceCode.code}/barangays/`).then(data => data.json()).then(data => {
                this.barangay_list = data.sort((a, b) => {
                    const nameA = a.name.toLowerCase(); // Convert names to lowercase for case-insensitive sorting
                    const nameB = b.name.toLowerCase();
                    
                    if (nameA < nameB) {
                        return -1; // If nameA should come before nameB, return a negative value
                    }
                    if (nameA > nameB) {
                        return 1; // If nameA should come after nameB, return a positive value
                    }
                    return 0; // If the names are equal
                });;
                console.log(data);
            })

        },


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

            if (userData.data().userType === 'Doctor' && !userData.data().verified) {
                this.errorCode = 'Your professional account is not yet verified!';
                this.isLoading = false;
                this.password = '';
                await signOut(auth);
                return;
            }

            // Add the notificationId
            await updateDoc(doc(db, "user", user.uid), {
                notificationId: window.notificationRegistrationId || 'NONE'
            })

            this.setUserData(userData.data());

            this.isLoading = false;

            this.$router.push('/home-screen');

        },

        generateRandomId(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let id = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            id += characters.charAt(randomIndex);
        }

        return id;
        },

        getFileExtension(file) {

            const fileName = file;
            const dotIndex = fileName.lastIndexOf('.');
            if (dotIndex !== -1) {
                return fileName.slice(dotIndex + 1).toLowerCase();
            }
            return ''; // If no extension found or file has no name
        },


        async signup() {


            

            this.isLoading = true;
            this.errorCode = '';

            

            if (
            !this.email || 
            !this.first_name || 
            !this.last_name || 
            !this.gender || 
            !this.province || 
            !this.city || 
            !this.brgy || 
            !this.street || 
            !this.phone_number || 
            !this.userType ||
            !this.password 
            ) {
                this.errorCode = 'Required fields are empty'
                this.isLoading = false;
                return;
            }

            // Restrict some fields to only receive letters

            if (
                
                ! /^[a-zA-Z]+$/.test(this.first_name) ||
                (this.middle_name && ! /^[a-zA-Z]+$/.test(this.middle_name)) ||
                ! /^[a-zA-Z]+$/.test(this.last_name) 
            ) {
                this.errorCode = 'Name should only contain letters'
                this.isLoading = false;
                return;
            }

            if (
                
                ! /^[0-9]+$/.test(this.phone_number)
            ) {
                this.errorCode = 'Phone number should only contain numbers'
                this.isLoading = false;
                return;
            }


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

            if (!this.date_of_birth) {
                this.errorCode = 'Birthdate is required!'
                this.isLoading = false;
                return;
            }

            const age = this.moment().diff(this.moment(this.moment(this.date_of_birth)), 'years');
            if (age < 16) {
                this.errorCode = 'You must be 16 years old to use this app!'
                this.isLoading = false;
                return;
            }



            
            
            // PROCESS CREDENTIAL IF THE USERTYPE IS DOCTOR

            let credentialAttachment = '';

            if (this.userType === "Doctor") {

                if (!this.credentials) {
                    this.errorCode = 'Upload your professional credential!'
                    this.isLoading = false;
                    return;
                }

                const fileRef = ref(storage, `credentials/${this.last_name}-${this.generateRandomId(12)}.${this.getFileExtension(this.credentials.name)}`);

                await uploadBytes(fileRef, this.credentials);

                credentialAttachment = await getDownloadURL(fileRef);
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
                    suffix: this.suffix,
                    date_of_birth: this.date_of_birth,
                    gender: this.gender,
                    province: this.province,
                    city: this.city,
                    brgy: this.brgy,
                    street: this.street,
                    house_no: this.house_no,
                    address: `${this.province} ${this.city} ${this.brgy} ${this.street} ${this.house_no}`,
                    phone_number: this.phone_number,
                    userType: this.userType,
                    credentialAttachment: credentialAttachment || '',
                    verified: this.userType !== 'Doctor', // false if doctor by default
                    
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

            if (this.userType === 'Doctor') {

                this.cancel();
                alert('Your registration data is already submitted. Please wait for your credentials to be approved until you can login. You may receive an email or notification');
                this.errorCode = 'Your registration data is already submitted. Please wait for your credentials to be approved until you can login. You may receive an email or notification';
                this.isLoading = false;
                this.page = 'login';

            }else {
                const userData = await getDoc(doc(db, "user", user.uid));
    
                this.setUserData(userData.data());
    
                this.isLoading = false;
    
                this.$router.push('/home-screen');
            }



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