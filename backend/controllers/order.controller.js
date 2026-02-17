import Order from "../models/order.model.js";

export const placeOrder=async (req,res)=>{
    try {
        const {menuitemId,quantity} = req.body;
        if(!menuitemId){
            return res.status(400).json({message:"menuitemId is required"});
        }
        const order = new Order({
            menuItem:menuitemId,
            user:req.user,
            quantity:quantity>0?quantity:1,
        })
        await order.save();
        return res.status(200).json({message:"order placed successfully", order});
    }catch(err){
        console.log(err);
        res.status(400).json({message:"order place failed",err});
    }
}


export const placeCartOrder=async (req,res)=>{
    try {
const {cartItems}=req.body;
if(!cartItems || !Array.isArray(cartItems) || cartItems.length === 0 ){
return res.status(400).json({message:"cartItem is required"});
}
const orders=[]
        for(const item of cartItems){
            if(!item.menuitemId){
                return res.status(400).json({message:"every item must have an id"});
            }
            const order = new Order({
                menuItem:item.menuitemId,
                user:req.user,
                quantity:item.quantity>0?item.quantity:1,
                status:'Pending',
            })
            await order.save();
            orders.push(order);
        }
        return res.status(200).json({
            message: "Order placed successfully",
            orders: orders,
            totalItems: orders.length
        });
    }catch (e) {
        console.log(e);
        res.status(400).json({message:"order placing failed"});
    }
}


export const CartOrder = async (req, res) => {
    try {
        const { cartItems, customerInfo } = req.body;

        // Validate cart items
        if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
            return res.status(400).json({ message: "Cart items are required" });
        }

        // Validate customer information
        if (!customerInfo || !customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address) {
            return res.status(400).json({ message: "All customer information is required (name, email, phone, address)" });
        }

        const orders = [];

        for (const item of cartItems) {
            if (!item.menuitemId) {
                return res.status(400).json({ message: "Every item must have a menuitemId" });
            }

            const order = new Order({
                menuItem: item.menuitemId,
                customerName: customerInfo.name,
                customerEmail: customerInfo.email,
                customerPhone: customerInfo.phone,
                customerAddress: customerInfo.address,
                quantity: item.quantity > 0 ? item.quantity : 1,
                status: 'Pending',
            });

            await order.save();
            orders.push(order);
        }

        return res.status(200).json({
            message: "Order placed successfully",
            orders: orders,
            totalItems: orders.length
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Order placing failed" });
    }
}