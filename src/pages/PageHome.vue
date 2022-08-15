<template>
  <q-page>
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
      <q-item 
        v-for="tweet in tweets"
        :key="tweet.date"
        class="q-py-md"
      >
        <q-item-section avatar top>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle1">
            <strong> Fabian Silva </strong>
            <span class="text-grey-7"> @fabiansilva </span>
          </q-item-label>
          <q-item-label class="tweet-content text-body1">
            {{ tweet.content }}
          </q-item-label>
          <div class="tweet-icons row justify-between q-mt-sm">
            <q-btn flat round color="grey" icon="far fa-comment" size="sm" />
            <q-btn flat round color="grey" icon="fas fa-retweet" size="sm" />
            <q-btn flat round color="grey" icon="far fa-heart" size="sm" />
            <q-btn flat round color="grey" icon="fas fa-trash" size="sm" />
          </div>
        </q-item-section>

        <q-item-section side top> {{ relativeDate(tweet.date) }} </q-item-section>
      </q-item>

      <q-separator inset="item" />
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { formatDistance } from 'date-fns'

export default defineComponent({
  name: "PageHome",
  data() {
    return {
      newTwitContent: "",
      tweets: [
        {
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio tempore minus ipsum suscipit excepturi. Consectetur veritatis illo quidem reiciendis omnis voluptatibus obcaecati earum necessitatibus quia rem? Minus harum magni cupiditate!",
          date: 1660587090139,
        },
        {
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio tempore minus ipsum suscipit excepturi. Consectetur veritatis illo quidem reiciendis omnis voluptatibus obcaecati earum necessitatibus quia rem? Minus harum magni cupiditate!",
          date: 1660587115454,
        },
      ],
    };
  },
  methods: {
    relativeDate(value) {
      return formatDistance(value, new Date())
    },
    addNewTweet() {
      let newTweet = {
        content: this.newTwitContent,
        date: Date.now()
      }
      this.tweets.unshift(newTweet)
    }
  }
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
