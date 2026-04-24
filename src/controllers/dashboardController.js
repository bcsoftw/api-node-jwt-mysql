const User = require('../models/User');
const Product = require('../models/Product');
const ResponseTrait = require('../traits/ResponseTrait');
const responseTrait = new ResponseTrait();
const db = require('../config/db');

exports.productsPercentageSinceLastMonth = async (req, res) => {
    try {
        const clientTimeZone = req.query.timezone || 'UTC';
        
        const query = `
            SELECT 
                COUNT(*) as totalProducts,
                COUNT(CASE WHEN createdAt >= DATE_SUB(NOW(), INTERVAL 1 MONTH) THEN 1 END) as lastMonthProducts,
                ROUND(
                    ((COUNT(CASE WHEN createdAt >= DATE_SUB(NOW(), INTERVAL 1 MONTH) THEN 1 END) / NULLIF(COUNT(*), 0)) * 100), 2
                ) as percentage
            FROM products
        `;
        
        const [results] = await db.query(query, { 
            type: db.QueryTypes.SELECT 
        });

       // const result = results[0]; //original
        const result = results;

        // Extraer valores del resultado
        const totalProducts = parseInt(result.totalProducts);
        const lastMonthProducts = parseInt(result.lastMonthProducts);
        const percentage = parseFloat(result.percentage);

        // Calcular cambio porcentual respecto al total (mejora opcional)
        const percentageChange = totalProducts > 0 
            ? ((lastMonthProducts / totalProducts) * 100).toFixed(2)
            : 0;

        const data = {
            totalProducts,
            lastMonthProducts,
            percentage, // Ya viene calculado desde la query
            percentageChange: parseFloat(percentageChange),
            status: percentage >= 0 ? 'increase' : 'decrease'
        };

        responseTrait.responseSuccess(res, data, 'Products percentage since last month');
    } catch (err) {
        console.error('Error in Products Percentage Since Last Month', err);
        responseTrait.responseError(res, null, 'Error in percentage calculation');
    }
};

exports.usersPercentageSinceLastMonth = async (req, res) => {
    try {
        const clientTimeZone = req.query.timezone || 'UTC';
        
        const query = `
            SELECT 
                COUNT(*) as totalUsers,
                COUNT(CASE WHEN createdAt >= DATE_SUB(NOW(), INTERVAL 1 MONTH) THEN 1 END) as lastMonthUsers,
                ROUND(
                    ((COUNT(CASE WHEN createdAt >= DATE_SUB(NOW(), INTERVAL 1 MONTH) THEN 1 END) / NULLIF(COUNT(*), 0)) * 100), 2
                ) as percentage
            FROM users
        `;
        
        const [results] = await db.query(query, { 
            type: db.QueryTypes.SELECT 
        });

       // const result = results[0]; //original
        const result = results;

        // Extraer valores del resultado
        const totalUsers = parseInt(result.totalUsers);
        const lastMonthUsers = parseInt(result.lastMonthUsers);
        const percentage = parseFloat(result.percentage);

        // Calcular cambio porcentual respecto al total (mejora opcional)
        const percentageChange = totalUsers > 0 
            ? ((lastMonthUsers / totalUsers) * 100).toFixed(2)
            : 0;

        const data = {
            totalUsers,
            lastMonthUsers,
            percentage, // Ya viene calculado desde la query
            percentageChange: parseFloat(percentageChange),
            status: percentage >= 0 ? 'increase' : 'decrease'
        };

        responseTrait.responseSuccess(res, data, 'Users percentage since last month');
    } catch (err) {
        console.error('Error in Users Percentage Since Last Month', err);
        responseTrait.responseError(res, null, 'Error in percentage calculation');
    }
};