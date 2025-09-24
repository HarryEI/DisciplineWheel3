        const canvas = document.getElementById('myCanvas');
		const context = canvas.getContext('2d');
        const editButton = document.getElementById('editButton')
        const childButton = document.getElementById('button8');
        const satsButton = document.getElementById('button11');
        const gcseButton = document.getElementById('button14');
        const sixFormButton = document.getElementById('button17');
        const parentDiv = document.getElementById("chat-area");
        const stickyNote = document.getElementById("stickyNote");
        const version = document.getElementById("version");
        const title = document.getElementById("header");
        const warningText = document.getElementById("click-wheel");
        const firstNote = document.getElementById("firstNote")
        const dis1 = document.getElementById('disaplineOne');
        const dis2 = document.getElementById('disaplineTwo');
        const dis3 = document.getElementById('disaplineThree');
        const dis4 = document.getElementById('disaplineFour');
        const dis5 = document.getElementById('disaplineFive');
        const dis6 = document.getElementById('disaplineSix');
        const dis7 = document.getElementById('disaplineSeven');
        const dis8 = document.getElementById('disaplineEight');
        const dis9 = document.getElementById('disaplineNine');
        const dis10 = document.getElementById('disaplineTen');
        const newButton = document.createElement("button");
        const blank = new Image();
        const EIWheel = new Image();
        const wedge1 = new Image();
        const wedge2 = new Image();
        const wedge3 = new Image();
        const wedge4 = new Image();
        const wedge5 = new Image();
        const wedge6 = new Image();
        const wedge7 = new Image();
        const wedge8 = new Image();
        const wedge9 = new Image();
        const wedge10 = new Image();
        blank.src = 'Blank.png'
        EIWheel.src = 'EIWheel.png'
        wedge1.src = 'Wedge1B.png'
        wedge2.src = 'Wedge2B.png'
        wedge3.src = 'Wedge3B.png'
        wedge4.src = 'Wedge4B.png'
        wedge5.src = 'Wedge5B.png'
        wedge6.src = 'Wedge6B.png'
        wedge7.src = 'Wedge7B.png'
        wedge8.src = 'Wedge8B.png'
        wedge9.src = 'Wedge9B.png'
        wedge10.src = 'Wedge10B.png'
		const img = new Image();
        var inputMessage;
        var studentMode = false
        var working = false
        var load = false
        var editMode = false;
        var age = 14;
        var dis = [false, false, false, false, false, false, false, false, false, false]
        var hat = [false, false, false, false, false, false, false, false, false, false]
        const userDataPath = window.electronAPI.getUserDataPath()
        canvas.setAttribute('crossorigin', 'anonymous');
		img.src = "EIWheel.png";
        const inputbox = document.getElementById("inputQuestion");
        //creates questions based on the files found in the question directory  
        const questionsPromise = createQuestions();
        fillQuestionBox();
        loadNewQuestion();
        //draws the discipline wheel for the first time
        drawFirst()

        inputbox.addEventListener("keypress", function(event){
            if (event.key === "Enter") {
                generateInsightWithBubbles()
            }
        });

        //saves the questions to the question directory
        document.getElementById('saveBtn').addEventListener('click', async () => {
        const content = document.getElementById('textInput').value;
        const result = await window.electronAPI.saveFile(content);
        
        if (result.success) {
            alert(`File saved at ${result.path}`);
        } else {
            alert('File save canceled.');
        }
        });

        //checks to see if a new question is loaded (this is not the best way to do this)
        document.addEventListener("click", loadNewQuestion);

        async function createQuestions() {
            const userDataPath = await window.electronAPI.getUserDataPath();
            const directoryPath = `${userDataPath}/questions`
            const fileList = await window.electronAPI.getFilesFromDirectory(directoryPath);

            console.log(directoryPath);

                const fetchPromises = fileList.map(async filename => {
                    const fullPath = `${directoryPath}/${filename}`;
                    const text = await window.electronAPI.readFile(fullPath);
                    return formatTextIntoQuestion(text);
                });
                
            return Promise.all(fetchPromises); // returns full array
        }


            inputbox.innerHTML = ""

        function fillQuestionBox() {
        questionsPromise.then((questions) => {
            const inputbox = document.getElementById("inputQuestion");
            inputbox.innerHTML = ''; // Clear existing options if needed

            questions.forEach((row, i) => {
            if (Array.isArray(row) && row[1]) {
                const question = row[1].trim();
                const option = document.createElement("option");
                option.value = question.slice(0, 10).replace(/\s/g, "_").toLowerCase();
                option.textContent = question;
                inputbox.appendChild(option);
            }
            });
        });
        }


        // function fillQuestionBox(question) {
        //     questions.forEach(row => {
        //         if (Array.isArray(row) && row[1]) {
        //             let question = row[1]
                    
        //             const option = document.createElement("option")
        //             option.value = question.slice(0, 10).replace(/\s/g, "_").toLowerCase(); // Make a usable value
        //             option.textContent = question
        //             console.log("mouse", option.textContent)
        //             inputbox.appendChild(option)
        //         }
        //     });
        //     console.log(questions)
        // }

        function noDisSelected() {
            warningText.classList = "NoteB"
            for (let i = 0; i<11; i++) {
                setTimeout(() => {
                    dis[i] = true
                    dis[i-1] = false
                    DrawEIWheel()
                }, i*100);
            }
        }

        // function changeVersion() {
        //     if (studentMode == true) {
        //         version.src = "TS button.png"
        //         title.src = "logo5 for teachers.png"
        //         studentMode = false
        //         title.classList = "header"
        //         firstNote.textContent ="You can use the Discipline Wheel to get suggestions for how your students can investigate a question - through the lenses of different subject disciplines. Write a Question in the Question box below."
        //     }
        //     else {
        //          version.src = "ST button.png"
        //          title.src = "logo.png"
        //          studentMode = true
        //          title.classList = "header2"
        //          firstNote.textContent = "Use the discipline wheel, to explore what scholars in different disciplines say about your question."
        //     }
        // }

        function drawFirst(){
		    img.onload = () => {
	    		context.drawImage(img, 0, 0);
            };
        }
        function button8(){
            age = 8
            childButton.style.backgroundColor = "palevioletred"
            satsButton.style.backgroundColor = "#fddcb6"
            gcseButton.style.backgroundColor = "#fddcb6"
            sixFormButton.style.backgroundColor = "#fddcb6"
        }

        function button11(){
            age = 11
            childButton.style.backgroundColor = "#fddcb6"
            satsButton.style.backgroundColor = "palevioletred"
            gcseButton.style.backgroundColor = "#fddcb6"
            sixFormButton.style.backgroundColor = "#fddcb6"
        }

        function button14(){
            age = 14
            childButton.style.backgroundColor = "#fddcb6"
            satsButton.style.backgroundColor = "#fddcb6"
            gcseButton.style.backgroundColor = "palevioletred"
            sixFormButton.style.backgroundColor = "#fddcb6"
        }

        function button17(){
            age = 17
            childButton.style.backgroundColor = "#fddcb6"
            satsButton.style.backgroundColor = "#fddcb6"
            gcseButton.style.backgroundColor = "#fddcb6"
            sixFormButton.style.backgroundColor = "palevioletred"
        }
        function EditMode(){
            if (editMode == false){
                editMode = true
                dis1.style.border = "1px solid black"
                dis2.style.border = "1px solid black"
                dis3.style.border = "1px solid black"
                dis4.style.border = "1px solid black"
                dis5.style.border = "1px solid black"
                dis6.style.border = "1px solid black"
                dis7.style.border = "1px solid black"
                dis8.style.border = "1px solid black"
                dis9.style.border = "1px solid black"
                dis10.style.border = "1px solid black"
                dis1.setAttribute("contenteditable", "True")
                dis2.setAttribute("contenteditable", "True")
                dis3.setAttribute("contenteditable", "True")
                dis4.setAttribute("contenteditable", "True")
                dis5.setAttribute("contenteditable", "True")
                dis6.setAttribute("contenteditable", "True")
                dis7.setAttribute("contenteditable", "True")
                dis8.setAttribute("contenteditable", "True")
                dis9.setAttribute("contenteditable", "True")
                dis10.setAttribute("contenteditable", "True")
                editButton.textContent = "Select Disaplines"
            }
            else {
                editMode = false
                dis1.style.border = ""
                dis2.style.border = ""
                dis3.style.border = ""
                dis4.style.border = ""
                dis5.style.border = ""
                dis6.style.border = ""
                dis7.style.border = ""
                dis8.style.border = ""
                dis9.style.border = ""
                dis10.style.border = ""
                dis1.setAttribute("contenteditable", "False")
                dis2.setAttribute("contenteditable", "False")
                dis3.setAttribute("contenteditable", "False")
                dis4.setAttribute("contenteditable", "False")
                dis5.setAttribute("contenteditable", "False")
                dis6.setAttribute("contenteditable", "False")
                dis7.setAttribute("contenteditable", "False")
                dis8.setAttribute("contenteditable", "False")
                dis9.setAttribute("contenteditable", "False")
                dis10.setAttribute("contenteditable", "False")
                editButton.textContent = "Edit Mode"
            }
        }

        function DrawEIWheel() {
            context.drawImage(blank, 0, 0);
            context.drawImage(EIWheel, 0, 0)
            if (dis[1]==true) {
                context.drawImage(wedge1, 0, 0);
            }
            if (dis[2]==true) {
                context.drawImage(wedge2, 0, 0);
            }
            if (dis[3]==true) {
                context.drawImage(wedge3, 0, 0);
            }
            if (dis[4]==true) {
                context.drawImage(wedge4, 0, 0);
            }
            if (dis[5]==true) {
                context.drawImage(wedge5, 0, 0);
            }
            if (dis[6]==true) {
                context.drawImage(wedge6, 0, 0);
            }
            if (dis[7]==true) {
                context.drawImage(wedge7, 0, 0);
            }
            if (dis[8]==true) {
                context.drawImage(wedge8, 0, 0);
            }
            if (dis[9]==true) {
                context.drawImage(wedge9, 0, 0);
            }
            if (dis[0]==true) {
                context.drawImage(wedge10, 0, 0);
            }
        }

        function Disapline(n) {
            if (editMode == false) {
                if (dis[n]==false) {
                    dis[n]=true
                }
                else {
                    dis[n]=false
                }
            DrawEIWheel()
            }
        }
        
        $(document).ready(function () {
            $('#myCanvas').mousedown(function(e) {
            var pos = findPos(this);
            var x = e.pageX - pos.x;
            var y = e.pageY - pos.y;
            var coord = "x=" + x + ", y=" + y;
            var c = this.getContext('2d');
            var p = c.getImageData(x, y, 1, 1).data; 
            var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
            $('#status').html(coord + "<br>" + hex);    
    
            if (hex == "#feffff") {
                Disapline(1)
            }
            if (hex == "#fffeff") {
                Disapline(2)
            }
            if (hex == "#fffffe") {
                Disapline(3)
            }
            if (hex == "#fefeff") {
                Disapline(4)
            }
            if (hex == "#fefffe") {
                Disapline(5)
            }
            if (hex == "#fffefe") {
                Disapline(6)
            }
            if (hex == "#fefefe") {
                Disapline(7)
            }
            if (hex == "#fdfefe") {
                Disapline(8)
            }
            if (hex == "#fefdfe") {
                Disapline(9)
            }
            if (hex == "#fefefd") {
                Disapline(0)
            }
        });
    });

    function findPos(obj) {
        var curleft = 0, curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return { x: curleft, y: curtop };
        }
        return undefined;
    }

    function rgbToHex(r, g, b) {
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    }

    function loader0(loading) {
        loading.innerHTML = "working";
        parentDiv.appendChild(loading);

    }
    function loader1(loading) {
        loading.innerHTML = "working.";
        parentDiv.appendChild(loading);
    }
    function loader2(loading) {
        loading.innerHTML = "working..";
        parentDiv.appendChild(loading);
    }
    function loader3(loading) {
        // loading.innerHTML = "See webpage for examples";
        // newButton.textContent = "Refresh Page";
        // newButton.addEventListener("click", function() {
        //     location.reload();
        // });
        loading.innerHTML = "working...";
        parentDiv.appendChild(loading);
//        parentDiv.appendChild(newButton);
    }

    function formatTextIntoQuestion(text) {
        let seperator = "Question: "
        for (let i = 0; i<=10; i++) {
            seperator = seperator + "|Discipline" + i + ": |Discipline" + i + "Answer: "
        }
        console.log(seperator)
        text = text.split(RegExp(seperator))
        return(text)
    }


    function splitDivIntoParagraphs(originalDiv) {
        const originalText = originalDiv.innerText;
        console.log(originalDiv.innerHTML)
        NumberThenDis = "(?=[0-9]. "+dis1.textContent+":)|(?=[0-9]. "+dis2.textContent+":)|(?=[0-9]. "+dis3.textContent+":)|(?=[0-9]. "+dis4.textContent+":)|(?=[0-9]. "+dis5.textContent+":)|(?=[0-9]. "+dis6.textContent+":)|(?=[0-9]. "+dis7.textContent+":)|(?=[0-9]. " +dis8.textContent+":)|(?=[0-9]. "+dis9.textContent+":)|(?=[0-9]. "+dis10.textContent+":)"
        const lines1 = originalText.split(RegExp(NumberThenDis, "i"))
        const lines2 = originalText.split(RegExp("(?="+dis1.textContent+":)|(?="+dis2.textContent+":)|(?="+dis3.textContent+":)|(?="+dis4.textContent+":)|(?="+dis5.textContent+":)|(?="+dis6.textContent+":)|(?="+dis7.textContent+":)|(?="+dis8.textContent+":)|(?="+dis9.textContent+":)|(?="+dis10.textContent+":)", "i"))
        const lines3 = originalText.split(RegExp("(?=Discipline: "+dis1.textContent+")|(?=Discipline: "+dis2.textContent+")|(?=Discipline: "+dis3.textContent+")|(?=Discipline: "+dis4.textContent+")|(?=Discipline: "+dis5.textContent+")|(?=Discipline: "+dis6.textContent+")|(?=Discipline: "+dis7.textContent+")|(?=Discipline: "+dis8.textContent+")|(?=Discipline: "+dis9.textContent+")|(?=Discipline: "+dis10.textContent+")", "i"))
        var lines = []
        if (lines1.length != 1) {lines = lines1}
        else
            if (lines2.length != 1) {lines = lines2}
            else {lines = lines3}
        for (let i = 1; i<10; i++) {
            hat[i] = dis[i]
        }
        for (let i = 0; i < lines.length; i++) {
            const newDiv = document.createElement('div');
            newDiv.innerText = lines[lines.length-(i+1)];
            newDiv.classList.add("oval-thought-border");
            const image = document.createElement('img');
            for (let i = 10; i>0; i--) {
                if (i != 10){
                    if (hat[i] == true) {
                        image.src = 'Hat' + i + '.png';
                        hat[i] = false;
                        break;
                    }
                }
                else {
                    if (hat[0] == true) {
                        image.src = 'Hat0.png';
                        hat[0] = false;
                        break;
                    }
                }
            }
            image.style.float = 'right';  // Align the image to the right
            newDiv.appendChild(image);
            parentDiv.parentNode.insertBefore(newDiv, parentDiv.nextSibling);
        }
        working = false
    }

    function loadNewQuestion() {
    questionsPromise.then((questions) => {
        const inputbox = document.getElementById("inputQuestion");
        const selectedValue = inputbox.value;

        // Normalize selected value to match the array entry format
        const selectedIndex = questions.findIndex((row) => {
        if (Array.isArray(row) && row[1]) {
            const value = row[1].trim().slice(0, 10).replace(/\s/g, "_").toLowerCase();
            return value === selectedValue;
        }
        return false;
        });

        // Get the question in the array (if available)
        const thisQuestion = questions[selectedIndex];
        console.log("Next question:", thisQuestion[2]);
        dis1.innerHTML = thisQuestion[2]
        dis2.innerHTML = thisQuestion[4]
        dis3.innerHTML = thisQuestion[6]
        dis4.innerHTML = thisQuestion[8]
        dis5.innerHTML = thisQuestion[10]
        dis6.innerHTML = thisQuestion[12]
        dis7.innerHTML = thisQuestion[14]
        dis8.innerHTML = thisQuestion[16]
        dis9.innerHTML = thisQuestion[18]
        dis10.innerHTML = thisQuestion[20]
    });
    }

    async function generateInsightWithBubbles() {
        questionsPromise.then((questions) => {
            const inputbox = document.getElementById("inputQuestion");
            const selectedValue = inputbox.value;

            // Find the selected question
            const selectedIndex = questions.findIndex(row => {
            if (Array.isArray(row) && row[1]) {
                const value = row[1].trim().slice(0, 10).replace(/\s/g, "_").toLowerCase();
                return value === selectedValue;
            }
            return false;
            });

            if (selectedIndex === -1 || !questions[selectedIndex]) {
            console.warn("Selected question not found.");
            return;
            }

            const thisQuestion = questions[selectedIndex];
            let hatMap = {};
            console.log(thisQuestion)

            // Build hatMap from dis flags
            for (let i = 1; i <= 10; i++) {
            hatMap[i] = dis[i];
            }

            console.log(dis)
            // Generate bubbles per discipline response
            for (let i = 1; i <= 10; i++) {
                var disIndex = i
                if (disIndex == 10) {
                    disIndex = 0
                }
            if (dis[disIndex] === true && thisQuestion[i * 2 + 1]) {

                const text = thisQuestion[i * 2 + 1].replace(/[\n\r\t]/g, ' ').trim();

                const newDiv = document.createElement('div');
                newDiv.classList.add("oval-thought-border");
                newDiv.innerText = text;

                const image = document.createElement('img');
                image.src = `Hat${disIndex}.png`;
                image.style.float = 'right';

                newDiv.appendChild(image);
                parentDiv.parentNode.insertBefore(newDiv, parentDiv.nextSibling);
            }
            }
        });

    working = false;
    }

