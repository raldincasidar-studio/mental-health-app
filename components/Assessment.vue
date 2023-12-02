<template>
    <div v-if="test_results == 'EMPTY'" class="text-center">
        <v-icon class="ma-10" size="60">mdi-file-document-outline</v-icon>
        <h3 style="font-weight: normal" class="mb-10">{{ me ? me : 'You' }} have no Assessments yet</h3>
    </div>
    <div v-else-if="!test_results.length">
        <v-skeleton-loader type="list-item-avatar-three-line"></v-skeleton-loader>
        <v-skeleton-loader type="list-item-avatar-three-line"></v-skeleton-loader>
    </div>
    <div v-else>
        <v-list-item
            v-for="result in test_results"
            :key="result.title"
            link
            :to="`/assessments/${result.id}`"
        >
            <v-list-item-avatar>
                <img v-if="me" :src="result.from ? `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${result.from}&mouth=cute,wideSmile,faceMask,kissHeart,lilSmile,plain,smileLol,smileTeeth&eyes=closed,cute,love,plain,shades,stars,wink,wink2` : `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAtEB5wrzxXEAAAAASUVORK5CYII=`" alt="">
                <img v-else :src="result.from ? `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${result.for}&mouth=cute,wideSmile,faceMask,kissHeart,lilSmile,plain,smileLol,smileTeeth&eyes=closed,cute,love,plain,shades,stars,wink,wink2` : `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89h8AAtEB5wrzxXEAAAAASUVORK5CYII=`" alt="">
            </v-list-item-avatar>
    
            <v-list-item-content>
            <v-list-item-title v-if="me">{{ result.from_userdata.first_name }} {{ result.from_userdata.middle_name }} {{ result.from_userdata.last_name }}</v-list-item-title>
            <v-list-item-title v-else>{{ result.for_userdata.first_name }} {{ result.for_userdata.middle_name }} {{ result.for_userdata.last_name }}</v-list-item-title>
    
            <v-list-item-subtitle>{{ moment(result.date.toDate()).fromNow() }} · {{ result.assessment }}</v-list-item-subtitle>
            </v-list-item-content>
    
            <v-list-item-action>
            <v-btn icon>
                <v-icon color="grey lighten-1">mdi-file-download</v-icon>
            </v-btn>
            </v-list-item-action>
        </v-list-item>
    </div>
    </template>
    
    <script>
    import moment from 'moment';
    
    export default {
        props: {
            test_results: null,
            me: {
                required: false,
                default: false,
            }
        },
        data() {
            return {
                moment: moment,
            }
        }
    }
    </script>