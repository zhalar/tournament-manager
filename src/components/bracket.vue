<template>
	<div>
    <div v-for="(value, index) in match" :key="index" style="border: 1px solid #000; border-radius: 10px">
      <div>
        {{value.name}}
      </div>
    </div>
    
	</div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import Card from 'primevue/card';
import Button from 'primevue/button';

export default {
  name: "Bracket",
  components:{
    Card,
    Button
  },
  props:{
    match: {
      type: Object,
      default: () => {}
    }
  },
  setup() {
    const data = reactive({

    });

    return {
      data
    }
  }
}
</script>

<style>

</style>