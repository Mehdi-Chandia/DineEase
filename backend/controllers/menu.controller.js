import Menu from '../models/menu.model.js';
import cloudinary from "../config/cloudinary.js";
import fs from 'fs';


export const createMenu = async (req, res) => {
    try {
const {name,description ,price,category} = req.body;

if (!name || !description || !price || !category) {
    return res.status(400).json({ error: 'Missing required fields' });
}
        let imageUrl=''
        if(req.file){

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'menu_items',
            });

            imageUrl = result.secure_url;

            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting temp file:', err);
            });
        }
        const menu=new Menu({
            name,
            description,
            price,
            category,
            image:imageUrl,
        })
        await menu.save();
        res.status(201).json({ message: 'Menu item created successfully', menuItem: menu });
    }catch (err) {
        console.error('Error in createMenu:', err);
        res.status(500).json({ message: 'Error creating menu' });
    }
}


export const getAllMenuItems = async (req, res) => {
    try {
        const menu = await Menu.find();
        res.json(menu);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching menu' });
    }
};
