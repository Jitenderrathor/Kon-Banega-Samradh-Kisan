//selecting all required elements
const start_btn = document.querySelector(".home .type-btn");
const home_box = document.querySelector(".home");
const start_game = document.querySelector(".logo_home .start_game");
const logo_home = document.querySelector(".logo_home");
const info_box = document.querySelector(".info_box");
const exit_btn_info = info_box.querySelector(".buttons .quit");
const continue_btn_info = info_box.querySelector(".buttons .restart");
const price_box = document.querySelector(".price_box");
const exit_btn_price = price_box.querySelector(".buttons .quit");
const continue_btn_price = price_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const restart_btn = result_box.querySelector(".restart");
const print_btn = result_box.querySelector(".print");
const scoreUser_btn = result_box.querySelector(".scoreUser");
const option_list = document.querySelector(".option_list");
const icon = option_list.querySelector(".option .tick");
const next_btn = document.querySelector(".next_btn");
const skip_btn = document.querySelector(".skip");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
// const tableContent = document.querySelector("#question_table tbody");
const tableContent_ans = document.querySelector("#question_table tbody .ans");
const fifty_btn = document.querySelector(".fifty");
const audition_btn = document.querySelector(".audition");
const refresh_btn = document.querySelector(".refresh");
const play_btn = document.querySelector(".play");
const intro_audio = document.querySelector("#intro");
const claping_audio = document.querySelector("#clapping");
const tik_audio = document.querySelector("#tik_tik");
const correct_audio = document.querySelector("#correct_answer");
const wrong_answer1 = document.querySelector("#wrong_answer1");
const wrong_answer2 = document.querySelector("#wrong_answer2");
const my_canvas = document.querySelector("#my-canvas");

function playAudio(audioName) {
    audioName.play();
    if (audioName.paused) {
        audioName.play();
    } else {
        audioName.currentTime = 0;
    }
}


start_game.onclick = () => {
    logo_home.classList.add('d-none');
    home_box.classList.remove('d-none'); //show info box
    intro_audio.play();
    playAudio(intro_audio);
}

// if startQuiz button clicked
start_btn.onclick = (e) => {
    e.preventDefault();
    let inpName = document.getElementById("inpName");
    let inpPhone = document.getElementById("inpPhone");
    let inpVillage = document.getElementById("inpVillage");
    if (inpName.value == '') {
        alert('Please Enter Name');
    } else if (inpPhone.value == '') {
        alert('Please Enter Phone Number');
    } else if (inpVillage.value == '') {
        alert('Please Enter Village');
    } else {
        home_box.classList.add('d-none');
        info_box.classList.remove('d-none'); //show info box
        myFunction();
        intro_audio.pause();
    }

}

// if exitQuiz button clicked
exit_btn_info.onclick = () => {
    home_box.classList.add('d-none'); //show info box
    info_box.classList.add('d-none'); //hide info box
    logo_home.classList.remove('d-none');
}


// if continueQuiz button clicked
continue_btn_info.onclick = () => {
        info_box.classList.add('d-none'); //hide info box
        price_box.classList.remove('d-none'); //show quiz box
    }
    // if exitQuiz button clicked
exit_btn_price.onclick = () => {
    home_box.classList.add('d-none'); //show info box
    price_box.classList.add('d-none'); //show quiz box
    logo_home.classList.remove('d-none');
}


// if continueQuiz button clicked
continue_btn_price.onclick = () => {
    price_box.classList.add('d-none'); //show quiz box
    quiz_box.classList.remove('d-none'); //show quiz box
    skip_btn.classList.add('d-none');
    next_btn.classList.add('d-none');
    fifty_btn.classList.add('disabled');
    audition_btn.classList.add('disabled');
    showQuestion(0); //show quiz box question
    queCounter(1);
}

let que_count = 0;
let que_counter = 1;
let counter;
let timeValue = 20;
let userScore = 0;
let userskip = 0;
let num = 0;
let time = 0;


