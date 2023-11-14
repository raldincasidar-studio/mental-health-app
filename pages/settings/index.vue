<template>
    <app-bar>
        <v-list
            two-line
            subheader
            >
            <v-subheader>General</v-subheader>
    
            <v-list-item to="/settings/edit-information">
                <v-list-item-icon>
                    <v-icon color="grey">
                        mdi-account-edit
                    </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title>Edit Information</v-list-item-title>
                <v-list-item-subtitle>Change your personal information</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-list-item to="/settings/change-password">
                <v-list-item-icon>
                    <v-icon color="grey">
                        mdi-form-textbox-password
                    </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title>Change password</v-list-item-title>
                <v-list-item-subtitle>Change your secret password</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-list-item @click="deleteAccount()">
                <v-list-item-icon>
                    <v-icon color="red">
                        mdi-account-remove
                    </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title>Delete Account</v-list-item-title>
                <v-list-item-subtitle>Delete your account</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-list
            two-line
            subheader
            >
            <v-subheader>Get Help</v-subheader>
    
            <v-list-item href="https://fb.me/markchristian.flestado" target="_blank">
                <v-list-item-icon>
                    <v-icon color="grey">
                        mdi-help-circle
                    </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                <v-list-item-title>Contact Developers</v-list-item-title>
                <v-list-item-subtitle>Go to the official facebook profile of the developer</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </app-bar>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { app } from '@/server/firebase';
import { getFirestore, setDoc, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, updatePassword, deleteUser } from "firebase/auth";
import moment from 'moment';

const db = getFirestore(app);
const auth = getAuth();

export default {
    
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

        async deleteAccount() {

            const type = prompt(`
              ⚠ ⚠ ⚠ ⚠ ⚠
Are you sure you want to delete your account?
Your account will be deleted permanently and
      can not be recovered anymore.


   If you wanted to delete your account, 
      type the text below with out the 
               quotation mark:

      "i am sure to delete my account"`);


            if (type === null) return;

            if (type !== "i am sure to delete my account") return;


            try {
                await deleteDoc(doc(db, "user", this.userData.uid));
            } catch (error) {
                console.error(error);
                alert('Error has occured: (1) Account not deleted');
                return;
            }

            
            try {
                await deleteUser(auth.currentUser)
            } catch (error) {
                console.error(error);
                alert('Error has occured: (2) Account not deleted');
                return;
            }

            this.logoutFirebase();

        },

        async logoutFirebase() {


            this.setUserData({});

            this.$router.replace('/main-screen');

            await signOut(auth);
        }
    },
    mounted() {
        this.setNavbarConfig({
            title: `Settings`,
            goBack: true,
            hideBottomNav: true,
            plain: true,
        });
    },
}
</script>