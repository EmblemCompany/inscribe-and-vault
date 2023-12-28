<template>
  <h1>Inscriptions</h1>
  <div v-if="!Object.keys(inscriptions).length">
    <p>
      No inscriptions yet. Please go to
      <router-link class="link" :to="{ path: '/create-inscription', force: true }">Create inscription</router-link> and
      create your first vaulted inscription.
    </p>
  </div>
  <div v-else class="inscriptions">
    <Inscription
      v-for="inscription in displayedInscriptions"
      :key="`inscription-card-${inscription.storeId}`"
      :inscription="inscription"
    />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'

import Inscription from './Inscription.vue'
import useInscriptions from '../composables/useInscriptions'
import useInscriptionsStatusesUpdater from '../composables/useInscriptionsStatusesUpdater'

const { inscriptions } = useInscriptions()

const displayedInscriptions = computed(() => {
  return Object.values(inscriptions.value).filter(({ vaultImage }) => vaultImage)
})

onMounted(() => {
  useInscriptionsStatusesUpdater(inscriptions)
  const { clearStoreIdsWhitelist } = useInscriptionsStatusesUpdater(inscriptions)
  clearStoreIdsWhitelist()
})
</script>

<style>
.inscriptions {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 1rem;
}

.inscription {
  position: relative;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1));
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.inscription .vault-name {
  font-size: 1.5rem;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 1rem;
  margin-right: 2rem;
  height: 1.7rem;
}

.inscription .image-container {
  width: 100%;
  position: relative;
  margin-bottom: 1rem;
  background-color: rgb(23, 25, 35);
  border-radius: 0.5rem;
}

.inscription .image-container::before {
  content: '';
  display: block;
  padding-top: 100%; /* this sets the height equal to the width */
}

.inscription .image-container .image {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  border: 2px dashed #aaa;
  padding: 0.5rem;
  box-sizing: border-box; /* include border and padding in dimensions */
}

.inscription .image-container img {
  max-width: 100%;
  max-height: 100%;
  border-radius: inherit; /* inherit the radius from the parent element */
}

/* hidden for now as it's not needed and could be seen on Emblem Vault mint page */
.inscription .description {
  display: none;
  font-size: 0.8rem;
  font-weight: 300;
  border: 2px dashed #aaa;
  background-color: #171923;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-top: 1rem;
}

.link {
  text-decoration: underline;
  cursor: pointer;
}

.icons {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 1.3rem;
  height: 1.3rem;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
}

.icon:hover {
  transform: scale(1.1);
}

.input-container .action-button {
  display: flex;
  width: 100%;
  text-align: center;
}

.input-container .icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0rem;
  opacity: 0.6;
}

.icon.delete {
  position: absolute;
  width: 1.2rem;
  height: 1.2rem;
  right: 1.2rem;
  top: 1.2rem;
}

.icon.looks-rare {
  width: 1.8rem;
  transform: scale(1.3);
}

.icon.looks-rare:hover {
  transform: scale(1.4);
}

.input-field {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(to top, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1));
  margin-bottom: 1rem;
  outline: none;
  border-radius: 0.5rem;
  color: #fff;
}

.input-field:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.input-container .name {
  display: flex;
  font-weight: 300;
  margin-bottom: 0.5rem;
}

.input-container .icons {
  margin-left: auto;
}

.btn {
  cursor: pointer;
  background-color: rgb(49, 130, 206);
  width: 100%;
  padding: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  outline: none;
  border-radius: 0.5rem;
  color: #fff;
  margin-bottom: 1rem;
}

.btn:hover {
  background-color: rgb(41, 106, 167);
}

.spinner {
  display: none;
  width: 1rem;
  height: 1rem;
  border: 0.1rem solid rgba(255, 255, 255, 0.1);
  border-top: 0.1rem solid #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-left: 0.5rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.spinner.active {
  display: flex;
}

@media screen and (max-width: 768px) {
  .inscriptions {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
}
</style>
