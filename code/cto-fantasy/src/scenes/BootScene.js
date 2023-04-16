import Phaser from "phaser";
import * as theme from "../theme";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  init() {
    this.centreX = this.cameras.main.width / 2;
    this.centreY = this.cameras.main.height / 2;
  }

  // load assets
  preload() {
    this.createGameTitle();
    this.createProgressBar();
    this.loadAssets();
  }

  createGameTitle() {
    var title = this.make.text({
      x: this.centreX,
      y: this.centreY - 220,
      text: "Project Genesis",
      style: theme.header,
    });
    title.setOrigin(0.5, 0.5);

    var subtitle = this.make.text({
      x: this.centreX,
      y: this.centreY - 180,
      text: "A software development sim",
      style: theme.mainText,
    });
    subtitle.setOrigin(0.5, 0.5);
  }

  createProgressBar() {
    const width = 320;
    const height = 50;
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(
      this.centreX - width / 2,
      this.centreY - 140,
      width,
      height
    );

    const loadingText = this.make.text({
      x: this.centreX,
      y: this.centreY - 50,
      text: "Loading...",
      style: theme.mainText,
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: this.centreX,
      y: this.centreY - 5,
      text: "0%",
      style: theme.mainText,
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: this.centreX,
      y: this.centreY + 50,
      text: "",
      style: theme.mediumText,
    });

    assetText.setOrigin(0.5, 0.5);

    this.load.on("progress", (value) => {
      percentText.setText(parseInt(value * 100) + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(
        this.centreX - width / 2 + 10,
        this.centreY - 130,
        300 * value,
        30
      );
    });

    this.load.on("fileprogress", (file) => {
      assetText.setText("Loading: " + file.key);
    });

    this.load.on("complete", () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });
  }

  loadAssets() {
    this.load.html("card", "assets/forms/card.html");
    this.load.html("form", "assets/forms/form.html");
    this.load.html("button", "assets/forms/button.html");
    this.load.html("login", "assets/forms/login.html");
    this.load.html("event", "assets/forms/event.html");
    this.load.image("button", "assets/UIpack/PNG/blue_button00.png");
    this.load.image("button_hover", "assets/UIpack/PNG/blue_button01.png");
    this.load.image("button_click", "assets/UIpack/PNG/blue_button02.png");
    this.load.image("card", "assets/card.png");
    this.load.image("office", "assets/vecteezy/3d-floor-plan.png");
    this.load.image("close_icon", "assets/UIpack/PNG/red_boxCross.png");
    this.load.image("complete_icon", "assets/UIpack/PNG/red_boxCheckmark.png");
    this.load.image("team_icon", "assets/freepik/teamwork/005-team-2.png");
    this.load.image(
      "recruiter_icon",
      "assets/freepik/job-resume/029-headhunter.png"
    );
    this.load.image(
      "customer_icon",
      "assets/freepik/teamwork/059-conversation.png"
    );
    this.load.image("backlog_icon", "assets/freepik/backlog.png");
    this.load.image(
      "attributes_icon",
      "assets/freepik/teamwork/015-trophy.png"
    );
    this.load.image(
      "information_icon",
      "assets/freepik/information-button.png"
    );
    this.load.image("teach_icon", "assets/teach.png");
    this.load.image("mid_grey", "assets/px/px666666.png");
    this.load.image("down_arrow", "assets/UIpack/PNG/grey_arrowDownWhite.png");
    this.load.image("up_arrow", "assets/UIpack/PNG/grey_arrowUpWhite.png");
    this.load.image("top_arrow", "assets/top_arrow.png");
    this.load.image("notification", "assets/UIpack/PNG/red_circle.png");

    this.load.image(
      "customer_satisfied",
      "assets/freepik/customer/042-smile.png"
    );
    this.load.image(
      "customer_neutral",
      "assets/freepik/customer/010-contempt.png"
    );
    this.load.image(
      "customer_dissatisfied",
      "assets/freepik/customer/037-suspicious.png"
    );
  }

  // executed once, after assets were loaded
  create() {
    this.createNameEntry();
  }

  createNameEntry() {
    this.form = this.add
      .dom(this.centreX, this.centreY + 200)
      .createFromCache("login")
      .setOrigin(0.5, 0.5);

    this.form.addListener("click");

    this.form.on("click", (event) => {
      if (event.target.name === "submit") {
        const name = this.form.getChildByName("name");
        if (name.value !== "") {
          this.form.removeListener("click");
          this.handleSubmit(name.value);
        }
      }
    });
  }

  handleSubmit(text) {
    this.registry.set("name", text);
    this.scene.start("VacanciesScene");
  }
}
