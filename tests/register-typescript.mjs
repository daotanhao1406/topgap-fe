import { existsSync } from "node:fs";
import { registerHooks } from "node:module";
import { readFileSync } from "node:fs";
import { readFileSync } from "node:fs";

// Node can execute erasable TypeScript. Resolve the extensionless imports used by Next.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith(".") && context.parentURL?.endsWith(".ts")) {
      const url = new URL(`${specifier}.ts`, context.parentURL);
      if (existsSync(url)) return nextResolve(url.href, context);
    }
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url.endsWith(".ts")) {
      return {
        format: "module-typescript",
        source: readFileSync(new URL(url), "utf8"),
        shortCircuit: true,
      };
    }
    return nextLoad(url, context);
  },
  load(url, context, nextLoad) {
    if (url.endsWith(".ts")) {
      return {
        format: "module-typescript",
        source: readFileSync(new URL(url), "utf8"),
        shortCircuit: true,
      };
    }
    return nextLoad(url, context);
  },
});
