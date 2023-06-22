// ==UserScript==
// @name         ZhengFangJiaoWu
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Your course
// @author       You
// @match        http://jwxt.njupt.edu.cn/xs_main.aspx?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=njupt.edu.cn
// @grant        none
// ==/UserScript==

(function() {
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
        // Append the div element to the target location on the web page
        document.body.appendChild(containerElement);
        containerElement.appendChild(userElement);
        containerElement.appendChild(courseElement);
    
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
    
          // Rest of your existing code
          var decodedStr = decodeUTF8FromBase64(a)
          var arr0 = decodedStr.replace(/[a-zA-Z<>;&\\]/g, "").replace(/\d{20,}/g, "")
          var arr1 = arr0.split("-")
          var arr2 = [""]
          arr1.map((i, index) => {
              var j = 0;
              for (j; j < i.length; j++) {
                  if (isNaN(i[j])) {
                      break;
                  }
              }
              arr2[index] = i.slice(j, i.length)
          })
          arr2.splice(1, 3);
          var course = [""];
          var grade = [""];
          var user;
          arr2.map((item, index) => {
              if (index) {
                  for (var i = 0; i < item.length; i++) {
                      if (!isNaN(item[i])) break;
                      course[index] = item.slice(0, i - 1).toString()
                      grade[index] = item.slice(i + 1, item.length).toString()
                  }
              } else user = item.slice(1, item.length - 14)
          })
          credits = [];
          gradePoints = [];
          ordinaryPoints = [];
          examPoints = [];
          totalPoints = [];
          grade.map((item, index) => {
              var arr3 = Array.from(item)
              
              for (var i = 0; i < item.length; i++) {
                  if (isNaN(item[i]) && item[i] != '.') {
                      arr3 = arr3.slice(0, i);
                      break;
                  }
              }
              arr3 = arr3.filter(item => item !== " ");
              var offset = 0;
              if (arr3[1] !== ".") {
                offset = 2;
              }
              
              credits.push(arr3.slice(0, 3 - offset).join(""));
              if (arr3[4 - offset] !== ".") {
                gradePoints.push("")
                offset += 4;
              } else {
                gradePoints.push(arr3.slice(3 - offset, 7 - offset).join(""));
              }
              
              
              if (arr3[7 - offset] === "1" && arr3[8 - offset] === "0" && arr3[9 - offset] === "0") {
                ordinaryPoints.push(arr3.slice(7 - offset, 10 - offset).join(""));
                offset -= 1;
              } else {
                ordinaryPoints.push(arr3.slice(7 - offset, 9 - offset).join(""));
              }

              if (arr3[9 - offset] === "1" && arr3[10 - offset] === "0" && arr3[11 - offset] === "0") {
                examPoints.push(arr3.slice(9 - offset, 12 - offset).join(""));
                offset -= 1;
              } else {
                examPoints.push(arr3.slice(9 - offset, 11 - offset).join(""));
              }

              if (arr3[11 - offset] === "1" && arr3[12 - offset] === "0" && arr3[13 - offset] === "0") {
                totalPoints.push(arr3.slice(11 - offset, 14 - offset).join(""))
              } else {
                totalPoints.push(arr3.slice(11 - offset, 13 - offset).join(""))
              }
          })
          // console.log("credits: ")
          // console.log(credits)
          // console.log("gradePoints: ")
          // console.log(gradePoints)
          // console.log("ordinaryPoints: ")
          // console.log(ordinaryPoints)
          // console.log("examPoints: ")
          // console.log(examPoints)
          // console.log("totalPoints: ")
          // console.log(totalPoints)
          // console.log(course)

          // Assign user and course information to HTML elements
          document.getElementById("userElement").textContent = user;

          // Create the table element
          const tableElement = document.createElement('table');
          
          // Add the header row
          const headerRow = document.createElement('tr');
          tableElement.appendChild(headerRow);
          
          // Add the header cells
          const headers = ['课程', '学分', '绩点', '平时分', '卷面分', '总分'];
          for (const headerText of headers) {
            const headerCell = document.createElement('th');
            headerCell.textContent = headerText;
            headerRow.appendChild(headerCell);
          }
          
          // Add the data rows          
          for (var i = 1; i < grade.length; i++) {
            const row = document.createElement('tr');

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

        };
        extractDataAndDisplay();
    });

})();