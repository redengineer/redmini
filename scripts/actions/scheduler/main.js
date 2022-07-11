const { schedulerTask } = require("./scheduler");

// main
async function main() {
  schedulerTask();
}

main()
  .then(
    (result) => {
      console.log(result);
    },
    (err) => {
      console.log(err);
    }
  )
  .then(() => {
    process.exit();
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
