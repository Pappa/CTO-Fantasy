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
      text: "A software development fantasy",
      style: theme.mainText,
    });
    subtitle.setOrigin(0.5, 0.5);
  }

  createProgressBar() {
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const loadingText = this.add.text({
      x: this.centreX,
      y: this.centreY - 50,
      text: "Loading...",
      style: theme.mainText,
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.add.text({
      x: this.centreX,
      y: this.centreY - 5,
      text: "0%",
      style: theme.mainText,
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.add.text({
      x: this.centreX,
      y: this.centreY + 50,
      text: "",
      style: theme.mainText,
    });

    assetText.setOrigin(0.5, 0.5);

    this.load.on("progress", (value) => {
      percentText.setText(parseInt(value * 100) + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on("fileprogress", (file) => {
      assetText.setText("Loading asset: " + file.key);
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
    this.load.html("button", "assets/forms/button.html");
    this.load.html("estimate_input", "assets/forms/estimate_input.html");
    this.load.html("event", "assets/forms/event.html");
    this.load.image("button", "assets/UIpack/PNG/blue_button00.png");
    this.load.image("button_hover", "assets/UIpack/PNG/blue_button01.png");
    this.load.image("button_click", "assets/UIpack/PNG/blue_button02.png");
    this.load.image("card", "assets/card.png");
    this.load.image("office", "assets/not-free/office.png");
    this.load.image("close_icon", "assets/UIpack/PNG/red_boxCross.png");
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
    this.load.image("mid_grey", "assets/px/px666666.png");
    this.load.image("down_arrow", "assets/UIpack/PNG/grey_arrowDownWhite.png");
    this.load.image("up_arrow", "assets/UIpack/PNG/grey_arrowUpWhite.png");
  }

  // executed once, after assets were loaded
  create() {
    this.createNameEntry();
  }

  createNameEntry() {
    const LOWER = "abcdefghijklmnopqrstuvwxyz";
    const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.make
      .text({
        x: this.centreX,
        y: this.centreY,
        text: "Enter your name:",
        style: theme.mainText,
      })
      .setOrigin(0.5, 0.5);

    const textEntry = this.make
      .text({
        x: this.centreX,
        y: this.centreY + 30,
        text: "",
        style: {
          ...theme.mainText,
          fill: "#ffff00",
        },
      })
      .setOrigin(0.5, 0.5);

    this.input.keyboard.on("keydown", (event) => {
      if (UPPER.includes(event.key) || LOWER.includes(event.key)) {
        textEntry.text += event.key;
      }
      if (event.key === "Enter") {
        this.handleSubmit(textEntry.text);
      }
    });
  }

  handleSubmit(text) {
    this.registry.set("name", text);
    this.scene.start("VacanciesScene");
  }
}
