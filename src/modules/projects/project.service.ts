import { Project } from "./project.model"
import { IProject } from "./project.schema"

export const createProject = async (data: IProject) => {
    const project = new Project(data);
    return project.save();
}

export const getProjects = async (owner: string) => {
    const projects = await Project.find({ owner }).lean().exec()

    if (!projects) {
        throw new Error('Projects not found')
    }

    return projects
}

export const getProject = async (projectId: string) => {
    const project = await Project.findById(projectId).lean().exec()

    if (!project) {
        throw new Error('Project not found')
    }

    return project
}

export const updateProject = async (projectId: string, data: Partial<IProject>) => {
    const project = await Project.findByIdAndUpdate(projectId, data, { new: true }).lean().exec()

    if (!project) {
        throw new Error('Project not found')
    }

    return project
}

export const deleteProject = async (projectId: string) => {
    const project = await Project.findByIdAndDelete(projectId).lean().exec()

    if (!project) {
        throw new Error('Project not found')
    }

    return project
}
