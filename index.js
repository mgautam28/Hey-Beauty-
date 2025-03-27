const router = require("express").Router();
const { heyBeauty_routes } = require("./heyBeauty/heyBeauty_routes");


router.use("/v1/", heyBeauty_routes);

// router.post('/v1/', upload.fields([{ name: 'pose' }, { name: 'cloth' }]), heyBeauty_routes);

module.exports = router;