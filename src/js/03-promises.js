function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res({ position, delay });
      }, delay);
    });
  } else {
    return new Promise((res, rej) => {
      setTimeout(() => {
        rej({ position, delay });
      }, delay);
    });
  }
}

const formEl = document.querySelector('form');

formEl.addEventListener('submit', (event) => {
  event.preventDefault();

  const inputs = event.target.elements;

  const firstDelay = Number(inputs.delay.value);
  const stepDelay = Number(inputs.step.value);
  const amount = Number(inputs.amount.value);

  setTimeout(() => {
    for (let i = 0; i < amount; i++) {
      createPromise(i, stepDelay * i)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    }
  }, firstDelay);
});

