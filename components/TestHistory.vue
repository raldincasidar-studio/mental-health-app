<template>
<div v-if="test_results == 'EMPTY'" class="text-center">
    <v-icon class="ma-10" size="60">mdi-file-document-outline</v-icon>
    <h3 style="font-weight: normal" class="mb-10">{{ me ? me : 'You' }} have no Tests yet</h3>
    <v-btn color="primary" text large v-if="!me">
        <v-icon left>mdi-plus</v-icon>
        Take Test
    </v-btn>
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
        :to="`/results/${result.id}`"
    >
        <v-list-item-avatar>
        <v-icon
            class="primary"
            dark
        >mdi-file-document-outline</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
        <v-list-item-title>{{ result.test_name }} Test</v-list-item-title>

        <v-list-item-subtitle>{{ result.result_percentage }}% Possibility · {{ moment(result.date_added.toDate()).fromNow() }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
        <v-btn icon>
            <v-icon color="grey lighten-1">mdi-link-variant</v-icon>
        </v-btn>
        </v-list-item-action>
    </v-list-item>
</div>
</template>

<script>
import moment from 'moment';

export default {
    props: {
        test_results: Array,
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