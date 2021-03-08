export class LinearStory {
  story = [];
  constructor(chapters = [], delay = 1000) {
    if (!this.isValid(chapters)) {
      throw new Error("LinearStory expects an array of Chapters");
    }
    this.delay = delay;
    this.story = chapters;
  }

  add(chapter) {
    if (!this.isValid([chapter])) {
      throw new Error("add expects a Chapters");
    }
    this.story.push(chapter);
  }

  play() {
    console.log("play", this.story.length);
    if (this.story.length) {
      const chapter = this.story.shift();
      chapter.start(chapter.data, (result) => {
        !!chapter.complete && chapter.complete(result);
        setTimeout(() => {
          console.log("setTimeout");
          this.play();
        }, this.delay);
      });
    }
  }

  isValid(chapters) {
    return true;
    //return chapters.every((chapter) => chapter instanceof Chapter);
  }
}