//     async function getResponse() {
//         let episemicInsight = '{"innerText":"Here come my thoughts on how different disciplines address the question: '
//         if (working == true){return;}

//     questionsPromise.then((questions) => {
//         const inputbox = document.getElementById("inputQuestion");
//         const selectedValue = inputbox.value;

//         // Normalize selected value to match the array entry format
//         const selectedIndex = questions.findIndex((row) => {
//         if (Array.isArray(row) && row[1]) {
//             const value = row[1].trim().slice(0, 10).replace(/\s/g, "_").toLowerCase();
//             return value === selectedValue;
//         }
//         return false;
//         });

//         // Get the question in the array (if available)
//         const thisQuestion = questions[selectedIndex];
//         for (let i = 1; i <= 10; i++) {
//             if (dis[i] == true) {
//                 episemicInsight += thisQuestion[i * 2 + 1];
//             }
//             }
//         if (episemicInsight == '{"innerText":"Here come my thoughts on how different disciplines address the question: '){  
//             noDisSelected();
//             return;
//         }
//         episemicInsight = episemicInsight+'"}'
//         console.log(episemicInsight)
//         splitDivIntoParagraphs(JSON.parse(episemicInsight))
//     })
// }


    // inputText = inputbox.value
    // console.log(inputText)
    // if(inputText == '') { return; }
    // working = true
            
    // parentDiv.innerHTML=''
    
    // const question = document.createElement('div');
    // question.innerHTML = inputText;
