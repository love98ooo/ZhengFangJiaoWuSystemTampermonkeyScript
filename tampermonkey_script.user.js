// ==UserScript==
// @name         ZhengFangJiaoWu
// @namespace    https://github.com/love98ooo/
// @version      0.3.5
// @description  正方教务系统猴油脚本，主要用于查询平时分
// @author       Love98
// @match        http://jwxt.njupt.edu.cn/xs_main.aspx?*
// @match        *://vpn.njupt.edu.cn:8443/http/webvpn5e607416b84322620fcfebad55f2c381efb3e3d8de97685feb46fd2e866a8ae9/xs_main.aspx?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=njupt.edu.cn
// @grant        none
// ==/UserScript==

(function () {
  const mainFrame = document.getElementById("iframeautoheight");
  let location = mainFrame.contentWindow.location.toString();
  const url = window.location.href;
  const splitUrl = url.split("/")[2];
  let baseUrl = "";
  // console.log(url);
  switch (splitUrl) {
    case "vpn.njupt.edu.cn:8443":
      baseUrl =
        "https://vpn.njupt.edu.cn:8443/http/webvpn5e607416b84322620fcfebad55f2c381efb3e3d8de97685feb46fd2e866a8ae9/";
      break;
    case "jwxt.njupt.edu.cn":
      baseUrl = "http://jwxt.njupt.edu.cn/";
      break;
    default:
      break;
  }
  mainFrame.onload = () => {
    const floatingButton2 = document.createElement("div");
    const floatingButton = document.createElement("button");
    floatingButton.textContent = "查询考试详细分数";
    floatingButton.className = "button";

    // 创建 style 节点用于存储样式表
    const extralstyle = document.createElement("style");
    extralstyle.className = "extralstyle";
    extralstyle.appendChild(document.createTextNode(getStyle()));
    if (!document.querySelector("style.extralstyle"))
      document.head.appendChild(extralstyle);

    // 整体容器
    const containerElement = document.createElement("div");
    containerElement.className = "extralbox";

    // 展示个人信息的部分
    const userElement = document.createElement("div");
    userElement.className = "extralbox-header";
    userElement.style.background =
      "url(" +
      baseUrl +
      "style/standard/images/toolbox_right.gif) no-repeat right top";

    // 展示成绩的部分
    const courseElement = document.createElement("header");
    courseElement.className = "extralbox-main";
    containerElement.appendChild(userElement);
    containerElement.appendChild(courseElement);

    // Create the close button
    const closeBtn = document.createElement("span");
    closeBtn.className = "button--close";
    closeBtn.textContent = "×";
    // Add the close button to the container element
    userElement.appendChild(closeBtn);
    const remarkElement = document.createElement("div");

    remarkElement.style.textAlign = "center";
    remarkElement.textContent =
      "注意：“期末 : 平时”为三项成绩倒推的结果，可能不准确；确切地说，二者相差越大，结果越准确。";

    const buttonContainerElement = document.createElement("footer");
    buttonContainerElement.className = "extralbox-footer";

    const buttonElement = document.createElement("button");
    buttonElement.className = "extralbox-footer-button";
    buttonElement.textContent = "反馈Bug";

    buttonContainerElement.appendChild(buttonElement);
    containerElement.appendChild(buttonContainerElement);

    const clickAction = () => {
      // 若点击时已存在面板，则移除
      if (document.querySelector(".extralbox")) {
        document.querySelector(".extralbox").remove();
      }

      document.body.appendChild(containerElement);

      const extractDataAndDisplay = () => {
        var a =
          document.getElementById("iframeautoheight").contentDocument.Form1
            .childNodes[1].value;
        const decodeUTF8FromBase64 = (base64) => {
          const text = atob(base64);
          const length = text.length;
          const bytes = new Uint8Array(length);
          for (var i = 0; i < length; i++) {
            bytes[i] = text.charCodeAt(i);
          }
          const decoder = new TextDecoder(); // default is utf-8
          return decoder.decode(bytes);
        };

        var text = decodeUTF8FromBase64(a);
        var credits = [];
        var gradePoints = [];
        var ordinaryPoints = [];
        var examPoints = [];
        var totalPoints = [];
        var course = [];
        var courseId = [];
        var user = "";

        let x = [];
        while (text.indexOf("<") !== -1) {
          if (text.slice(text.indexOf("<") + 1).indexOf("<") === -1) {
            break;
          } else if (
            text.slice(text.indexOf("<") + 1).indexOf("<") <
            text.slice(text.indexOf("<") + 1).indexOf(">")
          ) {
            text = text.slice(text.indexOf("<") + 1);
          } else {
            if (
              text.slice(text.indexOf("<") + 1, text.indexOf(">")) !== "&nbsp;;"
            ) {
              x.push(text.slice(text.indexOf("<") + 1, text.indexOf(">")));
            }
            text = text.slice(text.indexOf(">") + 1);
          }
        }

        let gg = [];

        for (let i = 0, now = 0; i <= x.length - 1; ) {
          if (x[i] === "Text;") {
            if (now >= 9) {
              if (i + 48 >= x.length) {
                break;
              }
              let ng = [];
              for (let j = i + 1; j < i + 48; j++) {
                if (x[j] !== "Text;") {
                  x[j] = x[j].replace(" ", "").replace(";", "");
                  ng.push(x[j]);
                }
              }
              gg.push(ng);
              i += 48;
            } else {
              if (now <= 5) {
                user += x[i + 1] + "  ";
              }
              now += 1;
              i += 1;
            }
          } else {
            i += 1;
          }
        }

        const deleteExtraStr = (text) => {
          return text.replace(/&nbsp\\;/g, "").replace(" ", "");
        };

        for (let i = 0; i < gg.length; i++) {
          const pattern = /^\d{4}-\d{4}$/;
          if (!pattern.test(gg[i][0])) {
            continue;
          }
          courseId.push(deleteExtraStr(gg[i][2]));
          course.push(deleteExtraStr(gg[i][3]));
          credits.push(deleteExtraStr(gg[i][6]));
          gradePoints.push(deleteExtraStr(gg[i][8]));
          ordinaryPoints.push(deleteExtraStr(gg[i][9]));
          examPoints.push(deleteExtraStr(gg[i][11]));
          totalPoints.push(deleteExtraStr(gg[i][13]));
        }

        // Assign user and course information to HTML elements
        document
          .querySelector(".extralbox-header")
          .appendChild(document.createTextNode(user));

        // Create the table element
        const tableElement = document.createElement("table");
        const tbodyElement = document.createElement("tbody");
        tableElement.appendChild(tbodyElement);

        tableElement.className = "datelist";

        // Add the header row
        const headerRow = document.createElement("tr");
        headerRow.className = "datelisthead";
        tbodyElement.appendChild(headerRow);

        // Add the header cells
        const headers = [
          "课程编号",
          "课程",
          "学分",
          "绩点",
          "平时分",
          "卷面分",
          "总分",
          "期末 : 平时",
        ];
        for (const headerText of headers) {
          const headerCell = document.createElement("td");
          headerCell.textContent = headerText;
          headerRow.appendChild(headerCell);
        }

        // Add the data rows
        for (var i = 0; i < course.length; i++) {
          const row = document.createElement("tr");
          row.className = "table-row";
          const courseIdCell = document.createElement("td");
          courseIdCell.textContent = courseId[i];
          row.appendChild(courseIdCell);
          // courseIdCell.style.border = "1px solid black";

          const courseCell = document.createElement("td");
          courseCell.textContent = course[i];
          row.appendChild(courseCell);
          // courseCell.style.border = '1px solid black';

          const creditsCell = document.createElement("td");
          creditsCell.textContent = credits[i];
          row.appendChild(creditsCell);
          // creditsCell.style.border = '1px solid black';

          const gradePointsCell = document.createElement("td");
          gradePointsCell.textContent = gradePoints[i];
          row.appendChild(gradePointsCell);
          // gradePointsCell.style.border = '1px solid black';

          const ordinaryPointsCell = document.createElement("td");
          ordinaryPointsCell.textContent = ordinaryPoints[i];
          row.appendChild(ordinaryPointsCell);
          // ordinaryPointsCell.style.border = '1px solid black';

          const examPointsCell = document.createElement("td");
          examPointsCell.textContent = examPoints[i];
          row.appendChild(examPointsCell);
          // examPointsCell.style.border = '1px solid black';

          const totalPointsCell = document.createElement("td");
          totalPointsCell.textContent = totalPoints[i];
          row.appendChild(totalPointsCell);
          // totalPointsCell.style.border = '1px solid black';

          const scaleCell = document.createElement("td");
          if (
            !isNaN(totalPoints[i]) &&
            !isNaN(examPoints[i]) &&
            !isNaN(ordinaryPoints[i]) &&
            Number(examPoints[i]) != 0 &&
            Number(ordinaryPoints[i]) != 0
          ) {
            if (Number(examPoints[i]) == Number(ordinaryPoints[i])) {
              scaleCell.textContent = "Unknown";
            } else {
              let a = (
                (10 * Number(totalPoints[i]) - 10 * Number(ordinaryPoints[i])) /
                (Number(examPoints[i]) - Number(ordinaryPoints[i]))
              ).toFixed(0);
              if (a <= 0 || a >= 10) {
                scaleCell.textContent = "Unknown";
              } else {
                scaleCell.textContent = a.toString();
                scaleCell.textContent += ":" + (10 - a).toString();
              }
            }
          } else {
            scaleCell.textContent = "";
          }
          row.appendChild(scaleCell);
          // scaleCell.style.border = "1px solid black";
          // scaleCell.style.padding = "4px";

          tbodyElement.appendChild(row);
        }
        // Add the table element to the page
        document.querySelector(".extralbox-main").appendChild(tableElement);
        document.querySelector(".extralbox-main").appendChild(remarkElement);

        // Get the container element
        const containerElement = document.querySelector(".extralbox");

        // Add the event listener
        closeBtn.addEventListener("click", () => {
          containerElement.remove();
        });

        return gg;
      };
      var data = extractDataAndDisplay();
      buttonElement.addEventListener("click", () => {
        var str = "['" + data.join("', '") + "']";
        var textArea = document.createElement("textarea");
        textArea.value = str;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert(
          "已复制相关数据至剪贴板，请在GitHub中提Issues\n注意：可能包含个人信息数据，如有需要请自行在粘贴出来的文本中删除个人信息"
        );
        let a = document.createElement("a");
        a.setAttribute(
          "href",
          "https://github.com/love98ooo/ZhengFangJiaoWuSystemTampermonkeyScript/issues"
        );
        a.setAttribute("target", "_blank");
        a.setAttribute("id", "githubIssues");
        if (!document.getElementById("githubIssues")) {
          document.body.appendChild(a);
        }
        a.click();
      });
    };
    let breadcrumb = document.getElementById("dqwz").textContent;
    if (breadcrumb === "成绩查询") {
      let select = mainFrame.contentDocument.querySelector(
        "#divcxtj > div:nth-child(3) > p.search_con"
      );
      mainFrame.contentDocument.getElementsByClassName(
        "toolbox"
      )[0].style.backgroundSize = "cover";
      floatingButton.onclick = clickAction;
      select.appendChild(floatingButton);
    }
  };
})();

