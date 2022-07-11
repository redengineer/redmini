const { schedulerTask } = require("./scheduler");

// main
async function main() {
  return await schedulerTask();
}

main()
  .then(
    result => {
      console.log(result);
    },
    err => {
      console.log(err);
    }
  )
  .then(() => {
    process.exit();
  });