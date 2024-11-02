import { RequiredFields } from "../../interfaces/helper";
import { Project } from "./project.model"
import { IProject } from "./project.schema"
import CustomError from "../../utils/CustomError";

export const createProject = async (data: RequiredFields<IProject, 'owner'>) => {
    const project = new Project(data);
    return project.save();
}

export const getProjects = async (owner: string) => {
    const projects = await Project.find({ owner }).lean().exec()

    if (!projects) {
        throw new CustomError('Projects not found')
    }

    return projects
}

export const getProject = async (owner: string, projectId: string) => {
    const project = await Project.findOne({
        owner,
        _id: projectId
    }).exec()

    if (!project) {
        throw new CustomError('Project not found for this user', 404)
    }

    return project
}

export const updateProject = async (owner: string, projectId: string, data: Partial<IProject>) => {
    const project = await Project.findOne({
        owner,
        _id: projectId
    }).exec()

    if (!project) {
        throw new CustomError('Project not found for this user', 404)
    }

    Object.assign(project, data)

    return project.save()
}

export const deleteProject = async (owner: string, projectId: string) => {
    const project = await Project.findOne({
        owner,
        _id: projectId
    }).exec()

    if (!project) {
        throw new CustomError('Project not found for this user', 404)
    }
    

    return project.deleteOne()
}
