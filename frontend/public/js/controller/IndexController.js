export class IndexController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.add_funtion_element();
        this.init_page();
        this.key_event();
    }
    /* add_funtion_element */
    add_funtion_element() {
        const start_game = document.getElementById('btn_star_game');
        const btn_div_start = document.getElementById('btn_div_start');
        start_game === null || start_game === void 0 ? void 0 : start_game.addEventListener('click', () => {
            if (btn_div_start != null) {
                btn_div_start.style.pointerEvents = "none";
            }
            let modal_level = document.getElementById("modal_choose_level");
            if (modal_level != null) {
                modal_level.style.display = "block";
            }
        });
        const buttons_color = Array.from(document.getElementsByClassName('sbtn'));
        buttons_color.forEach((element, i) => {
            element === null || element === void 0 ? void 0 : element.addEventListener('click', () => {
                this.model.validate_player_button(i);
                if (this.model.win_round == true) {
                    this.model.create_sequence();
                    this.view.paint_funtion(this.model.array_colors, this.model.level_time());
                }
            });
        });
        const submit_name = document.getElementById('submit');
        submit_name === null || submit_name === void 0 ? void 0 : submit_name.addEventListener('click', () => {
            this.model.submit_modal_win();
        });
        const submit_lose = document.getElementById('submit_lose');
        submit_lose === null || submit_lose === void 0 ? void 0 : submit_lose.addEventListener('click', () => {
            location.reload();
        });
        const buttons_level = Array.from(document.getElementsByClassName('level_game'));
        buttons_level.forEach((element) => {
            const button = element;
            element === null || element === void 0 ? void 0 : element.addEventListener('click', () => {
                this.model.level = button.value;
                let modal_level = document.getElementById("modal_choose_level");
                if (modal_level != null) {
                    modal_level.style.display = "none";
                }
                this.model.create_sequence();
                this.view.paint_funtion(this.model.array_colors, this.model.level_time());
            });
        });
    }
    /* key_event */
    key_event() {
        document.addEventListener('keydown', (event) => {
            var name = event.key;
            if (this.view.in_game == true && this.model.lose_round == false) {
                switch (name) {
                    case "q":
                        this.view.color_button(0);
                        this.model.validate_player_button(0);
                        if (this.model.win_round == true) {
                            this.model.create_sequence();
                            this.view.paint_funtion(this.model.array_colors, this.model.level_time());
                        }
                        break;
                    case "w":
                        this.view.color_button(1);
                        this.model.validate_player_button(1);
                        if (this.model.win_round == true) {
                            this.model.create_sequence();
                            this.view.paint_funtion(this.model.array_colors, this.model.level_time());
                        }
                        break;
                    case "a":
                        this.view.color_button(2);
                        this.model.validate_player_button(2);
                        if (this.model.win_round == true) {
                            this.model.create_sequence();
                            this.view.paint_funtion(this.model.array_colors, this.model.level_time());
                        }
                        break;
                    case "s":
                        this.view.color_button(3);
                        this.model.validate_player_button(3);
                        if (this.model.win_round == true) {
                            this.model.create_sequence();
                            this.view.paint_funtion(this.model.array_colors, this.model.level_time());
                        }
                        break;
                    default:
                        break;
                }
                ;
            }
        }, false);
    }
    /* init page */
    init_page() {
        this.view.update_table(this.model.array_score);
    }
}
