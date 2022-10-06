export class IndexModel {
    public round:number;
    public array_colors: Array<number>;
    public player_position: number;
    public win_round: boolean;
    public lose_round: boolean;
    public array_score: Array<Array<string>>;
    public level: string;
    public type_win: number;
    public replace_table_index: number;
    public save_score: number;

    constructor() {
        this.array_score = [];
        if (localStorage.getItem('array_users_score') != null) {
            const arrar_localstorage = localStorage.getItem('array_users_score');
            if (arrar_localstorage != null) {
                const array_string = arrar_localstorage.split(",");
                for (let i = 0; i < array_string.length; i += 3) {
                    let array_user = [array_string[i],array_string[i+1],array_string[i+2]]
                    this.array_score.push(array_user);
                }
            }
        }
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
    public create_sequence(): void {
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
    public validate_player_button(number_button: number) {
        if (this.array_colors[this.player_position] == number_button) {
            this.sound_color(number_button);
            this.player_position += 1;
            if (this.player_position == this.array_colors.length) {
                this.round += 1;
                this.win_round = true;
            }
        } else {
            let audio: HTMLVideoElement;
            audio = document.getElementById("soundError") as HTMLVideoElement ;
                if (audio != null) {
                    audio.play();
            };
            this.lose_round = true;
            this.validate_score(this.round);
            this.round = 0;
            this.array_colors = [];
            const btn_div_start = document.getElementById('btn_div_start');
            if(btn_div_start != null) {
                btn_div_start.style.pointerEvents = "auto";
            }
        }
    }

    /* sound_color */
    public sound_color(number_button_color: number) {
        let audio: HTMLVideoElement;
        switch (number_button_color) {
            case 0:
                audio = document.getElementById("simonSound1") as HTMLVideoElement ;
                if (audio != null) {
                    audio.play();
                };
                break;

            case 1:
                audio = document.getElementById("simonSound2") as HTMLVideoElement ;
                if (audio != null) {
                    audio.play();
                };
                break;

            case 2:
                audio = document.getElementById("simonSound3") as HTMLVideoElement ;
                if (audio != null) {
                    audio.play();
                };
                break;

            case 3:
                audio = document.getElementById("simonSound4") as HTMLVideoElement ;
                if (audio != null) {
                    audio.play();
                };
                break;
        
            default:
                break;
        }
    }

    /* difficulty level and time */
    public level_time() :number{
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
    public validate_score(score: number) {
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
                    if (index == this.array_score.length - 1){
                        if (modal_win != null) {
                            modal_win.style.display = "block";
                        }
                        this.type_win = 1;
                        this.save_score = score;
                        break;
                    }
                } else if (this.array_score.length == 10){
                    const element = this.array_score[index];
                    if (parseInt(element[1], 10) < score) {
                        if (modal_win != null) {
                            modal_win.style.display = "block";
                        }
                        this.type_win = 3;
                        this.replace_table_index = index;
                        this.save_score = score;
                        break;
                    } else if(index == 9){
                        if (modal_lose != null) {
                            modal_lose.style.display = "block";
                        }
                    }
                } 
            }
        } else {
            if (modal_win != null) {
                modal_win.style.display = "block";
            }
            this.type_win = 1;
            this.save_score = score;
        }
        
        
    }

    /* submit modal win  */
    public submit_modal_win() {
        let name = document.getElementById("name") as HTMLInputElement;
        let error_message = document.getElementById("error_name_top_10");
        if (error_message != null) {
            error_message.style.display = "none";
        };
        if (name.value != "") {
            let array_user = [name.value,this.save_score.toString(),this.level];
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
            localStorage.setItem('array_users_score',this.array_score.toString());
            location.reload();
        } else{
            if (error_message != null) {
                error_message.style.display = "block";
            };
        }
    }

    /* get name for table score */
    public get_name_table_score() :string{
        let name = document.getElementById("name") as HTMLInputElement;
        return name.value;
    }

}

