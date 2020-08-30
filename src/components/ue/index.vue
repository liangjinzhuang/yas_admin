<template>
  <div>
    <script id="editor"
            type="text/plain"></script>
  </div>
</template>

<script>
export default {
  name: 'ue',
  data () {
    return {
      editor: null
    }
  },
  props: {
    value: '',
    config: {}
  },
  mounted () {
    const _this = this
    this.editor = window.UE.getEditor('editor', this.config)
    /* this.editor.addListener('ready', function () {
      _this.editor.setContent(_this.value)
    }) */
    this.editor.ready(function () {
      //this是当前创建的编辑器实例
      _this.editor.setContent('')
    })
  },
  methods: {
    getUEContent () {
      return this.editor.getContent()
    },
    clearUEContent () {
      console.log('清空')
      this.editor.setContent('')
    }
  },
  destroyed () {
    this.editor.destroy()
  }
}
</script>

<style lang='scss'>
</style>
