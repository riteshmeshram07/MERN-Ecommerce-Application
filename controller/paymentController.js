const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")("ritesh");

// Process stripe payments   =>   /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "usd",

        metadata: { integration_check: "accept_a_payment" },
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret,
    });
});

// Send stripe API Key   =>   /api/v1/stripeapi
exports.sendStripApi = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        stripeApiKey: "sk_test_51NsjkpSJBjQq1u3lVq7C1QVoZRJgfG0XZVnBc2swc5hGyZwfKcT0wNTjwIeO82xuP0KxFIKphY28rlpGXWCXd6SZ005WY036iN",
    });
});
