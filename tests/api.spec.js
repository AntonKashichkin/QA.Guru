import { test, expect } from '@playwright/test';
import { ChallengerService } from '../src/services';
import { ChallengesService } from '../src/services';

let token;

// test.describe.only('Challenge', () => {
//   test.beforeAll(async ({ request, api }) => {
//     let response = await request.post('/challenger');
//     const headers = response.headers();
//     token = headers['x-challenger'];

//     console.log(`${baseURL}${headers.location}`);
//   });

//   test('challenges', async ({ request }) => {
//     let response = await request.get('/challenges', {
//       headers: { 'x-challenger': token },
//     });
//     const body = await response.json();
//     expect(body.challenges.length).toBe(59);
//   });

//   test('todos', async ({ request }) => {
//     let respTodos = await request.get('/todos', {
//       headers: { 'x-challenger': token },
//     });
//     const body = await respTodos.json();
//     expect(body.todos.length).toBe(10);
//   });

//   test('todo', async ({ request }) => {
//     let respTodo = await request.get('/todo', {
//       headers: { 'x-challenger': token },
//     });
//     expect(respTodo.status()).toBe(404);
//   });
//toDo - доделать челендж
// test('todosId', async ({ request }) => {
//   let respTodo = await request.get('/todos/{id}', {
//     headers: { 'x-challenger': token },
//   });
//   expect(respTodo.status()).toBe(404);
// });

test.describe('Challenge with service pattern', () => {
  test('получить токен', async ({ request }, testinfo) => {
    const challenger = new ChallengerService(request);
    let respones = await challenger.post(testinfo);
    const headers = respones.headers();
    // @ts-ignore
    console.log(`${testinfo.project.use.api}${headers.location}`);
    token = headers['x-challenger'];
    console.log(token);
  });

  test('challenges', async ({ request }, testinfo) => {
    const challenges = new ChallengesService(request);
    let response = await challenges.get(token, testinfo);
    expect(response.challenges.length).toBe(59);
  });
});
