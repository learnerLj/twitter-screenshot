# Twitter Screenshot Button
Version 1.0

A Tampermonkey userscript that adds a screenshot button to Twitter/X post menus, allowing you to easily capture and save tweets as images.

https://github.com/learnerLj/twitter-screenshot
## 推特截图按钮

一个Tampermonkey油猴脚本，为Twitter/X的推文菜单添加截图按钮，让您可以轻松地将推文保存为图片。

## Features 功能

- One-click screenshot of tweets
- High-quality image capture
- Automatic clipboard copy
- Download option
- Clean and native UI integration
- Support for both twitter.com and x.com
- Adapts to both Light and Dark modes automatically
- **New:** Capture entire tweet threads by the original author (including automatically expanding replies)

- 一键截图推文
- 高质量图片捕获
- 自动复制到剪贴板
- 下载选项
- 简洁的原生UI集成
- 同时支持twitter.com和x.com
- 自动适配亮色和暗色模式
- **新功能:** 截取原作者的整个推文串（包括自动展开回复）

## Installation 安装

1. Install Tampermonkey browser extension
2. Click [here](https://greasyfork.org/zh-CN/scripts/532781-twitter-screenshot-button) to install the script (Remember to update this URL after publishing on GreasyFork)
3. Refresh Twitter/X page

1. 安装Tampermonkey浏览器扩展
2. 点击[这里](https://greasyfork.org/zh-CN/scripts/532781-twitter-screenshot-button)安装脚本 (发布到 GreasyFork 后记得更新此 URL)
3. 刷新Twitter/X页面

## Usage 使用方法

1. Click the "..." menu on any tweet. The "Screenshot" button and "Capture Thread" button will appear at the top of the menu.
   点击任意推文的"..."菜单，"Screenshot" 和 "Capture Thread" 按钮会出现在菜单顶部。

   ![Icon Position](./icoin-position.png)

2. **Screenshot Single Tweet:** Click the "Screenshot" button.
   **截取单个推文：** 点击"Screenshot"按钮。

3. The screenshot will be automatically copied to your clipboard, and a confirmation notification will appear.
   截图将自动复制到剪贴板，并显示确认通知。

   ![Screenshot Notification](./screen2.png)

4. Optionally click "Download" on the notification to save the image file.
   可选择点击通知上的"Download"按钮来保存图片文件。

3. **Capture Entire Thread:** Click the "Capture Thread" button. The script will attempt to:
    - Find the original author's handle.
    - Automatically click "Show more replies" to load the thread (up to a limit).
    - Filter and find all posts by the original author in the loaded thread.
    - Automatically click internal "Show more" buttons within long tweets in the thread.
    - Take individual screenshots of each tweet.
    - Stitch the screenshots together into one image.
    - Copy the final image to the clipboard and provide a download option.
    *Note: This process can take some time depending on the thread length.*
   **截取整个推文串：** 点击"Capture Thread"按钮。脚本将尝试：
    - 找到原作者的用户名。
    - 自动点击"显示更多回复"来加载整个推文串（有次数限制）。
    - 在加载的推文串中筛选并找到原作者的所有帖子。
    - 自动点击推文串中长推文内部的"显示更多"按钮。
    - 对每条推文进行单独截图。
    - 将截图拼接成一张长图。
    - 将最终的图片复制到剪贴板并提供下载选项。
    *注意：根据推文串的长度，此过程可能需要一些时间。*

**Note:** For long tweets that have a "Show more" button, please click "Show more" first to expand the full content before taking the **single** screenshot to ensure the entire tweet is captured. The "Capture Thread" function handles internal expansion automatically.
**注意：** 对于包含"显示更多"按钮的长推文，在进行**单条推文截图**时，请先点击"显示更多"展开全部内容，以确保捕获完整的推文。"截取推文串"功能会自动处理内部展开。

   ![Screenshot Example](./screen1.png)

## Requirements 要求

- Tampermonkey browser extension
- Modern browser with clipboard API support

- Tampermonkey浏览器扩展
- 支持剪贴板API的现代浏览器

## Author 作者

Jiahao Luo (luoshitou9@gmail.com)

## License 许可证

MIT License 