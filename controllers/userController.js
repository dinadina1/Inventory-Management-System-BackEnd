// create userController object
const userController = {

    // test
    test: (req, res) => {
        res.status(200).json({
            message: "User Controller Test"
        });
    }
};

// export userController object
module.exports = userController;