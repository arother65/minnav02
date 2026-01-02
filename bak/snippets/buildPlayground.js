const playGround = Array.from({ length: 1 }, () =>
  Array.from({ length: 4 }, () => ({ used: false }))
);

// access
playGround[0][2].used = true;