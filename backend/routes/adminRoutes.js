const router=require("express").Router();

const adminMiddleware =
require("../middleware/adminMiddleware");

const {
  getStats,
  getAdminProducts,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct
}=require("../controllers/adminController");


// ─── Stats ────────────────────────────────────────────────────────────────────

router.get(
  "/stats",
  adminMiddleware,
  getStats
);


// ─── Product Management ───────────────────────────────────────────────────────

router.get(
  "/products",
  adminMiddleware,
  getAdminProducts
);

router.post(
  "/products",
  adminMiddleware,
  createAdminProduct
);

router.put(
  "/products/:id",
  adminMiddleware,
  updateAdminProduct
);

router.delete(
  "/products/:id",
  adminMiddleware,
  deleteAdminProduct
);


module.exports=router;