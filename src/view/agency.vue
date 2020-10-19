<template>
    <div>
        {{num}}
    </div>
</template>
<script>
	export default {
		data(){
			return{
				num:null
			}
		},
		mounted(){
			this.num=Math.floor(Math.random()*10);
		},
	}
</script>