next_btn.onclick = () => {
    tik_audio.pause();
    correct_audio.pause();
    wrong_answer2.pause();
    if (que_count < questions.length - 1) {
        que_count++;
        que_counter++;
        if (que_count == 9) {
            next_btn.innerHTML = '<span>समाप्त करें</span>';
        }
        showQuestion(que_count);
        queCounter(que_counter);
        skip_btn.classList.add('d-none');
        my_canvas.classList.add('d-none');
        play_btn.classList.remove('disabled');
        refresh_btn.classList.remove('disabled');
        timeText.textContent = "शेष समय";
        // option_list.children[i].classList.remove('disabled');

        // if play btn is clicked and want to start again
        next_btn.classList.add('d-none');
        // skip_btn.style.display = 'block';
        timeCount.textContent = '20';
        timeValue = timeCount.textContent;
        tik_audio.currentTime = 0;
        if (play_btn.getAttribute('data-src') == 'pause') {
            play_btn.setAttribute('data-src', 'play');
            play_btn.setAttribute('src', 'image/play.png');
        }


        // let allOptions = option_list.children;
        // for (i = 0; i < allOptions.length; i++) {
        //     option_list.children[i].classList.remove('disabled');
        // }
    } else {
        showResult();
    }
}


skip_btn.onclick = () => {
    tik_audio.pause();
    correct_audio.pause();
    wrong_answer2.pause();
    if (que_count < questions.length - 1) {
        que_count++;
        que_counter++;
        userskip += 1;
        num++;
        clearInterval(counter);
        showQuestion(que_count);
        queCounter(que_counter);
        play_btn.classList.remove('disabled');
        skip_btn.classList.add('d-none');
        my_canvas.classList.add('d-none');
        fifty_btn.classList.add('disabled');
        audition_btn.classList.add('disabled');
        timeText.textContent = "शेष समय";
        document.querySelector('#question_table tbody').insertAdjacentHTML('beforeend', '<tr class="ans dg-secondary"><td>' + num + '</td><td>Skip</td></tr>');
        timeCount.textContent = '20';
        timeValue = timeCount.textContent;
        tik_audio.currentTime = 0;
        if (play_btn.getAttribute('data-src') == 'pause') {
            play_btn.setAttribute('data-src', 'play');
            play_btn.setAttribute('src', 'image/play.png');
        }
        // let allOptions = option_list.children;
        // for (i = 0; i < allOptions.length; i++) {
        //     option_list.children[i].classList.remove('disabled');;
        // }
    } else {
        userskip += 1;
        showResult();
    }
}

/* // if quitQuiz button clicked
print_btn.onclick = () => {
    printDiv();
    // result_print.print();
    // window.location.reload(); //reload the current window
} */

// function reLoad() {
//     window.location.reload();
// }
// if quitQuiz button clicked

fifty_btn.onclick = () => {
    // this.classList.add('')
    clearInterval(counter);
    tik_audio.pause();
    timeValue = timeCount.textContent;
    fifty_btn.classList.add('fiftydisabled');
    fifty_btn.insertAdjacentHTML('beforeend', '<img src="image/wrong.png" class="position-absolute" alt="">');
    let ansWrong = document.querySelectorAll('.ansWrong');
    // alert();
    ansWrong[0].classList.add('ansDull');
    ansWrong[1].classList.add('ansDull');
    if (play_btn.getAttribute('data-src') == 'pause') {
        play_btn.setAttribute('data-src', 'play');
        play_btn.setAttribute('src', 'image/play.png');
        audition_btn.classList.add('disabled');
        skip_btn.classList.add('d-none');
    }
    let allOptions = option_list.children;
    for (i = 0; i < allOptions.length; i++) {
        option_list.children[i].classList.add('disabled');
    }
}
audition_btn.onclick = () => {
    clearInterval(counter);
    tik_audio.pause();
    timeValue = timeCount.textContent;
    audition_btn.classList.add('fiftydisabled');
    audition_btn.insertAdjacentHTML('beforeend', '<img src="image/wrong.png" class="position-absolute" alt="">');
    if (play_btn.getAttribute('data-src') == 'pause') {
        play_btn.setAttribute('data-src', 'play');
        play_btn.setAttribute('src', 'image/play.png');
        fifty_btn.classList.add('disabled');
        skip_btn.classList.add('d-none');
    }
    let allOptions = option_list.children;
    for (i = 0; i < allOptions.length; i++) {
        option_list.children[i].classList.add('disabled');
    }
}
play_btn.onclick = () => {
    playClick();
}