//    const loading = document.createElement('div')
//     setTimeout(loader0(loading), 0)
//     setTimeout(loader1(loading), 2000)
//     setTimeout(loader2(loading), 4000)
//     setTimeout(loader3(loading), 6000)
//     setTimeout(loader0(loading), 8000)
//     setTimeout(loader1(loading), 10000)
//     setTimeout(loader2(loading), 12000)
//     setTimeout(loader3(loading), 14000)
//     setTimeout(loader0(loading), 16000)
//     setTimeout(loader1(loading), 18000)
//     setTimeout(loader2(loading), 20000)
//     setTimeout(loader3(loading), 22000)

//     if (studentMode == true) {
//         inputMessage = "I am a "+ age +" year old, "
//         + "use the epistemic insight framework to show disciplines preferred questions, methods and what makes a good answer in this discipline "
//         + "to show how different disciplines address the question, " + inputText + " through the following disciplines: " + episemicInsight + ". Start your answer with the words here come my thoughts"
//     }
//     else {
//         inputMessage = "I am a teacher of "+ age +" year olds, "
//         + "use the epistemic insight framework to explain how I can investigate the question, " + inputText + ", though the lenses of: " + episemicInsight 
//         + " by asking a relevent question in that discipline, using methods appropriate to that discipline" 
//         + " and working towards an answer that is a good answer in that discipline. "
//         + "Start your answer with The Epistemic Insight Framework is a way of learning about different disciplines by exploring relevant questions, methods, and answers"
//         + "then explain how the activity helps students to build epistemic insight into what makes this discipline distinctive and how it is similar to other disciplines"
//         + " and how the student know it’s a good answer and give an example within each field of study. Please note, I want an investigation that my " + age 
//         + " year old students can do in the classroom for each discipline."
//     }
//     console.log(inputMessage)
//     const res = await fetch('http://s797423955.websitehome.co.uk/ei-search/vendor/server.php?chat=' +   inputMessage, {
// //    const res = await fetch('http://localhost/website/public/vendor/server.php?chat=' +   inputMessage, {
//         method: 'GET',
//         headers: {
//             "Content-Type": 'application/json'
//         }
//     });
//     console.log(res)
//     const data = await res.json();
    
    // if(data[0]) {
    //     loading.remove()
    //     const answer = document.createElement('div');
    //     answer.innerHTML = data[0].replace('/[?]/g', '$0?\n');
    //     splitDivIntoParagraphs(answer)
    //     // answer.classList.add("box", "answer");
    //     // parentDiv.appendChild(answer);
    // }