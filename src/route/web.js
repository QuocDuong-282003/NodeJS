import express from "express";
import homController from "../controller/homController";
import userController from "../controller/userController";
import doctorController from "../controller/doctorController";
import patientController from "../controller/patientController";
import specialtyController from "../controller/specialtyController";
import clinicController from "../controller/clinicController";
import handbookController from "../controller/handbookController";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homController.getHomPage);
    router.get('/about', homController.getAboutPage);


    router.get('/crud', homController.getCRUD);
    router.post('/post-crud', homController.postCRUD);
    router.get('/get-crud', homController.displayGetCRUD);
    router.get('/edit-crud', homController.getEditCRUD);
    router.post('/put-crud', homController.putCRUD);
    router.get('/delete-crud', homController.deleteCRUD);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    // rest api

    router.get('/api/allcode', userController.getAllCode);

    //
    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctor', doctorController.getAllDoctors);
    router.post('/api/save-infor-doctor', doctorController.postInforDoctor);
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById);
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule);
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleByDate);
    router.get('/api/get-extra-infor-doctor-by-id', doctorController.getExtraInforDoctorById);
    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById);

    router.get('/api/get-list-patient-for-doctor', doctorController.getListPatientForDoctor);
    router.post('/api/send-remedy', doctorController.sendRemedy);

    //
    router.post('/api/patient-book-appointment', patientController.postBookAppointment);
    router.post('/api/verify-book-appointment', patientController.postVerifyBookAppointment);

    router.post('/api/create-new-specialty', specialtyController.createSpecialty);
    router.get('/api/get-all-specialty', specialtyController.getAllSpecialty);
    router.get('/api/get-detail-specialty-by-id', specialtyController.getDetailSpecialtyById);


    router.post('/api/create-new-clinic', clinicController.createClinic);
    router.get('/api/get-clinic', clinicController.getAllClinic);
    router.get('/api/get-detail-clinic-by-id', clinicController.getDetailClinicById);
    // api handbook
    router.post('/api/create-new-handbook', handbookController.getHandBook);
    router.get('/api/get-handbook', handbookController.getAllHandBook);
    router.get('/api/get-detail-handbook-by-id', handbookController.getDetailHandBookById);
    return app.use("/", router);
}
module.exports = initWebRoutes;