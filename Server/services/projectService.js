const path = require("path");

const Project = require("../models/Project");
const Hours = require("../models/Hours");

const userService = require("../services/userService");
const {
    validateProjectData,
    validateProjectStatus,
} = require("../utils/validateProjectDataUtil");
const ProjectValidationErrors = require("../errors/projectsValidationErrors");
const { validateObjectId } = require("../utils/validateObjectIdUtil");
const formatDate = require("../utils/formatDateUtil");
const { getProjectByRoleIfNotAdmin } = require("../utils/getProjectByRole");
const generatePdf = require("../utils/generatePdfUtil");
const sendInvitesToNonExistingUsers = require("../utils/inviteEmailsUtils/sendInvitesToNonExistingUsers");
const getInvitesByProjectId = require("../utils/inviteUtils/getInvitesByProjectId");

exports.createProject = async (req) => {
    const projectData = req.body;

    await validateProjectData(projectData);

    const project = await Project.create({
        customerIds: projectData.customerIds,
        projectName: projectData.projectName,
        startingDate: projectData.startingDate,
        pricePerHour: projectData.pricePerHour,
        employeeIds: projectData.employeeIds,
    });

    if (projectData.inviteEmails) {
        sendInvitesToNonExistingUsers(projectData.inviteEmails);
    }

    return {
        projectId: project._id,
        customerIds: project.customerIds,
        projectName: project.projectName,
        startingDate: project.startingDate,
        pricePerHour: project.pricePerHour,
        employeeIds: project.employeeIds,
    };
};

exports.getProjects = async (req) => {
    const { status, employeeId } = req.query;
    const userId = req.userToken._id;

    if (employeeId) {
        if (!validateObjectId(employeeId)) {
            throw new ProjectValidationErrors(
                "Invalid employee ID format",
                400
            );
        }
    }

    if (status) {
        await validateProjectStatus(status);
    }

    const query = {};

    if (status) {
        query.status = status;
    }
    if (employeeId) {
        query.employeeIds = employeeId;
    }

    const user = await userService.getSingleUser(userId);

    if (user.userRole === "employee") {
        query.employeeIds = user._id;
    } else if (user.userRole === "customer") {
        query.customerIds = user._id;
    }

    const projects = await Project.find(query).sort({
        status: -1
    });

    return projects;
};

exports.getSingleProject = async (req) => {
    const projectId = req.params.id;
    const userId = req.userToken._id;
    const userRole = req.userToken.userRole;

    const project = await getProjectByRoleIfNotAdmin(projectId, userId, userRole);
    const projectInvites = await getInvitesByProjectId(projectId);

    return {
        project,
        invites: projectInvites
    };
};

exports.updateProject = async (req) => {
    const projectData = req.body;
    const projectId = req.params.id;
    const emailsToCheck = projectData.inviteEmails;

    if (!projectData.status) {
        throw new ProjectValidationErrors("No status provided!", 400);
    }

    await validateProjectStatus(projectData.status);
    await validateProjectData(projectData);

    const query = {
        ...projectData,
    };

    if (projectData.status) {
        query.status = projectData.status;
    }

    const project = await Project.findByIdAndUpdate(projectId, query, {
        new: true,
    });

    if (emailsToCheck) {
        await sendInvitesToNonExistingUsers(emailsToCheck, projectId);
    }

    return {
        customerIds: project.customerIds,
        projectName: project.projectName,
        startingDate: project.startingDate,
        pricePerHour: project.pricePerHour,
        employeeIds: project.employeeIds,
    };
};

exports.getReport = async (req) => {
    const projectId = req.params.id;
    const userId = req.userToken._id;
    const userRole = req.userToken.userRole;

    const project = await getProjectByRoleIfNotAdmin(projectId, userId, userRole);

    const hours = await Hours.find({ projectId }).populate(
        "userId",
        "firstName"
    );

    if (!hours || hours.length === 0) {
        throw new ProjectValidationErrors(
            "Could not generate report for the specified project. No hours logged.",
            404
        );
    }

    const totalPrice = hours.reduce(
        (total, hour) => total + hour.hours * project.pricePerHour,
        0
    );

    return {
        projectData: {
            employeeNames: project.employeeIds.map(
                (employee) => employee.firstName + " " + employee.lastName
            ),
            customerNames: project.customerIds.map(
                (customer) => customer.firstName
            ),
            projectName: project.projectName,
            startingDate: formatDate(project.startingDate),
            pricePerHours: project.pricePerHour,
        },
        hours: hours.map((hour) => ({
            id: hour._id,
            employeeName: hour.userId.firstName,
            date: formatDate(hour.date),
            hours: hour.hours,
            notes: hour.notes,
        })),
        totalPrice: totalPrice,
    };
};

exports.getReportPdf = async (req) => {
    const reportData = await this.getReport(req);

    const templatePath = path.join(__dirname, '../templates/projectReport/projectReportTemplate.hbs');

    const pdfBuffer = await generatePdf(reportData, templatePath);

    return pdfBuffer;
};