import Phaser from "phaser";

export class NavigationMenu extends Phaser.GameObjects.Container {
  constructor(scene, x = 0, y = 0, modules) {
    super(scene, x, y);
    this.modules = modules;
    this.scene.add.existing(this);

    this.menuItems = [
      { icon: "team_icon", scene: "TeamScene" },
      { icon: "recruiter_icon", scene: "HiringScene" },
      { icon: "customer_icon", scene: "CustomerScene" },
      { icon: "backlog_icon", scene: "ProductBacklogScene" },
    ];

    this.createComponents();
    this.createEvents();
  }

  createComponents() {
    const scenes = this.menuItems.map(({ scene }) => scene);
    this.iconsObj = this.menuItems.reduce((acc, { icon, scene }, idx) => {
      return {
        ...acc,
        [icon]: this.scene.add
          .image(0, idx * 100, icon)
          .setScale(0.1)
          .setOrigin(0.5, 0)
          .setInteractive({ useHandCursor: true })
          .on("pointerdown", () => {
            this.handleClick(scene, scenes, icon);
          }),
      };
    }, {});
    this.add(Object.values(this.iconsObj));
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
  }

  handleClick(scene, scenes, icon) {
    this.notificationsObj[icon].setVisible(false);
    if (this.scene.scene.isActive(scene)) {
      this.scene.scene.stop(scene);
    } else {
      scenes.forEach((s) => {
        if (this.scene.scene.isActive(s)) {
          this.scene.scene.stop(s);
        }
      });

      this.scene.scene.launch(scene, {
        ...this.modules,
        onClose: () => {
          this.scene.scene.stop(scene);
        },
      });
    }
  }
}