function getStyle() {
  return `.extralbox {
    position: fixed;
    top: 180px;
    left: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 99999;

    width: 924px;
    height: fit-content;
    max-height: min(75%, 100vh - 240px );
    border: 1px solid #fff;
    border-radius: 10px;
    outline: 1px solid #8aa4c4;

    overflow-y: auto;

    background-color: white;

    transform: translateX(-50%);
  }

  .extralbox::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: transparent;
  }

  .extralbox::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
  }

  .extralbox::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }

  .extralbox-header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: none;
    height: 2rem;
    background-size: cover;
    border-radius: 10px 0;
    margin: 0 0 1rem;
  }

  .extralbox-main {
    display: flex;
    flex-direction: column;
    flex: none;
    height: calc(120% - 2rem);
    padding: 0 15px 15px;
    text-align: center;
  }

  .extralbox-footer {
    display: flex;
    justify-content: center;
    height: 40px;
    padding: 10px;
  }

  .datelist {
    width: 100%;
  }

  .table-row td,
  .datelisthead td {
    height: 20px;
  }

  .table-row td:hover,
  .datelisthead td:hover {
    padding: 0.2em 0.5em;
  }

  .button--close {
    position: absolute;
    right: 20px;
    cursor: pointer;
    font-size: medium;
  }
  `;
}
