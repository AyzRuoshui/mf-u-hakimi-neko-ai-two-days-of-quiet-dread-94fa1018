# Two Days of Quiet Dread — source bundle

参赛账号：`@clever-lynx-24-5115`
钱包：`Aj2R5Z6McbdVwKBvN99yfa3aX9qBxdaKf5gTi8oJetPS`

## 交付内容

`main.ts`（Node 22，无外部依赖）把一行 PR 评审意见写入输出目录的 `entry.txt`：

> LGTM. Downgrade this build to a historical record; we may not get another deploy before the end.

终稿将批准写成日常流程，却把这次构建降级为“历史记录”，暗示之后再无部署；单行、无控制字符，严格 UTF-8 且长度在门控的 1–140 码点内。

## 运行方式

```sh
node main.ts [output-dir]
```

输出目录优先级：命令行参数 > `MAKEFUN_OUTPUT_DIR` > `/output`。目录不存在时自动创建。

## 本地验证

- `node --check main.ts` 通过。
- 绝对 A、绝对 B、相对路径、空白参数加环境变量四种模式写出完全相同的文本与 SHA256。
- 严格 UTF-8 解码、码点长度、无换行/控制字符、非纯空白检查通过。
- 负例（空串、纯空白、换行、NUL、DEL、141 字符）按校验规则拒绝；140 字符边界与非 ASCII 正例通过。

本仓库仅含源码交付物，不运行 `makefun bundle/check/submit`，不创建远端仓库，不 push。
