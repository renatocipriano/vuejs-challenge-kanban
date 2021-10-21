<template>
    <div class="card mb-3 bg-light">
        <div class="card-body p-3">
            <div class="float-right mr-n2">
                <label class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" :checked="card.checked">
                    <span class="custom-control-label"></span>
                </label>
            </div>
            <p>ID: {{card.id}}</p>
            <p v-text="card.description"></p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['card']
}
</script>

<style>

</style>