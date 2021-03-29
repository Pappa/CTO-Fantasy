import Phaser from "phaser";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  init() {}

  // load assets
  preload() {
    this.createGameTitle();
    this.createProgressBar();
    this.loadAssets();
  }

  createGameTitle() {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var title = this.make.text({
      x: width / 2,
      y: height / 2 - 220,
      text: "Project Genesis",
      style: {
        font: "24px monospace",
        fill: "#ffffff",
      },
    });
    title.setOrigin(0.5, 0.5);

    var subtitle = this.make.text({
      x: width / 2,
      y: height / 2 - 180,
      text: "A software development fantasy",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    subtitle.setOrigin(0.5, 0.5);
  }

  createProgressBar() {
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff",
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: "",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });

    assetText.setOrigin(0.5, 0.5);

    this.load.on("progress", function (value) {
      percentText.setText(parseInt(value * 100) + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on("fileprogress", function (file) {
      assetText.setText("Loading asset: " + file.key);
    });

    this.load.on("complete", function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });
  }

  loadAssets() {
    this.load.html("joinform", "assets/forms/join.html");
    this.load.html("card", "assets/forms/card.html");
    this.load.html("event", "assets/forms/event.html");
    this.load.html("results", "assets/forms/results.html");
    this.load.image("button", "assets/UIpack/PNG/blue_button00.png");
    this.load.image("button_hover", "assets/UIpack/PNG/blue_button01.png");
    this.load.image("button_click", "assets/UIpack/PNG/blue_button02.png");
    this.load.image("card", "assets/card.png");
    this.load.image("office", "assets/not-free/office.png");
  }

  // executed once, after assets were loaded
  create() {
    this.form = this.add.dom(400, 300).createFromCache("joinform");
    this.form.setOrigin(0.5);
    this.form.setPerspective(800);
    this.form.addListener("click");

    this.form.on("click", this.handleSubmit, this);
  }

  handleSubmit(event) {
    if (event.target.id === "start") {
      const name = this.form.getChildByID("name");
      if (name.value !== "") {
        this.form.removeListener("click");
        this.form.setVisible(false);
        this.registry.set("name", name.value);
        this.scene.start("VacanciesScene");
      }
    }
  }
}
