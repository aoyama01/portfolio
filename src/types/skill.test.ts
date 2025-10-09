import { SKILL_LEVELS, type SkillLevelDefinition } from "./skill";

describe("SKILL_LEVELS", () => {
  it("全てのレベル（1-5）が定義されている", () => {
    expect(SKILL_LEVELS[1]).toBeDefined();
    expect(SKILL_LEVELS[2]).toBeDefined();
    expect(SKILL_LEVELS[3]).toBeDefined();
    expect(SKILL_LEVELS[4]).toBeDefined();
    expect(SKILL_LEVELS[5]).toBeDefined();
  });

  it("各レベルにlevel、label、descriptionが含まれる", () => {
    const levels: SkillLevelDefinition[] = [
      SKILL_LEVELS[1],
      SKILL_LEVELS[2],
      SKILL_LEVELS[3],
      SKILL_LEVELS[4],
      SKILL_LEVELS[5],
    ];

    levels.forEach((levelDef) => {
      expect(levelDef).toHaveProperty("level");
      expect(levelDef).toHaveProperty("label");
      expect(levelDef).toHaveProperty("description");
    });
  });

  it("criteriaプロパティが存在しない", () => {
    const levels: SkillLevelDefinition[] = [
      SKILL_LEVELS[1],
      SKILL_LEVELS[2],
      SKILL_LEVELS[3],
      SKILL_LEVELS[4],
      SKILL_LEVELS[5],
    ];

    levels.forEach((levelDef) => {
      expect(levelDef).not.toHaveProperty("criteria");
    });
  });

  it("レベル1は「入門」である", () => {
    expect(SKILL_LEVELS[1].label).toBe("入門");
  });

  it("レベル5は「エキスパート」である", () => {
    expect(SKILL_LEVELS[5].label).toBe("エキスパート");
  });

  it("各レベルのdescriptionが空でない", () => {
    const levels: SkillLevelDefinition[] = [
      SKILL_LEVELS[1],
      SKILL_LEVELS[2],
      SKILL_LEVELS[3],
      SKILL_LEVELS[4],
      SKILL_LEVELS[5],
    ];

    levels.forEach((levelDef) => {
      expect(levelDef.description).toBeTruthy();
      expect(levelDef.description.length).toBeGreaterThan(0);
    });
  });
});
