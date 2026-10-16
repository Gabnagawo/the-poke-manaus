// Gera o site estático em .next-export/
// Uso: node scripts/exportar.mjs
import { execSync } from "node:child_process";
import { copyFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const SAIDA = ".next-export";

execSync("npx next build", { stdio: "inherit", env: { ...process.env, EXPORTAR: "1" } });

let copiados = 0;
const percorrer = (dir) => {
  for (const nome of readdirSync(dir)) {
    const caminho = join(dir, nome);
    if (!statSync(caminho).isDirectory()) continue;
    if (nome.startsWith("__next.")) {
      for (const arquivo of readdirSync(caminho)) {
        const origem = join(caminho, arquivo);
        if (statSync(origem).isFile()) {
          copyFileSync(origem, join(dir, `${nome}.${arquivo}`));
          copiados++;
        }
      }
    }
    if (nome !== "_next" && nome !== "media") percorrer(caminho);
  }
};
percorrer(SAIDA);
console.log(`\nExport estático pronto em ${SAIDA}/ (${copiados} segmentos de prefetch ajustados).`);
