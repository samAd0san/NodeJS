class HomeCtrl{
    home(req,res) {
        res.status(200);
        res.send('Express API');
    }

    health(req,res) {
        res.status(200);
        res.json({status:'Up'});
    }
}

const homeObj = new HomeCtrl();
module.exports = homeObj;

// module.exports = new HomeCtrl();