export class Team {
  members = [];

  add(member) {
    this.members.push(member);
  }

  remove(member) {
    this.members = this.members.filter((m) => m !== member);
  }

  getAverageStat(property) {
    return (
      this.members.reduce((acc, m) => acc + m[property], 0) /
      this.members.length
    );
  }

  get skill() {
    return this.getAverageStat("skill");
  }

  get happiness() {
    return this.getAverageStat("happiness");
  }

  get qualityMindset() {
    return this.getAverageStat("qualityMindset");
  }

  get collaboration() {
    return this.getAverageStat("collaboration");
  }

  get psychologicalSafety() {
    return this.getAverageStat("psychologicalSafety");
  }

  get size() {
    return this.members.length;
  }
}