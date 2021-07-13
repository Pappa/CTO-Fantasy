import Phaser from "phaser";
import * as theme from "../theme";

export class NavigationMenu extends Phaser.GameObjects.Container {
  constructor(scene, x = 0, y = 0, modules) {
    super(scene, x, y);
    this.modules = modules;
    this.scene.add.existing(this);

    this.menuItems = [
      { icon: "team_icon", text: "Team", scene: "TeamScene" },
      { icon: "recruiter_icon", text: "Recruiter", scene: "HiringScene" },
      { icon: "customer_icon", text: "Customer", scene: "CustomerScene" },
      { icon: "backlog_icon", text: "Backlog", scene: "ProductBacklogScene" },
      {
        icon: "attributes_icon",
        text: "Practices",
        scene: "AttributesScene",
      },
    ];

    this.createComponents();
    this.createEvents();
  }

  createComponents() {
    this.icons = this.menuItems.map(({ icon, scene }, idx) => {
      return this.scene.add
        .image(0, idx * 100, icon)
        .setScale(0.1)
        .setOrigin(0.5, 0)
        .setInteractive({ useHandCursor: true })
        .on("pointerdown", () => {
          this.handleClick(scene, icon);
        });
    });
    this.add(this.icons);
    this.textLabels = this.menuItems.map(({ text, icon, scene }, idx) => {
      return this.scene.make
        .text({
          x: 0,
          y: idx * 100 + 65,
          text,
          style: theme.mediumText,
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on("pointerdown", () => {
          this.handleClick(scene, icon);
        });
    });
    this.add(this.textLabels);
    this.notificationsObj = this.menuItems.reduce(
      (acc, { icon, scene }, idx) => {
        return {
          ...acc,
          [icon]: this.scene.add
            .image(25, idx * 100 - 10, "notification")
            .setScale(0.5)
            .setOrigin(0.5)
            .setAlpha(0.8)
            .setVisible(false),
        };
      },
      {}
    );
    this.notifications = Object.values(this.notificationsObj);
    this.notifications.forEach((notification) => {
      this.scene.tweens.add({
        targets: notification,
        scale: 0.6,
        ease: "Cubic.easeIn",
        duration: 400,
        hold: 100,
        yoyo: true,
        repeat: -1,
      });
    });
    this.add(this.notifications);
  }

  createEvents() {
    this.modules.emitter.on("customer_priorities_updated", (priorities) => {
      this.notificationsObj["customer_icon"].setVisible(true);
    });

    this.modules.emitter.on("team_updated", () => {
      this.notificationsObj["team_icon"].setVisible(true);
    });

    this.modules.emitter.on("sprint_ended", () => {
      this.notificationsObj["recruiter_icon"].setVisible(true);
    });

    this.modules.emitter.on("stats_updated", () => {
      this.notificationsObj["attributes_icon"].setVisible(true);
    });

    this.modules.emitter.on("SprintScene_enter", () => {
      this.disable();
    });

    this.modules.emitter.on("SprintScene_exit", () => {
      this.enable();
    });
  }

  handleClick(scene, icon) {
    this.notificationsObj[icon].setVisible(false);
    this.disable();

    this.scene.scene.launch(scene, {
      ...this.modules,
      onClose: () => {
        this.scene.scene.stop(scene);
        this.enable();
      },
    });
  }

  enable() {
    this.icons.forEach((icon) => icon.setInteractive());
    this.textLabels.forEach((icon) => icon.setInteractive());
  }

  disable() {
    this.icons.forEach((icon) => icon.disableInteractive());
    this.textLabels.forEach((icon) => icon.disableInteractive());
  }
}
