export class IndexView {
    private _btn_green: any;
    private _btn_red: any;
    private _btn_yellow: any;
    private _btn_blue: any;
    public in_game: boolean;

    constructor() {
        this._btn_green = this.getElement('green');
        this._btn_red = this.getElement('red');
        this._btn_yellow = this.getElement('yellow');
        this._btn_blue = this.getElement('blue');
        this._btn_green.style.pointerEvents = "none";
        this._btn_red.style.pointerEvents = "none";
        this._btn_yellow.style.pointerEvents = "none";
        this._btn_blue.style.pointerEvents = "none";
        this.in_game = false;
    }

    private getElement = (selector: string): HTMLElement | null => document.getElementById(selector);
    
    /* paint funtion */
    public paint_funtion(array_colors: Array<number>,speed_show: number) {
        //this.clean_button();
        this.in_game = false;
        this._btn_green.style.pointerEvents = "none";
        this._btn_red.style.pointerEvents = "none";
        this._btn_yellow.style.pointerEvents = "none";
        this._btn_blue.style.pointerEvents = "none";
        let seconds: number = 3;
        let count_div = document.getElementById("count_div");
        if (count_div != null) {
            count_div.style.display = "block";
        }
        const makeIteration = (): void => {
            if (seconds >= 0) {
                let time_count = document.getElementById("time_count");
                if (time_count != null) {
                    time_count.innerText = "00:0" + seconds;
                }
                setTimeout((makeIteration), 1000);
                if (seconds == 0) {
                    if (time_count != null) {
                        time_count.innerText = "GO!!";
                    }
                    this.paint_color(array_colors,speed_show);
                }
            }
            seconds -= 1;
        };
        setTimeout(makeIteration, 1000);
    }

    /* paint_color */
    public paint_color(array_colors: Array<number>,speed_show: number) {
        let posicion = 0;
        const button_color = setInterval(() => {
            let count_div = document.getElementById("count_div");
            if (count_div != null) {
                let time_count = document.getElementById("time_count");
                if (time_count != null) {
                    time_count.innerText = "";
                }
                count_div.style.display = "none";
            }
            this.clean_button();
            let audio: HTMLVideoElement;
            switch (array_colors[posicion++]) {
                case 0:
                    this._btn_green.classList.toggle('active_green');
                    audio = document.getElementById("simonSound1") as HTMLVideoElement ;
                    if (audio != null) {
                        audio.play();
                    };
                    setTimeout(() => {
                        this.clean_button();
                    }, speed_show);
                    break;

                case 1:
                    this._btn_red.classList.toggle('active_red');
                    audio = document.getElementById("simonSound2") as HTMLVideoElement ;
                    if (audio != null) {
                        audio.play();
                    };
                    setTimeout(() => {
                        this.clean_button();
                    }, speed_show);
                    break;

                case 2:
                    this._btn_yellow.classList.toggle('active_yellow');
                    audio = document.getElementById("simonSound3") as HTMLVideoElement ;
                    if (audio != null) {
                        audio.play();
                    };
                    setTimeout(() => {
                        this.clean_button();
                    }, speed_show);
                    break;

                case 3:
                    this._btn_blue.classList.toggle('active_blue');
                    audio = document.getElementById("simonSound4") as HTMLVideoElement ;
                    if (audio != null) {
                        audio.play();
                    };
                    setTimeout(() => {
                        this.clean_button();
                    }, speed_show);
                    break;
            
                default:
                    break;
            }
            if (posicion == array_colors.length) {
                clearInterval(button_color);
                setTimeout(() => {
                    this._btn_green.style.pointerEvents = "auto";
                    this._btn_red.style.pointerEvents = "auto";
                    this._btn_yellow.style.pointerEvents = "auto";
                    this._btn_blue.style.pointerEvents = "auto";
                    this.in_game = true;
                }, speed_show);
            }
        }, speed_show*1.2);
    }

    /* clean button colors */
    public clean_button() {
        this._btn_green.classList.remove('active_green');
        this._btn_red.classList.remove('active_red');
        this._btn_yellow.classList.remove('active_yellow');
        this._btn_blue.classList.remove('active_blue');
    }

    /* update table */
    public update_table(array_score: Array<Array<string>>) {
        let table_body = document.getElementById('table_score') as HTMLTableElement;
        if (table_body != null) {
            if (array_score.length > 0) {
                this.head_table(table_body);
                this.body_table(table_body,array_score);
            }
        }
    }

    /* head table */
    public head_table(table_body: HTMLTableElement) {
        let thead = table_body.createTHead();
        let row = thead.insertRow();
        let th_name = document.createElement("th");
        let th_score = document.createElement("th");
        let th_level = document.createElement("th");
        let text_name = document.createTextNode("Name");
        let text_score = document.createTextNode("Score");
        let text_level = document.createTextNode("Level");
        th_name.appendChild(text_name);
        th_score.appendChild(text_score);
        th_level.appendChild(text_level);
        row.appendChild(th_name);
        row.appendChild(th_score);
        row.appendChild(th_level);
    }

    /* body table */
    public body_table(table_body: HTMLTableElement,array_score: Array<Array<string>>) {
        array_score.forEach(element => {
            let row = table_body.insertRow();
            element.forEach(data => {
                let cell = row.insertCell();
                let text = document.createTextNode(data);
                cell.appendChild(text);
            });
        });
    }

    /* color_button */
    public color_button(number_button:number) {
        switch (number_button) {
            case 0:
                this._btn_green.classList.toggle('active_green');
                setTimeout(() => {
                    this.clean_button();
                }, 300);
                break;

            case 1:
                this._btn_red.classList.toggle('active_red');
                setTimeout(() => {
                    this.clean_button();
                }, 300);
                break;

            case 2:
                this._btn_yellow.classList.toggle('active_yellow');
                setTimeout(() => {
                    this.clean_button();
                }, 300);
                break;

            case 3:
                this._btn_blue.classList.toggle('active_blue');
                setTimeout(() => {
                    this.clean_button();
                }, 300);
                break;
        
            default:
                break;
        }
    }
}