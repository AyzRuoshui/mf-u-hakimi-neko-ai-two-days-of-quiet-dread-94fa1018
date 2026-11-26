import * as fs from "node:fs";
import * as path from "node:path";

// 一行 PR 评审意见：批准要像日常流程，恐惧藏在把构建降级为“历史记录”的平静措辞里。
const ENTRY = "LGTM. Downgrade this build to a historical record; we may not get another deploy before the end.";

/**
 * 按赛事约定解析输出目录：命令行参数优先，其次是 MAKEFUN_OUTPUT_DIR，最后回退到 /output。
 */
function outputDirectory(argv, env) {
  const fromArg = argv[0];
  if (typeof fromArg === "string" && fromArg.trim().length > 0) {
    return fromArg;
  }
  const fromEnv = env.MAKEFUN_OUTPUT_DIR;
  if (typeof fromEnv === "string" && fromEnv.trim().length > 0) {
    return fromEnv;
  }
  return "/output";
}

/**
 * 严格校验终稿：UTF-8 文本、1–140 个 Unicode 码点、非纯空白、单行且无控制字符。
 */
function validateEntry(value) {
  const points = Array.from(value);
  if (points.length < 1 || points.length > 140) {
    throw new Error(`entry length ${points.length} is outside 1..140`);
  }
  if (value.trim().length === 0) {
    throw new Error("entry is blank");
  }
  if (/[\r\n\u0000-\u001f\u007f]/.test(value)) {
    throw new Error("entry contains a line break or control character");
  }
}

function main() {
  validateEntry(ENTRY);
  const directory = outputDirectory(process.argv.slice(2), process.env);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, "entry.txt"), ENTRY, {
    encoding: "utf8",
    flag: "w",
  });
}

main();
