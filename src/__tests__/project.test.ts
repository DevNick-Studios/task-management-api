import request from 'supertest';
import mongoose from 'mongoose';
import { Project } from '../modules/projects/project.model';
import { User } from '../modules/users/user.model';
import env from '../configs';
import { app } from '../app';
import { IUser } from '../interfaces/schema';

describe('Project API', () => {
  let token: string;
  let user: IUser;
  
  const userData = {
    username: 'test2user',
    email: 'test2user@gmail.com',
    password: 'password123',
  };

  beforeAll(async () => {
    await mongoose.connect(env.TEST_MONGO_URI as string, {});
    await User.deleteMany({});
    await Project.deleteMany({});

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
      })

    token = response.body.token;
    user = response.body.user;
  });

  afterAll(async () => {
    await Project.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Project.deleteMany({});
  });

  test('POST /projects - should create a new project', async () => {
    const response = await request(app)
      .post('/projects')
      .set('authorization', `Bearer ${token}`)
      .send({
        name: 'New Project',
        description: 'This is a test project.',
      })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')  
      .expect(201)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe('New Project');
  });

  test('GET /projects - should fetch all projects', async () => {
    await Project.create([
      { name: 'Project One', description: 'First project', owner: user._id },
      { name: 'Project Two', description: 'Second project', owner: user._id },
    ]);

    const response = await request(app)
      .get('/projects')
      .set('authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty('_id');
    expect(response.body[0].deleted).toBe(false);
  });

  test('GET /projects/:projectId - should fetch a single project by ID', async () => {
    const project = await Project.create({
      name: 'Single Project',
      description: 'A project for single fetch testing',
      owner: user._id,
    });

    const response = await request(app)
      .get(`/projects/${project._id}`)
      .set('authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('_id', project._id.toString());
    expect(response.body.name).toBe('Single Project');
  });

  test('PATCH /projects/:projectId - should update an existing project', async () => {
    const project = await Project.create({
      name: 'Project to Update',
      description: 'Description for project to update',
      owner: user._id,
    });

    const response = await request(app)
      .patch(`/projects/${project._id}`)
      .set('authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Project Name',
        description: 'Updated project description',
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('_id', project._id.toString());
    expect(response.body.name).toBe('Updated Project Name');
    expect(response.body.description).toBe('Updated project description');
  });

  test('DELETE /projects/:projectId - should soft delete a project', async () => {
    const project = await Project.create({
      name: 'Project to Delete',
      description: 'Description for project to delete',
      owner: user._id,
    });

    const response = await request(app)
      .delete(`/projects/${project._id}`)
      .set('authorization', `Bearer ${token}`)
      .expect(200);

    const deletedProject = await Project.findById(project._id);
    expect(deletedProject).toBeDefined();
    expect(deletedProject?.deleted).toBe(true);
  });

  test('GET /projects - should return empty list if no projects exist', async () => {
    const response = await request(app)
      .get('/projects')
      .set('authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.length).toBe(0);
  });
});
