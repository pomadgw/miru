import Dependency from "../src/dep";

describe("Miru", () => {
  describe("Dependency", () => {
    test("empty subscribers", () => {
      const dep = new Dependency();

      dep.createEmptySubscribes('test');
      expect(dep.subscribers['test'].length).toBe(0);
    });

    test("add depend subscribers", () => {
      const dep = new Dependency();

      expect(Dependency.target).not.toBe("target");

      Dependency.target = 'target';
      dep.createEmptySubscribes('target');
      expect(Dependency.target).toBe('target');

      expect(dep.deps.has("target")).toBeFalsy();

      dep.depend("test");

      expect(Dependency.target).toBe('target');
      expect(dep.deps.has('target')).toBeTruthy();

      expect(dep.subscribers["target"].includes("test")).toBeTruthy();

      dep.depend("test");
      expect(dep.subscribers["target"].filter(e => e === 'test').length).toBe(1);
    });

    test("not adding depend subscribers if target is not defined", () => {
      Dependency.target = null;
      const dep = new Dependency();

      dep.depend("test");
      expect(dep.deps.has("target")).toBeFalsy();
      expect(dep.subscribers["target"]).toBeUndefined();
    });
  });
});
