// ==UserScript==
// @name         ZhengFangJiaoWu
// @namespace    https://github.com/love98ooo/
// @version      0.1.1
// @description  正方教务系统猴油脚本，主要用于查询平时分
// @author       Love98
// @match        http://jwxt.njupt.edu.cn/xs_main.aspx?*
// @match        *://vpn.njupt.edu.cn:8443/http/*/xs_main.aspx?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=njupt.edu.cn
// @grant        none
// ==/UserScript==

(function () {
    const floatingButton = document.createElement('button');
    floatingButton.textContent = ' 查分';
    floatingButton.style.padding = '0';
    floatingButton.style.textAlign = 'center';
    floatingButton.style.position = 'fixed';
    floatingButton.style.right = '20px';
    floatingButton.style.top = '50%';
    floatingButton.style.transform = 'translateY(-50%)';
    floatingButton.style.borderRadius = '50%';
    floatingButton.style.width = '60px';
    floatingButton.style.height = '60px';
    floatingButton.style.zIndex = 9998;

    document.body.appendChild(floatingButton);
    floatingButton.addEventListener('click', () => {
        console.log("script is running");
        const containerElement = document.createElement("div");
        const userElement = document.createElement("div");
        const courseElement = document.createElement("div");
        containerElement.style.position = 'fixed';
        containerElement.style.right = '25%';
        containerElement.style.top = '50%';
        containerElement.style.transform = 'translateY(-50%)';
        containerElement.style.borderRadius = '5%';
        containerElement.style.width = '924px';
        containerElement.style.height = '75%';
        containerElement.style.zIndex = 9999;
        containerElement.style.backgroundColor = "white";
        containerElement.id = "containerElement";
        userElement.id = "userElement";
        courseElement.id = "courseElement";
        containerElement.style.padding = '1rem';
        containerElement.style.display = 'flex';
        containerElement.style.flexDirection = 'column';
        userElement.style.height = '2rem';
        userElement.style.textAlign = 'center';
        userElement.style.marginBottom = '1rem';
        courseElement.style.height = 'calc(100% - 2rem)';
        courseElement.style.textAlign = 'center';
        document.body.appendChild(containerElement);
        containerElement.appendChild(userElement);
        containerElement.appendChild(courseElement);
        const buttonElement = document.createElement("button");
        buttonElement.style.width = '80px';
        buttonElement.style.height = '30px';
        buttonElement.style.textAlign = 'center';
        buttonElement.textContent = '反馈Bug'
        buttonElement.style.position = 'absolute';
        buttonElement.style.left = '50%';
        buttonElement.style.top = '90%';
        buttonElement.style.transform = 'translateX(-50%)';
        containerElement.appendChild(buttonElement);

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
				totalPoints.push(deleteExtraStr(gg[i][9]));
				ordinaryPoints.push(deleteExtraStr(gg[i][11]));
				examPoints.push(deleteExtraStr(gg[i][13]));
			}
			/*
                console.log("credits: ");
                console.log(credits);
                console.log("gradePoints: ");
                console.log(gradePoints);
                console.log("ordinaryPoints: ");
                console.log(ordinaryPoints);
                console.log("examPoints: ");
                console.log(examPoints);
                console.log("totalPoints: ");
                console.log(totalPoints);
                console.log(course);
            */

            // Assign user and course information to HTML elements
            document.getElementById("userElement").textContent = user;

            // Create the table element
            const tableElement = document.createElement('table');

            // Add the header row
            const headerRow = document.createElement('tr');
            tableElement.appendChild(headerRow);

            // Add the header cells
            const headers = ["课程编号", "课程", "学分", "绩点", "平时分", "卷面分", "总分"];
            for (const headerText of headers) {
                const headerCell = document.createElement('th');
                headerCell.textContent = headerText;
                headerRow.appendChild(headerCell);
            }

            // Add the data rows
            for (var i = 0; i < course.length; i++) {
                const row = document.createElement('tr');

                const courseIdCell = document.createElement("td");
				courseIdCell.textContent = courseId[i];
				row.appendChild(courseIdCell);
				courseIdCell.style.border = "1px solid black";
				courseIdCell.style.padding = "4px";

                const courseCell = document.createElement('td');
                courseCell.textContent = course[i];
                row.appendChild(courseCell);
                courseCell.style.border = '1px solid black';
                courseCell.style.padding = '4px';

                const creditsCell = document.createElement('td');
                creditsCell.textContent = credits[i];
                row.appendChild(creditsCell);
                creditsCell.style.border = '1px solid black';
                creditsCell.style.padding = '4px';

                const gradePointsCell = document.createElement('td');
                gradePointsCell.textContent = gradePoints[i];
                row.appendChild(gradePointsCell);
                gradePointsCell.style.border = '1px solid black';
                gradePointsCell.style.padding = '4px';

                const ordinaryPointsCell = document.createElement('td');
                ordinaryPointsCell.textContent = ordinaryPoints[i];
                row.appendChild(ordinaryPointsCell);
                ordinaryPointsCell.style.border = '1px solid black';
                ordinaryPointsCell.style.padding = '4px';

                const examPointsCell = document.createElement('td');
                examPointsCell.textContent = examPoints[i];
                row.appendChild(examPointsCell);
                examPointsCell.style.border = '1px solid black';
                examPointsCell.style.padding = '4px';

                const totalPointsCell = document.createElement('td');
                totalPointsCell.textContent = totalPoints[i];
                row.appendChild(totalPointsCell);
                totalPointsCell.style.border = '1px solid black';
                totalPointsCell.style.padding = '4px';

                tableElement.appendChild(row);
            }
            tableElement.style.marginLeft = 'auto';
            tableElement.style.marginRight = 'auto';
            // Add the table element to the page
            document.getElementById("courseElement").appendChild(tableElement);

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
          console.log(data);
          var str = "['" + data.join("', '") + "']";
          var textArea = document.createElement("textarea");
          textArea.value = str;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          console.log(str)
          alert("已复制相关数据至剪贴板，请在GitHub中提Issues\n注意：可能包含个人信息数据，如有需要请自行在粘贴出来的文本中删除个人信息");
          window.open('https://github.com/love98ooo/ZhengFangJiaoWuSystemTampermonkeyScript/issues', '_blank');
        })
    });

})();
