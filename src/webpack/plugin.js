const fs = require("fs-extra");
const path = require("path");
const CDN_PREFIX = "";
const distDir = path.resolve(__dirname, "./dist");
class CDNPlugin {
    constructor() {
        this.map = new Map();
    }
    
    apply(compiler) {
        compiler.hooks.emit.tap("CDNPlugin", async (compilation) => {
            const assets = compilation.getAssets();
            const CDN_URLS = [
                "https://www.baidu.com",
                "https://www.baidu.com",
                "https://www.baidu.com",
            ];
            const getCdnPrefix = (n) => {
                const len = CDN_URLS.length;
                const randomIndex = Math.floor(Math.random() * len);
                const randomItem = CDN_URLS[randomIndex];
                return `${randomItem}${n}`;
            };
            assets.forEach((asset) => {
                const name = asset.name;
                this.map.set(name, getCdnPrefix(name));
            });
        });
        compiler.hooks.done.tap("CDNPlugin", async () => {
            try {
                for (const [name] of this.map.entries()) {
                    if (/\.(html|js|css||json)$/g.test(name)) {
                        let content = await fs.readFile(
                            path.resolve(distDir, name),
                            "utf-8"
                        );
                        for (const [cdnName, cdn] of this.map.entries()) {
                            const keyword = new RegExp(
                                `${CDN_PREFIX}${cdnName}`,
                                "g"
                            );
                            content = content.replace(keyword, cdn);
                        }
                        await fs.writeFile(
                            path.resolve(distDir, name),
                            content
                        );
                    }
                }
            } catch (e) {
                console.log(`替换CDN出错`, e);
                process.exit(1);
            }
        });
    }
}
