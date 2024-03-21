class HomeCtrl{
    home(req,res) {
        res.status(200).send('Express API');
    }

    health(req,res) {
        res.status(200).json({status:'Up'});
    }
}

const homeObj = new HomeCtrl();
module.exports = homeObj;

// module.exports = new HomeCtrl();