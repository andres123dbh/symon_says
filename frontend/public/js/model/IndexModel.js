var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class IndexModel {
    constructor() {
        this.array_score = [];
        this.round = 0;
        this.array_colors = [];
        this.player_position = 0;
        this.win_round = false;
        this.lose_round = false;
        this.level = "hard";
        this.type_win = 0;
        this.replace_table_index = -1;
        this.save_score = 0;
    }
    /* create sequence of color */
    create_sequence() {
        this.win_round = false;
        this.lose_round = false;
        this.array_colors = [];
        for (let index = 0; index <= this.round; index++) {
            this.player_position = 0;
            let number_random = Math.floor(Math.random() * 4);
            this.array_colors.push(number_random);
        }
    }
    /* validate button touched by player */
    validate_player_button(number_button) {
        if (this.array_colors[this.player_position] == number_button) {
            this.sound_color(number_button);
            this.player_position += 1;
            if (this.player_position == this.array_colors.length) {
                this.round += 1;
                this.win_round = true;
            }
        }
        else {
            let audio;
            audio = document.getElementById("soundError");
            if (audio != null) {
                audio.play();
            }
            ;
            this.lose_round = true;
            this.validate_score(this.round);
            this.round = 0;
            this.array_colors = [];
            const btn_div_start = document.getElementById('btn_div_start');
            if (btn_div_start != null) {
                btn_div_start.style.pointerEvents = "auto";
            }
        }
    }
    /* sound_color */
    sound_color(number_button_color) {
        let audio;
        switch (number_button_color) {
            case 0:
                audio = document.getElementById("simonSound1");
                if (audio != null) {
                    audio.play();
                }
                ;
                break;
            case 1:
                audio = document.getElementById("simonSound2");
                if (audio != null) {
                    audio.play();
                }
                ;
                break;
            case 2:
                audio = document.getElementById("simonSound3");
                if (audio != null) {
                    audio.play();
                }
                ;
                break;
            case 3:
                audio = document.getElementById("simonSound4");
                if (audio != null) {
                    audio.play();
                }
                ;
                break;
            default:
                break;
        }
    }
    /* difficulty level and time */
    level_time() {
        let time = 0;
        switch (this.level) {
            case "easy":
                time = 1500;
                break;
            case "normal":
                time = 1000;
                break;
            case "hard":
                time = 500;
                break;
            default:
                break;
        }
        return time;
    }
    /* validate score */
    validate_score(score) {
        let modal_win = document.getElementById("modal_win");
        let modal_lose = document.getElementById("modal_lose");
        if (this.array_score.length > 0) {
            for (let index = 0; index < this.array_score.length; index++) {
                if (this.array_score.length < 10) {
                    const element = this.array_score[index];
                    if (parseInt(element[1], 10) < score) {
                        if (modal_win != null) {
                            modal_win.style.display = "block";
                        }
                        this.type_win = 2;
                        this.replace_table_index = index;
                        this.save_score = score;
                        break;
                    }
                    if (index == this.array_score.length - 1) {
                        if (modal_win != null) {
                            modal_win.style.display = "block";
                        }
                        this.type_win = 1;
                        this.save_score = score;
                        break;
                    }
                }
                else if (this.array_score.length == 10) {
                    const element = this.array_score[index];
                    if (parseInt(element[1], 10) < score) {
                        if (modal_win != null) {
                            modal_win.style.display = "block";
                        }
                        this.type_win = 3;
                        this.replace_table_index = index;
                        this.save_score = score;
                        break;
                    }
                    else if (index == 9) {
                        if (modal_lose != null) {
                            modal_lose.style.display = "block";
                        }
                    }
                }
            }
        }
        else {
            if (modal_win != null) {
                modal_win.style.display = "block";
            }
            this.type_win = 1;
            this.save_score = score;
        }
    }
    /* submit modal win  */
    submit_modal_win() {
        let name = document.getElementById("name");
        let error_message = document.getElementById("error_name_top_10");
        if (error_message != null) {
            error_message.style.display = "none";
        }
        ;
        if (name.value != "") {
            let array_user = [name.value, this.save_score.toString(), this.level];
            switch (this.type_win) {
                case 1:
                    this.array_score.push(array_user);
                    break;
                case 2:
                    this.array_score.splice(this.replace_table_index, 0, array_user);
                    break;
                case 3:
                    this.array_score.splice(this.replace_table_index, 0, array_user);
                    this.array_score.pop();
                    break;
                default:
                    break;
            }
            this.convertToJSON();
        }
        else {
            if (error_message != null) {
                error_message.style.display = "block";
            }
            ;
        }
    }
    /* get name for table score */
    get_name_table_score() {
        let name = document.getElementById("name");
        return name.value;
    }
    /* get score */
    getScoreAPI() {
        return __awaiter(this, void 0, void 0, function* () {
            let scores = { error: false, scores: [] };
            try {
                const response = yield fetch("http://127.0.0.1:1802/getTableScore");
                scores = (yield response.json());
            }
            catch (e) {
                console.log(e);
            }
            var obj = JSON.parse(JSON.stringify(scores.scores));
            let array_temp;
            array_temp = [];
            for (var i in obj) {
                let array_user = [obj[i].name, obj[i].score, obj[i].difficulty];
                array_temp.push(array_user);
            }
            return array_temp;
        });
    }
    convertToJSON() {
        let array_tem = [];
        this.array_score.forEach(element => {
            array_tem.push({ name: element[0].toString(), score: element[1].toString(), difficulty: element[2].toString() });
        });
        // this.saveScore(array_tem);
        (() => __awaiter(this, void 0, void 0, function* () {
            const users = yield this.saveScore(array_tem);
            location.reload();
        }))();
    }
    saveScore(array_post) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let body = { score: array_post };
                const response = yield fetch("http://127.0.0.1:1802/postSaveScore", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }).then((response) => response.json())
                    .then((data) => {
                    console.log('Success:', data);
                })
                    .catch((error) => {
                    console.error('Error:', error);
                });
                ;
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
