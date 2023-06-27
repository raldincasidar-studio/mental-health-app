<template>
  <div class="main-page d-flex justify-center align-center">
    <div class="content">
      <img src="@/assets/img/app-icon.png" alt="App Icon">
      <h1 class="text-blue">MindfulAid</h1>

      <div class="progress-bar" v-if="beginLoad">
        <v-progress-circular
          color="primary"
          indeterminate
          :size="40"
          :width="4"
        ></v-progress-circular>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-page {
  min-height: 100vh;
  background-color: white;
  text-align: center;

  img {
    width: 90px;
  }

  h1 {
    font-size: 20px;
    margin: 10px 0;
    margin-bottom: 50px;
  }
}
</style>

<script>
import { app } from '@/server/firebase';
import { doc, getDoc, getFirestore, updateDoc } from '@firebase/firestore';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { mapMutations, mapState } from 'vuex';

const db = getFirestore(app);
const auth = getAuth();

export default {
  name: 'IndexPage',
  layout: 'plain',
  data() {
    return {
      beginLoad: false,
    }
  },
  methods: {
    ...mapMutations('permaData', ['setUserData']),
  },
  computed: {
    ...mapState('permaData', ['userData'])
  },
  mounted() {
    setTimeout( () => {
      this.beginLoad = true;
      
      
      const checkUserLoggedin = onAuthStateChanged(auth, async (user) => {
        checkUserLoggedin();
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;

          // SUCCESSFUL SIGNUP, GET USER DATA
          await updateDoc(doc(db, "user", user.uid), {
            notificationId: window.notificationRegistrationId || 'NONE'
          })

          const userData = await getDoc(doc(db, "user", user.uid));

          this.setUserData(userData.data());

          this.$router.replace('/home-screen');
          // ...
        } else {
          // User is signed out
          // ...
          if (this.userData.notificationId) {
            await updateDoc(doc(db, "user", this.userData.uid), {
              notificationId: 'NONE'
            })  
          }
          this.setUserData({});
          this.$router.replace('/main-screen');
        }

      });



      // setTimeout( () => {
      //   this.$router.replace('/main-screen');
        
      // }, 4000 );
    }, 4000 );
  }
}
</script>
