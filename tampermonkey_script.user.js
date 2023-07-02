// ==UserScript==
// @name         ZhengFangJiaoWu
// @namespace    https://github.com/love98ooo/
// @version      0.3.4
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
    const splitUrl = url.split('/')[2];
    let baseUrl = ""
    console.log(url);
    switch(splitUrl) {
        case "vpn.njupt.edu.cn:8443":
            baseUrl = "https://vpn.njupt.edu.cn:8443/http/webvpn5e607416b84322620fcfebad55f2c381efb3e3d8de97685feb46fd2e866a8ae9/";
            break;
        case "jwxt.njupt.edu.cn":
            baseUrl = "http://jwxt.njupt.edu.cn/";
            break;
        default:
            break;
    }
    mainFrame.onload = () => {
        const floatingButton2 = document.createElement('div');
        const floatingButton = document.createElement('button');
        floatingButton.textContent = '查询考试详细分数';
        floatingButton.className = 'button'
        const clickAction = () => {
            const containerElement = document.createElement("div");
            const userElement = document.createElement("div");
            const courseElement = document.createElement("div");
            containerElement.style.position = 'fixed';
            containerElement.style.right = '25%';
            containerElement.style.top = '50%';
            containerElement.style.transform = 'translateY(-50%)';
            containerElement.style.outline = '1px solid #8AA4C4'
            containerElement.style.border = '1px solid #fff !important'
            containerElement.style.borderRadius = '10px'
            containerElement.style.width = '924px';
            containerElement.style.height = '75%';
            containerElement.style.overflowY = 'scroll';
            containerElement.style.zIndex = 9999;
            containerElement.style.backgroundColor = "white";
            containerElement.id = "containerElement";
            userElement.id = "userElement";
            courseElement.id = "courseElement";
            containerElement.style.display = 'flex';
            containerElement.style.justifyContent = 'space-between'
            containerElement.style.flexDirection = 'column';
            userElement.style.height = '2rem';
            userElement.style.background = 'url(' + baseUrl + 'style/standard/images/toolbox_right.gif) no-repeat right top'
            userElement.style.backgroundSize = 'cover'
            userElement.style.textAlign = 'center';
            userElement.style.borderRadius = '10px 10px 0 0';
            userElement.style.paddingTop = '1rem';
            userElement.style.paddingBottom = '0.5rem';
            userElement.style.marginBottom = '1rem';
            courseElement.style.height = 'calc(120% - 2rem)';
            courseElement.style.textAlign = 'center';
            courseElement.style.display = 'flex'
            courseElement.style.padding = '1.5rem'
            courseElement.style.paddingTop = '0px'
            courseElement.style.flex = 0;
            courseElement.style.flexDirection = 'column'
            document.body.appendChild(containerElement);
            containerElement.appendChild(userElement);
            containerElement.appendChild(courseElement);
            const remarkElement = document.createElement("div");
            // remarkElement.style.display = 'flex';
            // remarkElement.style.right = '25%';
            // remarkElement.style.top = '50%';
            // remarkElement.style.justifyContent = 'center';
            remarkElement.style.textAlign = 'center';
            remarkElement.textContent = "注意：“期末 : 平时”为三项成绩倒推的结果，可能不准确；确切地说，二者相差越大，结果越准确。";
            // remarkElement.style.flex = 0.3;
            // containerElement.appendChild(remarkElement);
            const buttonElement = document.createElement("button");
            const buttonContainerElement = document.createElement("div");
            buttonContainerElement.style.display = 'flex';
            buttonContainerElement.style.height = '40px';
            buttonContainerElement.style.padding = '10px';
            buttonContainerElement.style.alignItems = 'center';
            buttonElement.style.margin = '15px auto 1.5rem';
            // buttonElement.style.display = 'flex';
            // buttonElement.style.flex = 0.1;
            // buttonElement.style.marginBottom = '1.5rem';
            buttonElement.style.width = '80px';
            buttonElement.style.height = '30px';
            // buttonElement.style.alignItems = 'center';
            // buttonElement.style.justifyContent = 'center';
            // buttonElement.style.textAlign = 'center';
            buttonElement.style.paddingRight = '0px';
            buttonElement.textContent = '反馈Bug';
            buttonContainerElement.appendChild(buttonElement);
            containerElement.appendChild(buttonContainerElement);

            const extractDataAndDisplay = () => {
                var a = document.getElementById("iframeautoheight").contentDocument.Form1.childNodes[1].value;
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

                for (let i = 0, now = 0; i <= x.length - 1;) {
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
                    if (i !== 0 && gg[i][0] !== gg[i - 1][0]) {
                        break;
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
                document.getElementById("userElement").textContent = user;

                // Create the table element
                const tableElement = document.createElement('table');
                const tbodyElement = document.createElement('tbody')
                tableElement.appendChild(tbodyElement)
                tableElement.style.width = '100%'
                tableElement.className = 'datelist'

                // Add the header row
                const headerRow = document.createElement('tr');
                headerRow.className = 'datelisthead'
                tbodyElement.appendChild(headerRow);

                // Add the header cells
                const headers = ["课程编号", "课程", "学分", "绩点", "平时分", "卷面分", "总分", "期末 : 平时"];
                for (const headerText of headers) {
                    const headerCell = document.createElement('td');
                    headerCell.textContent = headerText;
                    headerCell.style.height = "20px";
                    headerRow.appendChild(headerCell);
                }

                // Add the data rows
                for (var i = 0; i < course.length; i++) {
                    const row = document.createElement('tr');

                    const courseIdCell = document.createElement("td");
                    courseIdCell.textContent = courseId[i];
                    row.appendChild(courseIdCell);
                    // courseIdCell.style.border = "1px solid black";
                    courseIdCell.style.height = "20px";

                    const courseCell = document.createElement('td');
                    courseCell.textContent = course[i];
                    row.appendChild(courseCell);
                    // courseCell.style.border = '1px solid black';
                    courseCell.style.height = "20px";

                    const creditsCell = document.createElement('td');
                    creditsCell.textContent = credits[i];
                    row.appendChild(creditsCell);
                    // creditsCell.style.border = '1px solid black';
                    creditsCell.style.height = "20px";

                    const gradePointsCell = document.createElement('td');
                    gradePointsCell.textContent = gradePoints[i];
                    row.appendChild(gradePointsCell);
                    // gradePointsCell.style.border = '1px solid black';
                    gradePointsCell.style.height = "20px";

                    const ordinaryPointsCell = document.createElement('td');
                    ordinaryPointsCell.textContent = ordinaryPoints[i];
                    row.appendChild(ordinaryPointsCell);
                    // ordinaryPointsCell.style.border = '1px solid black';
                    ordinaryPointsCell.style.height = "20px";

                    const examPointsCell = document.createElement('td');
                    examPointsCell.textContent = examPoints[i];
                    row.appendChild(examPointsCell);
                    // examPointsCell.style.border = '1px solid black';
                    examPointsCell.style.height = "20px";

                    const totalPointsCell = document.createElement('td');
                    totalPointsCell.textContent = totalPoints[i];
                    row.appendChild(totalPointsCell);
                    // totalPointsCell.style.border = '1px solid black';
                    totalPointsCell.style.height = "20px";

                    const scaleCell = document.createElement("td");
                    if (!isNaN(totalPoints[i]) && !isNaN(examPoints[i]) && !isNaN(ordinaryPoints[i]) && Number(examPoints[i]) != 0 && Number(ordinaryPoints[i]) != 0) {
                        if (Number(examPoints[i]) == Number(ordinaryPoints[i])) {
                            scaleCell.textContent = "Unknown";
                        } else {
                            let a = ((10 * Number(totalPoints[i]) - 10 * Number(ordinaryPoints[i])) / (Number(examPoints[i]) - Number(ordinaryPoints[i]))).toFixed(0);
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
                document.getElementById("courseElement").appendChild(tableElement);
                document.getElementById("courseElement").appendChild(remarkElement);

                // Get the container element
                const containerElement = document.getElementById('containerElement');

                // Create the close button
                const closeBtn = document.createElement('span');
                closeBtn.textContent = '×';
                closeBtn.style.fontSize = "x-large"
                closeBtn.style.position = 'absolute';
                closeBtn.style.top = '2px';
                closeBtn.style.right = '20px';
                closeBtn.style.cursor = 'pointer';

                // Add the event listener
                closeBtn.addEventListener('click', () => {
                    containerElement.remove();
                });

                // Add the close button to the container element
                containerElement.appendChild(closeBtn);
                return gg;
            };
            var data = extractDataAndDisplay();
            buttonElement.addEventListener('click', () => {
                var str = "['" + data.join("', '") + "']";
                var textArea = document.createElement("textarea");
                textArea.value = str;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert("已复制相关数据至剪贴板，请在GitHub中提Issues\n注意：可能包含个人信息数据，如有需要请自行在粘贴出来的文本中删除个人信息");
                let a = document.createElement("a");
                a.setAttribute("href", 'https://github.com/love98ooo/ZhengFangJiaoWuSystemTampermonkeyScript/issues');
                a.setAttribute("target", "_blank");
                a.setAttribute("id", 'githubIssues');
                if(!document.getElementById('githubIssues')) {
                    document.body.appendChild(a);
                }
                a.click();
            })
        }
        let breadcrumb = document.getElementById("dqwz").textContent;
        if (breadcrumb === "成绩查询") {
            let select = mainFrame.contentDocument.querySelector('#divcxtj > div:nth-child(3) > p.search_con');
            mainFrame.contentDocument.getElementsByClassName('toolbox')[0].style.backgroundSize = 'cover'
            floatingButton.onclick = clickAction
            select.appendChild(floatingButton)
        }
    }
})();