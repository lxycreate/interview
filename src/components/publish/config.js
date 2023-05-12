const PUB_BRANCH_TEST = "deploy/test";
const ENV_MAP = {
  SEP: "-s",
  TEST: "-d",
  RC: "-r",
};
const PUB_BRANCH_MAP = {
  [ENV_MAP.TEST]: "deploy/test",
  [ENV_MAP.RC]: "deploy/rc",
};
module.exports = {
    PUB_BRANCH_TEST,
    ENV_MAP,
    PUB_BRANCH_MAP
};
