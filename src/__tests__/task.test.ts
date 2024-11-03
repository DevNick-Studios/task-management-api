import request from 'supertest';
import mongoose from 'mongoose';
import { Task } from '../modules/tasks/task.model';
import env from '../configs';
import { Project } from '../modules/projects/project.model';
import { User } from '../modules/users/user.model';
import { app } from '../app';
import { IUser } from '../interfaces/schema';

describe('Task API', () => {
  let token: string;
  let user: IUser;
  let projectId = '';
  const userData = {
    username: 'testuser',
    email: 'testuser@gmail.com',
    password: 'password123',
  }

  beforeAll(async () => {
    await mongoose.connect(env.TEST_MONGO_URI as string, {});

    await User.deleteMany({});

    await request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(userData);

    const response = await request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: userData.email,
        password: userData.password,
      });

      token = response.body.token;
      user = response.body.user;

    await Task.deleteMany({});
    await Project.deleteMany({});
    
    const project = await Project.create({ name: 'Test Project', owner: user._id });
    projectId = project._id.toString();
  });
  

  afterAll(async () => {
    await Task.deleteMany({});
    await Project.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Task.deleteMany({});
  });

  test('POST /projects/:projectId/tasks - should create a new task', async () => {
    const response = await request(app)
      .post(`/projects/${projectId}/tasks`)
      .set('authorization', `Bearer ${token}`)
      .send({
        title: 'New Task',
        description: 'This is a test task.',
        status: 'in-progress',
        due_date: '2024-11-09',
      })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')  
      .expect(201)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe('New Task');
    expect(response.body.status).toBe('in-progress');
  });

  test('GET /projects/:projectId/tasks - should fetch all tasks', async () => {
    await Task.create([
      { title: 'Task One', description: 'Description for task one', status: 'completed', due_date: new Date('2024-11-10'), project: projectId },
      { title: 'Task Two', description: 'Description for task two', status: 'in-progress', due_date: new Date('2024-11-11'), project: projectId },
    ]);

    const response = await request(app)
      .get(`/projects/${projectId}/tasks?page=1&limit=10`)
      .set('authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('totalCount');
    expect(response.body.totalCount).toBe(2);
    expect(response.body).toHaveProperty('tasks');
    expect(response.body.tasks.length).toBe(2);
  });

  test('GET /projects/:projectId/tasks?status=completed - should filter tasks by status', async () => {
    await Task.create([
      { title: 'Task One', status: 'completed', due_date: new Date('2024-11-10'), project: projectId },
      { title: 'Task Two', status: 'in-progress', due_date: new Date('2024-11-11'), project: projectId },
    ]);

    const response = await request(app)
      .get(`/projects/${projectId}/tasks?status=completed&page=1&limit=10`)
      .set('authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('tasks');
    expect(response.body.tasks.length).toBe(1);
    expect(response.body.tasks[0].title).toBe('Task One');
  });

  test('GET /projects/:projectId/tasks/:taskId - should fetch a single task by ID', async () => {
    const task = await Task.create({
      title: 'Single Task',
      description: 'This is a single test task.',
      status: 'in-progress',
      due_date: new Date('2024-11-10'),
      project: projectId,
    });

    const response = await request(app)
      .get(`/projects/${projectId}/tasks/${task._id}`)
      .set('authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('_id', task._id.toString());
    expect(response.body.title).toBe('Single Task');
  });

  test('PATCH /projects/:projectId/tasks/:taskId - should update an existing task', async () => {
    const task = await Task.create({
      title: 'Task to Update',
      status: 'in-progress',
      due_date: new Date('2024-11-10'),
      project: projectId,
    });

    const response = await request(app)
      .patch(`/projects/${projectId}/tasks/${task._id}`)
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Task',
        status: 'completed',
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('_id', task._id.toString());
    expect(response.body.title).toBe('Updated Task');
    expect(response.body.status).toBe('completed');
  });

  test('DELETE /projects/:projectId/tasks/:taskId - should soft delete a task', async () => {
    const task = await Task.create({
      title: 'Task to Delete',
      status: 'in-progress',
      due_date: new Date('2024-11-10'),
      project: projectId,
    });

    const response = await request(app)
      .delete(`/projects/${projectId}/tasks/${task._id}`)
      .set('Accept', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .expect(200);

    const deletedTask = await Task.findById(task._id);
    expect(deletedTask).toBeDefined();
    expect(deletedTask?.deleted).toBe(true);
  });
});
