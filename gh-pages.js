let ghPages = require("gh-pages");

ghPages.publish(
  "public",
  {
    branch: "gh-pages",
    repo: "https://github.com/hidayatullah94/websites.git", // Update to point to your repository
    user: {
      name: "hidayatullah", // update to use your name
      email: "hidayatullah1780@gmail.com", // Update to use your email
    },
  },
  () => {
    console.log("Deploy Complete!");
  }
);
