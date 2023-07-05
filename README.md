# ZhengFangJiaoWuSystemTampermonkeyScript

## 关于这个项目

南京邮电大学正方教务系统油猴脚本，主要用于查询平时分和卷面分（看看老师捞没捞😭

⚠️ 目前处于测试阶段，测试样例非常少，所有肯定有很多 Bug，非常欢迎提交 Issues，记得带上你的数据

:star: 如果这个项目对你有帮助，记得给个 Star

## 如何安装

🥰 点这里安装或手动更新脚本 => [Origin](https://raw.githubusercontent.com/love98ooo/ZhengFangJiaoWuSystemTampermonkeyScript/master/tampermonkey_script.user.js) · [Gcore Mirror](https://gcore.jsdelivr.net/gh/love98ooo/ZhengFangJiaoWuSystemTampermonkeyScript@master/tampermonkey_script.user.js) · [CF Mirror](https://testingcf.jsdelivr.net/gh/love98ooo/ZhengFangJiaoWuSystemTampermonkeyScript@master/tampermonkey_script.user.js) · [GH-proxy Mirror](https://gh.api.99988866.xyz/https://raw.githubusercontent.com/love98ooo/ZhengFangJiaoWuSystemTampermonkeyScript/master/tampermonkey_script.user.js)

注意：

1. Mirror安装的版本可能会比Origin安装的版本慢一天
2. 如果你不会使用魔法，请使用 `GH-proxy Mirror` 安装
3. 建议打开 `检查自动更新`![image-20230705150823093](C:\Users\Love98\AppData\Roaming\Typora\typora-user-images\image-20230705150823093.png)

🐵 如果你还没有安装过油猴插件，可以在下面的安装链接中找到你需要的，安装浏览器扩展后再安装本脚本

## 如何使用

来到正方教务系统的成绩查询页面，这里多了一个按钮`查询考试详细分数`，先不用管它，正常选择`学年`和`学期`，点击`按学期查询`或`按学年查询`，

![2023-07-02_084320](https://testingcf.jsdelivr.net/gh/love98ooo/pictures_for_blog@master//imgs/202307031408291.png)

你会和往常一样看到成绩表，

![2023-07-02_084657](https://testingcf.jsdelivr.net/gh/love98ooo/pictures_for_blog@master//imgs/202307031408292.png)

再点击按钮`查询考试详细分数`，屏幕中间会出现这样的窗口，包括`平时分`、`卷面分`、`期末 : 平时`这些原本成绩表上面没有的数据。

![2023-07-02_085616](https://testingcf.jsdelivr.net/gh/love98ooo/pictures_for_blog@master//imgs/202307031408293.png)

如果发现有 Bug 或者可以改进的地方，点击下方的`反馈 Bug`按钮，你的将跳转到项目 GitHub 仓库的 Issues 页面，在这里你可以提交 Issues。

更详细的使用方法请参考这篇文章：[正方教务系统油猴插件的使用和开发](https://blog.love98.net/archives/zfjw-system-you-hou-cha-jian-de-shi-yong-he-kai-fa)

## 关于油猴插件

目前主流的油猴插件是Tampermonkey(又称“油猴”或“篡改猴”)，当然也有其他开发者制作的插件，这里不过多赘述，可以通过下面的链接进入对应的插件商店下载安装。

| 名称                     | 安装地址                                                     |
| ------------------------ | ------------------------------------------------------------ |
| Chrome 插件商店：篡改猴  | [https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) |
| Edge 插件商店：篡改猴    | [https://microsoftedge.microsoft.com/addons/detail/篡改猴/iikmkjmpaadaobahmlepeloendndfphd](https://microsoftedge.microsoft.com/addons/detail/篡改猴/iikmkjmpaadaobahmlepeloendndfphd) |
| Firefox 插件商店：篡改猴 | [Tampermonkey – Get this Extension for 🦊 Firefox (en-US) (mozilla.org)](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/) |
| Chrome 插件商店：插件猫  | [https://chrome.google.com/webstore/detail/scriptcat/ndcooeababalnlpkfedmmbbbgkljhpjf](https://chrome.google.com/webstore/detail/scriptcat/ndcooeababalnlpkfedmmbbbgkljhpjf) |
| Edge 插件商店：插件猫    | [https://microsoftedge.microsoft.com/addons/detail/scriptcat/liilgpjgabokdklappibcjfablkpcekh](https://microsoftedge.microsoft.com/addons/detail/scriptcat/liilgpjgabokdklappibcjfablkpcekh) |
| Firefox 插件商店：插件猫 | [https://addons.mozilla.org/zh-CN/firefox/addon/scriptcat/](https://addons.mozilla.org/zh-CN/firefox/addon/scriptcat/) |

注意：如果你不会使用魔法，你是无法使用 Chrome 的插件的，请更换为 Edge 或其他浏览器。
