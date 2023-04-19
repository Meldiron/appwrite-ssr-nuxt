<script setup>

import { useAppwriteService } from '~/src/AppwriteService';

const AppwriteService = useAppwriteService(useRuntimeConfig());

const props = defineProps({
    isCsr: {
        default: true
    },
    account: {
        default: null
    }
});

const isCsr = ref(props.isCsr);
const account = ref(props.account);

async function fetchAccount() {
    account.value = true;

    try {
        account.value = await AppwriteService.getAccount();
    } catch (err) {
        account.value = null;
    }
}
</script>

<template>
    <div
        :class="{ card: true, 'card-is-pending': account === undefined || account === true, 'card-is-failed': account === null, 'card-is-complete': account !== undefined && account !== null && account !== true }">
        <div class="u-flex u-main-space-between u-cross-center">
            <div class="">
                <div class="eyebrow-heading-3">{{ isCsr ? 'Client' : 'Server' }} Side</div>
            </div>

            <div :style="{ opacity: isCsr ? '100%' : '0%' }">
                <div class="status">
                    <button @click="fetchAccount" class="tag">
                        <span class="text">Fetch</span>
                    </button>
                </div>
            </div>
        </div>

        <h2 class="heading-level-6 u-margin-block-start-2">
            <template v-if="account === undefined">
                Not Fetched Yet.
            </template>
            <template v-else-if="account === null">
                You are not signed in.
            </template>
            <template v-else-if="account === true">
                Fetching Account...
            </template>
            <template v-else>
                Welcome <code class="u-un-break-text inline-code">{{account.$id}}</code>
            </template>
        </h2>

        <div class="u-flex u-main-space-between u-cross-end u-margin-block-start-40">
            <template v-if="account === undefined || account === true || account === null">
                <div style="--p-avatar-border-color: var(--color-neutral-120)" class="avatar is-color-empty"></div>

            </template>
            <template v-else>
                <div class="avatar">
                    <img :src="AppwriteService.getAccountPicture(account.$id)" alt="Avatar" />
                </div>
            </template>

            <div
                :class="{ status: true, 'is-pending': account === undefined || account === true, 'is-failed': account === null, 'is-complete': account !== undefined && account !== null && account !== true }">
                <span class="status-icon"></span>
            </div>
        </div>
    </div>
</template>