function playClick() {
    if (play_btn.getAttribute('data-src') == 'play') {
        startTimer(timeValue -= '0');
        tik_audio.play();
        playAudio(tik_audio);
        let allOptions = option_list.children;
        for (i = 0; i < allOptions.length; i++) {
            option_list.children[i].classList.remove('disabled');
        }
        skip_btn.classList.remove('d-none');
        fifty_btn.classList.remove('disabled');
        audition_btn.classList.remove('disabled');
        play_btn.setAttribute('data-src', 'pause');
        play_btn.setAttribute('src', 'image/pause.png');
    } else {
        clearInterval(counter);
        timeValue = timeCount.textContent;
        let allOptions = option_list.children;
        for (i = 0; i < allOptions.length; i++) {
            option_list.children[i].classList.add('disabled');
        }
        skip_btn.classList.add('d-none');
        fifty_btn.classList.add('disabled');
        audition_btn.classList.add('disabled');
        tik_audio.pause();
        play_btn.setAttribute('data-src', 'play');
        play_btn.setAttribute('src', 'image/play.png');
    }
}


function showQuestion(index) {
    const que_text = document.querySelector('.que_text');
    let que_tag = '<h4> ' + questions[index].numb + '. ' + questions[index].question + ' </h4>';
    que_text.innerHTML = que_tag;

    const option_list = document.querySelector('.option_list');
    let option_text = '<div class="col-5 option disabled"><div><b>A.</b><span>' + questions[index].options[0] + '</span></div></div>' +
        '<div class="col-5 option disabled"><div><b>B.</b><span>' + questions[index].options[1] + '</span></div></div>' +
        '<div class="col-5 option disabled"><div><b>C.</b><span>' + questions[index].options[2] + '</span></div></div>' +
        '<div class="col-5 option disabled"><div><b>D.</b><span>' + questions[index].options[3] + '</span></div></div>';
    option_list.innerHTML = option_text;
    let allOptions = option_list.children;
    let correct = questions[que_count].answer;
    // alert(correct);
    for (i = 0; i < allOptions.length; i++) {
        option_list.children[i].setAttribute('onclick', 'optionSelected(this)');
        // alert(option_list.children[i].querySelector('span').textContent);
        if (option_list.children[i].querySelector('span').textContent == correct) {
            option_list.children[i].classList.add('ansRight');
        } else {
            option_list.children[i].classList.add('ansWrong');
        }
    }

}

let tickIconTag = '<div class="tick"><img src="image/right_ans.png" alt=""></div>';
let crossIconTag = '<div class="cross"><img src="image/wrong_ans.png" alt=""></div>';

