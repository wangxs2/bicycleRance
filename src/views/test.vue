<template>
  <div class="home">
    <van-uploader :after-read="afterRead" />
    <input
      type="file"
      @change="handleFileChange($event)"
      id="barCode"
      accept="image/*"
      mutiple="mutiple"
      capture="camera"
    />
  </div>
</template>
 
<script>
import Vue from 'vue'
import { Uploader } from 'vant'
import 'vant/lib/uploader/style'
Vue.use(Uploader)
import Quagga from 'quagga'
export default {
  name: 'Barcode',
  components: {},
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
      this.decode(file.file)
    },
    decode(file) {
      Quagga.decodeSingle(
        {
          inputStream: {
            size: 800, // 这里指定图片的大小，需要自己测试一下
            singleChannel: false
          },
          locator: {
            patchSize: 'medium',
            halfSample: false
          },
          numOfWorkers: 1,
          decoder: {
            readers: [
              {
                format: 'code_128_reader', // ean_reader 这里指定ean条形码，就是国际13位的条形码   code39    code_128
                config: {}
              }
            ]
          },
          // readers: ['code_128_reader'],
          locate: true,
          src: URL.createObjectURL(file)
        },
        function(result) {
          // let code = result.codeResult.code
          console.log(result)
        }
      )
    },
    handleFileChange(evt) {
      console.log('evt', evt)
      const file = evt.target.files[0]
      this.decode(file)
    }
  }
}
</script>
