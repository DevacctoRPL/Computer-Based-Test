var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AdminModel from '../models/adminModel.js';
class AdminController {
    // Get all admin
    static getAllAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admins = yield AdminModel.getAllAdmin();
                res.status(200).json(admins);
            }
            catch (error) {
                console.error('Error fetching all admins:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    // Get admin by ID
    static getAdminById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const admin = yield AdminModel.getAdminById(id);
                if (admin) {
                    res.status(200).json(admin);
                }
                else {
                    res.status(404).json({ message: 'Admin not found' });
                }
            }
            catch (error) {
                console.error(`Error fetching admin with id ${req.params.id}:`, error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    // Add new admin
    static addAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminData = req.body;
                yield AdminModel.addAdmin(adminData);
                res.status(201).json({ message: 'Admin added successfully' });
            }
            catch (error) {
                console.error('Error adding new admin:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    // Update admin by ID
    static updateAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const adminData = req.body;
                yield AdminModel.updateAdmin(id, adminData);
                res.status(200).json({ message: 'Admin updated successfully' });
            }
            catch (error) {
                console.error(`Error updating admin with id ${req.params.id}:`, error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    // Delete admin by ID
    static deleteAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield AdminModel.deleteAdmin(id);
                res.status(200).json({ message: 'Admin deleted successfully' });
            }
            catch (error) {
                console.error(`Error deleting admin with id ${req.params.id}:`, error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
}
export default AdminController;
