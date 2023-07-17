<template>
    <div class="content">
        <img src="@/assets/img/app-icon.png" alt="App Icon">
        <h1>MindfulAid</h1>
        <p>Your personal sanctuary for mental well-being. Our intuitive app offers a seamless journey towards a healthier, happier you.</p>

        <v-btn color="primary" block x-large append-icon="mdi-vuetify" to="/collect-data">
            GET STARTED
            <v-icon
                right
                dark
                size="25"
            >
                mdi-arrow-right
            </v-icon>
        </v-btn>
    </div>
</template>

<style lang="scss" scoped>
    .content {
        min-height: 100vh;
        background: url('@/assets/img/bg-image.png') no-repeat;
        background-position: 0 -70px;
        background-size: contain;
        padding: 20px;
        padding-top: 290px;
        text-align: center;
        position: relative;

        img {
            width: 100px;
        }

        h1 {
            font-size: 23px;
            margin-bottom: 40px;
        }

        p {
            font-size: 16px;
            color: 404040;
            line-height: 35px;
        }

        .v-btn {
            margin-top: 100px
        }
    }
</style>

<script>

export default {
    layout: 'plain',
}
</script>