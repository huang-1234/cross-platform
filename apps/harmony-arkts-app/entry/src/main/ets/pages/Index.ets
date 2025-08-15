/**
 * 鸿蒙ArkTS首页
 */
@Entry
@Component
struct Index {
  @State message: string = '鸿蒙ArkTS应用'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)

        Button() {
          Text('点击我')
            .fontSize(20)
            .fontWeight(FontWeight.Normal)
        }
        .type(ButtonType.Capsule)
        .margin({
          top: 20
        })
        .backgroundColor('#007DFF')
        .width('40%')
        .height(40)
        .onClick(() => {
          this.message = '你好，鸿蒙开发者！'
        })
      }
      .width('100%')
    }
    .height('100%')
  }
}
