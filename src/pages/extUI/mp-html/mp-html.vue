<template>
  <view style="padding: 20px">
    <mp-html :content="html2" />
  </view>
</template>
<script>
import mpHtml from 'mp-html/dist/uni-app/components/mp-html/mp-html'
export default {
  // 不可省略
  components: {
    mpHtml,
  },
  data() {
    return {
      html2: `
          <h1>mp-html 小程序富文本组件</h1>
          <p><img src="/static/componentIndex.png" /></p>
          <p><img src="https://img.yzcdn.cn/vant/cat.jpeg" /></p>
          <h1>h1标题</h1>
          <h2>h2标题</h2>
          <h3>h3标题</h3>
          <h4>h4标题</h4>
          <h5>h5标题</h5>
          <h6>h6标题</h6>
          <hr />
          <i>斜体</i>
          <br />
          <img alt="alt" src="http://www.3xiayou.com/upload/upload/1528174589.jpg" width="100px" height="100px" />
          <br />
          <p>这是一个段落p标签</p>
          <br />
          <q>引号标签</q>
          <br />
          <span>span标签</span>
          <br />
          <strong>strong标签</strong>
          <br />
          <sub>sub标签</sub>
          <br />
          <sup>sup标签</sup>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti expedita voluptatibus doloremque quia ex natus doloribus dignissimos exercitationem minus, esse consequatur sint recusandae corporis nemo reiciendis? Fugit maxime error porro.
  Eum saepe pariatur possimus incidunt ea corrupti ipsam asperiores consequatur sit exercitationem impedit sequi doloremque repellendus recusandae, necessitatibus labore modi deleniti, voluptates quam debitis autem inventore dignissimos error. Aperiam, molestias.
  Aliquam voluptates reiciendis maxime voluptas quam ea dignissimos adipisci eum dolor repellendus id perspiciatis nulla quae odit, corporis aspernatur alias architecto molestias nostrum nesciunt? Molestiae ullam quisquam excepturi omnis voluptate?
  Qui sunt cupiditate quos soluta dolor. Eum reprehenderit sit fugit? Sapiente, saepe fugit tempore, error sit aliquid perferendis excepturi libero asperiores esse explicabo ratione quos deleniti odit magni ducimus unde.
  Numquam distinctio quaerat nisi sed ipsa pariatur nulla adipisci fuga perspiciatis id repellendus beatae explicabo, temporibus vero! Debitis, veritatis dolores architecto deserunt facilis, ipsa magni, reprehenderit sit sequi ipsam repudiandae.
  Reiciendis, assumenda numquam, autem ullam aperiam officiis ipsa laudantium sapiente dolorem eaque eum voluptates! Molestias quisquam, id assumenda illo, ipsam ea, delectus recusandae repudiandae voluptate facere aperiam maiores! Itaque, repellat!
  Porro, neque, quae perspiciatis eos architecto ipsam aliquam beatae sint iusto dolores voluptatem quidem delectus exercitationem nisi nemo a, numquam saepe nulla magni in nostrum temporibus ea accusamus inventore. Delectus?
  Eveniet numquam deleniti ipsam, inventore voluptatibus quidem similique commodi maiores quos quasi asperiores expedita saepe natus, quia sint eum aperiam tempora deserunt ad earum reprehenderit perferendis unde? Debitis, blanditiis labore?
  Minima nam quam pariatur, ab voluptas sint cumque esse autem nulla dolorum amet nihil corporis facere ullam hic? Consequuntur libero soluta repellendus consectetur quasi saepe sequi expedita, facere pariatur? Ipsam.
  Eum, reiciendis vitae sint dignissimos suscipit quisquam. Eius saepe perferendis voluptatibus aspernatur ad error quasi voluptas modi atque eveniet obcaecati, facere quibusdam? Optio, praesentium? Nisi ipsa voluptas praesentium error dolor!
          </p>
          <br />
        `,
    }
  },
}
</script>