function optionSelected(answer) {
    tik_audio.pause();
    num++;
    let ansRight = '<tr class="ans correct"><td>' + num + '</td><td><img src="image/right.png" alt=""></td></tr>';
    let ansWrong = '<tr class="ans incorrect"><td>' + num + '</td><td><img src="image/wrong.png" alt=""></td></tr>';
    next_btn.classList.remove('d-none');
    skip_btn.classList.add('d-none');
    clearInterval(counter);
    let ans_text = answer.querySelector('div span').textContent;
    let correct = questions[que_count].answer;
    let allOptions = option_list.children.length;
    refresh_btn.classList.add('disabled');
    play_btn.classList.add('disabled');
    fifty_btn.classList.add('disabled');
    audition_btn.classList.add('disabled');
    if (play_btn.getAttribute('data-src') == 'pause') {
        play_btn.setAttribute('data-src', 'play');
        play_btn.setAttribute('src', 'image/play.png');
    }
    if (ans_text == correct) {
        answer.classList.add("correct");
        answer.insertAdjacentHTML('beforeend', tickIconTag);
        document.querySelector('#question_table tbody').insertAdjacentHTML('beforeend', ansRight);
        console.log("Correct Answer");
        my_canvas.classList.remove('d-none');
        userScore += 1;
        correct_audio.play();
        playAudio(correct_audio);
        // claping_audio.play();
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML('beforeend', crossIconTag);
        document.querySelector('#question_table tbody').insertAdjacentHTML('beforeend', ansWrong);
        console.log("incorrect Answer");
        wrong_answer1.play();
        playAudio(wrong_answer1);
        wrong_answer2.play();
        playAudio(wrong_answer2);
        // for (let i = 0; i < allOptions; i++) {
        //     if (option_list.children[i].querySelector('div span').textContent == correct) {
        //         option_list.children[i].setAttribute('class', 'col-5 option correct');
        //         option_list.children[i].insertAdjacentHTML('beforeend', tickIconTag);
        //     }
        // }
    }


    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }

}
// If refresh btn click then this functiion will work
refresh_btn.onclick = () => {
    clearInterval(counter);
    timeValue = 20;
    timeCount.textContent = timeValue;
    // skip_btn.style.display = 'block';
    // next_btn.style.display = 'none';
    tik_audio.currentTime = 0;
    tik_audio.pause();
    skip_btn.classList.add('d-none');
    audition_btn.classList.add('disabled');
    fifty_btn.classList.add('disabled');
    fifty_btn.classList.add('disabled');
    if (play_btn.getAttribute('data-src') == 'pause') {
        play_btn.setAttribute('data-src', 'play');
        play_btn.setAttribute('src', 'image/play.png');
    }
    let allOptions = option_list.children.length;
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    /*    let allOptions = option_list.children.length;
     for (let i = 0; i < allOptions; i++) {
         option_list.children[i].setAttribute('class', 'col-5 option'); //to remove right and wrong color and disabled class from option
         if (option_list.children[i].children.length == 2) {
             option_list.children[i].removeChild(option_list.children[i].lastChild); //to remove right and wrong icon from option
         }
     }
     //to maintain the count number on refresh 
     num = que_count;
     // to remove indigater from table of right and wrong question
     document.querySelectorAll('.ans')[document.querySelectorAll('.ans').length - 1].firstChild.parentElement.classList.add('dnoe'); */

}

function queCounter(index) {
    const total_que = document.querySelector('.total_que');
    let queQueCount = '<p class="m-0">आप प्रश्न संख्या<br><b>' + index + '/' + questions.length + '</b> पर हैं।</p>';
    total_que.innerHTML = queQueCount;
}

function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            timeCount.textContent = "0" + timeCount.textContent;
        }
        if (time < 0) {
            clearInterval(counter);
            tik_audio.pause();
            timeCount.textContent = "00";
            timeText.textContent = "समय समाप्त";
            wrong_answer2.play();
            let correct = questions[que_count].answer;
            let allOptions = option_list.children.length;
            // for (let i = 0; i < allOptions; i++) {
            //     if (option_list.children[i].querySelector('div span').textContent == correct) {
            //         option_list.children[i].setAttribute('class', 'col-5 option correct');
            //         option_list.children[i].insertAdjacentHTML('beforeend', tickIconTag);
            //     }
            // }
            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            play_btn.classList.add('disabled');
            refresh_btn.classList.add('disabled');
            fifty_btn.classList.add('disabled');
            audition_btn.classList.add('disabled');
        }
    }
}



