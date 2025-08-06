const p1 = new Promise((resolve, reject) => {
  return setTimeout(() => resolve("p1 resolved"), 3000);
});

const p2 = new Promise((resolve, reject) => {
  return setTimeout(() => {
    const random = Math.random();
    if (random < 0.5) {
      reject(new Error("p2 failed"));
    }
    resolve("p2 resolved");
  }, 1000);
});

const p3 = new Promise((resolve, reject) => {
  return setTimeout(() => resolve("p3 resolved"), 2000);
});

// Promise.all([p1, p2, p3])
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// Promise.allSettled([p1, p2, p3])
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// Promise.race([p1, p2, p3])
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

Promise.any([p1, p2, p3])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
