<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute fullscreen">
      <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
        <div class="col">
          <q-input
            v-model="newTwitContent"
            class="new-tweet"
            bottom-slots
            counter
            autogrow
            placeholder="What's Happening?"
            maxlength="280"
          >
            <template v-slot:before>
              <q-avatar size="xl">
                <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
              </q-avatar>
            </template>
          </q-input>
        </div>

        <div class="col col-shrink">
          <q-btn
            @click="addNewTweet"
            :disable="!newTwitContent"
            class="q-mb-lg"
            unelevated
            rounded
            no-caps
            color="primary"
            label="Tweet Vue"
          />
        </div>
      </div>

      <q-separator size="10px" color="grey-2" class="divider" />

      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut"
        >
          <q-item v-for="tweet in tweets" :key="tweet.id" class="q-py-md">
            <q-item-section avatar top>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong> Fabian Silva </strong>
                <span class="text-grey-7">
                  @fabiansilva
                  <br class="lt-md" />
                  &bull; {{ relativeDate(tweet.date) }}
                </span>
              </q-item-label>
              <q-item-label class="tweet-content text-body1">
                {{ tweet.content }}
              </q-item-label>
              <div class="tweet-icons row justify-between q-mt-sm">
                <q-btn
                  flat
                  round
                  color="grey"
                  icon="far fa-comment"
                  size="sm"
                />
                <q-btn
                  flat
                  round
                  color="grey"
                  icon="fas fa-retweet"
                  size="sm"
                />
                <q-btn
                @click="toggleLiked(tweet)"
                  :color="tweet.liked ? 'pink' : 'grey'"
                  :icon="tweet.liked ? 'fas fa-heart' : 'far fa-heart'"
                  size="sm"
                  flat
                  round
                />
                <q-btn
                  @click="deleteTweet(tweet)"
                  flat
                  round
                  color="grey"
                  icon="fas fa-trash"
                  size="sm"
                />
              </div>
            </q-item-section>
          </q-item>
        </transition-group>

        <q-separator inset="item" />
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import db from "../boot/firebase.js";
import {
  doc,
  collection,
  query,
  onSnapshot,
  orderBy,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { defineComponent } from "vue";
import { formatDistance } from "date-fns";

export default defineComponent({
  name: "PageHome",
  data() {
    return {
      newTwitContent: "",
      tweets: [
        // {
        //   id: 'ID1',
        //   content: 'this is one tweet',
        //   date: 1660854409397,
        //   liked: false
        // },
        // {
        //   id: 'ID2',
        //   content: 'this is two tweet',
        //   date: 1660854409400,
        //   liked: true
        // },
      ],
    };
  },
  methods: {
    relativeDate(value) {
      return formatDistance(value, new Date());
    },
    async addNewTweet() {
      let newTweet = {
        content: this.newTwitContent,
        date: Date.now(),
        liked: false,
      };
      const docRef = await addDoc(collection(db, "tweets"), newTweet);
      this.newTwitContent = "";
    },
    async deleteTweet(tweet) {
      await deleteDoc(doc(db, "tweets", tweet.id));
    },
    toggleLiked(tweet) {
      updateDoc(doc(db, "tweets", tweet.id),{
        liked: !tweet.liked
      });
    },
  },
  mounted() {
    const q = query(collection(db, "tweets"), orderBy("date"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let tweetChanged = change.doc.data();
        tweetChanged.id = change.doc.id

        if (change.type === "added") {
          this.tweets.unshift(tweetChanged);
        }
        if (change.type === "modified") {
          let index = this.tweets.findIndex(tweet => tweet.id === tweetChanged.id)
          Object.assign(this.tweets[index], tweetChanged)
        }
        if (change.type === "removed") {
          let index = this.tweets.findIndex(tweet => tweet.id === tweetChanged.id)
          this.tweets.splice(index, 1)
        }
      });
    });
  },
});
</script>

<style lang="sass">
.new-tweet
  textarea
    font-size: 19px
    line-height: 1.4 !important

.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4

.tweet-content
  white-space: pre-line

.tweet-icons
  margin-left: -5px
</style>
