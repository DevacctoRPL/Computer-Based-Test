import { Request, Response } from 'express';
import AdminModel from '../models/adminModel.js';

class AdminController {
  // Get all admin
  static async getAllAdmin(req: Request, res: Response): Promise<void> {
    try {
      const admins = await AdminModel.getAllAdmin();
      res.status(200).json(admins);
    } catch (error) {
      console.error('Error fetching all admins:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Get admin by ID
  static async getAdminById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const admin = await AdminModel.getAdminById(id);
      if (admin) {
        res.status(200).json(admin);
      } else {
        res.status(404).json({ message: 'Admin not found' });
      }
    } catch (error) {
      console.error(`Error fetching admin with id ${req.params.id}:`, error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Add new admin
  static async addAdmin(req: Request, res: Response): Promise<void> {
    try {
      const adminData = req.body;
      await AdminModel.addAdmin(adminData);
      res.status(201).json({ message: 'Admin added successfully' });
    } catch (error) {
      console.error('Error adding new admin:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Update admin by ID
  static async updateAdmin(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const adminData = req.body;
      await AdminModel.updateAdmin(id, adminData);
      res.status(200).json({ message: 'Admin updated successfully' });
    } catch (error) {
      console.error(`Error updating admin with id ${req.params.id}:`, error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Delete admin by ID
  static async deleteAdmin(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await AdminModel.deleteAdmin(id);
      res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
      console.error(`Error deleting admin with id ${req.params.id}:`, error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default AdminController;
