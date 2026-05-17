import { describe, it, expect } from "vitest";
import {
  generateContentHash,
  isHighlightStale,
  getContentText,
} from "@/lib/contentHash";

describe("contentHash", () => {
  describe("generateContentHash", () => {
    it("should generate a hash string", async () => {
      const hash = await generateContentHash("test content");
      expect(typeof hash).toBe("string");
      expect(hash.length).toBeGreaterThan(0);
    });

    it("should generate consistent hashes for same content", async () => {
      const content = "hello world";
      const hash1 = await generateContentHash(content);
      const hash2 = await generateContentHash(content);
      expect(hash1).toBe(hash2);
    });

    it("should generate different hashes for different content", async () => {
      const hash1 = await generateContentHash("content a");
      const hash2 = await generateContentHash("content b");
      expect(hash1).not.toBe(hash2);
    });

    it("should handle empty string", async () => {
      const hash = await generateContentHash("");
      expect(typeof hash).toBe("string");
    });

    it("should handle unicode content", async () => {
      const hash = await generateContentHash("こんにちは 🎉");
      expect(typeof hash).toBe("string");
      expect(hash.length).toBeGreaterThan(0);
    });
  });

  describe("isHighlightStale", () => {
    it("should return false when hashes match", () => {
      const hash = "abc123";
      expect(isHighlightStale(hash, hash)).toBe(false);
    });

    it("should return true when hashes differ", () => {
      expect(isHighlightStale("hash1", "hash2")).toBe(true);
    });

    it("should return false when highlight hash is undefined", () => {
      expect(isHighlightStale(undefined, "currentHash")).toBe(false);
    });

    it("should return false when both hashes are empty", () => {
      expect(isHighlightStale("", "")).toBe(false);
    });
  });

  describe("getContentText", () => {
    it("should extract text content from element", () => {
      const div = document.createElement("div");
      div.innerHTML = "<p>Hello</p><span>World</span>";
      expect(getContentText(div)).toBe("HelloWorld");
    });

    it("should return empty string for empty element", () => {
      const div = document.createElement("div");
      expect(getContentText(div)).toBe("");
    });

    it("should handle nested elements", () => {
      const div = document.createElement("div");
      div.innerHTML = "<div><p><span>Deep</span></p></div> nested";
      expect(getContentText(div)).toBe("Deep nested");
    });
  });
});
