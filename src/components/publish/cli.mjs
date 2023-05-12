import ora from "ora";
import { program } from "commander";
import chalk from "chalk";
import simpleGit from "simple-git";
import { ENV_MAP, PUB_BRANCH_MAP } from "./config.js";
const git = simpleGit();
const spinner = ora({
  text: "",
  color: "white",
});
const pubTestEnv = async (env, showLog) => {
  spinner.start("Operate git...");
  // check working tree status
  const workingTreeStatus = await git.status(["--porcelain"]);
  const { modified = [], staged = [] } = workingTreeStatus;
  if (modified.length > 0) {
    spinner.stop();
    console.log(
      chalk.red(
        "\nGit-Changes not staged for commit,please to add and commit or stash it:"
      )
    );
    console.log(chalk.red(modified.join("\n")));
    return;
  }
  if (staged.length > 0) {
    spinner.stop();
    console.log(
      chalk.red("\nGit -Changes to be committed,please to commit or stash it:")
    );
    console.log(chalk.red(staged.join("\n")));
    return;
  }
  const currBranchName = await git.revparse(["--abbrev-ref", "HEAD"]);
  const pubBranchName = PUB_BRANCH_MAP[env];
  if (currBranchName !== pubBranchName) {
    try {
      await git.checkout(pubBranchName);
      await git.pull("origin", pubBranchName);
      await git.mergeFromTo(currBranchName, pubBranchName);
      await git.push("origin", pubBranchName);
    } catch (e) {
      git.checkout(currBranchName);
      spinner.stop();
      console.log(
        chalk.bgRed.white(
          `0ops！ 合井开发分支 ${currBranchName}到 ${pubBranchName} 失败，请手动解决冲突`
        )
      );
      throw e;
    }
  } else {
    await git.pull("origin", pubBranchName);
    await git.push("origin", pubBranchName);
  }
  try {
    git.checkout(currBranchName);
  } catch (e) {
    throw e;
  } finally {
    spinner.stop();
    git.checkout(currBranchName);
  }
};

program
  .command("pub")
  .description("发布")
  .option(`${ENV_MAP.TEST}, --dev`, "发布TEST环境")
  .option("-l, --log", "查看详细log")
  .action((name) => {
    if (process.argv.slice(3).length < 1) {
      console.log(
        chalk.yellow(
          "\n Info:You provided more than one option.Use --help to get help"
        )
      );
      return;
    }
    spinner.start("Start dep packages...");
    try {
      (name.dev || name.rc || name.sep) &&
        pubTestEnv(process.argv[3], name.log);
    } catch (error) {
      throw error;
    }
  });

program.parse(process.argv);
