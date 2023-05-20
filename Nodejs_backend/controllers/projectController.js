const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const Project = require("../models/projectModel");
//@desc Get all projects
//@route Get /api/projects
//@access public
const getProjects = asyncHandler(async (req, res) => {
    // const projects = await Project.find();
    // res.status(200).json(projects);
    // console.log(`Recieved GET request`);
});

//@desc Get all projects
//@route Get /api/projects
//@access public
const getProjectsByField = asyncHandler(async (req, res) => {
    const {reqFeilds} = req.body;
    if (!reqFeilds){
        const projects = await Project.find();
        res.status(200).json(projects);
        console.log(`Recieved GET request`);
    }
    else {

        const projects = await Project.find({fields:reqFeilds});
        res.status(200).json(projects);
        console.log(`Recieved GET request`);
    }
});

//@desc Add a project
//@route Post /api/projects
//@access public
const createProject = asyncHandler(async (req, res) => {
    const { name, faculty, university,deadline,fields,detail ,email} = req.body;
    if (!name || !faculty || !university || !deadline || !fields || !email){
        res.status(400);
        throw new Error("All fields are mandatory.");
    }
    if (faculty == "Mosayeb" || faculty == "Dr.Moasayebi") {
        res.status(400);
        throw new Error("You are banned from this project. Please do not send any more requests to us.");
    }
    const project = await Project.create({ name, faculty, university,deadline,fields,detail,email });
    res.status(201).json(project);
    console.log(`Recieved POST request`);
});

//@desc Update a projects
//@route Put /api/projects/:id
//@access public
const updateProject = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update project with id = ${req.params.id}` });
    console.log(`Recieved PUT request`);
});

//@desc Delete a project
//@route Delete /api/projects/:id
//@access public
const deleteProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project){
        res.status(404);
        throw new Error("Project not found");
    }
    await Project.deleteOne(project);
    res.status(200).json(project);
    console.log(`Recieved DELETE request`);
});


module.exports = { getProjects,getProjectsByField, createProject, updateProject, deleteProject };
