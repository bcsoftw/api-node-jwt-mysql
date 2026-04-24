const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const User = require('../models/User');
const Purchase_Item = require('../models/Purchase_Item');
const ResponseTrait = require('../traits/ResponseTrait');
const responseTrait = new ResponseTrait();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Op } = require('sequelize');

exports.getAllPurchase = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return responseTrait.responseError(res, null, 'User not authenticated');
        }

        console.log(req.user);

        const isCustomer = req.user.role === 3;
        
        let whereClause = {};

        if (isCustomer) {
            whereClause = { userId: req.user.id };
        }

        const purchase = await Purchase.findAll({
            where: whereClause,
            include: [{
                model: User,
                as: 'user',
            }]
        });


        // const purchase = await Purchase.findAll({
        //     include: [{
        //         model: User,
        //         as: 'user',
        //     }]
        // });


        responseTrait.responseSuccess(res, purchase, 'Purchase List Fetch Successfully !');
    } catch (err) {
        responseTrait.responseError(res, null, 'Error listing purchases');
    }
};

exports.createPurchase = async (req, res) => {

    const { orderNumber, date, userId, total, items } = req.body;


    try {
        const purchase = await Purchase.create({ orderNumber, date, userId, total });


        const purchaseItemData = items.map(item => ({
            purchaseId: purchase.id,
            productId: item.productId,
            amount: item.amount,
            price: item.price,
            total: item.price * item.amount,
        }));

        await Purchase_Item.bulkCreate(purchaseItemData);
        const purchased = await Purchase.findByPk(purchase.id, {
            include: [
                {
                    model: User,
                    as: 'user',
                }
            ],
        });

        const purchases = await Purchase.findAll({
            include: [{
                model: User,
                as: 'user',
            }]
        });

        const purchaseData = {
            purchase: purchased,
            purchases: purchases,
        }

        responseTrait.responseSuccess(res, purchaseData, 'New Purchase Created Successfully !');

    } catch (err) {
        responseTrait.responseError(res, err.message, 'Error listing purchase');
    }
};

exports.showPurchase = async (req, res) => {
    try {


        const purchase = await Purchase.findByPk(req.params.id, {
            include: [
                {
                    model: User, 
                    as: 'user', 
                },
                {
                    model: Purchase_Item,
                    as: 'products',
                    include: [{
                        model: Product,
                        as: 'product',
                    }]
                },
            ],
        });


        if (purchase) {
            responseTrait.responseSuccess(res, purchase, 'Purchase Details Fetch Successfully !');
        } else {
            responseTrait.responseError(res, null, 'Purchase Not Found');
        }
    } catch (err) {
        responseTrait.responseError(res, err);
    }
};


exports.updatePurchase = async (req, res) => {

    const { orderNumber, date, userId, total, items } = req.body;
    const purchaseId = req.params.id;


    try {
        const purchase = await Purchase.update({ orderNumber, date, userId, total }, { where: { id: req.params.id } });

        if (purchase) {

            //Eliminando products asociados a este purchase
            await Purchase_Item.destroy({
                where: {
                    purchaseId: purchaseId
                }
            });

            //Add new products
            const purchaseItemData = items.map(item => ({
                purchaseId: purchaseId,
                productId: item.productId,
                amount: item.amount,
                price: item.price,
                total: item.price * item.amount,

            }));

            await Purchase_Item.bulkCreate(purchaseItemData);

            const purchaseData = await Purchase.findByPk(req.params.id, {
                include: [
                    {
                        model: User,
                        as: 'user',
                    }
                ],
            });


            responseTrait.responseSuccess(res, purchaseData, 'Purchase Updated Successfully !');

        } else {
            responseTrait.responseError(res, null, 'Purchase Not Found');
        }

    } catch (err) {
        responseTrait.responseError(res, err);
    }
};


exports.deletePurchase = async (req, res) => {
    try {
        const purchase = await Purchase.destroy({ where: { id: req.params.id } });
        if (purchase) {
            responseTrait.responseSuccess(res, null, 'Purchase Deleted Successfully !');
        } else {
            responseTrait.responseError(res, null, 'Purchase Not Found');
        }
    } catch (err) {
        responseTrait.responseError(res, err);
    }
};

exports.updateStatusPurchase = async (req, res) => {

    const { status } = req.body;
    try {
        const purchase = await Purchase.update({ status: status }, { where: { id: req.params.id } });
        if (purchase) {
            
            const [purchase, purchases] = await Promise.all([
                Purchase.findByPk(req.params.id, {
                    include: [{ model: User, as: 'user' }]
                }),
                Purchase.findAll({
                    include: [{ model: User, as: 'user' }],
                })
            ]);

            const purchaseData = { purchase, purchases };


            responseTrait.responseSuccess(res, purchaseData, 'Purchase Updated Status Successfully !');
        } else {
            responseTrait.responseError(res, null, 'Purchase Not Found');
        }
    } catch (err) {
        responseTrait.responseError(res, err);
    }
};


exports.createPaymentIntent = async (req, res) => {

    const { amount, currency } = req.body;
    try {
        // const purchase = await Purchase.update({ status: status }, { where: { id: req.params.id } });

        // Create Payment Intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Amount in cents
            currency,
            confirm:true,
            payment_method:'pm_bancontact_generatedSepaDebitIntentsSucceed',
            // metadata, // Optional: Add custom data (e.g., order ID)
            automatic_payment_methods: { enabled: true }, // Enables card payments, etc.
            return_url : 'http://localhost:8080/orders',
        });



        if (paymentIntent) {
            responseTrait.responseSuccess(res, paymentIntent, 'Payment Intent Successfully !');
        } else {
            responseTrait.responseError(res, null, 'Payment Intent Not Found');
        }
    } catch (err) {
        responseTrait.responseError(res, err);
    }
};