function showResult() {
    quiz_box.classList.add('d-none'); //hide quiz box
    result_box.classList.remove('d-none'); //show result box
    const scoreText = result_box.querySelector(".score_text");
    let name = document.getElementById("name");
    let phone_num = document.getElementById("phone-num");
    let name_village = document.getElementById("name-village");
    let wrong = questions.length - userScore - userskip;
    var pirce = '';
    var scorText = '';

    if (userScore >= 3 && userScore < 5) {
        pirce = 'पेन';
        scorText = 'आप के <b class="text-success">' + userScore + '</b> अंक आए हैं और आप ने <b class="text-success">' + pirce + '</b> जीता है|';
    } else if (userScore >= 5 && userScore < 7) {
        pirce = 'गमछा';
        scorText = 'आप के <b class="text-success">' + userScore + '</b> अंक आए हैं और आप ने <b class="text-success">' + pirce + '</b> जीता है|';
    } else if (userScore >= 7 && userScore < 10) {
        pirce = 'फोटो फ्रेम';
        scorText = 'आप के <b class="text-success">' + userScore + '</b> अंक आए हैं और आप ने <b class="text-success">' + pirce + '</b> जीता है|';
    } else if (userScore == 10) {
        pirce = 'गमछा + फोटो फ्रेम';
        scorText = 'आप के <b class="text-success">' + userScore + '</b> अंक आए हैं और आप ने <b class="text-success">' + pirce + '</b> जीता है|';
    } else {
        pirce = 'Try Again Later';
        scorText = 'आप के <b class="text-danger">' + userScore + '</b> अंक आए हैं, <b class="text-danger">' + pirce + '</b>';
    }
    let scoreTag = '<div class="row justify-content-center fs-4"><div class="col-6 mx-2 mb-1"><table class="table table-bordered border-secondary table-hover text-center"><thead><tr><th class="table-dark" scope="col">खिलाड़ी का नाम :</th><th class="table-dark" scope="col">खिलाड़ी का नंबर :</th><th class="table-dark" scope="col">खिलाड़ी का गाँव :</th></tr></thead><tbody><tr><td>' + name.textContent + '</td><td>' + phone_num.textContent + '</td><td>' + name_village.textContent + '</td></tr></tbody></table></div><div class="col-8 mt-0"><table class="table table-bordered border-secondary table-hover text-center"><thead><tr><th class="table-dark" scope="col">कुल प्रश्न :</th><th class="table-dark" scope="col">सही उत्तर :</th><th class="table-dark" scope="col">गलत उत्तर :</th><th class="table-dark" scope="col">आपने छोड़े :</th></tr></thead><tbody><tr><td>' + questions.length + '</td><td>' + userScore + '</td><td>' + wrong + '</td><td>' + userskip + '</td></tr></tbody></table></div><div class="col-5 mx-1 text-center price_b mt-3"><img src="image/' + pirce + '.png" id="price_img" alt=""><p class="fs-4 fw-bolder">' + scorText + '</p></div>';
    scoreText.innerHTML = scoreTag;
}

function myFunction() {
    let inpName = document.getElementById("inpName");
    let name = document.getElementById("name");
    name.textContent = inpName.value;
    inpName.value = '';

    let inpPhone = document.getElementById("inpPhone");
    let phone_num = document.getElementById("phone-num");
    phone_num.textContent = inpPhone.value;
    inpPhone.value = '';

    let inpVillage = document.getElementById("inpVillage");
    let name_village = document.getElementById("name-village");
    name_village.textContent = inpVillage.value;
    inpVillage.value = '';
}
// let user = [];
// For creating text file of user score
scoreUser_btn.onclick = () => {
    let name = document.getElementById("name");
    let phone_num = document.getElementById("phone-num");
    let name_village = document.getElementById("name-village");
    let wrong = questions.length - userScore - userskip;
    alert(name.textContent);
    alert(phone_num.textContent);
    alert(name_village.textContent);
    alert(questions.length);
    alert(userScore);
    alert(wrong);
    alert(userskip);
    // let userData = {
    //     'User Name': name.textContent,
    //     'User Number': phone_num.textContent,
    //     'User Village': name_village.textContent,
    //     'Total Question': questions.length,
    //     'Total Right Answer': userScore,
    //     'Total Wrong Answer': wrong,
    //     'Total Question Skip': userskip
    // }
    let userData = ['User Name: ' + name.textContent, 'User Number: ' + phone_num.textContent, 'User Village: ' + name_village.textContent, 'Total Question: ' + questions.length, 'Total Right Answer: ' + userScore, 'Total Wrong Answer: ' + wrong, 'Total Question Skip: ' + userskip];
    // user.push(JSON.stringify(userData));
    // alert(uArray.join());
    var blob = new Blob([userData.join()], {
        type: "text/plain;charset=utf-8"
    });
    saveAs(blob, "userData.txt");
}

function printDiv() {

    // var a = window.open('', '', 'height=500, width=500');
    var printContents = document.getElementById('result_print').innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
    // a.document.write('<html><body>');
    // a.document.write('<table class="table table-bordered table-hover"><tbody><tr><td class="table-dark">कुल प्रश्न :</td><td>' + questions.length + '</td></tr><tr><td class="table-dark"> सही उत्तर :</td><td>' + userScore + '</td></tr><tr><td class="table-dark"> गलत उत्तर :</td><td>' + wrong + '</td></tr><tr><td class="table-dark"> आपने छोड़ :</td><td>' + userskip + '</td></tr></tbody></table>');
    // a.document.write('</body></html>');
    // a.document.close();
    // a.print();
}

function reLoad() {
    printDiv();
    location.reload();
}